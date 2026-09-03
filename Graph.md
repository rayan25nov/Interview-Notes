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

#### How to identify a Graph Problem?
The video shares some "pro-tips" on how to recognize if a question requires graph concepts:
Nodes labeled 0 to n-1: If a question states that there are N entities (like courses, cities, computers) labeled from 0 to N-1, it is a massive hint that it's a graph problem.
Relationships / Pairs: If the input is given as an array of pairs indicating a relationship (e.g., [u, v] meaning "to take course v, you must first take course u" or "city u is connected to city v"), these pairs represent edges.
Direct Terminology: Some questions explicitly use graph terms like "find if the graph is bipartite", "detect a cycle", or "find the shortest path."

#### Coding the Adjacency List (Snippet)

```java
        List<List<Integer>> adj = new ArrayList<>();
        for(int i=0; i<V; i++){
            adj.add(new ArrayList<>());
        }
        
        for(int edge[]: edges){
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }
```
# Graph Concepts & Qns - 3: DFS & BFS

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

#### Summary
* DFS goes deep first -> Uses Recursion (Stack).
* BFS goes wide first (level-by-level) -> Uses a Queue.
* Never forget the visited array when dealing with Graphs to prevent cycles!

# Graph Concepts & Qns - 4: Detect Cycle in Undirected Graph using DFS

