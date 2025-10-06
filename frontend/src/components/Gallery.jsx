import { useEffect, useRef, useState } from "react";

const galleryItems = [
  { src: "img/gallery/5.jpg", title: "Modern Kitchen" },
  { src: "img/gallery/2.jpg", title: "Spacious Living Room" },
  { src: "img/gallery/3.jpg", title: "Cozy Bedroom" },
  { src: "img/gallery/4.jpg", title: "Elegant Dining Area" },
  { src: "img/gallery/5.jpg", title: "Luxurious Bathroom" },
  { src: "img/gallery/6.jpeg", title: "Outdoor Patio" },
  { src: "img/gallery/3.jpg", title: "Home Office" },
  { src: "img/gallery/8.jpeg", title: "Modern Kitchen 2" },
  { src: "img/gallery/9.jpeg", title: "Open Floor Plan" },
];

export default function Gallery() {
  const [imgBoxOpen, setImgBoxOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const parentSection = useRef(null);

  const openImgBox = (src, index) => {
    setSelectedImg(src);
    setCurrentIndex(index);
    setImgBoxOpen(true);
  };

  const closeImgBox = () => {
    setSelectedImg("");
    setImgBoxOpen(false);
  };

  const prevImage = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImg(galleryItems[newIndex].src);
  };

  const nextImage = () => {
    const newIndex =
      currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImg(galleryItems[newIndex].src);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (parentSection.current) {
      const elements = parentSection.current.querySelectorAll(
        ".fade-img-left, .fade-img-right"
      );
      elements.forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={parentSection}
      className="relative flex flex-col px-5 py-10 md:px-20 container mx-auto"
    >
      <div className="flex items-center justify-center w-full mb-3">
        <div className="flex-1 max-w-30 border-t-2 border-gray-800" />
        <h2 className="mx-6 text-2xl uppercase text-gray-900 oswald_span ">
          Gallery
        </h2>
        <div className="flex-1 max-w-30 border-t-2 border-gray-800" />
      </div>
      <div className="w-full flex justify-center maven-pro text-orange-500 mb-5">
        <span>
          {" "}
          <span>
           " Experience the art of modern living through our curated gallery "
          </span>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {galleryItems.map((item, index) => {
          const fadeClass =
            index % 2 === 0 ? "fade-img-left" : "fade-img-right";
          return (
            <div
              key={index}
              className={`${fadeClass} card group relative rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:z-10 hover:shadow-2xl`}
              onClick={() => openImgBox(item.src, index)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="object-cover object-center w-full h-56 rounded-lg"
              />
              <div className="absolute inset-0 bg-black/80 bg-opacity-50  opacity-0   hover:opacity-100 transition-opacity  duration-500 flex items-center justify-center">
                <span className="text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500  text-md maven-pro px-3 text-center ">
                  {item.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {imgBoxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-yellow-600 text-4xl cursor-pointer"
            onClick={prevImage}
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <div className="flex flex-col items-center">
            <img
              src={selectedImg}
              alt="Enlarged view"
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
            />
            <p className="text-white text-md maven-pro mt-4 italic">
              {galleryItems[currentIndex].title}
            </p>
          </div>
          <button
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-yellow-600 text-4xl cursor-pointer"
            onClick={nextImage}
            aria-label="Next image"
          >
            &#8594;
          </button>
          <button
            className="absolute top-5 right-5 text-yellow-500 hover:rotate-y-60 text-5xl font-bold cursor-pointer"
            onClick={closeImgBox}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
