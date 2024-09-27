/* 
 *** Load Media On Demand

// Using Native Lazy Loading
// Modern browsers support native lazy loading via the loading attribute in <img> tags. This is the simplest way to implement lazy loading without additional libraries.

import React from 'react';
const NativeLazyImage = () => {
  return (
    <img
      src="path/to/image.jpg"
      alt="Description"
      loading="lazy"
      width="600"
      height="400"
    />
  );
};
export default NativeLazyImage;


// Several React libraries simplify lazy loading by abstracting the complexities involved. Two popular libraries are react-lazyload and react-intersection-observer
import React from 'react';
import LazyLoad from 'react-lazyload';

const LazyLoadImage = ({ src, alt }) => (
  <LazyLoad height={200} offset={100} placeholder={<div>Loading...</div>}>
    <img src={src} alt={alt} width="600" height="400" />
  </LazyLoad>
);
export default LazyLoadImage;

// Using react-intersection-observer
import React from 'react';
import { useInView } from 'react-intersection-observer';

const IntersectionObserverImage = ({ src, alt }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <img
      ref={ref}
      src={inView ? src : ''}
      alt={alt}
      width="600"
      height="400"
      style={{ minHeight: '200px', backgroundColor: '#f0f0f0' }}
    />
  );
};
export default IntersectionObserverImage;

// Lazy Loading Images with Intersection Observer
import React, { useRef, useState, useEffect } from 'react';

const LazyImage = ({ src, alt, placeholder, ...props }) => {
  const imgRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imgRef.current && !isLoaded) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setIsLoaded(true);
                observer.unobserve(imgRef.current);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        );
        observer.observe(imgRef.current);
      } else {
        // Fallback for older browsers
        setIsLoaded(true);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [isLoaded, src]);

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : placeholder}
      alt={alt}
      {...props}
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoaded ? 1 : 0.5,
      }}
    />
  );
};
export default LazyImage;
*/

import React, { useRef, useState, useEffect } from 'react';

const LazyImage = ({ src, alt, placeholder, ...props }) => {
  const imgRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imgRef.current && !isLoaded) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setIsLoaded(true);
                observer.unobserve(imgRef.current);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        );
        observer.observe(imgRef.current);
      } else {
        // Fallback for older browsers
        setIsLoaded(true);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [isLoaded, src]);

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : placeholder}
      alt={alt}
      {...props}
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoaded ? 1 : 0.5,
      }}
    />
  );
};

export default LazyImage;


// use of above component
import React from 'react';
import LazyImage from './LazyImage';
import placeholderImage from './placeholder.png';

const Gallery = () => {
  const images = [
    { src: 'image1.jpg', alt: 'Image 1' },
    // Add more images as needed
  ];

  return (
    <div>
      {images.map((img, index) => (
        <LazyImage
          key={index}
          src={img.src}
          alt={img.alt}
          placeholder={placeholderImage}
          width="600"
          height="400"
        />
      ))}
    </div>
  );
};

export default Gallery;
