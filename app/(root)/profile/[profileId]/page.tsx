'use client'

import EmptyState from '@/components/empty-state';
import LoaderSpinner from '@/components/loader-spinner';
import PodcastCard from '@/components/podcast-card';
import ProfileCard from '@/components/profile-card';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react'

export default function ProfileIdPage({ params }: {
  params: {
    profileId: string
  }
}) {
  const user = useQuery(api.users.getUserById, {
    clerkId: params.profileId,
  });
  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: params.profileId,
  })

  if (!user || !podcastsData) return <LoaderSpinner />

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-[20px] font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard podcastData={podcastsData!}
          imageUrl={user?.imageUrl!}
          userFirstName={user?.name!}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-[20px] font-bold text-white-1">All Podcasts</h1>
        {podcastsData && podcastsData.podcasts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {podcastsData?.podcasts
              ?.slice(0, 4)
              .map((podcast) => (
                <PodcastCard
                  key={podcast._id}
                  imgUrl={podcast.imageUrl!}
                  title={podcast.podcastTitle!}
                  description={podcast.podcastDescription}
                  podcastId={podcast._id}
                />
              ))}
          </div>
        ) : (
          <EmptyState
            title="You have not created any podcasts yet"
            buttonLink="/create-podcast"
            buttonText="Create Podcast"
          />
        )}
      </section>
    </section>
  )
}
