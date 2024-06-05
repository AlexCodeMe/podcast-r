'use client'

import EmptyState from '@/components/empty-state'
import LoaderSpinner from '@/components/loader-spinner'
import PodcastCard from '@/components/podcast-card'
import SearchBar from '@/components/search-bar'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

type Props = {
  searchParams: {
    search: string
  }
}

export default function DiscoverPage({ searchParams: { search } }: Props) {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, { search: search || '' })

  return (
    <div className="flex flex-col gap-9">
      <SearchBar />
      <div className="flex flex-col gap-9">
        <h1 className="text-[20px] font-bold text-white-1">
          {!search ? 'Discover Trending Podcasts' : 'Search results for '}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {podcastsData?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                  <PodcastCard key={_id}
                    imgUrl={imageUrl!}
                    title={podcastTitle}
                    description={podcastDescription}
                    podcastId={_id}
                  />
                ))}
              </div>
            ) : <EmptyState title="No results found" />}
          </>
        ) : <LoaderSpinner />}
      </div>
    </div>
  )
}
