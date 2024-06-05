'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from "@/lib/utils"
import GeneratePodcast from "@/components/generate-podcast"
import GenerateThumbnail from "@/components/generate-thumbnail"

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx']

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
})

export default function CreatePodCastPage() {
  const router = useRouter()
  const [imagePrompt, setImagePrompt] = useState('')
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('')

  const [audioUrl, setAudioUrl] = useState('')
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioDuration, setAudioDuration] = useState(0)

  const [voiceType, setVoiceType] = useState<string | null>(null)
  const [voicePrompt, setVoicePrompt] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const createPodcast = useMutation(api.podcasts.createPodcast)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      if (!audioUrl || !imageUrl || !voiceType) {
        toast({
          title: 'Please generate audio and image',
        })
        setIsSubmitting(false)
        throw new Error('Please generate audio and image')
      }

      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        views: 0,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
      })

      toast({ title: 'Podcast created' })

      setIsSubmitting(false)
      router.push('/')
    } catch (error) {
      console.log('create-podcast-page, onSubmit', error)
      toast({
        title: 'Error',
        variant: 'destructive',
      })
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-[20px] leading-normal font-bold text-white-1">Create Podcast</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
                  <FormControl>
                    <Input className="text-[16px] leading-normal placeholder:text-16 bg-black-1 rounded-[6px] placeholder:text-gray-1 border-none text-gray-1 focus-visible:ring-offset-orange-1" placeholder="Your Pro Podcast" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-[16px] leading-normal font-bold text-white-1">
                Select AI Voice
              </Label>

              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger className={cn(
                  'text-[16px] leading-normal w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1'
                )}>
                  <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-1 " />
                </SelectTrigger>
                <SelectContent className="text-[16px] leading-normal border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {voiceCategories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && (
                  <audio src={`/${voiceType}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-[16px] leading-normal font-bold text-white-1">
                    Description
                    </FormLabel>
                  <FormControl>
                    <Textarea className="text-[16px] leading-normal placeholder:text-16 bg-black-1 rounded-[6px] placeholder:text-gray-1 border-none text-gray-1 focus-visible:ring-offset-orange-1" placeholder="Write a short podcast description" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast 
                setAudioStorageId={setAudioStorageId}
                setAudio={setAudioUrl}
                voiceType={voiceType!}
                audio={audioUrl}
                voicePrompt={voicePrompt}
                setVoicePrompt={setVoicePrompt}
                setAudioDuration={setAudioDuration}
              />

              <GenerateThumbnail 
               setImage={setImageUrl}
               setImageStorageId={setImageStorageId}
               image={imageUrl}
               imagePrompt={imagePrompt}
               setImagePrompt={setImagePrompt}
              />

            <div className="mt-10 w-full">
              <Button type="submit" className="text-[16px] leading-normal w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1">
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  'Submit and Publish Podcast'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}
