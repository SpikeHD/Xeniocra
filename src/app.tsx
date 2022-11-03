import { invoke } from '@tauri-apps/api/tauri';
import './app.css';
import { Component } from 'preact';
import { getConfig } from './util/config';

import { Sidebar } from './components/Sidebar';
import { SettingsList } from './components/SettingsList';

interface State {
  menuOpen: boolean
  settingsOpen: boolean
}

export class App extends Component<{}, State> {
  constructor() {
    super()

    this.state = {
      menuOpen: false,
      settingsOpen: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
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
    if (!evt.target.className.includes('sidebar')) {
      if (this.state.menuOpen) this.toggleMenu()
      if (this.state.settingsOpen) this.toggleSettings()
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  toggleSettings() {
    this.setState({
      settingsOpen: !this.state.settingsOpen
    })
  }

  async getConfig() {
    const config = await getConfig()
  }

  render() {
    return (
      <>
        {/* This is hidden and displayed over top of the main page */}
        <Sidebar side='left' isOpen={this.state.menuOpen}>
          <div>Menu Item One</div>
          <div>Menu Item One</div>
        </Sidebar>
        <Sidebar side='right' isOpen={this.state.settingsOpen}>
          <SettingsList />
        </Sidebar>

        <div class="top">
          <div class="topLeft">
            <div onClick={this.toggleMenu}>O</div>
          </div>
          <div class="topRight">
            <div onClick={this.toggleSettings}>=</div>
          </div>
        </div>
      </>
    )
  }
}
