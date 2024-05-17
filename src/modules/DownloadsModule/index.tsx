import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Download } from './interface'

const DownloadsModule = () => {
  const [downloads, setDownloads] = useState<Download[] | null>(null)
  const { isAuthenticated, isLoading, customFetch } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    customFetch<Download[]>('/api/downloads/', { isAuthorized: true }).then(
      (response) => setDownloads(response.data)
    )
  }, [])

  const handleDelete = (timestamp: string, id_tayangan: string) => {
    customFetch<Download[]>('/api/downloads/', {
      isAuthorized: true,
      body: JSON.stringify({
        timestamp: timestamp.replace(/\.\d{6}Z$/, ''),
        id_tayangan,
      }),
      method: 'DELETE',
    }).then((response) => setDownloads(response.data))
  }

  if (isLoading) {
    return (
      <main className="py-28 grid grid-cols-1 gap-y-15">
        <p className="text-center mx-auto ">Loading...</p>
      </main>
    )
  } else {
    return (
      <main className="py-28 grid grid-cols-1 gap-y-15">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-5xl font-bold">Daftar Unduhan</h1>
          <p>Nonton dimana saja. Kapan saja.</p>
        </div>
        <div className="container mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Downloaded at</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {downloads &&
                downloads.map((download, index) => (
                  <TableRow key={index}>
                    <TableCell>{download.judul}</TableCell>
                    <TableCell>
                      {new Date(download.timestamp).toString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          handleDelete(download.timestamp, download.id_tayangan)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {(downloads == null || downloads.length === 0) && (
                <TableRow>
                  <TableCell colSpan={3}>No downloads added.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    )
  }
}

export default DownloadsModule
