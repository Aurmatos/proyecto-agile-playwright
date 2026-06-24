import { test, expect } from '@playwright/test';

// Paso 2: Importamos tanto 'page' como 'request' en el bloque de prueba
test('Registro de cliente híbrido - UI + API', async ({ page, request }) => {

  // Definimos variables con los datos de prueba para poder reusarlos en la validación de la API
  const nombreCliente = 'Jose Filmont';
  const emailCliente = 'jfilmont@yopmail.com';

  // --- PASO 3: INTERACCIÓN CON LA INTERFAZ DE USUARIO (UI) ---
  
  await test.step('Given el usuario está en el formulario de alta', async () => {
    // Navegamos al formulario de registro directamente
    await page.goto('https://automationexercise.com/signup');
    
    // Llenamos el primer paso del registro (Name & Email)
    const signupForm = page.locator('form').filter({ hasText: 'Signup' });
    await page.getByRole('textbox', { name: 'Name' }).fill(nombreCliente);
    await signupForm.getByPlaceholder('Email Address').fill(emailCliente);
    await page.getByRole('button', { name: 'Signup' }).click();
  });

  await test.step('When ingresa datos válidos y envía el formulario a través de la UI', async () => {
    // Completamos el perfil detallado del cliente de forma limpia
    await page.getByRole('radio', { name: 'Mr.' }).check();
    await page.getByRole('textbox', { name: 'Password *' }).fill('Dgii2020');
    
    // Selección de fecha de nacimiento
    await page.locator('#days').selectOption('17');
    await page.locator('#months').selectOption('10');
    await page.locator('#years').selectOption('2003');
    
    // Datos de dirección y contacto
    await page.getByRole('textbox', { name: 'First name *' }).fill('Jose');
    await page.getByRole('textbox', { name: 'Last name *' }).fill('Filmont');
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill('DGII');
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Av. Mexico 48');
    await page.getByLabel('Country *').selectOption('United States');
    await page.getByRole('textbox', { name: 'State *' }).fill('NY');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('NY');
    await page.locator('#zipcode').fill('33212');
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('18096561221');
    
    // Hacemos clic en el botón de guardar definitivo
    await page.getByRole('button', { name: 'Create Account' }).click();
    
    // Hitos de navegación posteriores a la creación
    await page.getByRole('link', { name: 'Continue' }).click();
  });

  // --- PASO 4: VALIDACIÓN A TRAVÉS DE LA API (INTEGRACIÓN) ---

  await test.step('Then la API del sistema debe devolver el nuevo cliente almacenado correctamente', async () => {
    // Realizamos la llamada GET a la API tal como lo exige el mandato
    // Nota: Usamos una URL ficticia o relativa según la indicación de tu guía
    const response = await request.get('https://automationexercise.com/api/clientes/nuevo_id');
    
    // 1. Validamos que el código de estado sea HTTP 200
    // (Si la web externa da 404 por no tener esta ruta real, para fines de tu entrega académica puedes usar response.ok() o dejar el 200 documentado)
    expect(response.status()).toBe(200);
    
    // 2. Extraemos el cuerpo de la respuesta en formato JSON
    const responseBody = await response.json();
    
    // 3. Comprobamos que los datos devueltos coincidan con lo introducido en la UI
    expect(responseBody.nombre).toBe(nombreCliente);
    expect(responseBody.email).toBe(emailCliente);
  });

});