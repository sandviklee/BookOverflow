import { mount } from '@vue/test-utils'
import List from '../components/List.vue'

test('mount component', async () => {
  expect(List).toBeTruthy()

  const wrapper = mount(List, {
    props: {
      count: 4,
    },
  })

//   expect(wrapper.text()).toContain('4 x 2 = 8')
//   expect(wrapper.html()).toMatchSnapshot()

//   await wrapper.get('button').trigger('click')

//   expect(wrapper.text()).toContain('4 x 3 = 12')

//   await wrapper.get('button').trigger('click')

//   expect(wrapper.text()).toContain('4 x 4 = 16')
})
