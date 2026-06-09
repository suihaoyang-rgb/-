import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Bike, Printer, Lightbulb, Check, ChevronRight, User, AlertCircle, Award } from 'lucide-react';

interface OnboardingWizardProps {
  lang?: 'en' | 'zh';
  isOpen: boolean;
  onClose: () => void;
  onLogBehavior: (behaviorId: string, quantity: number, points: number) => void;
  onAddMessage?: (text: string, type: 'success' | 'warning' | 'info', points?: number) => void;
}

export default function OnboardingWizard({ 
  lang = 'zh', 
  isOpen, 
  onClose, 
  onLogBehavior,
  onAddMessage
}: OnboardingWizardProps) {
  const [step, setStep] = useState<number>(1);
  
  // Profile settings state
  const [commute, setCommute] = useState<string>('transit');
  const [paper, setPaper] = useState<string>('moderate');
  const [energy, setEnergy] = useState<string>('always-on');

  // Completed first task state
  const [firstTaskCompleted, setFirstTaskCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const completeFirstTask = () => {
    if (firstTaskCompleted) return;
    setFirstTaskCompleted(true);
    // Log "duplex_printing" with 2 sheets (8 GP) + Onboarding bonus (+25 GP)
    onLogBehavior('duplex_printing', 2, 25);
    
    if (onAddMessage) {
      onAddMessage(
        lang === 'en' 
          ? "Onboarding Spark: You completed your first sustainability gesture! +25 GP unlocked and verified downstream."
          : "新手首秀达成！您完成了首项低碳办公认证：双面无纸化打印并消减印刷耗损，解锁 +25 GP 种子能量！",
        'success',
        25
      );
    }
  };

  const finishOnboarding = () => {
    localStorage.setItem('ghrm_onboarding_completed', 'true');
    onClose();
  };

  // Translations dictionary
  const t = {
    welcomeTitle: lang === 'en' ? "Welcome to Green Ecosystem" : "欢迎进入企业绿色成长系统",
    welcomeSubtitle: lang === 'en' ? "Your Personal Sustainable Work Habit Companion" : "全员低碳微习惯管理与成长系统",
    welcomeDesc: lang === 'en' 
      ? "Let us transform passive compliance into active daily progress. We will build a customized profile and seed your first-week low-carbon habits in 60 seconds."
      : "告别枯燥的环境教条，开启个性化利他减碳心路。根据您每日的办公常驻模式，我们将智能对齐最佳的低碳行为惯性，并在 60 秒内催生首期低碳目标。",
    startBtn: lang === 'en' ? "Build My Sustainability Profile" : "开启我的个性化低碳画像",
    
    q1Title: lang === 'en' ? "1. Commuting & Mobility Habits" : "1. 您的日常通勤习惯",
    q1Desc: lang === 'en' ? "How do you usually arrive at the office?" : "您通常选择哪种方式前往公司办公大楼？",
    transit: lang === 'en' ? "Public Transit (Subway, Bus)" : "公共交通（乘坐地铁、公交大客车）",
    car: lang === 'en' ? "Single-Occupant Fuel Car" : "燃油私家车 / 的士网约车",
    bike: lang === 'en' ? "E-Bike, Cycling or Walking" : "自主低碳（共享单车、步行通勤）",

    q2Title: lang === 'en' ? "2. Printing & Document Flow" : "2. 您的纸张打印量及票据流",
    q2Desc: lang === 'en' ? "What is your weekly office printing demand?" : "在您现在的岗位上，每周需要进行大量的实物纸张打印吗？",
    heavy: lang === 'en' ? "Heavy Printed Files & Receipts" : "量级较大（财务凭证、图纸、纸质审批流）",
    moderate: lang === 'en' ? "Moderate (Checklists & Occasional)" : "中等频率（偶尔打印，大部分使用电子邮件）",
    digital: lang === 'en' ? "Purely Digital & Paperless" : "全面数字化（100% 电子签名与数字查阅）",

    q3Title: lang === 'en' ? "3. Monitor & Device Energy Habits" : "3. 终端显示器与机箱用能习惯",
    q3Desc: lang === 'en' ? "What do you do with devices during lunch or short breaks?" : "中午午休或离开工位开会时，您的显示器与周边用能端处于何种状态？",
    alwaysOn: lang === 'en' ? "Leave Running / Always Active" : "保持开着（常驻运行，拒绝频繁开关机）",
    sleep5: lang === 'en' ? "Set To Automatic Sleep (5 mins)" : "休眠卫士（设定闲置 5 分钟后自动黑屏）",
    shutdown: lang === 'en' ? "Proactively Turn Off manually" : "随手断电（只要人走就物理切断显示器排插）",

    aiDiagnosticTitle: lang === 'en' ? "AI Behavioral Baseline Generated!" : "AI 智能行为习惯诊断生成！",
    aiDiagnosticSubtitle: lang === 'en' ? "Custom goals to reduce your daily carbon footprint" : "为您匹配的第一周定制化低碳行为守则",
    aiRec: lang === 'en' ? "AI Habit Recommendation Summary:" : "AI 对您习惯的针对性改进评析：",
    goalsTitle: lang === 'en' ? "Custom Weekly Goals for You" : "为您匹配的第一周定制化和行动里程碑：",
    goal1: lang === 'en' ? "✓ Avoid 2 plastic paper cups by bringing your own bottle next week" : "✓ 随身自带保温杯，避用纸杯 2 次（消减 240g 塑料/原木漂白损耗）",
    goal2: lang === 'en' ? "✓ Complete double-sided document sharing to slash 15 sheets of print pulp" : "✓ 发起一次双面拼版共享，减产 15 张单面 A4 纸浆空转",
    goal3: lang === 'en' ? "✓ Track monitor sleep settings before your next long break" : "✓ 设置个人显示器在闲置 5 分钟进入睡眠状态，杜绝空载能耗",

    firstTaskTitle: lang === 'en' ? "Instant Action Experience (60-sec completion)" : "新手即时激活体验 (仅需 1 分钟完成)",
    firstTaskDesc: lang === 'en' 
      ? "Let's perform your very first sustainable step right now to experience how our system tracks and values your daily choices. No hard metrics, just real habits."
      : "现在，让我们立刻跨出第一步。只需选择以下任一最简单的指尖行为，即可验证物理行为转变为企业碳积分的过程，体验无感降碳的成就感：",
    easyTaskBtn: lang === 'en' ? "Use Double-Sided Draft Today (+25 GP)" : "我今天使用了无纸数字化双面草案 (+25 GP)",
    easyTaskBtnDone: lang === 'en' ? "Gesture Confirmed! +25 GP Deposited" : "第一步习惯已打卡！+25 GP 已进账",
    easyTaskDesc: lang === 'en' ? "Instantly offsets 30g CO2 pulp equivalent" : "直接中和 30g CO₂ 工业造纸及漂白化学品消耗",

    congratsTitle: lang === 'en' ? "You are ready to grow!" : "您已成功融入绿色成长序列！",
    congratsDesc: lang === 'en' 
      ? "Your custom profile has been safely saved. Your daily streak is active, and you can visualize your behavior trees expanding on the Amo Energy workspace."
      : "个性化低碳微守则已对齐完毕。您的亲环境习惯连贯性（GBSS）模型已初始化。现在，您可以返回主面板，在画布上收集能量球，逐步养成良好的低碳办公习惯了。",
    finishBtn: lang === 'en' ? "Enter My Carbon Dashboard" : "登入我的低碳大屏"
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white text-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 overflow-hidden relative"
        >
          {/* Decorative floating icons */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-100 rounded-full blur-xl opacity-40 pointer-events-none" />

          {/* Stepper Dots Indicator Header */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] uppercase font-black tracking-wider text-emerald-600 font-mono inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              Green Onboarding • Step {step} of 5
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step ? 'w-6 bg-emerald-600' : s < step ? 'w-2 bg-emerald-300' : 'w-2 bg-slate-200'
                  }`} 
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Welcome message & Concept explanation */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <User className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-lg font-black text-slate-800 font-display">
                    {t.welcomeTitle}
                  </h2>
                  <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">
                    {t.welcomeSubtitle}
                  </p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {t.welcomeDesc}
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleNext}
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-extrabold py-3 rounded-2xl transition-all shadow-sm cursor-pointer flex justify-center items-center gap-1.5"
                  >
                    <span>{t.startBtn}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Profiling Questions Q1 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-850 font-display">{t.q1Title}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{t.q1Desc}</p>
                </div>

                <div className="space-y-3 font-bold">
                  <button
                    onClick={() => { setCommute('bike'); handleNext(); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      commute === 'bike' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-white rounded-xl border border-slate-100 text-emerald-700">🚲</span>
                      <span className="text-xs">{t.bike}</span>
                    </div>
                    {commute === 'bike' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { setCommute('transit'); handleNext(); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      commute === 'transit' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-white rounded-xl border border-slate-100 text-sky-700">🚇</span>
                      <span className="text-xs">{t.transit}</span>
                    </div>
                    {commute === 'transit' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { setCommute('car'); handleNext(); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      commute === 'car' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-white rounded-xl border border-slate-100 text-amber-600">🚗</span>
                      <span className="text-xs">{t.car}</span>
                    </div>
                    {commute === 'car' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                </div>

                <div className="flex justify-between gap-3 pt-4 border-t border-slate-100">
                  <button onClick={handleBack} className="text-xs font-bold text-slate-400 hover:text-slate-600 px-4 py-2 bg-slate-50 rounded-xl cursor-pointer">
                    {lang === 'en' ? "Back" : "返回"}
                  </button>
                  <button onClick={handleNext} className="text-xs font-black text-white hover:bg-emerald-700 bg-slate-900 px-5 py-2.5 rounded-xl cursor-pointer">
                    {lang === 'en' ? "Skip Question" : "跳过"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Profiling Questions Q2 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-850 font-display">{t.q2Title}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{t.q2Desc}</p>
                </div>

                <div className="space-y-3 font-bold">
                  <button
                    onClick={() => { setPaper('digital'); handleNext(); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      paper === 'digital' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-white rounded-xl border border-slate-100 text-emerald-700">🖥️</span>
                      <span className="text-xs">{t.digital}</span>
                    </div>
                    {paper === 'digital' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { setPaper('moderate'); handleNext(); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      paper === 'moderate' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-white rounded-xl border border-slate-100 text-purple-700">📧</span>
                      <span className="text-xs">{t.moderate}</span>
                    </div>
                    {paper === 'moderate' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { setPaper('heavy'); handleNext(); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      paper === 'heavy' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-white rounded-xl border border-slate-100 text-orange-600">🖨️</span>
                      <span className="text-xs">{t.heavy}</span>
                    </div>
                    {paper === 'heavy' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                </div>

                <div className="flex justify-between gap-3 pt-4 border-t border-slate-100">
                  <button onClick={handleBack} className="text-xs font-bold text-slate-400 hover:text-slate-600 px-4 py-2 bg-slate-50 rounded-xl cursor-pointer">
                    {lang === 'en' ? "Back" : "返回"}
                  </button>
                  <button onClick={handleNext} className="text-xs font-black text-white hover:bg-emerald-700 bg-slate-900 px-5 py-2.5 rounded-xl cursor-pointer">
                    {lang === 'en' ? "Skip Question" : "跳过"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Profiling Questions Q3 */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-850 font-display">{t.q3Title}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{t.q3Desc}</p>
                </div>

                <div className="space-y-3 font-bold">
                  <button
                    onClick={() => { setEnergy('sleep-5'); handleNext(); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      energy === 'sleep-5' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-white rounded-xl border border-slate-100 text-emerald-700">🌙</span>
                      <span className="text-xs">{t.sleep5}</span>
                    </div>
                    {energy === 'sleep-5' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { setEnergy('shutdown'); handleNext(); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      energy === 'shutdown' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-white rounded-xl border border-slate-100 text-indigo-700">🔌</span>
                      <span className="text-xs">{t.shutdown}</span>
                    </div>
                    {energy === 'shutdown' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { setEnergy('always-on'); handleNext(); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      energy === 'always-on' ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-white rounded-xl border border-slate-100 text-amber-600">💡</span>
                      <span className="text-xs">{t.alwaysOn}</span>
                    </div>
                    {energy === 'always-on' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                </div>

                <div className="flex justify-between gap-3 pt-4 border-t border-slate-100">
                  <button onClick={handleBack} className="text-xs font-bold text-slate-400 hover:text-slate-600 px-4 py-2 bg-slate-50 rounded-xl cursor-pointer">
                    {lang === 'en' ? "Back" : "返回"}
                  </button>
                  <button onClick={handleNext} className="text-xs font-black text-white hover:bg-emerald-700 bg-slate-900 px-5 py-2.5 rounded-xl cursor-pointer">
                    {lang === 'en' ? "Skip Question" : "跳过"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: AI Diagnostics Summary & A Very Small first task! */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="p-3.5 bg-emerald-950 text-white rounded-2xl border border-emerald-820 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-100 leading-none">{t.aiDiagnosticTitle}</h4>
                      <p className="text-[9.5px] text-emerald-400 font-semibold">{t.aiDiagnosticSubtitle}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-emerald-100 leading-relaxed pt-1 font-medium border-t border-emerald-900">
                    📢 <strong className="text-white">{t.aiRec}</strong>{' '}
                    {lang === 'en' 
                      ? `Based on your profile, your biggest saving leverages reside in paper print reduction. We recommend keeping your transit habit strong, which offsets high-fatigue private vehicle emissions.`
                      : `基于您的习惯分析：您的纸张降碳存在极大优化潜力（高减排权值），地铁公交能效相对稳定。AI 推荐首期主要攻坚双面无纸化和电脑睡眠机制运行，下周自动减少 1.8kg CO₂ 流失。`}
                  </p>
                </div>

                {/* Micro goals output */}
                <div className="bg-slate-55 border border-slate-150 p-3.5 rounded-2xl space-y-2">
                  <span className="text-[9px] uppercase font-black tracking-wider text-slate-400 block font-mono">
                    🎯 {t.goalsTitle}
                  </span>
                  <div className="space-y-1.5 text-[10.5px] text-slate-650 font-bold font-display">
                    <p>{t.goal1}</p>
                    <p>{t.goal2}</p>
                    <p>{t.goal3}</p>
                  </div>
                </div>

                {/* Interactive ultra easy first challenge */}
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-150/40 space-y-2.5">
                  <div>
                    <span className="text-[9.5px] uppercase font-black text-emerald-700 tracking-wider block font-mono">⚡ {t.firstTaskTitle}</span>
                    <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed mt-0.5">{t.firstTaskDesc}</p>
                  </div>

                  <div className="pt-1.5">
                    <button
                      type="button"
                      id="opt_onboarding_first_task"
                      onClick={completeFirstTask}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        firstTaskCompleted 
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-emerald-450 hover:text-emerald-900 active:scale-[0.98]'
                      }`}
                    >
                      {firstTaskCompleted ? (
                        <>
                          <Check className="w-4 h-4 text-white animate-bounce" />
                          <span>{t.easyTaskBtnDone}</span>
                        </>
                      ) : (
                        <>
                          <Award className="w-4 h-4 text-emerald-650 animate-pulse" />
                          <span>{t.easyTaskBtn}</span>
                        </>
                      )}
                    </button>
                    <p className="text-[9.5px] text-slate-400 text-center font-semibold mt-1.5 italic">
                      {t.easyTaskDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={finishOnboarding}
                    disabled={!firstTaskCompleted}
                    className={`w-full py-3 rounded-2xl font-black text-xs transition-all flex justify-center items-center gap-1.5 ${
                      firstTaskCompleted 
                        ? 'bg-slate-900 hover:bg-emerald-600 text-white cursor-pointer shadow-sm' 
                        : 'bg-slate-100 text-slate-350 cursor-not-allowed border border-slate-200'
                    }`}
                  >
                    <span>{t.finishBtn}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {!firstTaskCompleted && (
                    <span className="text-[9px] text-rose-500 font-bold block text-center mt-1.5">
                      ⚠️ {lang === 'en' ? "Please complete the simple first step check to activate dashboard credentials." : "请点击打卡上方【新手首周双面无纸化体验】奖励以解锁下方按钮。"}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
