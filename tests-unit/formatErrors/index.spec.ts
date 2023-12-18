import { describe } from "vitest";
import { object_with_a_string_and_a_number } from "./object_with_a_string_and_a_number";
import { object_with_array } from "./object_with_array";

describe('tests formatErrors()', () => {
  object_with_a_string_and_a_number()
  object_with_array()
})
