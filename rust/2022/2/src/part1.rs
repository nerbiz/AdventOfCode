pub fn solve(rounds: &Vec<[i32; 2]>) -> i32 {
    let mut score: i32 = 0;

    for [opponent, player] in rounds {
        score += match player - opponent {
            0 => player + 3,
            1 | -2 => player + 6,
            _ => player + 0,
        };
    }

    score
}
