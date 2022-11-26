use std::{fs, path::PathBuf};
use serde::{Serialize, Deserialize};
use tauri::async_runtime::block_on;

use crate::scraper;

#[derive(Serialize, Deserialize, Clone)]
pub struct GameData {
  path: PathBuf,
  name: String,
  image: String,
}

#[tauri::command]
pub fn read_games_dir(dir: &str) -> Vec<String> {
  let dir_path = PathBuf::from(dir);
  let mut games: Vec<String> = Vec::new();

  // Append to games list
  games.append(&mut get_games_in_dir(dir_path));

  let read_dir = match fs::read_dir(dir) {
    Ok(dir) => dir,
    Err(e) => {
      println!("Error reading games directory: {}", e);
      return Vec::new();
    }
  };

  for dir in read_dir {
    let potential_dir = dir.unwrap();
    let meta = potential_dir.metadata().unwrap();

    // If it's a folder, scan the dir
    if meta.is_dir() {
      let mut subdir_games = get_games_in_dir(potential_dir.path());

      // Append to our games list
      games.append(&mut subdir_games);
    }
  };

  games
}

pub fn get_games_in_dir(dir: PathBuf) -> Vec<String> {
  let mut games: Vec<String> = Vec::new();
  let extensions: Vec<&str> = Vec::from([ ".iso", ".xex", ]);
  let read_dir = match fs::read_dir(dir) {
    Ok(dir) => dir,
    Err(e) => {
      println!("Error reading games directory: {}", e);
      return Vec::new();
    }
  };

  for dir in read_dir {
    let potential_dir = dir.unwrap();
    let filename = potential_dir.file_name();
    let filestr = filename.to_str().unwrap();
    let meta = potential_dir.metadata().unwrap();

    println!("file: {}", filestr);

    // If it's a file, add it to our list
    if meta.is_file() {
      let mut is_exec = false;
      
      // Ensure the file is an Xbox executable
      for ext in &extensions {
        if filestr.clone().contains(ext) {
          is_exec = true;
        }
      }

      if is_exec {
        games.push(format!("{}", filestr));
      }
    }
  }

  games
}

// Start threads that get game data and send it to the frontend
#[tauri::command]
pub async fn get_game_data(window: tauri::Window, game_path: String, name: String) {
  std::thread::spawn(move || block_on(async {
    let title = name.replace(".iso", "").replace(".xex", "");
    let boxart = scraper::scrape_boxart(title.clone()).await;

    window.emit("game_data", GameData {
      path: PathBuf::from(game_path).join(&name),
      name: title,
      image: boxart
    })
  }));
}