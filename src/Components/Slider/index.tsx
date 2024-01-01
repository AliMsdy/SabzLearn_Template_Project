import { register,SwiperContainer } from "swiper/element/bundle";
import { CourseBox } from "@/Components";
import { useEffect, useRef } from "react";

import { CourseType } from "@/types/shared";

register(); // register Swiper custom elements


function Slider({ list }: { list: CourseType[] }) {
  const slider = useRef<SwiperContainer | null>(null);

  useEffect(() => {
    const swiperParams = {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop: true,
      centeredSlides:true,
      dir: "rtl",
      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3.5,
          spaceBetween: 30,
        },
      },
      on: {
        init() {
          // ...
        },
      },
    };
    Object.assign(slider.current!, swiperParams);
    // Object.assign(slider2.current!, swiperParams);

    slider.current?.initialize();
    // slider2.current?.initialize();
  }, []);
  return (
    <swiper-container ref={slider} init={false}>
      {list.map((course: CourseType) => (
        <swiper-slide style={{ padding: "40px 0" }} key={course._id}>
          <CourseBox {...course} isForSlider={true} />
        </swiper-slide>
      ))}
    </swiper-container>
  );
}

export { Slider };
