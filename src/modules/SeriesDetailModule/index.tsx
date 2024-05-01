import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export interface Genre {
  nama: string
}

export interface Actor {
  nama: string
}

export interface ScenarioWriter {
  nama: string
}

export interface Review {
  username: string
  comment: string
  rating: number
}

export interface Episode {
  id: string
  judul: string
}

export interface Series {
  judul: string
  episodes: Episode[]
  totalView: number
  ratingAvg: number
  sinopsis: string
  genres: Genre[]
  asalNegara: string
  actors: Actor[]
  scenarioWriters: ScenarioWriter[]
  sutradara: string
  reviews: Review[]
}

const SeriesDetailModule = () => {
  const { idSeries } = useParams<{ idSeries: string }>()
  const [series, setSeries] = useState<Series | null>(null)

  useEffect(() => {
    // Dummy data for Genre interface
    const dummyGenres: Genre[] = [
      { nama: 'Action' },
      { nama: 'Comedy' },
      { nama: 'Drama' },
    ]

    // Dummy data for Actor interface
    const dummyActors: Actor[] = [
      { nama: 'John Doe' },
      { nama: 'Jane Smith' },
      { nama: 'Michael Johnson' },
    ]

    // Dummy data for ScenarioWriter interface
    const dummyScenarioWriters: ScenarioWriter[] = [
      { nama: 'David Brown' },
      { nama: 'Sarah Taylor' },
      { nama: 'Chris Evans' },
    ]

    // Dummy data for Review interface
    const dummyReviews: Review[] = [
      { username: 'user1', comment: 'Great series!', rating: 4.5 },
      { username: 'user2', comment: 'Amazing actors!', rating: 5 },
      { username: 'user3', comment: 'Interesting plot twists.', rating: 4 },
    ]

    // Dummy data for Episode interface
    const dummyEpisodes: Episode[] = [
      { id: '1', judul: 'Episode 1' },
      { id: '2', judul: 'Episode 2' },
      { id: '3', judul: 'Episode 3' },
    ]

    // Dummy data for Series interface
    const dummySeries: Series = {
      judul: 'Dummy Series',
      episodes: dummyEpisodes, // Using dummy episodes data
      totalView: 1000000, // Dummy total views
      ratingAvg: 4.3, // Dummy average rating
      sinopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // Dummy synopsis
      genres: dummyGenres, // Using dummy genres data
      asalNegara: 'United States', // Dummy country of origin
      actors: dummyActors, // Using dummy actors data
      scenarioWriters: dummyScenarioWriters, // Using dummy scenario writers data
      sutradara: 'Christopher Nolan', // Dummy director
      reviews: dummyReviews, // Using dummy reviews data
    }

    setSeries(dummySeries)
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
                <ul>
                  {series.episodes.map((episode, index) => (
                    <li key={index}>
                      -{' '}
                      <Link
                        href={`/tayangan/series/${idSeries}/episode/${episode.id}`}
                        className="hover:underline"
                      >
                        {episode.judul}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Total View: </strong>
                {series.totalView}
              </div>

              <div>
                <strong>Rating Rata-Rata: </strong>
                {series.ratingAvg}
              </div>

              <div>
                <strong>Sinopsis: </strong>
                {series.sinopsis}
              </div>

              <div>
                <strong>Genre: </strong>
                <ul>
                  {series.genres.map((genre, index) => (
                    <li key={index}>- {genre.nama}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Asal Negara: </strong>
                {series.asalNegara}
              </div>

              <div>
                <strong>Pemain: </strong>
                <ul>
                  {series.actors.map((actor, index) => (
                    <li key={index}>- {actor.nama}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Penulis Skenario: </strong>
                <ul>
                  {series.scenarioWriters.map((scenarioWriter, index) => (
                    <li key={index}>- {scenarioWriter.nama}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Sutradara: </strong>
                {series.asalNegara}
              </div>
            </section>

            <section className="w-[95%] max-w-[1000px] mx-auto flex flex-col gap-4">
              <h2 className="font-bold text-2xl">Review</h2>

              {series.reviews.map((review, index) => {
                return (
                  <div
                    key={index}
                    className="bg-accent rounded-md p-4 flex flex-col gap-1"
                  >
                    <h3>
                      <strong>{review.username}</strong> | {review.rating}/10
                    </h3>
                    <p>{review.comment}</p>
                  </div>
                )
              })}
            </section>
          </div>
        </>
      )}
    </main>
  )
}

export default SeriesDetailModule
