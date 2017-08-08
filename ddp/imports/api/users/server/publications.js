import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('ssams', (selector) => {
  check(selector, Object);

  return Meteor.users.find(selector, {
    fields: {
      services: 0
    }
  });
});
