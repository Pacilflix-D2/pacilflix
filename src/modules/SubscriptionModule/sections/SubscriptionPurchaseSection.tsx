import React, { useState } from 'react'
import SubscriptionBuyModule from '@/modules/SubscriptionModule/sections/SubscriptionBuyModule'

interface Subscription {
  name: string
  price: number
  resolution: string
  supportedDevices: string[]
  startDate: string
  endDate: string
}

interface Transaction {
  packageName: string
  startDate: string
  endDate: string
  paymentMethod: string
  paymentDate: string
  totalPayment: number
}

interface Props {
  setTransactionHistory: (transactions: Transaction[]) => void
  availableSubscriptions: Subscription[]
  setActiveSubscriptions: (subscriptions: Subscription[]) => void
}

const SubscriptionPurchaseSection: React.FC<Props> = ({
  setTransactionHistory,
  availableSubscriptions,
  setActiveSubscriptions,
}) => {
  const [selectedPackage, setSelectedPackage] = useState(
    null as Subscription | null
  )

  const handleBeliClick = (packageInfo: Subscription) => {
    setSelectedPackage(packageInfo)
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Beli Paket Langganan Baru</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Nama Paket</th>
            <th className="border border-gray-400 px-4 py-2">Harga</th>
            <th className="border border-gray-400 px-4 py-2">Resolusi Layar</th>
            <th className="border border-gray-400 px-4 py-2">
              Dukungan Perangkat
            </th>
            <th className="border border-gray-400 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {availableSubscriptions.map((subscription, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">
                {subscription.name}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {subscription.price}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {subscription.resolution}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {subscription.supportedDevices.join(', ')}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleBeliClick(subscription)}
                >
                  Beli
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPackage && (
        <SubscriptionBuyModule
          selectedPackage={selectedPackage}
          setTransactionHistory={setTransactionHistory}
          setActiveSubscriptions={setActiveSubscriptions}
        />
      )}
    </div>
  )
}

export default SubscriptionPurchaseSection
