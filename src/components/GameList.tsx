import { useState, useEffect } from "preact/hooks";

import './GameList.css';
import { invoke } from "@tauri-apps/api";
import { listen } from '@tauri-apps/api/event'
import { getConfigOption } from "../util/config";

interface GameData {
  path: string
  image: string
  name: string
}

export function GameList() {
  const [gameList, setGameList] = useState([] as GameData[])

  const applyGameData = async (data: { payload: GameData }) => {
    if (gameList.map(o => o.name).includes(data.payload.name)) {
      return
    }

    gameList.push(data.payload)
    setGameList([...gameList])
  }

  const openGame = (path: string) => {
    console.log(path)
  }

  useEffect(() => {
    listen('game_data', applyGameData)
  })

  return (
    <div class="game_list">
      {
        gameList.map(g => {(
          <div class="game_item" onClick={() => openGame(g.path)}>
            <img src={g.image} />
            <span>{g.name}</span>
          </div>
        )})
      }
    </div>
  )
}