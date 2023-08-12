import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = (
  id,
  largeImage,
  tags,
  preview,
  openModal,
  statusModal
) => {
  return (
    <li className={css.ImageGalleryItem} id={id} onClick={() => openModal()}>
      <img src={preview} alt={tags} className={css.ImageGalleryItem_image} />
      {statusModal && (
        <Modal>
          <div className={css.Overlay}>
            <div className={css.Modal}>
              <img src={largeImage} alt={tags} />
            </div>
          </div>
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};
