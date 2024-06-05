'use client'

import PodcastCard from "@/components/podcast-card"
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts)

  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className='flex flex-col gap-5'>
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {trendingPodcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
            <PodcastCard 
              key={_id}
              imgUrl={imageUrl as string}
              title={podcastTitle}
              description={podcastDescription}
              podcastId={_id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
