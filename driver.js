import Tree from "./Tree.js";

function generateRandomArray(n) {
    let randomArray = [];
  
    for (let i = 0; i < n; i++) {
      let randomNum = Math.floor(Math.random() * 101);
      randomArray.push(randomNum);
    }
  
    return randomArray;
}

let tree = new Tree();
let nums = generateRandomArray(10);
tree.buildTree(nums);
console.log("tree:");
tree.prettyPrintSelf();
console.log("Tree is balanced: " + tree.isBalanced());

console.log("preorder: " + tree.preOrder());
console.log("postorder: " + tree.postOrder());
console.log("inorder: " + tree.inOrder());

console.log("unbalancing tree...");
tree.insert(101);
tree.insert(105);
tree.insert(103);
console.log("tree:");
tree.prettyPrintSelf();

console.log("Tree is balanced: " + tree.isBalanced());
console.log("balancing tree...");
tree.rebalance();
console.log("tree:");
tree.prettyPrintSelf();

console.log("preorder: " + tree.preOrder());
console.log("postorder: " + tree.postOrder());
console.log("inorder: " + tree.inOrder());