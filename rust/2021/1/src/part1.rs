pub fn solve(numbers: &Vec<u32>) -> u32 {
    let mut increase_amount: u32 = 0;

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
