import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  sendSms: (phoneNumber) => {
    check(phoneNumber, String);

    if (!/^[0-9]{10,11}$/.test(phoneNumber)) {
      throw new Error('숫자만 입력해주세요.');
    }

    return {
      validationNumber: '123456'
    };
  }
});
