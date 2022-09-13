import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal } from '../Modal/Modal';

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
    const { webformatURL, largeImageURL, tags } = this.props;
    return (
      <li className={s.gallery_item}>
        <img
          className={s.gallery_item_image}
          src={webformatURL}
          alt={tags?.split(',')}
          onClick={this.handleModalOpen}
        />
        {this.state.isModalOpen && (
          <Modal onCloseModal={this.handleModalOpen}>
            <img src={largeImageURL} alt={tags?.split(',')} />
          </Modal>
        )}
      </li>
    );
  }
}
