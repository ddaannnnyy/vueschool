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
  describe('End of game messages', () => {
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
  })
  describe('rules for defining word of the day', () => {
    test.each(['FLY', 'hello', 'QWERT'])(
      'if invalid word of the day is provided - this test is testing %s - display a warning',
      async (wordOfTheDay) => {
        // const spy = vi.spyOn(console, 'warn')
        // spy.mockImplementation(() => null)
        // alternative syntax vvv
        console.warn = vi.fn()
        mount(WordleBoard, { props: { wordOfTheDay } })

        expect(console.warn).toHaveBeenCalled()
      }
    )
    test('no warning is needed if word provided is valid', async () => {
      console.warn = vi.fn()
      mount(WordleBoard, { props: { wordOfTheDay: 'TESTS' } })
      expect(console.warn).not.toHaveBeenCalled()
    })
  })
  describe('player inputs', () => {
    test.todo('player guesses are limited to 5 letters')
    test.todo('player guesses can only be submitted if they are real words')
    test.todo('player guesses are not case-sensitive')
    test.todo('player guesses can only contain letters')
  })
})
