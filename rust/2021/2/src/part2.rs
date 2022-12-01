pub fn solve(commands: &Vec<(&str, i32)>) -> i32 {
    let mut aim: i32 = 0;
    let mut position: i32 = 0;
    let mut depth: i32 = 0;

    for &(command, amount) in commands.iter() {
        if command == "forward" {
            position += amount;
            depth += aim * amount;
        } else if command == "up" {
            aim -= amount;
        } else if command == "down" {
            aim += amount;
        } else {
            panic!("{}", format!("Invalid command '{}', valid commands are 'forward', 'up' and 'down'", command));
        }
    }

    position * depth
}
