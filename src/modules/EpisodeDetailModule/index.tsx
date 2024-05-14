'use client'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Episode, EpisodeData, MainEpisode } from './interface'

const EpisodeDetailModule = () => {
  const { idSeries, subJudulEpisode } = useParams<{
    idSeries: string
    subJudulEpisode: string
  }>()
  const [episode, setEpisode] = useState<MainEpisode | null>(null)
  const [anotherEpisodes, setAnotherEpisodes] = useState<Episode[] | null>(null)
  const { customFetch, isAuthenticated } = useAuthContext()

  useEffect(() => {
    customFetch<EpisodeData>(
      `/api/series/${idSeries}/episodes/${subJudulEpisode}/`,
      {
        isAuthorized: isAuthenticated,
      }
    ).then((response) => {
      setEpisode(response.data.episode)
      setAnotherEpisodes(response.data.another_episodes)
    })
  }, [])

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      {episode && (
        <>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-6xl font-bold">Judul: {episode.judul}</h1>
            <h1 className="text-4xl font-bold">
              Sub-Judul: {episode.sub_judul}
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
                  {anotherEpisodes
                    ? anotherEpisodes.map((episode, index) => (
                        <li key={index}>
                          -{' '}
                          <Link
                            href={`/tayangan/series/${idSeries}/episode/${episode.sub_judul}`}
                            className="hover:underline"
                          >
                            {episode.sub_judul}
                          </Link>
                        </li>
                      ))
                    : 'Tidak ada episode lain.'}
                </ul>
              </div>

              <div>
                <strong>Sinopsis: </strong>
                {episode.sinopsis}
              </div>

              <div>
                <strong>Durasi Episode: </strong>
                {episode.durasi}
              </div>

              <div>
                <strong>URL Episode: </strong>
                {episode.url_video}
              </div>

              <div>
                <strong>Tanggal Rilis Episode: </strong>
                {new Date(episode.release_date).toLocaleDateString('id-ID', {
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
