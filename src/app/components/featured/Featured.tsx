"use client";

import BusinessCard from "../ui/BusinessCard";
import { businesses } from "../../data/business";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function Featured() {

  const premiumBusinesses = businesses
    .filter((b) => b.premium)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div>

          <span className="uppercase tracking-[4px] text-[#C54B43] text-sm">
            Destacados
          </span>

          <h2 className="text-5xl font-bold mt-3">
            Emprendimientos Premium
          </h2>

          <p className="text-gray-500 mt-3">
            Descubre algunos de los mejores emprendimientos de Ibarra.
          </p>

        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          spaceBetween={25}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="mt-14"
        >
          {premiumBusinesses.map((business) => (
            <SwiperSlide key={business.id}>

              <BusinessCard
                name={business.name}
                category={business.category}
                description={business.description}
                image={business.image}
                location={business.city}
                verified={business.verified}
                premium={business.premium}
              />

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
}