import '@testing-library/jest-dom'

import { render, fireEvent, screen } from '@testing-library/svelte'

import Counter from './Counter.svelte'

test('shows proper heading when rendered', () => {
  render(Counter, { count: 2 })
  const heading = screen.getByRole('button')
  expect(heading).toBeInTheDocument()
})

// Note: This is as an async test as we are using `fireEvent`
test('changes button text on click', async () => {
  render(Counter, { count: 2 })
  const button = screen.getByRole('button')

  // Using await when firing events is unique to the svelte testing library because
  // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
  await fireEvent.click(button)

  expect(button).toHaveTextContent('3')
})
