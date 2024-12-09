import { RequestItem } from "@/types/types";
export function isFullFilled(arr: RequestItem[]) {
  let isFullFilled = true;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]?.isFullFilled === false) {
      isFullFilled = false;
    }
  }
  return isFullFilled;
}
