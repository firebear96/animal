"use client";

import React, { useState, useRef, useEffect } from "react";

// --- Types ---
interface Animal {
  id: string;
  name: string;
  emoji: string;
  tags: string[];
  description: string;
  celebrities: string[];
  compatibility: {
    good: string;
    bad: string;
  };
  themeClass: {
    text: string;
    bg: string;
    border: string;
    accentBg: string;
    accentText: string;
    progressBg: string;
  };
}

// --- Mock Data for Animals ---
const ANIMAL_LIST: Animal[] = [
  {
    id: "dog",
    name: "강아지상",
    emoji: "🐶",
    tags: ["#다정다감", "#순둥이", "#친화력갑", "#사랑받는_존재"],
    description: "귀엽고 친근한 인상! 둥글둥글한 눈매와 다정한 미소로 주변 사람들에게 항상 긍정적인 에너지를 주는 타입입니다. 배려심이 많아 누구와도 쉽게 가까워지며, 감정이 얼굴에 잘 드러나는 순수한 매력이 있습니다.",
    celebrities: ["박보영", "송중기", "백현", "한지민", "정해인"],
    compatibility: {
      good: "고양이상 🐱 (츤데레 케미)",
      bad: "공룡상 🦖 (첫인상 어색함)"
    },
    themeClass: {
      text: "text-amber-600",
      bg: "bg-amber-50/70",
      border: "border-amber-200",
      accentBg: "bg-amber-100",
      accentText: "text-amber-800",
      progressBg: "bg-amber-500"
    }
  },
  {
    id: "cat",
    name: "고양이상",
    emoji: "🐱",
    tags: ["#시크도도", "#반전매력", "#지적인", "#섬세함"],
    description: "도도하고 매력적인 인상! 눈꼬리가 살짝 올라가 첫인상은 시크해 보이지만, 알면 알수록 다정하고 따뜻한 속마음을 보여주는 '츤데레' 타입입니다. 호기심이 많고 자기 주관이 뚜렷하며, 섬세한 감성의 소유자입니다.",
    celebrities: ["제니", "강동원", "한예슬", "시우민", "오연서"],
    compatibility: {
      good: "강아지상 🐶 (찰떡궁합 케미)",
      bad: "곰상 🐻 (속도 조절 필요)"
    },
    themeClass: {
      text: "text-indigo-600",
      bg: "bg-indigo-50/70",
      border: "border-indigo-200",
      accentBg: "bg-indigo-100",
      accentText: "text-indigo-800",
      progressBg: "bg-indigo-500"
    }
  },
  {
    id: "rabbit",
    name: "토끼상",
    emoji: "🐰",
    tags: ["#사랑스러움", "#보호본능", "#인간비타민", "#맑음"],
    description: "보기만 해도 기분 좋아지는 사랑스럽고 맑은 인상! 크고 맑은 눈망울과 오밀조밀하고 귀여운 입술이 매력적이며, 밝고 애교 넘치는 성격으로 주변의 사랑을 듬뿍 받는 인간 비타민 타입입니다.",
    celebrities: ["나연", "수지", "정국", "장원영", "임시완"],
    compatibility: {
      good: "사막여우상 🦊 (상호보완 케미)",
      bad: "공룡상 🦖 (깜짝 놀람 주의)"
    },
    themeClass: {
      text: "text-rose-500",
      bg: "bg-rose-50/70",
      border: "border-rose-200",
      accentBg: "bg-rose-100",
      accentText: "text-rose-800",
      progressBg: "bg-rose-400"
    }
  },
  {
    id: "fox",
    name: "사막여우상",
    emoji: "🦊",
    tags: ["#매혹적", "#눈빛매력", "#똑소리남", "#신비로움"],
    description: "날렵하고 세련된 매혹적인 인상! 가로로 긴 매력적인 눈매와 오뚝한 콧날이 특징이며, 스마트하고 센스 있는 말솜씨로 이성을 끄는 신비로운 매력을 가지고 있습니다. 겉은 쿨해 보이지만 내면은 깊고 의리가 넘칩니다.",
    celebrities: ["황민현", "예지", "주지훈", "강슬기", "서인국"],
    compatibility: {
      good: "토끼상 🐰 (알콩달콩 케미)",
      bad: "곰상 🐻 (답답함 주의)"
    },
    themeClass: {
      text: "text-orange-500",
      bg: "bg-orange-50/70",
      border: "border-orange-200",
      accentBg: "bg-orange-100",
      accentText: "text-orange-800",
      progressBg: "bg-orange-500"
    }
  },
  {
    id: "dinosaur",
    name: "공룡상",
    emoji: "🦖",
    tags: ["#카리스마", "#뚜렷한이목구비", "#훈남훈녀", "#츤데레"],
    description: "개성 있고 입체적인 이목구비를 지닌 매력적인 인상! 선이 굵은 얼굴 윤곽과 뚜렷한 존재감으로 첫인상은 카리스마 있고 차가워 보이지만, 장난기 넘치고 털털하여 한 번 빠지면 헤어 나오기 힘든 훈남/훈녀의 정석입니다.",
    celebrities: ["공유", "김우빈", "류준열", "신민아", "홍종현"],
    compatibility: {
      good: "곰상 🐻 (편안하고 든든함)",
      bad: "강아지상 🐶 (기싸움 금지)"
    },
    themeClass: {
      text: "text-emerald-600",
      bg: "bg-emerald-50/70",
      border: "border-emerald-200",
      accentBg: "bg-emerald-100",
      accentText: "text-emerald-800",
      progressBg: "bg-emerald-500"
    }
  },
  {
    id: "bear",
    name: "곰상",
    emoji: "🐻",
    tags: ["#포근함", "#든든함", "#신뢰성", "#온화함"],
    description: "둥글고 푸근한 인상으로 주변에 깊은 안정감을 주는 매력! 순하고 부드러운 눈매가 매력적이며, 넓은 마음과 포용력으로 타인의 이야기를 잘 들어주는 진중하고 믿음직한 타입입니다.",
    celebrities: ["마동석", "안재홍", "조진웅", "슬기(레드벨벳)", "신동"],
    compatibility: {
      good: "공룡상 🦖 (최고의 파트너)",
      bad: "고양이상 🐱 (밀당의 피로감)"
    },
    themeClass: {
      text: "text-stone-600",
      bg: "bg-stone-50/70",
      border: "border-stone-200",
      accentBg: "bg-stone-100",
      accentText: "text-stone-800",
      progressBg: "bg-stone-500"
    }
  }
];

