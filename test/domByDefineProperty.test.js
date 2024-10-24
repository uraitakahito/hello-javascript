const redirectFromExample = () => {
  const { hostname, search } = window.location;
  const redirectHostname = hostname === 'example.com' ? 'www.google.com' : hostname;
  window.location.href = `//${redirectHostname}${search}`;
};

describe('redirectFromExample', () => {
  beforeEach(() => {
    global.window = Object.create(null);
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
        pathname: '/',
        search: '',
        hostname: '',
      },
      writable: true,
    });
  });

  it('redirect to google.com from example', () => {
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com/',
        pathname: '/',
        search: '',
        hostname: 'example.com',
      },
    });

    redirectFromExample();

    expect(window.location.href).toEqual('//www.google.com');
  });

  it('not redirect to google.com', () => {
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://www.yahoo.jp/',
        pathname: '/',
        search: '?hoge=text',
        hostname: 'www.yahoo.jp',
      },
    });

    redirectFromExample();

    expect(window.location.href).toEqual('//www.yahoo.jp?hoge=text');
  });
});
