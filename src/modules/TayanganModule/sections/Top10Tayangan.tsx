import { top10Films } from '@/components/constants/tayangan'
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

const Top10Tayangan = () => {
  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-4">
      <h2 className="font-semibold text-3xl">Top 10 Tayangan</h2>

      <Tabs
        defaultValue="top-10-global"
        className="min-w-[400px] w-full flex flex-col gap-4"
      >
        <TabsList className="max-w-[400px] mx-auto grid w-full grid-cols-2">
          <TabsTrigger value="top-10-global">Top 10 Global</TabsTrigger>
          <TabsTrigger value="top-10-negara-pengguna">
            Top 10 Negara Pengguna
          </TabsTrigger>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {top10Films.map((film) => {
                const rilisDateObject = new Date(film.tanggalRilisTrailer)
                const rilisDate = rilisDateObject.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })

                return (
                  <TableRow key={film.id}>
                    <TableCell className="font-medium">
                      {film.peringkat}
                    </TableCell>
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
                    <TableCell>{film.totalView7HariTerakhir}</TableCell>
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
