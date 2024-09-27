/*

  // Using React Libraries for Video Lazy Loading
    import React from 'react';
    import LazyLoad from 'react-lazyload';
    
    const LazyLoadVideo = ({ src, poster }) => (
      <LazyLoad height={400} offset={100} placeholder={<div>Loading video...</div>}>
        <video controls preload="none" poster={poster} width="600" height="400">
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </LazyLoad>
    );

    export default LazyLoadVideo;


  
  // Lazy Loading Videos with Intersection Observer
*/

import React, { useRef, useState, useEffect } from 'react';

const LazyVideo = ({ src, poster, type = 'video/mp4', ...props }) => {
  const videoRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (videoRef.current && !isLoaded) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setIsLoaded(true);
                observer.unobserve(videoRef.current);
              }
            });
          },
          {
            threshold: 0.25,
            rootMargin: '75%',
          }
        );
        observer.observe(videoRef.current);
      } else {
        // Fallback for older browsers
        setIsLoaded(true);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isLoaded, src]);

  return (
    <video
      ref={videoRef}
      controls
      preload="none"
      poster={poster}
      {...props}
      width="600"
      height="400"
    >
      {isLoaded && <source src={src} type={type} />}
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideo;

// use of above component
import React from 'react';
import LazyVideo from './LazyVideo';
import videoPoster from './video-poster.jpg';

const VideoGallery = () => {
  const videos = [
    { src: 'video1.mp4', poster: videoPoster },
    // Add more videos as needed
  ];

  return (
    <div>
      {videos.map((video, index) => (
        <LazyVideo
          key={index}
          src={video.src}
          poster={video.poster}
          controls
        />
      ))}
    </div>
  );
};

export default VideoGallery;
