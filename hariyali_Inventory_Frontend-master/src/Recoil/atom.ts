import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const meAtom = atom({
  key: "me",
  default: {
    id: "",
    username: "",
    role: "",
    email: "",
  },
  effects_UNSTABLE: [persistAtom],
});
