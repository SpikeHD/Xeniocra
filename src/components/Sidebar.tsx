import { Component } from 'preact'

import './Sidebar.css'

interface State {
  open: boolean
}

interface Props {
  isOpen: boolean
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
      <div class={`sidebar ${this.state.open ? 'open':''}`}>
        Yo
      </div>
    )
  }
}