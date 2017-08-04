import { publishComposite } from 'meteor/reywood:publish-composite';

import { Reviews } from '../reviews';

publishComposite('reviews', (selector) => {
  return {
    find: () => {
      return Reviews.find(selector);
    }
  };
});
