/* eslint-disable @typescript-eslint/no-var-requires */
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
