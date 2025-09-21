
import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache (student version)", () => {
  test.concurrent.each([
    { key: "k1", val: { a: 1 }, interval: 150 },
    { key: "k2", val: "str", interval: 200 },
  ])("add/get and reap after $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    // get returns the stored value (or undefined)
    expect(cache.get<typeof val>(key)).toEqual(val);

    // wait past interval so #reap() removes it
    await new Promise((r) => setTimeout(r, interval + 50));
    expect(cache.get<typeof val>(key)).toBeUndefined();

    cache.stopReapLoop();
  });

  test("get returns undefined for missing key", () => {
    const cache = new Cache(300);
    expect(cache.get("missing")).toBeUndefined();
    cache.stopReapLoop();
  });

  test("stopReapLoop prevents further reaping", async () => {
    const cache = new Cache(100);
    cache.add("k", 42);

    // stop timer before it can reap
    cache.stopReapLoop();

    await new Promise((r) => setTimeout(r, 200));
    // entry should still be there since loop is stopped
    expect(cache.get<number>("k")).toBe(42);
  });
});