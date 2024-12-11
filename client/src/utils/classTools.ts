import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function classTools(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
