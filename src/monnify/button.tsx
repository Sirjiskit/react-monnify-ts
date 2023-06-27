import React from 'react'
import { MonnifyProps } from '../types'
import usePayWithMonnifyPayment from './payWithMonnify'

type MonnifyPaymentButtonProps = {
  text?: string
  className?: string
  children?: React.ReactNode
  onComplete?: () => void
  onPaymentClose?: () => void
  options: MonnifyProps
}
const MonnifyPaymentButton = ({
  text,
  className,
  children,
  onComplete,
  onPaymentClose,
  options,
}: MonnifyPaymentButtonProps): JSX.Element => {
  const initializePayment = usePayWithMonnifyPayment(options)
  return (
    <button className={className} onClick={(): void => initializePayment(onComplete, onPaymentClose)}>
      {text || children}
    </button>
  )
}
export default MonnifyPaymentButton
