use std::path::PathBuf;

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct XeniaOptions {
  gpu_backend: String,
  vsync: bool,
  protect_zero: bool,
}

#[tauri::command]
pub fn open_xenia(path: PathBuf, game: PathBuf, options: XeniaOptions) {
  // Open Xenia with arguments
  match open::with(
    format!(
      "\"{}\" --gpu={} --vsync={} --protect_zero={} --fullscreen",
      game.to_str().unwrap_or(""),
      options.gpu_backend,
      options.vsync,
      options.protect_zero,
    ),
    path.to_str().unwrap_or("")
  ) {
    Ok(_) => (),
    Err(e) => println!("Failed to open Xenia ({}): {}", &path.to_str().unwrap(), e),
  };
}