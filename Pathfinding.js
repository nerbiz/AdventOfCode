import PriorityQueue from './PriorityQueue.js';

export default class Pathfinding
{
    /**
     * Find the shortest path between 2 nodes using the A* algorithm
     * @param {Array2d} grid
     * @param {Array2dItem} startNode
     * @param {Array2dItem} targetNode
     * @param {function} checkForWall A function that checks if a node is a wall
     * @returns {array} The shortest path as a nodes array
     */
    static aStar(grid, startNode, targetNode, checkForWall = neighbor => false)
    {
        // Reset pathfinding properties of all nodes
        grid.forEach2d(node => {
            node.G = undefined;
            node.F = undefined;
            node.previous = undefined;
        });

        // Calculate the F value of the start node
        startNode.G = 0;
        startNode.F = startNode.G + Math.abs(targetNode.x - startNode.x)
            + Math.abs(targetNode.y - startNode.y);

        const queue = [startNode];
        const visited = [];

        while (queue.length > 0) {
            const currentNode = queue.sort((a, b) => a.F - b.F).shift();
            visited.push(currentNode);

            // Target reached
            if (currentNode === targetNode) {
                break;
            }

            for (const neighbor of currentNode.getAdjacentItems()) {
                if (neighbor === undefined
                    // The node must not be an obstacle
                    || neighbor.value === checkForWall(neighbor)
                    // The node must not be visited yet
                    || visited.includes(neighbor)
                ) {
                    continue;
                }

                // Calculate the F value of the neighbor
                const G = (currentNode.G + 1);
                const F = G + Math.abs(targetNode.x - neighbor.x)
                    + Math.abs(targetNode.y - neighbor.y);

                // Update the neighbor's values if it's not in the queue,
                // or if it is in the queue, but the F is lower
                const inQueue = queue.includes(neighbor);
                if (! inQueue || (inQueue && F < neighbor.F)) {
                    neighbor.G = G;
                    neighbor.F = F;
                    neighbor.previous = currentNode;
                }

                // Add the neighbor to the queue
                if (! inQueue) {
                    queue.push(neighbor);
                }
            }
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
        });

        startNode.distance = 0;
        const unvisitedQueue = new PriorityQueue();
        unvisitedQueue.enqueue(startNode.distance, startNode);

        while (! unvisitedQueue.isEmpty()) {
            // Get the next nearest node from the unvisited queue
            const nearestNode = unvisitedQueue.dequeue();

            let targetReached = false;
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

                if (adjacent === targetNode) {
                    targetReached = true;
                    break;
                }

                // Add the adjacent node to the queue, if it's not in there yet
                if (! unvisitedQueue.has(adjacent)) {
                    unvisitedQueue.enqueue(adjacent.distance, adjacent);
                }
            }

            nearestNode.visited = true;

            // Stop searching after the target node is reached
            if (targetReached === true) {
                break;
            }
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
