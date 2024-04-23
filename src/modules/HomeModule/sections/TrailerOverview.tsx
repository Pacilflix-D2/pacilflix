'use client'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { trailers } from '@/components/constants/trailer'

const TrailerOverview = () => {
  return (
    <Carousel
      className="max-w-[1000px] max-h-[562.5px] mx-auto"
      plugins={[Autoplay({ delay: 2000 })]}
    >
      <CarouselContent>
        {trailers.map((trailer, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center">
                  <Image
                    src={trailer.imageUrl}
                    alt=""
                    className="w-full"
                    width={500}
                    height={1000}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default TrailerOverview
