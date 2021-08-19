import React from 'react'
import { Label } from '../../Label/types'
import { X } from 'react-feather'
import Spinner from '~/components/Spinner'
import { useMutation, useQueryClient } from 'react-query'
import { removeLabel } from '../../Label/api'

interface NoteLabelsProps {
	noteLabels: Label[]
	noteId: string
	full?: boolean
}

export default function NoteLabels({ noteLabels, noteId, full = false }: NoteLabelsProps) {
	if (noteLabels.length === 0) return null

	const labels = full ? noteLabels : noteLabels.slice(0, 1)

	return (
		<div className='flex'>
			<ul className='relative flex-wrap flex z-10'>
				{labels.map(label => <NoteLabelsItem key={label.id} noteId={noteId} {...label} />)}
			</ul>
			{
				noteLabels.length > 1 && !full && <span className='rounded-md border border-secondary px-2 text-sm'>+{noteLabels.length - 1}</span>
			}
		</div>
	)
}

function NoteLabelsItem(props: Label & { noteId: string }) {
	const queryClient = useQueryClient()
	const deleteLabelMutation = useMutation(() => removeLabel({ labelId: props.id, noteId: props.noteId }), {
		onSuccess() {
			queryClient.invalidateQueries({
				predicate: query => query.queryKey === 'notes' || query.queryKey === 'labels' || query.queryKey === 'notesbylabel'
			})
		}
	})

	return (
		<li className='rounded-full border border-secondary px-2 text-sm relative mr-1'>
			{
				deleteLabelMutation.isLoading
					? <div className='mx-3'><Spinner /></div>
					: <div>
						<p className='whitespace-nowrap overflow-hidden max-w-20'>{props.label_name}</p>
						<div className='absolute inset-0 opacity-0 hover:opacity-100 rounded-full flex justify-end items-center duration-200 ease-in-out'>
							<button
								className='p-0.5 mr-0.5 bg-primary rounded-full shadow-lg hover:bg-hover'
								aria-label='remove label'
								onClick={(event) => {
									event.stopPropagation()
									deleteLabelMutation.mutate()
								}}
							>
								<X size={14} />
							</button>
						</div>
					</div>
			}
		</li>
	)
}
