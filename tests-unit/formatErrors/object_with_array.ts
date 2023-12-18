import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { formatErrors } from '../../src/lib/utils/formatErrors'

export function object_with_array() {

  const INVALID_TYPE_STR_ERROR = "it is not a string"
  const MIN_STR_ERROR = 'string its below the minimum lenght'
  const MAX_STR_ERROR = 'string its above the minimum lenght'
  const EMPTY_ERROR = 'this is empty'


  describe('object with array', () => {
    const schema = z.object({
      tasks: z.object({
        text: z.string({ invalid_type_error: INVALID_TYPE_STR_ERROR })
          .min(3, MIN_STR_ERROR)
          .max(15, MAX_STR_ERROR)
      }).array().nonempty(EMPTY_ERROR)
    })


    it('one element with an empty text', () => {
      const input = {
        tasks: [{ text: '' }]
      }
      const res = schema.safeParse(input)
      if (res.success) return

      const formated = formatErrors(res)
      //@ts-ignore
      expect(formated.tasks.in(0, 'text')).to.equals(MIN_STR_ERROR)
      //@ts-ignore
      expect(formated.tasks.in(1, 'text')).to.equals(false)
      //@ts-ignore
      expect(formated.tasks.in(0, 'invalid')).to.equals(false)
      //@ts-ignore
      expect(formated.tasks.in(1.2, 'text')).to.equals(false)
    });


    it('two elements the second have an empty text', () => {
      const input = {
        tasks: [{ text: 'valid :)' }, { text: '' }]
      }
      const res = schema.safeParse(input)
      if (res.success) return

      const formated = formatErrors(res)
      //@ts-ignore
      expect(formated.tasks.in(0, 'text')).to.equals(false)
      //@ts-ignore
      expect(formated.tasks.in(1, 'text')).to.equals(MIN_STR_ERROR)
      //@ts-ignore
      expect(formated.tasks.in(2, 'text')).to.equals(false)
    });


    it('empty array', () => {
      const input = {
        tasks: []
      }
      const res = schema.safeParse(input)
      if (res.success) return

      const formated = formatErrors(res)
      //@ts-ignore
      expect(formated.tasks).to.equals(EMPTY_ERROR)
      //@ts-ignore
      expect(formated.tasks.in(0, 'text')).to.equals(EMPTY_ERROR)
    });

  })

}

