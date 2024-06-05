'use client'

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react"

export type AudioProps = {
    title: string;
    audioUrl: string;
    author: string;
    imageUrl: string;
    podcastId: string;
}

export type AudioContextType = {
    audio: AudioProps | undefined;
    setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export default function AudioProvider({ children }: { children: React.ReactNode }) {
    const [audio, setAudio] = useState<AudioProps | undefined>()
    const pathname = usePathname()

    useEffect(() => {
        if (pathname === '/create-podcast') setAudio(undefined);
    }, [pathname])

    return (
        <AudioContext.Provider value={{ audio, setAudio }}>
            {children}
        </AudioContext.Provider>
    )
}

export function useAudio() {
    const context = useContext(AudioContext)
    if (!context) throw new Error('useAudio must be used within an AudioProvider')

    return context
}