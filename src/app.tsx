import { invoke } from '@tauri-apps/api/tauri';
import './app.css';
import { useEffect, useRef, useState } from 'preact/hooks';

import { Sidebar } from './components/Sidebar';
import { SettingsList } from './components/SettingsList';

interface State {
  menuOpen: boolean,
  settingsOpen: boolean,
}

export function App() {
  const [state, setState] = useState({
    menuOpen: true,
    settingsOpen: true,
  });

  function closeMenus() {
    setState(() => ({
      menuOpen: false,
      settingsOpen: false
    }));
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  const handleClickOutside = (evt: Event) => {
    // @ts-expect-error I love typescript
    if (!evt.target.className.includes('sidebar')) {
      closeMenus()
    }
  }

  const openMenu = () => setState({ ...state, menuOpen: !state.menuOpen})
  const openSettings = () => setState({ ...state, settingsOpen: !state.settingsOpen})

  return (
    <>
      {/* This is hidden and displayed over top of the main page */}
      <Sidebar side='left' isOpen={state.menuOpen}>
        <div>Menu Item One</div>
        <div>Menu Item One</div>
      </Sidebar>
      <Sidebar side='right' isOpen={state.settingsOpen}>
        <SettingsList />
      </Sidebar>

      <div class="top">
        <div class="topLeft">
          <div onClick={openMenu}>O</div>
        </div>
        <div class="topRight">
          <div onClick={openSettings}>=</div>
        </div>
      </div>
    </>
  )
}
