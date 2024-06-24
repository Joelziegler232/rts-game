import Generadores from "@/app/generadores/objects/generador";
import Ayuntamiento from "@/app/generadores/objects/ayuntamiento";

export type Structure = {
  id: number;
  position: { x: number; y: number };
};

export const glod_mine_Array: Generadores[] = [];
export const lumber_camp_Array: Generadores[] = [];
export const stone_mine_Array: Generadores[] = [];
export const ayuntamiento_Array: Ayuntamiento[] = [];
