export interface Episode {
  id_series: string
  sub_judul: string
  sinopsis: string
  durasi: number
  url_video: string
  release_date: string
}

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

export interface SeriesDetails {
  id_tayangan: string
  judul: string
  sinopsis: string
  asal_negara: string
  sinopsis_trailer: string
  url_video_trailer: string
  release_date_trailer: string
  episodes: Episode[]
  sutradara: Sutradara
  genres: Genre[]
  players: Contributor[]
  writers: Contributor[]
  total_views: number
  rating_avg: number
}
