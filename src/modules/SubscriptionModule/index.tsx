import React, { useState } from 'react'
import SubscriptionPurchaseSection from '@/modules/SubscriptionModule/sections/SubscriptionPurchaseSection'
import { useAuthContext } from '@/components/contexts/AuthContext'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
        <Table>
          <TableCaption>Daftar Paket Langganan Aktif.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Resolusi Layar</TableHead>
              <TableHead>Dukungan Perangkat</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tanggal Berakhir</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeSubscriptions.map((subscription, index) => (
              <TableRow key={index}>
                <TableCell>{subscription.name}</TableCell>
                <TableCell>{subscription.price}</TableCell>
                <TableCell>{subscription.resolution}</TableCell>
                <TableCell>
                  {subscription.supportedDevices.join(', ')}
                </TableCell>
                <TableCell>{subscription.startDate}</TableCell>
                <TableCell>{subscription.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  const renderTransactionHistory = () => {
    return (
      <div className="mb-8">
        <Table>
          <TableCaption>Riwayat Transaksi.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Paket</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tanggal Berakhir</TableHead>
              <TableHead>Metode Pembayaran</TableHead>
              <TableHead>Tanggal Pembayaran</TableHead>
              <TableHead>Total Pembayaran</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionHistory.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.packageName}</TableCell>
                <TableCell>{transaction.startDate}</TableCell>
                <TableCell>{transaction.endDate}</TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell>{transaction.paymentDate}</TableCell>
                <TableCell>{transaction.totalPayment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
