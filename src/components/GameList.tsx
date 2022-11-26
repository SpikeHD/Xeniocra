import { useState, useEffect, useRef } from "preact/hooks"

import './GameList.css'
import { listen } from '@tauri-apps/api/event'

import Default from '../icons/xbox.png'

export interface GameData {
  path: string
  image: string
  name: string
}

export function GameList() {
  const [gameList, setGameList] = useState([] as GameData[])

  const openGame = (path: string) => {
    console.log(path)
  }

  listen('game_data', (data: { payload: GameData }) => {
    setGameList(cur => {
      if (cur.map(o => o.name).includes(data.payload.name)) {
        return [...cur]
      }

      return [...cur, data.payload]
    })
  })

  return (
    <div class="game_list">
      {
        gameList.map(g => {
          return (
            <div class="game_item" onClick={() => openGame(g.path)}>
              <img src={g.image || Default} class={g.image === '' ? 'default':''} />
              <span>{g.name}</span>
            </div>
          )})
      }
    </div>
  )
}