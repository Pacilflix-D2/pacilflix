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
import ReviewsSection from './sections/ReviewsSection'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Favorite } from '../FavoritesModule/interface'
import { toast } from 'sonner'

const FilmDetailModule = () => {
  const params = useParams<{ idFilm: string }>()
  const [film, setFilm] = useState<FilmDetails | null>(null)
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const { customFetch, isAuthenticated } = useAuthContext()
  const [favorites, setFavorites] = useState<Favorite[] | null>(null)
  const [chosenJudulFavorite, setChosenJudulFavorite] = useState<string>('')

  const [openModalDownload, setOpenModalDownload] = useState<boolean>(false)
  const [openModalFavorite, setOpenModalFavorite] = useState<boolean>(false)

  const addFavorite = () => {
    customFetch(`/api/favorites/detail/`, {
      method: 'POST',
      body: JSON.stringify({
        id_tayangan: params.idFilm,
        timestamp: favorites
          ?.filter((value) => value.judul == chosenJudulFavorite)[0]
          .timestamp.replace(/\.\d{6}Z$/, ''),
      }),
      isAuthorized: true,
    }).then((response) => {
      toast(response.message)
    })
  }

  useEffect(() => {
    customFetch<FilmDetails>(`/api/film/${params.idFilm}/`, {
      isAuthorized: isAuthenticated,
    }).then((response) => setFilm(response.data))

    customFetch<Review[]>(`/api/film/${params.idFilm}/reviews/`, {
      isAuthorized: isAuthenticated,
    }).then((response) => setReviews(response.data))

    customFetch<Favorite[]>('/api/favorites/', {
      isAuthorized: true,
    }).then((response) => {
      setFavorites(response.data)
    })
  }, [params])

  useEffect(() => {
    if (openModalDownload && film) {
      customFetch('/api/downloads/', {
        isAuthorized: true,
        body: JSON.stringify({
          id_tayangan: film.id_tayangan,
          timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, ''),
        }),
        method: 'POST',
      }).then((response) => {
        toast(response.message)
        setOpenModalDownload(false)
      })
    }
  }, [openModalDownload])

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold">Judul: {film?.judul}</h1>

        <div className="flex justify-center gap-2">
          <Button>Tonton Film</Button>

          <Dialog open={openModalDownload} onOpenChange={setOpenModalDownload}>
            <DialogTrigger>
              <Button>Unduh Tayangan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sukses Mengunduh Tayangan!</DialogTitle>
                <DialogDescription>
                  Selamat! Anda telah berhasil mengunduh {film?.judul} dan akan
                  berlaku hingga {new Date().setDate(new Date().getDate() + 7)}.
                  Cek informasi selengkapnya pada halaman daftar unduhan.
                </DialogDescription>
              </DialogHeader>

              <Button>Tombol Menuju Daftar Unduhan</Button>
            </DialogContent>
          </Dialog>

          <Dialog open={openModalFavorite} onOpenChange={setOpenModalFavorite}>
            <DialogTrigger>
              <Button>Tambah Favorit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex flex-col gap-3">
                <DialogTitle>Konfirmasi</DialogTitle>
                <DialogDescription className="flex flex-col gap-3">
                  <p>Pilih folder favorit</p>
                  <Select
                    onValueChange={(value: string) =>
                      setChosenJudulFavorite(value)
                    }
                    value={chosenJudulFavorite}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Daftar favorit" />
                    </SelectTrigger>
                    <SelectContent>
                      {favorites &&
                        favorites.map((favorite, index) => {
                          return (
                            <SelectItem key={index} value={favorite.judul}>
                              {favorite.judul}
                            </SelectItem>
                          )
                        })}
                    </SelectContent>
                  </Select>
                </DialogDescription>
                <Button onClick={addFavorite}>Tambahkan ke Favorit</Button>
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

          <ReviewsSection
            reviews={reviews}
            setReviews={setReviews}
            film={film}
          />
        </>
      )}
    </main>
  )
}

export default FilmDetailModule
