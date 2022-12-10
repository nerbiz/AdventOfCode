pub fn solve(instructions: &Vec<(&str, i32)>) -> i32 {
    let indexes: [i32; 6] = [20, 60, 100, 140, 180, 220];
    let mut cycles: i32 = 0;
    let mut register: i32 = 1;
    let mut total: i32 = 0;

    for (operation, amount) in instructions {
        cycles += 1;
        if indexes.contains(&cycles) {
            total += cycles * register;
        }

        if operation == &"addx" {
            cycles += 1;
            if indexes.contains(&cycles) {
                total += cycles * register;
            }

            register += amount;
        }
    }

    total
}
