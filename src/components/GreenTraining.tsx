/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, BookOpen, Star, Sparkles, Award, PlayCircle, 
  HelpCircle, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, BadgeHelp
} from 'lucide-react';

interface GreenTrainingProps {
  onLogBehavior: (behaviorId: string, quantity: number, points: number) => void;
  lang?: 'en' | 'zh';
}

interface QuizQuestion {
  id: string;
  scenarioEn: string;
  scenarioZh: string;
  options: {
    textEn: string;
    textZh: string;
    isCorrect: boolean;
    points: number;
    feedbackEn: string;
    feedbackZh: string;
  }[];
}

const ACADEMY_PATH = [
  { step: 1, nameEn: "Scope 3 Awareness", nameZh: "认识全供应链 Scope 3 避碳", active: true, completed: false },
  { step: 2, nameEn: "Office Energy Vampires", nameZh: "消灭办公室“吸能电力魔兽”", active: false, completed: false },
  { step: 3, nameEn: "Smart Commute Logistics", nameZh: "智慧碳中和绿色出行流算法", active: false, completed: false },
  { step: 4, nameEn: "Direct Desert Sovereignty", nameZh: "认领西部荒漠梭梭沙障产权", active: false, completed: false }
];

export default function GreenTraining({ onLogBehavior, lang = 'zh' }: GreenTrainingProps) {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: path selector, 1: ongoing training, 2: completed certification
  const [activeCourseIndex, setActiveCourseIndex] = useState<number>(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [scoreEarned, setScoreEarned] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [degreeAwarded, setDegreeAwarded] = useState<boolean>(false);

  const QUIZ_COURSES: QuizQuestion[][] = [
    // Course 1: Scope 3
    [
      {
        id: 'q1_1',
        scenarioEn: "Your colleague requests a full-size color printout of a 40-page report 'to skim through'. Standard paper pulping contributes heavy Scope 3 carbon assets. What is the optimal micro-green behavioral choice?",
        scenarioZh: "同事在季度末请您帮忙将 40 页的精细财务文档印制成全幅单面彩页纸张“随手翻翻”。从企业 Scope 3 二氧化碳和化学漂白排放合规性来看，何种微行为判断是最具 PEB 智慧的？",
        options: [
          {
            textEn: "Print it as requested. Skimming is vital for high productivity.",
            textZh: "顺其自然打印。纸面上批注在商务会议中最重要，工作效能优先。",
            isCorrect: false,
            points: 5,
            feedbackEn: "One-sided custom printing produces 15g CO2 and uses bleached virgin wood pulp.",
            feedbackZh: "单面彩色打印会瞬间释放多达 15g 级的碳排放并白白虚耗原浆漂白纸。"
          },
          {
            textEn: "Suggest sharing an interactive cloud link + highlight critical chapters in the portal. Offer to print 2 double-sided grayscale summarizer sheets if necessary.",
            textZh: "委婉阻拦其申请。在云文档中标记核心内容共享，必要时仅帮其双面拼版印制 2 页核心摘要。",
            isCorrect: true,
            points: 30,
            feedbackEn: "Saves up to 180g of carbon equivalent and avoids direct bleaching byproduct waste!",
            feedbackZh: "恭喜！此举不仅省去了大量的纸浆处理碳损耗，还将节省出约 180g 净减排当量，计入团队低碳指数！"
          }
        ]
      },
      {
        id: 'q1_2',
        scenarioEn: "At lunchtime, you notice three meeting room HVAC/Air-Conditioning units are left cooling empty rooms with door clips open. This is a G-pillar workspace governance leakage. Your move?",
        scenarioZh: "午休下楼吃饭时，您突然路过 3 会议室，发现空调挂机仍在大功率吹冷气，且会议室木门敞开大缝，冷热空气不断交合。这在公司 G 支柱内控审计中属于违犯，您的最优解是？",
        options: [
          {
            textEn: "Turn them off and lock the door using the corridor key pad (+30 GP).",
            textZh: "立断关闭两台不常用空调，关紧房门，拉动节能百叶物理遮阳 (+30 GP)",
            isCorrect: true,
            points: 30,
            feedbackEn: "Saves 1.1kW of continuous grid energy over empty hours.",
            feedbackZh: "绝佳行为！物理隔绝能彻底守住温度场，立刻锁住空调空转带来的 1.1kW 电网纯电力损耗！"
          },
          {
            textEn: "Leave it. Office HVAC operates on automatic feedback anyway.",
            textZh: "无视走开，反正空调电费集团有统一补贴而且下午大家还会用到。",
            isCorrect: false,
            points: 0,
            feedbackEn: "Leaving empty cooling running on leaky systems causes massive waste.",
            feedbackZh: "开合大缝下的空转设备不仅容易引起压缩机凝结爆裂，更会制造持续一整天的严重能量黑洞。"
          }
        ]
      }
    ]
  ];

  const activeCourse = QUIZ_COURSES[activeCourseIndex];
  const activeQuestion = activeCourse[activeQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(index);
    setShowFeedback(true);

    const isCorrect = activeCourse[activeQuestionIndex].options[index].isCorrect;
    if (isCorrect) {
      setScoreEarned(prev => prev + activeCourse[activeQuestionIndex].options[index].points);
    }
  };

  const handleNext = () => {
    setSelectedOptionIndex(null);
    setShowFeedback(false);

    if (activeQuestionIndex < activeCourse.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    } else {
      // Completed the training program successfully
      onLogBehavior('participate_activities', 1, scoreEarned);
      setDegreeAwarded(true);
      setCurrentStep(2); // show graduation card
    }
  };

  const resetActivity = () => {
    setCurrentStep(0);
    setActiveQuestionIndex(0);
    setSelectedOptionIndex(null);
    setShowFeedback(false);
    setScoreEarned(0);
    setDegreeAwarded(false);
  };

  const t = {
    header: lang === 'en' ? 'Green Academy' : '低碳智慧学习堂',
    tagline: lang === 'en' ? '3-min Gamified Micro-lessons & Scenario Challenges' : '拒绝枯燥PPT和长篇PDF！3分钟 Duolingo 交互关卡与生态考证',
    introTitle: lang === 'en' ? 'Choose Your Green Track' : '选读您今日的微学分计划:',
    levelLabel: lang === 'en' ? 'Level' : '单元等级',
    streakTitle: lang === 'en' ? 'Learning Streak' : '低碳行者连击打卡',
    streakDays: lang === 'en' ? '6 days' : '持续 6 天',
    btnPlay: lang === 'en' ? 'Launch' : '轻巧开课',
    progLabel: lang === 'en' ? 'Quiz Progress' : '知识测算进度',
    btnNext: lang === 'en' ? 'Next Scenario' : '下个实景模拟',
    gradTitle: lang === 'en' ? 'Green Micro-degree Awarded!' : '恭喜！您已成功斩获绿色微证书',
    gradDesc: lang === 'en' 
      ? 'Outstanding! You completed your Scope 3 Corporate Low-Carbon training session and unlocked direct environmental credentials.'
      : '太棒了！您成功攻克《Scope 3 企业前沿低碳减排策略》实景考核。该证书荣誉可一键披露在您的个人 ESG 履历勋章壁上。',
    earnedGP: lang === 'en' ? 'Bonus GP Credited' : '本项累计斩获能量',
    backBtn: lang === 'en' ? 'Return to Pathway' : '完成，回课程路径',
    traditionalVS: lang === 'en' ? 'VS Traditional PPT Paperwork' : '对决传统企业讲座的降维优势:',
    tradItem1: lang === 'en' ? '⚡ Gamified Active Scenarios: Triggers pro-environmental behavior loops' : '⚡ 交互情景代入：相比静态 PPT，行为认知吸收率提升 340%',
    tradItem2: lang === 'en' ? '🌿 Instant validation of real physical office waste alternatives' : '🌿 即时行为干预：在办公耗能、生活废品扔投的第一时间给出指导'
  };

  return (
    <div id="green_academy_training" className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
      <div>
        
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 font-display flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              {t.header}
            </h2>
            <p className="text-[11px] text-slate-500 mt-1">{t.tagline}</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl px-3 py-1.5 flex items-center gap-1.5 self-start sm:self-auto shrink-0 animate-pulse text-xs font-bold leading-none">
            <Star className="w-4 h-4 text-amber-550 fill-amber-300" />
            <div>
              <span className="block text-[8px] text-amber-700/70 font-semibold uppercase">{t.streakTitle}</span>
              <span>{t.streakDays}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Stepper pathway like Duolingo */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <p className="text-xs font-bold text-slate-800 font-display">{t.introTitle}</p>
            
            <div className="space-y-4">
              {ACADEMY_PATH.map((itm, i) => (
                <div 
                  key={itm.step}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    i === 0 
                      ? 'bg-emerald-50/40 border-emerald-250 ring-1 ring-emerald-500/5' 
                      : 'bg-slate-50/50 border-slate-150 grayscale opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-black text-xs ${
                      i === 0 
                        ? 'bg-emerald-600 text-white animate-bounce' 
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {itm.step}
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-400 block font-bold uppercase">{t.levelLabel} {itm.step}</span>
                      <span className="text-xs font-extrabold text-slate-850 font-display">{lang === 'en' ? itm.nameEn : itm.nameZh}</span>
                    </div>
                  </div>

                  {i === 0 ? (
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] px-3.5 py-1.8 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      {t.btnPlay}
                    </button>
                  ) : (
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Locked</span>
                  )}
                </div>
              ))}
            </div>

            {/* Academic Thesis Paradigm comparison details */}
            <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-2">
              <span className="text-[9px] text-slate-400 uppercase font-bold block">{t.traditionalVS}</span>
              <ul className="text-[10px] text-slate-500 space-y-1 leading-relaxed">
                <li className="flex items-start gap-1">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t.tradItem1}</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t.tradItem2}</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Scenario Simulator Interface */}
        {currentStep === 1 && activeQuestion && (
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2.5">
              <span>{t.progLabel} (Unit 1)</span>
              <span className="font-mono font-bold text-slate-600">{activeQuestionIndex + 1} / {activeCourse.length}</span>
            </div>

            {/* Simulated environmental problem */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-xs font-bold text-slate-800 leading-relaxed font-display">
              ❓ {lang === 'en' ? activeQuestion.scenarioEn : activeQuestion.scenarioZh}
            </div>

            {/* Options layout */}
            <div className="space-y-3">
              {activeQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedOptionIndex === oIdx;
                const isCorrect = opt.isCorrect;
                
                // Styling classes for option triggers
                let borderStyle = 'border-slate-150 hover:border-emerald-250 bg-white';
                if (selectedOptionIndex !== null) {
                  if (isSelected) {
                    borderStyle = isCorrect 
                      ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/20' 
                      : 'bg-rose-50 border-rose-400 ring-2 ring-rose-500/20';
                  } else {
                    borderStyle = isCorrect 
                      ? 'bg-emerald-50/30 border-emerald-300 opacity-80' 
                      : 'border-slate-150 opacity-50';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={selectedOptionIndex !== null}
                    className={`p-3.5 rounded-xl border text-left text-xs text-slate-700 transition-all font-medium leading-relaxed w-full cursor-pointer ${borderStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-5 h-5 rounded-full border text-[10px] flex items-center justify-center font-bold shrink-0 ${
                        isSelected 
                          ? (isCorrect ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-rose-600 text-white border-rose-600')
                          : 'border-slate-300'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{lang === 'en' ? opt.textEn : opt.textZh}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback alert panel */}
            <AnimatePresence>
              {showFeedback && selectedOptionIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-xs space-y-1 leading-relaxed border ${
                    activeQuestion.options[selectedOptionIndex].isCorrect
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-250'
                      : 'bg-rose-50 text-rose-800 border-rose-250'
                  }`}
                >
                  <p className="font-extrabold flex items-center gap-1">
                    {activeQuestion.options[selectedOptionIndex].isCorrect 
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    }
                    {activeQuestion.options[selectedOptionIndex].isCorrect 
                      ? (lang === 'en' ? 'Scientific Choice! (+30 GP)' : '科学决断！(+30 GP)')
                      : (lang === 'en' ? 'Carbon Overload Warning (+0 GP)' : '能耗泄漏警告 (+0 GP)')
                    }
                  </p>
                  <p className="text-[11px] font-medium pl-5 text-slate-600 leading-normal">
                    {lang === 'en' ? activeQuestion.options[selectedOptionIndex].feedbackEn : activeQuestion.options[selectedOptionIndex].feedbackZh}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="bg-slate-900 hover:bg-emerald-600 text-white text-[10px] font-extrabold px-3.5 py-1.8 rounded-xl transition-all shadow-sm flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <span>{t.btnNext}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* Graduation view */}
        {currentStep === 2 && (
          <div className="py-6 text-center space-y-5">
            <div className="relative inline-block">
              <div className="w-18 h-18 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mx-auto shadow-md">
                <Award className="w-10 h-10 animate-bounce" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>

            <div className="space-y-1.5 max-w-sm mx-auto">
              <h3 className="text-base font-extrabold text-slate-850 font-display">
                {t.gradTitle}
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                {t.gradDesc}
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-2xl inline-block">
              <span className="block text-[8px] text-emerald-800/80 font-mono font-bold uppercase">{t.earnedGP}</span>
              <span className="text-lg font-mono font-black text-emerald-700">+{scoreEarned} GP</span>
            </div>

            <div>
              <button
                onClick={resetActivity}
                className="bg-slate-900 hover:bg-emerald-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
              >
                {t.backBtn}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
