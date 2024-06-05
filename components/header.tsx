import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    headerTitle?: string
    titleClassName?: string
}

export default function Header({ headerTitle, titleClassName}: Props) {
  return (
    <header className="flex items-center justify-between">
      {headerTitle ? (
        <h1 className={cn('text-[18px] font-bold text-white-1', titleClassName)}>{headerTitle}</h1>
      ): <div />}
      <Link href="/discover" className="text-[16px] font-semibold text-orange-1">
        See all
      </Link>
    </header>
  )
}