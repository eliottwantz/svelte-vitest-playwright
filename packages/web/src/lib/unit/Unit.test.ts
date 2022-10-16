import { expect, test } from '@playwright/experimental-ct-svelte'
import Counter from '../Counter.svelte'

test.describe('Counter', async () => {
  test('shows proper heading when rendered', async ({ mount }) => {
    const component = await mount(Counter, { props: { count: 34 } })
    await expect(component).toBeVisible()

    const counterText = component.locator('span')
    expect(counterText).toBeDefined()

    await expect(component).toHaveText('count is 34')
  })

  test('changes button text on click', async ({ mount }) => {
    const component = await mount(Counter, { props: { count: 2 } })

    const counterText = component.locator('span')

    await component.click()

    expect(counterText).toHaveText('count is 3')
  })
})
