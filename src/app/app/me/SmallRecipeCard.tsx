'use client'
import { Recipe } from '@/models/recipes'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent
} from "@/components/ui/card";
import { Eye, EyeOff, Share, StarOff, Stars, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogDescription, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { deleteRecipe, setVisibility, toggleFavorite } from './actions';
import { toast } from 'sonner';

type Props = {
  recipe: Recipe
}

function SmallRecipeCard({ recipe }: Props) {
  const [isPublic, setIsPublic] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    setIsPublic(recipe.is_public as boolean)
    setIsFavorited(recipe.is_favorite as boolean)
  }, [])

  async function onDeleteClicked() {
    await deleteRecipe(recipe.id as number)
    window.location.reload()
  }

  async function onFavoriteButtonClicked() {
    await toggleFavorite(recipe.id as number)
    setIsFavorited(!isFavorited)
  }

  async function onShareClicked() {
    let url = ''
    url += window.location.origin
    url += `/recipes/${recipe.id}`
    await navigator.clipboard.writeText(url)
    toast(
      <div>
        <div>Link copied to clipboard!</div>
        <a href={url} target='_blank' className='text-sm text-gray-500 underline'>{url}</a>
      </div>
    )
  }

  async function onMakePublicAndShareClicked() {
    await setVisibility(recipe.id as number, true)
    setIsPublic(true)
    onShareClicked()
  }

  async function onMakePublicClicked() {
    await setVisibility(recipe.id as number, true)
    setIsPublic(true)
  }

  async function onMakePrivateClicked() {
    await setVisibility(recipe.id as number, false)
    setIsPublic(false)
  }

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <CardTitle>{recipe?.name}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 flex-1'>
        <div className='col-span-3 flex-1'>{recipe?.description}</div>
        <div className='grid grid-cols-3 gap-2'>
          {/* Favorite */}
          <Button onClick={onFavoriteButtonClicked} size='sm'>
            {isFavorited ? <Stars /> : <StarOff />}
          </Button>

          {/* Hide/unhide recipe */}
          {isPublic ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button size='sm'>
                  <Eye />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Make {recipe?.name} private</DialogTitle>
                <DialogDescription>
                  Making this recipe private will hide it from your profile. Anyone with the link will no longer be able to access it.
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={onMakePrivateClicked}>Make private</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button size='sm'>
                  <EyeOff />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Make {recipe?.name} public</DialogTitle>
                <DialogDescription>
                  Make this recipe public? It will be displayed on your public profile, as well as allow anyone with the link to access and save it.
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={onMakePublicClicked}>Make public</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {/* Share  */}
          {isPublic ? (
            <Button size='sm' onClick={onShareClicked}>
              <Share />
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button size='sm'>
                  <Share />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Share {recipe?.name}</DialogTitle>
                <DialogDescription>
                  Before you can share this recipe, you must make it public.
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={onMakePublicAndShareClicked}>Make public</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Delete recipe */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size='sm' className='col-span-3'>
                <Trash />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Delete {recipe?.name}?</DialogTitle>
              <DialogDescription>
                This action CANNOT be undone.
              </DialogDescription>
              <DialogFooter>
                <Button variant="destructive" onClick={onDeleteClicked}>Delete</Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>

      </CardContent>
      <CardFooter className='text-sm'>
        Id: {recipe.id}
      </CardFooter>
    </Card>
  )
}

export default SmallRecipeCard