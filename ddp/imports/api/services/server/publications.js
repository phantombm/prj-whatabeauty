import { publishComposite } from 'meteor/reywood:publish-composite';

import { Services } from '../services';

publishComposite('services', (selector) => {
  return {
    find: () => {
      return Services.find(selector);
    }
  };
});
