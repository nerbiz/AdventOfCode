pub fn solve(stacks: &mut Vec<Vec<String>>, steps: &Vec<[usize; 3]>) -> String {
    steps.iter().for_each(|[amount, from, to]| {
        for _i in 0..*amount {
            let crate_label: String = stacks[*from].pop().unwrap();
            stacks[*to].push(crate_label);
        }
    });

    stacks.iter().fold(
        String::from(""),
        |result, stack| result + stack.last().unwrap()
    )
}
