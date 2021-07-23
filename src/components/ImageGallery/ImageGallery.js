// import PropTypes from "prop-types";
import { Gallery } from "./ImageGallery.styled";
import { GalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export function ImageGallery({ images }) {
    // console.log(images)
    return (
        <Gallery>
            {images.map(image => (
                    <GalleryItem
                    key={image.id}
                    webformatURL={image.webformatURL}
                    tags={image.tags}
                />
            ))}
        </Gallery>
    )
};