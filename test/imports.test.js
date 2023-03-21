/* 

Check that component imports work

*/

describe('import vue components', () => {
    test('normal imports as expected', async () => {
      const listComp = await import('../src/components/List.vue')
      expect(listComp).toBeDefined()
      const bookcmp = await import('../src/components/Book.vue')
      expect(bookcmp).toBeDefined()
    })
  
    test('template string imports as expected', async () => {
      // eslint-disable-next-line @typescript-eslint/quotes
      const cmp = await import(`../src/components/List.vue`)
      expect(cmp).toBeDefined()
    })
  
    test('dynamic imports as expected', async () => {
      const name = 'List'
      const cmp = await import(`../src/components/${name}.vue`)
      expect(cmp).toBeDefined()
    })
  })
  