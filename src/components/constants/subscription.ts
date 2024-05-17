const startDate = new Date().toISOString().slice(0, 10)

export interface Subscription {
  name: string
  price: number
  resolution: string
  supportedDevices: string[]
  startDate: string
  endDate: string
}

export const availableSubscriptions = [
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

export interface activeSubscription {
  name: string
  price: number
  resolution: string
  supportedDevices: string[]
  startDate: string
  endDate: string
}
