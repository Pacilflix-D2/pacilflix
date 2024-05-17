import React, { useState } from 'react'
import SubscriptionBuyModule from '@/modules/SubscriptionModule/sections/SubscriptionBuyModule'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Subscription } from '@/components/constants/subscription'
import { Props } from '@/components/constants/props'

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
      <Table>
        <TableCaption>Beli Paket Langganan Baru</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Resolusi Layar</TableHead>
            <TableHead>Dukungan Perangkat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availableSubscriptions.map((subscription, index) => (
            <TableRow key={index}>
              <TableCell>{subscription.name}</TableCell>
              <TableCell>{subscription.price}</TableCell>
              <TableCell>{subscription.resolution}</TableCell>
              <TableCell>{subscription.supportedDevices.join(', ')}</TableCell>
              <TableCell>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleBeliClick(subscription)}
                >
                  Beli
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
