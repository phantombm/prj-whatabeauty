import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import _ from 'lodash';

import { Reservations } from '../reservations';

Meteor.publish('reservations', function(selector) {
  check(selector, Object);

  const user = Meteor.users.findOne({
    _id: this.userId
  });

  if (!user) {
    return this.ready();
  }

  _.extend(selector, {
    _id: {
      $in: user.profile.reservations
    }
  });

  return Reservations.find(selector);
});

Meteor.publish('reservationsForSsam', function(selector) {
  check(selector, Object);

  const user = Meteor.users.findOne({
    _id: this.userId
  });

  if (!user) {
    return this.ready();
  }

  _.extend(selector, {
    _id: {
      $in: user.profile.informationForSsam.reservations
    }
  });

  return Reservations.find(selector);
});
