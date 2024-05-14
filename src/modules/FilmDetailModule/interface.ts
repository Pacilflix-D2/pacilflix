export interface Sutradara {
  id: string
  nama: string
  jenis_kelamin: number
  kewarganegaraan: string
}

export interface Genre {
  id_tayangan: string
  genre: string
}

export interface Contributor {
  id_contributor: string
  nama: string
  jenis_kelamin: number
  kewarganegaraan: string
}

export interface FilmDetails {
  id_tayangan: string
  url_video_film: string
  release_date_film: string
  durasi_film: number
  judul: string
  sinopsis: string
  asal_negara: string
  sinopsis_trailer: string
  url_video_trailer: string
  release_date_trailer: string
  sutradara: Sutradara
  genres: Genre[]
  players: Contributor[]
  writers: Contributor[]
  total_views: number
  rating_avg: number
}

export interface Review {
  id_tayangan: string
  username: string
  timestamp: string
  rating: number
  deskripsi: string
}
