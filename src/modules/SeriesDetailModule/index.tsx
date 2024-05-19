import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SeriesDetails } from './interface'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { Review } from '../FilmDetailModule/interface'
import ReviewsSection from './sections/ReviewsSection'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Favorite } from '../FavoritesModule/interface'
import { toast } from 'sonner'
import { Slider } from '@/components/ui/slider'

const SeriesDetailModule = () => {
  const router = useRouter()
  const { idSeries } = useParams<{ idSeries: string }>()
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const [series, setSeries] = useState<SeriesDetails | null>(null)
  const { customFetch, isAuthenticated } = useAuthContext()
  const [favorites, setFavorites] = useState<Favorite[] | null>(null)
  const [chosenJudulFavorite, setChosenJudulFavorite] = useState<string>('')
  const [progressNonton, setProgressNonton] = useState<number>(0)

  const [openModalTonton, setOpenModalTonton] = useState<boolean>(false)
  const [openModalFavorite, setOpenModalFavorite] = useState<boolean>(false)

  const addFavorite = () => {
    customFetch(`/api/favorites/detail/`, {
      method: 'POST',
      body: JSON.stringify({
        id_tayangan: idSeries,
        timestamp: favorites
          ?.filter((value) => value.judul == chosenJudulFavorite)[0]
          .timestamp.replace(/\.\d{6}Z$/, ''),
      }),
      isAuthorized: true,
    }).then((response) => {
      toast(response.message)
      setOpenModalFavorite(false)
    })
  }

  useEffect(() => {
    customFetch<SeriesDetails>(`/api/series/${idSeries}/`, {
      isAuthorized: isAuthenticated,
    }).then((response) => setSeries(response.data))

    customFetch<Review[]>(`/api/series/${idSeries}/reviews/`, {
      isAuthorized: isAuthenticated,
    }).then((response) => setReviews(response.data))

    customFetch<Favorite[]>('/api/favorites/', {
      isAuthorized: true,
    }).then((response) => {
      setFavorites(response.data)
    })
  }, [])

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      {series && (
        <>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-6xl font-bold">Judul: {series.judul}</h1>

            <div className="flex justify-center gap-2">
              <Dialog open={openModalTonton} onOpenChange={setOpenModalTonton}>
                <DialogTrigger>
                  <Button>Tonton Series</Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col gap-5">
                  <DialogHeader>
                    <DialogTitle>Tonton tayangan</DialogTitle>
                    <DialogDescription className="flex flex-col gap-2">
                      <p>Pura2 nonton aja :)</p>
                      <Slider
                        defaultValue={[progressNonton]}
                        max={100}
                        step={1}
                        onChange={(event: React.FormEvent<HTMLDivElement>) => {
                          console.log(event)

                          setProgressNonton(0)
                        }}
                      />
                      <Button onClick={() => setOpenModalTonton(false)}>
                        Submit tonton
                      </Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <Button>Unduh Tayangan</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sukses Mengunduh Tayangan!</DialogTitle>
                    <DialogDescription>
                      Selamat! Anda telah berhasil mengunduh {series?.judul} dan
                      akan berlaku hingga{' '}
                      {(() => {
                        const date = new Date()
                        date.setDate(date.getDate() + 7)
                        return date.toLocaleDateString()
                      })()}
                      . Cek informasi selengkapnya pada halaman daftar unduhan.
                    </DialogDescription>
                  </DialogHeader>

                  <Button onClick={() => router.push('/downloads')}>
                    Tombol Menuju Daftar Unduhan
                  </Button>
                </DialogContent>
              </Dialog>

              <Dialog
                open={openModalFavorite}
                onOpenChange={setOpenModalFavorite}
              >
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

          <div className="flex flex-col items-center gap-4">
            <section className="w-[95%] max-w-[1000px] mx-auto flex flex-col gap-4">
              <div>
                <strong>Episode: </strong>
                {series.episodes.length > 0 ? (
                  <ul>
                    {series.episodes.map((episode, index) => (
                      <li key={index}>
                        -{' '}
                        <Link
                          href={`/tayangan/series/${idSeries}/episode/${episode.sub_judul}/`}
                          className="hover:underline"
                        >
                          {episode.sub_judul}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Tidak ada episode</p>
                )}
              </div>

              <div>
                <strong>Total View: </strong>
                {series.total_views}
              </div>

              <div>
                <strong>Rating Rata-Rata: </strong>
                {series.rating_avg}
              </div>

              <div>
                <strong>Sinopsis: </strong>
                {series.sinopsis}
              </div>

              <div>
                <strong>Genre: </strong>
                <ul>
                  {series.genres.map((genre, index) => (
                    <li key={index}>- {genre.genre}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Asal Negara: </strong>
                {series.asal_negara}
              </div>

              <div>
                <strong>Pemain: </strong>
                <ul>
                  {series.players.map((player, index) => (
                    <li key={index}>- {player.nama}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Penulis Skenario: </strong>
                <ul>
                  {series.writers.map((writer, index) => (
                    <li key={index}>- {writer.nama}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Sutradara: </strong>
                {series.sutradara.nama}
              </div>
            </section>

            <ReviewsSection
              reviews={reviews}
              series={series}
              setReviews={setReviews}
            />
          </div>
        </>
      )}
    </main>
  )
}

export default SeriesDetailModule
