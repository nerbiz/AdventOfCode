use std::collections::HashMap;
use crate::game::Game;

pub fn solve(games: &Vec<Game>) -> u32 {
    games
        .iter()
        .map(|game| {
            let mut maximums: HashMap<String, u32> = vec![
                ("red".to_string(), 1),
                ("green".to_string(), 1),
                ("blue".to_string(), 1),
            ].into_iter().collect();

            game.sets.iter().for_each(|set| {
                for color in vec!["red", "green", "blue"] {
                    if let Some(amount) = set.get(color) {
                        let maximum: &u32 = maximums
                            .get(color)
                            .unwrap()
                            .max(amount);

                        maximums.insert(color.to_owned(), *maximum);
                    }
                }
            });

            maximums.get("red").unwrap()
                * maximums.get("green").unwrap()
                * maximums.get("blue").unwrap()
        })
        .sum()
}
