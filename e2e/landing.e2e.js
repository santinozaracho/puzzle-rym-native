describe('Test Landing to Home flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('flow that carry you from the Landing View to the Home View and check that the Search Input is visible', async () => {
    await expect(element(by.id('ButtonImReady'))).toBeVisible();
    await element(by.id('ButtonImReady')).tap();
    await waitFor(element(by.id('searchInput')))
      .toBeVisible()
      .withTimeout(2000);
  });
});
