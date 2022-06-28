import { props } from "@/icons/interfaceIcons";

export function CrossPlusIcon(props: props) {
  return (
    <svg
      enableBackground="new 0 0 455 455"
      fill={props.fillColor || "currentColor"}
      height={props.height}
      viewBox="0 0 455 455"
      width={props.width}
      xmlSpace="preserve"
    >
      <path d="M455 212.5H242.5V0h-30v212.5H0v30h212.5V455h30V242.5H455z" />
    </svg>
  );
}

export function CrossBoldIcon(props: props) {
  return (
    <svg width={props.width} height={props.height} fill="none">
      <path
        d="m.765 12.787 2.516 2.515 4.76-4.76 4.74 4.74 2.513-2.514-4.739-4.74 4.747-4.746L12.786.766 8.04 5.513 3.273.747.76 3.26l4.766 4.766-4.76 4.76Z"
        fill={props.fillColor || "currentColor"}
      />
    </svg>
  );
}
