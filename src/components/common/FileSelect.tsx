import { dialog } from "@tauri-apps/api";
import { useState, useEffect } from "preact/hooks";

import Folder from "../../icons/folder.png"
import "./FileSelect.css"

interface Props {
  path: string
  isDirectory: boolean | false
  onchange: (path: string) => {}
}

export function FileSelect(props: Props) {
  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(props.path)
  })

  const onclick = async () => {
    const selection = await dialog.open({
      multiple: false,
      directory: props.isDirectory,
      filters: []
    });

    if (Array.isArray(selection)) {
      setPath(selection[0])
      return
    }

    setPath(selection || '')
    props.onchange(selection || '')
  }

  return (
    <div class="file_select">
      <input type="text" value={path} />
      <img class="open_file_select icon" src={Folder} onClick={onclick}></img>
    </div>
  )
}