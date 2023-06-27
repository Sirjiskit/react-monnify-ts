import { createContext } from 'react'

type MonnifyPaymentContextProps = {
  initializePayment: any
  onLoadStart: any
  onLoadComplete: any
  onComplete: any
  onClose: any
}

const MonnifyPaymentContext = createContext<MonnifyPaymentContextProps>({
  initializePayment: null,
  onLoadStart: null,
  onLoadComplete: null,
  onComplete: null,
  onClose: null,
})

export default MonnifyPaymentContext
