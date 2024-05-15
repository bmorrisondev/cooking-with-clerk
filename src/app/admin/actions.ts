'use server'

import { User, clerkClient } from "@clerk/nextjs/server"

export async function getUsers(): Promise<string> {
  let res = await clerkClient.users.getUserList()
  // Filtering out users for privacy
  let data = res.data.filter(el => el.id == 'user_2gHyYCKaZ9Usr2u0FNOu1VGCu8I' || el.id == 'user_2fYfEeNKLaWrxWSBNwhbshskMa9')
  return JSON.stringify(data)
}

export async function setBetaStatus(userId: string, status: boolean) {
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      isBetaUser: status
    }
  })
}