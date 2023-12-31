export type MonnifyProps = {
  /**
   * development status | Should be set to true when using the sandbox and false when on production
   */
  isTestMode?: true | false
  /**
   * Merchant's API Key (Can be found on the Monnify dashboard)
   * https://app.monnify.com/developer
   */
  apiKey: string
  /**
   * Merchant's contract code (Can be found on the Monnify dashboard)
   * https://app.monnify.com/developer
   */
  contractCode: string
  /**
   * The amount to be paid by the customer
   */
  amount: number
  /**
   * The currency of the transaction being initialized. `NGN`
   */
  currency: string
  /**
   * Merchant's Unique reference for every transaction.
   * (The SDK already has a code snippet that generates this for you, but you can always replace it)
   */
  reference: string
  /**
   * Name of the customer
   */
  customerName: string
  /**
   * Email address of the customer
   */
  customerEmail: string
  /**
   * Phone number of the customer.
   */
  customerPhoneNumber: string
  /**
   * Description for the transaction. Will be used as the account name for bank transfer payments
   */
  paymentDescription?: string
  /**
   * Transaction Hash added to transaction response for security purposes.
   *  Click here {@link https://docs.teamapt.com/display/MON/Calculating+the+Transaction+Hash Monnify}.
   *  for information on how to calculate the hash value
   */
  transactionHash?: object
  /**
   * Status of the transaction ("PAID", "PENDING" or "FAILED")
   */
  paymentStatus?: 'PAID' | 'PENDING' | 'FAILED' | string
  /**
   * Object containing specifications on how payments to this reserve account should be split.
   */
  incomeSplitConfig?: MonnifySplitOptions[]
  /**
   * Redirect URL
   */
  redirectUrl?: string
  /**
   * When you need to pass extra data to the API.
   */
  metadata?: any

  'data-custom-button'?: string
}

export type MonnifySplitOptions = {
  /**
   * The unique reference for the sub account that should receive the split.
   */
  subAccountCode: string
  /**
   * Boolean to determine if the sub account should bear transaction fees or not
   */
  feeBearer?: boolean
  /**
   * The percentage of the transaction fee to be borne by the sub account
   */
  feePercentage?: number
  /**
   * The percentage of the amount paid to be split into the sub account.
   */
  splitPercentage?: string
  /**
   * The percentage of the amount paid to be split into the sub account.
   */
  splitAmount?: number
}
export type CompleteResponesProps = {
  /**
   * Status FAILED,SUCCESS
   */
  status: 'SUCCESS' | 'FAILED'
  message: string
  transactionReference: any
  paymentReference: any
  authorizedAmount: number
  redirectUrl: any
  paidOn: Date
  payload: {
    apiKey: string
    amount: number
    currency: string
    paymentReference: string
    paymentDescription: string
    transactionReference: any
    accessToken: null
    merchant: {
      name: string
      logo: any
    }
    enabledPaymentMethods: Array<string>
    customer: {
      fullName: string
      email: string
      mobileNumber: string
    }
    totalPayable: any
  }
}
export type UserCancelledResponseProps = {
  redirectUrl: any
  responseCode: 'USER_CANCELLED'
  paymentStatus: 'USER_CANCELLED'
  responseMessage: string
  authorizedAmount: any
}
