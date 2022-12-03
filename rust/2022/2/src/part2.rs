pub fn solve(rounds: &Vec<[i32; 2]>) -> i32 {
    let mut score: i32 = 0;

    for [opponent, player] in rounds {
        // Add 1, because moves are 0-based, score is 1-based
        score += 1 + match player {
            0 => (opponent - 1).rem_euclid(3),
            1 => opponent + 3,
            2 => (opponent + 1).rem_euclid(3) + 6,
            _ => 0,
        };
    }

    score
}
