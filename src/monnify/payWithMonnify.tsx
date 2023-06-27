/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { MonnifyProps } from '../types'
import { loadMonnifySDK } from './loadSDK'
import useMonnifyScript from './script'

export default function usePayWithMonnifyPayment(
  options: MonnifyProps,
): (onLoadStart?: any, onLoadComplete?: any, onComplete?: any, onClose?: any) => void {
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

  const formatPayload = (obj: any): any => {
    // tslint:disable-next-line:prefer-const
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName]
      }
    }
    return obj
  }

  function initializePayment(onLoadStart: any, onLoadComplete: any, onComplete?: any, onClose?: any): void {
    if (scriptError) {
      throw new Error('Unable to load monnify inline script')
    }

    if (scriptLoaded) {
      const monnifyPaymentArgs: Record<string, any> = {
        onComplete: onComplete ? onComplete : (_e: any): any => null,
        onClose: onClose ? onClose : (_e: any): any => null,
        onLoadStart: onLoadStart ? onLoadStart : (_e: any): any => null,
        onLoadComplete: onLoadComplete ? onLoadComplete : (_e: any): any => null,
        isTestMode,
        apiKey,
        contractCode,
        amount,
        reference,
        currency: currency || 'NGN',
        customerName: customerName || '',
        customerFullName: customerName || '',
        customerEmail: customerEmail || '',
        customerMobileNumber: customerPhoneNumber || '',
        customerPhoneNumber: customerPhoneNumber || '',
        paymentDescription: paymentDescription || '',
        redirectUrl: redirectUrl || '',
        metadata: metadata || {},
        incomeSplitConfig: incomeSplitConfig || null,
        'data-custom-button': options['data-custom-button'] || '',
      }
      loadMonnifySDK(formatPayload(monnifyPaymentArgs))
    }
  }

  React.useEffect(() => {
    if (scriptError) {
      throw new Error('Unable to load monnify inline script')
    }
  }, [scriptError])

  return initializePayment
}
