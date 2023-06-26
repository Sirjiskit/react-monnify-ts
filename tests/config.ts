export const config = {
  customerEmail: 'user@example.com',
  amount: 10000,
}
test('Check config', () => {
  expect(config).toBe(config)
})
