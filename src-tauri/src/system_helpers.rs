use duct::cmd;
use std::path::PathBuf;

#[cfg(windows)]

#[tauri::command]
pub fn run_program(path: PathBuf, args: Option<String>) {
  // Without unwrap_or, this can crash when UAC prompt is denied
  open::that(format!("{} {}", &path.display(), &args.unwrap_or_else(|| "".into()))).unwrap_or(());
}

#[tauri::command]
pub fn run_command(program: &str, args: Vec<&str>, relative: Option<bool>) {
  let prog = program.to_string();
  let args = args.iter().map(|s| s.to_string()).collect::<Vec<String>>();

  // Commands should not block (this is for the reshade injector mostly)
  std::thread::spawn(move || {
    // Save the current working directory
    let cwd = std::env::current_dir().unwrap();

    if relative.unwrap_or(false) {
      // Set the new working directory to the path before the executable
      let mut path_buf = std::path::PathBuf::from(&prog);
      path_buf.pop();

      // Set new working directory
      std::env::set_current_dir(&path_buf).unwrap();
    }

    cmd(prog, args).run().unwrap();

    // Restore the original working directory
    std::env::set_current_dir(&cwd).unwrap();
  });
}