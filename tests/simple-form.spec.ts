import { expect, test } from '@playwright/test';
import { setDelay } from '../src/routes/utils-testing.js';

test.beforeAll(() => setDelay(2))

test.describe('simple form', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto('/simple-form');
	})

	test('valid input should pass, start loading and stop loading', async ({ page }) => {

		await page.fill('input[name="name"]', 'your_username');
		await page.fill('input[name="age"]', '32');
		await page.click('button[type="submit"]');

		await expect(page.getByRole('button')).toHaveAttribute('aria-busy', 'true')
		await page.waitForFunction(() => document.querySelector('[aria-busy="false"]'));

		await expect(page.getByTestId('success_alert')).toBeVisible()
		await expect(page.getByRole('button')).not.toHaveAttribute('aria-busy', 'true')

	});

	test('if name and age are not provided, form should show error', async ({ page }) => {

		await page.click('button[type="submit"]');

		await expect(page.getByTestId('warn_name')).toBeVisible()
		await expect(page.getByTestId('warn_age')).toBeVisible()
		await expect(page.getByTestId('success_alert')).not.toBeVisible()
		await expect(page.getByRole('button')).not.toHaveAttribute('aria-busy', 'true')

	});

	test('if name is not provided, form should show error', async ({ page }) => {

		await page.fill('input[name="age"]', '32');
		await page.click('button[type="submit"]');

		await expect(page.getByTestId('warn_name')).toBeVisible()
		await expect(page.getByTestId('warn_age')).not.toBeVisible()
		await expect(page.getByTestId('success_alert')).not.toBeVisible()
		await expect(page.getByRole('button')).not.toHaveAttribute('aria-busy', 'true')

	});


	test('if name is too short, form should show error', async ({ page }) => {

		await page.fill('input[name="name"]', 'a');
		await page.fill('input[name="age"]', '82');
		await page.click('button[type="submit"]');

		await expect(page.getByTestId('warn_name')).toBeVisible()
		await expect(page.getByTestId('warn_age')).not.toBeVisible()
		await expect(page.getByTestId('success_alert')).not.toBeVisible()
		await expect(page.getByRole('button')).not.toHaveAttribute('aria-busy', 'true')

	});


	test('if name is too long, form should show error', async ({ page }) => {

		await page.fill('input[name="name"]', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		await page.fill('input[name="age"]', '62');
		await page.click('button[type="submit"]');

		await expect(page.getByTestId('warn_name')).toBeVisible()
		await expect(page.getByTestId('warn_age')).not.toBeVisible()
		await expect(page.getByTestId('success_alert')).not.toBeVisible()
		await expect(page.getByRole('button')).not.toHaveAttribute('aria-busy', 'true')

	});


	test('if age is not provided, form should show error', async ({ page }) => {

		await page.fill('input[name="name"]', 'your_username');
		await page.click('button[type="submit"]');

		await expect(page.getByTestId('warn_name')).not.toBeVisible()
		await expect(page.getByTestId('warn_age')).toBeVisible()
		await expect(page.getByTestId('success_alert')).not.toBeVisible()
		await expect(page.getByRole('button')).not.toHaveAttribute('aria-busy', 'true')

	});


	test('if age below 18, form should show error', async ({ page }) => {

		await page.fill('input[name="name"]', 'Bruno');
		await page.fill('input[name="age"]', '12');
		await page.click('button[type="submit"]');

		await expect(page.getByTestId('warn_name')).not.toBeVisible()
		await expect(page.getByTestId('warn_age')).toBeVisible()
		await expect(page.getByTestId('success_alert')).not.toBeVisible()
		await expect(page.getByRole('button')).not.toHaveAttribute('aria-busy', 'true')

	});

	test('if age over 160, form should show error', async ({ page }) => {

		await page.fill('input[name="name"]', 'Bruno');
		await page.fill('input[name="age"]', '360');
		await page.click('button[type="submit"]');

		await expect(page.getByTestId('warn_name')).not.toBeVisible()
		await expect(page.getByTestId('warn_age')).toBeVisible()
		await expect(page.getByTestId('success_alert')).not.toBeVisible()
		await expect(page.getByRole('button')).not.toHaveAttribute('aria-busy', 'true')

	});


})
