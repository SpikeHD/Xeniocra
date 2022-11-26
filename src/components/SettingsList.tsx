import { useState, useEffect } from "preact/hooks";
import { setConfigOption, getConfig, getDefaultConfig } from "../util/config";
import { FileSelect } from "./common/FileSelect";

export function SettingsList() {
  const [settings, setSettings] = useState(getDefaultConfig())

  useEffect(() => {
    // This sucks
    (async () => {
      const config = await getConfig()
      setSettings(config)
    })()
  }, [])

  // Change the Xenia exec
  const changeXeniaExecutable = async (path: string) => {
    await setConfigOption('xeniaDirectory', path)
    setSettings(await getConfig())
  }

  // Change the game path
  const changeGamePath = async (path: string) => {
    await setConfigOption('gamesDirectory', path)
    setSettings(await getConfig())

    // Trigger a games check
    const gameRefreshEvent = new CustomEvent('RefreshGames')
    window.dispatchEvent(gameRefreshEvent)
  }
  
  return (
    <>
      <div class="settings_section">
        <span>Xenia Executable:</span>
        <FileSelect path={settings.xeniaDirectory} isDirectory={false} onchange={changeXeniaExecutable} />
      </div>
      <div class="settings_section">
        <span>Game Path:</span>
        <FileSelect path={settings.gamesDirectory} isDirectory={true} onchange={changeGamePath} />
      </div>
    </>
  )
}