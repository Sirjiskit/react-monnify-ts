import React from 'react'
import { MonnifyProps } from '../types'
import MonnifyPaymentContext from './context'
import usePayWithMonnifyPayment from './payWithMonnify'

type MonnifyPaymentProviderProps = {
  children: JSX.Element
  onLoadStart: any
  onLoadComplete: any
  onComplete: any
  onClose: any
  options: MonnifyProps
}

const MonnifyPaymentProvider = ({
  children,
  onLoadStart,
  onLoadComplete,
  onComplete,
  onClose,
  options,
}: MonnifyPaymentProviderProps): JSX.Element => {
  const initializePayment = usePayWithMonnifyPayment(options)
  return (
    <MonnifyPaymentContext.Provider value={{ initializePayment, onComplete, onLoadStart, onLoadComplete, onClose }}>
      {children}
    </MonnifyPaymentContext.Provider>
  )
}

export default MonnifyPaymentProvider
