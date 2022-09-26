import { FacebookIcon, InstagramIcon } from "@/icons/socials";

export function SocialMedia() {
  return (
    <aside className="flex justify-center gap-2 font-semibold text-white">
      <a
        aria-label="Link a instagram"
        href="https://instagram.com/dominicanstyle.ec/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon width={20} />
      </a>
      <a
        aria-label="Link a facebook"
        href="https://www.facebook.com/dominicanstyle.ec/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon width={20} />
      </a>
      <p>@DominicanStyle.ec</p>
    </aside>
  );
}
