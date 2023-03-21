import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
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
  
  test("mount component", async () => {
    expect(Search).toBeTruthy();
  
    const wrapper = mount(Search, {
      props: {
      },
    });
    
    // Search.getTopList(5)
    //   expect(wrapper.html()).toMatchSnapshot()
  
    //   await wrapper.get('button').trigger('click')
  
    //   expect(wrapper.text()).toContain('4 x 3 = 12')
  
    //   await wrapper.get('button').trigger('click')
  
    //   expect(wrapper.text()).toContain('4 x 4 = 16')
  });