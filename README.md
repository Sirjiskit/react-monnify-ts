# monnify-ts 0.0.3
monnify payment gateway library for reactJS both JavaScript and TypeScript
## Demo

![Demo](demo1.png?raw=true 'Demo Image 1')
![Demo](demo2.png?raw=true 'Demo Image 2')
## Get Started

React-monnify-ts provides wrappers for ReactJS application both JavaScript and TypeScript

### How to Install

```sh
npm install react-monnify-ts --save
```

or with `yarn`

```sh
yarn add react-monnify-ts
```
### How to use react-monnify-ts
```typescript
import React from 'react'
import './App.css'
import {
  CompleteResponesProps,
  MonnifyPaymentButton,
  MonnifyProps,
  PayWIthMonnifyPayment,
  UserCancelledResponseProps,
  usePayWithMonnifyPayment,
} from 'react-monnify-ts'
const config: MonnifyProps = {
  amount: 100,
  currency: 'NGN',
  reference: `${new String(new Date().getTime())}`,
  customerName: 'Damilare Ogunnaike',
  customerEmail: 'ogunnaike.damilare@gmail.com',
  apiKey: 'MK_PROD_FLX4P92EDF',
  contractCode: '626609763141',
  paymentDescription: 'Lahray World',
  metadata: {
    name: 'Damilare',
    age: 45,
  },
  isTestMode: true,
  customerPhoneNumber: '09123856264',
}
const UsePayWithMonnifyPaymentHookExample = () => {
  const onLoadStart = () => {
    console.log('loading has started')
  }
  const onLoadComplete = () => {
    console.log('SDK is UP')
  }

  const onComplete = (res: CompleteResponesProps) => {
    //Implement what happens when the transaction is completed.
    console.log('response', res)
  }
  const onClose = (data: UserCancelledResponseProps) => {
    //Implement what should happen when the modal is closed here
    console.log('data', data)
  }
  const initializePayment = usePayWithMonnifyPayment(config)
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onLoadStart, onLoadComplete, onComplete, onClose)
        }}
      >
        Pay With Monnify Payment Hooks Example
      </button>
    </div>
  )
}
function App() {
  const componentProps = {
    options: config,
    text: 'Pay With Monnify Button example',
    className: 'btn',
    onLoadStart: () => {
      console.log('loading has started')
    },
    onLoadComplete: () => {
      console.log('SDK is UP')
    },

    onComplete: function (response) {
      //Implement what happens when the transaction is completed.
      console.log('response', response)
    },
    onClose: function (data) {
      //Implement what should happen when the modal is closed here
      console.log('data', data)
    },
  }

  return (
    <div className='Main'>
      <header>
        <img src={require('./logo.svg')} className='App-logo' alt='logo' />
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          React-monnify-ts example implementation
        </a>
      </header>
      <div>
        <UsePayWithMonnifyPaymentHookExample />
      </div>
      <div>
        <MonnifyPaymentButton {...componentProps} />
      </div>
      <div>
        <PayWIthMonnifyPayment {...componentProps}>
          {({ initializePayment }) => (
            <button onClick={() => initializePayment()}>Pay WIth Monnify Payment Implementation</button>
          )}
        </PayWIthMonnifyPayment>
      </div>
    </div>
  )
}

export default App
```
 If you are not implementing with typescript
 you will used
 ```javascript
  onComplete: function (response) {
      //Implement what happens when the transaction is completed.
      console.log('response', response)
    },
    onClose: function (data) {
      //Implement what should happen when the modal is closed here
      console.log('data', data)
    }
```
instead of 
```typescript
 const onComplete = (res: CompleteResponesProps) => {
    //Implement what happens when the transaction is completed.
    console.log('response', res)
  }
  const onClose = (data: UserCancelledResponseProps) => {
    //Implement what should happen when the modal is closed here
    console.log('data', data)
  }
```
## Options
```javascript
const config = {
  amount: 100,
  currency: 'NGN',
  reference: `${new String(new Date().getTime())}`,
  customerName: 'Damilare Ogunnaike',
  customerEmail: 'ogunnaike.damilare@gmail.com',
  apiKey: 'MK_PROD_FLX4P92EDF',
  contractCode: '626609763141',
  paymentDescription: 'Lahray World',
  metadata: {
    name: 'Damilare',
    age: 45,
  },
  isTestMode: true,
  customerPhoneNumber: '09123856264',
}
```
with typescript
```typescript
const config:MonnifyProps = {
  amount: 100,
  currency: 'NGN',
  reference: `${new String(new Date().getTime())}`,
  customerName: 'Damilare Ogunnaike',
  customerEmail: 'ogunnaike.damilare@gmail.com',
  apiKey: 'MK_PROD_FLX4P92EDF',
  contractCode: '626609763141',
  paymentDescription: 'Lahray World',
  metadata: {
    name: 'Damilare',
    age: 45,
  },
  isTestMode: true,
  customerPhoneNumber: '09123856264',
}
```
 checkout [Monnify Documentation](https://docs.teamapt.com/display/MON/Monnify+Web+SDK) for other available options
 ## Deployment
 Set isTestMode true if you on development environment and isTestMode false if you are deploying live
### onConplete response
```json
{
    "status": "SUCCESS",
    "message": "Transaction Successful",
    "transactionReference": "MNFY|44|20220407112123|000684",
    "paymentReference": "130i0o0hfhlaad0",
    "authorizedAmount": 5000,
    "redirectUrl": ""
}
```
```json
{
    "status": "FAILED",
    "payload": {
        "apiKey": "MK_TEST_DZ71ZAL62R",
        "amount": 5000,
        "currency": "NGN",
        "paymentReference": "130i0o0hfhlaad0",
        "paymentDescription": "Test Pay",
        "transactionReference": "MNFY|44|20220407112123|000684",
        "accessToken": null,
        "merchant": {
            "name": "Design Ideation ",
            "logo": ""
        },
        "enabledPaymentMethods": [
            "CARD",
            "ACCOUNT_TRANSFER"
        ],
        "customer": {
            "fullName": "",
            "email": "monnify@monnify.com",
            "mobileNumber": ""
        },
        "totalPayable": 5000
    },
    "redirectUrl": ""
}
```
### onClose response
```json
{
    "authorizedAmount": 30,
    "paymentStatus": "USER_CANCELLED",
    "redirectUrl": null,
    "responseCode": "USER_CANCELLED",
    "responseMessage": "User cancelled Transaction"
}
```