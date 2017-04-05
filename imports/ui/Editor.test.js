import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('编辑器', function () {
    let browserHistory;
    let call;

    beforeEach(function () {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('用户未选择笔记是，应提示选择', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);
      expect(wrapper.find('p').text()).toBe('选择或创建新笔记以开始。');
    });

    it('笔记不存在时，应该显示未找到笔记', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id}/>);
      expect(wrapper.find('p').text()).toBe('未找到笔记。');
    });

    it('移除笔记功能测试', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);

      wrapper.find('button').simulate('click');

      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
    });

    it('更新笔记正文功能测试', function () {
      const newBody = 'This is my new body text';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });

      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
    });

    it('更新标题功能测试', function () {
      const newTitle = 'This is my new title text';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
    });

    it('新增笔记时，应该同时更新react state', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('当未提供react props 时，则不设置state', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);

      wrapper.setProps({
        selectedNoteId: notes[0]._id
      });

      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });

  });
}
