interface IconProps {
  filled: boolean
}

export function HeartIcon({ filled }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 13.6667C8 13.6667 3.2 10.7333 2.06667 7.93333C1.13333 5.6 2.46667 3.46667 4.6 3.46667C5.86667 3.46667 6.73333 4.13333 7.33333 4.8C7.93333 4.13333 8.8 3.46667 10.0667 3.46667C12.2 3.46667 13.5333 5.6 12.6 7.93333C11.4667 10.7333 6.66667 13.6667 6.66667 13.6667H8Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export function BookmarkIcon({ filled }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.33333 2.66667H11.6667V13.4667L8 10.8L4.33333 13.4667V2.66667Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="7.2" cy="7.2" r="4.7" />
      <path d="m13.5 13.5-3-3" />
    </svg>
  )
}
