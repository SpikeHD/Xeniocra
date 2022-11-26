import { useState, useEffect } from "preact/hooks";
import { Configuration, getConfig, getDefaultConfig } from "../util/config";
import { FileSelect } from "./FileSelect";

export function SettingsList() {
  const [settings, setSettings] = useState(getDefaultConfig())

  useEffect(() => {
    // This sucks
    (async () => {
      const config = await getConfig()
      setSettings(config)
    })()
  }, [])
  
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

async function changeXeniaExecutable(path: string) {
  const config = await getConfig()

  config.xeniaDirectory = path
}

async function changeGamePath(path: string) {
  const config = await getConfig()

  config.gamesDirectory = path
}