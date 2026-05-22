// banks/results/index.ts
// 모든 결과 뱅크를 통합하는 인덱스 파일

import { CATEGORY_RESULT_BANKS } from "./categories";
import { yeonaeGojangPaeteonResults } from "./yeonaeGojangPaeteon";
import { kkeullimYuhyeongResults } from "./kkeullimYuhyeong";
import { jeonAeinMotNitneumResults } from "./jeonAeinMotNitneum";
import { jipcheokButtonResults } from "./jipcheokButton";
import { hoepisseonghyangResults } from "./hoepisseonghyang";
import { jiltuBangshikResults } from "./jiltuBangshik";
import { sohnjeolDangHaNenuIyuResults } from "./sohnjeolDangHaNenuIyu";
import { donMotMoneunIyuResults } from "./donMotMoneunIyu";
import { tongjangSaeNeunPaeteonResults } from "./tongjangSaeNeunPaeteon";
import { naeSeonggyekResults } from "./naeSeonggyek";
import { naegaMuneojinanSunganResults } from "./naegaMuneojinanSungan";
import { inshengKkoinumPaeteonResults } from "./inshengKkoinumPaeteon";
import type { ResultTemplate } from "../types";

export const RESULT_BANKS: Record<string, ResultTemplate[]> = {
  ...CATEGORY_RESULT_BANKS,
  "yeonae-gojang-paeteon": yeonaeGojangPaeteonResults,
  "kkeullim-yuhyeong": kkeullimYuhyeongResults,
  "jeon-aein-mot-nitneum": jeonAeinMotNitneumResults,
  "jipcheok-button": jipcheokButtonResults,
  "hoepisseonghyang-testeut": hoepisseonghyangResults,
  "jiltu-bangshik-testeut": jiltuBangshikResults,
  "sohnjeol-dang-ha-neun-iyu": sohnjeolDangHaNenuIyuResults,
  "don-mot-moneun-iyu": donMotMoneunIyuResults,
  "tongjang-sae-neun-paeteon": tongjangSaeNeunPaeteonResults,
  "nae-seonggyek-wiheom-bubun": naeSeonggyekResults,
  "naega-muneojinan-sungan": naegaMuneojinanSunganResults,
  "insheng-kkoineum-paeteon": inshengKkoinumPaeteonResults,
};

export type { ResultTemplate } from "../types";
