'use server'

import { clerkClient } from "@clerk/nextjs/server"

export async function setBetaStatus(userId: string, status: boolean) {
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      isBetaUser: status
    }
  })
}