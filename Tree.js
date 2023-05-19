import Node from "./Node.js";

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
}