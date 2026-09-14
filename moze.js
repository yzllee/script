/*

MOZE解锁

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/yzllee/script/refs/heads/script/moze.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/yzllee/script/refs/heads/script/moze.js

[mitm]
hostname = api.revenuecat.com, api.rc-backup.com

*/

const headers = $request.headers, ua = headers['User-Agent'] || headers['user-agent'], bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];
let customHB = {};
let mozeBody = JSON.parse(typeof $response != "undefined" && $response.body || "{}");
if (typeof $response == "undefined") {
  customHB.headers = $request.headers;
} else if(mozeBody && mozeBody.subscriber) {
  console.log(bundle_id === "app.moze", ua.includes("MOZE"))
  mozeBody.subscriber.entitlements["MOZE_PREMIUM_SUBSCRIPTION"] = {
    "expires_date": "6666-06-06T06:06:06Z",
    "purchase_date": "2023-08-16T03:56:24Z",
    "product_identifier": "MOZE_PRO_SUBSCRIPTION_MONTHLY_BASIC"
  };
  mozeBody.subscriber.subscriptions["MOZE_PRO_SUBSCRIPTION_MONTHLY_BASIC"] = {
    "expires_date": "6666-06-06T06:06:06Z",
    "original_purchase_date": "2019-07-10T12:22:41Z",
    "purchase_date": "2023-08-16T03:56:24Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  };
  customHB.body = JSON.stringify(mozeBody);
}
$done(customHB);
