type CacheEntry<T> = { 
    createdAt : number, 
    val : T 
}

export class Cache{
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
     #interval: number;

    constructor(n: number){
        this.#interval = n ;
        this.#startReapLoop() ;
    }

    add<T>(key: string, value: T){
        this.#cache.set(key, {createdAt: Date.now(), val: value});
    };

    get<T>(key: string){
        if(this.#cache.has(key)){
            return this.#cache.get(key)?.val ;
        }
        return undefined ; 
    }

    #reap(){
        const cutoff = Date.now() - this.#interval; 
        for(const [k,o] of this.#cache){
            if(o.createdAt <= cutoff ){
                this.#cache.delete(k)
            }
        };
    }

    #startReapLoop(){

        if(this.#reapIntervalId || this.#interval <= 0){
            return ; 
        };
        const intervalHandle = setInterval(()=>{
            this.#reap(); 
        }, this.#interval);
        this.#reapIntervalId = intervalHandle ; 
    }

    stopReapLoop(){
        if(this.#reapIntervalId){
            clearInterval(
                this.#reapIntervalId
            );
            this.#reapIntervalId = undefined ; 
        }
    }

    


}