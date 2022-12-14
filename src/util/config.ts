import { fs } from '@tauri-apps/api'
import { dataDir } from '@tauri-apps/api/path'
import { CLIOptions } from './cliConfig';

let configFilePath: string
let defaultConfig: Configuration

;(() => {
  defaultConfig = {
    open_in_fullscreen: false,
    games_directory: '',
    xenia_directory: '',
    cli_options: {
      gpu_backend: 'any',
      vsync: false,
      protect_zero: true,
    }
  }
})()

export interface Configuration {
  open_in_fullscreen: boolean
  games_directory: string
  xenia_directory: string
  cli_options: CLIOptions
}

export async function setConfigOption<K extends keyof Configuration>(key: K, value: Configuration[K]): Promise<void> {
  const config = await getConfig()
  config[key] = value
  await saveConfig(<Configuration>config)
}

export async function getConfigOption<K extends keyof Configuration>(key: K): Promise<Configuration[K]> {
  const config = await getConfig()
  const defaults = defaultConfig
  return config[key] === null || config[key] === undefined ? defaults[key] : config[key]
}

export function getDefaultConfig() {
  return defaultConfig;
}

export async function getConfig() {
  const raw = await readConfigFile()
  let parsed: Configuration = defaultConfig

  try {
    parsed = <Configuration>JSON.parse(raw)
  } catch (e) {
    // We could not open the file
    console.log(e)
  }

  return parsed
}

export async function saveConfig(obj: Configuration) {
  const raw = JSON.stringify(obj)
  await writeConfigFile(raw)
}

async function readConfigFile() {
  const local = await dataDir()

  if (!configFilePath) configFilePath = local + 'xeniocra/configuration.json'

  // Ensure xeniocra dir exists
  const dirs = await fs.readDir(local)

  if (!dirs.find((fileOrDir) => fileOrDir?.name === 'xeniocra')) {
    // Create dir
    await fs.createDir(local + 'xeniocra').catch((e) => console.log(e))
  }

  const dataFiles = await fs.readDir(local + 'xeniocra')

  // Ensure config exists
  if (!dataFiles.find((fileOrDir) => fileOrDir?.name === 'configuration.json')) {
    // Create config file
    const file: fs.FsTextFileOption = {
      path: configFilePath,
      contents: JSON.stringify(defaultConfig),
    }

    await fs.writeFile(file)
  }

  // Finally, read the file
  return await fs.readTextFile(configFilePath)
}

async function writeConfigFile(raw: string) {
  // All external config functions call readConfigFile, which ensure files exists
  await fs.writeFile({
    path: configFilePath,
    contents: raw,
  })
}
