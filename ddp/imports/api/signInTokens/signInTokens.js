import { Mongo } from 'meteor/mongo';

export const SignInTokens = new Mongo.Collection('signInTokens');
