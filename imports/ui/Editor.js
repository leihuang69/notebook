import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }

  // 处理更新正文操作
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }

  // 处理更新标题操作
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }

  // 处理删除操作
  handleRemoval(){
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }

  // 组件更新时，依据现有ID判断是否显示内容
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }
  render() {
    // note通过Container传入
    if (this.props.note) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.title} placeholder="未命名笔记" onChange={this.handleTitleChange.bind(this)}/>
          <textarea className="editor__body" value={this.state.body} placeholder="笔记在此显示" onChange={this.handleBodyChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>删除笔记</button>
          </div>
        </div>
      );
    } else {
      return (
        // 移动端和桌面端渲染不同内容
        <div className="editor">
          {
            this.props.onMobile ? <p className="editor__message">
            { this.props.selectedNoteId ? '未找到笔记。' : '点击左上角按钮创建笔记。'}

            </p> : <p className="editor__message">
                { this.props.selectedNoteId ? '未找到笔记。' : '在左侧选择或创建笔记。'}
            </p>
          }
        </div>
      );
    }
  }
};

Editor.propTypes = {
  note: React.PropTypes.object,
  onMobile: React.PropTypes.bool,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
};

// createContainer() 为react-meteor-data提供的方法，用于创建状态管理容器，对应Redux的createStore()
export default createContainer(() => {

  // 通过Session 获得选中的ID，后者在 NoteListItem 组件中通过 Session.set 设置
  const selectedNoteId = Session.get('selectedNoteId');
  var onMobile = window.matchMedia("(max-width: 50rem)").matches;

  return {
    selectedNoteId,
    onMobile,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
