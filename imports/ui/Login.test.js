import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if (Meteor.isClient) {
  describe('登录', function () {

    it('出错时显示错误信息', function () {
      const error = 'This is not working';
      const wrapper = mount(<Login loginWithPassword={() => {}}/>);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('登录时应执行 loginWithPassword 方法，并传入表单数据为参数', function () {
      const email = 'andrew@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('应该为 loginWithPassword 方法设置回掉错误信息', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error').length).toNotBe(0);

      spy.calls[0].arguments[2]();
      expect(wrapper.state('error').length).toBe(0);
    });

  });
}
