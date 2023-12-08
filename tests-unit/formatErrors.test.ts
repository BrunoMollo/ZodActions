import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { formatErrors } from '../src/lib/utils/formatErrors'

describe('formatErrors()', () => {

  describe('simple object with a string and a number', () => {
    const INVALID_TYPE_STR_ERROR = "it is not a string"
    const MIN_STR_ERROR = 'string its below the minimum lenght'
    const MAX_STR_ERROR = 'string its above the minimum lenght'

    const INVALID_TYPE_NUM_ERROR = "it is not a number"
    const MIN_NUM_ERROR = 'number its below the minimum lenght'
    const MAX_NUM_ERROR = 'number its above the minimum lenght'
    const REQUIRED = 'Required'
    const schema = z.object({
      name: z.string({ invalid_type_error: INVALID_TYPE_STR_ERROR })
        .min(3, MIN_STR_ERROR)
        .max(6, MAX_STR_ERROR),
      age: z.number({ invalid_type_error: INVALID_TYPE_NUM_ERROR })
        .min(0, MIN_NUM_ERROR)
        .max(100, MAX_NUM_ERROR)
    })

    type Case = { desc: string, input: any, expectedOutput: { name?: string, age?: string } }
    const cases: Case[] = [
      {
        desc: 'valid object',
        input: { name: '123456', age: 20 },
        expectedOutput: {}
      },
      {
        desc: 'short string',
        input: { name: '12', age: 27 },
        expectedOutput: { name: MIN_STR_ERROR }
      },
      {
        desc: 'long string',
        input: { name: '1234567890', age: 23 },
        expectedOutput: { name: MAX_STR_ERROR }
      },
      {
        desc: 'empty string',
        input: { name: '', age: 20 },
        expectedOutput: { name: MIN_STR_ERROR }
      },
      {
        desc: 'null string',
        input: { name: null, age: 20 },
        expectedOutput: { name: INVALID_TYPE_STR_ERROR }
      },
      {
        desc: 'small age',
        input: { name: 'valid', age: 1 },
        expectedOutput: { age: MIN_NUM_ERROR }
      },
      {
        desc: 'big age',
        input: { name: 'valid', age: 200 },
        expectedOutput: { age: MAX_NUM_ERROR }
      },
      {
        desc: 'zero age',
        input: { name: 'valid', age: 0 },
        expectedOutput: { age: MIN_NUM_ERROR }
      },
      {
        desc: 'zero age',
        input: { name: 'valid', age: 0 },
        expectedOutput: { age: MIN_NUM_ERROR }
      },
      {
        desc: 'zero age',
        input: { name: 'valid', age: 0 },
        expectedOutput: { age: MIN_NUM_ERROR }
      },
      {
        desc: 'age as a string',
        input: { name: 'valid', age: '18' },
        expectedOutput: { age: INVALID_TYPE_NUM_ERROR }
      },
      {
        desc: 'NaN age',
        input: { name: 'valid', age: NaN },
        expectedOutput: { age: INVALID_TYPE_NUM_ERROR }
      },
      {
        desc: 'missing age',
        input: { name: 'valid' },
        expectedOutput: { age: REQUIRED }
      },
      {
        desc: 'missing name',
        input: { age: 40 },
        expectedOutput: { name: REQUIRED }
      },
      {
        desc: 'both missing',
        input: {},
        expectedOutput: { name: REQUIRED, age: REQUIRED }
      },
    ]

    for (let { desc, input, expectedOutput } of cases) {
      it(desc, () => {
        const res = schema.safeParse(input)
        if (res.success) return

        const formated = formatErrors(res)
        //@ts-ignore
        expect(formated.name).to.equals(expectedOutput.name)
        //@ts-ignore
        expect(formated.age).to.equals(expectedOutput.age)
      });
    }

  })


})

