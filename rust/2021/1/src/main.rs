use aoc_utils::Input;

fn main() {
    let input = Input {
        file_path: String::from("2021/1/res/input.txt"),
    };

    let numbers: Vec<u32> = input.parse()
        .into_iter()
        .map(|line| line.parse::<u32>()
            .expect("All lines in the input file need to be a valid positive number"))
        .collect();

    println!("\nPart 1 answer: {}", part_1(&numbers));
    println!("\nPart 2 answer: {}", part_2(&numbers));
}

fn part_1(numbers: &Vec<u32>) -> u32 {
    let mut increase_amount: u32 = 0;

    for (index, number) in numbers.iter().enumerate() {
        if index == 0 {
            continue;
        }

        if *number > numbers[index - 1] {
            increase_amount += 1;
        }
    }

    increase_amount
}

fn part_2(numbers: &Vec<u32>) -> u32 {
    let mut current_sum: u32 = get_sum(&numbers, 0);
    let mut increase_amount: u32 = 0;

    for i in 1..numbers.len()-2 {
        let sum: u32 = get_sum(&numbers, i);
        if sum > current_sum {
            increase_amount += 1;
        }

        current_sum = sum;
    }

    increase_amount
}

fn get_sum(numbers: &Vec<u32>, from_index: usize) -> u32 {
    numbers.get(from_index).unwrap_or(&0)
        + numbers.get(from_index + 1).unwrap_or(&0)
        + numbers.get(from_index + 2).unwrap_or(&0)
}
