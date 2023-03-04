import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, onClick }) => {
  const { webformatURL, tags, id } = item;

  return (
    <GalleryItem id={id} onClick={event => onClick(event.currentTarget.id)}>
      <GalleryItemImg src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
