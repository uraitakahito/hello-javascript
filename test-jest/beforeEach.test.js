describe('id test', () => {
  let mockObj = { id: '123' };

  beforeEach(() => {
    mockObj = { id: '234' };
  });

  describe('sample 1', () => {
    Object.assign(mockObj, { name: 'tanaka' });

    it('has valid id', () => {
      expect.assertions(1);
      expect('234').toStrictEqual(mockObj.id);
    });
  });
});
