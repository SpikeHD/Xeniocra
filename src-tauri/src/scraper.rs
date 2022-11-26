use reqwest;
use scraper::{Selector, Html};

pub async fn scrape_boxart(name: String) -> String {
  // Replace dashes
  let q_name = name.replace("-", " ");
  let client = reqwest::Client::new();
  let url = format!("https://www.thecoverproject.net/view.php?searchstring={}", q_name);
  let result_html = client.get(url)
    .send()
    .await
    .unwrap()
    .text()
    .await
    .unwrap();
  let main_scrape = Html::parse_document(result_html.as_str());

  // Get the first item in the list, if any
  let anchor = Selector::parse("a[href*=\"view.php?game_id\"]").unwrap();
  let anchors = main_scrape.select(&anchor);
  let mut link = String::new();

  for elm_ref in anchors {
    // This is almost surely our game
    if elm_ref.inner_html().contains("X360") {
      link = elm_ref.value().attr("href").unwrap_or("").to_string();
      break;
    }
  }

  // We didn't find an xbox 360 cover for this game
  if link.len() == 0 {
    return String::new();
  }

  let game_page = client.get(format!("https://www.thecoverproject.net/{}", link))
    .send()
    .await
    .unwrap()
    .text()
    .await
    .unwrap();
  let game_html = Html::parse_document(game_page.as_str());

  // Get img
  let game_cover_selector = Selector::parse(".pageBody td:nth-child(2) img").unwrap();
  let cover_select = game_html.select(&game_cover_selector).next().unwrap();
  let img_link = cover_select.value().attr("src").unwrap_or("").to_string();

  img_link
}