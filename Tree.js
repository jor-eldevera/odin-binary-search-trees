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
        this.prettyPrint(this.sortedArrayToBST(noDuplicates, 0, noDuplicates.length - 1));
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