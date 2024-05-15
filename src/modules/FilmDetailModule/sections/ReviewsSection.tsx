import React from 'react'
import { FilmDetails, Review } from '../interface'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from '@/modules/FilmDetailModule/form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const ReviewsSection = ({
  reviews,
  setReviews,
  film,
}: {
  reviews: Review[] | null
  setReviews: React.Dispatch<React.SetStateAction<Review[] | null>>
  film: FilmDetails | null
}) => {
  const { customFetch } = useAuthContext()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: '',
      rating: '0',
    },
  })

  async function sendReview(data: z.infer<typeof FormSchema>) {
    const { description, rating } = data

    if (film) {
      const response = await customFetch<Review[]>(
        `/api/film/${film.id_tayangan}/reviews/`,
        {
          isAuthorized: true,
          method: 'POST',
          body: JSON.stringify({
            description,
            rating,
          }),
        }
      )

      toast(response.message)
      setReviews(response.data)
    } else {
      toast('Gagal mengirim review, film null.')
      router.push('/')
    }
  }

  return (
    <section className="w-[95%] max-w-[1000px] mx-auto flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Review</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(sendReview)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan komentar review anda..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, index) => index).map(
                      (_, index) => {
                        return (
                          <SelectItem value={index.toString()} key={index}>
                            {index}
                          </SelectItem>
                        )
                      }
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Send Review</Button>
        </form>
      </Form>

      {reviews ? (
        reviews.map((review, index) => {
          return (
            <div
              key={index}
              className="bg-accent rounded-md p-4 flex flex-col gap-1"
            >
              <h3>
                <strong>{review.username}</strong> | {review.rating}/10
              </h3>
              <p>{review.deskripsi}</p>
            </div>
          )
        })
      ) : (
        <p>Belum ada review.</p>
      )}
    </section>
  )
}

export default ReviewsSection
