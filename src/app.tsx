import { invoke } from '@tauri-apps/api/tauri';
import './app.css';
import { Component } from 'preact';
import { Sidebar } from './components/Sidebar';

export default class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Sidebar />
    )
  }
}
