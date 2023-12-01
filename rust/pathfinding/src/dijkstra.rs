use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct Node {
    pub x: usize,
    pub y: usize,
    pub cost: u32,
    visited: bool,
    distance: u32,
    steps: u32,
    previous: Option<[usize; 2]>,
}

#[derive(Clone)]
pub struct Grid {
    nodes: HashMap<[usize; 2], Node>,
    neighbour_condition: Option<fn(&u32, &u32) -> bool>,
}

impl Grid {
    pub fn from(costs: &Vec<Vec<u32>>) -> Grid {
        let mut nodes: HashMap<[usize; 2], Node> = HashMap::new();

        for (y, row) in costs.iter().enumerate() {
            for (x, &cost) in row.iter().enumerate() {
                nodes.insert([x, y], Node {
                    x, y, cost,
                    visited: false,
                    distance: u32::MAX,
                    steps: 0,
                    previous: None,
                });
            }
        }

        Grid {
            nodes,
            neighbour_condition: None,
        }
    }

    pub fn get_nodes(&self) -> &HashMap<[usize; 2], Node> {
        &self.nodes
    }

    pub fn get_nodes_mut(&mut self) -> &mut HashMap<[usize; 2], Node> {
        &mut self.nodes
    }

    pub fn set_neighbour_condition(&mut self, closure: fn(&u32, &u32) -> bool) {
        self.neighbour_condition = Some(closure);
    }

    pub fn find_path(&mut self, start: &[usize; 2], target: &[usize; 2]) -> Option<u32> {
        let mut queue: Vec<[usize; 2]> = Vec::new();
        let start_node = self.nodes.get_mut(start).unwrap();
        start_node.distance = 0;
        queue.push(*start);

        while queue.len() > 0 {
            queue.sort_by(|a, b| {
                let node_a = self.nodes.get(a).unwrap();
                let node_b = self.nodes.get(b).unwrap();

                node_b.distance.cmp(&node_a.distance)
            });

            // Get the nearest node from the queue
            let key: &[usize; 2] = &queue.pop().unwrap();
            let nearest: &mut Node = self.nodes.get_mut(key).unwrap();
            let nearest = nearest.clone();

            for coords in self.get_neighbours(&nearest) {
                let neighbour: &mut Node = self.nodes.get_mut(&coords).unwrap();

                // Update the distance in the neighbour, if the distance is smaller
                let new_distance = nearest.distance + neighbour.cost;
                if new_distance < neighbour.distance {
                    neighbour.distance = new_distance;
                    neighbour.steps = nearest.steps + 1;
                    neighbour.previous = Some([nearest.x, nearest.y]);
                }

                // Stop searching after the target node is reached
                if &[neighbour.x, neighbour.y] == target {
                    return Some(neighbour.steps);
                }

                // Add the neighbour to the queue, if it's not in there yet
                if !queue.contains(&coords) {
                    queue.push(coords);
                }
            }

            // Mark the node as visited
            self.nodes.get_mut(&[nearest.x, nearest.y])
                .unwrap().visited = true;
        }

        None
    }

    fn get_neighbours(&mut self, node: &Node) -> Vec<[usize; 2]> {
        [[0, -1], [1, 0], [0, 1], [-1, 0]]
            .iter()
            .filter_map(|[delta_x, delta_y]| {
                if node.x == 0 && delta_x < &0 || node.y == 0 && delta_y < &0 {
                    return None;
                }

                let x: usize = ((node.x as i32) + delta_x) as usize;
                let y: usize = ((node.y as i32) + delta_y) as usize;

                if let Some(neighbour) = self.nodes.get_mut(&[x, y]) {
                    // Skip visited nodes
                    if neighbour.visited == true {
                        return None;
                    }

                    // Check with an extra condition, if it exists
                    return match self.neighbour_condition {
                        Some(check) => {
                            match check(&node.cost, &neighbour.cost) {
                                true => Some([neighbour.x, neighbour.y]),
                                false => None,
                            }
                        },
                        None => Some([neighbour.x, neighbour.y]),
                    };
                }

                None
            })
            .collect()
    }
}
