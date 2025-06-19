import { useEffect, useState } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Carousel() {
  const [people, setPeople] = useState(longList);
  const [currentPerson, setCurrentPerson] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  function prevSlide() {
    setCurrentPerson((currPerson) => {
      const result = (currPerson - 1 + people.length) % people.length;
      return result;
    });
  }

  function nextSlide() {
    setCurrentPerson((currPerson) => {
      const result = (currPerson + 1) % people.length;
      return result;
    });
  }

  useEffect(() => {
    if (isPaused) return;

    const personInterval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(personInterval);
  }, [currentPerson, isPaused]);

  return (
    <section
      className="slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;

        return (
          <article
            style={{
              transform: `translateX(${(personIndex - currentPerson) * 100}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? "visible" : "hidden",
            }}
            className="slide"
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}

      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
}
