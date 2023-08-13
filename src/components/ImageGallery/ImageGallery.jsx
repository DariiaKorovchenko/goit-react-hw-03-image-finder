import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = items => {
  return (
    <ul className={css.ImageGallery}>
      {items.items.map(({ id, largeImageURL, tags, webformatURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            largeImage={largeImageURL}
            description={tags}
            preview={webformatURL}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
};
