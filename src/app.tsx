import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import { useEffect, useRef, useState } from 'preact/hooks';

import { getConfigOption } from './util/config';
import { Sidebar } from './components/Sidebar';
import { SettingsList } from './components/SettingsList';
import { GameList } from './components/GameList';

import Menu from './icons/list.png'
import Cog from './icons/cog.png'

import './bg.css';
import './app.css';

export function App() {
  const [state, setState] = useState({
    menuOpen: false,
    settingsOpen: false,
  });

  const closeMenus = () => {
    setState(() => ({
      ...state,
      menuOpen: false,
      settingsOpen: false,
    }));
  }

  const runGameScraper = async () => {
    const gamesDir = await getConfigOption('games_directory')
    const list = await invoke('read_games_dir', {
      dir: gamesDir
    }) as string[]
  
    for (const game of list) {
      invoke('get_game_data', {
        gamePath: game,
      })
    }
  }

  runGameScraper()

  const handleClickOutside = (evt: Event) => {
    // @ts-expect-error I love typescript
    if (evt.target.className.includes('sidebar-bg')) {
      closeMenus()
    }
  }

  const openMenu = () => setState({ ...state, menuOpen: !state.menuOpen})
  const openSettings = () => setState({ ...state, settingsOpen: !state.settingsOpen})

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  return (
    <>
      <div id="bgContainer">
        <div id="stars"></div>
        <div id="twinkling"></div>
      </div>

      <div id="title">Xeniacra</div>

      {/* <Sidebar title='Menu' side='left' isOpen={state.menuOpen}>
        <div>Menu Item One</div>
        <div>Menu Item One</div>
      </Sidebar> */}
      <Sidebar title='' side='right' isOpen={state.settingsOpen}>
        <SettingsList />
      </Sidebar>

      {/* Cover the screen with a blur if a sidebar is open */}
      <div class={"sidebar-bg " + (
        state.menuOpen || state.settingsOpen ? 'show' : ''
      )}></div>

      <div class="top">
        <div class="topLeft">
          {/* <div onClick={openMenu}>
            <img src={Menu} class="icon"></img>
          </div> */}
        </div>
        <div class="topRight">
          <div onClick={openSettings}>
            <img src={Cog} class="icon"></img>
          </div>
        </div>
      </div>
      <div class="contents">
        <GameList />
      </div>
    </>
  )
}