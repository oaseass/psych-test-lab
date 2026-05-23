// ================================================
// 틀린그림 찾기 데이터 v2 — 명화 / 세계 랜드마크 기반
// 이미지: Wikimedia Commons 공개 도메인 / CC 라이선스
// ================================================

/** @deprecated kept for legacy consumer compatibility */
export type SceneType = string;

export type DifferencePoint = {
  id: string;
  x: number;      // % of container width (center)
  y: number;      // % of container height (center)
  radius: number; // click tolerance in % of container width
  label: string;
};

/** SVG overlay that visually changes a region in the "changed" view */
export type ImageOverlay = {
  id: string;
  shape: "rect" | "ellipse";
  x: number;   // % center
  y: number;   // % center
  w: number;   // % width
  h: number;   // % height
  fill: string;
  opacity: number;
  blend: "color" | "normal" | "multiply" | "screen" | "hue";
};

export type SourceInfo = {
  originalTitle: string;
  artistOrPlace: string;
  year?: string;
  license: string;
  licenseName: string;
  provider: string;
  sourceUrl: string;
  isCommercialSafe: boolean;
  attribution: string;
};

export type SpotSceneData = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "masterpiece" | "landmark";
  difficulty: "easy" | "normal" | "hard";
  timeLimit: number;
  color: string;
  bgColor: string;
  emoji: string;
  source: SourceInfo;
  originalImage: string;
  differences: DifferencePoint[];
  overlays: ImageOverlay[];
  /** @deprecated kept for legacy consumers */
  sceneType: string;
};

