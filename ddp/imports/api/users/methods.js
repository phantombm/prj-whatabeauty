import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'users.update'(modifier) {
    check(modifier, Object);

    Meteor.users.update({
      _id: this.userId
    }, modifier);
  }
});
