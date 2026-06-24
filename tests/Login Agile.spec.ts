import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/signup');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('jfilmont');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').press('Alt+6');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').press('Alt+4');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('jfilmont@dgii.gov.do');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('D');
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('Dgii2020');
  await page.getByRole('button', { name: 'Login' }).click();
});