import { top10Films } from '@/components/constants/tayangan'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const Top10Tayangan = () => {
  return (
    <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-4">
      <h2 className="font-semibold text-3xl">Top 10 Tayangan</h2>

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
                <TableCell className="font-medium">{film.peringkat}</TableCell>
                <TableCell>{film.judul}</TableCell>
                <TableCell>{film.sinopsisTrailer}</TableCell>
                <TableCell>{film.urlTrailer}</TableCell>
                <TableCell>{rilisDate}</TableCell>
                <TableCell>{film.totalView7HariTerakhir}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default Top10Tayangan
