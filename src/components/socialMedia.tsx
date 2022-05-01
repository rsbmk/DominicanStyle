import { FacebookIcon, InstagramIcon } from '../icons/socials'

export function SocialMedia () {
  return (
    <aside className='flex gap-2 text-blue-500'>
      <a href='https://instagram.com/dominicanstyle.ec/' target='_blank' rel='noopener noreferrer'>
        <InstagramIcon width={20} />
      </a>
      <a
        href='https://www.facebook.com/dominicanstyle.ec/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FacebookIcon width={20} />
      </a>
      <p>@DominicanStyle.ec</p>
    </aside>
  )
}
