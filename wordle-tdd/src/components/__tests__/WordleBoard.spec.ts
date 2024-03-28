import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings'

describe('WorldBoard', () => {
  const wordOfTheDay = 'TESTS'
  let wrapper: ReturnType<typeof mount>
  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
  })
  async function playerSubmitsGuess(guess: string) {
    const guessInput = wrapper.find('input[type=text]')
    await guessInput.setValue(guess)
    await guessInput.trigger('keydown.enter')
  }
  test('a victory message appears when the user makes a guess that matches the word of the day', async () => {
    await playerSubmitsGuess(wordOfTheDay)

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })
  test('a defeat message appears if the user makes a guess that is incorrect', async () => {
    await playerSubmitsGuess('WRONG')

    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })
  test('no end-of-game message appears if the user has not yet made a guess', async () => {
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })
  test('if a word of the day is provided and does not have 5 characters, display a warning', async () => {
    // const spy = vi.spyOn(console, 'warn')
    // spy.mockImplementation(() => null)
    // alternative syntax vvv
    console.warn = vi.fn()
    mount(WordleBoard, { props: { wordOfTheDay: 'FLY' } })

    expect(console.warn).toHaveBeenCalled()
  })
  test('if word of the day is not in uppercase a warning is emitted', async () => {
    console.warn = vi.fn()
    mount(WordleBoard, { props: { wordOfTheDay: 'hello' } })
    expect(console.warn).toHaveBeenCalled()
  })
})
