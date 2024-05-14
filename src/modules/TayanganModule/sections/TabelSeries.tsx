import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { Series } from '../interface'

const TabelSeries = () => {
  const router = useRouter()
  const { isAuthenticated, customFetch } = useAuthContext()
  const [series, setSeries] = useState<Series[] | null>(null)

  useEffect(() => {
    customFetch<Series[]>('/api/series/').then((response) =>
      setSeries(response.data)
    )
  }, [])

  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-4">
      <h2 className="font-semibold text-3xl">Series</h2>

      <Table>
        <TableCaption>Daftar Series Yang Tersedia.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Sinopsis Trailer</TableHead>
            <TableHead>URL Trailer</TableHead>
            <TableHead>Tanggal Rilis Trailer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {series &&
            series.map((series) => {
              const rilisDateObject = new Date(series.release_date_trailer)
              const rilisDate = rilisDateObject.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })

              return (
                <TableRow key={series.id_tayangan}>
                  <TableCell>{series.judul}</TableCell>
                  <TableCell>{series.sinopsis_trailer}</TableCell>
                  <TableCell>
                    <Link
                      href={series.url_video_trailer}
                      target="_blank"
                      className="hover:underline"
                    >
                      {series.url_video_trailer}
                    </Link>
                  </TableCell>
                  <TableCell>{rilisDate}</TableCell>
                  {isAuthenticated && (
                    <TableCell>
                      <Button
                        onClick={() =>
                          router.push(`/tayangan/series/${series.id_tayangan}`)
                        }
                      >
                        Detail Series
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}

export default TabelSeries
