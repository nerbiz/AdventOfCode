pub fn solve(numbers: &Vec<i32>) -> i32 {
    let mut current_sum: i32 = get_sum(&numbers, 0);
    let mut increase_amount: i32 = 0;

    for i in 1..numbers.len()-2 {
        let sum: i32 = get_sum(&numbers, i);
        if sum > current_sum {
            increase_amount += 1;
        }

        current_sum = sum;
    }

    increase_amount
}

fn get_sum(numbers: &Vec<i32>, from_index: usize) -> i32 {
    numbers.get(from_index).unwrap_or(&0)
        + numbers.get(from_index + 1).unwrap_or(&0)
        + numbers.get(from_index + 2).unwrap_or(&0)
}
