import s from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  state = {
    status: Status.IDLE,
    isLoadBtnShown: true,
  };

  render() {
    const { images, onClick, status } = this.props;
    return (
      <>
        {status === Status.REJECTED && (
          <p className={s.error}>Something went wrong....</p>
        )}
        <ul className={s.gallery}>
          {images.map(({ webformatURL, largeImageURL, tags, id }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && <Button onClick={onClick}></Button>}
      </>
    );
  }
}
