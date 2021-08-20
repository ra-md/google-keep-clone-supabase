import React, { useEffect } from 'react'
import NoteList from '~/features/Note/components/NoteList'
import { useQuery } from 'react-query'
import { searchNotes } from '../api'
import { useParams, useLocation } from 'react-router-dom'
import Spinner from '~/components/Spinner'

export default function Search() {
  const params = useParams<{ query: string }>()
  const {pathname} = useLocation()

  const { data, isLoading, refetch, isSuccess } = useQuery(pathname, () => searchNotes(params.query), {
    staleTime: Infinity
  })

  useEffect(() => {
    refetch()
  }, [params.query])

  if (isLoading) {
    return <div className='mt-8'><Spinner /></div>
  }

  return (
    <>
      {
        data != null && data.length > 0
          ? <NoteList notes={data} />
          : <h1 className='my-8'>No matching results.</h1>
      }
    </>
  )
}
