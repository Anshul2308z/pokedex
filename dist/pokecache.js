export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(n) {
        this.#interval = n;
        this.#startReapLoop();
    }
    add(key, value) {
        this.#cache.set(key, { createdAt: Date.now(), val: value });
    }
    ;
    get(key) {
        if (this.#cache.has(key)) {
            return this.#cache.get(key)?.val;
        }
        return undefined;
    }
    #reap() {
        const cutoff = Date.now() - this.#interval;
        for (const [k, o] of this.#cache) {
            if (o.createdAt <= cutoff) {
                this.#cache.delete(k);
            }
        }
        ;
    }
    #startReapLoop() {
        if (this.#reapIntervalId || this.#interval <= 0) {
            return;
        }
        ;
        const intervalHandle = setInterval(() => {
            this.#reap();
        }, this.#interval);
        this.#reapIntervalId = intervalHandle;
    }
    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}
