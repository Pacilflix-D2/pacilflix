import React, { useState } from 'react'
import SubscriptionPurchaseSection from '@/modules/SubscriptionModule/sections/SubscriptionPurchaseSection'
import { useAuthContext } from '@/components/contexts/AuthContext'

const SubscriptionManagementPage = () => {
  const { isAuthenticated } = useAuthContext()
  const [activeSubscriptions, setActiveSubscriptions] = useState([
    {
      name: 'Paket Basic',
      price: 99900,
      resolution: 'HD',
      supportedDevices: ['Smartphone'],
      startDate: '2024-04-01',
      endDate: '2024-05-01',
    },
  ])

  const [transactionHistory, setTransactionHistory] = useState([
    {
      packageName: 'Paket Standard',
      startDate: '2023-12-01',
      endDate: '2024-01-01',
      paymentMethod: 'Kartu Kredit',
      paymentDate: '2023-12-01',
      totalPayment: 149900,
    },
    {
      packageName: 'Paket Premium',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      paymentMethod: 'E-Wallet',
      paymentDate: '2024-01-01',
      totalPayment: 219900,
    },
  ])

  const startDate = new Date().toISOString().slice(0, 10)

  const availableSubscriptions = [
    {
      name: 'Paket Basic',
      price: 99900,
      resolution: 'HD',
      supportedDevices: ['Smartphone'],
      startDate: startDate,
      endDate: new Date(
        new Date(startDate).setMonth(new Date(startDate).getMonth() + 1)
      )
        .toISOString()
        .slice(0, 10),
    },
    {
      name: 'Paket Standard',
      price: 149900,
      resolution: 'Full HD',
      supportedDevices: ['Smartphone', 'Tablet', 'PC'],
      startDate: startDate,
      endDate: new Date(
        new Date(startDate).setMonth(new Date(startDate).getMonth() + 1)
      )
        .toISOString()
        .slice(0, 10),
    },
    {
      name: 'Paket Premium',
      price: 219900,
      resolution: 'Ultra HD',
      supportedDevices: ['Smartphone', 'Tablet', 'PC', 'Smart TV'],
      startDate: startDate,
      endDate: new Date(
        new Date(startDate).setMonth(new Date(startDate).getMonth() + 1)
      )
        .toISOString()
        .slice(0, 10),
    },
  ]

  if (!isAuthenticated) {
    return (
      <>
        <main className="py-28 grid grid-cols-1 gap-y-28"></main>
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-6xl font-bold">
            You need to log in to access this page.
          </h2>
        </div>
      </>
    )
  }

  const renderActiveSubscriptions = () => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Paket Langganan Aktif</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Nama</th>
              <th className="border border-gray-400 px-4 py-2">Harga</th>
              <th className="border border-gray-400 px-4 py-2">
                Resolusi Layar
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Dukungan Perangkat
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Tanggal Mulai
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Tanggal Berakhir
              </th>
            </tr>
          </thead>
          <tbody>
            {activeSubscriptions.map((subscription, index) => (
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
                  {subscription.startDate}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {subscription.endDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  const renderTransactionHistory = () => {
    return (
      <div className="mb-8">
        <table className="w-full border-collapse">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Riwayat Transaksi</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">
                    Nama Paket
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Tanggal Mulai
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Tanggal Berakhir
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Metode Pembayaran
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Tanggal Pembayaran
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Total Pembayaran
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((transaction, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2">
                      {transaction.packageName}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {transaction.startDate}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {transaction.endDate}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {transaction.paymentMethod}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {transaction.paymentDate}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {transaction.totalPayment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </table>
      </div>
    )
  }

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      <div className="p-8">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-6xl font-bold mb-8">Halaman Kelola Langganan.</h2>
        </div>
        {renderActiveSubscriptions()}
        <SubscriptionPurchaseSection
          setTransactionHistory={setTransactionHistory}
          availableSubscriptions={availableSubscriptions}
          setActiveSubscriptions={setActiveSubscriptions}
        />
        {renderTransactionHistory()}
      </div>
    </main>
  )
}

export default SubscriptionManagementPage
