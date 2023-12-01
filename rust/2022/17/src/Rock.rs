#[derive(Debug, Clone)]
pub struct Rock {
    rows: Vec<u16>,
}

impl Rock {
    pub fn from(rows: &[String]) -> Rock {
        let mut rows: Vec<u16> = rows.iter()
            .map(|row| {
                // Convert ./# to 0/1
                let binary = row.replace(".", "0")
                    .replace("#", "1");

                // Convert the binary string to a number
                u16::from_str_radix(&binary, 2).unwrap()
            })
            // In reverse, because rocks fall 'up' (index >0 towards 0)
            .rev()
            .collect();

        // Make each rock start at the 6th bit (4th from the left)
        loop {
            if rows.iter().max().unwrap() & (1 << 5) > 0 {
                break;
            }

            rows.iter_mut().for_each(|row| *row <<= 1);
        }

        Rock { rows }
    }

    pub fn rows(&self) -> &Vec<u16> {
        &self.rows
    }

    pub fn move_sideways(&mut self, direction: &i8, tower_rows: &Vec<u16>) {
        // let mut iter = self.rows.iter_mut().enumerate();
        let do_shift: bool = self.rows
            .iter_mut()
            .enumerate()
            .all(|(index, row)| {
                (*direction == -1 && (*row << 1) & tower_rows[index] == 0)
                || (*direction == 1 && (*row >> 1) & tower_rows[index] == 0)
            });

        if do_shift {
            self.rows.iter_mut().for_each(|row| {
                match direction {
                    -1 => *row <<= 1,
                    1 | _ => *row >>= 1,
                };
            });
        }
    }

    pub fn debug_show(&self) {
        println!("\nRock:");

        self.rows().iter().rev().for_each(|row| {
            let row: String = format!("{:09b}", row)
                .replace("0", ".")
                .replace("1", "#");

            println!("{}", row);
        });
    }
}
