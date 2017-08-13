import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

Accounts.onCreateUser((options, user) => {
  let profile = options.profile;

  if (user.services.facebook) {
    _.extend(profile, {
      signInType: 'facebook',
      signInId: user.services.facebook.id,
      email: user.services.facebook.email,
      phoneNumber: ''
    })
  }
  else if (user.services.google) {
    _.extend(profile, {
      signInType: 'google',
      signInId: user.services.google.id,
      email: user.services.google.email,
      phoneNumber: ''
    })
  }
  else {
    _.extend(profile, {
      signInType: 'password',
      signInId: ''
    })
  }

  _.extend(profile, {
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
      comment: '',
      introduction: '',
      reviews: [],
      belonging: {
        brandId: '',
        name: ''
      },
      portfolios: [],
      notAvailableAts: [],
      isAvailable: true,
      reservations: [],
      balancedMoneys: [],
      bankAccount: {
        bank: '',
        number: '',
        owner: ''
      }
    },
    isGettingNotificationsOn: true,
    isActive: true,
    createdAt: new Date()
  });

  user.profile = profile;

  return user;
});
