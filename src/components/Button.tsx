import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import ReactTooltip from 'react-tooltip'
import Spinner from './Spinner'

const sizeClassnames = {
	big: 'py-2 px-6 text-sm rounded-lg',
	small: 'px-2 py-1 text-sm rounded-md',
	tiny: 'px-1 text-sm rounded-5',
}

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: React.ReactNode
	className?: string
	size?: keyof typeof sizeClassnames
	dataTip?: string
	icon?: boolean
	isLoading?: boolean
}

export default function Button({size = 'big', isLoading, className, dataTip, icon, ...props }: ButtonProps) {
	return (
		<>
			<button
				data-tip={dataTip}
				className={`flex items-center justify-center focus:bg-secondary hover:bg-hover ${icon ? 'p-2 rounded-full' : sizeClassnames[size]} ${className}`}
				{...props}
			>
					{
						isLoading ? <span><Spinner/></span> : props.children
					}
			</button>
			{dataTip && <ReactTooltip place="bottom" backgroundColor='#404040' aria-haspopup='true' effect="solid" />}
		</>
	)
}
