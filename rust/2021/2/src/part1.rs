pub fn solve(commands: &Vec<(&str, i32)>) -> i32 {
    let mut position: i32 = 0;
    let mut depth: i32 = 0;

    for &(command, amount) in commands.iter() {
        if command == "forward" {
            position += amount;
        } else if command == "up" {
            depth -= amount;
        } else if command == "down" {
            depth += amount;
        } else {
            panic!("{}", format!("Invalid command '{}', valid commands are 'forward', 'up' and 'down'", command));
        }
    }

    position * depth
}
