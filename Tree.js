import Node from "./Node.js";
import ArrayQueue from "./ArrayQueue.js";

export default class Tree {
    constructor(value) {
        if (value === undefined) {
            this.root = new Node(null);
        } else {
            this.root = new Node(value);
        }
    }

    buildTree(array) {
        // Sort array
        array.sort(function (a, b) {
            return a - b;
        });

        // Remove duplicates
        let noDuplicates = [...new Set(array)];

        // call sortedArrayToBST
        this.root = this.sortedArrayToBST(noDuplicates, 0, noDuplicates.length - 1)
    }

    sortedArrayToBST(array, start, end) {
        /* Base Case */
        if (start > end)
        {
            return null;
        }

        /* Get the middle element and make it root */
        var mid = Math.floor((start + end) / 2);
        var node = new Node(array[mid]);

        /* Recursively construct the left subtree and make it
         left child of root */
        node.left = this.sortedArrayToBST(array, start, mid - 1);

        /* Recursively construct the right subtree and make it
         right child of root */
        node.right = this.sortedArrayToBST(array, mid + 1, end);

        return node;
    }

    insert(key) {
        this.root = this.insertRec(this.root, key);
    }

    insertRec(root, key) {
        /*
         * If the tree is empty, return a new node
         */
        if (root == null) {
            root = new Node(key);
            return root;
        }
        
        /* Otherwise, recur down the tree */
        if (key < root.value) {
            root.left = this.insertRec(root.left, key);
        } else if (key > root.value) {
            root.right = this.insertRec(root.right, key);
        }
 
        /* return the (unchanged) node pointer */
        return root;
    }

    delete(key) {
        this.root = this.deleteRec(this.root, key);
    }

    deleteRec(root, key) {
        /* Base Case: If the tree is empty */
        if (root == null)
            return root;
  
        /* Otherwise, recur down the tree */
        if (key < root.value)
            root.left = this.deleteRec(root.left, key);
        else if (key > root.value)
            root.right = this.deleteRec(root.right, key);
  
        // if key is same as root's
        // key, then This is the
        // node to be deleted
        else {
            // node with only one child or no child
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;
  
            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            root.value = this.minValue(root.right);
  
            // Delete the inorder successor
            root.right = this.deleteRec(root.right, root.value);
        }
  
        return root;
    }

    minValue(root) {
        let minv = root.value;
        while (root.left != null)
        {
            minv = root.left.value;
            root = root.left;
        }
        return minv;
    }

    find(key) {
        return this.searchRec(this.root, key);
    }

    searchRec(root, key) {
        // Base Cases: root is null
        // or key is present at root
        if (root == null || root.value == key)
            return root;
 
        // Key is greater than root's key
        if (root.value < key)
           return this.searchRec(root.right, key);
 
        // Key is smaller than root's key
        return this.searchRec(root.left, key);
    }

    levelOrder(func) {
        if (func === undefined) {
            let array = []
            let queue = new ArrayQueue();
            queue.enqueue(this.root);
            while (!queue.isEmpty()) {
                let current = queue.getFront();
                array.push(current.value);
                if (current.left !== null) {
                    queue.enqueue(current.left);
                }
                if (current.right !== null) {
                    queue.enqueue(current.right);
                }
                queue.dequeue();
            }
            return array;
        }

        if (typeof func !== "function") {
            console.error("levelOrder: passed parameter func must be a function");
            return;
        }

        let queue = new ArrayQueue();
        queue.enqueue(this.root);
        while (!queue.isEmpty()) {
            let current = queue.getFront();
            func(current);
            if (current.left !== null) {
                queue.enqueue(current.left);
            }
            if (current.right !== null) {
                queue.enqueue(current.right);
            }
            queue.dequeue();
        }
    }

    /**
     * Traverses the tree in inorder fashion
     * @param {Function} func 
     * @returns an array if func is not provided
     */
    inOrder(func) {
        if (func === undefined) {
            let array = [];
            this.inOrderWithArray(this.root, array);
            return array;
        }

        if (typeof func !== "function") {
            console.error("inOrder: passed parameter func must be a function");
            return;
        }

        this.inOrderWithFunction(this.root, func);
    }

    inOrderWithArray(node, array) {
        if (node === null) {
            return;
        }

        this.inOrderWithArray(node.left, array);
        array.push(node.value);
        this.inOrderWithArray(node.right, array);
    }
    
    inOrderWithFunction(node, func) {
        if (node === null) {
            return;
        }

        this.inOrderWithFunction(node.left, func);
        func(node);
        this.inOrderWithFunction(node.right, func);
    }

    preOrder(func) {
        if (func === undefined) {
            let array = [];
            this.preOrderWithArray(this.root, array);
            return array;
        }

        if (typeof func !== "function") {
            console.error("preOrder: passed parameter func must be a function");
            return;
        }

        this.preOrderWithFunction(this.root, func);
    }

    preOrderWithArray(node, array) {
        if (node === null) {
            return;
        }

        array.push(node.value);
        this.preOrderWithArray(node.left, array);
        this.preOrderWithArray(node.right, array);
    }
    
    preOrderWithFunction(node, func) {
        if (node === null) {
            return;
        }

        func(node);
        this.preOrderWithFunction(node.left, func);
        this.preOrderWithFunction(node.right, func);
    }

    postOrder(func) {
        if (func === undefined) {
            let array = [];
            this.postOrderWithArray(this.root, array);
            return array;
        }

        if (typeof func !== "function") {
            console.error("postOrder: passed parameter func must be a function");
            return;
        }

        this.postOrderWithFunction(this.root, func);
    }

    postOrderWithArray(node, array) {
        if (node === null) {
            return;
        }

        this.postOrderWithArray(node.left, array);
        this.postOrderWithArray(node.right, array);
        array.push(node.value);
    }
    
    postOrderWithFunction(node, func) {
        if (node === null) {
            return;
        }

        this.postOrderWithFunction(node.left, func);
        this.postOrderWithFunction(node.right, func);
        func(node);
    }

    height(node) {
        if (node === null) {
            return -1;
        }
        let left = this.height(node.left);
        let right = this.height(node.right);

        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }

    depth(node) {
        return this.depthRec(this.root, node);
    }

    depthRec(root, goalNode) {
        // Base case
        if (root === null) {
            return -1;
        }
    
        // Initialize distance as -1
        var dist = -1;
    
        // Check if x is current node=
        if ((root.value === goalNode.value)|| 
        
            // Otherwise, check if x is
            // present in the left subtree
            (dist = this.depthRec(root.left, goalNode)) >= 0 || 
            
            // Otherwise, check if x is
            // present in the right subtree
            (dist = this.depthRec(root.right, goalNode)) >= 0)
    
            // Return depth of the node
            return dist + 1;
            
        return dist;
    }

    isBalanced() {
        if (this.isBalancedRec(this.root) > 0) {
            return true;
        } else {
            return false;
        }
    }

    isBalancedRec(root) {
        if (root == null)
                return 0;
            let lh = this.isBalancedRec(root.left);
            if (lh == -1)
                return -1;
            let rh = this.isBalancedRec(root.right);
            if (rh == -1)
                return -1;
    
            if (Math.abs(lh - rh) > 1) {
                return -1;
            } else {
                return Math.max(lh, rh) + 1;
            }
    }

    rebalance() {
        // Make the tree into an array
        let array = this.inOrder();

        // Send it to buildTree()
        this.buildTree(array);
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    prettyPrintSelf() {
        this.prettyPrint(this.root);
    }
}