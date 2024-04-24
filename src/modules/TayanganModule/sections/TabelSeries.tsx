import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { top10Films as series } from '@/components/constants/tayangan'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/components/contexts/AuthContext'

const TabelSeries = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()

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
          {series.map((series) => {
            const rilisDateObject = new Date(series.tanggalRilisTrailer)
            const rilisDate = rilisDateObject.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })

            return (
              <TableRow key={series.id}>
                <TableCell>{series.judul}</TableCell>
                <TableCell>{series.sinopsisTrailer}</TableCell>
                <TableCell>
                  <Link
                    href={series.urlTrailer}
                    target="_blank"
                    className="hover:underline"
                  >
                    {series.urlTrailer}
                  </Link>
                </TableCell>
                <TableCell>{rilisDate}</TableCell>
                {isAuthenticated && (
                  <TableCell>
                    <Button
                      onClick={() =>
                        router.push(`/tayangan/series/${series.id}`)
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
