import React, { useState } from 'react'

const SubscriptionBuyModule = ({
  selectedPackage,
  setTransactionHistory,
  setActiveSubscriptions,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)

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
      packageName: selectedPackage.name,
      startDate,
      endDate,
      paymentMethod: selectedPaymentMethod,
      paymentDate: startDate,
      totalPayment: selectedPackage.price,
    }

    const newSubscription = selectedPackage

    setTransactionHistory((prevHistory) => [...prevHistory, newTransaction])
    setActiveSubscriptions([newSubscription])

    setPaymentSuccess(true)
  }

  return (
    <div>
      <h2 className="text-black">Beli {selectedPackage.name}</h2>
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2 w-1/4 bg-gray-800 text-black">
              Nama Paket
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {selectedPackage.name}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 bg-gray-800 text-black">
              Harga
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {selectedPackage.price}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 bg-gray-800 text-black">
              Resolusi Layar
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {selectedPackage.resolution}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 bg-gray-800 text-black">
              Dukungan Perangkat
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {selectedPackage.supportedDevices.join(', ')}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 bg-gray-800 text-black">
              Metode Pembayaran
            </td>
            <td className="border border-gray-400 px-4 py-2">
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
            </td>
          </tr>
        </tbody>
      </table>
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
