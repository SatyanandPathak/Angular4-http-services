import { HttpServicesPage } from './app.po';

describe('http-services App', () => {
  let page: HttpServicesPage;

  beforeEach(() => {
    page = new HttpServicesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
