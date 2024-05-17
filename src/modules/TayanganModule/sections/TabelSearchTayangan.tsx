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
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tayangan } from '../interface'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/components/contexts/AuthContext'

const TabelSearchTayangan = ({ shows }: { shows: Tayangan[] }) => {
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()

  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-4">
      <h2 className="font-semibold text-3xl">Tayangan yang dicari</h2>

      <Table>
        <TableCaption>Daftar Tayangan Yang Dicari.</TableCaption>
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
          {shows.length > 0 ? (
            shows.map((show) => {
              const rilisDateObject = new Date(show.release_date_trailer)
              const rilisDate = rilisDateObject.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })

              return (
                <TableRow key={show.id}>
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
            })
          ) : (
            <p className="text-center mx-auto p-4 font-bold">
              Tidak ada hasil pencarian
            </p>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TabelSearchTayangan