**Video Link:** [Graph Concepts & Qns - 4 (Miscoroft, Amazon, Flipkart) : Detect Cycle in Undirected Graph using DFS](https://youtu.be/UrQv5YMC060)  
**Channel:** codestorywithMIK  

## Overview
Detecting a cycle in an Undirected Graph is a highly popular interview question (asked by Microsoft, Amazon, Flipkart, etc.). This video explains how to detect a cycle using **Depth-First Search (DFS)**. 
*(Note: A subsequent video will cover cycle detection using BFS).*

## Core Concept: Cycle Detection
At first glance, you might think: *"If I am traversing the graph and I encounter a node that is already marked as `visited`, it must be a cycle!"* 

**However, in an Undirected Graph, this simple logic fails.** 
Why? Because in an undirected graph, an edge goes both ways (e.g., `A -- B`). 
*   If you go from `A` to `B`, node `B` will look at its neighbors to continue the DFS. 
*   One of `B`'s neighbors is `A`! 
*   If `B` checks `A`, it sees that `A` is already `visited`. 
*   If we strictly follow the simple logic, `B` will falsely report a cycle just because it looked back at the node that called it.

### The Fix: Keeping Track of the "Parent"
To fix this false positive, we must introduce the concept of a **parent node**. 
When node `U` calls DFS on its neighbor `V`, `U` becomes the parent of `V`.
When `V` is iterating through its neighbors, it should simply **ignore its parent**. 

**The Golden Rule for Undirected Cycle Detection:**
While traversing neighbors of current node `U`:
1. If neighbor `V` is the `parent` of `U` -> **Ignore it (continue).**
2. If neighbor `V` is NOT the `parent`, BUT is already `visited` -> **A Cycle Exists! (Return True).**
3. If neighbor `V` is not visited -> **Recursively call DFS on `V` (passing `U` as its new parent).**

## Handling Disconnected Graphs
A graph might have multiple disconnected components. Calling DFS from node `0` might not visit nodes in an entirely separate cluster. Therefore, we must loop through *all* vertices `0` to `V-1`. If a vertex is not visited, we trigger the DFS cycle check from it. If any component returns `true`, the whole graph contains a cycle.

## Java Implementation

```java
import java.util.*;

class DetectCycleDFS {
    
    // Helper function for DFS cycle detection
    private boolean isCycleDFS(List<List<Integer>> adj, int u, boolean[] visited, int parent) {
        // Mark the current node as visited
        visited[u] = true;
        
        // Traverse all neighbors of the current node 'u'
        for (int v : adj.get(u)) {
            
            // Condition 1: If neighbor 'v' is the parent, just ignore it
            if (v == parent) {
                continue;
            }
            
            // Condition 2: If neighbor 'v' is already visited and is NOT the parent -> Cycle Detected!
            if (visited[v]) {
                return true;
            }
            
            // Condition 3: If neighbor 'v' is not visited, go deeper
            // Pass current node 'u' as the parent for 'v'
            if (isCycleDFS(adj, v, visited, u)) {
                return true;
            }
        }
        
        return false;
    }

    // Main function to detect cycle in an undirected graph
    public boolean isCycle(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        
        // Loop through all nodes to handle disconnected components
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                // For the starting node of any component, parent is -1
                if (isCycleDFS(adj, i, visited, -1)) {
                    return true;
                }
            }
        }
        
        return false;
    }
}
```

Complexity Analysis
Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges. This is standard DFS time complexity.
Space Complexity: O(V) to maintain the visited array and the recursion call stack space.

# Graph Concepts & Qns - 5: Detect Cycle in Undirected Graph using BFS

**Video Link:** [Graph Concepts & Qns - 5 (Microsoft, Amazon, Flipkart.) : Detect Cycle in Undirected Graph using BFS](https://youtu.be/HqIQmKKo5_I)  
**Channel:** codestorywithMIK  

## Overview
Following up on the previous video (which used DFS), this video explains how to detect a cycle in an **Undirected Graph using Breadth-First Search (BFS)**. The core logic remains entirely the same as the DFS approach: we must keep track of the **parent** of each node to avoid falsely identifying the edge we just came from as a cycle.

## Core Concept: BFS Cycle Detection
In a standard BFS, we use a `Queue` to keep track of the nodes to visit next. 
For cycle detection, we cannot just store the node in the queue. We must store **both the node and its parent**. 
*   **Data Structure:** We can use a custom class or an integer array `new int[]{node, parent}` to represent elements in the Queue.
*   **Initialization:** When pushing the starting node (e.g., `0`) into the queue, its parent is set to `-1` (since it has no parent).
*   **The Check:** While popping a node `U` from the queue and iterating over its neighbors `V`:
    *   If `V` is NOT visited: Mark `V` as visited, and push `{V, U}` to the queue (`U` is the parent of `V`).
    *   If `V` IS visited **AND** `V != parent of U`: We have found a cycle! (Return true).

## Disconnected Components
Just like in the DFS approach, the graph might be disconnected. We must iterate through all nodes from `0` to `V-1`. If a node is not visited, we trigger the BFS from it.

## Java Implementation

```java
import java.util.*;

class DetectCycleBFS {
    
    // Helper function for BFS cycle detection
    private boolean isCycleBFS(List<List<Integer>> adj, int startNode, boolean[] visited) {
        // Queue stores arrays of size 2: {currentNode, parentNode}
        Queue<int[]> queue = new LinkedList<>();
        
        // Start BFS from startNode, parent is -1
        queue.add(new int[]{startNode, -1});
        visited[startNode] = true;
        
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int u = current[0];
            int parent = current[1];
            
            // Go through all neighbors of the current node
            for (int v : adj.get(u)) {
                
                // If neighbor is not visited, mark visited and push to queue
                if (!visited[v]) {
                    visited[v] = true;
                    queue.add(new int[]{v, u}); // u becomes the parent of v
                } 
                // If neighbor is visited AND is not the parent -> Cycle Detected!
                else if (v != parent) {
                    return true;
                }
            }
        }
        
        return false;
    }

    // Main function to detect cycle in an undirected graph
    public boolean isCycle(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        
        // Loop through all nodes to handle disconnected components
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (isCycleBFS(adj, i, visited)) {
                    return true; // Cycle found in this component
                }
            }
        }
        
        return false; // No cycle found in any component
    }
}
```
Complexity Analysis
Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges. We visit every node and traverse every edge exactly once.
Space Complexity: O(V) required for the visited array and the Queue.

# Graph Concepts & Qns - 6: Detect Cycle in Directed Graph using DFS

**Video Link:** [Graph Concepts & Qns - 6 | Flipkart, Amazon, Microsoft | Detect Cycle in Directed Graph using DFS](https://youtu.be/K_LamGUvwUc)  
**Channel:** codestorywithMIK  

## Overview
This video moves on from undirected graphs to **Directed Graphs** and explains how to detect cycles within them using **Depth-First Search (DFS)**. 
A cycle in a directed graph means you can start at a node and, by following the *directed* edges, return to that exact same node. 

## Core Concept: Why the Undirected Logic Fails
In an *undirected* graph, we detected cycles by checking if a neighbor was `visited` and was *not the parent*.
If you try to apply this exact same logic to a *directed* graph, it **fails**. 

**Example of Failure:**
Consider edges: `0 -> 1`, `0 -> 2`, `2 -> 1`.
1. DFS starts at `0`. Marks `0` visited.
2. Goes to `1`. Marks `1` visited. DFS from `1` finishes. Backtracks to `0`.
3. Goes to `2`. Marks `2` visited.
4. From `2`, goes to `1`. 
5. Sees `1` is already `visited`. Since `1` is not the parent of `2` (the parent of `2` is `0`), the old logic would declare a **cycle**. 
But looking at the edges, there is no cycle! You just found two different paths to reach `1`.

### The Fix: "In Recursion Stack" Array
To solve this, we need to know if the node we are revisiting is part of our **current DFS path (current recursion stack)**. 
*   If we revisit a node that is in our *current* recursion stack, we have found a cycle. 
*   If we revisit a node that was visited in a *previous, completed* DFS path, it is just a cross-edge, NOT a cycle.

**Data Structures Needed:**
1.  `boolean[] visited`: Tracks if a node has *ever* been visited.
2.  `boolean[] inRecursion`: Tracks if a node is part of the *current, ongoing* DFS path.

**The Golden Rule for Directed Cycle Detection (DFS):**
While exploring neighbors of `U`:
1.  If neighbor `V` is NOT `visited` -> Call DFS on `V`.
2.  If neighbor `V` IS `visited` **AND** `V` is in `inRecursion` (`inRecursion[V] == true`) -> **Cycle Detected!**

*Crucial Step:* When a DFS call for a node finishes (before returning false), you MUST unmark it from the recursion stack (`inRecursion[u] = false`).

## Java Implementation

```java
import java.util.*;

class DetectCycleDirectedDFS {
    
    // Helper function for DFS cycle detection in a Directed Graph
    private boolean isCycleDFS(List<List<Integer>> adj, int u, boolean[] visited, boolean[] inRecursion) {
        // Mark the node as visited overall and part of the current recursion stack
        visited[u] = true;
        inRecursion[u] = true;
        
        // Traverse all neighbors
        for (int v : adj.get(u)) {
            
            // Condition 1: Neighbor is not visited
            if (!visited[v]) {
                if (isCycleDFS(adj, v, visited, inRecursion)) {
                    return true;
                }
            }
            // Condition 2: Neighbor IS visited AND is in the current recursion stack -> CYCLE!
            else if (inRecursion[v]) {
                return true;
            }
        }
        
        // As we backtrack out of the DFS, remove the node from the current recursion stack
        inRecursion[u] = false;
        return false;
    }

    // Main function to detect a cycle in a directed graph
    public boolean isCyclic(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        boolean[] inRecursion = new boolean[V]; // Tracks the current path
        
        // Loop through all nodes to handle disconnected components
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (isCycleDFS(adj, i, visited, inRecursion)) {
                    return true;
                }
            }
        }
        
        return false;
    }
}
```

Complexity Analysis
Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges. Even with two boolean arrays, we only visit each node and edge exactly once.
Space Complexity: O(V) required for the visited array, the inRecursion array, and the implicit recursion stack space.

# Graph Concepts & Qns - 7: Topological Sort using DFS

**Video Link:** [Graph Concepts & Qns - 7 (Microsoft, Accolite, Amazon, Flipkart) : Topological Sort using DFS](https://youtu.be/WbbYZRr4arw)  
**Channel:** codestorywithMIK  

## Overview
This video introduces a very important and often intimidating concept: **Topological Sorting**. Despite its complex name, if you know DFS, you already know 90% of Topological Sort.

## What is Topological Sorting?
Topological sorting is a linear ordering of vertices such that for every directed edge `U -> V`, vertex `U` comes before vertex `V` in the ordering.
*   **Real-world Analogy:** Think of course prerequisites. If Course A (`U`) is a prerequisite for Course B (`V`), you MUST take Course A before Course B. The topological sort gives you a valid schedule to take all courses.
*   **Crucial Condition:** Topological sorting is ONLY possible on **Directed Acyclic Graphs (DAG)**. 
    *   *Why Directed?* Undirected edges don't have a concept of "before" or "after".
    *   *Why Acyclic?* If there's a cycle (`A -> B -> A`), `A` must come before `B`, but `B` must also come before `A`. This is a contradiction, making sorting impossible.

*Note: A single DAG can have multiple valid topological sorts.*

## Core Concept: Topological Sort using DFS
To achieve this ordering, we will use DFS combined with a **Stack**. 
Let's personify a node `U`. 
Node `U` says: *"Before I can be added to the final sorted result, all the nodes I point to (my dependencies/children) must be fully processed and added first."*

**The Strategy:**
1. Run a standard DFS.
2. When you visit a node `U`, mark it as visited.
3. Call DFS on all unvisited neighbors of `U`.
4. **The Magic Step:** ONLY when the DFS loop for `U` finishes (meaning all its neighbors and paths originating from `U` have been fully explored), you push `U` onto a **Stack**.

Because `U` is pushed onto the stack *after* all its children, `U` will sit *on top* of its children in the stack. When you finally pop elements from the stack to create the result array, `U` will naturally come before its children!

## Java Implementation

```java
import java.util.*;

class TopologicalSortDFS {
    
    // Helper function for DFS
    private void dfs(List<List<Integer>> adj, int u, boolean[] visited, Stack<Integer> stack) {
        // Mark the current node as visited
        visited[u] = true;
        
        // Visit all children/neighbors first
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                dfs(adj, v, visited, stack);
            }
        }
        
        // ALL children have been processed. 
        // Now it is safe to push the current node to the stack.
        stack.push(u);
    }

    // Main function to return topological sort
    public int[] topoSort(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        
        // Loop through all nodes to handle disconnected components
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfs(adj, i, visited, stack);
            }
        }
        
        // Pop elements from the stack to build the final sorted array
        int[] result = new int[V];
        int index = 0;
        while (!stack.isEmpty()) {
            result[index++] = stack.pop();
        }
        
        return result;
    }
}
```

Complexity Analysis
Time Complexity: O(V + E). We simply perform a standard DFS, visiting every vertex and edge exactly once. Pushing to and popping from the stack takes O(1) time.
Space Complexity: O(V). We use extra space for the visited array, the Stack, and the recursion call stack space


# Graph Concepts & Qns - 8: Kahn's Algorithm (Topological Sort using BFS)

**Video Link:** [Graph Concepts & Qns - 8 | Kahn's Algorithm | Topological Sort using BFS](https://youtu.be/uVl4ftleTes)  
**Channel:** codestorywithMIK  

## Overview
In the previous video, we learned how to perform a Topological Sort using DFS. This video explains how to achieve the exact same Topological Sort using **Breadth-First Search (BFS)**. This specific BFS approach to topological sorting is famously known as **Kahn's Algorithm**.

## Core Concept: In-Degree
To understand Kahn's Algorithm, you must first understand the concept of **In-Degree**.
*   **In-Degree:** The number of incoming edges pointing *towards* a specific node.
*   If a node has an In-Degree of `0`, it means *nothing* comes before it. No other node needs to be processed before this node.
*   **Logical Deduction:** In a valid Topological Sort, nodes with an In-Degree of `0` are completely free of dependencies and can safely be placed at the very beginning of the sorted order.

## Kahn's Algorithm (The Strategy)
1.  **Calculate In-Degrees:** Iterate through all edges in the graph and calculate the initial In-Degree for every node. Store this in an array.
2.  **Initialize the Queue:** Find all nodes that currently have an In-Degree of `0` and push them into a Queue. (These are our starting points).
3.  **Process the Queue (BFS):**
    *   Pop a node `U` from the queue.
    *   Add `U` to your final Topological Sort result list (because its dependencies are cleared).
    *   Iterate through all neighbors `V` of `U`.
    *   Since `U` has been processed, we effectively "remove" the edge `U -> V`. We simulate this by **decrementing the In-Degree of `V` by 1**.
    *   **The Check:** If the In-Degree of `V` becomes `0` after decrementing, it means all of `V`'s dependencies have been processed! Push `V` into the Queue.
4.  Repeat step 3 until the Queue is empty.

## Java Implementation

```java
import java.util.*;

class KahnsAlgorithm {
    
    // Function to return topological sort using BFS (Kahn's Algorithm)
    public int[] topoSort(int V, List<List<Integer>> adj) {
        int[] inDegree = new int[V];
        
        // Step 1: Calculate In-Degree for all nodes
        // Iterate over all nodes 'u'
        for (int u = 0; u < V; u++) {
            // For every neighbor 'v' of 'u', increment inDegree of 'v'
            for (int v : adj.get(u)) {
                inDegree[v]++;
            }
        }
        
        // Step 2: Initialize Queue with all nodes having In-Degree == 0
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }
        
        int[] result = new int[V];
        int index = 0;
        
        // Step 3: Process the Queue (Standard BFS)
        while (!queue.isEmpty()) {
            int u = queue.poll();
            
            // Add to result since all its dependencies are resolved
            result[index++] = u;
            
            // Go through all neighbors of the popped node
            for (int v : adj.get(u)) {
                // Remove the edge u -> v by decreasing in-degree of v
                inDegree[v]--;
                
                // If in-degree becomes 0, add to queue
                if (inDegree[v] == 0) {
                    queue.add(v);
                }
            }
        }
        
        return result;
    }
}
```

Complexity Analysis
Time Complexity: O(V + E).
Calculating in-degrees takes O(V + E).
The BFS processes each node once (O(V)) and iterates through all edges overall (O(E)).
Space Complexity: O(V) required for the inDegree array, the Queue, and the result array.

# Graph Concepts & Qns - 9: Detect Cycle in Directed Graph using BFS

**Video Link:** [Graph Concepts & Qns - 9 (Flipkart, Amazon, Microsoft...) : Detect Cycle in Directed Graph using BFS](https://youtu.be/74suJP4bwf0)  
**Channel:** codestorywithMIK  

## Overview
This video brings together two concepts we just learned: **Directed Graph Cycle Detection** and **Topological Sorting using BFS (Kahn's Algorithm)**. 

Remember why Kahn's Algorithm was introduced *before* teaching cycle detection with BFS? Because we can use Kahn's Algorithm directly to detect a cycle!

## Core Concept: The Kahn's Algorithm Trick
Recall the strict rule of Topological Sorting: **It is ONLY possible on a Directed Acyclic Graph (DAG).**
*   If a directed graph has a cycle, you **cannot** generate a complete topological sort.
*   *Why?* In a cycle (e.g., `A -> B -> C -> A`), the nodes in the cycle will *never* reach an In-Degree of `0`. Since they never reach `0`, they will never be pushed into the BFS Queue.

**The Strategy:**
1.  Run Kahn's Algorithm (Topological Sort via BFS) exactly as you normally would.
2.  Keep a `count` of how many nodes get pushed into the queue (or popped from the queue/added to the result).
3.  Once the algorithm finishes, compare the `count` with the total number of vertices `V`.
    *   If `count == V`: We successfully visited all nodes. This means a valid topological sort was created. Therefore, the graph is **Acyclic (No Cycle)**.
    *   If `count != V`: We couldn't visit all nodes (some were stuck with an in-degree > 0 due to a cycle). Therefore, the graph has a **Cycle**.

## Java Implementation

```java
import java.util.*;

class DetectCycleDirectedBFS {
    
    // Function to detect cycle in a directed graph using BFS (Kahn's Algorithm)
    public boolean isCyclic(int V, List<List<Integer>> adj) {
        int[] inDegree = new int[V];
        
        // Step 1: Calculate in-degree of every node
        for (int u = 0; u < V; u++) {
            for (int v : adj.get(u)) {
                inDegree[v]++;
            }
        }
        
        // Step 2: Initialize Queue and add all nodes with in-degree 0
        Queue<Integer> queue = new LinkedList<>();
        int count = 0; // To keep track of how many nodes we process
        
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
                count++; 
            }
        }
        
        // Step 3: Standard BFS (Kahn's Algorithm)
        while (!queue.isEmpty()) {
            int u = queue.poll();
            
            // Go through all neighbors
            for (int v : adj.get(u)) {
                inDegree[v]--; // Remove the edge u -> v
                
                // If in-degree becomes 0, it means dependencies are resolved
                if (inDegree[v] == 0) {
                    queue.add(v);
                    count++; // Increment count when a node is added to the queue
                }
            }
        }
        
        // Step 4: Check if we processed all vertices
        // If count == V, it means we generated a valid topo sort -> NO CYCLE (return false)
        // If count != V, it means some nodes were stuck -> CYCLE DETECTED (return true)
        return count != V;
    }
}
```

Complexity Analysis
Time Complexity: O(V + E). Exactly the same as Kahn's Algorithm. We calculate in-degrees and run a BFS.
Space Complexity: O(V). Required for the inDegree array and the Queue.

# Graph Concepts & Qns - 10: Number of Provinces (DFS)

**Video Link:** [Number of Provinces - (Google, Microsoft,Amazon) | DFS | Graph Concepts & Qns - 10](https://youtu.be/70LNE8RMPNc)  
**Channel:** codestorywithMIK  

## Overview
This video transitions from purely learning concepts to actually solving real-world interview questions (asked by Google, Microsoft, Amazon). The first problem tackled is the classic **Number of Provinces**.

## Problem Breakdown
**The Story:** You are given `N` cities. Some cities are connected, and some are not. A group of cities connected directly or indirectly forms a **Province**. Your task is to find the total number of distinct provinces.

**The Input:** You are given an `N x N` matrix called `isConnected` where:
*   `isConnected[i][j] = 1` means City `i` and City `j` are directly connected.
*   `isConnected[i][j] = 0` means they are not directly connected.
*   (This input is basically an Adjacency Matrix representation of an Undirected Graph).

**Graph Interpretation:** 
The problem is simply asking: **Find the number of disconnected components in the graph.**

## Core Concept: Counting Components using DFS
We already know how to handle disconnected components in a graph using a `visited` array and a `for` loop that iterates from `0` to `N-1`. 

**The Strategy:**
1. Initialize a `visited` array (size `N`) to `false`.
2. Initialize a `count` variable to `0`.
3. Loop `i` from `0` to `N-1`:
    * If City `i` is NOT `visited`:
        * It means we have found a new province! Increment `count`.
        * Trigger a **DFS** starting from City `i`. 
        * The DFS will traverse *all* cities connected to City `i` (directly or indirectly) and mark them as `visited`. 
        * By the time the DFS finishes, an entire province is marked as `visited`, so the main loop will skip over them in future iterations.
4. Return `count`.

## Java Implementation

Instead of converting the given Adjacency Matrix into an Adjacency List, we can perform the DFS directly on the Matrix to save time and space.

```java
class NumberOfProvincesDFS {
    
    // Helper function for DFS directly on the adjacency matrix
    private void dfs(int[][] isConnected, int u, boolean[] visited) {
        // Mark the current city as visited
        visited[u] = true;
        
        // Check all potential neighbors (columns in the matrix for row 'u')
        for (int v = 0; v < isConnected.length; v++) {
            // If there is a connection AND the neighbor is not visited
            if (isConnected[u][v] == 1 && !visited[v]) {
                dfs(isConnected, v, visited);
            }
        }
    }

    // Main function to count the number of provinces
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;
        
        // Loop through all cities
        for (int i = 0; i < n; i++) {
            // If the city is not visited, we found a new province
            if (!visited[i]) {
                count++;
                // Start DFS to mark all connected cities in this province
                dfs(isConnected, i, visited);
            }
        }
        
        return count;
    }
}
```

Complexity Analysis
Time Complexity: O(N^2) where N is the number of cities. We iterate through the N x N matrix. Even though we have nested loops and DFS, we check each matrix cell exactly once.
Space Complexity: O(N) for the visited array and the implicit DFS recursion stack, which can go N levels deep in the worst case (a single straight-line connected graph).

# Graph Concepts & Qns - 11: Number of Provinces (BFS)

**Video Link:** [Number of Provinces - (Google, Microsoft,Amazon) | BFS | Graph Concepts & Qns - 11](https://youtu.be/YDMkSvNdB20)  
**Channel:** codestorywithMIK  

## Overview
Following up on the previous video (Video #10) where we solved the "Number of Provinces" (LeetCode 547) problem using Depth-First Search (DFS), this video demonstrates how to solve the exact same problem using **Breadth-First Search (BFS)**. 

The core logic remains completely unchanged: we are still just counting the number of disconnected components in the graph. The only difference is the traversal algorithm used to mark a province as `visited`.

## Core Concept: BFS Traversal for Components
Instead of recursively diving deep into the graph (DFS), we will use a **Queue** to explore the graph level-by-level (BFS). 

**The Strategy:**
1. Keep a `visited` array and a `count` variable.
2. Loop through every city `i` from `0` to `N-1`.
3. If city `i` is NOT `visited`:
    * Increment the `count` (we found a new province).
    * Launch a **BFS** starting from city `i`.
    * Push `i` to the Queue and mark it `visited`.
    * While the Queue is not empty, pop a city `U` and check all its potential neighbors `V`.
    * If `U` is connected to `V` and `V` is NOT `visited`, mark `V` as `visited` and push it to the Queue.
4. Return `count`.

## Java Implementation

Just like the optimized DFS approach, we can run the BFS directly on the given `isConnected` Adjacency Matrix without explicitly building an Adjacency List.

```java
import java.util.*;

class NumberOfProvincesBFS {
    
    // Helper function to perform BFS directly on the adjacency matrix
    private void bfs(int[][] isConnected, int startNode, boolean[] visited) {
        Queue<Integer> queue = new LinkedList<>();
        
        // Push the starting node into the queue and mark as visited
        queue.add(startNode);
        visited[startNode] = true;
        
        while (!queue.isEmpty()) {
            int u = queue.poll();
            
            // Check all potential neighbors (columns in the matrix for row 'u')
            for (int v = 0; v < isConnected.length; v++) {
                // If there is a connection AND the neighbor is not visited
                if (isConnected[u][v] == 1 && !visited[v]) {
                    visited[v] = true; // Mark visited immediately before pushing
                    queue.add(v);
                }
            }
        }
    }

    // Main function to count the number of provinces
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;
        
        // Loop through all cities
        for (int i = 0; i < n; i++) {
            // If the city is not visited, a new province is found
            if (!visited[i]) {
                count++;
                // Start BFS to traverse and mark the entire province
                bfs(isConnected, i, visited);
            }
        }
        
        return count;
    }
}
```

Complexity Analysis
Time Complexity: O(N^2) where N is the number of cities. We iterate through the outer loop, and the BFS explores the adjacency matrix checking every cell [u][v] once.
Space Complexity: O(N) for the visited array and the Queue, which can hold at most N elements in the worst case.


# Graph Concepts & Qns - 12: Course Schedule (Leetcode 207)

**Video Link:** [Course Schedule | Apple | Microsoft | Amazon | BFS | Graph Concepts & Qns - 12 | Leetcode 207](https://youtu.be/lqjlGGMjSMU)  
**Channel:** codestorywithMIK  

## Overview
This video applies our Graph knowledge to solve a highly popular interview question asked by Apple, Microsoft, Amazon, and Meta: **Course Schedule (LeetCode 207)**. 

The problem asks a simple question: Given a list of courses and their prerequisites, is it possible for you to finish all the courses?

## Problem Breakdown
**The Story:** You have `N` courses, labeled `0` to `N-1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you **must take course `b` first if you want to take course `a`**.

**Graph Interpretation:**
*   This represents a **Directed Graph**.
*   A prerequisite `[a, b]` means the flow goes from `b` to `a` (i.e., `b -> a`). You must complete `b` before moving to `a`.
*   *Can we finish all courses?* 
    *   If there is a cycle (e.g., `Course 0` requires `Course 1`, and `Course 1` requires `Course 0`), we are stuck in a deadlock and can **never** finish.
    *   If there is NO cycle, we can arrange the courses in a valid order and finish them.
*   Therefore, the problem simply reduces to: **Detect if a cycle exists in a Directed Graph.**

## Core Concept: Applying Kahn's Algorithm
Since we need to detect a cycle in a Directed Graph, we can directly apply **Topological Sorting using BFS (Kahn's Algorithm)**, exactly as we learned in previous videos.

**The Strategy:**
1.  **Build the Graph & In-Degrees:** Iterate through the `prerequisites` array. For each pair `[a, b]`, add a directed edge `b -> a` in your Adjacency List, and increment the `inDegree` of `a`.
2.  **Initialize BFS Queue:** Find all courses with an `inDegree` of `0` (meaning they have no prerequisites) and push them to the Queue.
3.  **Process and Count:**
    *   Pop a course from the queue.
    *   Increment a `count` variable (tracking how many courses we successfully complete).
    *   For all dependent courses (neighbors), decrement their `inDegree`.
    *   If any neighbor's `inDegree` becomes `0`, push it to the Queue.
4.  **Final Check:** If the total `count` of processed courses equals `N` (total courses), return `true` (no cycle, all courses completed). Otherwise, return `false` (cycle detected).

## Java Implementation

```java
import java.util.*;

class CourseSchedule {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] inDegree = new int[numCourses];
        
        // Initialize Adjacency List
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }
        
        // Step 1: Build the Graph and Calculate In-Degrees
        // pair is [a, b] meaning b -> a
        for (int[] pair : prerequisites) {
            int a = pair[0];
            int b = pair[1];
            adj.get(b).add(a); // Edge from b to a
            inDegree[a]++;     // a depends on b, so increase a's in-degree
        }
        
        // Step 2: Initialize Queue with 0 in-degree nodes
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }
        
        // Step 3: Standard BFS (Kahn's Algorithm)
        int count = 0;
        
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            count++; // We successfully took this course
            
            // Resolve dependencies for neighbors
            for (int neighbor : adj.get(curr)) {
                inDegree[neighbor]--;
                
                // If neighbor has no more prerequisites, we can take it
                if (inDegree[neighbor] == 0) {
                    queue.add(neighbor);
                }
            }
        }
        
        // Step 4: Check if we were able to take all courses
        return count == numCourses;
    }
}
```
Complexity Analysis
Time Complexity: O(V + E). V is the number of courses (numCourses) and E is the number of prerequisite dependencies. Building the graph and running BFS both take linear time relative to vertices and edges.
Space Complexity: O(V + E) to store the Adjacency List adj, plus O(V) for the inDegree array and the Queue.

# Graph Concepts & Qns - 13: Course Schedule II (Leetcode 210)

**Video Link:** [Course Schedule-II | Apple | Microsoft | Amazon | BFS | Graph Concepts & Qns - 13 | Leetcode 210](https://youtu.be/W1WhSN9wAw0)  
**Channel:** codestorywithMIK  
**Practice Link:** [Course Schedule II on LeetCode](https://leetcode.com/problems/course-schedule-ii/)

## Overview
Following up on "Course Schedule I", this video covers **Course Schedule II (LeetCode 210)**. This problem is heavily tested by companies like Apple, Microsoft, Amazon, and Meta. 

In "Course Schedule I", you only had to return `true` or `false` based on whether it was *possible* to finish all courses (i.e., detecting a cycle). 
In "Course Schedule II", you are asked to go one step further: **Return the exact order in which you should take the courses.** If it is impossible, return an empty array.

## Problem Breakdown
Because the problem explicitly asks for an ordering of items based on their dependencies, it is asking you to return the **Topological Sort** of the graph.

**The Strategy:**
We will use **Kahn's Algorithm (Topological Sort using BFS)**. The logic remains 99% identical to the previous video.
1. Build the Adjacency List and compute the `inDegree` for each course.
2. Push all courses with an `inDegree` of `0` into the Queue and into our `result` array.
3. Keep track of a `count` to see how many courses we process.
4. Process the Queue: 
    * Pop a node `U`.
    * For each neighbor `V`, decrement its `inDegree`.
    * If `inDegree` of `V` becomes `0`, push `V` to the Queue, push `V` to the `result` array, and increment `count`.
5. Finally, check if `count == numCourses`. 
    * If yes, return the `result` array (you successfully ordered all courses).
    * If no, it means there was a cycle, so return an empty array `[]`.

## Java Implementation

```java
import java.util.*;

class CourseScheduleII {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] inDegree = new int[numCourses];
        
        // Initialize Adjacency List
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }
        
        // Step 1: Build Graph and calculate in-degrees
        // prerequisites[i] = [a, b] means you must take 'b' before 'a'. Edge: b -> a
        for (int[] pair : prerequisites) {
            int a = pair[0];
            int b = pair[1];
            adj.get(b).add(a);
            inDegree[a]++;
        }
        
        // Step 2: Initialize Queue and result array
        Queue<Integer> queue = new LinkedList<>();
        int[] result = new int[numCourses];
        int count = 0; // Keep track of how many courses we have successfully taken
        
        // Add all courses with 0 prerequisites to the queue
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
                result[count++] = i;
            }
        }
        
        // Step 3: Standard BFS (Kahn's Algorithm)
        while (!queue.isEmpty()) {
            int u = queue.poll();
            
            // Go through all dependent courses
            for (int v : adj.get(u)) {
                inDegree[v]--; // Requirement 'u' is fulfilled for 'v'
                
                // If 'v' has no more prerequisites, we can take it
                if (inDegree[v] == 0) {
                    queue.add(v);
                    result[count++] = v; 
                }
            }
        }
        
        // Step 4: If we processed all courses, return the valid order
        if (count == numCourses) {
            return result;
        } 
        // Else, there was a cycle, return an empty array
        else {
            return new int[0];
        }
    }
}
```

Complexity Analysis
Time Complexity: O(V + E) where V is the total number of courses and E is the total number of prerequisite pairs.
Space Complexity: O(V + E) for the Adjacency List, plus O(V) for the inDegree array, queue, and result array.

# Graph Concepts & Qns - 14: Course Schedule (DFS)

**Video Link:** [Course Schedule | Apple | Microsoft | Amazon | DFS | Graph Concepts & Qns - 14 | Leetcode 207](https://youtu.be/X1TIkW4C254)  
**Channel:** codestorywithMIK  
**Practice Link:** [Course Schedule on LeetCode](https://leetcode.com/problems/course-schedule/)

## Overview
Earlier in the series (Video #12), we solved **Course Schedule (LeetCode 207)** using BFS (Kahn's Algorithm). In this video, we revisit the exact same problem to solve it using **Depth-First Search (DFS)**. 

Just like before, the problem asks whether we can finish all courses given their prerequisites. 
*   **Graph Interpretation:** A dependency `[a, b]` means `b -> a`.
*   **The Goal:** Detect if there is a cycle in this directed graph. If there is a cycle, we cannot finish all courses (`false`). If there is no cycle, we can (`true`).

## Core Concept: Cycle Detection in a Directed Graph using DFS
To detect a cycle in a directed graph using DFS, a standard `visited` array is not enough. We must also track the **current recursion stack** using an `inRecursion` array (or path visited array).
*   `visited[u]`: Tracks if a node has ever been visited across all DFS traversals.
*   `inRecursion[u]`: Tracks if a node is currently part of the active DFS branch we are exploring. 
*   If during our DFS we encounter a neighbor `v` that is *already visited* AND is currently *in our recursion stack*, we have found a cycle!

## Java Implementation

```java
import java.util.*;

class CourseScheduleDFS {
    
    // Helper function to detect cycle using DFS
    private boolean isCyclicDFS(List<List<Integer>> adj, int u, boolean[] visited, boolean[] inRecursion) {
        visited[u] = true;
        inRecursion[u] = true;
        
        // Traverse all neighbors
        for (int v : adj.get(u)) {
            // If the neighbor is not visited, recurse down
            if (!visited[v]) {
                if (isCyclicDFS(adj, v, visited, inRecursion)) {
                    return true;
                }
            } 
            // If the neighbor is visited AND is in the current recursion path -> Cycle!
            else if (inRecursion[v]) {
                return true;
            }
        }
        
        // Backtrack: remove node from current recursion stack before returning
        inRecursion[u] = false;
        return false;
    }

    // Main function
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }
        
        // Step 1: Build the Directed Graph. pair is [a, b] -> edge is b -> a
        for (int[] pair : prerequisites) {
            int a = pair[0];
            int b = pair[1];
            adj.get(b).add(a);
        }
        
        boolean[] visited = new boolean[numCourses];
        boolean[] inRecursion = new boolean[numCourses];
        
        // Step 2: Check for cycles across all components
        for (int i = 0; i < numCourses; i++) {
            if (!visited[i]) {
                if (isCyclicDFS(adj, i, visited, inRecursion)) {
                    return false; // Cycle found -> cannot finish courses
                }
            }
        }
        
        return true; // No cycle found -> can finish all courses
    }
}
```
# Graph Concepts & Qns - 15: Course Schedule II (DFS)

**Video Link:** [Course Schedule-II | Apple | Microsoft | Amazon | DFS | Graph Concepts & Qns - 15 | Leetcode 210](https://youtu.be/yiR95dxinjs)  
**Channel:** codestorywithMIK  
**Practice Link:** [Course Schedule II on LeetCode](https://leetcode.com/problems/course-schedule-ii/)

## Overview
In the previous video, we solved **Course Schedule II (LeetCode 210)** using BFS (Kahn's Algorithm). This video completes the circle by showing how to solve the exact same problem using **Depth-First Search (DFS)**. 

To solve this with DFS, we need to combine two concepts we learned previously:
1.  **Topological Sorting using DFS (Video #7):** Using a Stack to ensure a parent node is added *after* all its children are fully processed.
2.  **Directed Graph Cycle Detection using DFS (Video #14):** Using an `inRecursion` (or current path) array to detect if we encounter a back-edge indicating a cycle.

## Core Concept: Combining Topological Sort & Cycle Detection
The problem requires returning a valid course order (Topological Sort). However, if there is a cycle, no valid order exists, and we must return an empty array.

Therefore, our DFS must do two things simultaneously:
*   Push nodes to a `Stack` when their DFS branches finish (for Topo Sort).
*   Check `inRecursion` for neighbors to catch cycles. If a cycle is detected, we trigger a global flag `hasCycle`.

**The Strategy:**
1. Build the Adjacency List.
2. Maintain `visited`, `inRecursion`, and a global (or passed-by-reference) `hasCycle` flag.
3. For each unvisited node, run `DFS`.
4. Inside `DFS(u)`:
    * Mark `u` as `visited` and `inRecursion[u] = true`.
    * For each neighbor `v`:
        * If `v` is NOT `visited`, call `DFS(v)`.
        * If `v` IS `visited` AND `inRecursion[v] == true`, mark `hasCycle = true` and return.
    * Backtrack: `inRecursion[u] = false`.
    * **Topo Sort Step:** Push `u` to the `Stack`.
5. After checking all components, check `hasCycle`.
    * If `true`, return `[]`.
    * If `false`, pop all elements from the `Stack` into a result array and return it.

## Java Implementation

```java
import java.util.*;

