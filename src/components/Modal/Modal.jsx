import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydownListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydownListener);
  }

  handleKeydownListener = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
