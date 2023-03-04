import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item }) => {
  const { webformatURL, tags } = item;

  return (
    <GalleryItem>
      <GalleryItemImg src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};
