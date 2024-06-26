'use client'

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import { useAudio } from '@/providers/audio-provider';

export default function LeftSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useClerk()
  const { audio } = useAudio()

  return (
    <section className={cn("sticky left-0 top-0 flex w-fit flex-col justify-between border-none bg-black-1 pt-8 text-white-1 max-md:hidden lg:w-[270px] lg:pl-8 h-[calc(100vh-5px)]",
      audio?.audioUrl && 'h-[calc(100vh-140px)]'
    )}>
      <nav className="flex flex-col gap-6">
        <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center">
          <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
          <h1 className="text-[24px] font-extrabold text-white max-lg:hidden">Podcast-r</h1>
        </Link>

        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`)

          return <Link href={route} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",
            isActive && 'bg-nav-focus border-r-4 border-orange-1'
          )}>
            <Image src={imgURL} alt={label} width={24} height={24} />
            <p>{label}</p>
          </Link>
        })}
      </nav>
      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button asChild className="text-[16px] w-full bg-orange-1 font-extrabold">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button className="text-[16px] w-full bg-orange-1 font-extrabold" onClick={() => signOut(() => router.push('/'))}>
            Log Out
          </Button>
        </div>
      </SignedIn>
    </section>
  )
}
