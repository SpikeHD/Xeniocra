import { invoke } from '@tauri-apps/api/tauri';
import './app.css';
import { useEffect, useRef, useState } from 'preact/hooks';

import { Sidebar } from './components/Sidebar';
import { SettingsList } from './components/SettingsList';

import bg from './assets/xenia-pattern-straight.png';

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
    if (evt.target.className.includes('sidebar-bg')) {
      closeMenus()
    }
  }

  const openMenu = () => setState({ ...state, menuOpen: !state.menuOpen})
  const openSettings = () => setState({ ...state, settingsOpen: !state.settingsOpen})

  return (
    <>
      <div class="bg-image"></div>

      <Sidebar title='Menu' side='left' isOpen={state.menuOpen}>
        <div>Menu Item One</div>
        <div>Menu Item One</div>
      </Sidebar>
      <Sidebar title='Settings' side='right' isOpen={state.settingsOpen}>
        <SettingsList />
      </Sidebar>

      {/* Cover the screen with a blur if a sidebar is open */}
      <div class={"sidebar-bg " + (
        state.menuOpen || state.settingsOpen ? 'show' : ''
      )}></div>

      <div class="top">
        <div class="topLeft">
          <div onClick={openMenu}>O</div>
        </div>
        <div class="topRight">
          <div onClick={openSettings}>=</div>
        </div>
      </div>
      <div class="contents">
        Yo
      </div>
    </>
  )
}
