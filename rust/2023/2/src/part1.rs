use std::collections::HashMap;
use crate::game::Game;

pub fn solve(games: &Vec<Game>) -> u32 {
    let maximums: HashMap<String, u32> = vec![
        ("red".to_string(), 12),
        ("green".to_string(), 13),
        ("blue".to_string(), 14),
    ].into_iter().collect();

    games
        .iter()
        .filter(|game| {
            game.sets.iter()
                // If any amount is higher than the maximum, return false
                .all(|set| {
                    for color in maximums.keys() {
                        if let Some(amount) = set.get(color) {
                            if amount > maximums.get(color).unwrap() {
                                return false;
                            }
                        }
                    }

                    true
                })
        })
        .map(|game| game.id)
        .sum()
}
