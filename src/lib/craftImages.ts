import craftPottery from "@/assets/craft-pottery.jpg";
import craftPhad from "@/assets/craft-phad.jpg";
import craftBandhani from "@/assets/craft-bandhani.jpg";
import craftGond from "@/assets/craft-gond.jpg";
import craftChanderi from "@/assets/craft-chanderi.jpg";
import craftBagh from "@/assets/craft-bagh.jpg";

const imageMap: Record<string, string> = {
  pottery: craftPottery,
  phad: craftPhad,
  bandhani: craftBandhani,
  gond: craftGond,
  chanderi: craftChanderi,
  bagh: craftBagh,
};

export const getCraftImage = (key: string): string => imageMap[key] ?? craftPottery;
