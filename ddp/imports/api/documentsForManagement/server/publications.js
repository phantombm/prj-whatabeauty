import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { DocumentsForManagement } from '../documentsForManagement';

Meteor.publish('documentsForManagement', function(selector) {
  check(selector, Object);

  return DocumentsForManagement.find(selector);
});
