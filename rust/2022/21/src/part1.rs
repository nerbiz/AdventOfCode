use std::collections::HashMap;
use crate::{get_value, Value};

pub fn solve(monkeys: &HashMap<&str, Value>) -> i64 {
    get_value(monkeys, "root")
}
