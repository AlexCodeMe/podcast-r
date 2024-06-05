import { cn } from '@/lib/utils'
import React from 'react'

export default function RightSidebar() {
    return (
        <section className={cn('sticky right-0 top-0 flex w-[310px] flex-col overflow-y-hidden border-none bg-black-1 px-[30px] pt-8 max-xl:hidden h-[calc(100vh-5px)]',
            // audio?.audioUrl && 'h-[calc(100vh-140px)]': 
        )}>
            <p className='text-red-300 text-6xl'>RIGHTSIDEBAR</p>

        </section>
    )
}
