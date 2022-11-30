pub fn solve(numbers: &Vec<i32>) -> i32 {
    let mut increase_amount: i32 = 0;

    for (i, number) in numbers.iter().enumerate() {
        if i == 0 {
            continue;
        }

        if *number > numbers[i - 1] {
            increase_amount += 1;
        }
    }

    increase_amount
}
