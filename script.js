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