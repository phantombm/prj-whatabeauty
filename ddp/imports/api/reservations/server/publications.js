import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { check } from 'meteor/check';

import { Reservations } from '../reservations';

publishComposite('reservations', function(selector) {
  return {
    find() {
      check(selector, Object);

      return Reservations.find(selector);
    },
    children: [
      {
        find(reservation) {
          return Meteor.users.find({
            _id: reservation.ssamId
          }, {
            fields: {
              services: 0
            }
          });
        }
      }
    ]
  }
});
