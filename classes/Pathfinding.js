import PriorityQueue from './PriorityQueue.js';

export default class Pathfinding
{
    /**
     * Find the shortest path between 2 nodes using the A* algorithm
     * @param {Array2d} grid
     * @param {Array2dItem} startNode
     * @param {Array2dItem} targetNode
     * @param {function} isObstacle A function that checks if a node is an obstacle
     * @returns {array|boolean} The shortest path as a nodes array, or false if target is unreachable
     */
    static aStar(grid, startNode, targetNode, isObstacle)
    {
        // Reset pathfinding properties of all nodes
        grid.forEach2d(node => {
            node.G = undefined;
            node.F = undefined;
            node.previous = undefined;
            node.visited = false;
        });

        // Calculate the F value of the start node
        startNode.G = 0;
        startNode.F = startNode.G + Math.abs(targetNode.x - startNode.x)
            + Math.abs(targetNode.y - startNode.y);

        const queue = [startNode];

        while (queue.length > 0) {
            const currentNode = queue.sort((a, b) => a.F - b.F).shift();
            currentNode.visited = true;

            // Target reached
            if (currentNode === targetNode) {
                break;
            }

            for (const neighbour of currentNode.getAdjacentItems()) {
                if (neighbour === undefined
                    // The node must not be an obstacle
                    || isObstacle(neighbour)
                    // The node must not be visited yet
                    || neighbour.visited === true
                ) {
                    continue;
                }

                // Calculate the F value of the neighbour
                const G = (currentNode.G + 1);
                const F = G + Math.abs(targetNode.x - neighbour.x)
                    + Math.abs(targetNode.y - neighbour.y);

                // Update the neighbour's values if it's not in the queue,
                // or if it is in the queue, but the F is lower
                const inQueue = queue.includes(neighbour);
                if (! inQueue || (inQueue && F < neighbour.F)) {
                    neighbour.G = G;
                    neighbour.F = F;
                    neighbour.previous = currentNode;
                }

                // Add the neighbour to the queue
                if (! inQueue) {
                    queue.push(neighbour);
                }
            }
        }

        if (targetNode.previous === undefined) {
            return false;
        }

        // Construct the path
        const path = [];
        let currentNode = targetNode;
        while (currentNode.previous !== undefined) {
            path.push(currentNode);
            currentNode = currentNode.previous;
        }

        // Reverse the path, to go from start to end
        return path.reverse();
    }

    /**
     * Find the shortest path between 2 nodes using Dijkstra's algorithm
     * @param {Array2d} grid
     * @param {Array2dItem} startNode
     * @param {Array2dItem} targetNode
     * @returns {array} The shortest path as a nodes array
     */
    static dijkstra(grid, startNode, targetNode)
    {
        // Reset pathfinding properties of all nodes
        grid.forEach2d(node => {
            node.distance = Infinity;
            node.previous = undefined;
            node.visited = false;
        });

        startNode.distance = 0;
        const unvisitedQueue = new PriorityQueue();
        unvisitedQueue.enqueue(startNode.distance, startNode);

        findTarget: while (! unvisitedQueue.isEmpty()) {
            // Get the next nearest node from the unvisited queue
            const nearestNode = unvisitedQueue.dequeue();

            for (const adjacent of nearestNode.getAdjacentItems()) {
                // The adjacent node should not be visited yet
                if (adjacent === undefined || adjacent.visited === true) {
                    continue;
                }

                // Update the distance in the adjacent node, if the distance is smaller
                const newDistance = nearestNode.distance + adjacent.value;
                if (newDistance < adjacent.distance) {
                    adjacent.distance = newDistance;
                    adjacent.previous = nearestNode;
                }

                // Stop searching after the target node is reached
                if (adjacent === targetNode) {
                    break findTarget;
                }

                // Add the adjacent node to the queue, if it's not in there yet
                if (! unvisitedQueue.has(adjacent)) {
                    unvisitedQueue.enqueue(adjacent.distance, adjacent);
                }
            }

            nearestNode.visited = true;
        }

        // Construct the path
        const path = [];
        let currentNode = targetNode;
        while (currentNode.previous !== undefined) {
            path.push(currentNode);
            currentNode = currentNode.previous;
        }

        // Reverse the path, to go from start to end
        return path.reverse();
    }
}
