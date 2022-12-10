pub fn solve(instructions: &Vec<(&str, i32)>) -> [String; 6] {
    let mut pixels: [[&str; 40]; 6] = [["."; 40]; 6];
    let mut current_row: usize = 0;
    let mut cycles: i32 = -1;
    let mut register: i32 = 1;

    let mut index: usize = 0;
    let mut wait: bool = false;
    while index < instructions.len() {
        let (operation, amount) = &instructions[index];
        cycles += 1;

        // Wrap around and go to the next row
        if cycles == 40 {
            current_row += 1;
            cycles -= 40;
        }

        // Set a lit pixel, if the cycle and register overlap
        if cycles >= register - 1 && cycles <= register + 1 {
            pixels[current_row][cycles as usize] = "#";
        }

        if operation == &"addx" {
            wait = !wait;

            if wait {
                continue;
            }

            register += amount;
        }

        index += 1;
    }

    pixels.map(|row| row.join(""))
}
