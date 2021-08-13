import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {getNotesByLabel} from '../api'
import NoteList from '../../Note/components/NoteList'
import Spinner from '~/components/Spinner'
import {Tag} from 'react-feather'

export default function NotesLabel() {
	const params = useParams<{labelName: string}>()
	const {data, isLoading, refetch} = useQuery('notesbylabel', () => getNotesByLabel(params.labelName), {
    staleTime: Infinity,
  })

  useEffect(() => {
  	refetch()
  }, [params.labelName])

	return (
		<>
			{isLoading && <div className='mt-8'><Spinner/></div>}
      {
      	data != null && data[0].notes.length > 0
      	? <NoteList notes={data[0].notes} />
      	: <div
      			className='text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'
      		>
      			<Tag size={70}/>
      			<h1 className='mt-8'>No notes with this label yet</h1>
      		</div>
      }
		</>
	)
}
