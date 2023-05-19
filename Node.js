export default class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    setValue(value) {
        this.value = value
    }

    setLeft(node) {
        this.left = node;
    }

    setRight(node) {
        this.right = node;
    }

    getValue() {
        return this.value;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }
}