import { Meteor } from 'meteor/meteor';

import { ServiceTypes } from '../serviceTypes';

Meteor.publish('serviceTypes.find', (selector) => {
  return ServiceTypes.find(selector);
});
