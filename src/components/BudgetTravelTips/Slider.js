import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Slider = ({ imgs }) => {
  return (
    <Carousel showThumbs={false} showArrows={true} showStatus={false}>
      {imgs.map((el, i) => (
        <div key={i}>
          <img src={el} alt={el} />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
