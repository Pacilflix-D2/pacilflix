'use client'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { Button } from '@/components/ui/button'
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
import { Tayangan } from '../interface'

const TableTop10 = ({ top10Shows }: { top10Shows: Tayangan[] | null }) => {
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()

  return (
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
        {top10Shows &&
          top10Shows.map((show, index) => {
            const rilisDateObject = new Date(show.release_date_trailer)
            const rilisDate = rilisDateObject.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })

            return (
              <TableRow key={show.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{show.judul}</TableCell>
                <TableCell>{show.sinopsis_trailer}</TableCell>
                <TableCell>
                  <Link
                    href={show.url_video_trailer}
                    target="_blank"
                    className="hover:underline"
                  >
                    {show.url_video_trailer}
                  </Link>
                </TableCell>
                <TableCell>{rilisDate}</TableCell>
                <TableCell>{show.total_views}</TableCell>
                {isAuthenticated && (
                  <TableCell>
                    <Button
                      onClick={() =>
                        router.push(
                          show.type === 'FILM'
                            ? `/tayangan/film/${show.id}`
                            : `/tayangan/series/${show.id}`
                        )
                      }
                    >
                      Detail {show.type == 'FILM' ? 'Film' : 'Series'}
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}

const Top10Tayangan = () => {
  const { isAuthenticated, customFetch } = useAuthContext()
  const [top10Shows, setTop10Shows] = useState<Tayangan[] | null>(null)
  const [tabValue, setTabValue] = useState<string>('top-10-global')

  useEffect(() => {
    customFetch<Tayangan[]>(
      `/api/shows/top-10/${tabValue == 'top-10-negara-pengguna' ? 'country/' : ''}`,
      {
        isAuthorized: isAuthenticated,
      }
    ).then((response) => setTop10Shows(response.data))
  }, [tabValue])

  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-4">
      <h2 className="font-semibold text-3xl">Top 10 Tayangan</h2>

      <Tabs
        defaultValue={tabValue}
        className="min-w-[400px] w-full flex flex-col gap-4"
        onValueChange={(value: string) => setTabValue(value)}
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
          <TableTop10 top10Shows={top10Shows} />
        </TabsContent>

        <TabsContent value="top-10-negara-pengguna">
          <TableTop10 top10Shows={top10Shows} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Top10Tayangan
