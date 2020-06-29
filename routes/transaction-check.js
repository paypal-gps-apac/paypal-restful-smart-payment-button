var express = require('express');
var http = require('https');
const request = require('request');
var router = express.Router();

router.post('/', function(req, response, next) {
  var PAYPAL_CLIENT = 'AfgzOXuUBgDRNRXUsJaVFcLBqZr04dutzohmLpM4Qz1KQEVBGI-6blmilD7QOrVCvqEGFa2APYMe3VUd';
  var PAYPAL_SECRET = 'EEwGeEeoQbNRgUSWpEekCnZh-FKtxWgyyWIMpWsLUb2RfJGlpAJ8sR83-5d64gw4nRN5yZEFHbuB-Fo0';

  var PAYPAL_OAUTH_API = 'https://api.sandbox.paypal.com/v1/oauth2/token/';
  var PAYPAL_ORDER_API = 'https://api.sandbox.paypal.com/v2/checkout/orders/';

  var orderID = req.body.orderID;

  var basicAuth = base64encode(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`);

  request({
    method: 'POST',
    uri: PAYPAL_OAUTH_API,
    headers: [
      {
        name: 'content-type',
        value: 'application/json'
      }
    ],
    auth: {
      user: PAYPAL_CLIENT,
      password: PAYPAL_SECRET
    },
    form: { grant_type : 'client_credentials'}
  }, function (error, res, body) {

    var result_json = JSON.parse(body)

    var access_token = result_json.access_token;

    request({
      method: 'GET',
      uri: `${ PAYPAL_ORDER_API }${ orderID }`,
      headers: [
        {
          name: 'content-type',
          value: 'application/json'
        }
      ], 
      auth: { bearer: access_token }
    }, function (err, res, data) {
      var result = JSON.parse(data)

      if (result.error) {
        return response.send({success: false});
      }
      if (result.purchase_units[0].amount.value !== '15.23') {
        return response.send({success: false});
      } else{
        return response.send({success: true});
      }
    })
  })
});

let base64encode = (text) => {
  return Buffer.from(text).toString('base64')
}

module.exports = router;
