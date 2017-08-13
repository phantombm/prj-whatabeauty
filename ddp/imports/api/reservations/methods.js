import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Reservations } from './reservations';

Meteor.methods({
  'reservations.insert'(document) {
    check(document, Object);

    const reservationId = Reservations.insert(document);

    Meteor.users.update({
      _id: this.userId
    }, {
      $push: {
        'profile.reservations': reservationId
      }
    });

    Meteor.users.update({
      _id: document.ssamId
    }, {
      $push: {
        'profile.informationForSsam.reservations': reservationId
      }
    });

    return reservationId;
  }
});
