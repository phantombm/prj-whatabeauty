import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

import { SignInTokens } from './signInTokens';

Meteor.methods({
  'signInTokens.insert'(profile, uuidV1) {
    check(profile, Object);
    check(uuidV1, String);

    const user = Accounts.findUserByUsername(profile.signInId);

    if (user) {
      Accounts.setPassword(user._id, uuidV1, {
        logout: false
      });
    }
    else {
      Accounts.createUser({
        username: profile.signInId,
        password: uuidV1,
        profile: profile
      });
    }

    return SignInTokens.insert({
      signInId: profile.signInId,
      uuidV1: uuidV1
    });
  },
  'signInTokens.findOne'(selector) {
    check(selector, Object);

    const signInToken = SignInTokens.findOne(selector);

    if (!signInToken) {
      return;
    }

    SignInTokens.remove({
      _id: signInToken._id
    });

    Meteor.users.remove({
      'services.password': {
        $exists: false
      }
    });

    return signInToken;
  }
});
