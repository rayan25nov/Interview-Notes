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

**Video Link:** [Disjoint Set Union By Rank and Path Compression | DSU | Graph Concepts & Qns -19| Explanation+Code](https://youtu.be/iH3XVIVzl7M)  
**Channel:** codestorywithMIK  

## Overview
In the previous video, we learned the basic structure of Disjoint Set Union (DSU) using a naive approach. However, the naive approach can lead to skewed, linear trees, making the `find()` operation slow (`O(N)`). 

This video introduces two powerful optimizations to make DSU nearly constant time (`O(1)`): **Path Compression** and **Union by Rank**.

---

## 1. Path Compression
When you call `find(x)`, you traverse all the way up the tree to find the ultimate representative (leader). 
*   **The Optimization:** As you backtrack from the leader during the recursive `find` call, you can directly attach every node along that path straight to the leader (`parent[node] = root`).
*   **The Benefit:** The next time you search for any of those nodes, you can find the leader in `O(1)` time because the tree is flattened.

### Optimized Find Implementation in Java
```java
public int find(int i, int[] parent) {
    if (parent[i] == i) {
        return i;
    }
    // Path Compression: point the node directly to the root during return
    return parent[i] = find(parent[i], parent);
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



