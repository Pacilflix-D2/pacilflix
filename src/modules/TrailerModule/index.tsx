'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { FormSchema } from './form'

const TrailerModule = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast('You submitted the following values:', {
      description: JSON.stringify(data, null, 2),
    })
  }

  return (
    <main className="pt-28 grid grid-cols-1 gap-y-28">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-6xl font-bold">Daftar Tayangan.</h1>
        <p>Nobar. Bersama teman. Ciptakan kenangan.</p>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-center gap-2"
          >
            <FormField
              control={form.control}
              name="username"
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
      </div>
    </main>
  )
}

export default TrailerModule
