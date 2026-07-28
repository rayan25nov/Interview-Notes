# Graph Concepts & Qns - 1: Introduction to Graphs

**Video Link:** [Graph Concepts & Qns - 1 : Graph will no more be a Nightmare](https://youtu.be/5JGiZnr6B5w)  
**Channel:** codestorywithMIK  

## Overview
This video serves as an introduction to a comprehensive Graph playlist. The core philosophy of this series is to break down the complex topic of graphs into smaller, manageable sub-topics. 

### Learning Methodology
Instead of learning all the theory at once (which can be boring and overwhelming), the series will follow a **Topic-Driven Approach**:
1. **Learn a Topic/Concept:** Understand the underlying theory of a specific sub-topic.
2. **Solve Questions:** Immediately solve multiple problems related to that specific topic to solidify understanding and build muscle memory.
*(This is similar to how mathematics is taught in school—learn a formula, then solve exercises based on it.)*

## Basic Terminology
Before diving into complex algorithms, it's essential to know the fundamental components of a graph:
*   **Vertices (Nodes):** The fundamental units or points in a graph.
*   **Edges:** The connections or lines that link the vertices together.
*   **Undirected Graph (UDG):** A graph where edges have no direction. The connection between nodes is bi-directional.
*   **Directed Graph (DG):** A graph where edges have a specific direction (indicated by arrows). 
*   *Note: A Tree is also a specific type of Graph.*

## The Roadmap (Upcoming Topics)
The series will cover various concepts step-by-step. Some of the major topics to be covered include:
*   **Graph Representation:** (The fundamental first step before coding any graph algorithm).
*   **Graph Traversals:** BFS (Breadth-First Search) and DFS (Depth-First Search). The goal is to make coding BFS and DFS as natural as tree traversals.
*   **Cycles in a Graph:** Detecting cycles in different types of graphs.
*   **Degrees:** In-degree and Out-degree concepts and related problems.
*   **Advanced Topics:** Minimum Spanning Tree (MST), Disjoint Set Union (DSU), etc.

## Next Steps
Before solving any problems or running traversals, you must first know how to represent a graph in code. Therefore, **Topic 1** in the upcoming session will be **Graph Representation**.


# Graph Concepts & Qns - 2: Graph Representations

**Video Link:** [Graph Concepts & Qns - 2 : Graph Representations](https://youtu.be/o9JvO7MGQPo)  
**Channel:** codestorywithMIK  

## Overview
Before jumping into complex graph algorithms, it is crucial to understand how to represent a graph in code. This video explains the two primary ways to store graph data structure: **Adjacency Matrix** and **Adjacency List**, focusing heavily on the Adjacency List since it is the most common and efficient way to solve problems.

## 1. Adjacency Matrix
An Adjacency Matrix is a 2D array (matrix) of size `V x V`, where `V` is the number of vertices in the graph.
*   **Structure:** If there are 4 nodes (0, 1, 2, 3), you create a 4x4 grid.
*   **Populating the Matrix:**
    *   If there is a directed edge from node `u` to node `v`, you set `matrix[u][v] = 1`.
    *   If the graph is *undirected*, you must set both `matrix[u][v] = 1` and `matrix[v][u] = 1`. (The matrix becomes symmetric along the diagonal).
*   **Drawback:** It consumes `O(V^2)` space. Even if there are very few edges in the graph (a sparse graph), you are still allocating a massive 2D array, which leads to a lot of wasted space (filling cells with `0` where no edges exist).

## 2. Adjacency List (Most Recommended)
This is the most popular and space-efficient way to represent graphs, particularly for coding interviews.
*   **Concept:** Instead of a 2D matrix, you keep track of "neighbors." For every node `u`, you store a list of all nodes `v` that it can directly reach.
*   **Data Structures Used:**
    *   `unordered_map<int, vector<int>> adj;` (In C++, a map where the key is the node, and the value is a vector/list of its neighbors).
    *   Alternatively, you can use an array/vector of vectors: `vector<int> adj[V];` if nodes are strictly numbered from `0` to `V-1`.
*   **Space Complexity:** `O(V + E)`, where `V` is the number of vertices and `E` is the number of edges. This is highly efficient compared to the matrix.

### Example Walkthrough (Adjacency List)
If you have edges like: `0 -> 1`, `0 -> 2`, `1 -> 2`, `1 -> 3`, `3 -> 1`:
```java
adj[0] = {1, 2}
adj[1] = {2, 3}
adj[2] = {}        // Can't go anywhere from 2
adj[3] = {1}
```

How to identify a Graph Problem?
The video shares some "pro-tips" on how to recognize if a question requires graph concepts:
Nodes labeled 0 to n-1: If a question states that there are N entities (like courses, cities, computers) labeled from 0 to N-1, it is a massive hint that it's a graph problem.
Relationships / Pairs: If the input is given as an array of pairs indicating a relationship (e.g., [u, v] meaning "to take course v, you must first take course u" or "city u is connected to city v"), these pairs represent edges.
Direct Terminology: Some questions explicitly use graph terms like "find if the graph is bipartite", "detect a cycle", or "find the shortest path."
Coding the Adjacency List (Snippet)

```java
        List<List<Integer>> adj = new ArrayList<>();
        for(int i=0; i<V; i++){
            adj.add(new ArrayList<>());
        }
        
        for(int edge[]: edges){
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }
```# Graph Concepts & Qns - 3: DFS & BFS

**Video Link:** [Graph Concepts & Qns - 3 : DFS & BFS](https://youtu.be/V4xpJNgxMDY)  
**Channel:** codestorywithMIK  

## Overview
Now that we know how to represent a graph in code, the next logical step is to learn how to traverse it. Just like traversing a Tree, there are two primary ways to traverse a Graph: **DFS (Depth-First Search)** and **BFS (Breadth-First Search)**.

The core difference between Tree traversal and Graph traversal is that **Graphs can have cycles**. Therefore, we must use a `visited` array (or map) to keep track of the nodes we have already seen, preventing infinite loops.

## 1. Depth-First Search (DFS)
*   **Concept:** Start at a source node and go as deep as possible along a branch before backtracking. 
*   **Mental Model:** You pick a neighbor, and instead of checking the other neighbors of your current node, you immediately jump to the neighbor's neighbor, going deeper and deeper.
*   **Implementation Strategy:** DFS is most naturally implemented using **Recursion** (which inherently uses the Call Stack).
*   **Time Complexity:** `O(V + E)` where `V` is vertices and `E` is edges.
*   **Space Complexity:** `O(V)` for the recursive call stack and the `visited` array.

### Java Implementation of DFS
```java
import java.util.*;

class GraphDFS {
    // Recursive DFS function
    public void dfs(Map<Integer, List<Integer>> adj, int u, boolean[] visited, List<Integer> result) {
        // Mark the current node as visited and add to result
        visited[u] = true;
        result.add(u);
        
        // Go through all the neighbors of the current node
        for (int v : adj.getOrDefault(u, new ArrayList<>())) {
            // If the neighbor is not visited, go deeper (recursive call)
            if (!visited[v]) {
                dfs(adj, v, visited, result);
            }
        }
    }
    
    // Main function to initiate DFS
    public List<Integer> dfsOfGraph(int V, Map<Integer, List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        List<Integer> result = new ArrayList<>();
        
        // Assuming we start from node 0 (if graph is connected)
        // If graph is disconnected, you might need a loop to check all nodes
        dfs(adj, 0, visited, result);
        
        return result;
    }
}

```

2. Breadth-First Search (BFS)
Concept: Start at a source node and explore its immediate neighbors first, then move to the neighbors of those neighbors. It explores the graph level by level (radially outward).
Mental Model: Imagine dropping a stone in water; the ripples expand outward uniformly. Level 1, then Level 2, then Level 3.
Use Case Pro-Tip: Because it traverses level-by-level, BFS is the go-to algorithm for finding the Shortest Path in an unweighted graph. It guarantees that the first time you reach a node, you have found the shortest path to it.
Implementation Strategy: BFS uses a Queue (FIFO data structure).
Time Complexity: O(V + E)
Space Complexity: O(V) for the Queue and the visited array.
Java Implementation of BFS

```java
import java.util.*;

class GraphBFS {
    // Function to perform BFS
    public List<Integer> bfsOfGraph(int V, Map<Integer, List<Integer>> adj) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        // Start BFS from node 0
        queue.add(0);
        visited[0] = true;
        
        while (!queue.isEmpty()) {
            int u = queue.poll();
            result.add(u);
            
            // Iterate through all neighbors of the popped node
            for (int v : adj.getOrDefault(u, new ArrayList<>())) {
                if (!visited[v]) {
                    visited[v] = true; // Mark visited right away before pushing to queue
                    queue.add(v);
                }
            }
        }
        
        return result;
    }
}
```

Summary
DFS goes deep first -> Uses Recursion (Stack).
BFS goes wide first (level-by-level) -> Uses a Queue.
Never forget the visited array when dealing with Graphs to prevent cycles!

