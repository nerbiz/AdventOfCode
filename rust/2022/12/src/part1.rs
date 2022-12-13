use aoc_pathfinding::dijkstra::Grid;

pub fn solve(area: &mut Grid, start: &[usize; 2], target: &[usize; 2]) -> u32 {
    area.find_path(&start, &target).unwrap_or(0)
}
