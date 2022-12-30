use std::time::{Duration, Instant};

pub struct Timing {
    instant: Instant,
}

impl Timing {
    pub fn start() -> Timing {
        Timing {
            instant: Instant::now()
        }
    }

    pub fn output(&self) {
        let elapsed: Duration = self.instant.elapsed();

        println!(
            "Finished in {}.{} ms",
            elapsed.as_millis(),
            elapsed.as_nanos() % 1_000_000
        );
    }
}