// --- SVGs & Icons ---
const PawIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 3.5s3-1.5 3-3.5c0-1.66-1.34-3-3-3zm-4.5-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-7.5-4c.83 0 1.5-.67 1.5-1.5S9.33 5 8.5 5 7 5.67 7 6.5 7.67 8 8.5 8zm7 0c.83 0 1.5-.67 1.5-1.5S15.67 5 14.85 5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />
  </svg>
);

const UploadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.748a3.001 3.001 0 110 3.504l-3.518-2.11a3 3 0 010-1.042l3.518-2.11zM19.316 7.252a3 3 0 11-3.504-2.288l3.504 2.288zM19.316 16.748a3 3 0 11-3.504 2.288l3.504-2.288z" />
  </svg>
);

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3" />
  </svg>
);

const SpinnerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

export default function Home() {
  // --- States ---
  const [image, setImage] = useState<string | null>(null);
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<Animal | null>(null);
  const [similarity, setSimilarity] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTypesModalOpen, setIsTypesModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Analysis Step Descriptions ---
  const analysisSteps = [
    "얼굴 윤곽선 및 랜드마크 추출 중...",
    "이목구비 대칭성 및 비율 측정 중...",
    "동물상 유형별 빅데이터 매칭 중...",
    "싱크로율 정밀 분석 완료!"
  ];

  // --- Show Toast Notification ---
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // --- Trigger file selection ---
  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // --- Handle File Select ---
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("이미지 파일(JPG, PNG)만 올려주세요!");
      return;
    }
    setFileObject(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
        setResult(null); // Reset previous result
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // --- Drag and Drop Events ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // --- Start Mock AI Analysis ---
  const startAnalysis = () => {
    if (!fileObject) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);

    // Mock progress ticker
    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          finishAnalysis();
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  const finishAnalysis = () => {
    if (!fileObject) return;

    // Deterministic Hash calculation using filename + size
    let hash = 0;
    const key = fileObject.name + fileObject.size.toString();
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);

    // Select Animal & Calculate Similarity Score
    const animalIndex = absHash % ANIMAL_LIST.length;
    const finalScore = 75 + (absHash % 25); // 75% ~ 99%

    setTimeout(() => {
      setResult(ANIMAL_LIST[animalIndex]);
      setSimilarity(finalScore);
      setIsAnalyzing(false);
    }, 400);
  };

  // --- Reset Test ---
  const handleReset = () => {
    setImage(null);
    setFileObject(null);
    setResult(null);
    setSimilarity(0);
  };

  // --- Copy current link for Sharing ---
  const handleShare = () => {
    if (typeof window === "undefined") return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          showToast("링크가 클립보드에 복사되었습니다! 친구들에게 공유해 보세요 🐾");
        })
        .catch(() => {
          showToast("링크 복사에 실패했습니다. 주소창의 링크를 직접 공유해 주세요!");
        });
    } else {
      showToast("링크 복사를 지원하지 않는 브라우저입니다.");
    }
  };

  return (
    <div className="relative h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-50/40 via-orange-50/20 to-indigo-50/20 footprint-bg">
      {/* Decorative floating shapes in background */}
      <div className="absolute top-[10%] left-[5%] text-indigo-200/20 animate-float-slow pointer-events-none">
        <PawIcon className="w-16 h-16 transform -rotate-12" />
      </div>
      <div className="absolute bottom-[15%] right-[8%] text-orange-200/20 animate-float-slow pointer-events-none" style={{ animationDelay: "2s" }}>
        <PawIcon className="w-20 h-20 transform rotate-12" />
      </div>
      <div className="absolute top-[40%] right-[3%] text-indigo-200/10 animate-float-slow pointer-events-none" style={{ animationDelay: "4s" }}>
        <PawIcon className="w-10 h-10 transform rotate-45" />
      </div>
      <div className="absolute bottom-[40%] left-[2%] text-orange-200/15 animate-float-slow pointer-events-none" style={{ animationDelay: "6s" }}>
        <PawIcon className="w-12 h-12 transform -rotate-45" />
      </div>

      {/* --- 1. Header (GNB) --- */}
      <header className="z-10 w-full h-[64px] border-b border-indigo-100/50 bg-white/70 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-indigo-950 text-lg md:text-xl">
          <span className="text-xl md:text-2xl animate-pulse-subtle">🐾</span>
          <span className="bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent">애니멀 페이스</span>
          <span className="text-xs text-indigo-400 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full hidden sm:inline-block">Animal Face</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => showToast("이미 동물상 테스트 화면입니다!")} className="text-sm font-medium text-indigo-950 hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none">
            테스트하기
          </button>
          <button onClick={() => setIsTypesModalOpen(true)} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none">
            동물상 종류
          </button>
          <button onClick={handleShare} className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 px-4 py-2 rounded-full shadow-sm hover:shadow-indigo-100 transition-all flex items-center gap-1.5 cursor-pointer border-none">
            <ShareIcon className="w-4 h-4" />
            공유하기
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={handleShare} className="p-2 text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors cursor-pointer bg-transparent border-none" title="공유하기">
            <ShareIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors focus:outline-none cursor-pointer bg-transparent border-none"
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-indigo-950/40 backdrop-blur-sm animate-fade-in md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-[240px] bg-white p-6 shadow-2xl flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="font-bold text-indigo-950">메뉴</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-indigo-950 cursor-pointer bg-transparent border-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button onClick={() => { setIsMobileMenuOpen(false); showToast("이미 동물상 테스트 화면입니다!"); }} className="text-left py-2 font-semibold text-indigo-650 hover:bg-indigo-50 px-3 rounded-lg transition-colors cursor-pointer bg-transparent border-none">
              🐾 테스트하기
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); setIsTypesModalOpen(true); }} className="text-left py-2 font-medium text-slate-700 hover:bg-indigo-50 px-3 rounded-lg transition-colors cursor-pointer bg-transparent border-none">
              🔍 동물상 종류
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); handleShare(); }} className="text-left py-2 font-medium text-slate-700 hover:bg-indigo-50 px-3 rounded-lg transition-colors flex items-center gap-2 cursor-pointer bg-transparent border-none">
              <ShareIcon className="w-4 h-4" /> 링크 공유하기
            </button>
          </div>
        </div>
      )}

      {/* --- 2. Main Content Area --- */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col justify-center py-4 md:py-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center justify-center h-full">
          
          {/* Left Column: Title & Description */}
          <div className="md:col-span-5 text-center md:text-left flex flex-col justify-center animate-fade-in-up">
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full text-xs md:text-sm mx-auto md:mx-0 w-fit mb-3 shadow-sm border border-indigo-100">
              <PawIcon className="w-3.5 h-3.5" />
              100% 프라이버시 보장 테스트
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-indigo-950 tracking-tight leading-[1.25]">
              나와 닮은 <br className="hidden md:inline" />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">동물상</span>은 무엇일까?
            </h1>
            <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-md mx-auto md:mx-0">
              인공지능이 당신의 얼굴 특징을 정밀 분석하여 가장 싱크로율이 높은 동물상을 찾아 드립니다. 
              <span className="font-semibold text-indigo-600 block mt-1">업로드하신 사진은 그 어디에도 저장되지 않으니</span> 안심하고 즉시 테스트해 보세요!
            </p>
            
            {/* Simple Footnote / Safety badge */}
            <div className="mt-4 hidden md:flex items-center gap-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1">
                <CheckIcon className="w-4 h-4 text-indigo-500" />
                서버 전송 없음
              </div>
              <div className="flex items-center gap-1">
                <CheckIcon className="w-4 h-4 text-indigo-500" />
                모바일 완벽 대응
              </div>
              <div className="flex items-center gap-1">
                <CheckIcon className="w-4 h-4 text-indigo-500" />
                즉시 결과 확인
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Card (Dropzone, Loading, or Result) */}
          <div className="md:col-span-7 w-full flex items-center justify-center h-full max-h-[500px] md:max-h-[550px]">
            <div className="w-full max-w-[480px] bg-white border border-indigo-100/80 rounded-3xl p-5 md:p-6 shadow-xl shadow-indigo-100/40 relative overflow-hidden flex flex-col justify-center h-full min-h-[360px] md:min-h-[420px] transition-all duration-300">
              
              {/* --- A. Upload Dropzone / Preview Screen --- */}
              {!isAnalyzing && !result && (
                <div className="flex flex-col justify-between h-full w-full gap-4">
                  <div 
                    onClick={handleDropzoneClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-350 select-none overflow-hidden relative min-h-[220px] ${
                      isDragOver 
                        ? "border-indigo-600 bg-indigo-50/50 scale-[0.99] shadow-inner" 
                        : image 
                          ? "border-indigo-200 bg-slate-50" 
                          : "border-slate-300/80 hover:border-indigo-400 hover:bg-slate-50/30"
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/*" 
                      className="hidden" 
                    />

                    {image ? (
                      /* Preview of Uploaded Image */
                      <div className="w-full h-full relative flex items-center justify-center p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={image} 
                          alt="업로드 사진" 
                          className="max-w-full max-h-[260px] object-contain rounded-xl shadow-sm"
                        />
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleReset(); }} 
                          className="absolute top-3 right-3 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full p-2 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer border-none"
                          title="사진 지우기"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      /* Dropzone Default State */
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="bg-indigo-50 text-indigo-600 rounded-2xl p-4 mb-4 transition-transform group-hover:scale-110 shadow-sm">
                          <UploadIcon className="w-7 h-7" />
                        </div>
                        <p className="text-sm font-semibold text-slate-800">
                          이곳을 클릭하거나 사진을 드래그해서 올려주세요
                        </p>
                        <p className="text-xs text-slate-400 mt-2 font-medium">
                          지원 형식: JPG, PNG (얼굴이 잘 보이는 정면 사진이 좋습니다)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={startAnalysis}
                      disabled={!image}
                      className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all cursor-pointer border-none ${
                        image 
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md active:scale-[0.98]" 
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <PawIcon className="w-4 h-4" />
                      동물상 분석하기
                    </button>
                  </div>
                </div>
              )}

              {/* --- B. Analyzing Screen --- */}
              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center w-full">
                  <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full bg-indigo-100 animate-ping opacity-75"></div>
                    <div className="z-10 bg-indigo-50 text-indigo-600 rounded-full p-5 shadow-inner">
                      <SpinnerIcon className="w-8 h-8 animate-spin text-indigo-600" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-indigo-950 mb-2">
                    인공지능이 분석하는 중입니다
                  </h3>
                  
                  {/* Analysis progress ticks */}
                  <div className="h-6 overflow-hidden relative w-full mb-6 max-w-[280px]">
                    <div 
                      className="absolute inset-x-0 transition-transform duration-500 ease-out text-sm font-medium text-indigo-600/90"
                      style={{ transform: `translateY(-${analysisStep * 24}px)` }}
                    >
                      {analysisSteps.map((step, idx) => (
                        <div key={idx} className="h-6 flex items-center justify-center">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mock progress bar */}
                  <div className="w-full max-w-[280px] h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-orange-500 transition-all duration-700 ease-out rounded-full"
                      style={{ width: `${(analysisStep + 1) * 25}%` }}
                    />
                  </div>
                </div>
              )}

              {/* --- C. Result Screen --- */}
              {result && (
                <div className="flex flex-col justify-between h-full w-full gap-4 overflow-y-auto no-scrollbar pr-0.5">
                  <div className="flex flex-col items-center text-center">
                    
                    {/* Small preview of user uploaded picture */}
                    {image && (
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-full border border-indigo-150 overflow-hidden shadow-inner hidden sm:block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image} alt="User Face" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="inline-flex items-center justify-center text-5xl md:text-6xl p-4 bg-indigo-50/50 rounded-3xl mb-3 border border-indigo-100 shadow-sm animate-pulse-subtle">
                      {result.emoji}
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-indigo-950 flex items-center gap-1.5">
                      우와, 당신은 <span className={result.themeClass.text}>{result.name}</span> 이군요!
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-1.5 mt-2.5 max-w-[90%]">
                      {result.tags.map((tag, i) => (
                        <span key={i} className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${result.themeClass.accentBg} ${result.themeClass.accentText}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress Bar (Similarity Score) */}
                    <div className="w-full mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-3 shadow-inner">
                      <div className="flex justify-between items-center mb-1 px-1">
                        <span className="text-xs font-bold text-slate-500">싱크로율 매칭</span>
                        <span className={`text-sm font-black ${result.themeClass.text}`}>{similarity}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200/60 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${result.themeClass.progressBg} transition-all duration-1000 ease-out`}
                          style={{ width: `${similarity}%` }}
                        />
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <p className="mt-4 text-xs md:text-sm text-slate-600 leading-relaxed text-left bg-slate-50/50 border border-slate-100 p-3 rounded-xl max-h-[100px] overflow-y-auto no-scrollbar">
                      {result.description}
                    </p>

                    {/* Extra Info: Celebs & Matching */}
                    <div className="w-full grid grid-cols-2 gap-2 mt-3.5 text-left">
                      <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">닮은 연예인</span>
                        <span className="text-[11px] md:text-xs font-semibold text-slate-700 block truncate">
                          {result.celebrities.slice(0, 3).join(", ")}
                        </span>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">최상의 케미</span>
                        <span className="text-[11px] md:text-xs font-semibold text-emerald-600 block truncate">
                          {result.compatibility.good}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-12 gap-2 w-full pt-1 border-t border-slate-100">
                    <button
                      onClick={handleReset}
                      className="col-span-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs md:text-sm transition-all active:scale-[0.96] flex items-center justify-center gap-1 cursor-pointer border-none"
                    >
                      <RefreshIcon className="w-3.5 h-3.5" />
                      다시 하기
                    </button>
                    <button
                      onClick={handleShare}
                      className="col-span-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs md:text-sm shadow-md transition-all active:scale-[0.96] flex items-center justify-center gap-1.5 cursor-pointer border-none"
                    >
                      <ShareIcon className="w-3.5 h-3.5" />
                      결과 공유하기
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* --- 3. Footer --- */}
      <footer className="z-10 w-full h-[40px] border-t border-indigo-50/50 bg-white/40 backdrop-blur-sm px-6 flex items-center justify-between text-[11px] text-slate-400">
        <div>© 2026 Animal Face. All rights reserved.</div>
        <div className="flex gap-4">
          <span>이용약관</span>
          <span>개인정보처리방침</span>
        </div>
      </footer>

      {/* --- Toast Notification Component --- */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs md:text-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-2 border border-slate-800 animate-fade-in">
          <span>🐾</span>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* --- 4. Animal Types Dictionary Modal --- */}
      {isTypesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsTypesModalOpen(false)}>
          <div 
            className="bg-white w-full max-w-4xl h-full max-h-[85vh] md:max-h-[80vh] rounded-3xl p-5 md:p-8 flex flex-col justify-between shadow-2xl relative border border-indigo-100 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-indigo-50 pb-4">
              <div>
                <h2 className="text-lg md:text-2xl font-black text-indigo-950 flex items-center gap-2">
                  <span>🐾</span> 동물상 종류 도감
                </h2>
                <p className="text-xs md:text-sm text-slate-500 mt-1">
                  애니멀 페이스가 정밀 분석하는 대표적인 5가지 동물상의 핵심 특징을 알아보세요.
                </p>
              </div>
              <button 
                onClick={() => setIsTypesModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-indigo-950 hover:bg-slate-100 rounded-full transition-all cursor-pointer border-none"
                title="도감 닫기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content - Staggered Grid */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  name: "강아지상",
                  emoji: "🐶",
                  desc: "둥글둥글하고 순한 눈망울, 처진 눈꼬리가 특징. 친근하고 다정한 이미지.",
                  color: "text-amber-600 bg-amber-50/70 border-amber-200/60 text-amber-900",
                  celebs: "박보영, 송중기, 수지",
                  image: "/images/dog_celeb.png"
                },
                {
                  name: "고양이상",
                  emoji: "🐱",
                  desc: "눈꼬리가 위로 올라가 있고 날카로우면서도 매력적인 눈매가 특징. 세련되고 도도한 이미지.",
                  color: "text-indigo-600 bg-indigo-50/70 border-indigo-200/60 text-indigo-900",
                  celebs: "제니, 강동원, 한예슬",
                  image: "/images/cat_celeb.png"
                },
                {
                  name: "사막여우상",
                  emoji: "🦊",
                  desc: "큰 귀와 뾰족한 턱선, 가늘고 매력적인 눈매가 특징. 지적이면서도 신비로운 이미지.",
                  color: "text-orange-600 bg-orange-50/70 border-orange-200/60 text-orange-900",
                  celebs: "황민현, 예지, 주지훈",
                  image: "/images/fox_celeb.png"
                },
                {
                  name: "공룡상",
                  emoji: "🦖",
                  desc: "굵고 선이 확실한 이목구비, 강인하고 시원시원한 인상이 특징. 개성 있고 카리스마 있는 이미지.",
                  color: "text-emerald-600 bg-emerald-50/70 border-emerald-200/60 text-emerald-900",
                  celebs: "공유, 김우빈, 류준열",
                  image: "/images/dino_celeb.png"
                },
                {
                  name: "토끼상",
                  emoji: "🐰",
                  desc: "앞니가 살짝 보이고 맑고 큰 눈, 귀여운 볼살이 특징. 사랑스럽고 보호본능을 자극하는 이미지.",
                  color: "text-rose-600 bg-rose-50/70 border-rose-200/60 text-rose-900",
                  celebs: "나연, 정국, 장원영",
                  image: "/images/rabbit_celeb.png"
                }
              ].map((animal, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center justify-between text-center p-4 border rounded-2xl bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 hover:border-indigo-300 group cursor-default animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 120}ms`,
                    animationFillMode: "forwards",
                    opacity: 0
                  }}
                >
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-4xl md:text-5xl mb-3.5 transform group-hover:scale-110 transition-transform duration-300">
                      {animal.emoji}
                    </span>
                    <h3 className="font-bold text-sm md:text-base text-slate-800 mb-2">
                      {animal.name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-medium mb-3 flex-1 flex items-center">
                      {animal.desc}
                    </p>
                  </div>
                  
                  <div className="w-full mt-2 pt-2.5 border-t border-slate-100 text-left relative group/celeb">
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">대표 연예인</span>
                    <span className="text-[10px] md:text-xs font-semibold text-slate-700 block truncate cursor-pointer hover:text-indigo-650 transition-colors">
                      {animal.celebs}
                    </span>
                    
                    {/* Floating Celebrity Image Tooltip on Hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-xl border-2 border-indigo-150 z-20 bg-white opacity-0 pointer-events-none invisible scale-90 group-hover/celeb:opacity-100 group-hover/celeb:visible group-hover/celeb:scale-100 transition-all duration-300 ease-out origin-bottom">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={animal.image} 
                        alt={`${animal.name} 대표`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-indigo-50 pt-4 flex justify-end">
              <button
                onClick={() => setIsTypesModalOpen(false)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs md:text-sm shadow-md transition-all active:scale-[0.96] cursor-pointer border-none"
              >
                도감 확인 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
