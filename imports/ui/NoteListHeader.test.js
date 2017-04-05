import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('笔记列表表头', function () {
    let meteorCall;
    let Session;

    beforeEach(function () {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      }
    });

    it('点击按钮时，执行 meteorCall', function () {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });

    it('新增笔记不成功时，不设置meteor.session', function () {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]({}, undefined);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled();
    });

  });
}
