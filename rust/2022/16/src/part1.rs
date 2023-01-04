use std::collections::HashSet;
use crate::Valve;

const MAX_MINUTES: u32 = 30;

struct State<'a> {
    valves: &'a Vec<Valve>,
    minutes: u32,
    valve_name: &'a String,
    remaining: HashSet<&'a String>,
    history: Vec<String>,
    pressure_released: u32,
    max_released: u32,
}

pub fn solve(valves: &Vec<Valve>) -> u32 {
    let mut state = State {
        valves,
        minutes: 0,
        valve_name: &String::from("AA"),
        remaining: valves.iter()
            .filter_map(|valve| {
                // Keep only the valves that have a flow rate
                match valve.flow_rate {
                    0 => None,
                    _ => Some(&valve.name),
                }
            })
            .collect(),
        history: Vec::new(),
        pressure_released: 0,
        max_released: 0,
    };

    traverse(&mut state);
    state.max_released
}

fn traverse(mut state: &mut State) -> u32 {
    if state.minutes == MAX_MINUTES {
        return state.max_released;
    }

    let valve: &Valve = state.valves.iter()
        .find(|valve| valve.name == *state.valve_name)
        .unwrap();

    // Open the valve if it's closed and has a flow rate
    if valve.flow_rate > 0 && state.remaining.contains(&valve.name) {
        state.remaining.remove(&valve.name);
        state.minutes += 1;
        let pressure_released: u32 = (MAX_MINUTES - state.minutes) * valve.flow_rate;
        state.pressure_released += pressure_released;

        state.max_released = state.max_released
            .max(state.pressure_released)
            .max(traverse(&mut state));

        // Revert the values after the recursion
        state.remaining.insert(&valve.name);
        state.minutes -= 1;
        state.pressure_released -= pressure_released;
    }

    // Stop if the current path can't make a higher value
    if highest_estimate(&state) <= state.max_released {
        return state.max_released;
    }

    for other in valve.tunnels.iter() {
        // Skip if this move has already been made
        let movement_string: &String = &format!("{}>{other}", state.valve_name);
        if state.history.contains(movement_string) {
            continue;
        }

        // Go to the other valve with the closed state
        state.valve_name = other;
        state.minutes += 1;
        state.history.push(movement_string.to_owned());

        state.max_released = state.max_released
            .max(traverse(&mut state));

        // Revert the values after the recursion
        state.valve_name = &valve.name;
        state.minutes -= 1;
        state.history.pop();
    }

    state.max_released
}

/// Get the highest estimated pressure release value
fn highest_estimate(state: &State) -> u32 {
    let mut remaining_minutes: u32 = MAX_MINUTES - state.minutes;
    let mut total: u32 = state.pressure_released;

    for &name in state.remaining.iter() {
        if remaining_minutes < 2 {
            break;
        }

        let valve: &Valve = state.valves
            .iter()
            .find(|valve| valve.name == *name)
            .unwrap();

        // Subtract 2 minutes for moving and opening the valve
        remaining_minutes -= 2;
        total += remaining_minutes * valve.flow_rate;
    }

    total
}
