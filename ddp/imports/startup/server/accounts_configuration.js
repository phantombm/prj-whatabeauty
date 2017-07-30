/* eslint "no-undef": "off" */

import { Accounts } from 'meteor/accounts-base';

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

  }, profile);

  user.profile = profile;

  return user;
});
