export interface Tayangan {
  id: string
  judul: string
  sinopsis: string
  asal_negara: string
  sinopsis_trailer: string
  url_video_trailer: string
  release_date_trailer: string
  id_sutradara: string
  total_views: number
}

export interface Film {
  id_tayangan: string
  url_video_film: string
  release_date_film: string
  durasi_film: number
  id: string
  judul: string
  sinopsis: string
  asal_negara: string
  sinopsis_trailer: string
  url_video_trailer: string
  release_date_trailer: string
  id_sutradara: string
}

export interface Series {
  id_tayangan: string
  judul: string
  sinopsis: string
  asal_negara: string
  sinopsis_trailer: string
  url_video_trailer: string
  release_date_trailer: string
  id_sutradara: string
}
