const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let node = new Node(data);

        if(this._head) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }
        
        this.length++;
        return this;
    }

    head() {
        return (this._head)? this._head.data: null;
    }

    tail() {
        return (this._tail)? this._tail.data: null;
    }

    at(index) {
        let count = 0;
        let item = this._head;
        while(count < index) {
            item = item.next;
            count++;
        }
        return item.data;
    }

    insertAt(index, data) {
        let count = 0;
        let item = this._head;
        let node = new Node(data);

        if (!index) return this.append(data);

        while(count < index-1) {
            item = item.next;
            count++;
        }
        node.prev = item;
        node.next = item.next;
        item.next = node;
        node.next.prev = node;
    
        this.length++;
        
        return this;
    }

    isEmpty() {
        return (!this.length)? true : false;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;

        return this;
    }

    deleteAt(index) {
        let count = 0;
        let item = this._head;

        if(this.length === 1) return this.clear();

        while(count < index-1) {
            item = item.next;
            count++;
        }
        let itemToDelete = item.next;
        item.next = itemToDelete.next;
        itemToDelete.next.prev = item;
        itemToDelete = null;
        this.length--;

        return this;
    }

    reverse() {
        let item = this._head;
        let first = item;
        if(this.length > 1) {
            while(item.next.next !== null) {
                let revers = item.next;
                first.prev = revers;
                item.next = revers.next;
                revers.next.prev = item;
                revers.next = first;
                revers.prev = null;
                first = revers;
            }
            let revers = item.next;
            first.prev = revers;
            item.next = null;
            revers.next = first;
            revers.prev = null;
            first = revers;
        }

        let head = this._head;
        this._head = this._tail;
        this._tail = head;
        
        return this;
    }

    indexOf(data) {
        let item = this._head;
        let count = 0;

        while(item) {
            if(data === item.data) return count;
            item = item.next;
            count++;
        }

        return -1;
    }
}

module.exports = LinkedList;