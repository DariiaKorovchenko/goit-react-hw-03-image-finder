import React from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends React.Component {
  state = {
    searchQuery: '',
    materials: [],
    pageCounter: 1,
    error: null,
    status: 'idle',
  };

  handleFormSubmit = search => {
    this.setState({ searchQuery: search, pageCounter: 1 });
  };

  handleCounterPage = () => {
    this.setState(prevState => {
      return { pageCounter: prevState.pageCounter + 1 };
    });
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
          if (data.hits.length !== 0 && this.state.pageCounter === 1) {
            this.setState({
              materials: data.hits,
              status: 'resolved',
            });
            return;
          }
          if (prevState.materials !== null) {
            this.setState({
              materials: [...prevState.materials, ...data.hits],
              status: 'resolved',
            });
          } else {
            return Promise.reject(new Error('Not found'));
          }
        })
        .catch(error => this.setState({ error: error, status: 'rejected' }));
    }
  }

  render() {
    const { materials, error, status } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'rejected' && <h1>{error.message}</h1>}
        <ImageGallery items={materials} />
        {materials.length !== 0 && <Button loadMore={this.handleCounterPage} />}
        {status === 'pending' && <Loader />}
      </div>
    );
  }
}
