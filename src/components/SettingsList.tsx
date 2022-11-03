import { Component } from "preact";
import { Configuration, getConfig } from "../util/config";

interface State {
  settings: Configuration
}

export class SettingsList extends Component<{}, State> {
  constructor() {
    super()
  }

  async componentDidMount() {
    const config = await getConfig()

    this.setState({
      settings: config
    })
  }

  render() {
    return (
      <div>
        Game Path: <input type="text" />
      </div>
    )
  }
}