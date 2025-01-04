const redirectFromExample = () => {
  const { hostname, search } = window.location,
    redirectHostname = hostname === 'example.com' ? 'www.google.com' : hostname;
  window.location.href = `//${redirectHostname}${search}`;
};

describe('redirectFromExample', () => {
  beforeEach(() => {
    global.window = Object.create(null);
    Object.defineProperty(window, 'location', {
      value: {
        hostname: '',
        href: '',
        pathname: '/',
        search: '',
      },
      writable: true,
    });
  });

  it('redirect to google.com from example', () => {
    expect.assertions(1);

    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'example.com',
        href: 'https://example.com/',
        pathname: '/',
        search: '',
      },
    });

    redirectFromExample();

    expect(window.location.href).toBe('//www.google.com');
  });

  it('not redirect to google.com', () => {
    expect.assertions(1);

    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'www.yahoo.jp',
        href: 'https://www.yahoo.jp/',
        pathname: '/',
        search: '?hoge=text',
      },
    });

    redirectFromExample();

    expect(window.location.href).toBe('//www.yahoo.jp?hoge=text');
  });
});
