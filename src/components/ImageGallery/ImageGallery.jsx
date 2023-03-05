import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ items, onClick }) => {
  return (
    <>
      <ImageGalleryList>
        {items.map(item => {
          return (
            <ImageGalleryItem key={item.id} item={item} onClick={onClick} />
          );
        })}
      </ImageGalleryList>
    </>
  );
};

ImageGallery.propTypes = {
  // item: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
