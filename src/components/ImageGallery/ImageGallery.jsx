import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import * as API from '../../services/image-api';

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    isLoading: false,
    page: 1,
    totalPages: 1,
    isModalOpen: false,
    image: null,
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });

        const data = await API.fetchImages(
          this.props.searchQuery.trim(),
          this.state.page
        );

        if (data.hits.length === 0) {
          this.setState({ status: 'rejected', images: [] });
          return;
        }

        if (prevProps.searchQuery !== this.props.searchQuery) {
          this.setState({
            images: [...data.hits],
            status: 'resolved',
            totalPages: Math.ceil(data.totalHits / 12),
          });
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          return;
        }

        this.setState({
          images: [...prevState.images, ...data.hits],
          status: 'resolved',
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoad = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModalOpen = id => {
    this.onModalOpen();

    const image = this.state.images.find(image => image.id === Number(id));

    this.setState({ image });
  };

  onModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  onModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isLoading, images, status, totalPages, page, isModalOpen, image } =
      this.state;

    if (status === 'rejected') {
      return <ErrorMessage />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryList>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  item={image}
                  onClick={this.handleModalOpen}
                />
              );
            })}
          </ImageGalleryList>
          {isLoading && <Loader />}
          {page < totalPages && images.length > 0 && isLoading === false && (
            <Button onClick={this.handleLoad} />
          )}
          {isModalOpen && <Modal onClose={this.onModalClose} item={image} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
