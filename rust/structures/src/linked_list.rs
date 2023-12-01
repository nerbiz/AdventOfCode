use std::rc::Rc;

#[derive(Debug, Clone)]
struct Item<T> {
    value: T,
    previous: Option<Rc<Item<T>>>,
    next: Option<Rc<Item<T>>>,
}

#[derive(Debug, Clone)]
pub struct LinkedList<T> {
    size: usize,
    first: Option<Rc<Item<T>>>,
}

impl<T> LinkedList<T> {
    pub fn new() -> Self {
        LinkedList {
            size: 0,
            first: None,
        }
    }

    pub fn size(&self) -> usize {
        self.size
    }

    pub fn add(&mut self, value: T) {
        // Create the first item, if the list is empty
        if self.size == 0 {
            let item = Rc::new(Item {
                value,
                previous: None,
                next: None,
            });

            item.previous = Some(item.clone());
            item.next = Some(item.clone());

            self.size += 1;
        }

        // Otherwise add the item at the end
        let last_item = self.first.unwrap().previous.unwrap();
        self.add_after(last_item, value);
    }

    pub fn add_before(&self, item: Rc<Item<T>>, value: T) {
    }

    pub fn add_after(&self, item: Rc<Item<T>>, value: T) {
    }

    // pub fn connect(leftNode, rightNode) {
    // }
    //
    // pub fn find(value, startNode = undefined) {
    // }
    //
    // return currentNode;
    // }
    //
    // pub fn remove(node) {
    // }
    //
    // pub fn getFirst() {
    // }
    //
    // pub fn getLast() {
    // }
    //
    // pub fn getPrevious(node, steps = 1) {
    // }
    //
    // pub fn getNext(node, steps = 1) {
    // }
    //
    // pub fn clear() {
    // }
    //
    // pub fn to_vec() {
    // }
}
