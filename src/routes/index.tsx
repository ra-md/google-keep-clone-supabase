import React, {useState, useEffect} from 'react'
import Public from './Public'
import Protected from './Protected'
import { supabase } from '../lib/supabaseClient'

export default function Routes() {
	const [session, setSession] = useState(supabase.auth.session())

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

	return session ? <Protected/> : <Public/>
}
