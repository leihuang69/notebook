import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { notes } from '../fixtures/fixtures';
import { NoteList } from './NoteList';

if (Meteor.isClient) {
  describe('笔记本列表', function () {

    it('应该把每条笔记渲染在 NoteListItem 模块中', function () {
      const wrapper = mount(<NoteList notes={notes}/>);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('无笔记时，则渲染 NoteListEmptyItem 模块', function () {
      const wrapper = mount(<NoteList notes={[]}/>);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });

  });
}
