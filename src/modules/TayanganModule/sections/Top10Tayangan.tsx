'use client'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Movie } from '../interface'

const Top10Tayangan = () => {
  const router = useRouter()
  const { isAuthenticated, customFetch } = useAuthContext()
  const [top10Films, setTop10Films] = useState<Movie[] | null>(null)

  useEffect(() => {
    customFetch<Movie[]>('/api/shows/top-10/', {
      isAuthorized: isAuthenticated,
    }).then((response) => setTop10Films(response.data))
  }, [])

  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-4">
      <h2 className="font-semibold text-3xl">Top 10 Tayangan</h2>

      <Tabs
        defaultValue="top-10-global"
        className="min-w-[400px] w-full flex flex-col gap-4"
      >
        <TabsList
          className={`max-w-[400px] mx-auto grid w-full ${isAuthenticated ? 'grid-cols-2' : 'grid-cols-1'}`}
        >
          <TabsTrigger value="top-10-global">Top 10 Global</TabsTrigger>
          {isAuthenticated && (
            <TabsTrigger value="top-10-negara-pengguna">
              Top 10 Negara Pengguna
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="top-10-global">
          <Table>
            <TableCaption>Top 10 Tayangan Saat Ini.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Peringkat</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Sinopsis Trailer</TableHead>
                <TableHead>URL Trailer</TableHead>
                <TableHead>Tanggal Rilis Trailer</TableHead>
                <TableHead>Total View 7 Hari Terakhir</TableHead>
                {isAuthenticated && <TableHead>Tayangan</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {top10Films &&
                top10Films.map((film, index) => {
                  const rilisDateObject = new Date(film.release_date_trailer)
                  const rilisDate = rilisDateObject.toLocaleDateString(
                    'id-ID',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }
                  )

                  return (
                    <TableRow key={film.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{film.judul}</TableCell>
                      <TableCell>{film.sinopsis_trailer}</TableCell>
                      <TableCell>
                        <Link
                          href={film.url_video_trailer}
                          target="_blank"
                          className="hover:underline"
                        >
                          {film.url_video_trailer}
                        </Link>
                      </TableCell>
                      <TableCell>{rilisDate}</TableCell>
                      <TableCell>{film.total_views}</TableCell>
                      {isAuthenticated && (
                        <TableCell>
                          <Button
                            onClick={() =>
                              router.push(`/tayangan/film/${film.id}`)
                            }
                          >
                            Detail Film
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="top-10-negara-pengguna">
          <Skeleton className="h-[200px] w-full" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Top10Tayangan
