import React from 'react'
import { MonnifyProps } from '../types'
import usePayWithMonnifyPayment from './payWithMonnify'

type MonnifyPaymentButtonProps = {
  text?: string
  className?: string
  children?: React.ReactNode
  onLoadStart?: any
  onLoadComplete?: any
  onComplete?: any
  onClose?: any
  options: MonnifyProps
}
const MonnifyPaymentButton = ({
  text,
  className,
  children,
  onLoadStart,
  onLoadComplete,
  onComplete,
  onClose,
  options,
}: MonnifyPaymentButtonProps): JSX.Element => {
  const initializePayment = usePayWithMonnifyPayment(options)
  return (
    <button
      className={className}
      onClick={(): void => initializePayment(onLoadStart, onLoadComplete, onComplete, onClose)}
    >
      {text || children}
    </button>
  )
}
export default MonnifyPaymentButton
