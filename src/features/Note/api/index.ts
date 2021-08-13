import {supabase} from '~/lib/supabaseClient'
import {Note, CreateNoteData} from '../types'

function getUserId() {
  const user = supabase.auth.user()
  return user?.id
}

export async function getNotes() {
	const {data, error} = await supabase.from<Note>('notes').select(`
    *,
    labels(*)
  `)

	if(error) {
    throw new Error(error.message)
  }

  return data
}

export async function searchNotes(searchValue: string) {
  const {data, error} = await supabase.from<Note>('notes')
    .select(`
      *,
      labels(*)
    `)
    .or(`note_text.ilike.%${searchValue}%, note_name.ilike.%${searchValue}%`)

  if(error) {
    throw new Error(error.message)
  }

  return data
}

export async function createNote(noteData: CreateNoteData) {
	const {data, error} = await supabase.from<Note>('notes').insert({creator_id: getUserId(), ...noteData})

	if(error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteNote(noteId: string) {
  const {data, error} = await supabase.from<Note>('notes').delete().eq('id', noteId)

  if(error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateNote({noteData, id}: {noteData: CreateNoteData, id: string}) {
  const {data, error} = await supabase.from<Note>('notes').update(noteData).eq('id', id)

  if(error) {
    throw new Error(error.message)
  }

  return data
}
