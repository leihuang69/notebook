import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    this.props.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({error: '无法登陆，请检查邮箱和密码。'});
      } else {
        this.setState({error: ''});
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>请登录</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="邮箱"/>
            <input type="password" ref="password" name="password" placeholder="密码"/>
            <button className="button">登录</button>
          </form>

          <Link to="/signup">点此注册</Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithPassword: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login);
