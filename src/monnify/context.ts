import { createContext } from 'react'

type MonnifyPaymentContextProps = {
  initializePayment: any
  onComplete: () => void
  onPaymentClose: () => void
}

const MonnifyPaymentContext = createContext<MonnifyPaymentContextProps>({
  initializePayment: null,
  onComplete: () => null,
  onPaymentClose: () => null,
})

export default MonnifyPaymentContext
