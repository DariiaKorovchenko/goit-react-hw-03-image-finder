import React from 'react';
import css from './Button.module.css';

export class LoadMoreButton extends React.Component {
  render() {
    return <div className={css.Button_container}>{this.props.children}</div>;
  }
}
