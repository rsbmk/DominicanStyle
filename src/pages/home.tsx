import { Link } from "wouter";
import { SocialMedia } from "../components/socialMedia";
import { DateIcon } from "../icons/date";
import { LocationIcon } from "../icons/location";

export default function Home() {
  return (
    <>
      <header className="flex flex-col items-center w-full gap-2 p-2">
        <div className="h-auto w-[22rem]">
          <img
            className="object-contain w-full h-auto drop-shadow-xl"
            src="/src/imgs/DSH.png"
            alt="Dominican Style Hairdressing logo"
            aria-label="logo"
          />
        </div>
        <SocialMedia />
        <p className="italic text-gray-700">Las mejores manos profecionales</p>
        <a
          aria-label="link a google maps"
          href="https://g.page/DominicanStyle?share"
          className="flex gap-2 font-medium text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LocationIcon width={22} />
          ¿Cómo llegar?
        </a>
      </header>
      <main className="grid h-24 place-content-center">
        <Link href="/appointment" className="font-medium button">
          Agenda tu cita
          <DateIcon width={28} height={28} />
        </Link>
      </main>
    </>
  );
}
