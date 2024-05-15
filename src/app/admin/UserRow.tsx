import { User } from '@clerk/nextjs/server'
import React, { useEffect, useState } from 'react'
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { setBetaStatus } from './actions'


type Props = {
  user: User
}

function UserRow({ user }: Props) {
  const [isBetaUser, setIsBetaUser] = useState(false)

  useEffect(() => {
    if(user?.publicMetadata.isBetaUser) {
      setIsBetaUser(user.publicMetadata.isBetaUser)
    }
  }, [user])

  async function onToggleBetaStatus() {
    try {
      await setBetaStatus(user.id, !isBetaUser)
      setIsBetaUser(!isBetaUser)
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <Dialog>
      <TableRow>
        <TableCell className='flex flex-col'>
          <span>{user.firstName} {user.lastName}</span>
          <span className='italic text-xs text-gray-600'>{user.id}</span>
        </TableCell>
        <TableCell>{user.emailAddresses[0].emailAddress}</TableCell>
        <TableCell className="text-right">
          <DialogTrigger>
            <Switch
              checked={isBetaUser}
              aria-readonly />
          </DialogTrigger>
        </TableCell>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{user.publicMetadata.isBetaUser ? "Remove from beta?" : "Enable beta access?"}</DialogTitle>
          </DialogHeader>
          <div>
            The user will receive an email notifying them of this change.
          </div>
          <DialogFooter>
            <DialogTrigger>
              <Button variant='link'>Cancel</Button>
            </DialogTrigger>
            <DialogTrigger>
              <Button
                variant={isBetaUser ? 'destructive' : 'default'}
                onClick={onToggleBetaStatus}>{user.publicMetadata.isBetaUser ? "Remove" : "Enable"}</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>

      </TableRow>
    </Dialog>


  )
}

export default UserRow