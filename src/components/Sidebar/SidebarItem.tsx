import React from 'react'
import { sidebarAtom, sidebarAtomOnHover } from './sidebarAtom'
import { useAtom } from 'jotai'
import { useLocation, Link } from 'react-router-dom'

interface SidebarItemProps {
	name: string
	icon: React.ReactNode
	onClick?: () => void
	route?: string
}

export default function SidebarItem(props: SidebarItemProps) {
	const [visible] = useAtom(sidebarAtom)
	const [visibleOnHover] = useAtom(sidebarAtomOnHover)

	const { pathname } = useLocation()

	const isActive = pathname.toLowerCase() === props.route?.toLowerCase()

	return (
		<li
			onClick={props.onClick}
			className={`flex whitespace-nowrap overflow-hidden duration-200 ease-in-out rounded-full p-3 font-semibold cursor-pointer ${visible || visibleOnHover ? 'rounded-l-none pl-8 w-full' : 'ml-5 w-12'} ${isActive ? 'bg-activeSidebarMenu' : 'hover:bg-secondary'}`}
		>
			{
				props.route
					? <ItemLink {...props} />
					: <ItemButton {...props} />
			}
		</li>
	)
}

function ItemLink(props: SidebarItemProps) {
	return <Link to={props.route!}><Item {...props} /></Link>
}

function ItemButton(props: SidebarItemProps) {
	return <button className='w-full'><Item {...props} /></button>
}

function Item(props: SidebarItemProps) {
	return (
		<div className='flex'>
			<div className='mr-8'>
				{props.icon}
			</div>
			<span>{props.name}</span>
		</div>
	)
}
