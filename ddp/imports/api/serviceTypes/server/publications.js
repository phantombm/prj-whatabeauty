import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { ServiceTypes } from '../serviceTypes';

Meteor.publish('serviceTypes', (selector) => {
  check(selector, Object);

  return ServiceTypes.find(selector);
});
