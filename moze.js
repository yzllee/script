/*

MOZE解锁

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/yzllee/script/refs/heads/script/moze.js

[mitm]
hostname = api.revenuecat.com, api.rc-backup.com

*/
var moze = JSON.parse($response.body);
moze.subscriber.entitlements["MOZE_PREMIUM_SUBSCRIPTION"] = {
  "expires_date": "6666-06-06T06:06:06Z",
  "purchase_date": "2023-08-16T03:56:24Z",
  "product_identifier": "MOZE_PRO_SUBSCRIPTION_MONTHLY_BASIC"
};
moze.subscriber.subscriptions["MOZE_PRO_SUBSCRIPTION_MONTHLY_BASIC"] = {
  "expires_date": "6666-06-06T06:06:06Z",
  "original_purchase_date": "2019-07-10T12:22:41Z",
  "purchase_date": "2023-08-16T03:56:24Z",
  "ownership_type" : "PURCHASED",
  "store" : "app_store"
};
$done({ body: JSON.stringify(moze) });
