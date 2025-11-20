import { Input, Separator } from '@/components/shadcn'
import React from 'react'

export default function Home() {
  return (
    <div className='w-full p-10'>
      <Input
        className='focus-visible:ring-0'
        placeholder='Pesquise por contas ou projetos'
      />
      <Separator className='my-5'/>
      
    </div>
  )
}
