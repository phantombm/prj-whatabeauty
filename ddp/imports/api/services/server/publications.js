import { Meteor } from 'meteor/meteor';

import { Services } from '../services';

Meteor.publish('services.find', (selector) => {
  return Services.find(selector);
});
