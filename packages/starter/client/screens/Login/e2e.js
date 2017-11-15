describe('screens/Login', () => {
  it('has the correct page title', async () => {
    await page.goto('http://localhost:3325/login');

    const title = await page.title();

    assert.equal(title, 'Mercenary: Login');
  });
});
