/**
 * @vitest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

const setURL = (url) => jsdom.reconfigure({ url });

describe('Test current location', () => {
  test('with GET parameter', () => {
    setURL('https://test.com?foo=bar');
    expect(window.location.href).toBe('https://test.com/?foo=bar');
  });
});
