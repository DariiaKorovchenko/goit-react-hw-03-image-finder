import React from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
  // componentDidMount() {
  //   window.addEventListener('keydown', event => {
  //     if (event.code === 'Escape') {

  //     }
  //   })
  // }

  render() {
    return createPortal(
      <div className={css.Overlay}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
