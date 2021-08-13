import React from 'react'
import CreateNote from '../features/Note/components/CreateNote'
import NoteList from '../features/Note/components/NoteList'
import Spinner from '../components/Spinner'
import {getNotes} from '../features/Note/api'
import { useQuery } from 'react-query'

export default function Home() {
  const {data, isLoading} = useQuery('notes', getNotes, {
    staleTime: Infinity
  })

  return (
    <>
      <CreateNote />
      {isLoading && <div className='mt-8'><Spinner/></div>}
      {data != null && <NoteList notes={data} />}
    </>
  )
}
