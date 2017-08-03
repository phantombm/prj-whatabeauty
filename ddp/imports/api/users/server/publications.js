import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

Meteor.publish('ssams.find', (selector) => {
  const assignedSelector = _.assign(selector, {
    'profile.isSsam': true
  });
  return Meteor.users.find(assignedSelector, {
    fields: {
      profile: 1
    }
  });
});
