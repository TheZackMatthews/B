import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Material UI components
import Button from "@mui/material/Button";
import SwiperCore from "swiper";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

const slides = [
  {
    id: 1,
    title: "Der Ritterhof Inn",
    backgroundImage:
      "https://www.derritterhof.com/Content/images/gallery/summer/3.jpg",
    additionalText:
      "Located just two blocks from downtown, this charming inn offers a park-like setting with beautifully landscaped grounds, surrounded with alpine views, spacious comfortable rooms. Seasonal pool. In room Keurig Coffee.",
    buttonLink:
      "https://direct-book.com/derritterhofinn/properties/derritterhofmotorinn?locale=en&checkInDate=2024-07-26&checkOutDate=2024-07-28&nights=2&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&trackPage=no",
  },
  {
    id: 2,
    title: "Hampton Inn & Suites",
    backgroundImage:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/ef/c2/f3/exterior.jpg?w=900&h=-1&s=1",
    additionalText:
      "Close to the Reindeer Farm and easy access to the downtown area, Hampton Inn & Suites Leavenworth is frequently lauded for its spotless, spacious rooms and modern conveniences.",
    buttonLink:
      "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=EATLVHX&arrivalDate=2024-07-26&departureDate=2024-07-28&room1NumAdults=2&ta_refid=120c6a91-6f27-4abd-ac43-bc0cf1231400&WT.mc_id=zLADA0WW1HX2PSH3TA4SEMTABL5HWB6EATLVHX7_310602136",
  },
  {
    id: 3,
    title: "Linderhof Inn (Limited Availability)",
    backgroundImage:
      "https://linderhof.com/wp-content/uploads/linderhof_886x400.jpg",
    additionalText:
      "At only half a block from downtown, the Linderhof Inn makes it easy for you to experience Leavenworth. In addition to friendly rates, they offer a complimentary hot buffet breakfast and free entry at the 18 hole Enzian Falls Putting Course ",
    buttonLink: "https://linderhof.com/",
  },
  {
    id: 4,
    title: "Icicle Village Resort",
    backgroundImage:
      "https://www.iciclevillage.com/images/mastheads/About-Us.jpg",
    additionalText:
      "The resort's popular features include comfortable guestrooms, the rejuvenating Alpine Spa, a fun themed mini golf course, and Northwest-bavarian cuisine. Icicle Village has all the comforts of home, including complimentary breakfast, Wi-Fi, and amenities like a heated pool, hot tub, and game room.",
    buttonLink:
      "https://be.synxis.com/?_ga-ft=Zf0H4A.AA.AA.AA.AA.9cp6sIytTd2MlFitZfj5IA..0&adult=1&arrive=2024-07-26&chain=8517&child=0&currency=USD&depart=2024-07-28&hotel=38116&level=hotel&locale=en-US&rooms=1",
  },
  {
    id: 5,
    title: "Enzian Inn",
    backgroundImage:
      "https://images.trvl-media.com/lodging/14000000/13280000/13279300/13279273/2f9a62c4.jpg?impolicy=resizecrop&rw=598&ra=fit",
    additionalText:
      "The Enzian Inn offers luxurious mountain views, numerous pools, mini golf, and a breakfast buffet including made-to-order entrees.",
    buttonLink: "",
  },
  {
    id: 6,
    title: "AirBnb",
    backgroundImage:
      "https://1000logos.net/wp-content/uploads/2017/08/Color-Airbnb-Logo-768x544.jpg",
    additionalText:
      "Want to see more options? Check out local AirBnB listings! The cabins and cottages range from rustic to luxurious, and are perfect for families or groups.",
    buttonLink:
      "https://www.airbnb.com/s/Leavenworth--Washington--United-States/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2024-04-01&monthly_length=3&monthly_end_date=2024-07-01&price_filter_input_type=0&channel=EXPLORE&query=Leavenworth%2C%20WA&place_id=ChIJjfn4pJJNmlQRfu-_CvuVT6E&date_picker_type=calendar&checkin=2024-07-26&checkout=2024-07-28&adults=2&source=structured_search_input_header&search_type=user_map_move&price_filter_num_nights=2&ne_lat=47.63536243065739&ne_lng=-120.60778991728802&sw_lat=47.5328294218238&sw_lng=-120.69885109594821&zoom=13.086728916702205&zoom_level=13.086728916702205&search_by_map=true",
  },
  // Add more slides with unique background images, additional text, and button links
];

export default function LodgeCarousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          color: "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className="lodge-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div className="slide-content">
                <div
                  className="additional-text"
                  style={{ width: "90%", alignSelf: "center" }}
                >
                  <h3>{slide.title}</h3>
                  {slide.additionalText}
                </div>
                <Button
                  variant="contained"
                  target="_blank"
                  rel="noreferrer"
                  color="primary"
                  href={slide.buttonLink}
                  sx={{ width: "10em", alignSelf: "center" }}
                >
                  See Rooms
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Hidden until a fix can be done for the thumbs, for now they're unclickable */}
      <Swiper
        freeMode
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        onSwiper={null} //setThumbsSwiper
        className="lodge-swiper-thumbs"
        style={{ height: "120px", display: "none" }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={"thumb" + slide.id}>
            <img src={slide.backgroundImage} alt={slide.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
