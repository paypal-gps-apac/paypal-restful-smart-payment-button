# PayPal Smart Payment Button Solution

[![npm version](https://badge.fury.io/js/paypal-restful-smart-payment-button.svg)](https://badge.fury.io/js/paypal-restful-smart-payment-button)
![build succeeded](https://img.shields.io/badge/build-succeeded-brightgreen.svg)
![Test passing](https://img.shields.io/badge/Tests-passing-brightgreen.svg)

:point_right: [English](README.md)<br>
:point_right: [简体中文](readme/README-zh_cn.md)

PayPal Smart Payment Button (SPB) 通过简化的解决方案提供无缝的结帐体验。它支持多种购买方式，包括欧洲国家/地区的本地付款。您还可以查看此[文档][document](https://developer.paypal.com/docs/checkout/#try-the-buttons)，并介绍了该按钮的工作原理。
<br><br>
在此示例中，它还介绍了[PayPal Webhook](https://developer.paypal.com/docs/api-basics/notifications/webhooks/rest/#overview)的用法，提供了一个渠道用來接收付款消息。

## 工作流程
SPB在支付过程中涉及前端和后端的开发。在Restful API中，无论您决定在客户端或服务器端实施，它主要集中在三个部分:
1. 创建订单 ([API文档](https://developer.paypal.com/docs/api/orders/v2/)):<br>
我们需要创建订单意向，该意向可以立即获得客户付款，或決定在一定[时间](https://developer.paypal.com/docs/checkout/integration-features/auth-capture/#understand-the-authorization-periods)后付款。除了订单意向之外，您还可以定义付款人和购买信息。当您需要定义地址时，请确保国家/地区代码([country code](https://developer.paypal.com/docs/api/reference/country-codes/))正在使用我们的格式。
这是API结构的例子：
```sh
{
  "intent": "AUTHORIZE",
  "payer": {
    "name": {
        "given_name": "Tse",
        "surname": "Sunny"
    },
    "address": {
        "address_line_1": "123 ABC Street",
        "address_line_2": "Apt 2",
        "admin_area_2": "Ma On Shan",
        "admin_area_1": "New Territories",
        "postal_code": "00852",
        "country_code": "HK"
    },
    "email_address": "customer@domain.com",
    "phone": {
        "phone_type": "MOBILE",
        "phone_number": {
            "national_number": "11231242343"
        }
    }
	},
  "purchase_units": [
    {
      "amount": {
        "currency_code": "HKD",
        "value": "12000.32"
      },
      "shipping": {
	        "name": {
	            "full_name": "Sunny Tse"
	        },
	        "address": {
	            "address_line_1": "123 ABC Street",
		        "address_line_2": "Apt 2",
		        "admin_area_2": "Ma On Shan",
		        "admin_area_1": "New Territories",
		        "postal_code": "00852",
		        "country_code": "HK"
	        }
	    }
    }
  ]
}
```
2. 授权付款 ([API文档](https://developer.paypal.com/docs/api/orders/v2/#orders_authorize)):<br>
如果您选择在几天后获得客户的付款，则需要调用此API并授权付款。这样，发卡行将保留客户信用卡中的金额，直到要付款为止。您需要使用从[Order API](https://developer.paypal.com/docs/api/orders/v2/)中检索到的订单ID才能调用此API。
3. 获取付款 ([API文档](https://developer.paypal.com/docs/api/orders/v2/#orders_capture)):<br>
在客户完成购买过程后决定付款时，需要调用此API。请确保在付款下完成付款状态并捕获以下参数:
```sh
...

"payments": {
    "captures": [
        {
        "id": "3C679366HH908993F",
        "status": "COMPLETED",
        "amount": {
            "currency_code": "USD",
            "value": "100.00"
        },

...

```
<br>

## Postman
以下[文件](Postman/Restful.json)演示了如何从API调用中捕获付款的工作流程。

### 安装
```sh
> npm install
```

### 编译
```sh
> npm start
```
编译项目后，请访问[http://localhost:3000/ucc-form](http://localhost:3000/ucc-form)尝试该示例。


### 贡献
我们欢迎任何人使用或分享此示例，并欢迎创建测试用例或代码更改来贡献此示例项目。


