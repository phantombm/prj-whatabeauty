import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Reviews } from './reviews';

Meteor.methods({
  'reviews.insert'(document) {
    check(document, Object);

    return Reviews.insert(document);
  }
});
