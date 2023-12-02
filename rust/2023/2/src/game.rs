use std::collections::HashMap;

#[derive(Clone, Debug)]
pub struct Game {
    pub id: u32,
    pub sets: Vec<HashMap<String, u32>>,
}

impl Game {
    pub fn from_string(input: &String) -> Self {
        let parts: Vec<&str> = input
            .splitn(2, ": ")
            .collect();

        let game_id_parts: Vec<&str> = parts.get(0).unwrap().splitn(2, ' ').collect();

        Game {
            id: game_id_parts.get(1).unwrap().parse().unwrap(),
            sets: parts.get(1).unwrap()
                .split("; ")
                .map(|set| {
                    // Split the contents of each set
                    set.split(", ")
                        .map(|content| {
                            let parts: Vec<&str> = content
                                .splitn(2, " ")
                                .collect();

                            let amount: u32 = parts.get(0).unwrap().parse::<u32>().unwrap();
                            let color: String = parts.get(1).unwrap().to_string();
                            (color, amount)
                        })
                        .collect()
                })
                .collect(),
        }
    }
}
