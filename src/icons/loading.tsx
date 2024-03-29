import { props } from './interfaceIcons'

export function LoadingIcon ({ stroke = 'currentColor', strokeWidth = 4, className = 'opacity-25' }: props) {
  return (
    <svg className='w-5 h-5 text-white animate-spin' fill='none' viewBox='0 0 24 24'>
      <circle className={className} cx='12' cy='12' r='10' stroke={stroke} strokeWidth={strokeWidth} />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  )
}
