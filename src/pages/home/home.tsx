import { Link } from "wouter";

import { DateIcon } from "@/icons/date";
import { DetePickerIlutration } from "@/icons/DateSelectIlutration";
import { LocationIcon } from "@/icons/location";
import { SocialMedia } from "@/components/socialMedia";

export function Home() {
  return (
    <>
      <header className="w-full">
        <div className="mx-auto h-auto w-[22rem]">
          <img
            className="object-contain w-full h-auto drop-shadow-xl "
            src="/src/imgs/DSH.png"
            alt="Dominican Style Hairdressing logo"
            aria-label="logo"
          />
        </div>
        <div>
          <svg viewBox="0 0 1440 310">
            <path
              fill="#0099ff"
              d="M0,160L120,165.3C240,171,480,181,720,160C960,139,1200,85,1320,58.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
          <div className="grid w-full gap-4 bg-primary-100 place-content-center">
            <p className="text-2xl font-bold text-white">Las mejores manos profecionales</p>
            <SocialMedia />
            <a
              aria-label="link a google maps"
              href="https://g.page/DominicanStyle?share"
              className="flex justify-center gap-2 font-semibold text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LocationIcon width={22} />
              ¿Cómo llegar?
            </a>
          </div>
          <svg className="rotate-180" viewBox="0 0 1440 310">
            <path
              fill="#0099ff"
              d="M0,160L120,165.3C240,171,480,181,720,160C960,139,1200,85,1320,58.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>
      <main className="grid gap-3 place-content-center">
        <Link href="/appointment/create" className="font-medium button" aria-label="link to create appointment">
          Agendar cita
          <DateIcon width={30} />
        </Link>
        <div className="w-full">
          <DetePickerIlutration />
        </div>
      </main>
      <footer className="flex justify-center w-full mt-8">
        <Link href="/login" className="text-primary-100 hover:underline">
          ¿Eres empleado? inicia sesión
        </Link>
      </footer>
    </>
  );
}
