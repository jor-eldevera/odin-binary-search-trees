import Tree from "./Tree.js";

let tree = new Tree();
let nums = [1, 3, 2, 5, 4, 5, 3];
tree.buildTree(nums);
tree.insert(8);
tree.insert(7);
tree.insert(6);
tree.insert(9);
tree.prettyPrintSelf();

tree.delete(8);
tree.prettyPrintSelf();

console.log(tree.find(4));

tree.prettyPrintSelf();
console.log("Level order:");
console.log(tree.levelOrder());
tree.levelOrder(function (node) {
    console.log(node.value);
});

tree.prettyPrintSelf();
console.log("inOrder:");
console.log(tree.inOrder());
tree.inOrder(function (node) {
    console.log(node.value);
});

tree.prettyPrintSelf();
console.log("preOrder:");
console.log(tree.preOrder());
tree.preOrder(function (node) {
    console.log(node.value);
});

tree.prettyPrintSelf();
console.log("postOrder:");
console.log(tree.postOrder());
tree.postOrder(function (node) {
    console.log(node.value);
});

tree.prettyPrintSelf();
let numToBeFound = 4;
console.log("height of " + numToBeFound + " = " 
    + tree.height(tree.find(numToBeFound)));