class CourseScheduleIIDFS {
    
    private boolean hasCycle; // Global flag to track cycles
    
    private void dfs(List<List<Integer>> adj, int u, boolean[] visited, boolean[] inRecursion, Stack<Integer> stack) {
        visited[u] = true;
        inRecursion[u] = true; // Add to current path
        
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                dfs(adj, v, visited, inRecursion, stack);
            } 
            // Cycle detected!
            else if (inRecursion[v]) {
                hasCycle = true;
                return;
            }
        }
        
        // Backtrack
        inRecursion[u] = false; 
        
        // Push to stack after all neighbors are processed
        stack.push(u); 
    }

    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }
        
        // Build graph: prerequisites[i] = [a, b] means b -> a
        for (int[] pair : prerequisites) {
            int a = pair[0];
            int b = pair[1];
            adj.get(b).add(a);
        }
        
        boolean[] visited = new boolean[numCourses];
        boolean[] inRecursion = new boolean[numCourses];
        Stack<Integer> stack = new Stack<>();
        hasCycle = false;
        
        // Run DFS on all unvisited nodes
        for (int i = 0; i < numCourses; i++) {
            if (!visited[i] && !hasCycle) {
                dfs(adj, i, visited, inRecursion, stack);
            }
        }
        
        // If a cycle was detected, return an empty array
        if (hasCycle) {
            return new int[0];
        }
        
        // Otherwise, pop elements from stack to get the topological order
        int[] result = new int[numCourses];
        int index = 0;
        while (!stack.isEmpty()) {
            result[index++] = stack.pop();
        }
        
        return result;
    }
}

```
# Graph Concepts & Qns - 16: Is Graph Bipartite? (DFS)

**Video Link:** [Is Graph Bipartite ? | DFS | Graph Concepts & Qns - 16](https://youtu.be/NeU-C1PTWB8)  
**Channel:** codestorywithMIK  
**Practice Link:** [Is Graph Bipartite? on LeetCode](https://leetcode.com/problems/is-graph-bipartite/)

## Overview
This video introduces the concept of a **Bipartite Graph** and teaches how to determine whether a given graph is bipartite using **Depth-First Search (DFS)**. *(A subsequent video will cover the BFS approach).*

## What is a Bipartite Graph?
A graph is bipartite if it is possible to divide its vertices into **two independent sets (groups)** such that every edge connects a vertex in set 1 to a vertex in set 2. 
*   **Alternative Definition (Coloring Rule):** A graph is bipartite if you can color its nodes using **at most 2 different colors** such that no two adjacent connected nodes share the exact same color.

### Important Properties:
1.  **Even Cycles vs. Odd Cycles:** 
    *   If a graph contains a cycle of **odd length** (e.g., triangle of 3 nodes), it can **never** be bipartite. 
    *   If a graph contains a cycle of **even length**, or no cycles at all (like trees or linear graphs), it is always bipartite.
2.  **Disconnected Graphs:** Just like previous graph problems, a bipartite check must handle disconnected components by looping through all unvisited nodes.

## Core Concept: Two-Coloring using DFS
To check if a graph is bipartite, we attempt to color every node using two colors (e.g., `0` for Green and `1` for Red).

**The Strategy:**
1. Maintain a `color` array of size `V` initialized to `-1` (meaning unvisited/uncolored).
2. Loop through all nodes `0` to `V-1`. If a node is uncolored (`color[i] == -1`):
    * Start a DFS from that node, assigning it an initial color (e.g., `1`).
3. During DFS traversal from node `U`:
    * Iterate through all neighbors `V` of `U`.
    * If neighbor `V` is uncolored (`color[v] == -1`), assign it the *opposite* color of `U` (`1 - color[u]`) and recursively call DFS on `V`.
    * If neighbor `V` is already colored AND its color is **equal** to `U`'s color (`color[v] == color[u]`), we have found a color conflict! The graph is **not bipartite** (return `false`).
4. If all nodes are successfully colored without conflicts, return `true`.

## Java Implementation

```java
import java.util.*;

class IsBipartiteDFS {
    
    // Helper function for DFS-based coloring
    private boolean checkBipartiteDFS(List<List<Integer>> adj, int curr, int currColor, int[] color) {
        // Assign color to the current node
        color[curr] = currColor;
        
        // Traverse all neighbors
        for (int neighbor : adj.get(curr)) {
            // If neighbor has the same color as current node -> Conflict! Not bipartite.
            if (color[neighbor] == color[curr]) {
                return false;
            }
            
            // If neighbor is uncolored (-1), assign the opposite color and recurse
            if (color[neighbor] == -1) {
                int oppositeColor = 1 - currColor; // Flips between 0 and 1
                if (!checkBipartiteDFS(adj, neighbor, oppositeColor, color)) {
                    return false;
                }
            }
        }
        
        return true;
    }

    // Main function
    public boolean isBipartite(int[][] graph) {
        int V = graph.length;
        int[] color = new int[V];
        Arrays.fill(color, -1); // -1 means uncolored
        
        // Convert array of arrays to Adjacency List for cleaner handling
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            List<Integer> neighbors = new ArrayList<>();
            for (int n : graph[i]) {
                neighbors.add(n);
            }
            adj.add(neighbors);
        }
        
        // Loop through all nodes to handle disconnected components
        for (int i = 0; i < V; i++) {
            if (color[i] == -1) {
                // Start with color 1 (Red)
                if (!checkBipartiteDFS(adj, i, 1, color)) {
                    return false;
                }
            }
        }
        
        return true;
    }
}
```
# Graph Concepts & Qns - 17: Is Graph Bipartite? (BFS)

**Video Link:** [Is Graph Bipartite ? | BFS | Graph Concepts & Qns - 17](https://youtu.be/cvhXZt66VhA)  
**Channel:** codestorywithMIK  
**Practice Link:** [Is Graph Bipartite? on LeetCode](https://leetcode.com/problems/is-graph-bipartite/)

## Overview
Following up on the previous video (Video #16) where we checked if a graph is bipartite using Depth-First Search (DFS), this video demonstrates how to solve the exact same problem (LeetCode 785) using **Breadth-First Search (BFS)**.

## Core Concept: Two-Coloring using BFS
The underlying logic is identical to the DFS approach—we want to color the graph using two colors (e.g., `0` and `1`) such that no two adjacent nodes have the same color. Instead of recursion, we use a **Queue** to explore nodes level by level.

**The Strategy:**
1. Initialize a `color` array of size `V` with `-1` (uncolored).
2. Loop through all nodes `0` to `V-1` to handle disconnected components.
3. If a node is uncolored (`color[i] == -1`):
    * Start a BFS from that node. Push it to the Queue and color it (e.g., `1`).
4. While the Queue is not empty:
    * Pop the current node `u`.
    * For each neighbor `v` of `u`:
        * If `color[v] == color[u]`, we found a conflict! Return `false` (not bipartite).
        * If `color[v] == -1` (uncolored), assign it the opposite color (`1 - color[u]`) and push `v` to the Queue.
5. If the queue empties without any conflicts, return `true`.

## Java Implementation

```java
import java.util.*;

class IsBipartiteBFS {
    
    // Helper function for BFS-based coloring
    private boolean checkBipartiteBFS(int[][] graph, int startNode, int[] color) {
        Queue<Integer> queue = new LinkedList<>();
        
        queue.add(startNode);
        color[startNode] = 1; // Start with color 1 (Red)
        
        while (!queue.isEmpty()) {
            int u = queue.poll();
            
            // Traverse all neighbors
            for (int v : graph[u]) {
                // If neighbor has the same color -> Conflict! Not bipartite.
                if (color[v] == color[u]) {
                    return false;
                }
                
                // If neighbor is uncolored (-1), assign opposite color and push to queue
                if (color[v] == -1) {
                    color[v] = 1 - color[u]; // Flips between 0 and 1
                    queue.add(v);
                }
            }
        }
        
        return true;
    }

    // Main function
    public boolean isBipartite(int[][] graph) {
        int V = graph.length;
        int[] color = new int[V];
        Arrays.fill(color, -1); // -1 means uncolored
        
        // Loop through all nodes to handle disconnected components
        for (int i = 0; i < V; i++) {
            if (color[i] == -1) {
                if (!checkBipartiteBFS(graph, i, color)) {
                    return false;
                }
            }
        }
        
        return true;
    }
}
```
# Graph Concepts & Qns - 18: Disjoint Set Union (DSU)

**Video Link:** [Disjoint Set Union | DSU | Graph Concepts & Qns - 18 | Explanation+Coding](https://youtu.be/AsAdKHkITBQ)  
**Channel:** codestorywithMIK  

## Overview
This video introduces a powerful and advanced graph data structure: **Disjoint Set Union (DSU)**, also commonly referred to as **Union-Find**. DSU is heavily tested in top companies like Netflix, Google, Amazon, and Meta. 

Despite sounding intimidating, the implementation of DSU is surprisingly straightforward. 

## What is a Disjoint Set?
*   **Disjoint Sets:** A collection of sets where no element is shared between any two sets (their intersection is empty).
*   **DSU Operations:** A DSU data structure primarily supports two operations:
    1.  **`Find(x)`**: Determines which set a particular element `x` belongs to. It usually returns the "representative" or "leader" (parent) of that set.
    2.  **`Union(x, y)`**: Joins/combines two separate sets containing elements `x` and `y` into a single unified set.

## Core Concept: Union & Find Mechanics
Imagine elements as people in different social groups. 
*   Every group has a designated **Leader** (or **Parent**). 
*   Initially, every element is in its own individual set, meaning every element is its own leader (`parent[i] = i`).
*   **The `Find` Operation:** To find who leads a person `x`, we trace their parent links upwards until we reach an element whose parent is itself (the ultimate leader).
*   **The `Union` Operation:** To merge the group containing `x` with the group containing `y`:
    1. Find the leader of `x` (let's call it `rootX`).
    2. Find the leader of `y` (let's call it `rootY`).
    3. If they have different leaders, merge them by making one leader point to the other (e.g., `parent[rootX] = rootY`).

## Naive Java Implementation (Without Optimization)

```java
import java.util.*;

class DisjointSetNaive {
    int[] parent;

