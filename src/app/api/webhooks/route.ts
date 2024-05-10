// {url}/api/webhooks

import { createWebhooksHandler } from '@brianmmdev/clerk-webhooks-handler'
import { UserJSON } from '@clerk/backend'

const handler = createWebhooksHandler({
  onUserCreated: async (payload: UserJSON) => {
    console.log(`User was created: ${payload.id}`)
    console.log(payload)
  }
})

export const POST = handler.POST