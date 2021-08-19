import React, { useState } from 'react'
import { Trash2, Tag } from 'react-feather'
import Button from '~/components/Button'
import UpdateNote from './UpdateNote'
import SearchLabel from '~/features/Label/components/SearchLabel'
import { toast } from 'react-toastify'
import { Note } from '../types'
import { useMutation, useQueryClient } from 'react-query'
import { deleteNote } from '../api'
import NoteLabels from './NoteLabels'
import clsx from 'clsx'

interface NoteItemProps extends Note { }

export default function NoteItem({ note_name, note_text, id, labels }: NoteItemProps) {
  const queryClient = useQueryClient()
  const [openUpdateNote, setOpenUpdateNote] = useState(false)
  const [openSearchLabel, setOpenSearchLabel] = useState(false)
  const deleteMutation = useMutation(() => deleteNote(id), {
    onSuccess() {
      queryClient.invalidateQueries('notes')
      toast.dark('Note trashed')
    }
  })

  const slicedNote = note_text && note_text.length > 300 ? `${note_text.slice(0, 300)}...` : note_text

  return (
    <>
      <li
        className={clsx(
          'border relative border-secondary rounded-lg mb-5 bg-primary break-words w-full md:w-60',
          openUpdateNote && 'opacity-0'
        )}
      >
        <div
          onClick={() => setOpenUpdateNote(true)}
          className='px-4 py-2'
        >
          <div className='mb-6'>
            <h2>{note_name}</h2>
            <p>{slicedNote}</p>
          </div>
          <NoteLabels noteLabels={labels} noteId={id} />
          <div
            className={`flex justify-end absolute inset-0 items-end opacity-0 hover:opacity-100 focus:opacity-100 duration-200 ease-in-out mb-0.5 mr-0.5`}
          >
            <Button icon={<Tag size={17} />} dataTip='Add label' aria-label='add label' onClick={(event) => {
              event.stopPropagation()
              setOpenSearchLabel(true)
            }}></Button>
            <Button
              icon={<Trash2 size={17} />}
              dataTip='Delete note'
              aria-label='delete note'
              isLoading={deleteMutation.isLoading}
              onClick={(event) => {
                event.stopPropagation()
                deleteMutation.mutate()
              }}
            ></Button>
          </div>
        </div>
      </li>
      <UpdateNote
        visible={openUpdateNote}
        toggle={() => setOpenUpdateNote(!openUpdateNote)}
        title={note_name!}
        note={note_text!}
        id={id}
        labels={labels}
      />
      <SearchLabel noteId={id} visible={openSearchLabel} toggle={() => setOpenSearchLabel(!openSearchLabel)} />
    </>
  )
}
