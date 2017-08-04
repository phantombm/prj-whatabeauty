import { Meteor } from 'meteor/meteor';

Meteor.publish('ssams.all', () => {
  return Meteor.users.find({
    'profile.isSsam': true
  }, {
    fields: {
      services: 0
    }
  });
});
