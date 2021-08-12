import React, {useState, MouseEvent, useEffect} from 'react'
import Input from './Input'
import Button from './Button'
import {supabase} from '../lib/supabaseClient'

export default function Auth() {
	const [isLoginForm, setIsLoginForm] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [invalid, setInvalid] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	async function handleAuth(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault()

		if(email === '' || password === '') {
			setInvalid(true)
			return
		}

		setIsLoading(true)

		try {
			if(isLoginForm) {
				await supabase.auth.signIn({email, password})
			} else {
				await supabase.auth.signUp({email, password})
			}
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}

	}

	useEffect(() => {
		setInvalid(false)
	}, [email, password, isLoginForm])

	return (
		<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
			<form className='bg-primary rounded-lg shadow-lg-darker p-8 flex flex-col mb-4 w-72 md:w-96'>
				<div className='mb-4'>{ isLoginForm ? <h1>Login</h1> : <h1>Register</h1> }</div>
				<label htmlFor='email'>Email</label>
				<Input
					className='auth-input'
					id='email'
					placeholder='Email'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<Input
					className='auth-input'
					id='password'
					placeholder='Password'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					aria-label={isLoginForm ? 'Login' : 'Register'}
					type='submit'
					className={`bg-blue-500 mt-4 font-bold hover:bg-blue-400 focus:bg-blue-400 ${invalid ? 'shake' : ''}`}
					onClick={handleAuth}
					isLoading={isLoading}
				>
					{isLoginForm ? 'Login' : 'Register'}
				</Button>
			</form>
			<div className='text-center'>
				{
					isLoginForm
					? <span>
							Don't have an account? <button
								aria-label='switch to register'
								className='text-blue-500 focus:text-blue-400'
								onClick={() => setIsLoginForm(false)}
							>Register</button>
						</span>
					: <span>
							Have an account? <button
								aria-label='switch to sign in'
								className='text-blue-500 focus:text-blue-400'
								onClick={() => setIsLoginForm(true)}
							>Sign in</button>
						</span>
				}
			</div>
		</div>
	)
}
