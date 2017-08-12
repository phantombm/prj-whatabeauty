import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import _ from 'lodash';
import { HTTP } from 'meteor/http';

import { Reservations } from '../api/reservations/reservations';

Meteor.methods({
  'sendSms'(phoneNumber) {
    check(phoneNumber, String);

    if (!/^[0-9]{10,11}$/.test(phoneNumber)) {
      throw new Meteor.Error('숫자만 입력해주세요', '숫자만 입력해주세요');
    }

    const validationNumber = _.random(100000, 999999);

    return validationNumber;
  },
  'completePayment'(merchantUid) {
    check(merchantUid, String);

    let result = HTTP.call('POST', 'https://api.iamport.kr/users/getToken', {
      data: {
        imp_key: Meteor.settings.iamport.restApiKey,
        imp_secret: Meteor.settings.iamport.restApiSecret
      }
    });

    const accessToken = result.data.response.access_token;

    result = HTTP.call('GET', `https://api.iamport.kr/payments/find/${merchantUid}/?_token=${accessToken}`);

    const reservationId = merchantUid.split('_')[1];

    const reservation = Reservations.findOne({
      _id: reservationId
    });

    if (!reservation) {
      return 'fail';
    }

    if (result.data.response.amount != reservation.price.amount) {
      return 'fail';
    }

    Reservations.update({
      _id: reservationId
    }, {
      $set: {
        progress: 'paid'
      }
    });

    return 'success';
  }
});
