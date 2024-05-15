'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { FormSchema } from './form'
import Top10Tayangan from './sections/Top10Tayangan'
import TabelFilm from './sections/TabelFilm'
import TabelSeries from './sections/TabelSeries'
import { Tayangan } from './interface'
import { useAuthContext } from '@/components/contexts/AuthContext'
import TabelSearchTayangan from './sections/TabelSearchTayangan'

const TayanganModule = () => {
  const [searchedShows, setSearchedShows] = useState<Tayangan[] | null>(null)
  const { customFetch, isAuthenticated } = useAuthContext()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tayanganTitle: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast('You search this show:', {
      description: data.tayanganTitle,
    })

    customFetch<Tayangan[]>(`/api/shows/search/?search=${data.tayanganTitle}`, {
      isAuthorized: isAuthenticated,
    }).then((response) => setSearchedShows(response.data))
  }

  return (
    <main className="py-28 grid grid-cols-1 gap-y-28">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-6xl font-bold">Daftar Tayangan.</h1>
        <p>Nobar. Bersama teman. Ciptakan kenangan.</p>
      </div>

      <div className="grid grid-cols-1 gap-y-16">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-center gap-2"
          >
            <FormField
              control={form.control}
              name="tayanganTitle"
              render={({ field }) => (
                <FormItem className="min-w-[300px]">
                  <FormControl>
                    <Input placeholder="Cari Judul Tayangan." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              <Search />
            </Button>
          </form>
        </Form>

        {searchedShows ? (
          <TabelSearchTayangan shows={searchedShows} />
        ) : (
          <>
            <Top10Tayangan />

            <TabelFilm />

            <TabelSeries />
          </>
        )}
      </div>
    </main>
  )
}

export default TayanganModule
