import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import _ from 'lodash';

import { Reservations } from '../reservations';

Meteor.publish('reservations', function(selector) {
  check(selector, Object);

  const assignedSelector = _.assign(selector, {
    userId: this.userId
  });

  return Reservations.find(assignedSelector);
});
