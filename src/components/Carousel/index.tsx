import "./style.css";

const api_image = import.meta.env.VITE_API_IMG;

export type CarouselProps = {
  title: string;
  tagline: string;
  background_url: string;
};

export const Carousel = ({ data = {} as CarouselProps }) => {
  return (
    <>
      <div id="card">
        <img
          src={api_image + data.background_url}
          alt={data.title}
          height={300}
          width={300}
        />
        <div>
          <h3>{data.title}</h3>
          <span>{data.tagline}</span>
        </div>
      </div>
    </>
  );
};
