import { NdftPage } from './app.po';

describe('ndft App', () => {
  let page: NdftPage;

  beforeEach(() => {
    page = new NdftPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
