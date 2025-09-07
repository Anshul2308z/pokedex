
--- S I D E    N O T E S --- 

 <!--from : repl.test.ts  -->

Here’s what happens “after the array of test cases is closed”:

    describe.each([...]) takes your array of cases and, for each item, invokes the inner describe block with that item’s fields available to the callback.
    The string template "cleanInput($input)" names each sub-suite using the current case’s input.
    The callback ({ input, expected }) destructures the current case.
    Inside test(...), you:
        call cleanInput(input) to get actual
        assert length matches
        loop indices of expected and assert each item equals.

Two small fixes to keep things tidy:

    Import named, not default:
        TypeScript: import { cleanInput } from "./repl";
    Prefer a numeric loop or for...of with index to avoid for...in pitfalls:

import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  { input: "  hello world  ", expected: ["hello", "world"] },
  { input: "  hello Anshul  ", expected: ["hello", "anshul"] },
  { input: "  hello    MR.fool  ", expected: ["hello", "mr.fool"] },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

Want me to quiz you on describe.each or help verify your cleanInput implementation?
