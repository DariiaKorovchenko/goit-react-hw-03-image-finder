import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    largeImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  };

  state = {
    modalStatus: false,
  };

  toggleModal = () => {
    this.setState(({ modalStatus }) => ({
      modalStatus: !modalStatus,
    }));
  };

  render() {
    const { id, largeImage, tags, preview } = this.props;
    return (
      <li
        className={css.ImageGalleryItem}
        id={id}
        onClick={() => this.toggleModal()}
      >
        <img src={preview} alt={tags} className={css.ImageGalleryItem_image} />
        {this.state.modalStatus && (
          <Modal toggleModal={this.toggleModal}>
            <div className={css.Overlay}>
              <div className={css.Modal}>
                <img src={largeImage} alt={tags} />
              </div>
            </div>
          </Modal>
        )}
      </li>
    );
  }
}
