# PayPal Smart Payment Button Solution

[![npm version](https://badge.fury.io/js/avatar-bot-cli.svg)](https://badge.fury.io/js/paypal-acc-vault)
![build succeeded](https://img.shields.io/badge/build-succeeded-brightgreen.svg)
![Test passing](https://img.shields.io/badge/Tests-passing-brightgreen.svg)

:point_right: [English](README.md)<br>
:point_right: [简体中文](readme/README-zh_cn.md)

PayPal Smart Payment Button (SPB) provides the seamless checkout experience with a simplified solution. It supports several purchase methods including the local payments in European countries. You can also check this [document](https://developer.paypal.com/docs/checkout/#try-the-buttons) which explains how the button works.
<br><br>
From this example, it also introduce the usage of [PayPal Webhook](https://developer.paypal.com/docs/api-basics/notifications/webhooks/rest/#overview), which provides a channel to receive notification messages from the payment events.

## Work Flow
SPB normally involves the frontend and backend in the payment process. In the Restful API, it mainly focus on three parts no matter you decide to implment in the client or server side:
1. [Create Order](https://developer.paypal.com/docs/api/orders/v2/):<br>
We need to create the order intention, which can either get the customer payment instantly or after a certain of [time](https://developer.paypal.com/docs/checkout/integration-features/auth-capture/#understand-the-authorization-periods). Besides of the intention, you could also define the payer and purchase information. Make sure that the [country code](https://developer.paypal.com/docs/api/reference/country-codes/) is using our format when you need to define the address.
Here is the example of body structure:
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
2. [Authorize Payment](https://developer.paypal.com/docs/api/orders/v2/#orders_authorize):<br>
If you chose to get the customer's payment after few days, you will need to call this API and authorize the payment. So that the issuer bank will hold the amount of money from the customer's credit card until the payment is going to be captured. You need to use the order ID retrieved from the [Order API](https://developer.paypal.com/docs/api/orders/v2/) in order to call this API.<br />
3. [Capture Payment](https://developer.paypal.com/docs/api/orders/v2/#orders_capture):<br>
You will need to call this API when you decide to get the payment after the customer finished the purchase process. Please make sure that the payment status is completed under the payment and captures parameters:
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
The following [document](Postman/Restful.json) demonstrates the work flow of how the payment captured from the API call.

### Installation
```sh
> npm install
```

### Run
```sh
> npm start
```
 After the project is compiled, please access to [http://localhost:3000/ucc-form](http://localhost:3000) to try the example.


### Contribution
We are welcome anyone to folk this repository and make PR to contribute this example project by creating test cases or code changes :smile:.



