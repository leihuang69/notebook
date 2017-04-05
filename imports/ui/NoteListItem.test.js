import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { notes } from '../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

if (Meteor.isClient) {
  describe('单项笔记', function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('应该显示标题和时间', function () {
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/> );

      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('2/03/17');
    });

    it('用户未输入标题时，应该提供默认标题', function () {
      const wrapper = mount( <NoteListItem note={notes[1]} Session={Session}/> );

      expect(wrapper.find('h5').text()).toBe('未命名笔记');
    });

    it('用户点击时应该执行Session.set()', function () {
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/> );

      wrapper.find('div').simulate('click');

      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });

  });
}
