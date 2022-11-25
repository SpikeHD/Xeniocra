import { useState, useEffect } from "preact/hooks";

import Folder from "../icons/folder.png"
import "./FileSelect.css"

interface Props {
  path: string
  directory: boolean | false;
}

export function FileSelect(props: Props) {
  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(props.path)
  })

  return (
    <div class="file_select">
      <input type="text" value={path} />
      <img class="open_file_select" src={Folder}></img>
    </div>
  )
}