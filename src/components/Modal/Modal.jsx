import s from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydownCloseModal = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal;
    }
  };

  handleBackdropClickCloseModal = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal;
    }
  };

  render() {
    return createPortal(
      <div
        className={s.backdrop}
        onCloseModal={this.handleBackdropClickCloseModal}
      >
        <div className={s.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
