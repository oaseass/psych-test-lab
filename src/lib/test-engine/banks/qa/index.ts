// banks/qa/index.ts
// 모든 QA 뱅크를 통합하는 인덱스 파일

import { CATEGORY_QA_BANKS } from "./categories";
import { yeonaeGojangPaeteonQA } from "./yeonaeGojangPaeteon";
import { kkeullimYuhyeongQA } from "./kkeullimYuhyeong";
import { jeonAeinMotNitneumQA } from "./jeonAeinMotNitneum";
import { jipcheokButtonQA } from "./jipcheokButton";
import { hoepisseonghyangQA } from "./hoepisseonghyang";
import { jiltuBangshikQA } from "./jiltuBangshik";
import { sohnjeolDangHaNenuIyuQA } from "./sohnjeolDangHaNenuIyu";
import { donMotMoneunIyuQA } from "./donMotMoneunIyu";
import { tongjangSaeNeunPaeteonQA } from "./tongjangSaeNeunPaeteon";
import { naeSeonggyekQA } from "./naeSeonggyek";
import { naegaMuneojinanSunganQA } from "./naegaMuneojinanSungan";
import { inshengKkoinumPaeteonQA } from "./inshengKkoinumPaeteon";
import type { QAPair } from "../types";

export const QA_BANKS: Record<string, QAPair[]> = {
  ...CATEGORY_QA_BANKS,
  "yeonae-gojang-paeteon": yeonaeGojangPaeteonQA,
  "kkeullim-yuhyeong": kkeullimYuhyeongQA,
  "jeon-aein-mot-nitneum": jeonAeinMotNitneumQA,
  "jipcheok-button": jipcheokButtonQA,
  "hoepisseonghyang-testeut": hoepisseonghyangQA,
  "jiltu-bangshik-testeut": jiltuBangshikQA,
  "sohnjeol-dang-ha-neun-iyu": sohnjeolDangHaNenuIyuQA,
  "don-mot-moneun-iyu": donMotMoneunIyuQA,
  "tongjang-sae-neun-paeteon": tongjangSaeNeunPaeteonQA,
  "nae-seonggyek-wiheom-bubun": naeSeonggyekQA,
  "naega-muneojinan-sungan": naegaMuneojinanSunganQA,
  "insheng-kkoineum-paeteon": inshengKkoinumPaeteonQA,
};

export type { QAPair } from "../types";
