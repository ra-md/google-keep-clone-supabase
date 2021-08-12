import {Note} from '../../Note/types'

export interface Label {
	id: string
	creator_id: string
	label_name: string
	inserted_at: string
	updated_at: string
	notes: Note[]
}

export interface NoteLabel {
	id: string
	creator_id: string
	label_id: string
	note_id: string
}
