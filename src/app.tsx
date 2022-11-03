import { invoke } from '@tauri-apps/api/tauri';
import './app.css';
import { Component } from 'preact';
import { Sidebar } from './components/Sidebar';

interface State {
  menuOpen: boolean
}

export class App extends Component<{}, State> {
  constructor() {
    super()

    this.state = {
      menuOpen: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(evt: Event) {
    // @ts-expect-error I love typescript
    if (!evt.target.className.includes('sidebar') && this.state.menuOpen) {
      this.toggleMenu()
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render() {
    return (
      <>
        {/* This is hidden and displayed over top of the main page */}
        <Sidebar side='left' isOpen={this.state.menuOpen} />

        <div class="top">
          <div class="topLeft">
            <div onClick={this.toggleMenu}>O</div>
          </div>
          <div class="topRight">
            <div onClick={() => console.log('penis')}>=</div>
          </div>
        </div>
      </>
    )
  }
}
