/*
x обозначают стены. 
пробелы – пустое место.
! – фиксированная лава.
| — для кусочков, двигающихся по вертикали,
v для капающей лавы. 
@ отмечает место, где игрок начинает.
o – монетки.
= означает блок движущейся лавы, который двигается по горизонтали туда и сюда.
*/

export type tLevel = Array<String>

let level1: tLevel = [
  "                                     ",
  "                                     ",
  "  x              =                   ",
  "  x         o o    xx                ",
  "  x        xxxxx   xx               x",
  "  xxxxx            xx               x",
  "      x!!!!!!!!!!!!xx               x",
  "      xxxxxxxxxxxxxxxxxxxxxxxxx     x",
  "                                    x",
  "                                     ",
  "                                     ",
  "                  xxxxxxxxxxxxxxxxx  ",
  "                                     ",
  "                                   o ",
  "         xxxxxxxxx       xxxxxxxxxxxx",
  "                                     ",
  "xxxxxxx                              ",
  "xxxxxxx                              ",
  "xxxxxxxxxxxx                         ",
  "xxxxxxxxxxxx   o                     ",
  "xxxxxxxxxxxxxxxxxxxxxxx              ",
  "xxxxxxxxxxxxxxxxxxxxxxx              ",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx        ",
  "                                     ",
  " @          o           o            ",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
];
export default [
  level1
];