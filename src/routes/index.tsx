import React, {useState, useEffect} from 'react'
import { Session } from '@supabase/supabase-js'
import Public from './Public'
import Protected from './Protected'
import { supabase } from '../lib/supabaseClient'

export default function Routes() {
	const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

	return session ? <Protected/> : <Public/>
}
