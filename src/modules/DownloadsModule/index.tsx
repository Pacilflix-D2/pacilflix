import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from '@/components/ui/table';
import { useAuthContext } from '@/components/contexts/AuthContext';
import { useRouter } from 'next/navigation';  

const DummyDownloads = [
  { id: '1', title: 'File A', downloadedAt: '2024-04-01 10:00:00' },
  { id: '2', title: 'File B', downloadedAt: '2024-04-02 11:00:00' },
  { id: '3', title: 'favorit 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222', timeAdded: '2024-04-02 11:00:00' },
];  

const DownloadsModule = () => {
  const [downloads, setDownloads] = useState(DummyDownloads);
  const {isAuthenticated} = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]); // React on changes to isAuthenticated, loading, or router

  const handleDelete = (downloadId: string) => {
    setDownloads(downloads.filter(download => download.id !== downloadId));
  };

  return (
    <main className="py-28 grid grid-cols-1 gap-y-15">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-5xl font-bold">Daftar Unduhan</h1>
        <p>Nonton dimana saja. Kapan saja.</p>
        <p>Walaupun tidak ada kuota.</p>
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
            {downloads.map((download) => (
              <TableRow key={download.id}>
                <TableCell>{download.title}</TableCell>
                <TableCell>{download.downloadedAt}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(download.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {downloads.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>No downloads added.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>  
    </main>  
  );
};

export default DownloadsModule;
