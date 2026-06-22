import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/signup');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('sergioflorentino2@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('qa123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('form').filter({ hasText: 'Your email or password is' }).getByPlaceholder('Email Address').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('heading', { name: 'AutomationExercise' }).locator('span').click();
});