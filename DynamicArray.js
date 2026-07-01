class DynamicArray{
    #arr;
    #size;
    #capacity;
    #GROWTH;
    #fill;

    constructor(capacity = 8,fill = 0){
        if(!Number.isInteger(capacity) || !Number.isInteger(fill)) throw new Error('Must be an integer number.')
        if(capacity <= 0) throw new Error('Capacity must be an integer number')

        this.#capacity = capacity;
        this.#size = 0;
        this.#GROWTH = 2;
        this.#fill = fill;
        this.#arr = new Int32Array(capacity);
    }

    size(){
        return this.#size;
    }
    capacity(){
        return this.#capacity;
    }
    isEmpty(){
        return this.#size === 0;
    }
    clear(){
        return this.#arr.fill(this.#fill)
    }
}