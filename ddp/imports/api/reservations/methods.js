import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Reservations } from './reservations';

Meteor.methods({
  'reservations.insert'(document) {
    check(document, Object);

    return Reservations.insert(document);
  }
});
