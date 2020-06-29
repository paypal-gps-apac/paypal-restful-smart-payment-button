var express = require('express');
var http = require('https');
const request = require('request');
var router = express.Router();

var PAYPAL_CLIENT = 'AfgzOXuUBgDRNRXUsJaVFcLBqZr04dutzohmLpM4Qz1KQEVBGI-6blmilD7QOrVCvqEGFa2APYMe3VUd';
var PAYPAL_SECRET = 'EEwGeEeoQbNRgUSWpEekCnZh-FKtxWgyyWIMpWsLUb2RfJGlpAJ8sR83-5d64gw4nRN5yZEFHbuB-Fo0';

var PAYPAL_SANDBOX = 'https://api.sandbox.paypal.com';

var PAYPAL_OAUTH_API = `${PAYPAL_SANDBOX}/v1/oauth2/token/`;

router.post('/', function(req, response, next) {
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

    var ac_token = result_json.access_token;

    return response.send({access_token: ac_token});
  })
});

module.exports = router;