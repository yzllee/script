/*

MOZE解锁

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/gSef23k$) url script-response-body https://raw.githubusercontent.com/yzllee/script/refs/heads/script/moze.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/gSef23k$) url script-request-header https://raw.githubusercontent.com/yzllee/script/refs/heads/script/moze.js

[mitm]
hostname = api.revenuecat.com, api.rc-backup.com

*/

const requestHeaders = ($request && $request.headers) || {};
const ua = requestHeaders["User-Agent"] || requestHeaders["user-agent"] || "";
const bundleId =
  requestHeaders["X-Client-Bundle-ID"] ||
  requestHeaders["x-client-bundle-id"] ||
  "";

let result = {};

if (bundleId !== "app.moze" || !/MOZE/i.test(ua)) {
  $done({});
}

if (typeof $response === "undefined") {
  result.status = 200;
  result.headers = requestHeaders;
} else {
  try {
    const body = JSON.parse($response.body || "{}");

    if (body.subscriber) {
      body.subscriber.entitlements =
        body.subscriber.entitlements || {};

      body.subscriber.subscriptions =
        body.subscriber.subscriptions || {};

      body.subscriber.entitlements["MOZE_PREMIUM_SUBSCRIPTION"] = {
        expires_date: "6666-06-06T06:06:06Z",
        purchase_date: "2023-08-16T03:56:24Z",
        product_identifier: "MOZE_PRO_SUBSCRIPTION_MONTHLY_BASIC"
      };

      body.subscriber.subscriptions["MOZE_PRO_SUBSCRIPTION_MONTHLY_BASIC"] = {
        expires_date: "6666-06-06T06:06:06Z",
        original_purchase_date: "2019-07-10T12:22:41Z",
        purchase_date: "2023-08-16T03:56:24Z",
        ownership_type: "PURCHASED",
        store: "app_store"
      };
      
      result.status = 200;
      result.body = JSON.stringify(body);
    }
  } catch (error) {
    console.log("MOZE JSON parse error: " + error);
  }
}

$done(result);
