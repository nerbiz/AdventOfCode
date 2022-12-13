use aoc_pathfinding::dijkstra::Grid;

pub fn solve(area: &mut Grid, target: &[usize; 2]) -> u32 {
    area.get_nodes().iter()
        .filter_map(|(coords, node)| {
            if node.cost != 'a' as u32 {
                return None;
            }

            area.clone().find_path(coords, target)
        })
        .min()
        .unwrap_or(0)
}
