import { ComponentChildren } from 'preact'
import { useState } from 'preact/hooks'

import './Sidebar.css'

interface Props {
  children: ComponentChildren | null
  side: 'right' | 'left'
  isOpen: boolean
}

export function Sidebar(props: Props) {
  const [open, setOpen] = useState(false)

  setOpen(props.isOpen)

  return (
    <div class={`sidebar ${props.side} ${open ? 'open':''}`}>
      <div class='sidebar-inner'>
        {props.children}
      </div>
    </div>
  )
}