#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod system_helpers;
mod games;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            games::read_games_dir,
            system_helpers::run_program,
            system_helpers::run_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
