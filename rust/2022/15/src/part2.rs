use crate::Sensor;

pub fn solve(sensors: &mut Vec<Sensor>) -> u32 {
    // Look for possible points between pairs of sensors,
    // that are out of reach for both of them
    sensors.sort_by(|a, b| b.distance.cmp(&a.distance));
    for (index, sensor) in sensors.iter().enumerate() {
        println!("\nSensor at {},{}, max distance {}", sensor.x, sensor.y, sensor.distance);

        for other in sensors[index+1..].iter() {
            let distance: u32 = sensor.x.abs_diff(other.x)
                + sensor.y.abs_diff(other.y);

            if sensor.distance + other.distance >= distance {
                continue;
            }

            println!(
                "  Other: {},{}, max distance {}\n  Distance to other: {distance}\n    In between: {}",
                other.x,
                other.y,
                other.distance,
                distance - sensor.distance - other.distance
            );
        }
    }

    0
}
