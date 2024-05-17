export interface FavoriteDetail {
  timestamp: string
  id: string
  judul: string
  timezone: string
}

export interface FavoriteDetailList {
  judul: string
  favorites: FavoriteDetail[]
}
