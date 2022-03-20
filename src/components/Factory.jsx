import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

export default function Footer() {
  // Content
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  const [captions, setCaptions] = useState([]);

  useEffect(() => {
    // Load images from API
    loadImages();
  }, []);

  function loadImages() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((data) => {
        setImages(data.data.memes);
        applyCurrentImage(data.data.memes[0]);
      })
      .catch((err) => console.error(err));
  }

  function onClickImage(image) {
    applyCurrentImage(image);
  }

  function onChangeCaption(target, index) {
    let arr = [...captions];
    arr[index] = target.value;
    setCaptions(arr);
  }

  function applyCurrentImage(image) {
    console.log(JSON.stringify(image));
    setCurrentImage(image);

    const count = image.box_count;
    let arr = [];

    if (count === 1) arr = ['CAPTION'];
    else if (count === 2) arr = ['TOP TEXT', 'BOTTOM TEXT'];
    else {
      for (let i = 0; i < image.box_count; i++) arr.push('CAPTION');
    }

    setCaptions(arr);
  }

  function onClickRandom() {
    applyCurrentImage(images[Math.floor(Math.random() * images.length)]);
  }

  function onDrag(event) {
    // todo save the x and y
    console.log(event.clientX, event.clientY);
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
      <ul className="captions-form">
        {captions.map((m, index) => (
          <li key={index}>
            <label>{`Caption ${index}`}</label>
            <input
              type="text"
              onChange={({ target }) => onChangeCaption(target, index)}
            />
          </li>
        ))}
      </ul>

      <div className="selected-image">
        <img src={currentImage.url} alt="" />
        <ul className="overlay">
          {captions.map((m, index) => (
            <Draggable bounds="parent" onDrag={onDrag}>
              <li key={index}>{m}</li>
            </Draggable>
          ))}
        </ul>
      </div>
    </section>
  );
}