    // Constructor to initialize n elements, each as its own parent
    public DisjointSetNaive(int n) {
        parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i; // Every node is its own leader initially
        }
    }

    // Find operation (Naive approach)
    public int find(int i) {
        // If the element is its own parent, it is the leader
        if (parent[i] == i) {
            return i;
        }
        // Otherwise, recursively find the leader of the parent
        return find(parent[i]);
    }

    // Union operation (Naive approach)
    public void union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        
        // If they belong to different sets, merge them
        if (rootI != rootJ) {
            parent[rootI] = rootJ; // Make rootJ the parent of rootI
        }
    }
}
```

# Graph Concepts & Qns - 19: Disjoint Set Union by Rank and Path Compression

**Video Link:** https://youtu.be/iH3XVIVzl7M  
**Channel:** codestorywithMIK

---

# Overview

In the previous video, we looked at the basic implementation of the Disjoint Set Union (DSU) data structure using a naive approach. While functional, that implementation could produce tall and skewed trees, causing the `find()` operation to take **O(N)** time in the worst case.

To optimize DSU, two important techniques are introduced:

- **Path Compression**
- **Union by Rank**

When both optimizations are combined, the time complexity of DSU operations becomes almost constant.

---

# 1. Path Compression

Whenever we call `find(x)`, we move upward in the tree until we reach the ultimate parent (leader) of the set.

Instead of simply returning the leader, we update the parent of every node encountered during recursion so that it directly points to the root.

This process is called **Path Compression**.

### Benefits

- Flattens the tree.
- Future `find()` operations become much faster.
- Greatly reduces the height of the tree over time.

### Java Implementation

```java
public int find(int i, int[] parent) {
    if (parent[i] == i) {
        return i;
    }

    // Path Compression
    return parent[i] = find(parent[i], parent);
}
```

---

# 2. Union by Rank

While Path Compression optimizes searching, **Union by Rank** optimizes merging.

Each tree maintains a **rank**, which approximately represents its depth.

When performing a union:

1. Find the leaders of both sets.
2. Attach the tree having smaller rank below the tree having larger rank.
3. If both trees have equal rank:
   - Attach either tree under the other.
   - Increase the rank of the new root by 1.

### Benefits

- Prevents trees from becoming tall.
- Keeps tree height as small as possible.
- Makes future operations efficient.

### Java Implementation

```java
public void unionByRank(int i, int j, int[] parent, int[] rank) {

    int rootI = find(i, parent);
    int rootJ = find(j, parent);

    if (rootI == rootJ)
        return;

    if (rank[rootI] < rank[rootJ]) {
        parent[rootI] = rootJ;
    } else if (rank[rootI] > rank[rootJ]) {
        parent[rootJ] = rootI;
    } else {
        parent[rootI] = rootJ;
        rank[rootJ]++;
    }
}
```

---

# Complete DSU Class (Path Compression + Union by Rank)

```java
class DisjointSet {

    int[] parent;
    int[] rank;

    public DisjointSet(int n) {

        parent = new int[n];
        rank = new int[n];

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }

    public int find(int i) {

        if (parent[i] == i) {
            return i;
        }

        return parent[i] = find(parent[i]);
    }

    public void unionByRank(int i, int j) {

        int rootI = find(i);
        int rootJ = find(j);

        if (rootI == rootJ)
            return;

        if (rank[rootI] < rank[rootJ]) {
            parent[rootI] = rootJ;
        } else if (rank[rootI] > rank[rootJ]) {
            parent[rootJ] = rootI;
        } else {
            parent[rootI] = rootJ;
            rank[rootJ]++;
        }
    }
}
```

---

# Complexity Analysis

### Time Complexity

- **Find:** `O(α(N))`
- **Union:** `O(α(N))`

where **α(N)** is the **Inverse Ackermann Function**.

Since `α(N) ≤ 4` for every practical value of `N`, both operations are considered **almost O(1)** (constant time).

### Space Complexity

- **O(N)**

Used for storing:

- `parent[]`
- `rank[]`

---

# Key Takeaways

- **Path Compression** flattens the tree during every `find()` operation.
- **Union by Rank** always attaches the shorter tree under the taller tree.
- Together, these optimizations make DSU one of the fastest data structures for handling connectivity problems.
- DSU with Path Compression and Union by Rank is widely used in graph algorithms like **Kruskal's Algorithm**, **Connected Components**, and **Dynamic Connectivity**.

# Graph Concepts & Qns - 20: Detect Cycle using DSU (Disjoint Set Union)

**Video Link:** [Detect Cycle using DSU - (Google, Microsoft) | Graph Concepts & Qns - 20](https://youtu.be/0X0lEtTkk-8)  
**Channel:** codestorywithMIK  
**Practice Link:** [Detect Cycle using DSU on GeeksforGeeks](https://www.geeksforgeeks.org/problems/detect-cycle-using-dsu/1)

## Overview
Now that we have learned how to implement **Disjoint Set Union (DSU)** with Path Compression and Union by Rank (Videos #18 and #19), we can apply it to solve graph problems. This video demonstrates how to detect a cycle in an **Undirected Graph** using DSU. This is a classic interview question asked by companies like Google and Microsoft.

## Core Concept: Cycle Detection using DSU
The intuition behind using DSU to detect a cycle is based on the idea of sets:
1.  Initially, every vertex in the graph belongs to its own separate, individual set (its own leader/parent).
2.  We iterate through all the edges `(u, v)` of the graph.
3.  For each edge `(u, v)`:
    *   Find the ultimate leader of `u` (`rootU = find(u)`).
    *   Find the ultimate leader of `v` (`rootV = find(v)`).
    *   **The Check:** If `rootU == rootV`, it means both vertices already belong to the exact same set. If they are already connected in the same component and you find *another* edge between them, adding this edge forms a **Cycle!** (Return `true`).
    *   If `rootU != rootV`, they belong to different sets. We perform a `union(u, v)` to merge their sets.
4.  If we successfully process all edges without finding any matching roots, there is no cycle (Return `false`).

*Note on Undirected Edges:* To avoid processing the same edge twice (e.g., `u -> v` and `v -> u`), we can add a simple condition like `if (u < v)` or process each undirected edge once.

## Java Implementation

```java
import java.util.*;

class DetectCycleDSU {
    
    // DSU Data Structure Class with Path Compression and Union by Rank
    static class DisjointSet {
        int[] parent;
        int[] rank;

        public DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        public int find(int i) {
            if (parent[i] == i) {
                return i;
            }
            return parent[i] = find(parent[i]); // Path compression
        }

        public void unionByRank(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            
            if (rootI == rootJ) return;
            
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootI] = rootJ;
                rank[rootJ]++;
            }
        }
    }

    // Function to detect cycle in an undirected graph using DSU
    public boolean detectCycle(int V, ArrayList<ArrayList<Integer>> adj) {
        DisjointSet ds = new DisjointSet(V);
        
        // Iterate through all vertices and their adjacency lists
        for (int u = 0; u < V; u++) {
            for (int v : adj.get(u)) {
                // To process each undirected edge only once, we can restrict to u < v
                if (u < v) {
                    int rootU = ds.find(u);
                    int rootV = ds.find(v);
                    
                    // If both nodes share the same root, a cycle is detected!
                    if (rootU == rootV) {
                        return true;
                    }
                    
                    // Otherwise, union the two sets
                    ds.unionByRank(u, v);
                }
            }
        }
        
        return false; // No cycle found
    }
}
```
# Graph Concepts & Qns - 21: Satisfiability of Equality Equations (Google)

**Video Link:** [Satisfiability of Equality Equations - (GOOGLE) | Graph Concepts & Qns - 21 | Explanation+Coding](https://youtu.be/0Z8lt7U_kiE)  
**Channel:** codestorywithMIK  
**Practice Link:** [Satisfiability of Equality Equations on LeetCode](https://leetcode.com/problems/satisfiability-of-equality-equations/)

## Overview
This video solves a classic Google interview question: **Satisfiability of Equality Equations (LeetCode 990)** using **Disjoint Set Union (DSU)**.

## Problem Breakdown
**The Story:** You are given an array of strings representing equations, where each equation is of the form `"a==b"` or `"a!=b"`. Each string has a length of 4, where index 0 is a variable, indices 1 and 2 are `"=="` or `"!="`, and index 3 is another variable.
You need to return `true` if it is possible to satisfy all given equations simultaneously, or `false` otherwise.

*   **Example:** `["a==b", "b!=a"]` -> Returns `false` because `a` cannot equal `b` and simultaneously not equal `a`.

## Core Concept: Using DSU for Equivalence Relations
Variables that are equal (`==`) belong to the same group/set. Variables that are not equal (`!=`) must belong to different groups.
This forms a classic **Equivalence Relation** problem, which can be efficiently solved using DSU:

**The Strategy:**
1.  **Phase 1 (Process Equality Equations):** 
    *   Iterate through all equations. First, process **only** the `==` equations.
    *   For every equation `"a==b"`, perform a `union(a, b)` to merge variables `a` and `b` into the same set.
2.  **Phase 2 (Check Inequality Equations):**
    *   Iterate through the equations a second time, processing **only** the `!=` equations.
    *   For every equation `"a!=b"`, find their ultimate parents using `find(a)` and `find(b)`.
    *   **The Check:** If `find(a) == find(b)`, it means `a` and `b` belong to the same set (they are equal according to DSU), but the equation explicitly states they are *not* equal (`!=`). This is a contradiction! Return `false`.
3.  If all inequality checks pass without any contradictions, return `true`.

*Note on Characters:* Since variables are lowercase English letters (`'a'` to `'z'`), we can map them to indices `0` to `25` by subtracting `'a'` (e.g., `s.charAt(0) - 'a'`).

## Java Implementation

```java
import java.util.*;

class SatisfiabilityOfEqualityEquations {
    
    // DSU Class with Path Compression and Union by Rank
    static class DisjointSet {
        int[] parent;
        int[] rank;

        public DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        public int find(int i) {
            if (parent[i] == i) {
                return i;
            }
            return parent[i] = find(parent[i]); // Path compression
        }

        public void unionByRank(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            
            if (rootI == rootJ) return;
            
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootI] = rootJ;
                rank[rootJ]++;
            }
        }
    }

    public boolean equationsPossible(String[] equations) {
        DisjointSet ds = new DisjointSet(26); // 26 lowercase English letters
        
        // Phase 1: Process all '==' equations and union them
        for (String eq : equations) {
            if (eq.charAt(1) == '=') {
                int u = eq.charAt(0) - 'a';
                int v = eq.charAt(3) - 'a';
                ds.unionByRank(u, v);
            }
        }
        
        // Phase 2: Process all '!=' equations and check for contradictions
        for (String eq : equations) {
            if (eq.charAt(1) == '!') {
                int u = eq.charAt(0) - 'a';
                int v = eq.charAt(3) - 'a';
                
                int rootU = ds.find(u);
                int rootV = ds.find(v);
                
                // If they have the same root but equation says they are not equal -> Contradiction!
                if (rootU == rootV) {
                    return false;
                }
            }
        }
        
        return true; // No contradictions found
    }
}
```

# Graph Concepts & Qns - 22: Number of Operations to Make Network Connected (Amazon)

**Video Link:** [Number of Operations to Make Network Connected - (AMAZON) | Graph Concepts & Qns - 22](https://youtu.be/q2xBd-D_1KQ)  
**Channel:** codestorywithMIK  
**Practice Link:** [Number of Operations to Make Network Connected on LeetCode](https://leetcode.com/problems/number-of-operations-to-make-network-connected/)

## Overview
This video covers another fantastic application of Disjoint Set Union (DSU): **Number of Operations to Make Network Connected (LeetCode 1319)**, a popular interview problem asked by Amazon.

## Problem Breakdown
**The Story:** There are `n` computers numbered from `0` to `n-1` connected by ethernet cables `connections` forming a network, where `connections[i] = [a, b]` represents a connection between computer `a` and computer `b`. You can extract certain cables and place them anywhere between any pair of computers. Return the *minimum number of times* you need to do this so that all computers are connected. If it's impossible, return `-1`.

## Core Logic & DSU Intuition

### 1. Is it even possible?
To connect `n` computers into a single connected component, you need **at least `n - 1` edges (cables)**. 
*   If the total number of connections given (`connections.length`) is less than `n - 1`, it is physically impossible to connect all computers. Immediately return `-1`.

### 2. Finding Extra Edges & Components
*   Every time we process an edge `(u, v)` using DSU:
    *   Find their roots: `rootU = find(u)`, `rootV = find(v)`.
    *   If `rootU == rootV`, it means `u` and `v` are already in the same connected component. This cable is redundant—it's an **extra/redundant edge**. We can extract this cable and use it later.
    *   If `rootU != rootV`, we perform a `union(u, v)` to merge the components. Each successful union decreases our total number of independent components by 1.
*   Initially, there are `n` separate components (every node is its own component).

### 3. The Final Formula
After processing all edges:
*   Let `extraEdges` be the count of redundant edges found.
*   Let `components` be the final number of disconnected components remaining.
*   To connect `C` separate components together, you need **`C - 1` additional edges**.
*   If your `extraEdges >= components - 1`, you can successfully connect everything! The minimum operations required will simply be **`components - 1`**.

---

## Java Implementation

```java
import java.util.*;

class MakeNetworkConnected {
    
    // DSU Class with Path Compression and Union by Rank
    static class DisjointSet {
        int[] parent;
        int[] rank;

        public DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        public int find(int i) {
            if (parent[i] == i) {
                return i;
            }
            return parent[i] = find(parent[i]); // Path compression
        }

        public void unionByRank(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            
            if (rootI == rootJ) return;
            
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootI] = rootJ;
                rank[rootJ]++;
            }
        }
    }

    public int makeConnected(int n, int[][] connections) {
        // Rule 1: To connect n nodes, we need at least n - 1 cables
        if (connections.length < n - 1) {
            return -1;
        }
        
        DisjointSet ds = new DisjointSet(n);
        int components = n; // Initially, all n computers are separate components
        
        // Process all connections
        for (int[] conn : connections) {
            int u = conn[0];
            int v = conn[1];
            
            int rootU = ds.find(u);
            int rootV = ds.find(v);
            
            // If they are not in the same set, union them and reduce component count
            if (rootU != rootV) {
                ds.unionByRank(u, v);
                components--;
            }
            // If rootU == rootV, this is an extra/redundant edge (handled implicitly)
        }
        
        // Minimum operations to connect 'components' components is components - 1
        return components - 1;
    }
}
```
# Graph Concepts & Qns - 23: Count Unreachable Pairs of Nodes in an Undirected Graph (DSU)

**Video Link:** [Count Unreachable Pairs of Nodes in an Undirected Graph | DSU | Leetcode 2316 | Graph Concepts- 23](https://youtu.be/Hh_9ppxgzpo)  
**Channel:** codestorywithMIK  
**Practice Link:** [Count Unreachable Pairs of Nodes in an Undirected Graph on LeetCode](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/)

## Overview
This video explains how to solve the problem **Count Unreachable Pairs of Nodes in an Undirected Graph (LeetCode 2316)**. While this problem can be solved using BFS or DFS (to find component sizes), this video specifically demonstrates how to solve it using **Disjoint Set Union (DSU)**.

## Problem Breakdown
**The Story:** You are given an integer `n` representing `n` nodes numbered from `0` to `n - 1`. You are also given a 2D integer array `edges`, representing undirected edges between nodes.
Your task is to return the **number of pairs of different nodes that are unreachable from each other**.

*   If two nodes belong to different disconnected components, they can never reach each other. We need to find the total number of such pairs.

## Core Logic & Intuition

### 1. The Math Behind the Pairs
Suppose we have a graph that forms 3 distinct components with the following sizes:
*   Component 1: `4` nodes
*   Component 2: `2` nodes
*   Component 3: `1` node
*(Total nodes `n = 7`)*

How many unreachable pairs can we form?
*   Nodes in Component 1 (`4` nodes) cannot reach the other `7 - 4 = 3` nodes. So, pairs formed = `4 * 3 = 12`.
*   Nodes in Component 2 (`2` nodes) cannot reach the remaining `7 - 4 - 2 = 1` node. So, pairs formed = `2 * 1 = 2`.
    *   *(Note: We don't pair Component 2 back with Component 1 because we already counted those pairs in the first step).*
*   Nodes in Component 3 (`1` node) cannot reach the remaining `1 - 1 = 0` nodes. Pairs formed = `1 * 0 = 0`.
*   **Total Unreachable Pairs:** `12 + 2 + 0 = 14`.

**The General Formula:**
For each component of size `S`, the number of new pairs it forms is:
`S * (Remaining Nodes - S)`
After processing the component, update `Remaining Nodes = Remaining Nodes - S`.

### 2. Using DSU to Find Component Sizes
To apply the math formula, we just need the size of every connected component. DSU is perfect for grouping connected nodes:
1.  **Process Edges:** Loop through all `edges` and perform `union(u, v)`. This groups all connected nodes into sets under a single "parent" or "leader".
2.  **Calculate Sizes:** Loop through all `n` nodes, find their ultimate leader (`find(i)`), and use a Map/Frequency Array to count how many nodes belong to each leader.
3.  **Apply Formula:** Iterate through the sizes stored in the Map, applying the `Size * (Remaining - Size)` formula to calculate the final result.

---

## Java Implementation

```java
import java.util.*;

