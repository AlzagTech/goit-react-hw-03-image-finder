import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { FiXCircle } from 'react-icons/fi';

import { Overlay, ModalBox, ModalCloseBtn } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackDropClick}>
        <ModalCloseBtn type="button" onClick={this.props.onClose}>
          <FiXCircle size={40} color="#ffffff" />
        </ModalCloseBtn>

        <ModalBox>
          <img src={this.props.item.largeImageURL} alt={this.props.item.tags} />
        </ModalBox>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
