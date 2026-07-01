class DynamicArray{
    #arr;
    #size;
    #capacity;
    #GROWTH;
    #fill;

    constructor(capacity = 8,fill = 0){
        if(!Number.isInteger(capacity) || !Number.isInteger(fill)) throw new Error('Must be an integer number.');
        if(capacity <= 0) throw new Error('Capacity must be an integer number');

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
    at(index){
        if(!Number.isInteger(index)) throw new Error('Index Must be an integer number.');
        if(index < 0 || index >= this.#size) throw new Error('Index error');
        return this.#arr[index];
    }
    set(index,value){
        if(!Number.isInteger(index)) throw new Error('Index Must be an integer number.');
        if(index < 0 || index >= this.#size) throw new Error('Index error');
        if(!Number.isInteger(value)) throw new Error('Value Must be an integer number.');
        this.#arr[index] = value
    }
    insert(index,value){
        if(!Number.isInteger(index)) throw new Error('Index Must be an integer number.');
        if(index < 0 || index > this.#size) throw new Error('Index error');
        if(!Number.isInteger(value)) throw new Error('Value Must be an integer number.');
        if(this.#capacity === this.#size){
            let newCap = this.#capacity * this.#GROWTH;
            this.#resize(newCap);
        }
        for(let i = this.#size - 1;i >= index ;i++){
            this.#arr[i] = this.#arr[i - 1];
        }
        this.#arr[index] = value;
        ++this.#size;
    }
    #resize(newCap){
        if(!Number.isInteger(newCap)) throw new Error('Must be an integer number.');
        if(newCap <= 0) throw new Error('must be a positive number');
        if(newCap < this.#size) throw new Error('must be larger than size');

        let newArr = new Int32Array(newCap);

        for(let i = 0;i < this.#size;i++){
            newArr[i] = this.#arr[i];
        }
        this.#capacity = newCap;
        this.#arr = newArr;
    }
    front(){
        if(this.isEmpty()) return -1;
        return this.#arr[0];
    }
    back(){
        if(this.isEmpty()) return -1;
        return this.#arr[this.#size - 1];
    }
    pushBack(value){
        if(!Number.isInteger(value)) throw new Error('Value Must be an integer number.');
        if(this.#size === this.#capacity){
            let newCap = this.#capacity * this.#GROWTH;
            this.#resize(newCap)
        }
        this.#arr[this.#size++] = value;
    }
    popBack(){
        if(this.isEmpty()) return -1;
        let tmp = this.#arr[--this.#size];
        this.#arr[this.#size] = this.#fill;
        return tmp;
    }
    toArray(){
        let newArray = new Int32Array(this.#size);
        for(let i = 0 ;i < this.#size;i++){
            newArray[i] = this.#arr[i];
        }
        return newArray;
    }
    toString(){
        return this.toArray();
    }
    *enteris(){
        for(let i = 0;i < this.#size;i++){
            yield [i,this.#arr[i]];
        }
    }
    reverse(){
        let i = 0;
        let j = this.#size - 1;
        while(i < j){
            this.swap(i++,j--);
        }
    }
    swap(i,j){
        if(i >= 0 && i < this.#size && j >= 0 && j < this.#size){
            [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
        }
    }
    [Symbol.iterator](){
        let i = 0;
        return {
            next : () => {
                if(i < this.#size) return { value : this.#arr[i++] , done : false };
                return { value : undefined, done : true };
            }
        }
    }
    sort(compareFn){
        if(this.isEmpty()) throw new Error('Array is Empty!');
        const partionLast = (left,right) => {
            let pivot = this.#arr[right];
            let i = left - 1
            for(let j = 0;j < right;++j){
                if(compareFn(this.#arr[j],pivot) < 0){
                    this.swap(++i,j);
                }
            }
            this.swap(i + 1,right);
            return i + 1;
        }
        const quickSort = (left,right) => {
            if(left < right){
                let pi = partionLast(left,right)
                quickSort(left,pi - 1);
                quickSort(pi + 1,right);
            }
        }
        quickSort(0,this.#size - 1);
   }
}


