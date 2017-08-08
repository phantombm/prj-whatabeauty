import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Services } from '../services';

Meteor.publish('services', (selector) => {
  check(selector, Object);

  return Services.find(selector);
});
