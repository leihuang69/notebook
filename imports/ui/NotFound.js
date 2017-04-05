import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>404 - 页面不存在</h1>
        <p>您访问的页面不存在！</p>
        <Link to="/" className="button button--link">前往首页</Link>
      </div>
    </div>
  );
};
