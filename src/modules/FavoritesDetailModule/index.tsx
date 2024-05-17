'use client'
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
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { FavoriteDetailList } from './interface'

const FavoritesDetailModule = () => {
  const [favoriteDetail, setFavoriteDetail] =
    useState<FavoriteDetailList | null>(null)
  const { isAuthenticated, isLoading, customFetch } = useAuthContext()
  const router = useRouter()
  const { timestampFavorite } = useParams<{ timestampFavorite: string }>()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    customFetch<FavoriteDetailList>(
      `/api/favorites/detail/?timestamp=${timestampFavorite}`,
      {
        isAuthorized: true,
      }
    ).then((response) => setFavoriteDetail(response.data))
  }, [])

  const handleDelete = async (id_tayangan: string, timestamp: string) => {
    await customFetch<FavoriteDetailList>('/api/favorites/detail/', {
      isAuthorized: true,
      method: 'DELETE',
      body: JSON.stringify({
        id_tayangan,
        timestamp: new Date(timestamp).toISOString().replace(/\.\d{3}Z$/, ''),
      }),
    }).then((response) => {
      setFavoriteDetail(response.data)
      toast(response.message)
    })
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
          <h1 className="text-5xl font-bold">{favoriteDetail?.judul}</h1>
          <p>Semua film favorit Anda.</p>
          <p>Disatu tempat yang sama.</p>
        </div>
        <div className="container mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[33%]">Title Tayangan</TableHead>
                <TableHead className="w-[33%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {favoriteDetail &&
                favoriteDetail.favorites.map((favorite) => {
                  return (
                    <TableRow key={`${favorite.timestamp}===${favorite.id}`}>
                      <TableCell>{favorite.judul}</TableCell>
                      <TableCell>
                        <Button
                          onClick={async () =>
                            await handleDelete(favorite.id, favorite.timestamp)
                          }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {(!favoriteDetail || favoriteDetail.favorites.length === 0) && (
                <TableRow>
                  <TableCell colSpan={3}>No favorite tayangan added.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    )
  }
}

export default FavoritesDetailModule
