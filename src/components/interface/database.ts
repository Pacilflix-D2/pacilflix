export interface Sutradara {
  id: string
}

export interface Tayangan {
  id: string
  judul: string
  sinopsis: string
  asalNegara: string
  sinopsisTrailer: string
  urlVideoTrailer: string
  releaseDatetrailer: Date
  idSutradara: string
}

export interface Pengguna {
  username: string
  tayangan: Tayangan
}

export interface Paket {
  nama: string
  harga: number
  resolusi_layar: string
}

export interface DukunganPerangkat {
  nama_paket: string
  dukungan_perangkat: string
}

export interface Series {
  tayangan: Tayangan
}

export interface Film {
  tayangan: Tayangan
  urlVideoFilm: string
  releaseDateFilm: Date
  durasi: number
}

export interface Episode {
  series: Series
  subJudul: string
  sinopsis: string
  durasi: number
  urlVideo: string
  releaseDate: Date
}

export interface Ulasan {
  username: string
  timestamp: Date
  rating: number
  deskripsi: string
}
