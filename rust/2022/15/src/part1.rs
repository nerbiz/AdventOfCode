use crate::Sensor;

pub fn solve(sensors: &Vec<Sensor>, beacons_at_target: usize, target_row: i32) -> u32 {
    let mut min: i32 = i32::MAX;
    let mut max: i32 = i32::MIN;

    sensors.iter().for_each(|sensor| {
        let y_diff: u32 = sensor.y.abs_diff(target_row);

        // Continue to next sensor, if the row is too far away
        if y_diff > sensor.distance {
            return;
        }

        // Because of the Manhattan distance, subtract the Y distance,
        // to get the remaining distance for X
        let x_range: i32 = y_diff.abs_diff(sensor.distance) as i32;
        min = min.min(sensor.x - x_range);
        max = max.max(sensor.x + x_range);
    });

    // The whole X range (inclusive), minus the beacons that are already in the row
    max.abs_diff(min) + 1 - (beacons_at_target as u32)
}
