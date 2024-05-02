'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export interface Episode {
  judul: string
  subjudul: string
  anotherEpisode: {
    id: string
    judul: string
    href: string
  }[]
  sinopsis: string
  durasiEpisode: number
  urlEpisode: string
  tanggalRilisEpisode: Date
}

const EpisodeDetailModule = () => {
  const { idSeries } = useParams<{
    idSeries: string
    idEpisode: string
  }>()
  const [episode, setEpisode] = useState<Episode | null>(null)

  useEffect(() => {
    const dummyEpisode: Episode = {
      judul: 'Episode 1',
      subjudul: 'The Beginning',
      anotherEpisode: [
        { id: '1', judul: 'Another Episode 1', href: '/another-episode-1' },
        { id: '2', judul: 'Another Episode 2', href: '/another-episode-2' },
      ],
      sinopsis: 'Sinopsis of Episode 1',
      durasiEpisode: 60,
      urlEpisode:
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUjcmljayBhc3RsZXkgbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D',
      tanggalRilisEpisode: new Date('2024-05-01'),
    }

    setEpisode(dummyEpisode)
  }, [])

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      {episode && (
        <>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-6xl font-bold">Judul: {episode.judul}</h1>
            <h1 className="text-4xl font-bold">
              Sub-Judul: {episode.subjudul}
            </h1>

            <div className="flex justify-center gap-2">
              <Button>Tonton Episode</Button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <section className="w-[95%] max-w-[1000px] mx-auto flex flex-col gap-4">
              <div>
                <strong>Episode lainnya: </strong>
                <ul>
                  {episode.anotherEpisode.map((episode, index) => (
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
                <strong>Sinopsis: </strong>
                {episode.sinopsis}
              </div>

              <div>
                <strong>Durasi Episode: </strong>
                {episode.durasiEpisode}
              </div>

              <div>
                <strong>URL Episode: </strong>
                {episode.urlEpisode}
              </div>

              <div>
                <strong>Tanggal Rilis Episode: </strong>
                {episode.tanggalRilisEpisode.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </section>
          </div>
        </>
      )}
    </main>
  )
}

export default EpisodeDetailModule
