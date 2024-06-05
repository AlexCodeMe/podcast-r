import { Id } from '@/convex/_generated/dataModel';
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  image: string;
  imagePrompt: string;
  setImagePrompt: Dispatch<SetStateAction<string>>;
}

export default function GenerateThumbnail({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: Props) {
  return (
    <div>GenerateThumbnail</div>
  )
}