## Responsibilites of Payment Gateway
    * accept payment from client
    * accept payment with the your backend

## Challenges


## Multiple Payment modes that change based on the geography

* netbanking -> RTGS, IMPS(indian), NEFT
* UPI -> India
* Debit, credit card
* Wallets -> multiple companies
* Crypto
* SWIFT -> global
* buy now pay later

## Follow very strict compliances
* You have to follow very strict security standards
    * credit card payment (PCI DSS)
     [Payment Card Industry Standards]
    * international -> SWIFT

### licenses and regulation (localization)
* Yon need to have license to accept the payment
* Every country has different regulation and you need follow them.
* Different countries allow different for ex UPI and IMPS are only available in India

### Fraud Detection
* You should be able to prevent every kind of fruad transaction
* also needs to be reliable to make sure any fraud confirmation are not made to the server.


## solution
a specialized service that only deals with payment (payment) and takes cut of every transaction.

## payment acceptance:
* Payment gateway: Razorpay
    * Public Key: server, client
    * Private Key (is only known by server).
    * webhook -> 
        * you defined a url on which razorpay will make the request confirming status of the payment.
        * You need to expose your server `publically` so that payment gateway is able to access the web-hook route.



### steps
* Frontend -> Provide userId & productId and make a request to `checkout` route
* checkout route -->
    * BACKEND
        * RazorPay takes over the whole backend checkout flow
        * private key + public key + user_infp(attrivutes are defined by razorpay) + product info (attributes are defined by razorpay).
        * because of this razorpay knows who has created the order.
    * FROTNEND :- 
        * using reazorpay script + public key and encrypted order -> paymentrequest is made on payment gateway.
    * Confirmation 
        * razorpay -> makes a confirmation request on your backend webhook url.



###
* DOCS= https://study.algoprep.in/cohort/CCC0Jy1qnk?module-id=66dda977b808e5985cdc7a6b&lesson-id=66f6d0a3721e118b253c79d7