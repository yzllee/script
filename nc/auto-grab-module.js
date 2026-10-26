// AUTO-GRAB MODULE START
// 独立红包自动化模块。迁移新版时无需修改本文件，也无需映射压缩变量名。
// 主文件只需导入 autoGrab，并在首次/增量消息响应处调用 autoGrab.processMessages(messages)。
// 消息补拉与合并仍属于主文件，请按“AUTO-GRAB MESSAGE SYNC”标记迁移。

const DEFAULT_OPTIONS = {
  minAmount: 1e7,
  minClickInterval: 4e3,
  multipleDelay: 999,
  singleDelayMin: 1555,
  singleDelayRange: 1001,
  openButtonTimeout: 800,
  resultTimeout: 5e3,
  inactiveResultTimeout: 600
};

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

const findVisibleMessageContainer = () => {
  const containers = document.querySelectorAll(".chat-messages-container");
  for (const container of containers) {
    const page = container.closest(".chatroom-page");
    if (!page) continue;
    const style = window.getComputedStyle(page);
    if (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      container.clientHeight > 0
    ) {
      return container;
    }
  }
  for (const container of containers) {
    if (container.clientHeight > 0) return container;
  }
  return containers[0] || null;
};

const waitForElement = (selector, timeout) =>
  new Promise(resolve => {
    const current = document.querySelector(selector);
    if (current) {
      resolve(current);
      return;
    }

    let timer;
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) finish(element);
    });
    const finish = element => {
      observer.disconnect();
      clearTimeout(timer);
      resolve(element);
    };

    timer = setTimeout(() => finish(null), timeout);
    observer.observe(document.body, { childList: true, subtree: true });
  });

const closeModal = () => {
  document.body.click();
  const closeButton =
    document.querySelector(".modal-close-btn") ||
    document.querySelector(".image-lightbox-close");
  if (closeButton) closeButton.click();
};

const isButtonBusy = button =>
  Boolean(
    button &&
    (button.disabled ||
      button.getAttribute("aria-busy") === "true" ||
      button.getAttribute("aria-disabled") === "true" ||
      button.classList.contains("loading") ||
      button.classList.contains("is-loading"))
  );

const waitForGrabResult = (button, options) =>
  new Promise(resolve => {
    const startedAt = Date.now();
    let requestStarted = isButtonBusy(button);

    const check = () => {
      const successOverlay = document.querySelector(
        ".red-envelope-grab-success-overlay"
      );
      if (successOverlay) {
        resolve({ success: true, overlay: successOverlay });
        return;
      }

      const currentButton = document.querySelector(".red-envelope-grab-btn");
      requestStarted = requestStarted || isButtonBusy(currentButton);
      const elapsed = Date.now() - startedAt;

      if (requestStarted && !isButtonBusy(currentButton)) {
        resolve({ success: false });
        return;
      }
      if (!requestStarted && elapsed >= options.inactiveResultTimeout) {
        resolve({ success: false });
        return;
      }
      if (elapsed >= options.resultTimeout) {
        resolve({ success: false });
        return;
      }
      setTimeout(check, 25);
    };

    setTimeout(check, 0);
  });

export const createAutoGrab = (customOptions = {}) => {
  const options = { ...DEFAULT_OPTIONS, ...customOptions };
  const state = {
    grabbedEnvelopeIds: new Set(),
    queue: Promise.resolve(),
    lastGrabClickAt: 0
  };

  const waitForClickSlot = async () => {
    const remaining = Math.max(
      0,
      options.minClickInterval - (Date.now() - state.lastGrabClickAt)
    );
    if (remaining > 0) {
      console.log(`[红包] 操作间隔不足，等待 ${remaining}ms`);
      await sleep(remaining);
    }
  };

  const operateEnvelopeDom = async messageId => {
    const container = findVisibleMessageContainer();
    const content = container?.querySelector(
      `[data-msg-id="${messageId}"] .chat-msg-content`
    );
    if (!content) {
      console.log(`[红包] (${messageId}) 找不到对应的消息元素，跳过`);
      return;
    }

    await waitForClickSlot();
    await sleep(80);
    content.click();

    const openButton = await waitForElement(
      ".red-envelope-grab-btn",
      options.openButtonTimeout
    );
    if (!openButton) {
      console.log(`[红包] (${messageId}) 未找到开红包按钮`);
      closeModal();
      return;
    }

    state.lastGrabClickAt = Date.now();
    openButton.click();
    console.log(`[红包] (${messageId}) 已点击开红包按钮`);

    const result = await waitForGrabResult(openButton, options);
    if (!result.success) {
      console.log(`[红包] (${messageId}) 领取失败或红包已抢完`);
      closeModal();
      return;
    }

    result.overlay.click();
    console.log(`[红包] (${messageId}) 已关闭领取结果`);
    await sleep(80);
    closeModal();
  };

  const schedule = envelope => {
    state.grabbedEnvelopeIds.add(envelope.id);
    const delay =
      envelope.batchSize > 1
        ? options.multipleDelay
        : options.singleDelayMin +
          Math.floor(Math.random() * options.singleDelayRange);

    console.log(`[红包] (${envelope.id}) 延迟 ${delay}ms 开始 DOM 操作`);
    state.queue = state.queue
      .then(async () => {
        await sleep(delay);
        await operateEnvelopeDom(envelope.messageId);
      })
      .catch(error => {
        console.log(`[红包] (${envelope.id}) DOM 操作失败:`, error);
      });
  };

  const processMessages = messages => {
    if (!Array.isArray(messages) || messages.length === 0) return;

    const envelopes = [];
    const sortedMessages = messages
      .slice()
      .sort((left, right) => Number(left?.id) - Number(right?.id));

    for (const message of sortedMessages) {
      if (!message || message.id === undefined) continue;
      const messageId = Number(message.id);
      if (
        Number.isNaN(messageId) ||
        message.messageType !== "red_envelope" ||
        !message.metadata
      ) {
        continue;
      }

      try {
        const metadata =
          typeof message.metadata === "string"
            ? JSON.parse(message.metadata)
            : message.metadata;
        const id = Number(metadata?.envelopeId);
        const totalAmount = Number(metadata?.totalAmount);
        const count = Number(metadata?.count);
        const grabbedCount = Number(metadata?.grabbedCount);

        if (metadata?.envelopeId == null || Number.isNaN(id)) continue;
        if (
          (metadata.status && metadata.status !== "active") ||
          (count > 0 && grabbedCount >= count)
        ) {
          console.log(`[红包] ${id} 已结束，跳过`);
          continue;
        }
        if (metadata.type === "fish") {
          console.log(`[红包] ${id} 鱼类红包，跳过`);
          continue;
        }
        if (totalAmount < options.minAmount) {
          console.log(`[红包] ${id} 金额:${totalAmount} 太低，跳过`);
          continue;
        }
        if (!envelopes.some(envelope => envelope.id === id)) {
          envelopes.push({ id, messageId });
        }
      } catch {
        console.log("[红包] metadata 解析失败:", message.metadata);
      }
    }

    const newEnvelopes = envelopes.filter(
      envelope => !state.grabbedEnvelopeIds.has(envelope.id)
    );
    if (newEnvelopes.length === 0) return;

    console.log("[红包] 新红包:", newEnvelopes.map(item => item.id).join(", "));
    newEnvelopes.forEach(envelope =>
      schedule({ ...envelope, batchSize: newEnvelopes.length })
    );
  };

  return { processMessages };
};

export const autoGrab = createAutoGrab();
// AUTO-GRAB MODULE END
