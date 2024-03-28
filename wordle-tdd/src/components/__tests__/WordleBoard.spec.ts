import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'

describe('WorldBoard', () => {
  it('renders properly', () => {
    const wrapper = mount(WordleBoard, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
