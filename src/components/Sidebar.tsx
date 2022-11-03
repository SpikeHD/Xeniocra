import { Component, ComponentChildren } from 'preact'

import './Sidebar.css'

interface State {
  open: boolean
}

interface Props {
  children: ComponentChildren | null
  isOpen: boolean
  side: 'right' | 'left'
}

export class Sidebar extends Component<Props, State> {
  constructor() {
    super()

    this.state = {
      open: false
    }
  }

  static getDerivedStateFromProps(props: Props) {
    return {
      open: props.isOpen
    }
  }

  render() {
    return (
      <div class={`sidebar ${this.props.side} ${this.state.open ? 'open':''}`}>
        <div class='sidebar-inner'>
          {this.props.children}
        </div>
      </div>
    )
  }
}