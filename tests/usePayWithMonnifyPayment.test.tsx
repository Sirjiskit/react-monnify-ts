import * as React from 'react'
import { act, cleanup, fireEvent, render, renderHook } from '@testing-library/react'
import useMonnifyScript from '../src/monnify/script'
import usePayWithMonnifyPayment from '../src/monnify/payWithMonnify'
import { config } from './config'
import { loadMonnifySDK } from '../src/monnify/loadSDK'

jest.mock('../src/monnify/loadSDK')
describe('usePayWithMonnifyPayment()', () => {
  beforeEach(() => {
    // @ts-ignore
    loadMonnifySDK = jest.fn()
    renderHook(() => useMonnifyScript())
  })

  afterAll(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  it('should use usePayWithMonnifyPayment', () => {
    const { result, rerender } = renderHook(() => usePayWithMonnifyPayment(config as any))
    rerender()

    const onComplete = jest.fn()
    const onPaymentClose = jest.fn()
    act(() => {
      result.current(onComplete, onPaymentClose)
    })

    expect(onComplete).toHaveBeenCalledTimes(0)
    expect(onPaymentClose).toHaveBeenCalledTimes(0)
    expect(loadMonnifySDK).toHaveBeenCalledTimes(1)
  })

  it('should pass if initializePayment does not accept any args', () => {
    const { result, rerender } = renderHook(() => usePayWithMonnifyPayment(config as any))
    rerender()

    act(() => {
      result.current()
    })

    expect(loadMonnifySDK).toHaveBeenCalledTimes(1)
  })

  it('should useMonnifyPayment accept all parameters', () => {
    const { result, rerender } = renderHook(() =>
      usePayWithMonnifyPayment({
        ...config,
        metadata: JSON.stringify({
          custom_field: [
            {
              display_name: 'Mobile Number',
              variable_name: 'mobile_number',
              value: '+2348143109254',
            },
          ],
        }),
        currency: 'NGN',
        payment_method: ['mobile_money', 'ussd'],
      } as any),
    )
    rerender()
    act(() => {
      result.current()
    })

    expect(loadMonnifySDK).toHaveBeenCalledTimes(1)
  })

  it('should be accept trigger from other component', () => {
    const { result, rerender } = renderHook(() => usePayWithMonnifyPayment(config as any))
    rerender()
    const Btn = (): any => (
      <div>
        <button onClick={(): any => result.current()}>Donation</button>{' '}
      </div>
    )

    const { getByText }: Record<string, any> = render(<Btn />)
    // Click button
    fireEvent.click(getByText('Donation'))
    // @ts-ignore
    expect(loadMonnifySDK).toHaveBeenCalledTimes(1)
  })

  it('should accept being rendered in a container', () => {
    const wrapper: React.FC = ({ children }: Record<string, any>) => {
      return <div>{children}</div>
    }

    const { result, rerender } = renderHook(() => usePayWithMonnifyPayment(config as any), { wrapper })

    rerender()
    act(() => {
      result.current()
    })

    // @ts-ignore
    expect(loadMonnifySDK).toHaveBeenCalledTimes(1)
  })
})