class UnreachablePairs {
    
    // DSU Class with Path Compression and Union by Rank
    static class DisjointSet {
        int[] parent;
        int[] rank;

        public DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        public int find(int i) {
            if (parent[i] == i) {
                return i;
            }
            return parent[i] = find(parent[i]); // Path compression
        }

        public void unionByRank(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            
            if (rootI == rootJ) return;
            
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootI] = rootJ;
                rank[rootJ]++;
            }
        }
    }

    public long countPairs(int n, int[][] edges) {
        DisjointSet ds = new DisjointSet(n);
        
        // Step 1: Process edges to form connected components
        for (int[] edge : edges) {
            ds.unionByRank(edge[0], edge[1]);
        }
        
        // Step 2: Calculate the size of each component
        // We can use a HashMap where Key = Parent/Leader, Value = Size of Component
        Map<Integer, Integer> componentSizes = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int root = ds.find(i);
            componentSizes.put(root, componentSizes.getOrDefault(root, 0) + 1);
        }
        
        // Step 3: Apply the math formula to count unreachable pairs
        long totalPairs = 0;
        long remainingNodes = n;
        
        for (int size : componentSizes.values()) {
            totalPairs += (long) size * (remainingNodes - size);
            remainingNodes -= size; // Remove this component's nodes from the remaining pool
        }
        
        return totalPairs;
    }
}
```
# Graph Concepts & Qns - 24: Dijkstra's Algorithm | PART-1

**Video Link:** [Dijkstra's Algorithm | PART-1 | Graph Concepts & Qns - 24 | Explanation+Coding](https://youtu.be/xQ3vjWwFRuI)  
**Channel:** codestorywithMIK  

## Overview
This video introduces **Dijkstra's Algorithm**, a fundamental graph algorithm used to find the shortest path from a starting node (source) to all other nodes in a weighted graph. This specific video covers the implementation using a **Min-Heap (Priority Queue)**. It is frequently asked in interviews by companies like Flipkart and Amazon.

## Core Concept: Dijkstra's Algorithm using Min-Heap
Dijkstra's algorithm is essentially a greedy algorithm that explores the closest nodes first. 

**The Strategy:**
1.  **Result Array:** We maintain a `result` (or `distance`) array of size `V` initialized to infinity (`Integer.MAX_VALUE`), which will store the shortest distance from the source to each node. The distance from the source to itself is `0` (`result[source] = 0`).
2.  **Min-Heap:** We use a Priority Queue (Min-Heap) that stores pairs of `(distance, node)`. The heap is ordered by distance, ensuring we always process the node that is currently closest to the source.
3.  **Traversal:**
    *   Push the starting node into the Priority Queue: `PQ.add((0, source))`.
    *   While the Priority Queue is not empty:
        *   Extract the pair with the minimum distance `(currDist, u)`.
        *   Iterate through all neighbors `v` of node `u`. Let the weight of the edge between `u` and `v` be `weight`.
        *   **Relaxation Step:** If the current known shortest distance to `v` (`result[v]`) is greater than the distance to reach `u` plus the edge weight (`currDist + weight`), we have found a shorter path!
        *   Update `result[v] = currDist + weight`.
        *   Push the new shorter path into the Priority Queue: `PQ.add((result[v], v))`.
4.  Once the Queue is empty, the `result` array contains the shortest distances from the source to all other reachable nodes.

## Java Implementation

```java
import java.util.*;

class DijkstraAlgorithm {
    
    // Helper class to represent a Pair (distance, node)
    static class Pair {
        int distance;
        int node;
        
        public Pair(int distance, int node) {
            this.distance = distance;
            this.node = node;
        }
    }

    // Function to implement Dijkstra's Algorithm
    public int[] dijkstra(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int source) {
        
        // Priority Queue (Min-Heap) sorted by distance
        PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> a.distance - b.distance);
        
        // Array to store shortest distances, initialized to infinity
        int[] result = new int[V];
        Arrays.fill(result, Integer.MAX_VALUE);
        
        // Distance to source is 0
        result[source] = 0;
        pq.add(new Pair(0, source));
        
        while (!pq.isEmpty()) {
            Pair curr = pq.poll();
            int currDist = curr.distance;
            int u = curr.node;
            
            // Traverse all adjacent nodes of u
            for (ArrayList<Integer> edge : adj.get(u)) {
                int v = edge.get(0); // neighbor node
                int weight = edge.get(1); // edge weight
                
                // Relaxation Step: If we found a shorter path to v
                if (currDist + weight < result[v]) {
                    result[v] = currDist + weight;
                    pq.add(new Pair(result[v], v));
                }
            }
        }
        
        return result;
    }
}
```
# Graph Concepts & Qns - 25: Dijkstra's Algorithm | PART-2 (Using Set)

**Video Link:** [Dijkstra's Algorithm | PART-2 | (Microsoft) | Graph Concepts & Qns - 25 | Explanation+Coding](https://youtu.be/3qIoYIMidpc)  
**Channel:** codestorywithMIK  
**Practice Link:** [Implementing Dijkstra Algorithm on GeeksforGeeks](https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1) (Or similar problem portal as mentioned in the video)

## Overview
In the previous video, we learned how to implement Dijkstra's Algorithm using a Priority Queue (Min-Heap). In this video, we explore an alternative way to implement Dijkstra's Algorithm: **using a Set** (specifically, `std::set` in C++ or `TreeSet` in Java).

Both data structures keep elements sorted, giving us the node with the minimum distance at the top. The core difference and advantage of using a Set lies in its ability to **find and erase existing elements**.

## Core Concept: Why use a Set instead of a Priority Queue?
When using a Priority Queue, if you find a new shorter path to a node that is already in the queue, you cannot easily update or remove the old, longer path. You simply add the new shorter path to the queue. This means the Priority Queue might store multiple paths for the same node, and you will process the stale (longer) paths later, which is essentially wasted effort.

**The Advantage of a Set:**
A Set (like `TreeSet` in Java or `std::set` in C++) maintains elements in ascending order just like a Min-Heap. However, it also allows you to **remove elements**. 
*   **The Optimization:** If you discover a shorter path to a neighbor `v`, and `v` has already been assigned a distance (i.e., it's not infinity), you can **erase the old `(old_distance, v)` entry** from the Set before inserting the new `(new_distance, v)` entry. 
*   This prevents the Set from growing unnecessarily large and saves future iterations from processing obsolete, longer paths.

## Java Implementation

*Note: In Java, we use a `TreeSet` to mimic the behavior of C++'s `std::set`. Since a `TreeSet` cannot contain duplicate identical objects, and we are storing pairs, we must provide a custom comparator. If distances are equal, we compare by node ID to ensure distinct entries aren't treated as duplicates.*

```java
import java.util.*;

class DijkstraAlgorithmSet {
    
    // Helper class to represent a Pair (distance, node)
    static class Pair {
        int distance;
        int node;
        
        public Pair(int distance, int node) {
            this.distance = distance;
            this.node = node;
        }
    }

    public int[] dijkstra(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int source) {
        
        // TreeSet sorted by distance. If distances are equal, sort by node ID to keep them distinct.
        TreeSet<Pair> set = new TreeSet<>((a, b) -> {
            if (a.distance == b.distance) {
                return a.node - b.node;
            }
            return a.distance - b.distance;
        });
        
        int[] result = new int[V];
        Arrays.fill(result, Integer.MAX_VALUE);
        
        result[source] = 0;
        set.add(new Pair(0, source));
        
        while (!set.isEmpty()) {
            // Extract the minimum element (first element in TreeSet)
            Pair curr = set.pollFirst();
            int currDist = curr.distance;
            int u = curr.node;
            
            // Traverse all adjacent nodes of u
            for (ArrayList<Integer> edge : adj.get(u)) {
                int v = edge.get(0);
                int weight = edge.get(1);
                
                // Relaxation Step
                if (currDist + weight < result[v]) {
                    
                    // If v was already reached before via a longer path, remove that old path from the set
                    if (result[v] != Integer.MAX_VALUE) {
                        set.remove(new Pair(result[v], v));
                    }
                    
                    // Update to the new shorter path and add to the set
                    result[v] = currDist + weight;
                    set.add(new Pair(result[v], v));
                }
            }
        }
        
        return result;
    }
}
```
# Graph Concepts & Qns - 26: Dijkstra's Algorithm | PART-3 | Why not Queue?

**Video Link:** [Dijkstra's Algorithm | PART-3 | Why not Queue ? | Microsoft | Graph Concepts & Qns - 26 |Explanation](https://youtu.be/l4cxEQnuH-U)  
**Channel:** codestorywithMIK  

## Overview
This is the third and final part of the core explanation of Dijkstra's Algorithm in this series. After covering Priority Queue (Min-Heap) and Set implementations, this video addresses a very common interview question (specifically asked by Microsoft): **Why do we use a Priority Queue (or Set) in Dijkstra's Algorithm instead of a simple Queue?** 

The video also breaks down the **Time Complexity** of Dijkstra's Algorithm.

## Core Concept: Why not a Simple Queue?
If we use a standard FIFO (First-In, First-Out) Queue instead of a Priority Queue, the algorithm will still eventually find the shortest paths, but it will be highly inefficient.

**The Problem with a Simple Queue:**
*   **Lack of Prioritization:** A simple Queue processes nodes in the exact order they were discovered, ignoring their current path distances.
*   **Redundant Updates:** Suppose you reach a node `X` with a path distance of `10` and push it to the Queue. Later, you find a much shorter path to `X` with a distance of `2` and push that to the Queue as well.
*   Because the Queue doesn't sort, you will eventually pop `(10, X)` and use it to explore all of `X`'s neighbors, updating their distances based on the suboptimal distance of `10`. 
*   Later, you will pop `(2, X)` and have to explore all of `X`'s neighbors *again*, updating them to the newly found better distances. 
*   **The Result:** This leads to multiple unnecessary redundant updates and explores suboptimal paths deeply before finding the optimal ones.

**The Benefit of a Priority Queue/Set:**
A Priority Queue always pops the node with the **minimum** known distance. 
*   When we pop `X`, we are guaranteed that we have found the absolute shortest path to `X`. 
*   Therefore, when we explore `X`'s neighbors, we are giving them the best possible starting point, drastically reducing the number of times we have to update them later.

## Time Complexity Analysis
Let's break down the time complexity based on the Priority Queue implementation:
1.  **Outer Loop:** We extract (pop) nodes from the Priority Queue. In the worst case, every node `V` is pushed and popped. Popping from a Priority Queue takes $O(\log V)$. So, extracting nodes takes **$O(V \log V)$**.
2.  **Inner Loop (Edges):** For every popped node, we iterate over its adjacent edges `E`. Across the entire algorithm, we evaluate every edge in the graph.
3.  **Pushing to PQ:** Every time we successfully relax an edge (find a shorter path), we push the new path into the Priority Queue. Pushing takes $O(\log V)$. In the worst case, we might push for every edge, leading to **$O(E \log V)$**.

**Total Time Complexity:**
$O(V \log V) + O(E \log V)$
Since the number of edges $E$ is typically greater than or equal to $V$ (especially in connected graphs), the $E \log V$ term dominates.
Thus, the final Time Complexity is: **$O(E \log V)$**.

*(Note: In the absolute worst-case dense graph, $E = V^2$, making the complexity $O(V^2 \log V)$, which simplifies back to $O(E \log V)$).*

# Graph Concepts & Qns - 27: Shortest Path in Weighted Undirected Graph (Dijkstra's)

**Video Link:** [Shortest Path in Weighted undirected graph | Dijkstra's | Why not BFS ? | Graph Concepts & Qns - 27](https://youtu.be/icVJUN45f1E)  
**Channel:** codestorywithMIK  
**Practice Link:** [Shortest Path in Weighted undirected graph on GeeksforGeeks](https://www.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1)

## Overview
In previous videos, we learned how Dijkstra's Algorithm computes the minimum distances from a source vertex to all other vertices. This video tackles a practical extension of that concept: **Finding and printing the actual shortest path from vertex `1` to vertex `n` in a weighted undirected graph.**

The video also answers an essential interview question: **Why can't standard BFS be used to find the shortest path in a weighted graph?**

---

## 1. Why Not Standard BFS?
*   **Unweighted Graph:** Standard BFS explores level-by-level (edge-by-edge). In an unweighted graph (or where every edge weight is `1`), the path with the fewest edges is guaranteed to be the shortest path.
*   **Weighted Graph:** In a weighted graph, a path with fewer edges may have a much larger total weight than an alternate path with more edges having smaller weights (e.g., direct edge with weight `3` vs. two intermediate edges of weight `1 + 1 = 2`).
*   Standard BFS marks nodes as visited on first discovery, causing it to prematurely lock in suboptimal paths and miss shorter alternatives with lower cumulative weights.

---

## 2. Core Logic: Path Reconstruction in Dijkstra's Algorithm
To reconstruct and print the shortest path from vertex `1` to vertex `n`:

1.  **Dijkstra Traversal:** Run standard Dijkstra's Algorithm using a Min-Heap (Priority Queue).
2.  **Parent Tracking Array:**
    *   Maintain a `parent` array of size `n + 1` where `parent[i]` initially points to `i`.
    *   Whenever we successfully relax an edge (finding a shorter distance to neighbor `v` coming from node `u`), we update `parent[v] = u`.
3.  **Backtracking to Build the Path:**
    *   If `result[n] == Integer.MAX_VALUE`, the destination node `n` is unreachable, so return `[-1]`.
    *   Otherwise, start at destination node `n` and trace back to source node `1` using the `parent` array (`curr = parent[curr]`).
    *   Add each node along the backward trace to a list, then reverse the list to get the path from `1` to `n`.

---

## Java Implementation

```java
import java.util.*;

class ShortestPathWeightedGraph {

    // Helper class to represent a pair (distance, node)
    static class Pair {
        int distance;
        int node;

        public Pair(int distance, int node) {
            this.distance = distance;
            this.node = node;
        }
    }

    public List<Integer> shortestPath(int n, int m, int[][] edges) {
        // Step 1: Build Adjacency List (1-indexed nodes)
        // Each entry contains pairs of (neighbor, weight)
        List<List<Pair>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            adj.get(u).add(new Pair(w, v));
            adj.get(v).add(new Pair(w, u)); // Undirected graph
        }

