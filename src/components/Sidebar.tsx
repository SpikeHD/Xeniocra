import { Component } from 'preact'

interface State {
  open: boolean
}

export class Sidebar extends Component<{}, State> {
  constructor() {
    super()

    this.state = {
      open: false
    }
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div class="sidebar">
        Yo
      </div>
    )
  }
}