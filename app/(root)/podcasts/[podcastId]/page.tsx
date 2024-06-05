'use client'

import EmptyState from '@/components/empty-state';
import LoaderSpinner from '@/components/loader-spinner';
import PodcastCard from '@/components/podcast-card';
import PodcastDetailPlayer from '@/components/podcast-detail-player';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import Image from 'next/image'
import React from 'react'

export default function PodcastDetailsPage({ params: { podcastId } }: { params: { podcastId: Id<'podcasts'> } }) {
  const { user } = useUser();

  console.log('podcast id:', podcastId)
  const podcast = useQuery(api.podcasts.getPodcastById, { podcastId })
  console.log('podcast:', podcast)

  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, { podcastId })

  const isOwner = user?.id === podcast?.authorId;

  if (!similarPodcasts || !podcast) return <LoaderSpinner />

  return (
    <section className='flex w-full flex-col'>
      <header className='mt-9 flex items-center justify-between'>
        <h1 className="text-[20px] leading-normal font-bold text-white-1">
          Currenty Playing
        </h1>
        <figure className="flex gap-3">
          <Image src="/icons/headphone.svg" alt="headphone"
            width={24} height={24}
          />
          <h2 className="text-[16px] font-bold text-white-1">{podcast?.views}</h2>
        </figure>
      </header>

      <PodcastDetailPlayer {...podcast}
        isOwner={isOwner}
        podcastId={podcast._id}
      />

      <p className="text-white-2 text-[16px] pb-8 pt-[45px] font-medium max-md:text-center">{podcast?.podcastDescription}</p>

      <div className="flex flex-col gap-8">
        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-bold text-white-1'>Transcription</h1>
          <p className="text-[16px] font-medium text-white-2">{podcast?.voicePrompt}</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-bold text-white-1'>Thumbnail Prompt</h1>
          <p className="text-[16px] font-medium text-white-2">{podcast?.imagePrompt}</p>
        </div>
      </div>

      <div className='mt-8 flex flex-col gap-5'>
        <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>

        {similarPodcasts && similarPodcasts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {similarPodcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
              <PodcastCard key={_id}
                imgUrl={imageUrl as string}
                title={podcastTitle}
                description={podcastDescription}
                podcastId={_id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No similar podcasts found"
            buttonLink="/discover"
            buttonText="Discover more podcasts"
          />
        )}
      </div>
    </section>
  )
}
