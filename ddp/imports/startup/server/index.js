import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

import './fixtures';
import './register_api';

ServiceConfiguration.configurations.upsert({
  service: "google"
}, {
  $set: {
    appId: Meteor.settings.google.appId,
    secret: Meteor.settings.google.secret
  }
});
