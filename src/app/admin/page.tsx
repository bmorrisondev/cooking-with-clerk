import React from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UserRow from './UserRow'
import { clerkClient } from "@clerk/nextjs/server"

export const fetchCache = 'force-no-store';

async function Admin() {
  let res = await clerkClient.users.getUserList()
  let users = res.data

  return (
    <main>
      <h1 className='text-2xl font-bold my-2'>Admin</h1>
      <h2 className='text-xl my-2'>Users</h2>
      <Table className='border border-gray-200 rounded-lg'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Beta enabled?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map(u => (
            <UserRow key={u.id}
              id={u.id}
              name={`${u.firstName} ${u.lastName}`}
              metadata={u.publicMetadata}
              emailAddress={u.emailAddresses[0]?.emailAddress} />
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

export default Admin