export const loadMonnifySDK = (monnifyPaymentArgs: Record<string, any>): void => {
  //@ts-ignore
  window.MonnifySDK && window.MonnifySDK.initialize(monnifyPaymentArgs)
}
