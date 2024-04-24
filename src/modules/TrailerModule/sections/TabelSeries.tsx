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

const TabelSeries = () => {
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
          {series.map((film) => {
            const rilisDateObject = new Date(film.tanggalRilisTrailer)
            const rilisDate = rilisDateObject.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })

            return (
              <TableRow key={film.id}>
                <TableCell>{film.judul}</TableCell>
                <TableCell>{film.sinopsisTrailer}</TableCell>
                <TableCell>{film.urlTrailer}</TableCell>
                <TableCell>{rilisDate}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default TabelSeries