        // Step 2: Initialize Priority Queue, Distance Array, and Parent Array
        PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> a.distance - b.distance);
        int[] result = new int[n + 1];
        int[] parent = new int[n + 1];

        Arrays.fill(result, Integer.MAX_VALUE);
        for (int i = 1; i <= n; i++) {
            parent[i] = i; // Every node initially points to itself
        }

        // Start from source node 1
        result[1] = 0;
        pq.add(new Pair(0, 1));

        // Step 3: Standard Dijkstra's Algorithm with Parent Tracking
        while (!pq.isEmpty()) {
            Pair curr = pq.poll();
            int currDist = curr.distance;
            int u = curr.node;

            for (Pair neighbor : adj.get(u)) {
                int v = neighbor.node;
                int weight = neighbor.distance;

                // Relaxation Step
                if (currDist + weight < result[v]) {
                    result[v] = currDist + weight;
                    parent[v] = u; // Track that node v was reached via u
                    pq.add(new Pair(result[v], v));
                }
            }
        }

        // Step 4: If destination n is unreachable, return [-1]
        List<Integer> path = new ArrayList<>();
        if (result[n] == Integer.MAX_VALUE) {
            path.add(-1);
            return path;
        }

        // Step 5: Reconstruct Path from n back to 1
        int node = n;
        while (parent[node] != node) {
            path.add(node);
            node = parent[node];
        }
        path.add(1); // Add the source node

        // Reverse to get path from source (1) to destination (n)
        Collections.reverse(path);

        return path;
    }
}
```

# Graph Concepts & Qns - 28: Network Delay Time (Leetcode 743 | GOOGLE)

**Video Link:** [Network Delay Time | Leetcode 743 | GOOGLE | Graph Concepts & Qns - 28 | Explanation+Coding](https://youtu.be/hptQEIpvaxM)  
**Channel:** codestorywithMIK  
**Practice Link:** [Network Delay Time on LeetCode](https://leetcode.com/problems/network-delay-time/)

## Overview
This video solves the **Network Delay Time** problem, a popular graph question frequently asked by Google. It serves as a direct application of **Dijkstra's Algorithm**, which was covered in detail in the previous videos of this series. 

## Problem Breakdown
**The Story:** You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of directed edges where `times[i] = (u, v, w)`, meaning it takes `w` time for a signal to travel from source node `u` to target node `v`.
You send a signal from a given starting node `k`. 

**The Goal:** Return the **minimum time** it takes for all `n` nodes to receive the signal. If it is impossible for all `n` nodes to receive the signal (i.e., some nodes are unreachable), return `-1`.

## Core Logic & Intuition
The problem asks for the time it takes for a signal to reach *all* nodes from a single source `k`. Since signals travel simultaneously along all available edges, the time it takes to reach any specific node is exactly the **shortest path distance** from the source `k` to that node.

*   Therefore, the time it takes for the signal to reach the *last* (furthest) node is simply the **maximum of all the shortest paths** from `k` to every other node.

**The Strategy:**
1.  **Build the Graph:** Create an Adjacency List representing the directed graph and the travel times.
2.  **Run Dijkstra's Algorithm:** Use a Priority Queue (Min-Heap) to find the shortest path from the source node `k` to all other nodes. Store these minimum travel times in a `result` (or `distance`) array initialized to infinity.
3.  **Analyze the Results:**
    *   Find the maximum value in the `result` array (ignoring index `0` since nodes are 1-indexed).
    *   If the maximum value is still infinity (`Integer.MAX_VALUE`), it means at least one node was unreachable. Return `-1`.
    *   Otherwise, return that maximum value, as it represents the minimum time required for the signal to finally reach the furthest node.

## Java Implementation

```java
import java.util.*;

class NetworkDelayTime {
    
    // Helper class to represent a Pair (time/distance, node)
    static class Pair {
        int time;
        int node;
        
        public Pair(int time, int node) {
            this.time = time;
            this.node = node;
        }
    }

    public int networkDelayTime(int[][] times, int n, int k) {
        // Step 1: Build the Adjacency List for a directed graph
        // List of Lists where each inner list contains Pairs of (target, travel_time)
        List<List<Pair>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adj.add(new ArrayList<>());
        }
        
        for (int[] time : times) {
            int u = time[0];
            int v = time[1];
            int w = time[2];
            adj.get(u).add(new Pair(w, v)); 
        }
        
        // Step 2: Initialize Dijkstra's Algorithm structures
        // Min-Heap ordered by travel time
        PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> a.time - b.time);
        
        int[] result = new int[n + 1];
        Arrays.fill(result, Integer.MAX_VALUE);
        
        // Signal starts at node k
        result[k] = 0;
        pq.add(new Pair(0, k));
        
        // Step 3: Run Dijkstra's Algorithm
        while (!pq.isEmpty()) {
            Pair curr = pq.poll();
            int currTime = curr.time;
            int u = curr.node;
            
            // Traverse neighbors
            for (Pair neighbor : adj.get(u)) {
                int v = neighbor.node;
                int travelTime = neighbor.time;
                
                // Relaxation step
                if (currTime + travelTime < result[v]) {
                    result[v] = currTime + travelTime;
                    pq.add(new Pair(result[v], v));
                }
            }
        }
        
        // Step 4: Find the maximum time among all shortest paths
        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (result[i] == Integer.MAX_VALUE) {
                return -1; // Node 'i' was unreachable
            }
            maxTime = Math.max(maxTime, result[i]);
        }
        
        return maxTime;
    }
}
```
# Graph Concepts & Qns - 29: Shortest Path in Binary Matrix (Leetcode-1091)

**Video Link:** [Shortest Path in Binary Matrix | Leetcode-1091 | Dijkstra in 2-D Matrix |Graph Concepts & Qns - 29](https://youtu.be/XsF-Xj_y5x8)  
**Channel:** codestorywithMIK  
**Practice Link:** [Shortest Path in Binary Matrix on LeetCode](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

## Overview
This video solves **LeetCode 1091: Shortest Path in Binary Matrix**. It is an excellent problem to understand how pathfinding algorithms (BFS and Dijkstra's) are applied to 2D grids (matrices) instead of standard adjacency lists. 

The video demonstrates three ways to solve it:
1.  **Standard BFS** (because edge weights are implicitly uniform/equal).
2.  **Dijkstra's Algorithm using a Priority Queue** (Min-Heap).
3.  **Dijkstra's Algorithm using a standard Queue**.

## Problem Breakdown
**The Story:** You are given an `n x n` binary matrix `grid`. You need to find the length of the shortest "clear path" from the top-left cell `(0, 0)` to the bottom-right cell `(n - 1, n - 1)`. 
*   A "clear path" consists only of cells with a value of `0`.
*   You can move in all 8 directions (horizontally, vertically, diagonally).
*   The length of the path is the number of cells visited (including the start and end cells).
*   If no such path exists, return `-1`.

## Core Logic & Intuition

### Why BFS Works Here:
Standard BFS explores level-by-level. In this grid, moving from one cell to an adjacent cell always takes exactly 1 "step" (implicit weight of 1). Since all edge weights are uniform, the first time BFS reaches the destination `(n - 1, n - 1)`, it is guaranteed to be the shortest path. 

### Why Dijkstra's Works (and how to adapt it to 2D):
Dijkstra's algorithm is designed for weighted graphs, but it perfectly handles uniformly weighted graphs too. 
*   Instead of an Adjacency List, our "neighbors" are determined by checking the 8 valid directions `(dx, dy)` from the current cell `(x, y)`.
*   Instead of a 1D `result` array storing distances to nodes, we need a **2D `result` matrix** storing the minimum distance to each `(x, y)` cell.
*   Our Queue/Priority Queue will store: `(distance, (x, y))` instead of `(distance, node_id)`.

*Crucial Optimization:* Since the cost to move to any adjacent cell is always exactly `1`, a standard `Queue` acts identically to a `PriorityQueue` because the distances added to the queue will naturally be monotonically increasing.

## Java Implementation (Dijkstra's using Standard Queue)

*Note: Since edge weights are constant (+1), a standard `Queue` is preferred for optimal performance, though a `PriorityQueue` works exactly the same way logically.*

```java
import java.util.*;

class ShortestPathBinaryMatrix {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int n = grid.length;
        
        // Base cases: start or end is blocked
        if (grid[0][0] != 0 || grid[n - 1][n - 1] != 0) {
            return -1;
        }
        
        // 2D distance array initialized to infinity
        int[][] result = new int[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(result[i], Integer.MAX_VALUE);
        }
        
        // Queue stores int[]: {distance, x, y}
        Queue<int[]> pq = new LinkedList<>(); 
        
        // Start at (0, 0)
        result[0][0] = 1; // Path length includes the start cell itself
        pq.add(new int[]{1, 0, 0});
        
        // All 8 possible directional moves
        int[][] directions = {
            {0, 1}, {0, -1}, {1, 0}, {-1, 0},
            {1, 1}, {-1, -1}, {1, -1}, {-1, 1}
        };
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int d = curr[0];
            int x = curr[1];
            int y = curr[2];
            
            // If we reached the destination, return the distance
            if (x == n - 1 && y == n - 1) {
                return d;
            }
            
            // Traverse all 8 directions
            for (int[] dir : directions) {
                int nx = x + dir[0];
                int ny = y + dir[1];
                
                // Check bounds and if the cell is clear (0)
                if (nx >= 0 && nx < n && ny >= 0 && ny < n && grid[nx][ny] == 0) {
                    // Relaxation step
                    if (d + 1 < result[nx][ny]) {
                        result[nx][ny] = d + 1;
                        pq.add(new int[]{d + 1, nx, ny});
                    }
                }
            }
        }
        
        return -1; // Path not found
    }
}
```
   # Graph Concepts & Qns - 30: Path With Minimum Effort (Leetcode-1631)

**Video Link:** [Path With Minimum Effort | Leetcode-1631 | Dijkstra in 2-D Matrix |GOOGLE |Graph Concepts & Qns - 30](https://youtu.be/QIu9HeyEjPc)  
**Channel:** codestorywithMIK  
**Practice Link:** [Path With Minimum Effort on LeetCode](https://leetcode.com/problems/path-with-minimum-effort/)

## Overview
This video explains the problem **Path With Minimum Effort (LeetCode 1631)**. This is an excellent problem to practice applying **Dijkstra's Algorithm on a 2D Matrix**. It relies heavily on the concepts discussed in the previous video (Video #29), where we learned how to adapt Dijkstra's algorithm for grid-based traversals.

## Problem Breakdown
**The Story:** You are a hiker preparing for a hike given a 2D array `heights` of size `rows x columns`, where `heights[row][col]` represents the height of cell `(row, col)`.
*   You start at the top-left cell `(0, 0)` and want to travel to the bottom-right cell `(rows-1, columns-1)`.
*   You can move up, down, left, or right.
*   **The "Effort" of a Path:** The effort of a path is the **maximum absolute difference in heights** between two consecutive cells along that path.
*   **The Goal:** Return the *minimum* effort required to travel from the top-left cell to the bottom-right cell.

## Core Logic & Intuition
If you look closely at the problem, moving from one cell to an adjacent cell incurs a "cost" or "weight" equal to the absolute difference in their heights. 
*   Since the weight/cost varies depending on the height difference of adjacent cells, **standard BFS will not work here**. (Standard BFS is only for uniform weights).
*   Because we need the *shortest/minimum* possible cost to reach a destination in a weighted graph, this is a clear application of **Dijkstra's Algorithm**.

### Adapting Dijkstra's for "Maximum Difference"
In standard Dijkstra's, we add the weights along the path (`current_distance + edge_weight`). 
Here, the problem defines the effort of a path differently: it is the **maximum** difference encountered along the path, NOT the sum.
*   When moving from cell `(x, y)` to `(nx, ny)`, the new effort for this path becomes: `Math.max(current_effort, Math.abs(heights[x][y] - heights[nx][ny]))`.
*   If this new effort is strictly *less* than the previously recorded effort to reach `(nx, ny)` (stored in our `result` matrix), we have found a "better" (less physically demanding) path to `(nx, ny)`. We then update `result[nx][ny]` and push it to the Priority Queue.

## Java Implementation

```java
import java.util.*;

class PathWithMinimumEffort {
    public int minimumEffortPath(int[][] heights) {
        int m = heights.length;
        int n = heights[0].length;
        
        // Result matrix to store the minimum effort to reach each cell
        int[][] result = new int[m][n];
        for (int i = 0; i < m; i++) {
            Arrays.fill(result[i], Integer.MAX_VALUE);
        }
        
        // Priority Queue (Min-Heap) ordered by effort
        // Stores int[] arrays representing: {effort, x, y}
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        
        // Start at (0, 0) with an effort of 0
        result[0][0] = 0;
        pq.add(new int[]{0, 0, 0});
        
        // Directions for Up, Down, Left, Right
        int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int currEffort = curr[0];
            int x = curr[1];
            int y = curr[2];
            
            // Optimization: Since it's a Min-Heap, the first time we pop the destination
            // cell, we are guaranteed it's the absolute minimum effort possible.
            if (x == m - 1 && y == n - 1) {
                return currEffort;
            }
            
            // Explore all 4 adjacent neighbors
            for (int[] dir : directions) {
                int nx = x + dir[0];
                int ny = y + dir[1];
                
                // If neighbor is within bounds
                if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
                    
                    // Calculate the absolute difference in height
                    int absDiff = Math.abs(heights[x][y] - heights[nx][ny]);
                    
                    // The new effort is the maximum of the current path's effort and this new jump
                    int maxEffort = Math.max(currEffort, absDiff);
                    
                    // Relaxation step: If this path offers a smaller maximum effort, update it
                    if (maxEffort < result[nx][ny]) {
                        result[nx][ny] = maxEffort;
                        pq.add(new int[]{maxEffort, nx, ny});
                    }
                }
            }
        }
        
        return 0; // Fallback, though we should always reach the destination
    }
}
```
# Graph Concepts & Qns - 31: Bellman-Ford Algorithm | Full Detail

**Video Link:** [Bellman-Ford Algorithm | Full Detail | Microsoft, Amazon | Graph Concepts & Qns - 31 | Explanation](https://youtu.be/5yTkgeTqKK0)  
**Channel:** codestorywithMIK  
**Practice Link:** [Distance from the Source (Bellman-Ford Algorithm) on GeeksforGeeks](https://practice.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/0) (Or similar problem portal as mentioned in the video)

## Overview
This video introduces the **Bellman-Ford Algorithm**, an alternative to Dijkstra's Algorithm for finding the shortest path from a single source node to all other nodes in a graph. While Dijkstra's algorithm is generally faster, it fails when graphs contain **negative weight edges** or **negative cycles**. Bellman-Ford was specifically designed to handle these cases.

## Core Concept: Bellman-Ford Algorithm

### Why Dijkstra Fails with Negative Edges
Dijkstra's is a greedy algorithm. Once it pops a node from the Min-Heap and marks it as processed, it assumes it has found the absolute shortest path to that node. If a negative weight edge exists elsewhere in the graph, it could potentially loop back and offer an even shorter path to an already processed node, trapping Dijkstra's algorithm in an infinite loop or producing incorrect shortest path values.

### The Bellman-Ford Solution
Bellman-Ford takes a different approach: **Relaxation**.
*   **Relaxation:** Updating the distance to a destination node `v` if the distance to a source node `u` plus the edge weight `w` is smaller than the currently known distance to `v` (`if (dist[u] + w < dist[v]) then dist[v] = dist[u] + w`).
*   **The Rule:** If a graph has `V` vertices, the longest possible shortest path without any cycles can contain at most `V - 1` edges. 
*   Therefore, Bellman-Ford simply iterates and relaxes *all* edges in the graph exactly **`V - 1` times**. After `V - 1` iterations, all shortest paths are guaranteed to be found, even with negative weights.
*   **Constraint:** Bellman-Ford strictly requires a **Directed Graph**. If you have an undirected graph with a negative edge, it inherently acts as a negative cycle (you can bounce back and forth infinitely), which breaks the shortest path logic.

### Detecting Negative Weight Cycles
If a graph contains a cycle where the sum of edge weights is negative, you can keep circling it infinitely to get a smaller and smaller path distance. Therefore, a definitive shortest path does not exist.
*   **Detection Strategy:** Since `V - 1` iterations guarantee finding all valid shortest paths, if we run the relaxation loop exactly *one more time* (the `V`-th time) and any distance still updates, it definitively proves the presence of a **Negative Cycle**.

## Java Implementation

```java
import java.util.*;

class BellmanFord {

