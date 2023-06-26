import { cleanup, fireEvent, render, renderHook } from '@testing-library/react'
import { config } from './config'
import useMonnifyScript from '../src/monnify/script'
import React from 'react'
import MonnifyPaymentButton from '../src/monnify/button'
import { loadMonnifySDK } from '../src/monnify/loadSDK'

jest.mock('../src/monnify/loadSDK')

const componentProps = {
  options: config as any,
  className: 'btn',
  text: 'Make payment',
  onComplete: () => null,
  onPaymentClose: () => null,
}

describe('<MonnifyPaymentButton />', () => {
  beforeEach(() => {
    // @ts-ignore
    loadMonnifySDK = jest.fn()
    renderHook(() => useMonnifyScript())
  })

  afterAll(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  it('render MonnifyPaymentButton', () => {
    const tree = <MonnifyPaymentButton {...componentProps} />
    const { getByText }: Record<string, any> = render(tree)
    // Click button
    fireEvent.click(getByText('Make payment'))
    // @ts-ignore
    expect(loadMonnifySDK).toHaveBeenCalledTimes(1)
  })
})
