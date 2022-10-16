import { expect, test } from '@playwright/test'

test.describe('basic', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('shows proper heading when rendered', async ({ page }) => {
    const button = page.locator('button')
    expect(button).toBeDefined()

    const counterText = page.locator('span')
    expect(counterText).toBeDefined()

    await expect(counterText).toHaveText('count is 2')
  })

  test('changes button text on click', async ({ page }) => {
    const button = page.locator('button')
    expect(button).toBeDefined()

    const counterText = page.locator('span')
    expect(counterText).toBeDefined()

    await button.click()

    await expect(counterText).toHaveText('count is 3')
  })
})
