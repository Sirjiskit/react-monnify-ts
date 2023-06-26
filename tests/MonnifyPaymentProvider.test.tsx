import { cleanup, fireEvent, render, renderHook } from '@testing-library/react'
import useMonnifyScript from '../src/monnify/script'
import { config } from './config'
import { loadMonnifySDK } from '../src/monnify/loadSDK'
import PayWIthMonnifyPayment from '../src/monnify/payment'
import React from 'react'
jest.mock('../src/monnify/loadSDK')

const componentProps = {
  options: config as any,
  text: 'Make payment',
  onSuccess: () => null,
  onClose: () => null,
}

describe('<MonnifyPaymentProvider />', () => {
  beforeEach(() => {
    // @ts-ignore
    loadMonnifySDK = jest.fn()
    renderHook(() => useMonnifyScript())
  })

  afterAll(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  it('render MonnifyPaymentProvider', () => {
    const tree = (
      <PayWIthMonnifyPayment {...componentProps}>
        {({ initializePayment }: Record<string, any>) => (
          <button onClick={() => initializePayment()}>Use render props 2000</button>
        )}
      </PayWIthMonnifyPayment>
    )
    const { getByText }: Record<string, any> = render(tree)
    // Click button
    fireEvent.click(getByText('Use render props 2000'))
    // @ts-ignore
    expect(loadMonnifySDK).toHaveBeenCalledTimes(1)
  })
})
