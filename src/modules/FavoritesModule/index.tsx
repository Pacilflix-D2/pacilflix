import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from '@/components/ui/table';
import { useAuthContext } from '@/components/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const DummyFavorites = [
  { id: '1', title: 'favorit 1', timeAdded: '2024-04-01 10:00:00' },
  { id: '2', title: 'favorit 2', timeAdded: '2024-04-02 11:00:00' },
  { id: '3', title: 'favorit 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222', timeAdded: '2024-04-02 11:00:00' },
];

const FavoritesModule = () => {
  const [favorites, setDownloads] = useState(DummyFavorites);
  const {isAuthenticated} = useAuthContext()
  const router = useRouter()

  if (!isAuthenticated) {
    router.push("/")
  }

  const handleDelete = (favoriteId: string) => {
    setDownloads(favorites.filter(favorite => favorite.id !== favoriteId));
  };

  return (
    <main className="py-28 grid grid-cols-1 gap-y-15">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-5xl font-bold">Daftar Favorit</h1>
        <p>Semua film favorit Anda.</p>
        <p>Disatu tempat yang sama.</p>
      </div>
      <div className="container mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[33%]'>Title</TableHead>
              <TableHead className='w-[33%]'>Time added</TableHead>
              <TableHead className='w-[33%]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favorites.map((favorite) => (
              <TableRow key={favorite.id}>
                <TableCell>{favorite.title}</TableCell>
                <TableCell>{favorite.timeAdded}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(favorite.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {favorites.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>No favorites added.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>  
    </main>  
  );
}
export default FavoritesModule
