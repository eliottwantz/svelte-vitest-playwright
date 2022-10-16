import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/svelte'
import { describe, expect, test } from 'vitest'

import Counter from './Counter.svelte'

describe('Counter', () => {
  test('shows proper heading when rendered', () => {
    const { container } = render(Counter, { count: 2 })
    const button = container.querySelector('button')
    expect(button).toBeDefined()
  })

  // Note: This is as an async test as we are using `fireEvent`
  test('changes button text on click', async () => {
    const { container } = render(Counter, { count: 2 })

    const button: HTMLButtonElement = container.querySelector('button')

    // Using await when firing events because we have to wait
    // for the next `tick` so that Svelte flushes all pending state changes.
    await fireEvent.click(button)

    expect(button.innerHTML).toEqual('count is 3')
  })
})
