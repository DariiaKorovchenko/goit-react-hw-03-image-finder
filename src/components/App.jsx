import React from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './Button/Button';

export class App extends React.Component {
  state = {
    searchQuery: '',
    materials: [],
    pageCounter: 1,
    error: null,
    status: 'idle',
    modalStatus: false,
  };

  toggleModal = () => {
    this.setState({
      modal: true,
    });
  };

  handleFormSubmit = search => {
    this.setState({ searchQuery: search });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.pageCounter !== prevState.pageCounter ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=1&key=38325031-07abeaa9a45e557a48162dc21&image_type=photo&orientation=horizontal&page=${this.state.pageCounter}&per_page=12`
      )
        .then(response => response.json())
        .then(data => {
          if (data.hits.length !== 0) {
            this.setState({
              materials: data.hits,
              status: 'resolved',
              pageCounter: (prevState.pageCounter += 1),
            });
          } else {
            return Promise.reject(new Error('Not found'));
          }
        })
        .catch(error => this.setState({ error: error, status: 'rejected' }));
    }
  }

  render() {
    const { materials, error, status, modalStatus } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h1>{error.message}</h1>}
        {status === 'resolved' && (
          <div>
            <ImageGallery
              items={materials}
              openModal={this.toggleModal}
              statusModal={modalStatus}
            />
            <LoadMoreButton>
              <button
                type="button"
                className={css.Button}
                onClick={() => this.componentDidUpdate()}
              >
                Load more
              </button>
            </LoadMoreButton>
          </div>
        )}
      </div>
    );
  }
}
