import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SeriesDetails } from './interface'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { Review } from '../FilmDetailModule/interface'
import ReviewsSection from './sections/ReviewsSection'

const SeriesDetailModule = () => {
  const { idSeries } = useParams<{ idSeries: string }>()
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const [series, setSeries] = useState<SeriesDetails | null>(null)
  const { customFetch, isAuthenticated } = useAuthContext()

  useEffect(() => {
    customFetch<SeriesDetails>(`/api/series/${idSeries}/`, {
      isAuthorized: isAuthenticated,
    }).then((response) => setSeries(response.data))

    customFetch<Review[]>(`/api/series/${idSeries}/reviews/`, {
      isAuthorized: isAuthenticated,
    }).then((response) => setReviews(response.data))
  }, [])

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      {series && (
        <>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-6xl font-bold">Judul: {series.judul}</h1>

            <div className="flex justify-center gap-2">
              <Button>Unduh Tayangan</Button>
              <Button>Tambah Favorit</Button>
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
