import { mount } from "@vue/test-utils";
import { expect } from "vitest";
import Search from "../src/components/Search.vue";

describe('Import vue component', () => {
    test('Normal import as expected', async () => {
      const cmp = await import('../src/components/Search.vue')
      expect(cmp).toBeDefined()
    })
  
    test('Template string imports as expected', async () => {
      // eslint-disable-next-line @typescript-eslint/quotes
      const cmp = await import(`../src/components/Search.vue`)
      expect(cmp).toBeDefined()
    })
  
    test('Dynamic imports as expected', async () => {
      const name = 'Search'
      const cmp = await import(`../src/components/${name}.vue`)
      expect(cmp).toBeDefined()
    })
  })
  