function wikiThumb(path: string, filename: string, width = 900): string {
  const encoded = encodeURIComponent(filename);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${encoded}/${width}px-${encoded}`;
}

export const spotSceneList: SpotSceneData[] = [

  // 1. 반 고흐 — 아를의 침실 (1888)
  {
    id: "sp-01",
    slug: "vangogh-bedroom",
    title: "반 고흐의 방",
    subtitle: "아를의 침실에 숨겨진 5가지 차이를 찾아보세요",
    category: "masterpiece",
    difficulty: "normal",
    timeLimit: 120,
    color: "#92400E",
    bgColor: "#FEF3C7",
    emoji: "🎨",
    sceneType: "",
    source: {
      originalTitle: "Bedroom in Arles (first version)",
      artistOrPlace: "Vincent van Gogh",
      year: "1888",
      license: "Public Domain",
      licenseName: "퍼블릭 도메인",
      provider: "Wikimedia Commons / Van Gogh Museum",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
      isCommercialSafe: true,
      attribution: "Vincent van Gogh, Public domain, via Wikimedia Commons",
    },
    originalImage: wikiThumb(
      "7/76",
      "Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
      900
    ),
    differences: [
      { id: "picture-wall", x: 63, y: 24, radius: 6, label: "벽에 걸린 그림" },
      { id: "chair-color",  x: 37, y: 68, radius: 7, label: "의자 색깔" },
      { id: "pillow-color", x: 80, y: 44, radius: 6, label: "베개 색깔" },
      { id: "window-pane",  x: 82, y: 20, radius: 6, label: "창문 유리" },
      { id: "floor-item",   x: 52, y: 82, radius: 6, label: "바닥 오브젝트" },
    ],
    overlays: [
      { id: "picture-wall", shape: "rect",    x: 63, y: 24, w:  9, h: 11, fill: "#7A8FA5", opacity: 0.88, blend: "normal" },
      { id: "chair-color",  shape: "ellipse", x: 37, y: 68, w: 12, h: 18, fill: "#CC2200", opacity: 0.52, blend: "color" },
      { id: "pillow-color", shape: "ellipse", x: 80, y: 44, w: 10, h:  6, fill: "#DAA520", opacity: 0.62, blend: "color" },
      { id: "window-pane",  shape: "rect",    x: 82, y: 20, w:  9, h: 10, fill: "#001040", opacity: 0.50, blend: "multiply" },
      { id: "floor-item",   shape: "ellipse", x: 52, y: 82, w:  6, h:  4, fill: "#2C1A0A", opacity: 0.78, blend: "normal" },
    ],
  },

  // 2. 베르메르 — 진주 귀걸이를 한 소녀 (c.1665)
  {
    id: "sp-02",
    slug: "vermeer-pearl",
    title: "진주 귀걸이를 한 소녀",
    subtitle: "베르메르의 걸작 초상화에서 차이를 발견하세요",
    category: "masterpiece",
    difficulty: "hard",
    timeLimit: 150,
    color: "#4338CA",
    bgColor: "#EEF2FF",
    emoji: "🖼️",
    sceneType: "",
    source: {
      originalTitle: "Girl with a Pearl Earring",
      artistOrPlace: "Johannes Vermeer",
      year: "c. 1665",
      license: "Public Domain",
      licenseName: "퍼블릭 도메인",
      provider: "Wikimedia Commons / Mauritshuis",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Meisje_met_de_parel.jpg",
      isCommercialSafe: true,
      attribution: "Johannes Vermeer, Public domain, via Wikimedia Commons",
    },
    originalImage: wikiThumb("d/d7", "Meisje_met_de_parel.jpg", 700),
    differences: [
      { id: "earring",   x: 61, y: 64, radius: 5, label: "귀걸이" },
      { id: "headscarf", x: 43, y: 27, radius: 8, label: "머리 스카프 색" },
      { id: "collar",    x: 52, y: 77, radius: 7, label: "흰 칼라" },
      { id: "bg-spot",   x: 18, y: 38, radius: 7, label: "배경 밝기" },
      { id: "shoulder",  x: 36, y: 79, radius: 8, label: "어깨 옷 색" },
    ],
    overlays: [
      { id: "earring",   shape: "ellipse", x: 61, y: 64, w:  4, h:  5, fill: "#DAA520", opacity: 0.72, blend: "color" },
      { id: "headscarf", shape: "ellipse", x: 43, y: 27, w: 18, h: 22, fill: "#6600AA", opacity: 0.42, blend: "color" },
      { id: "collar",    shape: "ellipse", x: 52, y: 77, w: 16, h:  9, fill: "#8B4513", opacity: 0.38, blend: "color" },
      { id: "bg-spot",   shape: "ellipse", x: 18, y: 38, w:  9, h: 10, fill: "#FFFFFF", opacity: 0.35, blend: "screen" },
      { id: "shoulder",  shape: "ellipse", x: 36, y: 79, w: 15, h: 14, fill: "#1A6B3C", opacity: 0.38, blend: "color" },
    ],
  },

  // 3. 모네 — 수련 (1906)
  {
    id: "sp-03",
    slug: "monet-waterlilies",
    title: "모네의 수련",
    subtitle: "인상파 걸작 수련 연못에 숨어있는 차이점을 찾으세요",
    category: "masterpiece",
    difficulty: "easy",
    timeLimit: 100,
    color: "#0E7490",
    bgColor: "#ECFEFF",
    emoji: "🌸",
    sceneType: "",
    source: {
      originalTitle: "Water Lilies",
      artistOrPlace: "Claude Monet",
      year: "1906",
      license: "Public Domain",
      licenseName: "퍼블릭 도메인",
      provider: "Wikimedia Commons / Art Institute of Chicago",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Water_Lilies_-_1906,_Ryerson.jpg",
      isCommercialSafe: true,
      attribution: "Claude Monet, Public domain, via Wikimedia Commons",
    },
    originalImage: wikiThumb(
      "a/aa",
      "Claude_Monet_-_Water_Lilies_-_1906,_Ryerson.jpg",
      900
    ),
    differences: [
      { id: "lily-color",    x: 28, y: 57, radius: 7, label: "꽃 색깔" },
      { id: "water-reflect", x: 66, y: 36, radius: 8, label: "수면 반영" },
      { id: "lily-removed",  x: 50, y: 63, radius: 7, label: "수련잎 유무" },
      { id: "upper-sky",     x: 80, y: 22, radius: 8, label: "하늘 반영" },
      { id: "stem-left",     x: 14, y: 74, radius: 7, label: "식물 줄기" },
    ],
    overlays: [
      { id: "lily-color",    shape: "ellipse", x: 28, y: 57, w: 11, h:  9, fill: "#FF6600", opacity: 0.60, blend: "color" },
      { id: "water-reflect", shape: "ellipse", x: 66, y: 36, w: 15, h: 11, fill: "#003366", opacity: 0.42, blend: "multiply" },
      { id: "lily-removed",  shape: "ellipse", x: 50, y: 63, w: 10, h:  8, fill: "#2A8A9A", opacity: 0.78, blend: "normal" },
      { id: "upper-sky",     shape: "ellipse", x: 80, y: 22, w: 15, h: 13, fill: "#FFB366", opacity: 0.32, blend: "screen" },
      { id: "stem-left",     shape: "rect",    x: 14, y: 74, w:  3, h: 16, fill: "#1A5C2A", opacity: 0.72, blend: "normal" },
    ],
  },

  // 4. 에펠탑 — 파리
  {
    id: "sp-04",
    slug: "eiffel-tower",
    title: "에펠탑",
    subtitle: "파리의 상징 에펠탑 사진에서 차이점을 발견하세요",
    category: "landmark",
    difficulty: "normal",
    timeLimit: 120,
    color: "#374151",
    bgColor: "#F9FAFB",
    emoji: "🗼",
    sceneType: "",
    source: {
      originalTitle: "Tour Eiffel",
      artistOrPlace: "Paris, France",
      year: "2009",
      license: "CC BY-SA 3.0",
      licenseName: "크리에이티브 커먼즈 BY-SA 3.0",
      provider: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tour_Eiffel_Wikimedia_Commons.jpg",
      isCommercialSafe: true,
      attribution: "Benh LIEU SONG, CC BY-SA 3.0, via Wikimedia Commons",
    },
    originalImage: wikiThumb("a/a8", "Tour_Eiffel_Wikimedia_Commons.jpg", 700),
    differences: [
      { id: "cloud-added",  x: 22, y: 18, radius: 8, label: "구름" },
      { id: "tower-top",    x: 51, y:  8, radius: 5, label: "꼭대기 조명" },
      { id: "tree-left",    x: 18, y: 74, radius: 8, label: "왼쪽 나무" },
      { id: "building-bg",  x: 82, y: 66, radius: 7, label: "배경 건물 색" },
      { id: "sky-tint",     x: 84, y: 30, radius: 9, label: "하늘 색조" },
    ],
    overlays: [
      { id: "cloud-added",  shape: "ellipse", x: 22, y: 18, w: 20, h: 11, fill: "#FFFFFF", opacity: 0.50, blend: "screen" },
      { id: "tower-top",    shape: "ellipse", x: 51, y:  8, w:  4, h:  4, fill: "#FF4400", opacity: 0.80, blend: "normal" },
      { id: "tree-left",    shape: "ellipse", x: 18, y: 74, w: 13, h: 18, fill: "#87CEEB", opacity: 0.75, blend: "normal" },
      { id: "building-bg",  shape: "rect",    x: 82, y: 66, w: 11, h: 13, fill: "#FF8C00", opacity: 0.42, blend: "color" },
      { id: "sky-tint",     shape: "ellipse", x: 84, y: 30, w: 18, h: 18, fill: "#001080", opacity: 0.30, blend: "multiply" },
    ],
  },

  // 5. 콜로세움 — 로마
  {
    id: "sp-05",
    slug: "colosseum",
    title: "로마 콜로세움",
    subtitle: "2000년 역사를 간직한 콜로세움 속 숨은 차이를 찾으세요",
    category: "landmark",
    difficulty: "easy",
    timeLimit: 100,
    color: "#92400E",
    bgColor: "#FEF3C7",
    emoji: "🏛️",
    sceneType: "",
    source: {
      originalTitle: "Colosseum",
      artistOrPlace: "Rome, Italy",
      year: "2020",
      license: "CC BY-SA 4.0",
      licenseName: "크리에이티브 커먼즈 BY-SA 4.0",
      provider: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Colosseo_2020.jpg",
      isCommercialSafe: true,
      attribution: "© Photographer, CC BY-SA 4.0, via Wikimedia Commons",
    },
    originalImage: wikiThumb("d/de", "Colosseo_2020.jpg", 900),
    differences: [
      { id: "arch-dark",   x: 38, y: 56, radius: 7, label: "아치 명암" },
      { id: "cloud-shape", x: 72, y: 22, radius: 9, label: "구름 모양" },
      { id: "tree-base",   x: 16, y: 72, radius: 8, label: "앞쪽 나무" },
      { id: "stone-tone",  x: 58, y: 44, radius: 9, label: "석재 색조" },
      { id: "fence-red",   x: 82, y: 80, radius: 7, label: "하단 펜스 색" },
    ],
    overlays: [
      { id: "arch-dark",   shape: "ellipse", x: 38, y: 56, w:  9, h: 11, fill: "#000020", opacity: 0.62, blend: "multiply" },
      { id: "cloud-shape", shape: "ellipse", x: 72, y: 22, w: 20, h: 13, fill: "#FFFFFF", opacity: 0.48, blend: "screen" },
      { id: "tree-base",   shape: "ellipse", x: 16, y: 72, w:  9, h: 15, fill: "#228B22", opacity: 0.72, blend: "normal" },
      { id: "stone-tone",  shape: "rect",    x: 58, y: 44, w: 13, h: 11, fill: "#8B6914", opacity: 0.42, blend: "color" },
      { id: "fence-red",   shape: "rect",    x: 82, y: 80, w: 11, h:  5, fill: "#CC0000", opacity: 0.68, blend: "normal" },
    ],
  },

  // 6. 타지마할 — 인도
  {
    id: "sp-06",
    slug: "taj-mahal",
    title: "타지마할",
    subtitle: "사랑의 기념비 타지마할에 숨겨진 차이를 찾아보세요",
    category: "landmark",
    difficulty: "hard",
    timeLimit: 150,
    color: "#0C4A6E",
    bgColor: "#E0F2FE",
    emoji: "🕌",
    sceneType: "",
    source: {
      originalTitle: "Taj Mahal, Agra",
      artistOrPlace: "Agra, India",
      year: "",
      license: "CC BY-SA 3.0",
      licenseName: "크리에이티브 커먼즈 BY-SA 3.0",
      provider: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India_edit3.jpg",
      isCommercialSafe: true,
      attribution: "Yann Forget / Wikimedia Commons, CC BY-SA 3.0",
    },
    originalImage: wikiThumb(
      "b/bd",
      "Taj_Mahal,_Agra,_India_edit3.jpg",
      900
    ),
    differences: [
      { id: "reflection",   x: 51, y: 80, radius: 7, label: "수면 반영" },
      { id: "minaret-top",  x: 28, y: 15, radius: 6, label: "미나렛 첨탑" },
      { id: "cypress-left", x: 15, y: 63, radius: 6, label: "삼나무" },
      { id: "cloud-dome",   x: 65, y: 18, radius: 8, label: "돔 위 구름" },
      { id: "pool-color",   x: 51, y: 72, radius: 8, label: "반영 연못 색" },
    ],
    overlays: [
      { id: "reflection",   shape: "ellipse", x: 51, y: 80, w: 11, h:  7, fill: "#003366", opacity: 0.52, blend: "multiply" },
      { id: "minaret-top",  shape: "ellipse", x: 28, y: 15, w:  4, h:  6, fill: "#FFD700", opacity: 0.62, blend: "color" },
      { id: "cypress-left", shape: "ellipse", x: 15, y: 63, w:  5, h: 16, fill: "#8B4513", opacity: 0.48, blend: "color" },
      { id: "cloud-dome",   shape: "ellipse", x: 65, y: 18, w: 18, h: 11, fill: "#FFFFFF", opacity: 0.42, blend: "screen" },
      { id: "pool-color",   shape: "rect",    x: 51, y: 72, w: 16, h:  7, fill: "#00A8CC", opacity: 0.50, blend: "color" },
    ],
  },
];
