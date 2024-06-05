import { Id } from '@/convex/_generated/dataModel'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Loader } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useToast } from './ui/use-toast'
import { useUploadFiles } from '@xixixao/uploadstuff/react'

import { v4 as uuidv4 } from 'uuid'

type Props = {
    voiceType: string
    setAudio: Dispatch<SetStateAction<string>>
    audio: string
    setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>
    voicePrompt: string
    setVoicePrompt: Dispatch<SetStateAction<string>>
    setAudioDuration: Dispatch<SetStateAction<number>>
}


function useGeneratePodcast({ setAudio, voiceType, voicePrompt, setAudioStorageId }: Props) {
    const [isGenerating, setIsGenerating] = useState(false)
    const { toast } = useToast()

    const generateUploadUrl = useMutation(api.files.generateUploadUrl)
    const { startUpload } = useUploadFiles(generateUploadUrl)

    const getPodcastAudio = useAction(api.openai.generateAudioAction)

    const getAudioUrl = useMutation(api.podcasts.getUrl)

    const generatePodcast = async () => {
        setIsGenerating(true)
        setAudio('')

        if (!voicePrompt) {
            toast({
                title: "Please provide a voiceType to generate a podcast",
            })
            return setIsGenerating(false)
        }

        try {
            const response = await getPodcastAudio({
                voice: voiceType,
                input: voicePrompt
            })

            const blob = new Blob([response], { type: 'audio/mpeg' })

            const fileName = `podcast-${uuidv4()}.mp3`

            const file = new File([blob], fileName, { type: 'audio/mpeg' })

            const uploaded = await startUpload([file])
            const storageId = (uploaded[0].response as any).storageId

            setAudioStorageId(storageId)

            const audioUrl = await getAudioUrl({ storageId })
            setAudio(audioUrl!)

            setIsGenerating(false)

            toast({
                title: "Podcast generated successfully",
            })
        } catch (error) {
            console.log('Error generating podcast', error)

            toast({
                title: "Error creating a podcast",
                variant: 'destructive',
            })

            setIsGenerating(false)
        }

    }

    return { isGenerating, generatePodcast }
}

export default function GeneratePodcast(props: Props) {
    const { isGenerating, generatePodcast } = useGeneratePodcast(props)

    return (
        <div>
            <div className="flex flex-col gap-2.5">
                <Label className="text-[16px] leading-normal font-bold text-white-1">
                    AI Prompt to generate Podcast
                </Label>
                <Textarea
                    className="text-[16px] leading-normal placeholder:text-16 bg-black-1 rounded-[6px] placeholder:text-gray-1 border-none text-gray-1 font-light focus-visible:ring-offset-orange-1"
                    placeholder='Provide text to generate audio'
                    rows={5}
                    value={props.voicePrompt}
                    onChange={(e) => props.setVoicePrompt(e.target.value)}
                />
            </div>
            <div className="mt-5 w-full max-w-[200px]">
                <Button type="submit" className="text-[16px] leading-normal bg-orange-1 py-4 font-bold text-white-1"
                    onClick={generatePodcast}
                >
                    {isGenerating ? (
                        <>
                            Generating
                            <Loader size={20} className="animate-spin ml-2" />
                        </>
                    ) : (
                        'Generate'
                    )}
                </Button>
            </div>
            {props.audio && (
                <audio src={props.audio}
                    controls
                    autoPlay
                    className="mt-5"
                    onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
                />
            )}
        </div>
    )
}