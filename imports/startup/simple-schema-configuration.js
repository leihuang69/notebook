import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// 用Meteor的验证报错信息替换掉SimpleSchema的报错信息	
SimpleSchema.defineValidationErrorTransform((e) => {
  return new Meteor.Error(400, e.message)
});
