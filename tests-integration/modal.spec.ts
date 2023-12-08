import { expect, test } from '@playwright/test';
import { getFruits, resetFruits, setDelay } from '../src/routes/utils-testing.js';

test.beforeAll(() => setDelay(2))

test.describe('modal', () => {

	test.beforeEach(async ({ page }) => {
		resetFruits()
		await page.goto('/modal');
		await page.getByTestId('open_dialog').first().click()
	})

	test('should accept valid input, show loading, close modal, and add to list', async ({ page }) => {
		const ADDED_FRUIT = 'not in the list'
		await page.fill('input[name="name"]', ADDED_FRUIT);
		await page.click('button[type="submit"]');

		await expect(page.getByRole('button').first()).toHaveAttribute('aria-busy', 'true')

		await page.waitForFunction(() => document.querySelector('[aria-busy="false"]'));

		await expect(page.getByRole('button').first()).not.toHaveAttribute('aria-busy', 'true')

		await expect(page.getByRole('dialog')).not.toBeVisible()

		await expect(page.getByTestId('fruit_list_item').last()).toContainText(ADDED_FRUIT)
	})

	test('should reject duplicated fruit, show loading, stop loading and show error', async ({ page }) => {
		const ADDED_FRUIT = getFruits()[0].name
		await page.fill('input[name="name"]', ADDED_FRUIT);
		await page.click('button[type="submit"]');

		await expect(page.getByRole('button').first()).toHaveAttribute('aria-busy', 'true')

		await page.waitForFunction(() => document.querySelector('[aria-busy="false"]'));

		await expect(page.getByRole('button').first()).not.toHaveAttribute('aria-busy', 'true')

		await expect(page.getByRole('dialog')).toBeVisible()

		await expect(page.getByTestId('warn_fail').first()).toBeVisible()

		await expect(page.getByTestId('fruit_list_item').last()).not.toContainText(ADDED_FRUIT)
	})

	test('should reject fruit when is too short, do not show loading and show error', async ({ page }) => {
		const ADDED_FRUIT = 'aaa'
		await page.fill('input[name="name"]', ADDED_FRUIT);
		await page.click('button[type="submit"]');

		await expect(page.getByRole('button').first()).not.toHaveAttribute('aria-busy', 'true')

		await expect(page.getByRole('dialog')).toBeVisible()

		await expect(page.getByTestId('warn_name').first()).toBeVisible()

		await expect(page.getByTestId('fruit_list_item').last()).not.toContainText(ADDED_FRUIT)
	})


	test('should reject fruit when is too long, do not show loading and show error', async ({ page }) => {
		const ADDED_FRUIT = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
		await page.fill('input[name="name"]', ADDED_FRUIT);
		await page.click('button[type="submit"]');

		await expect(page.getByRole('button').first()).not.toHaveAttribute('aria-busy', 'true')

		await expect(page.getByRole('dialog')).toBeVisible()

		await expect(page.getByTestId('warn_name').first()).toBeVisible()

		await expect(page.getByTestId('fruit_list_item').last()).not.toContainText(ADDED_FRUIT)
	})

})
