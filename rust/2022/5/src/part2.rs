pub fn solve(stacks: &mut Vec<Vec<String>>, steps: &Vec<[usize; 3]>) -> String {
    steps.iter().for_each(|[amount, from, to]| {
        let from_stack: &mut Vec<String> = &mut stacks[*from];
        let mut crate_labels: Vec<String> = from_stack
            .drain(from_stack.len() - amount..)
            .collect();

        stacks[*to].append(&mut crate_labels);
    });

    stacks.iter().fold(
        String::from(""),
        |result, stack| result + stack.last().unwrap()
    )
}
