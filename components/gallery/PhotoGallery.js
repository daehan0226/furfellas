import { useEffect, useState } from "react";
import Image from "next/image";

const PhotoGallery = ({ items }) => {
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
      src: item.original,
      ...item
    })
  }
  return (
    <>
      {images.map(({ id, src, name }) => (
        <Image
          key={id}
          src={src}
          alt={name}
          placeholder={"blur"}
          width={200}
          height={200}
          blurDataURL={"/aibi.jpg"}
        />
      ))}
    </>
  );
};


export default PhotoGallery;


