import PropTypes from "prop-types";
import { Item, Image } from "./ImageGalleryItem.styled";

export function GalleryItem({ id, webformatURL, tags }) {
  return (
    <Item>
      <Image
          src={webformatURL}
          alt={tags}/>
    </Item>
  )
};

GalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};