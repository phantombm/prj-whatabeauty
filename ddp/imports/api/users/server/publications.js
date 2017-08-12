import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import _ from 'lodash';

Meteor.publish('ssams', (selector) => {
  check(selector, Object);

  const assignedSelector = _.assign(selector, {
    'profile.isSsam': true
  });

  return Meteor.users.find(assignedSelector, {
    fields: {
      services: 0
    }
  });
});
