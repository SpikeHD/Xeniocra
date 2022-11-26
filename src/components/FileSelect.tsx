import { dialog } from "@tauri-apps/api";
import { useState, useEffect } from "preact/hooks";

import Folder from "../icons/folder.png"
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

  const onclick = async (isDirectory: boolean) => {
    const selection = await dialog.open({
      multiple: false,
      filters: [{
        name: 'Executable File',
        extensions: [
          // I doubt this will ever be anything than .exe or no extension, but it's probably good to include these anyways
          'exe',
          'sh',
          'AppImage',
          '',
        ]
      }]
    });

    setPath(selection || '')
  }

  return (
    <div class="file_select">
      <input type="text" value={path} />
      <img class="open_file_select" src={Folder} onClick={() => onclick(props.isDirectory)}></img>
    </div>
  )
}

async function 