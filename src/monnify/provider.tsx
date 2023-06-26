import React from 'react'
import { MonnifyProps } from '../types/types'
import MonnifyPaymentContext from './context'
import usePayWithMonnifyPayment from './payWithMonnify'

type MonnifyPaymentProviderProps = {
  children: JSX.Element
  onComplete: () => void
  onPaymentClose: () => void
  options: MonnifyProps
}

const MonnifyPaymentProvider = ({
  children,
  onComplete,
  onPaymentClose,
  options,
}: MonnifyPaymentProviderProps): JSX.Element => {
  const initializePayment = usePayWithMonnifyPayment(options)
  return (
    <MonnifyPaymentContext.Provider value={{ initializePayment, onComplete, onPaymentClose }}>
      {children}
    </MonnifyPaymentContext.Provider>
  )
}

export default MonnifyPaymentProvider
