import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Id } from '@/convex/_generated/dataModel'
import LoaderSpinner from './loader-spinner'
import { DotButton, useDotButton } from './embla-carousel-dot-button'

export interface TopPodcastersProps {
    _id: Id<'users'>
    _creationTime: number
    email: string
    imageUrl: string
    clerkId: string
    name: string
    podcast: {
        podcastTitle: string
        podcastId: Id<'podcasts'>
    }[]
    totalPodcasts: number
}

type Props = {
    fansLikeDetail: TopPodcastersProps[]
}

export default function EmblaCarousel({ fansLikeDetail }: Props) {
    const router = useRouter()

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay || !('stopOnInteraction' in autoplay.options)) return

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? (autoplay.reset as () => void)
                : (autoplay.stop as () => void)

        resetOrStop()
    }, [])

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onNavButtonClick
    )

    const slides = fansLikeDetail && fansLikeDetail?.filter((item: any) => item.totalPodcasts > 0)

    if (!slides) return <LoaderSpinner />

    return (
        <section className='flex w-full flex-col gap-4 overflow-hidden' ref={emblaRef}>
            <div className='flex'>
                {slides.slice(0, 5).map((item) => (
                    <figure
                        key={item._id}
                        className='relative flex h-fit aspect-square w-full flex-none cursor-pointer flex-col justify-end rounded-xl border-none'
                        onClick={() => router.push(`/podcasts/${item.podcast[0]?.podcastId}`)}
                    >
                        <Image
                            src={item.imageUrl}
                            alt='card'
                            fill
                            className='absolute size-full rounded-xl border-none'
                        />
                        <div className='glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4'>
                            <h2 className='text-14 font-semibold text-white-1'>{item.podcast[0]?.podcastTitle}</h2>
                            <p className='text-12 font-normal text-white-2'>{item.name}</p>
                        </div>
                    </figure>
                ))}
            </div>
            <div className='flex justify-center gap-2'>
                {scrollSnaps.map((_, index) => (
                    <DotButton key={index}
                        onClick={() => onDotButtonClick(index)}
                        selected={index === selectedIndex}
                    />
                ))}
            </div>
        </section>
    )
}
