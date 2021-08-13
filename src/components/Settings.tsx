import React, {useState} from 'react'
import Modal from './Modal'
import Button from './Button'
import {X} from 'react-feather'

interface SettingsProps {
	visible: boolean
	toggle: () => void
}

export default function Settings(props: SettingsProps) {

	return (
		<Modal visible={props.visible} toggle={props.toggle} width='w-72'>
			<div className='p-3'>
				<h1>settings</h1>
				<ul>
					<li className='flex'>
						<Button><X/> Logout</Button>
					</li>
				</ul>
			</div>
		</Modal>
	)
}
