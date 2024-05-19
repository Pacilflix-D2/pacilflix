import React, { useEffect, useState } from 'react'
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
import {
  Subscription,
  availableSubscriptions,
} from '@/components/constants/subscription'
import { Transaction } from '@/components/constants/transaction'

const SubscriptionManagementPage = () => {
  const { isAuthenticated, customFetch } = useAuthContext()

  const localActiveSubscriptions =
    typeof window !== 'undefined'
      ? localStorage.getItem('activeSubscriptions')
      : null
  const localTransactionHistory =
    typeof window !== 'undefined'
      ? localStorage.getItem('transactionHistory')
      : null

  const [activeSubscriptions, setActiveSubscriptions] = useState<Subscription>(
    localActiveSubscriptions ? JSON.parse(localActiveSubscriptions) : null
  )
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    localTransactionHistory ? JSON.parse(localTransactionHistory) : null
  )

  useEffect(() => {
    if (isAuthenticated) {
      if (!activeSubscriptions) {
        customFetch('/api/subscriptions/active/', { isAuthorized: true })
          .then((response) => {
            if (response && response.data) {
              setActiveSubscriptions(response.data)
              localStorage.setItem(
                'activeSubscriptions',
                JSON.stringify(response.data)
              )
            } else {
              console.error('Unexpected response:', response)
            }
          })
          .catch((error) => console.error('Error:', error))
      }

      if (!transactionHistory) {
        customFetch('/api/subscriptions/history/', { isAuthorized: true })
          .then((response) => {
            if (response && response.data) {
              setTransactionHistory(response.data)
              localStorage.setItem(
                'transactionHistory',
                JSON.stringify(response.data)
              )
            } else {
              console.error('Unexpected response:', response)
            }
          })
          .catch((error) => console.error('Error:', error))
      }
    }
  }, [])

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
    if (!activeSubscriptions) {
      return null
    }

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
            <TableRow>
              <TableCell>{activeSubscriptions.name}</TableCell>
              <TableCell>{activeSubscriptions.price}</TableCell>
              <TableCell>{activeSubscriptions.resolution}</TableCell>
              <TableCell>
                {activeSubscriptions.supportedDevices.join(', ')}
              </TableCell>
              <TableCell>{activeSubscriptions.startDate}</TableCell>
              <TableCell>{activeSubscriptions.endDate}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  const renderTransactionHistory = () => {
    if (!transactionHistory) {
      return null
    }

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
