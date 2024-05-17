import { Subscription } from '@/components/constants/subscription'
import { Transaction } from '@/components/constants/transaction'

export interface Props {
  setTransactionHistory: (transactions: Transaction[]) => void
  availableSubscriptions: Subscription[]
  setActiveSubscriptions: (subscriptions: Subscription) => void
}
