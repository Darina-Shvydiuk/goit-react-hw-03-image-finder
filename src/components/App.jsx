import s from './App.module.css';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { fetchImages } from './services/Api';
import { Searchbar } from './Searchbar';
// import { ImageGallery } from './ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem';
// import { Modal } from './Modal';
// import { Button } from './Button';
// import { Loader } from './Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    status: Status.IDLE,
  };
  async componentDidMount(prevState, prevProps) {
    const { query, page } = this.props;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ status: Status.PENDING });
    }
    // fetchImages(searchQuery, currentPage).then(({ data }) => {

    // };
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* <ImageGallery /> */}
        {/* <ImageGalleryItem /> */}
        {/* <Loader />
        <Button /> */}
        {/* <Modal /> */}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
