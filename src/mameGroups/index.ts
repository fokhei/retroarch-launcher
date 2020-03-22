import { cps } from "./capcom";
import { snk } from "./snk";
import { igs } from "./igs";
import { sega } from "./sega";
import { namco } from "./namco";
import { konami } from "./konami";
import { taito } from "./taito";
import { midway } from "./midway";


import { sexy } from "./sexy";
import { mahjong } from "./mahjong";
import { classics } from "./classics";
import { gamble } from "./gamble";

export interface MameGroup {
  name: string;
  drivers: Array<string>;
}

export const mameGroups = {
  [cps.name]: cps,
  [snk.name]: snk,
  [igs.name]: igs,
  [sega.name]: sega,
  [namco.name]: namco,
  [konami.name]: konami,
  [taito.name]: taito,
  [midway.name]: midway,
  [sexy.name]: sexy,
  [mahjong.name]: mahjong,
  [classics.name]: classics,
  [gamble.name]: gamble
};
