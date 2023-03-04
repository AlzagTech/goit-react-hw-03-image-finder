import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import * as API from '../../services/image-api';

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    isLoading: false,
    page: 1,
    totalPages: 1,
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

  render() {
    const { isLoading, images, status, totalPages, page } = this.state;

    if (status === 'rejected') {
      return <ErrorMessage />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryList>
            {images.map(image => {
              return <ImageGalleryItem key={image.id} item={image} />;
            })}
          </ImageGalleryList>
          {isLoading && <Loader />}
          {page < totalPages && images.length > 0 && isLoading === false && (
            <Button onClick={this.handleLoad} />
          )}
        </>
      );
    }
  }
}
