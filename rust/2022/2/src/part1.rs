pub fn solve(rounds: &Vec<[i32; 2]>) -> i32 {
    let mut score: i32 = 0;

    for [opponent, player] in rounds {
        let difference: i32 = (player - opponent).rem_euclid(3);

        // Add 1, because moves are 0-based, score is 1-based
        score += 1 + match difference {
            0 => player + 3,
            1 => player + 6,
            _ => player + 0,
        };
    }

    score
}
