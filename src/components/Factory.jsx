import { useEffect, useState } from 'react';

export default function Footer() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);

  useEffect(() => {
    // Load images from API
    loadImages();
  }, []);

  function loadImages() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((data) => {
        setImages(data.data.memes);
        setCurrentImage(data.data.memes[0]);
      })
      .catch((err) => console.error(err));
  }

  function onClickImage(image) {
    setCurrentImage(image);
  }

  function onClickRandom() {
    setCurrentImage(images[Math.floor(Math.random() * images.length)]);
  }

  return (
    <section className="factory">
      <span className="pick-image-prompt">
        <span>Choose a meme template from below or </span>
        <a onClick={onClickRandom}>pick a random one</a>
      </span>
      <ul className="image-list">
        {images.map((image, index) => (
          <li key={index} onClick={() => onClickImage(image)}>
            <img src={image.url} alt="" />
          </li>
        ))}
      </ul>
      <div className="selected-image">
        <img src={currentImage.url} alt="" />
      </div>
    </section>
  );
}
