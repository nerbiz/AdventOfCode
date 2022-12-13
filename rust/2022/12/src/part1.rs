use aoc_pathfinding::dijkstra::Grid;

pub fn solve(area: &mut Grid, start: &[usize; 2], target: &[usize; 2]) -> Option<u32> {
    area.find_path(&start, &target)
}
