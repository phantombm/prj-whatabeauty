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
  },
  'reservations.update'(selector, modifier) {
    check(selector, Object);
    check(modifier, Object);

    const reservation = Reservations.findOne(selector);

    if (reservation.user.userId != this.userId && reservation.ssamId != this.userId) {
      throw new Meteor.Error('권한이 없습니다.');
    }

    Reservations.update(selector, modifier);
  }
});
