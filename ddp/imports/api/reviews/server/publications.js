import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Reviews } from '../reviews';

Meteor.publish('reviews', (selector) => {
  check(selector, Object);

  return Reviews.find(selector);
});
