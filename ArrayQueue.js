export default class ArrayQueue {
    constructor() {
        this.element = [];
        this.length = 0
        this.frontIndex = 0
        this.backIndex = -1
    }
    
    isEmpty() {
        return (this.length == 0)
    }
    
    /**
     * Increment the back index and assign value in element array
     * Increase the queue length 
     * @param {*} value 
     */
    enqueue(value) {
        this.backIndex++
        this.element[this.backIndex] = value
        this.length++
    }
    
    /**
     * Get the front element which is waiting first 
     * in the queue and return back the value
     * While dequeue set the front element value as null,   
     * since its removed from queue
     * Decrease the length as element moves away from the queue
     * @param {*} value 
     */
    dequeue() {
        if(this.isEmpty()) throw(new Error("No elements"))
        const value = this.getFront()
        this.element[this.frontIndex] = null
        this.frontIndex++
        this.length--
        return value
    }
    
    /**
     * Get the front element which is waiting first in the queue
     * and return back the value
     */
    getFront() {
        if(this.isEmpty()) throw(new Error("No elements"))        
        return this.element[this.frontIndex]
    }
    
    clear() {
        this.element = []
        this.length = 0
        this.backIndex = 0
        this.frontIndex = -1
    }
}