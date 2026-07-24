"use client";

import {
  HeroTitle,
  Moon,
  MoonReflection,
  Ocean,
  Sky,
  Skyline,
  Stars,
  Waves,
  CityLights,
} from ".";

export default function MarineDriveHero() {
  return (
    <section className="absolute inset-0 overflow-hidden">

      <Sky />

      <Stars />

      <Moon />

      <MoonReflection />

      <CityLights />

      <Skyline />

      <Ocean />

      <Waves />

      <HeroTitle />

    </section>
  );
}