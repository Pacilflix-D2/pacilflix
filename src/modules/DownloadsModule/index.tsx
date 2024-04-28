import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from '@/components/ui/table';

const DummyDownloads = [
  { id: '1', title: 'File A', downloadedAt: '2024-04-01 10:00:00' },
  { id: '2', title: 'File B', downloadedAt: '2024-04-02 11:00:00' },
];  

const DownloadsModule = () => {
  const [downloads, setDownloads] = useState(DummyDownloads);

  const handleDelete = (downloadId: string) => {
    setDownloads(downloads.filter(download => download.id !== downloadId));
  };

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      <div className="container mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Downloaded At</TableHead>
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
                <TableCell colSpan={3}>No downloads available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>  
    </main>  
  );
};

export default DownloadsModule;
