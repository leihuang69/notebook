import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient) {
  describe('登陆后页面Header', function () {
    it('应该讲按钮文字设为退出', function () {
      const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> )
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('退出');
    });

    it('主题props应该为 H1 文字格式', function () {
      const title = 'Test title here';
      const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> );
      const actualTitle = wrapper.find('h1').text();

      expect(actualTitle).toBe(title);
    });

    it('点击时应该执行 handleLogout 方法', function () {
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/> );

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    });

  });
}
