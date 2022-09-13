import s from './App.module.css';

import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar';
import { fetchImages } from './services/Api';
import { ImageGallery } from './ImageGallery';

const PER_PAGE = 20;

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
    totalPages: null,
    images: [],
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    const newQuery = prevState.query !== query;

    if (newQuery || prevState.page !== page) {
      this.setState({ status: Status.PENDING });

      try {
        const currentPage = newQuery ? 1 : page;
        const { data } = await fetchImages(query, currentPage);

        if (!data.hits.length) {
          this.setState({ status: Status.REJECTED, images: [] });
          return toast.info('Are you probably wrong? Try again.');
        }
        this.setState(prevState => {
          return {
            status: Status.RESOLVED,
            images: page > 1 ? [...prevState.images, ...data.hits] : data.hits,
            totalPages: data.totalHits,
            page: currentPage,
            isLoadBtnShown:
              data.totalHits > PER_PAGE && data.totalHits / page > PER_PAGE,
          };
        });
      } catch {
        this.setState({ status: Status.REJECTED });
      }
    }
  }
  handleFormSubmit = search => {
    this.setState({ query: search });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, status } = this.state;

    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={images}
          onClick={this.handleLoadMoreClick}
          status={status}
        />

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
