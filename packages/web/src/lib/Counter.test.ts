import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/svelte'
import { describe, expect, test } from 'vitest'

import Counter from './Counter.svelte'

describe('Counter', () => {
  test('shows proper heading when rendered', () => {
    const { container } = render(Counter, { count: 34 })
    const button = screen.getByRole('button')
    expect(button).toBeDefined()
    const counterText = container.querySelector('span')
    expect(counterText).toBeDefined()
    expect(counterText.innerHTML).toEqual('count is 34')
  })

  // Note: This is as an async test as we are using `fireEvent`
  test('changes button text on click', async () => {
    const { container } = render(Counter, { count: 2 })

    const button: HTMLButtonElement = container.querySelector('button')
    const value = screen.getByTestId('value')

    // Using await when firing events because we have to wait
    // for the next `tick` so that Svelte flushes all pending state changes.
    await fireEvent.click(button)

    expect(value.innerHTML).toEqual('count is 3')
  })
})
