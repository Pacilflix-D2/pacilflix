import React, { useState } from 'react'
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
import { contributors } from '@/components/constants/contributors'

const ContributorsPage = () => {
  const [filterType, setFilterType] = useState('all-contributors')

  const filteredContributors =
    filterType === 'all-contributors'
      ? contributors
      : contributors.filter((contributor) =>
          contributor.tipe.includes(filterType)
        )

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-6xl font-bold">Daftar Kontributor.</h1>
      </div>
      <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-4">
        <Tabs
          defaultValue="all-contributors"
          className="min-w-[400px] w-full flex flex-col gap-4"
        >
          <TabsList className="max-w-[700px] mx-auto grid w-full grid-cols-4 gap-2 justify-center">
            <TabsTrigger
              value="all-contributors"
              onClick={() => setFilterType('all-contributors')}
            >
              Semua Kontributor
            </TabsTrigger>
            <TabsTrigger
              value="Sutradara"
              onClick={() => setFilterType('Sutradara')}
            >
              Sutradara
            </TabsTrigger>
            <TabsTrigger value="Pemain" onClick={() => setFilterType('Pemain')}>
              Pemain
            </TabsTrigger>
            <TabsTrigger
              value="Penulis Skenario"
              onClick={() => setFilterType('Penulis Skenario')}
            >
              Penulis Skenario
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filterType}>
            <Table>
              <TableCaption>Daftar semua kontributor.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Jenis Kelamin</TableHead>
                  <TableHead>Kewarganegaraan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContributors.map((contributor, index) => (
                  <TableRow key={index}>
                    <TableCell>{contributor.nama}</TableCell>
                    <TableCell>{contributor.tipe.join(', ')}</TableCell>
                    <TableCell>{contributor.jenisKelamin}</TableCell>
                    <TableCell>{contributor.kewarganegaraan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Additional TabsContent for filtering if needed */}
        </Tabs>
      </div>
    </main>
  )
}

export default ContributorsPage
