'use client'

import React from 'react'

export default function DiscoverPage() {
  return (
    <div className="flex flex-col gap-9">
      {/* <Searchbar /> */}
      <p className='text-6xl text-white-1'>DISCOVER!! </p>
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {/* {!search ? 'Discover Trending Podcasts' : 'Search results for '}
          {search && <span className="text-white-2">{search}</span>} */}
        </h1>
        {/* {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="podcast_grid">
              {podcastsData?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                <PodcastCard 
                  key={_id}
                  imgUrl={imageUrl!}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id}
                />
              ))}
            </div>
            ) : <EmptyState title="No results found" />}
          </>
        ) : <LoaderSpinner />} */}
      </div>
    </div>
  )
}
