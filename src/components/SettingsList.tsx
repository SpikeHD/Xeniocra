import { useState, useEffect } from "preact/hooks";
import { Configuration, getConfig } from "../util/config";

export function SettingsList() {
  const [settings, setSettings] = useState({})

  useEffect(() => {
    // This sucks
    (async () => {
      const config = await getConfig()
      setSettings(config)
    })()
  }, [])
  
  return (
    <div>
      Game Path: <input type="text" />
    </div>
  )
}