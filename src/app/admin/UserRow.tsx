'use client'
import React, { useState } from 'react'
import { TableCell, TableRow, } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { setBetaStatus } from './actions'

// 👉 Define the necessary props we need to render the component
type Props = {
  name: string
  id: string
  emailAddress?: string
  metadata?: UserPublicMetadata
}

function UserRow({ name, id, metadata, emailAddress }: Props) {
	// 👉 Set the initial state of `isBetaUser` based on the metadata
  const [isBetaUser, setIsBetaUser] = useState(metadata?.isBetaUser || false)

	// 👉 Calls the server action defined earlier and sets the state on change
  async function onToggleBetaStatus() {
    try {
      await setBetaStatus(id, !isBetaUser)
      setIsBetaUser(!isBetaUser)
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <TableRow>

      <TableCell className='flex flex-col'>
        <span>{name}</span>
        <span className='italic text-xs text-gray-600'>{id}</span>
      </TableCell>

      <TableCell>{emailAddress}</TableCell>

      <TableCell className="text-right">
        <Switch
          onCheckedChange={onToggleBetaStatus}
          checked={isBetaUser}
          aria-readonly />
      </TableCell>

    </TableRow>
  )
}

export default UserRow