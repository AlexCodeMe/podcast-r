'use client'

import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import Header from './header'
import EmblaCarousel from './carousel'
import { useAudio } from '@/providers/audio-provider'

export default function RightSidebar() {
    const { user } = useUser()
    const topPodcasters = useQuery(api.users.getTopUserByPodcastCount)
    const router = useRouter()
    const { audio } = useAudio()

    return (
        <section className={cn(
            'sticky right-0 top-0 flex w-[310px] flex-col overflow-y-hidden border-none bg-black-1 px-[30px] pt-8 max-xl:hidden h-[calc(100vh-5px)]', {
            'h-[calc(100vh-140px)]': audio?.audioUrl
        })}>
            <SignedIn>
                <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
                    <UserButton />
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-[16px] truncate font-semibold text-white-1">{user?.firstName} {user?.lastName}</h1>
                        <Image src="/icons/right-arrow.svg"
                            alt="arrow"
                            width={24} height={24}
                        />
                    </div>
                </Link>
            </SignedIn>
            <section>
                <Header headerTitle="Fans Like You" />
                <EmblaCarousel fansLikeDetail={topPodcasters!} />
            </section>
            <section className="flex flex-col gap-8 pt-12">
                <Header headerTitle="Top Podcast-rs" />
                <div className="flex flex-col gap-6">
                    {topPodcasters?.slice(0, 3).map((podcaster) => (
                        <div key={podcaster._id}
                            className="flex cursor-pointer justify-between"
                            onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
                        >
                            <figure className="flex items-center gap-2">
                                <Image src={podcaster.imageUrl}
                                    alt={podcaster.name}
                                    width={44} height={44}
                                    className="aspect-square rounded-lg"
                                />
                                <h2 className="text-[14px] font-semibold text-white-1">{podcaster.name}</h2>
                            </figure>
                            <div className="flex items-center">
                                <p className="text-[12px] font-normal text-white-1">
                                    {podcaster.totalPodcasts} podcasts
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}
