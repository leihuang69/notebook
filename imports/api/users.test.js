import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

if (Meteor.isServer) {
  describe('用户注册功能测试', function () {
    // 测试合法邮箱
    it('允许合法邮箱注册', function () {
      const testUser = {
        emails: [
          {
            address: 'Test@example.com'
          }
        ]
      };
      const res = validateNewUser(testUser);

      expect(res).toBe(true);
    });

    // 测试非法邮箱
    it('拒绝非法邮箱', function () {
      const testUser = {
        emails: [
          {
            address: 'Testom'
          }
        ]
      };

      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });

  });
}
