'use client'

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/lib/utils";

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const router = useRouter(); 
    const pathname = usePathname();
  
    const debouncedValue = useDebounce(search, 500);
  
    useEffect(() => {
      if(debouncedValue) {
        router.push(`/discover?search=${debouncedValue}`)
      } else if (!debouncedValue && pathname === '/discover') router.push('/discover')
    }, [router, pathname, debouncedValue])
  
    return (
      <div className="relative mt-8 block">
        <Input value={search}
          className="text-[16px] leading-normal placeholder:text-16 bg-black-1 rounded-[6px] placeholder:text-gray-1 border-none text-gray-1 py-6 pl-12 focus-visible:ring-offset-orange-1"
          placeholder='Search for podcasts'
          onChange={(e) => setSearch(e.target.value)}
          onLoad={() => setSearch('')}
        />
        <Image src="/icons/search.svg"
          alt="search"
          height={20} width={20}
          className="absolute left-4 top-3.5"
        />
      </div>
    )
}
