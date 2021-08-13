import React, { useState, useMemo, useEffect, useRef } from 'react'
import Modal from '~/components/Modal'
import Button from '~/components/Button'
import Input from '~/components/Input'
import Spinner from '~/components/Spinner'
import { Plus, Search } from 'react-feather'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getLabels, addLabel, removeLabel, searchLabels } from '../api'
import { Label } from '../types'
import debounce from 'lodash/debounce'
import {PostgrestError} from '@supabase/supabase-js'

interface SearchLabelProps {
	visible: boolean
	toggle: () => void
	noteId: string
}

type getLabelsType = Label[] | null | undefined
type getLabelsErrorType = PostgrestError | null

export default function SearchLabel(props: SearchLabelProps) {
	const [searchValue, setSearchValue] = useState('')
	const queryClient = useQueryClient()
	const getLabelsQuery = useQuery<getLabelsType, getLabelsErrorType>('labels', getLabels, {
		staleTime: Infinity
	})
	const searchLabelMutation = useMutation(() => searchLabels(searchValue))

	const labels = searchValue !== '' && searchLabelMutation.isSuccess
		? searchLabelMutation.data
		: getLabelsQuery.data

	useEffect(() => {
		if(searchValue === '') {
			searchLabelMutation.reset()
		}
	}, [searchValue])

	return (
		<Modal visible={props.visible} toggle={props.toggle} width='w-72'>
			<div className='p-3 sticky top-0 rounded-lg bg-primary'>
				<span className='font-semibold'>Label note</span>
				<div className='flex items-center'>
					<Input
						className='font-normal'
						placeholder='Search label name'
						value={searchValue}
						onChange={(event) => {
							setSearchValue(event.target.value)
						}}
						onKeyDown={(event) => {
							if(event.key === 'Enter' && searchValue !== '') {
								searchLabelMutation.mutate()
							}
						}}
					/>
					<Search size={18} />
				</div>
			</div>
			{
				getLabelsQuery.isError && <p className='text-center p-3 text-red-500'>{getLabelsQuery.error?.message}</p>
			}
			{
				getLabelsQuery.isLoading || searchLabelMutation.isLoading
					? <div className='flex justify-center p-3'><Spinner /></div>
					: <div className='px-3 max-h-96 overflow-y-auto'>
							{ labels != null && <SearchLabelList labels={labels} noteId={props.noteId} /> }
						</div>
			}
		</Modal>
	)
}

function SearchLabelList({ labels, noteId }: { labels: Label[], noteId: string }) {
	return (
		<ul>
			{
				labels.map((label) => {
					return <SearchLabelItem key={label.id} label={label} noteId={noteId} />
				})
			}
		</ul>
	)
}

function SearchLabelItem({ label, noteId }: { label: Label, noteId: string }) {
	const queryClient = useQueryClient()
	const onSuccess = () => queryClient.invalidateQueries({
		predicate: query => query.queryKey === 'notes' || query.queryKey === 'labels'
	})
	const addLabelMutation = useMutation(() => addLabel({labelId: label.id, noteId}), { onSuccess })
	const removeLabelMutation = useMutation(() => removeLabel({labelId: label.id, noteId}), { onSuccess })
	const [isChecked, setIsChecked] = useState(false)
	const firstRender = useRef(true)
	const [clicked, setClicked] = useState(false)

	useEffect(() => {
		for(const note of label.notes) {
			if(note.id === noteId) {
				setIsChecked(true)
			}
		}
	}, [label.notes, noteId])

	const submit = useMemo(() => debounce(() => {
		if(isChecked) {
			addLabelMutation.mutate()
		} else {
			removeLabelMutation.mutate()
		}
	}, 500), [isChecked])

	useEffect(() => {
		if(firstRender.current) {
			firstRender.current = false
			return
		}

		submit()

		return () => submit.cancel()
	}, [clicked])

	return (
		<li className='my-2'>
			<label className='flex items-center'>
				<input
					className='mr-4 form-checkbox bg-primary rounded border-2 border-secondary text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50'
					type='checkbox'
					checked={isChecked}
					onChange={(event) => {
						setIsChecked(!isChecked)
						setClicked(!clicked)
					}}
				/>
				<span className='block w-full'>{label.label_name}</span>
			</label>
		</li>
	)
}
