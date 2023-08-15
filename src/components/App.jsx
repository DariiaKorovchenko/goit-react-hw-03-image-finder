import React from 'react';
import css from './App.module.css';
import { fetchService } from './services/search-api';
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
    this.setState({ searchQuery: search, materials: [], pageCounter: 1 });
  };

  handleCounterPage = () => {
    this.setState(prevState => {
      return { pageCounter: prevState.pageCounter + 1 };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pageCounter } = this.state;
    if (
      pageCounter !== prevState.pageCounter ||
      searchQuery !== prevState.searchQuery
    ) {
      this.setState({ status: 'pending' });

      fetchService(searchQuery, pageCounter)
        .then(data => {
          if (data.hits.length !== 0 && pageCounter === 1) {
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
        {materials.length !== 0 && <ImageGallery items={materials} />}
        {status === 'resolved' && <Button loadMore={this.handleCounterPage} />}
        {status === 'pending' && <Loader />}
      </div>
    );
  }
}
