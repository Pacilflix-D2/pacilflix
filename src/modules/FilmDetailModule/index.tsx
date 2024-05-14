import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { FilmDetails, Review } from './interface'

const FilmDetailModule = () => {
  const params = useParams<{ idFilm: string }>()
  const [film, setFilm] = useState<FilmDetails | null>(null)
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const { customFetch, isAuthenticated } = useAuthContext()

  useEffect(() => {
    customFetch<FilmDetails>(`/api/film/${params.idFilm}/`, {
      isAuthorized: isAuthenticated,
    }).then((response) => setFilm(response.data))

    customFetch<Review[]>(`/api/film/${params.idFilm}/reviews/`, {
      isAuthorized: isAuthenticated,
    }).then((response) => setReviews(response.data))
  }, [params])

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold">Judul: {film?.judul}</h1>

        <div className="flex justify-center gap-2">
          <Button>Tonton Film</Button>

          <Dialog>
            <DialogTrigger>
              <Button>Unduh Tayangan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sukses Mengunduh Tayangan!</DialogTitle>
                <DialogDescription>
                  Selamat! Anda telah berhasil mengunduh {film?.judul} dan akan
                  berlaku hingga 9 Mei 2004. Cek informasi selengkapnya pada
                  halaman daftar unduhan.
                </DialogDescription>
              </DialogHeader>

              <Button>Tombol Menuju Daftar Unduhan</Button>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Button>Tambah Favorit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi</DialogTitle>
                <DialogDescription>
                  Apakah kamu ingin menambah ke daftar favorit?
                </DialogDescription>
                <Button>Tambahkan ke Favorit</Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {film && (
        <>
          <section className="w-[95%] max-w-[1000px] mx-auto flex flex-col gap-4">
            <div>
              <strong>Total View: </strong>
              {film.total_views}
            </div>

            <div>
              <strong>Rating Rata-Rata: </strong>
              {film.rating_avg}
            </div>

            <div>
              <strong>Sinopsis: </strong>
              {film.sinopsis}
            </div>

            <div>
              <strong>Durasi Film: </strong>
              {film.durasi_film}
            </div>

            <div>
              <strong>Tanggal Rilis Film: </strong>
              {film.release_date_film}
            </div>

            <div>
              <strong>URL Film: </strong>
              {film.url_video_film}
            </div>

            <div>
              <strong>Genre: </strong>
              <ul>
                {film.genres.map((genre, index) => (
                  <li key={index}>- {genre.genre}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Asal Negara: </strong>
              {film.asal_negara}
            </div>

            <div>
              <strong>Pemain: </strong>
              <ul>
                {film.players.map((player, index) => (
                  <li key={index}>- {player.nama}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Penulis Skenario: </strong>
              <ul>
                {film.writers.map((scenarioWriter, index) => (
                  <li key={index}>- {scenarioWriter.nama}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Sutradara: </strong>
              {film.sutradara.nama}
            </div>
          </section>

          <section className="w-[95%] max-w-[1000px] mx-auto flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Review</h2>

            {reviews &&
              reviews.map((review, index) => {
                return (
                  <div
                    key={index}
                    className="bg-accent rounded-md p-4 flex flex-col gap-1"
                  >
                    <h3>
                      <strong>{review.username}</strong> | {review.rating}/10
                    </h3>
                    <p>{review.deskripsi}</p>
                  </div>
                )
              })}
          </section>
        </>
      )}
    </main>
  )
}

export default FilmDetailModule
