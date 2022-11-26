import { getConfig, getConfigOption, setConfigOption } from "./config"

export interface CLIOptions {
  gpu_backend: string
  vsync: boolean
  protect_zero: boolean
}

export async function setCliOption<K extends keyof CLIOptions>(key: K, value: CLIOptions[K]) {
  const cliOptions = await getConfigOption('cli_options')
  cliOptions[key] = value
  await setConfigOption('cli_options', cliOptions)
}

export async function getCliOption<K extends keyof CLIOptions>(key: K) {
  const cliOptions = await getConfigOption('cli_options')
  return cliOptions[key]
}