use std::cmp::Ordering::{Equal, Greater, Less};

#[derive(Debug, Clone)]
struct Item<T> {
    priority: usize,
    value: T,
}

#[derive(Debug, Clone)]
pub struct PriorityQueue<T> {
    queue: Vec<Item<T>>,
}

impl<T> PriorityQueue<T>
where
    T: PartialEq
{
    pub fn new() -> Self {
        PriorityQueue {
            queue: Vec::new(),
        }
    }

    pub fn is_empty(&self) -> bool {
        self.queue.len() == 0
    }

    pub fn has(&self, value: &T) -> bool {
        for item in self.queue.iter() {
            if item.value == *value {
                return true;
            }
        }

        false
    }

    pub fn enqueue(&mut self, priority: usize, value: T) {
        let new_item = Item { priority, value };

        // Insert at the end, if the list is empty,
        // or the priority is lower than the last
        let is_empty: bool = self.is_empty();
        let last_item: Option<&Item<T>> = self.queue.last();
        if is_empty || (!is_empty && priority <= last_item.unwrap().priority) {
            self.queue.push(new_item);
            return;
        }

        // Insert at the start, if the priority is higher than the first
        let first_priority = self.queue.first().unwrap().priority;
        if priority > first_priority {
            self.queue.insert(0, new_item);
            return;
        }

        // Use a halving technique to find the index to insert at
        let mut min_index: usize = 0;
        let mut max_index: usize = self.queue.len() - 1;

        while max_index - min_index > 1 {
            let middle_index: usize = (min_index + max_index) / 2;
            let item: &Item<T> = self.queue.get(middle_index).unwrap();

            match priority.cmp(&item.priority) {
                Equal => {
                    self.queue.insert(middle_index + 1, new_item);
                    return;
                },
                Less => min_index = middle_index,
                Greater => max_index = middle_index,
            };
        }

        self.queue.insert(max_index, new_item);
    }

    pub fn peek(&self) -> Option<&T> {
        match self.queue.first() {
            Some(item) => Some(&item.value),
            _ => None,
        }
    }

    pub fn dequeue(&mut self) -> Option<T> {
        match self.queue.drain(..1).next() {
            Some(item) => Some(item.value),
            _ => None,
        }
    }

    pub fn to_vec(&self) -> Vec<&T> {
        self.queue.iter()
            .map(|item| &item.value)
            .collect()
    }
}
