import { Component } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { GlobalStyle } from './GlobalStyle';
import { Wrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import * as API from '../services/image-api';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    status: 'idle',
    isModalOpen: false,
    image: null,

    page: 1,
    totalPages: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });

        const data = await API.fetchImages(searchQuery.trim(), page);

        if (data.hits.length === 0) {
          this.setState({ status: 'rejected', images: [] });
          return;
        }

        // if (prevState.searchQuery !== searchQuery) {
        //   this.setState({
        //     images: [...data.hits],
        //     status: 'resolved',
        //     totalPages: Math.ceil(data.totalHits / 12),
        //   });
        // }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          status: 'resolved',
          totalPages: Math.ceil(data.totalHits / 12),
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleSubmit = searchQuery => {
    if (!searchQuery) {
      toast.error('Please, enter some text', {
        position: 'top-right',
        duration: 2000,
      });
      return;
    }
    this.setState({ searchQuery, images: [], page: 1 });
    this.pageScrollToTop();
  };

  handleLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModalOpen = id => {
    const image = this.state.images.find(image => image.id === Number(id));

    this.setState({ image });
    this.onModalOpen();
  };

  onModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  onModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  pageScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }

  render() {
    const { images, status, totalPages, page, isModalOpen, image } = this.state;

    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <Toaster />
          <Searchbar onSubmit={this.handleSubmit} />
          {/* {status === 'resolved' && (
            <ImageGallery items={images} onClick={this.handleModalOpen} />
          )} */}

          {images.length > 0 && (
            <ImageGallery items={images} onClick={this.handleModalOpen} />
          )}

          {page < totalPages && images.length > 0 && status === 'resolved' && (
            <Button onClick={this.handleLoad} />
          )}

          {status === 'pending' && <Loader />}

          {status === 'rejected' && <ErrorMessage />}

          {isModalOpen && <Modal item={image} onClose={this.onModalClose} />}
        </Wrapper>
      </>
    );
  }
}
