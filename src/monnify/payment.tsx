/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable no-empty-pattern */
import { FunctionComponentElement, forwardRef, useContext } from 'react'
import { MonnifyProps } from '../types'
import MonnifyPaymentContext from './context'
import MonnifyPaymentProvider from './provider'
import React from 'react'

type PayWIthMonnifyPaymentProps = {
  children: any
  onLoadStart?: any
  onLoadComplete?: any
  onComplete?: any
  onClose?: any
  options: MonnifyProps
}
const PayWIthMonnify = ({ children, ref }: { children: any; ref: any }): FunctionComponentElement<any> => {
  const { initializePayment, onLoadStart, onLoadComplete, onComplete, onClose } = useContext(MonnifyPaymentContext)
  const completeInitializePayment = (): void => initializePayment(onLoadStart, onLoadComplete, onComplete, onClose)
  return children({ initializePayment: completeInitializePayment, ref })
}

const PayWIthMonnifyPayment = forwardRef(
  (
    {
      children,
      onLoadStart: paraLoadStart,
      onLoadComplete: paraLoadComplete,
      onComplete: paraComplete,
      onClose: paraClose,
      options,
    }: PayWIthMonnifyPaymentProps,
    ref: any,
  ): JSX.Element => {
    const onLoadStart = paraLoadStart ? paraLoadStart : (_e: any): any => null
    const onLoadComplete = paraLoadComplete ? paraLoadComplete : (_e: any): any => null
    const onComplete = paraComplete ? paraComplete : (_e: any): any => null
    const onClose = paraClose ? paraClose : (_e: any): any => null
    return (
      <MonnifyPaymentProvider
        options={options}
        onLoadStart={onLoadStart}
        onLoadComplete={onLoadComplete}
        onComplete={onComplete}
        onClose={onClose}
      >
        <PayWIthMonnify ref={ref}>{children}</PayWIthMonnify>
      </MonnifyPaymentProvider>
    )
  },
)

export default PayWIthMonnifyPayment
