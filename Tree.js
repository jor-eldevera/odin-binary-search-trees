import Node from "./Node.js";

export default class Tree {
    constructor(value) {
        if (value === undefined) {
            this.root = new Node(null);
        } else {
            this.root = new Node(value);
        }
    }
}