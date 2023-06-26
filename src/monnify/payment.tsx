/* eslint-disable react/display-name */
/* eslint-disable no-empty-pattern */
import { FunctionComponentElement, forwardRef, useContext } from 'react'
import { MonnifyProps } from '../types/types'
import MonnifyPaymentContext from './context'
import MonnifyPaymentProvider from './provider'
import React from 'react'

type PayWIthMonnifyPaymentProps = {
  children: any
  onComplete?: () => void
  onPaymentClose?: () => void
  options: MonnifyProps
}
const PayWIthMonnify = ({ children, ref }: { children: any; ref: any }): FunctionComponentElement<any> => {
  const { initializePayment, onComplete, onPaymentClose } = useContext(MonnifyPaymentContext)
  const completeInitializePayment = (): void => initializePayment(onComplete, onPaymentClose)
  return children({ initializePayment: completeInitializePayment, ref })
}

const PayWIthMonnifyPayment = forwardRef(
  (
    { children, onComplete: paraSuccess, onPaymentClose: paraClose, options }: PayWIthMonnifyPaymentProps,
    ref: any,
  ): JSX.Element => {
    const onComplete = paraSuccess ? paraSuccess : (): any => null
    const onPaymentClose = paraClose ? paraClose : (): any => null
    return (
      <MonnifyPaymentProvider options={options} onComplete={onComplete} onPaymentClose={onPaymentClose}>
        <PayWIthMonnify ref={ref}>{children}</PayWIthMonnify>
      </MonnifyPaymentProvider>
    )
  },
)

export default PayWIthMonnifyPayment
