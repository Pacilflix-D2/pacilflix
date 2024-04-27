import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

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

export interface Film {
  judul: string
  totalView: string
  ratingAvg: number
  sinopsis: string
  durasi: number
  tanggalRilisFilm: string
  urlFilm: string
  genres: Genre[]
  asalNegara: string
  actors: Actor[]
  scenarioWriters: ScenarioWriter[]
  sutradara: string
  reviews: Review[]
}

const FilmDetailModule = () => {
  const params = useParams<{ idFilm: string }>()
  const [film, setFilm] = useState<Film | null>(null)

  useEffect(() => {
    console.log(params)

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
      { username: 'user1', comment: 'Great movie!', rating: 4.5 },
      {
        username: 'user2',
        comment: 'Awesome performance by the actors.',
        rating: 5,
      },
      { username: 'user3', comment: 'Loved the plot twists.', rating: 4 },
    ]

    // Dummy data for Film interface
    const dummyFilm: Film = {
      judul: 'Dummy Film',
      totalView: '1000000', // Dummy total views
      ratingAvg: 4.3, // Dummy average rating
      sinopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // Dummy synopsis
      durasi: 120, // Dummy duration in minutes
      tanggalRilisFilm: '2024-04-27', // Dummy release date
      urlFilm: 'http://example.com/dummyfilm', // Dummy URL
      genres: dummyGenres, // Using dummy genres data
      asalNegara: 'United States', // Dummy country of origin
      actors: dummyActors, // Using dummy actors data
      scenarioWriters: dummyScenarioWriters, // Using dummy scenario writers data
      sutradara: 'Christopher Nolan', // Dummy director
      reviews: dummyReviews, // Using dummy reviews data
    }

    setFilm(dummyFilm)
  }, [params])

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold">Judul: {film?.judul}</h1>

        <div className="flex justify-center gap-2">
          <Button>Tonton Film</Button>
          <Button>Unduh Tayangan</Button>
          <Button>Tambah Favorit</Button>
        </div>
      </div>

      {film && (
        <>
          <section className="w-[95%] max-w-[1000px] mx-auto flex flex-col gap-4">
            <div>
              <strong>Total View: </strong>
              {film.totalView}
            </div>

            <div>
              <strong>Rating Rata-Rata: </strong>
              {film.ratingAvg}
            </div>

            <div>
              <strong>Sinopsis: </strong>
              {film.sinopsis}
            </div>

            <div>
              <strong>Durasi Film: </strong>
              {film.durasi}
            </div>

            <div>
              <strong>Tanggal Rilis Film: </strong>
              {film.tanggalRilisFilm}
            </div>

            <div>
              <strong>URL Film: </strong>
              {film.urlFilm}
            </div>

            <div>
              <strong>Genre: </strong>
              <ul>
                {film.genres.map((genre, index) => (
                  <li key={index}>- {genre.nama}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Asal Negara: </strong>
              {film.asalNegara}
            </div>

            <div>
              <strong>Pemain: </strong>
              <ul>
                {film.actors.map((genre, index) => (
                  <li key={index}>- {genre.nama}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Penulis Skenario: </strong>
              <ul>
                {film.actors.map((genre, index) => (
                  <li key={index}>- {genre.nama}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Sutradara: </strong>
              {film.asalNegara}
            </div>
          </section>

          <section className="w-[95%] max-w-[1000px] mx-auto flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Review</h2>

            {film.reviews.map((review, index) => {
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
        </>
      )}
    </main>
  )
}

export default FilmDetailModule
