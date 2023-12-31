import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { fetchData } from './imageApiService';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Btn } from './Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    picsArr: [],
    isLoading: false,
    showModal: false,
    showLoadMoreBtn: false,
    largeImageURL: '',
    imageTags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });
      this.fetchQuery(this.state.searchQuery, this.state.page);
    }
  }

  onSubmit = FormData => {
    const { query } = FormData;
    this.setState({ searchQuery: query, page: 1, picsArr: [] });
  };



  toggleModal = (largeImageURL, imageTags) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: largeImageURL,
      imageTags: imageTags,
    }));
  };



  onLoadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async fetchQuery(query, page) {
    try {
      await fetchData(query, page).then(result => {
        const data = result.data;
        const total = data.totalHits;
        const picsArr = data.hits;
        const picsLeft = total - 12 * this.state.page;

        if (picsArr.length === 0) {
          this.setState({ showLoadMoreBtn: false });
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        } else {
          this.setState(prevState => ({
            picsArr: [...prevState.picsArr, ...picsArr],
          }));
        }

        if (picsArr.length > 0 && this.state.page === 1) {
          Notiflix.Notify.success(
            `Hooray! We found ${total} images.`
          );
        }

        picsLeft > 0
          ? this.setState({ showLoadMoreBtn: true })
          : this.setState({ showLoadMoreBtn: false });
      });
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure(
        'Sorry, something went wrong, please try again later'
      );
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />

        <Container>
          <ImageGallery
            pics={this.state.picsArr}
            showModal={this.toggleModal}
          />

          {this.state.showLoadMoreBtn && (
            <Btn
              text="Load more"
              status="load"
              onClick={this.onLoadMoreBtnClick}
            />
          )}
        </Container>
        {this.state.isLoading && <Loader />}

        {this.state.showModal && (
          <Modal
            src={this.state.largeImageURL}
            alt={this.state.imageTags}
            closeModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}