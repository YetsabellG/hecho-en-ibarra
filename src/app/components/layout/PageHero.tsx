import Image from "next/image";

export default function PageHero({ eyebrow, title, description, image = "/ibarra-hero.png" }: { eyebrow: string; title: string; description: string; image?: string }) {
  return <section className="relative isolate overflow-hidden bg-[#342821]"><div className="absolute inset-0 -z-10"><Image src={image} alt="" fill priority className="object-cover opacity-45" sizes="100vw"/><div className="absolute inset-0 bg-gradient-to-r from-[#342821]/95 via-[#6f1519]/75 to-[#342821]/35"/></div><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><span className="text-xs font-black uppercase tracking-[.28em] text-[#f4d8bb]">{eyebrow}</span><h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#fff4e8]">{description}</p></div></section>;
}