    public int[] bellman_ford(int V, ArrayList<ArrayList<Integer>> edges, int S) {
        
        // Step 1: Initialize result array to infinity (use a large number to avoid overflow)
        int[] result = new int[V];
        Arrays.fill(result, (int) 1e8);
        
        // Distance to source is 0
        result[S] = 0;
        
        // Step 2: Relax all edges exactly V - 1 times
        for (int i = 1; i <= V - 1; i++) {
            for (ArrayList<Integer> edge : edges) {
                int u = edge.get(0);
                int v = edge.get(1);
                int weight = edge.get(2);
                
                // Relaxation check: ensure we have actually reached 'u' before adding weight
                if (result[u] != 1e8 && result[u] + weight < result[v]) {
                    result[v] = result[u] + weight;
                }
            }
        }
        
        // Step 3: Detect Negative Cycle
        // Run relaxation one more time. If anything updates, there's a negative cycle.
        for (ArrayList<Integer> edge : edges) {
            int u = edge.get(0);
            int v = edge.get(1);
            int weight = edge.get(2);
            
            if (result[u] != 1e8 && result[u] + weight < result[v]) {
                // Negative cycle detected!
                return new int[]{-1}; 
            }
        }
        
        return result;
    }
}
```
# Graph Concepts & Qns - 32: Floyd Warshall Algorithm | Full Detail

**Video Link:** [Floyd Warshall Algorithm | Full Detail | Samsung | Graph Concepts & Qns - 32 | Explanation + Coding](https://youtu.be/DzfmJoFq1pc)  
**Channel:** codestorywithMIK  
**Practice Link:** [Floyd Warshall on GeeksforGeeks](https://practice.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1) (or similar problem portal as mentioned in the video)

## Overview
This video explains the **Floyd Warshall Algorithm**, which is used to find the shortest distance between **every pair of vertices** in a given edge-weighted directed graph. Unlike Dijkstra's or Bellman-Ford algorithms which find the shortest path from a *single* source node to all other nodes, Floyd Warshall calculates the shortest path from *every* node to *every other* node simultaneously.

## Core Concept: The "Via" (Through) Node Strategy
The core intuition of the Floyd Warshall algorithm revolves around checking if going *through* an intermediate node provides a shorter path than going directly.

**The Strategy:**
1.  **Adjacency Matrix:** The graph is represented as a 2D adjacency matrix `grid`, where `grid[i][j]` represents the direct distance from node `i` to node `j`. If there is no direct edge, the distance is initialized to infinity (`Integer.MAX_VALUE` or a large number). The distance from a node to itself (`grid[i][i]`) is `0`.
2.  **The "Via" Loop:** For every possible intermediate node (let's call it `via`), we check every pair of source (`i`) and destination (`j`) nodes.
3.  **Relaxation:** We check if the path from `i` to `via` plus the path from `via` to `j` is shorter than the currently known path directly from `i` to `j`.
    *   `grid[i][j] = Math.min(grid[i][j], grid[i][via] + grid[via][j])`
4.  By iteratively doing this for every `via` node from `0` to `n-1`, the matrix eventually stores the absolute shortest path between every pair of nodes.

### Detecting Negative Weight Cycles
Similar to Bellman-Ford, Floyd Warshall can also detect negative weight cycles.
*   **The Check:** After the algorithm finishes, check the diagonal elements of the matrix (`grid[i][i]`). 
*   The distance from a node to itself should always be `0`. If `grid[i][i] < 0` for any node `i`, it means there is a negative weight cycle in the graph. The algorithm found a way to leave the node, traverse a cycle, and come back with a net negative cost.

## Java Implementation

```java
class FloydWarshall {
    public void shortest_distance(int[][] matrix) {
        int n = matrix.length;
        
        // Step 1: Pre-process the matrix
        // Replace -1 (indicating no edge) with a large value to represent infinity
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == -1) {
                    matrix[i][j] = (int) 1e5; // Use a large number to avoid overflow during addition
                }
                if (i == j) {
                    matrix[i][j] = 0;
                }
            }
        }
        
        // Step 2: Floyd Warshall Algorithm - Triple nested loop
        // The outer loop picks the intermediate "via" node
        for (int via = 0; via < n; via++) {
            // The inner two loops pick the source (i) and destination (j) nodes
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    // Update the shortest path if going through 'via' is shorter
                    matrix[i][j] = Math.min(matrix[i][j], matrix[i][via] + matrix[via][j]);
                }
            }
        }
        
        // Optional Step: Detect Negative Cycle
        /*
        for (int i = 0; i < n; i++) {
            if (matrix[i][i] < 0) {
                // Negative cycle detected!
            }
        }
        */
        
        // Step 3: Post-process the matrix
        // Revert the large values back to -1 as required by the problem statement
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] >= (int) 1e5) {
                    matrix[i][j] = -1;
                }
            }
        }
    }
}
```
# Graph Concepts & Qns - 33: Minimum Spanning Tree | Easy Theory Full Detail

**Video Link:** [Minimum Spanning Tree | Easy Theory Full Detail | Amazon, Microsoft | Graph Concepts & Qns - 33](https://youtu.be/xxvY2UX7YPg)  
**Channel:** codestorywithMIK  

## Overview
This video introduces the foundational theory of the **Minimum Spanning Tree (MST)**. Understanding this theory is crucial before moving on to solving related coding problems or implementing specific MST algorithms. The concept is frequently asked about in interviews at companies like Amazon and Microsoft.

## Core Concept: What is a Spanning Tree?
Before understanding a *Minimum* Spanning Tree, we must understand what a generic Spanning Tree is.

Given an undirected, connected graph `G` with `V` vertices and `E` edges, a **Spanning Tree** is a subgraph of `G` that satisfies the following conditions:
1.  **Contains all Vertices:** It must include exactly `V` vertices (all the vertices present in the original graph).
2.  **Number of Edges:** It must contain exactly `V - 1` edges.
3.  **Connected:** It must be a fully connected subgraph (there must be a path between any pair of nodes).
4.  **Acyclic:** As the name "Tree" suggests, it must **not** contain any cycles.

*Note: A single graph can have multiple valid Spanning Trees.*

## Core Concept: What is a Minimum Spanning Tree (MST)?
A Minimum Spanning Tree comes into play when the graph is a **weighted, connected, undirected graph**. 

Every Spanning Tree derived from this graph will have a total "weight" (the sum of the weights of all its `V - 1` edges).
*   A **Minimum Spanning Tree (MST)** is simply the Spanning Tree out of all possible Spanning Trees that has the **minimum possible total edge weight**.
*   *Note: Just like standard Spanning Trees, there can be multiple MSTs for a single graph if different edge combinations yield the same minimum total weight.*

## Algorithms to Find the MST (Upcoming)
To programmatically find the Minimum Spanning Tree of a given graph, two famous algorithms are primarily used:
1.  **Prim's Algorithm**
2.  **Kruskal's Algorithm**

Both of these algorithms will be covered in deep detail with code implementations in the subsequent videos of this series.

## Complexity Analysis
*(Note: As this video is purely theoretical and does not introduce a specific algorithm or code implementation, standard time and space complexities are not applicable here. Complexities will be detailed in the upcoming videos for Prim's and Kruskal's algorithms.)*

# Graph Concepts & Qns - 34: Prim's Algorithm | Minimum Spanning Tree

**Video Link:** [Prim's Algorithm | Minimum Spanning Tree | Full Dry Run | INTUITION | Graph Concepts & Qns - 34](https://youtu.be/V9gXzD7g8fw)  
**Channel:** codestorywithMIK  
**Practice Link:** [Minimum Spanning Tree on GeeksforGeeks](https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1) (Or similar platform mentioned in the video)

## Overview
This video follows up on the previous theory video about **Minimum Spanning Trees (MST)**. It provides a detailed, intuition-based explanation and full code implementation of **Prim's Algorithm**, which is one of the two primary algorithms (alongside Kruskal's) used to find an MST in a weighted, undirected, and connected graph. 

## Problem Breakdown
**The Goal:** Given an undirected, connected, and weighted graph, find the sum of weights of the edges of its Minimum Spanning Tree (MST). An MST is a subgraph that connects all `V` vertices together without any cycles, using exactly `V - 1` edges, such that the total edge weight is minimized.

## Core Logic & Intuition (Prim's Algorithm)
Prim's Algorithm builds the MST gradually, one vertex at a time, by always picking the smallest available edge that connects a node *inside* the growing MST to a node *outside* the MST.

**The Strategy:**
1.  **Tracking Arrays:** We need a boolean array `inMST[]` to track which vertices have already been included in our Minimum Spanning Tree.
2.  **Priority Queue (Min-Heap):** We use a Min-Heap to always efficiently extract the edge with the minimum weight. The heap stores pairs representing `(weight, node)`.
3.  **Initialization:** We can start building our MST from *any* arbitrary node (typically node `0`). We push `(0, 0)` into the Priority Queue, representing a weight of `0` to reach node `0`.
4.  **The Greedy Choice (While Loop):**
    *   Pop the element with the smallest weight from the Priority Queue: `(currWeight, currNode)`.
    *   **Crucial Check:** If `inMST[currNode]` is already `true`, we skip it. Why? Because adding an edge to a node already in our MST would create a cycle!
    *   If it's `false`, we mark `inMST[currNode] = true`.
    *   We add `currWeight` to our total `sum`. (This represents successfully adding this edge to our MST).
    *   Now, we look at all adjacent neighbors of `currNode`. If a neighbor is *not* yet in the MST (`inMST[neighbor] == false`), we push `(edgeWeight, neighbor)` into the Priority Queue.
5.  When the Priority Queue is empty, all reachable vertices have been added to the MST, and `sum` holds the total weight of the Minimum Spanning Tree.

## Java Implementation

```java
import java.util.*;

class PrimsAlgorithm {
    
    // Helper class to represent pairs in the Priority Queue
    static class Pair {
        int weight;
        int node;
        
        public Pair(int weight, int node) {
            this.weight = weight;
            this.node = node;
        }
    }

    // Function to find sum of weights of edges of the Minimum Spanning Tree.
    static int spanningTree(int V, int E, int edges[][]) {
        // Step 1: Create Adjacency List for an undirected graph
        List<List<Pair>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
        
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];
            adj.get(u).add(new Pair(w, v));
            adj.get(v).add(new Pair(w, u)); // Undirected
        }
        
        // Priority Queue (Min-Heap) ordered by edge weight
        PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> a.weight - b.weight);
        
        // Boolean array to keep track of nodes included in MST
        boolean[] inMST = new boolean[V];
        
        int sum = 0;
        
        // Start building MST from node 0
        pq.add(new Pair(0, 0));
        
        // Step 2: Run Prim's Algorithm
        while (!pq.isEmpty()) {
            Pair curr = pq.poll();
            int currWeight = curr.weight;
            int u = curr.node;
            
            // If the node is already part of the MST, skip it to avoid cycles
            if (inMST[u]) {
                continue;
            }
            
            // Include the node in the MST and add its edge weight to the total sum
            inMST[u] = true;
            sum += currWeight;
            
            // Explore all adjacent neighbors of the current node
            for (Pair neighbor : adj.get(u)) {
                int v = neighbor.node;
                int weight = neighbor.weight;
                
                // If the neighbor is NOT yet in the MST, push it to the PQ
                if (!inMST[v]) {
                    pq.add(new Pair(weight, v));
                }
            }
        }
        
        return sum;
    }
}

```
# Graph Concepts & Qns - 35: Min Cost to Connect All Points (Prim's Algorithm)

**Video Link:** [Min Cost to Connect All Points | Prim's Algorithm | META | Graph Concepts & Qns - 35 | Leetcode-1584](https://youtu.be/hsr7KolYDH0)  
**Channel:** codestorywithMIK  
**Practice Link:** [Min Cost to Connect All Points on LeetCode](https://leetcode.com/problems/min-cost-to-connect-all-points/)

## Overview
This video solves **LeetCode 1584: Min Cost to Connect All Points**, a problem commonly asked by Meta. This is a direct application of the Minimum Spanning Tree (MST) concept, specifically utilizing **Prim's Algorithm**, which was covered extensively in video #34. 

## Problem Breakdown
**The Story:** You are given an array `points` representing integer coordinates of some points on a 2D-plane, where `points[i] = [xi, yi]`.
*   The cost of connecting two points `[xi, yi]` and `[xj, yj]` is the Manhattan distance between them: `|xi - xj| + |yi - yj|`.
*   **The Goal:** Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

## Core Logic & Intuition
The phrasing "minimum cost to make all points connected" and "exactly one simple path between any two points" is the textbook definition of a **Minimum Spanning Tree (MST)**.

### Translating the Problem to a Graph
To apply Prim's Algorithm, we first need to visualize the given array of points as a graph:
1.  **Nodes (Vertices):** Each point in the `points` array acts as a vertex in our graph. The index of the point (from `0` to `n-1`) will be the node's identifier.
2.  **Edges:** Since any point can be connected to any other point, this is effectively a **Complete Graph**. There is an implicit edge between every pair of nodes `i` and `j`.
3.  **Weights:** The weight of the edge between node `i` and node `j` is the Manhattan distance between `points[i]` and `points[j]`.

### The Strategy
1.  **Build the Adjacency List:** Iterate through every unique pair of points `(i, j)`. Calculate the Manhattan distance `d` between them. Add an undirected edge: `adj.get(i).add(new Pair(d, j))` and `adj.get(j).add(new Pair(d, i))`.
2.  **Apply Prim's Algorithm:** Once the adjacency list is built, the problem is identical to standard MST finding. We just copy-paste/implement the exact same Prim's Algorithm logic using a Min-Heap (Priority Queue) and an `inMST` boolean array.

## Java Implementation

```java
import java.util.*;

class MinCostConnectPoints {
    
    // Helper class to represent a Pair (weight, node) for the Priority Queue and Adjacency List
    static class Pair {
        int weight;
        int node;
        
        public Pair(int weight, int node) {
            this.weight = weight;
            this.node = node;
        }
    }

    public int minCostConnectPoints(int[][] points) {
        int n = points.length;
        
        // Step 1: Build the Adjacency List
        List<List<Pair>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Calculate Manhattan Distance
                int weight = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
                
                // Add undirected edges
                adj.get(i).add(new Pair(weight, j));
                adj.get(j).add(new Pair(weight, i));
            }
        }
        
        // Step 2: Prim's Algorithm
        // Priority Queue (Min-Heap) ordered by edge weight
        PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> a.weight - b.weight);
        boolean[] inMST = new boolean[n];
        int sum = 0;
        
        // Start building MST from node 0
        pq.add(new Pair(0, 0));
        
        while (!pq.isEmpty()) {
            Pair curr = pq.poll();
            int currWeight = curr.weight;
            int u = curr.node;
            
            // If the node is already part of the MST, skip it to avoid cycles
            if (inMST[u]) {
                continue;
            }
            
            // Include the node in the MST and add its edge weight to the total cost
            inMST[u] = true;
            sum += currWeight;
            
            // Explore all adjacent neighbors of the current node
            for (Pair neighbor : adj.get(u)) {
                int v = neighbor.node;
                int weight = neighbor.weight;
                
                // If the neighbor is NOT yet in the MST, push it to the PQ
                if (!inMST[v]) {
                    pq.add(new Pair(weight, v));
                }
            }
        }
        
        return sum;
    }
}
```
# Graph Concepts & Qns - 36: Kruskal's Algorithm | Minimum Spanning Tree

**Video Link:** [Kruskal's Algorithm | Minimum Spanning Tree | Full Dry Run | INTUITION | Graph Concepts & Qns - 36](https://youtu.be/3tgekNXWXsY)  
**Channel:** codestorywithMIK  
**Practice Link:** [Minimum Spanning Tree on GeeksforGeeks](https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1)

## Overview
This video introduces **Kruskal's Algorithm**, the second major algorithm used to find the Minimum Spanning Tree (MST) of a weighted, undirected, and connected graph. While Prim's Algorithm (covered in Video #34) builds the MST node-by-node, Kruskal's Algorithm builds the MST edge-by-edge using a greedy approach combined with the **Disjoint Set Union (DSU)** data structure.

## Core Logic & Intuition (Kruskal's Algorithm)
The fundamental intuition behind Kruskal's Algorithm is pure greed: To get the *minimum* spanning tree, we should always try to include the edges with the *smallest* weights first. 

**The Strategy:**
1.  **Extract All Edges:** Convert the given Adjacency List graph representation into a flat list/array of all edges. Each edge is represented as `[u, v, weight]`.
2.  **Sort Edges:** Sort this entire list of edges in **ascending order based on their weights**. This guarantees we will process the smallest edges first.
3.  **Iterate and Connect (Using DSU):** 
    *   Iterate through the sorted edges one by one.
    *   For each edge `[u, v, weight]`, use the **Disjoint Set Union (DSU)** `find` operation to check the ultimate parent (component leader) of `u` and `v`.
    *   **The Crucial Check:** 
        *   If `find(u) == find(v)`, it means `u` and `v` are *already* connected within the same component. Adding this edge would create a **cycle**. So, we discard/ignore this edge.
        *   If `find(u) != find(v)`, they belong to different components. We safely include this edge in our MST by adding its `weight` to our total `sum`, and then we connect the two components using the DSU `union` operation.
4.  Once we have processed the edges (or successfully added `V - 1` edges), the algorithm completes, and we have the minimum total weight.

## Java Implementation

```java
import java.util.*;

class KruskalsAlgorithm {
    
    // DSU Class with Path Compression and Union by Rank
    static class DisjointSet {
        int[] parent;
        int[] rank;

        public DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        public int find(int i) {
            if (parent[i] == i) {
                return i;
            }
            return parent[i] = find(parent[i]); // Path compression
        }

