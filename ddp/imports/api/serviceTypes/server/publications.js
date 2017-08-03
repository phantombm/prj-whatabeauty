import { Meteor } from 'meteor/meteor';

import { ServiceTypes } from '../serviceTypes';

Meteor.publish('serviceTypes.all', () => {
  return ServiceTypes.find({});
});
