"use client";

import "./swiperstyles.css";
import immunity from "@/public/assets/images/immunity.webp";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";

export default function MySwiper() {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={10}
      freeMode={true}
      modules={[FreeMode, Pagination]}
      pagination={{ clickable: true }}
      breakpoints={{
        360: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 10 },
        768: { slidesPerView: 4, spaceBetween: 10 },
        1024: { slidesPerView: 5, spaceBetween: 10 },
      }}
      className="mySwiper"
    >
      {[...Array(6)].map((_, index) => (
        <SwiperSlide key={index}>
          <div className="imageWrapper">
            <Image
              src={immunity}
              alt="Immunity"
              fill
              className="image"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
