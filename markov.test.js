// test if initial function works
const { MarkovMachine } = require('./markov');

describe('MarkovMachine Class', () => {
  describe('makeChains functions', () => {
    test('should set the chains object correctly', () => {
      const text = 'the cat in the hat';
      const machine = new MarkovMachine(text);
      const expectedChains = {
        'the': ['cat', 'hat'],
        'cat': ['in'],
        'in': ['the'],
        'hat': [null]
      };
      const actualChains = machine.makeChains();
      console.log(`actualChains = `)
      console.log(actualChains);
      expect(actualChains).toEqual(expectedChains);
    });
  });
});



