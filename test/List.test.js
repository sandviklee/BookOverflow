import { mount } from "@vue/test-utils";
import { expect } from "vitest";
import List from "../src/components/List.vue";

test("mount component", async () => {
  expect(List).toBeTruthy();

  const wrapper = mount(List, {
    props: {
      listName: "list name",
    },
  });

    expect(wrapper.text()).toContain('list name')
    expect(wrapper.text()).not.toContain(1)
  //   expect(wrapper.html()).toMatchSnapshot()

  //   await wrapper.get('button').trigger('click')

  //   expect(wrapper.text()).toContain('4 x 3 = 12')

  //   await wrapper.get('button').trigger('click')

  //   expect(wrapper.text()).toContain('4 x 4 = 16')
});
