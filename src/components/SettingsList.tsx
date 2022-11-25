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
    <div>
      <span>Game Path:</span>
      <FileSelect path={settings.xeniaDirectory} directory={false} />
    </div>
  )
}