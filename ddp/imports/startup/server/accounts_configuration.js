import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

Accounts.onCreateUser((options, user) => {
  let profile = options.profile;

  if (user.services.facebook) {
    profile = _.extend({
      signInType: 'facebook',
      signInId: user.services.facebook.id,
      email: user.services.facebook.email,
      phoneNumber: ''
    }, profile)
  }
  else if (user.services.google) {
    profile = _.extend({
      signInType: 'google',
      signInId: user.services.google.id,
      email: user.services.google.email,
      phoneNumber: ''
    }, profile)
  }
  else {
    profile = _.extend({
      signInType: 'password',
      signInId: ''
    }, profile)
  }

  profile = _.extend({
    addresses: [],
    reservations: [],
    notificationTokens: [],
    isOwner: false,
    isManager: false,
    isSsam: false,
    informationForSsam: {
      name: '',
      imageUrl: '',
      region: '',
      career: 0,
      belonging: {
        brandId: '',
        name: ''
      },
      portfolios: [],
      notAvailableDates: [],
      isAvailable: true,
      reservations: [],
      balancedMoney: [],
      bankAccount: {
        bank: '',
        number: '',
        owner: ''
      }
    },
    isActive: true,
    createAt: new Date()
  }, profile);

  user.profile = profile;

  return user;
});
