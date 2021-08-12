import React from 'react'
import NoteList from '../features/Note/components/NoteList'
import {Note} from '../features/Note/types'

export default function Search() {
  const notes: Note[] = []

  if (notes.length === 0) {
    return <span className='my-8'>No matching results.</span>
  }

  return (
    <>
      <NoteList notes={notes} />
    </>
  )
}
