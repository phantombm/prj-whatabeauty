import Meteor from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

import './fixtures';
import './register_api';

ServiceConfiguration.configurations.upsert({
  service: "facebook"
}, {
  $set: {
    appId: Meteor.settings.facebook.appId,
    loginStyle: "popup",
    secret: Meteor.settings.facebook.secret
  }
});
