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

            let colors: Vec<String> = maximums.keys().cloned().collect();

            game.sets.iter().for_each(|set| {
                for color in &colors {
                    if let Some(amount) = set.get(color) {
                        let maximum: &u32 = maximums
                            .get(color)
                            .unwrap()
                            .max(amount);

                        maximums.insert(color.to_owned(), *maximum);
                    }
                }
            });

            colors
                .iter()
                .map(|color| maximums.get(color).unwrap())
                .product::<u32>()
        })
        .sum()
}
