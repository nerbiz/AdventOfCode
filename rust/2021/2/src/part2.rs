pub fn solve(commands: &Vec<(&str, i32)>) -> i32 {
    let mut aim: i32 = 0;
    let mut position: i32 = 0;
    let mut depth: i32 = 0;

    for &(command, amount) in commands.iter() {
        match command {
            "forward" => {
                position += amount;
                depth += aim * amount;
            },
            "up" => aim -= amount,
            "down" => aim += amount,
            _ => panic!("{}", format!("Invalid command '{}', valid commands are 'forward', 'up' and 'down'", command)),
        }
    }

    position * depth
}
