'use client'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Episode, EpisodeData, MainEpisode } from './interface'
import { Slider } from '@/components/ui/slider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

const EpisodeDetailModule = () => {
  const { idSeries, subJudulEpisode } = useParams<{
    idSeries: string
    subJudulEpisode: string
  }>()
  const [episode, setEpisode] = useState<MainEpisode | null>(null)
  const [anotherEpisodes, setAnotherEpisodes] = useState<Episode[] | null>(null)
  const { customFetch, isAuthenticated } = useAuthContext()

  const [progressNonton, setProgressNonton] = useState<number>(0)

  const [openModalTonton, setOpenModalTonton] = useState<boolean>(false)

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
              <Dialog open={openModalTonton} onOpenChange={setOpenModalTonton}>
                <DialogTrigger>
                  <Button>Tonton Episode</Button>
                </DialogTrigger>
                {episode && (
                  <DialogContent className="flex flex-col gap-5">
                    <DialogHeader>
                      <DialogTitle>Tonton tayangan</DialogTitle>
                      <DialogDescription className="flex flex-col gap-2">
                        <p>Pura2 nonton aja :)</p>
                        <Slider
                          defaultValue={[progressNonton]}
                          max={episode.durasi}
                          step={1}
                          onValueChange={(value: number[]) => {
                            console.log(value)

                            setProgressNonton(value[0])
                          }}
                        />
                        <Button
                          onClick={async () => {
                            const response = await customFetch(
                              `/api/series/${episode.id_series}/episodes/${episode.sub_judul}/`,
                              {
                                method: 'POST',
                                isAuthorized: true,
                                body: JSON.stringify({
                                  watch_duration: progressNonton,
                                }),
                              }
                            )

                            toast(response.message)

                            setOpenModalTonton(false)
                          }}
                        >
                          Submit tonton
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                )}
              </Dialog>
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
                {episode.durasi} Menit
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
