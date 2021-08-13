import React, { useState } from 'react'
import { sidebarAtom, sidebarAtomOnHover } from './sidebarAtom'
import { useAtom } from 'jotai'
import { Book, Edit2, Tag } from 'react-feather'
import SidebarItem from './SidebarItem'
import EditLabel from '~/features/Label/components/EditLabel'
import {useQuery} from 'react-query'
import {getLabels} from '~/features/Label/api'
import Spinner from '../Spinner'

const sidebarList = [
  {
    icon: <Book />,
    name: 'Notes',
    route: '/'
  }
]

export default function Sidebar() {
  const [visibleOnActive] = useAtom(sidebarAtom)
  const [visibleOnHover, setVisibleOnHover] = useAtom(sidebarAtomOnHover)
  const [openEditLabel, setOpenEditLabel] = useState(false)
  const {data, isSuccess} = useQuery('labels', getLabels, {
    staleTime: Infinity
  })

  const toggle = () => setVisibleOnHover(!visibleOnHover)

  return (
    <>
      <nav
        className={`fixed top-14 left-0 bottom-0 pt-4 z-20 duration-200 ease-in-out bg-primary ${visibleOnActive || visibleOnHover ? 'w-72' : 'w-16'} ${visibleOnHover ? 'shadow-lg-darker' : ''} ${visibleOnActive ? 'shadow-lg-darker md:shadow-none' : ''}`}
        onMouseEnter={toggle}
        onMouseLeave={toggle}
      >
        <ul>
          {
            sidebarList.map(sidebarItem => {
              return <SidebarItem
                key={sidebarItem.name}
                icon={sidebarItem.icon}
                name={sidebarItem.name}
                route={sidebarItem.route}
              />
            })
          }
          {
            data != null && isSuccess && data.map(label => <SidebarItem
              key={label.id}
              icon={<Tag/>}
              name={label.label_name}
              route={`/label/${label.label_name}`}
            />)
          }
          <SidebarItem
            icon={<Edit2 />}
            name="Edit labels"
            onClick={() => setOpenEditLabel(true)}
          />
        </ul>
      </nav>
      <EditLabel toggle={() => setOpenEditLabel(!openEditLabel)} visible={openEditLabel} />
    </>
  )
}