        public void unionByRank(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            
            if (rootI == rootJ) return;
            
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootI] = rootJ;
                rank[rootJ]++;
            }
        }
    }

    // Function to find sum of weights of edges of the Minimum Spanning Tree.
    static int spanningTree(int V, int E, int edges[][]) {
        // Step 1: Create a list of all edges (from the input format)
        // edges[i] contains {u, v, weight}
        List<int[]> allEdges = new ArrayList<>();
        for (int i = 0; i < E; i++) {
            allEdges.add(new int[]{edges[i][0], edges[i][1], edges[i][2]});
        }
        
        // Step 2: Sort all edges in ascending order of their weight
        Collections.sort(allEdges, (a, b) -> a[2] - b[2]);
        
        // Step 3: Initialize DSU and the sum variable
        DisjointSet ds = new DisjointSet(V);
        int sum = 0;
        
        // Step 4: Iterate through sorted edges and apply Kruskal's logic
        for (int[] edge : allEdges) {
            int u = edge[0];
            int v = edge[1];
            int weight = edge[2];
            
            // Find ultimate parents of u and v
            int parentU = ds.find(u);
            int parentV = ds.find(v);
            
            // If they are not in the same component, adding this edge won't form a cycle
            if (parentU != parentV) {
                // Include the edge weight
                sum += weight;
                // Union the two components
                ds.unionByRank(u, v);
            }
        }
        
        return sum;
    }
}

```
# Graph Concepts & Qns - 37: Min Cost to Connect All Points (Kruskal's Algorithm)

**Video Link:** [Min Cost to Connect All Points | Kruskal's Algorithm | Graph Concepts & Qns - 37 | Leetcode-1584](https://youtu.be/O6wQQtv71S0)  
**Channel:** codestorywithMIK  
**Practice Link:** [Min Cost to Connect All Points on LeetCode](https://leetcode.com/problems/min-cost-to-connect-all-points/)

## Overview
This video solves the same problem we tackled in Video #35 (**LeetCode 1584: Min Cost to Connect All Points**). However, instead of using Prim's Algorithm, this video demonstrates how to solve it using **Kruskal's Algorithm**, which was thoroughly explained in Video #36.

## Problem Breakdown
**The Story:** You are given an array `points` where `points[i] = [xi, yi]` representing coordinates on a 2D plane. You need to connect all points such that exactly one simple path exists between any two points. The cost to connect two points is the Manhattan distance between them.
**The Goal:** Return the minimum cost to make all points connected (which is essentially asking to find the total weight of the Minimum Spanning Tree).

## Core Logic & Intuition (Applying Kruskal's)
Kruskal's algorithm doesn't care about starting at a specific node and expanding outwards. It simply wants a list of *all* possible edges, sorted by their weights.

**The Strategy:**
1.  **Generate All Edges:** Since any point can connect to any other point, this represents a complete graph. We iterate through every unique pair of points `(i, j)` where `i < j`.
2.  **Calculate Distance:** For each pair, calculate the Manhattan distance `d`. We treat this as an edge with weight `d` connecting node `i` to node `j`. Store this as `[i, j, d]` inside a list of all edges.
3.  **Sort the Edges:** Sort our list of all edges in ascending order based strictly on the distance `d`.
4.  **Kruskal's DSU Process:**
    *   Initialize a Disjoint Set Union (DSU) structure where each node (point index) is its own parent.
    *   Iterate through the sorted list of edges.
    *   For each edge `[u, v, d]`, check if `u` and `v` belong to the same component using `find(u)` and `find(v)`.
    *   If they are in different components (`find(u) != find(v)`), it means connecting them will *not* form a cycle. Add `d` to our total cost, and `union(u, v)` to merge their components.
    *   If they are already in the same component, skip the edge.
5.  Return the total accumulated cost.

## Java Implementation

```java
import java.util.*;

class MinCostConnectPointsKruskal {
    
    // DSU Class with Path Compression and Union by Rank
    static class DisjointSet {
        int[] parent;
        int[] rank;

        public DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        public int find(int i) {
            if (parent[i] == i) {
                return i;
            }
            return parent[i] = find(parent[i]); // Path compression
        }

        public void unionByRank(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            
            if (rootI == rootJ) return;
            
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootI] = rootJ;
                rank[rootJ]++;
            }
        }
    }

    public int minCostConnectPoints(int[][] points) {
        int n = points.length;
        
        // Step 1: Create a list of all possible edges {u, v, weight}
        List<int[]> allEdges = new ArrayList<>();
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Calculate Manhattan distance
                int weight = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
                allEdges.add(new int[]{i, j, weight});
            }
        }
        
        // Step 2: Sort all edges in ascending order of their weight
        Collections.sort(allEdges, (a, b) -> Integer.compare(a[2], b[2]));
        
        // Step 3: Apply Kruskal's logic using DSU
        DisjointSet ds = new DisjointSet(n);
        int sum = 0;
        int edgesAdded = 0;
        
        for (int[] edge : allEdges) {
            int u = edge[0];
            int v = edge[1];
            int weight = edge[2];
            
            // If u and v do not share the same ultimate parent, union them
            if (ds.find(u) != ds.find(v)) {
                ds.unionByRank(u, v);
                sum += weight;
                edgesAdded++;
                
                // Optimization: MST requires exactly V - 1 edges. 
                // We can break early once we have connected all components.
                if (edgesAdded == n - 1) {
                    break;
                }
            }
        }
        
        return sum;
    }
}
```

# Graph Concepts & Qns - 38: Strongly Connected Components | Kosaraju's Algorithm

**Video Link:** [Strongly Connected Components | Kosaraju's Algorithm | Intuition | AMAZON | Graph Concepts & Qns- 38](https://youtu.be/E6DeC0Zpdns)  
**Channel:** codestorywithMIK  
**Practice Link:** [Strongly Connected Components (Kosaraju's Algo) on GeeksforGeeks](https://practice.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1)

## Overview
This video introduces the concept of **Strongly Connected Components (SCC)** in a directed graph and explains **Kosaraju's Algorithm** to find them. This algorithm is frequently asked in interviews by top companies like Amazon, Microsoft, and Visa. The video focuses heavily on the *intuition* behind the algorithm—understanding *why* we need to reverse the graph and *why* we process nodes in a topological sort order.

## Core Concept: Strongly Connected Component (SCC)
In a directed graph, a **Strongly Connected Component (SCC)** is a maximal subgraph such that for every pair of vertices `u` and `v` within the subgraph, there is a directed path from `u` to `v` **AND** a directed path from `v` to `u`. 
*   Simply put: You can reach any node from any other node *within* that specific component.

## Core Logic & Intuition (Kosaraju's Algorithm)
If you simply perform a DFS starting from a node inside an SCC, you will discover all nodes in that SCC. However, if there's an outgoing edge from that SCC to another component, the DFS will "leak" out and incorrectly include nodes from the other component. 

Kosaraju's algorithm solves this "leaking" problem using two brilliant observations:
1.  **Reversing the Graph:** If you reverse the direction of all edges in the graph, the Strongly Connected Components remain exactly the same. However, the edges connecting *different* SCCs change direction. This prevents DFS from leaking *forward* into components it shouldn't.
2.  **Topological Sort Order:** Reversing the graph isn't enough on its own. If you start a DFS in the reversed graph from the "wrong" component, it might still leak *backward*. To fix this, we must process the components in the reverse topological order of the SCCs. We achieve this by performing a standard DFS first and pushing nodes onto a Stack *after* their children are processed. 

**The 3-Step Strategy of Kosaraju's Algorithm:**
1.  **Step 1 (Order by Finish Time):** Perform a DFS on the original graph. Keep track of visited nodes. Once a node has finished exploring all its neighbors, push it onto a `Stack`. (This gives us nodes ordered by their finish times, effectively giving a pseudo-topological sort order).
2.  **Step 2 (Reverse Graph):** Create a new adjacency list where all the edge directions are reversed (if `u -> v`, make it `v -> u`).
3.  **Step 3 (Count/Extract SCCs):** Pop nodes from the `Stack` one by one. If a popped node is not visited, start a DFS from it on the **Reversed Graph**. Every time you start a new DFS from the Stack, it corresponds to discovering exactly one complete Strongly Connected Component. Increment your SCC count.

## Java Implementation

```java
import java.util.*;

class KosarajusAlgorithm {
    
    // Step 1 Helper: DFS to fill the stack based on finish times
    private void dfsFillStack(int u, ArrayList<ArrayList<Integer>> adj, boolean[] visited, Stack<Integer> stack) {
        visited[u] = true;
        
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                dfsFillStack(v, adj, visited, stack);
            }
        }
        
        // Push to stack after all neighbors are explored
        stack.push(u);
    }
    
    // Step 3 Helper: Standard DFS for traversal on the reversed graph
    private void dfsTraversal(int u, ArrayList<ArrayList<Integer>> adjRev, boolean[] visited) {
        visited[u] = true;
        
        for (int v : adjRev.get(u)) {
            if (!visited[v]) {
                dfsTraversal(v, adjRev, visited);
            }
        }
    }

    // Function to find number of strongly connected components in the graph.
    public int kosaraju(int V, ArrayList<ArrayList<Integer>> adj) {
        
        // Step 1: Store vertices in a stack according to their finish times
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfsFillStack(i, adj, visited, stack);
            }
        }
        
        // Step 2: Create a reversed graph
        ArrayList<ArrayList<Integer>> adjRev = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adjRev.add(new ArrayList<>());
        }
        
        for (int u = 0; u < V; u++) {
            for (int v : adj.get(u)) {
                // Reverse the edge: u -> v becomes v -> u
                adjRev.get(v).add(u);
            }
        }
        
        // Step 3: Process nodes according to the stack and count SCCs
        // Reset visited array for the second DFS pass
        Arrays.fill(visited, false);
        int sccCount = 0;
        
        while (!stack.isEmpty()) {
            int node = stack.pop();
            
            if (!visited[node]) {
                // Each unvisited node popped from the stack is the start of a new SCC
                dfsTraversal(node, adjRev, visited);
                sccCount++;
            }
        }
        
        return sccCount;
    }
}
```
# Graph Concepts & Qns - 39: Disjoint Set Union By SIZE and Path Compression

**Video Link:** [Disjoint Set Union By SIZE and Path Compression | DSU | Graph Concepts & Qns -39 | Explanation+Code](https://youtu.be/kGv33AiGhdc)  
**Channel:** codestorywithMIK  

## Overview
This video is a continuation of the Disjoint Set Union (DSU) topic covered in Videos #18 and #19. Previously, we learned how to optimize DSU using **Path Compression** and **Union by Rank**. In this video, we explore an alternative, equally optimal approach: **Union by Size**. 

Instead of tracking the "rank" (approximate depth) of each component tree, we track the exact "size" (number of nodes) in each component. 

## Core Logic & Intuition (Union by Size)
The goal of both "Union by Rank" and "Union by Size" is the same: to keep the component trees as flat/shallow as possible so that the `find` operation runs in near-constant time.

**The Strategy:**
1.  **Initialization:** Instead of a `rank` array, we maintain a `size` array. Initially, every node is in its own separate component, meaning the `size` of every component is exactly `1`. Also, every node is its own `parent`.
2.  **The `find` Operation:** This remains exactly the same. We use Path Compression to point every node along the search path directly to the ultimate root leader.
3.  **The `union` Operation:**
    *   Find the ultimate parents of the two nodes: `rootX = find(x)` and `rootY = find(y)`.
    *   If they share the same root, they are already connected. Do nothing.
    *   If they have different roots, we compare the sizes of their components: `size[rootX]` vs. `size[rootY]`.
    *   **The Greedy Choice:** Always attach the *smaller* component under the root of the *larger* component. This minimizes the increase in tree height.
    *   **Size Update:** If we attach the component of `rootY` under `rootX`, the new size of the merged component is the sum of both: `size[rootX] += size[rootY]`.
    *   If sizes are equal, you can arbitrarily choose one to be the parent and update its size identically.

## Java Implementation

```java
class DisjointSetBySize {
    int[] parent;
    int[] size;

    // Constructor to initialize the DSU
    public DisjointSetBySize(int n) {
        parent = new int[n];
        size = new int[n];
        
        for (int i = 0; i < n; i++) {
            parent[i] = i;  // Every node is its own parent initially
            size[i] = 1;    // The size of every component is initially 1
        }
    }

    // Find with Path Compression
    public int find(int i) {
        if (parent[i] == i) {
            return i;
        }
        // Path Compression: directly link node to the ultimate root
        return parent[i] = find(parent[i]); 
    }

    // Union by Size
    public void unionBySize(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        
        // If they already belong to the same component, no union is needed
        if (rootI == rootJ) {
            return;
        }
        
        // Attach the smaller component under the larger component
        if (size[rootI] > size[rootJ]) {
            parent[rootJ] = rootI;            // rootI becomes the parent
            size[rootI] += size[rootJ];       // Increase size of rootI's component
        } else if (size[rootI] < size[rootJ]) {
            parent[rootI] = rootJ;            // rootJ becomes the parent
            size[rootJ] += size[rootI];       // Increase size of rootJ's component
        } else {
            // If sizes are equal, arbitrarily attach one to the other
            parent[rootJ] = rootI;
            size[rootI] += size[rootJ];
        }
    }
}
```
# Graph Concepts & Qns - 40: Euler Path | Euler Circuit | PART-1

**Video Link:** [Euler Path | Euler Circuit | PART-1 | Graph Concepts & Qns - 40 | Explanation+Code](https://youtu.be/CeO0JEX4QAc)  
**Channel:** codestorywithMIK  

## Overview
This video introduces the foundational graph theory concepts of **Eulerian Paths** and **Eulerian Circuits** (also known as Eulerian Cycles). It focuses purely on the theoretical definitions, conditions for existence, and distinguishing properties of these structures. *Note: Algorithmic implementations are reserved for Part 2.*

## 1. Eulerian Path
An **Eulerian Path** (or Euler Path) is a path in a graph that visits every edge exactly once.

### Key Properties & Conditions:
*   **Edge constraint:** Every edge must be visited exactly once.
*   **Vertex constraint:** Vertices *can* be visited multiple times.
*   **Start/End constraint:** The starting vertex and ending vertex are **different**.
*   **Degree constraint:** For an Eulerian Path to exist in a connected, undirected graph, there must be **exactly two vertices with an odd degree**. All other vertices must have an even degree.
    *   *Why?* The start and end vertices act as sources and sinks. Every other intermediate node must have a way in and a way out, thus requiring edges in pairs (even degree).
*   **Choice of Start Node:** You *cannot* arbitrarily pick any node to start an Eulerian Path. You **must** start at one of the two vertices that have an odd degree (and you will inevitably end at the other odd-degree vertex).

## 2. Eulerian Circuit (Eulerian Cycle)
An **Eulerian Circuit** is a special type of Eulerian Path that starts and ends on the exact same vertex.

### Key Properties & Conditions:
*   **Edge constraint:** Every edge must be visited exactly once.
*   **Vertex constraint:** Vertices can be visited multiple times.
*   **Start/End constraint:** The starting vertex and ending vertex are **the same** (`start == end`).
*   **Degree constraint:** For an Eulerian Circuit to exist in a connected, undirected graph, **every single vertex must have an even degree**. 
    *   *Why?* Because you start and finish at the same node, every node (including the start node) must be entered and exited. Therefore, edges attached to any vertex must exist in pairs.
*   **Choice of Start Node:** If a graph contains an Eulerian Circuit, you can start the traversal from **any** arbitrary node and you will be guaranteed to traverse all edges exactly once and return to that starting node.

## 3. Graph Classifications based on Euler Properties
1.  **Eulerian Graph:** A graph is Eulerian if it contains an Eulerian Circuit. (All vertices have an even degree).
2.  **Semi-Eulerian Graph:** A graph is Semi-Eulerian if it contains an Eulerian Path but *not* an Eulerian Circuit. (Exactly two vertices have an odd degree, and the rest are even).
3.  **Non-Eulerian Graph:** A graph is Non-Eulerian if it contains neither an Eulerian Path nor an Eulerian Circuit. (More than two vertices have an odd degree).

## 4. Fundamental Pre-condition: Connectivity
For a graph to possess either an Eulerian Path or an Eulerian Circuit, a fundamental connectivity rule applies:
*   **Connectivity Rule:** All vertices that have a **non-zero degree** must belong to a single connected component.
*   If a graph consists of multiple disconnected components, but only *one* component has edges (the other components are just isolated, 0-degree vertices), the graph can still be Eulerian. 
*   If a graph has *two or more* disconnected components that contain edges, an Eulerian Path/Circuit is impossible, as you cannot traverse from the edges of one component to the edges of another.
