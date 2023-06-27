import React from 'react'
import { MonnifyProps } from '../types'
import { loadMonnifySDK } from './loadSDK'
import useMonnifyScript from './script'

export default function usePayWithMonnifyPayment(
  options: MonnifyProps,
): (onComplete?: () => void, onPaymentClose?: () => void) => void {
  const [scriptLoaded, scriptError] = useMonnifyScript(options.isTestMode)
  const {
    isTestMode,
    apiKey,
    contractCode,
    amount,
    reference,
    currency,
    customerName,
    customerEmail,
    customerPhoneNumber,
    paymentDescription,
    redirectUrl,
    metadata,
    incomeSplitConfig,
  } = options

  const clean = (obj: any): any => {
    // tslint:disable-next-line:prefer-const
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName]
      }
    }
    return obj
  }

  function initializePayment(onComplete?: () => void, onPaymentClose?: () => void): void {
    if (scriptError) {
      throw new Error('Unable to load monnify inline script')
    }

    if (scriptLoaded) {
      const monnifyPaymentArgs: Record<string, any> = {
        onComplete: onComplete ? onComplete : (): any => null,
        onClose: onPaymentClose ? onPaymentClose : (): any => null,
        isTestMode,
        apiKey,
        contractCode,
        amount,
        reference,
        currency: currency || 'NGN',
        customerFullName: customerName || '',
        customerEmail: customerEmail || '',
        customerMobileNumber: customerPhoneNumber || '',
        paymentDescription: paymentDescription || '',
        redirectUrl: redirectUrl || '',
        metadata: metadata || {},
        incomeSplitConfig: incomeSplitConfig || null,
        'data-custom-button': options['data-custom-button'] || '',
      }
      loadMonnifySDK(clean(monnifyPaymentArgs))
    }
  }

  React.useEffect(() => {
    if (scriptError) {
      throw new Error('Unable to load monnify inline script')
    }
  }, [scriptError])

  return initializePayment
}
