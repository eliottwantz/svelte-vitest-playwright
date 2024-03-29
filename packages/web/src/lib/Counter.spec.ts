import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest'
import { preview } from 'vite'
import type { PreviewServer } from 'vite'
import type { Browser, Page } from '@playwright/test'
import { expect, chromium } from '@playwright/test'

describe('basic', async () => {
  let server: PreviewServer
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    server = await preview({ preview: { port: 3000 } })
    browser = await chromium.launch()
    page = await browser.newPage()
  })

  beforeEach(async () => {
    await page.goto('http://localhost:3000')
  })

  afterAll(async () => {
    await browser.close()
    await new Promise<void>((resolve, reject) => {
      server.httpServer.close((error) => (error ? reject(error) : resolve()))
    })
  })

  test('shows proper heading when rendered', async () => {
    const button = page.locator('button')
    expect(button).toBeDefined()

    const counterText = page.locator('span')
    expect(counterText).toBeDefined()

    await expect(counterText).toHaveText('count is 2')
  })

  test('changes button text on click', async () => {
    const button = page.locator('button')
    expect(button).toBeDefined()

    const counterText = page.locator('span')
    expect(counterText).toBeDefined()

    await button.click()

    await expect(counterText).toHaveText('count is 3')
  })
})
