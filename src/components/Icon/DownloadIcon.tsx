import type { SVGProps } from "react"

export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="icon icon-xs"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4.007 4.007a1 1 0 0 1-1.414 0L5.279 10.707a1 1 0 0 1 1.414-1.414L9 11.586V3a1 1 0 0 1 1-1Zm-6 13a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
