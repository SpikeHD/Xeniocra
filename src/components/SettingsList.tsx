import { useState, useEffect } from "preact/hooks"
import { config } from "process"
import { setCliOption } from "../util/cliConfig"
import { setConfigOption, getConfig, getDefaultConfig } from "../util/config"
import { FileSelect } from "./common/FileSelect"

import './SettingsList.css'

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
      <div class="settings_section">
        <span>GPU Backend</span>
        <select onChange={(evt) => {
          // @ts-expect-error Too lazy to fix event types
          setCliOption('gpu_backend', evt.target.value)
        }} value={settings.cli_options.gpu_backend}>
          <option value="any">Any (reccommended)</option>
          <option value="d3d12">Direct3D 12</option>
          <option value="vulkan">Vulkan (not reccommended)</option>
          <option value="null">None</option>
        </select>
      </div>
      <div class="settings_section">
        <span>Other Options</span>
        <div class="settings_checkboxes">
          <div>
            <label for="vsync">Vsync</label>
            <input type="checkbox" id="vsync" name="vsync" onChange={(evt) => {
              // @ts-expect-error Too lazy to fix event types
              setCliOption('vsync', evt.target.checked)
            }} checked={settings.cli_options.vsync} />
          </div>
          <div>
            <label for="protect_zero">Protect Zero</label>
            <input type="checkbox" id="protect_zero" name="protect_zero" onChange={(evt) => {
              // @ts-expect-error Too lazy to fix event types
              setCliOption('protect_zero', evt.target.checked)
            }} checked={settings.cli_options.protect_zero} />
          </div>
        </div>
      </div>
    </>
  )
}