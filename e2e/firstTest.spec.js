describe('Test Landing', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('flow that carry you to the Landing Page', async () => {
    await expect(element(by.id('ButtonImReady'))).toBeVisible();
    await element(by.id('ButtonImReady')).tap();
    await waitFor(element(by.id('SearchInput')))
      .toBeVisible()
      .withTimeout(2000);
  });
});
