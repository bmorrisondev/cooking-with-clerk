'use client'
import React, { useEffect, useState } from 'react'
import { getUsers } from './actions'
import { User } from '@clerk/nextjs/server'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UserRow from './UserRow'


function Admin() {
  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    async function init() {
      let json = await getUsers()
      let u = JSON.parse(json)
      console.log(u[0])
      setUsers(u)
    }
    init()
  }, [])

  return (
    <main>
      <h1 className='text-2xl font-bold my-2'>Admin</h1>
      <h2 className='text-xl my-2'>Users</h2>
      <Table className='border border-gray-200 rounded-lg'>
        <TableCaption>Registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Beta enabled?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map(u => <UserRow key={u.id} user={u} />)}
        </TableBody>
      </Table>
    </main>
  )
}

export default Admin