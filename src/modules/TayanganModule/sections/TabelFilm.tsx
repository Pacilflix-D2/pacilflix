'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React from 'react'
import { top10Films as films } from '@/components/constants/tayangan'
import Link from 'next/link'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const TabelFilm = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()

  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-4">
      <h2 className="font-semibold text-3xl">Film</h2>

      <Table>
        <TableCaption>Daftar Film Yang Tersedia.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Sinopsis Trailer</TableHead>
            <TableHead>URL Trailer</TableHead>
            <TableHead>Tanggal Rilis Trailer</TableHead>
            {isAuthenticated && <TableHead>Tayangan</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {films.map((film) => {
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
                <TableCell>
                  <Link
                    href={film.urlTrailer}
                    target="_blank"
                    className="hover:underline"
                  >
                    {film.urlTrailer}
                  </Link>
                </TableCell>
                <TableCell>{rilisDate}</TableCell>
                {isAuthenticated && (
                  <TableCell>
                    <Button
                      onClick={() => router.push(`/tayangan/film/${film.id}`)}
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
    </div>
  )
}

export default TabelFilm
