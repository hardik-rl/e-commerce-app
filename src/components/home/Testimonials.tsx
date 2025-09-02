"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Slider from "react-slick";
import { Star, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Loading from "../common/Loading";

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 z-10"
    >
      <ArrowRight className="w-5 h-5" />
    </button>
  );
}

const GET_TESTIMONIALS = gql`
  query GetTestimonials {
    homePage {
      happyCustomer {
        card {
          id
          heading
          description
        }
      }
    }
  }
`;

interface TestimonialCard {
  id: number;
  heading: string;
  description: string;
}

interface TestimonialsData {
  homePage: {
    happyCustomer: {
      heading: string;
      card: TestimonialCard[];
    };
  };
}

export default function Testimonials() {
  const { data, loading, error } = useQuery<TestimonialsData>(
    GET_TESTIMONIALS
  );

  if (loading) return <Loading message="Loading testimonials..." />
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const testimonials = data?.homePage?.happyCustomer?.card || [];
  const heading = data?.homePage?.happyCustomer?.heading || "OUR HAPPY CUSTOMERS";

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
        {heading}
      </h2>

      {/* Slider */}
      <Slider {...settings}>
        {testimonials.map((review) => (
          <div key={review.id} className="px-3">
            <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
              {/* Stars */}
              <div className="flex mb-3 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star fill="#FFC633" strokeWidth={0} key={i} />
                ))}
              </div>

              {/* Name + check */}
              <div className="flex items-center mb-2">
                <h3 className="font-semibold text-lg mr-2">{review.heading}</h3>
                <CheckCircle className="text-green-500" />
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
