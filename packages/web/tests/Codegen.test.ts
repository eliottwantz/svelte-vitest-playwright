import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:4174/')

  await page.getByRole('button', { name: 'count is 2' }).click()

  await page
    .getByText('Click on the Vite and Svelte logos to learn more')
    .click()

  await page
    .getByText(
      'Check out SvelteKit, the official Svelte app framework powered by Vite!'
    )
    .dblclick()

  await page.getByRole('button', { name: 'count is 3' }).click()

  await page.getByRole('button', { name: 'count is 4' }).click()

  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'SvelteKit' }).click()
  ])

  await page1.getByRole('link', { name: '@sveltejs/kit' }).click()
  await expect(page1).toHaveURL(
    'https://github.com/sveltejs/kit/tree/master/packages/kit'
  )

  await page.getByRole('button', { name: 'count is 5' }).click()

  const [page2] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Vite Logo' }).click()
  ])
  await expect(page2).toHaveURL('https://vitejs.dev/')
})
