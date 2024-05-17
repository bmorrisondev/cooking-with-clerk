'use client'
import React, { useState } from 'react'
import { TableCell, TableRow, } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { setBetaStatus } from './actions'

type Props = {
  name: string
  id: string
  emailAddress?: string
  metadata?: UserPublicMetadata
}

function UserRow({ name, id, metadata, emailAddress }: Props) {
  const [isBetaUser, setIsBetaUser] = useState(metadata?.isBetaUser || false)

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