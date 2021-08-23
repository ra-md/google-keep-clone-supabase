import { supabase } from '~/lib/supabaseClient'
import { Label, NoteLabel } from '../types'
import { Note } from '../../Note/types'

export async function getLabels() {
	const { data, error } = await supabase.from<Label>('labels').select(`
		*,
		notes(id)
	`)

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export async function getNotesByLabel(labelName: string) {
	const { data, error } = await supabase.from<Label & { notes: Note[] }>('labels')
		.select(`
			*,
			notes(*, labels(*))
		`)
		.eq('label_name', labelName)

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export async function searchLabels(searchValue: string) {
	const { data, error } = await supabase.from<Label>('labels')
		.select(`
      *,
      notes(*, labels(*))
    `)
		.ilike('label_name', `%${searchValue}%`)

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export async function createLabel(labelName: string) {
	const user = supabase.auth.user()
	const { data, error } = await supabase.from<Label>('labels').insert({ creator_id: user?.id, label_name: labelName })

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export async function updateLabel({ labelName, id }: { labelName: string, id: string }) {
	const { data, error } = await supabase.from<Label>('labels').update({ label_name: labelName }).eq('id', id)

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export async function deleteLabel(id: string) {
	const user = supabase.auth.user()
	await supabase.from<NoteLabel>('note_labels')
		.delete()
		.eq('creator_id', user?.id!)
		.eq('label_id', id)
	const { data, error } = await supabase.from<Label>('labels').delete().eq('id', id)

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export async function addLabel({ labelId, noteId }: { labelId: string, noteId: string }) {
	const user = supabase.auth.user()
	const { data, error } = await supabase.from<NoteLabel>('note_labels').insert({
		creator_id: user?.id,
		label_id: labelId,
		note_id: noteId
	})

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export async function removeLabel({ labelId, noteId }: { labelId: string, noteId: string }) {
	const user = supabase.auth.user()
	const { data, error } = await supabase.from<NoteLabel>('note_labels')
		.delete()
		.eq('creator_id', user?.id!)
		.eq('label_id', labelId)
		.eq('note_id', noteId)

	if (error) {
		throw new Error(error.message)
	}

	return data
}
