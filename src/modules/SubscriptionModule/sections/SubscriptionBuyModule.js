import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useAuthContext } from '@/components/contexts/AuthContext'

const SubscriptionBuyModule = ({
  selectedPackage,
  setTransactionHistory,
  setActiveSubscriptions,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const { customFetch } = useAuthContext()

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value)
  }

  const handleBayarClick = () => {
    const startDate = new Date().toISOString().slice(0, 10)
    const endDate = new Date(
      new Date(startDate).setMonth(new Date(startDate).getMonth() + 1)
    )
      .toISOString()
      .slice(0, 10)

    const newTransaction = {
      packageName: selectedPackage.name.split(' ')[1],
      startDate,
      endDate,
      paymentMethod: selectedPaymentMethod,
      paymentDate: startDate,
      totalPayment: selectedPackage.price,
    }

    const newActiveSubscriptions = {
      name: selectedPackage.name.split(' ')[1],
      price: selectedPackage.price,
      resolution: selectedPackage.resolution,
      supportedDevices: selectedPackage.supportedDevices,
      startDate: startDate,
      endDate: endDate,
    }

    customFetch('/api/subscriptions/buy/', {
      method: 'POST',
      body: JSON.stringify(newTransaction),
      isAuthorized: true,
    })
      .then((response) => {
        if (response && response.success) {
          setTransactionHistory((prevHistory) => {
            const latestTransaction = prevHistory[prevHistory.length - 1]
            const isOverdue = new Date(latestTransaction.endDate) < new Date()

            let updatedHistory
            if (isOverdue) {
              updatedHistory = [...prevHistory, newTransaction]
            } else {
              updatedHistory = prevHistory.map((transaction, index) =>
                index === prevHistory.length - 1 ? newTransaction : transaction
              )
            }

            localStorage.setItem(
              'transactionHistory',
              JSON.stringify(updatedHistory)
            )
            return updatedHistory
          })

          setActiveSubscriptions(newActiveSubscriptions)
          localStorage.setItem(
            'activeSubscriptions',
            JSON.stringify(newActiveSubscriptions)
          )

          setPaymentSuccess(true)
        } else {
          console.error('Unexpected response:', response)
        }
      })
      .catch((error) => console.error('Error:', error))
  }

  return (
    <div>
      <h2 className="text-black">Beli {selectedPackage.name}</h2>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="border border-gray-400 px-4 py-2 w-1/4 bg-gray-800 text-black">
              Nama Paket
            </TableCell>
            <TableCell className="border border-gray-400 px-4 py-2">
              {selectedPackage.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-400 px-4 py-2 bg-gray-800 text-black">
              Harga
            </TableCell>
            <TableCell className="border border-gray-400 px-4 py-2">
              {selectedPackage.price}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-400 px-4 py-2 bg-gray-800 text-black">
              Resolusi Layar
            </TableCell>
            <TableCell className="border border-gray-400 px-4 py-2">
              {selectedPackage.resolution}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-400 px-4 py-2 bg-gray-800 text-black">
              Dukungan Perangkat
            </TableCell>
            <TableCell className="border border-gray-400 px-4 py-2">
              {selectedPackage.supportedDevices.join(', ')}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-400 px-4 py-2 bg-gray-800 text-black">
              Metode Pembayaran
            </TableCell>
            <TableCell className="border border-gray-400 px-4 py-2">
              <select
                value={selectedPaymentMethod}
                onChange={handlePaymentMethodChange}
                className="w-full border border-gray-400 px-4 py-2 bg-gray-900 text-black"
              >
                <option value="">Pilih metode pembayaran</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
                <option value="E-Wallet">E-Wallet</option>
              </select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <button
        onClick={handleBayarClick}
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
      >
        Bayar
      </button>
      {paymentSuccess && <p className="text-green-500">Pembayaran berhasil</p>}
    </div>
  )
}

export default SubscriptionBuyModule
