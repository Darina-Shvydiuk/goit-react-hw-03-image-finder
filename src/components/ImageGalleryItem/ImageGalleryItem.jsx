import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal } from 'components/Modal';

export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  handleModalOpen = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    return (
      <li className={s.gallery_item}>
        <img
          className={s.gallery_item_image}
          src={this.webformatURL}
          alt={this.tags}
          onOpenModal={this.handleModalOpen}
        />
        {this.state.isModalOpen && (
          <Modal>
            <img
              src={this.props.largeImageURL}
              alt={this.props.tags}
              onCloseModal={this.handleModalOpen}
            />
          </Modal>
        )}
      </li>
    );
  }
}
