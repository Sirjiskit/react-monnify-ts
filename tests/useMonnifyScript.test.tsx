import { cleanup, renderHook } from '@testing-library/react'
import useMonnifyScript from '../src/monnify/script'

describe('useMonnifyScript()', () => {
  afterAll(() => {
    cleanup()
    document.body.innerHTML = ''
  })

  it('adds the script to the dom', () => {
    const { result } = renderHook(() => useMonnifyScript())

    expect(result.current[0]).toBe(false)
    expect(result.current[1]).toBe(false)
    expect(document.getElementsByTagName('script')).toBeDefined()
  })

  it('Will not load multi inline script', () => {
    renderHook(() => useMonnifyScript())
    const { result } = renderHook(() => useMonnifyScript())

    expect(result.current[0]).toBe(true)
    expect(result.current[1]).toBe(false)
    expect(document.getElementsByTagName('script').length).toBe(1)
    expect(document.body.innerHTML).toMatch(new RegExp('https://sandbox.sdk.monnify.com/plugin/monnify.js'))
  })
})
