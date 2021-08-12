import React from 'react'
import {Label} from '../../Label/types'
import {X} from 'react-feather'
import Spinner from '~/components/Spinner'
import { useMutation, useQueryClient } from 'react-query'
import { removeLabel } from '../../Label/api'

interface NoteLabelsProps {
	noteLabels: Label[]
	noteId: string
}

export default function NoteLabels({noteLabels, noteId}: NoteLabelsProps) {
	if(noteLabels.length === 0) return null

	return (
		<ul className='flex'>
			{noteLabels.slice(0, 2).map(label => <NoteLabelsItem key={label.id} noteId={noteId} {...label}/>)}
		</ul>
	)
}

function NoteLabelsItem(props: Label&{noteId: string}) {
	const queryClient = useQueryClient()
	const deleteLabelMutation = useMutation(() => removeLabel({labelId: props.id, noteId: props.noteId}), {
		onSuccess() {
			queryClient.invalidateQueries({
				predicate: query => query.queryKey === 'notes' || query.queryKey === 'labels'
			})
		}
	})

	return (
		<li className='rounded-full border border-secondary px-2 text-sm relative'>
			{
				deleteLabelMutation.isLoading
				? <Spinner/>
				: <div>
						<p>{props.label_name}</p>
						<div className='absolute inset-0 opacity-0 hover:opacity-100 rounded-full flex justify-end items-center duration-200 ease-in-out'>
							<button
								className='p-0.5 mr-0.5 bg-primary rounded-full shadow-lg hover:bg-hover'
							>
								<X size={14} onClick={(event) => {
									event.stopPropagation()
									deleteLabelMutation.mutate()
								}}/>
							</button>
						</div>
					</div>
			}
		</li>
	)
}
