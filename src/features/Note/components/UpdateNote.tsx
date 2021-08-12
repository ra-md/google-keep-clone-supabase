import React, { useState, useEffect } from 'react'
import TextareaAutoSize from 'react-textarea-autosize'
import Input from '~/components/Input'
import Modal from '~/components/Modal'
import Button from '~/components/Button'
import {useMutation, useQueryClient} from 'react-query'
import {updateNote} from '../api'

interface UpdateNoteProps {
  visible: boolean
  toggle: () => void
  title: string
  note: string
  id: string
}

export default function UpdateNote(props: UpdateNoteProps) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const updateMutation = useMutation(() => updateNote({
    noteData: { 
      note_name: title,
      note_text: note,
    },
    id: props.id
  }), {
    onSuccess() {
      queryClient.invalidateQueries('notes')
    }
  })

  useEffect(() => {
    setTitle(props.title)
    setNote(props.note)
  }, [props.title, props.note])

  function handleUpdate() {
    props.toggle()
    if(title !== props.title || note !== props.note) {
      updateMutation.mutate()
    }
  }

  return (
    <Modal toggle={handleUpdate} visible={props.visible}>
      <div className='p-3'>
        <Input
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder='Title'
        />
        <TextareaAutoSize
          onChange={e => setNote(e.target.value)}
          value={note}
          className='textarea max-h-96'
          placeholder='Take a note...'
        />
        <div className='flex justify-end'>
          <Button size='small' aria-label='close update note dialog' onClick={handleUpdate}>Close</Button>
        </div>
      </div>
    </Modal>
  )
}
