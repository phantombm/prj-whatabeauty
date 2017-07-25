import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  sendSms: (phoneNumber) => {
    check(phoneNumber, String);

    if (!/^[0-9]{10,11}$/.test(phoneNumber)) {
      throw new Meteor.Error('숫자만 입력해주세요', '숫자만 입력해주세요');
    }

    const validationNumber = _.random(100000, 999999);

    return {
      validationNumber: validationNumber
    };
  }
});
