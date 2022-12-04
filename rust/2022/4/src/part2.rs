pub fn solve(pairs: &Vec<Vec<[i32; 2]>>) -> i32 {
    pairs.iter()
        .filter(|pair| (
            (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1])
            || (pair[1][1] >= pair[0][0] && pair[1][1] <= pair[0][1])
        ))
        .collect::<Vec<&Vec<[i32; 2]>>>()
        .len() as i32
}
