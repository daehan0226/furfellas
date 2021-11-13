import { useEffect, useState } from "react";
import styled from "styled-components";
import ImageGallery from 'react-image-gallery';


const Container = styled.div`
    width: 100%
`

const SlideGallery = ({ items }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (items.length > 0) {
            setImages([...items.map(setGalleryProperties)]);
        } else {
            setImages([]);
        }
    }, [items])

    const setGalleryProperties = (item) => {
        return ({
            ...item,
            originalHeight: 400,
            thumbnailHeight: 80
        })
    }
    return (
        <Container>
            <ImageGallery
                items={images}
            />
        </Container>
    );
};

export default SlideGallery;


