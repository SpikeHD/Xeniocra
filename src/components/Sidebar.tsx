import { Component } from 'preact'

import './Sidebar.css'

interface State {
  open: boolean
}

interface Props {
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
        Yo
      </div>
    )
  }
}