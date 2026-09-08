/*

MOZE解锁

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/yzllee/script/refs/heads/script/moze.js

[mitm]
hostname = api.revenuecat.com, api.rc-backup.com

*/
var moze = JSON.parse($response.body);
moze.subscriber.entitlements = {
  "Premium": {
    "expires_date": "6666-06-06T06:06:06Z",
    "product_identifier": "https://t.me/Guding88",
    "purchase_date": "2023-02-23T02:33:33Z"
  }
};
moze.subscriber.original_purchase_date = "2023-02-23T03:33:33Z";
moze.subscriber.subscriptions = {
  "https://t.me/Guding88": {
    "expires_date": "6666-06-06T06:06:06Z",
    "original_purchase_date": "2023-02-23T02:33:33Z",
    "purchase_date": "2023-02-23T02:33:33Z",
    "ownership_type" : "PURCHASED",
    "store" : "app_store"
  }
};
$done({ body: JSON.stringify(moze) });
