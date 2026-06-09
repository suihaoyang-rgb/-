import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, User, Users, ShieldCheck, Trophy, Sparkles, 
  ArrowRight, Check, Compass, Sliders, ChevronRight, 
  ChevronLeft, AlertTriangle, ShieldAlert, Award, Building2, 
  Activity, Star, Globe, TrendingUp, CheckSquare, Settings
} from 'lucide-react';

interface IdentitySelectionProps {
  lang: 'en' | 'zh';
  setLang: (lang: 'en' | 'zh') => void;
  onSelectRole: (role: 'employee' | 'hr' | 'esg' | 'leadership') => void;
  onLogBehavior: (behaviorId: string, quantity: number, points: number) => void;
  onAddMessage?: (text: string, type: 'success' | 'warning' | 'info', points?: number) => void;
}

export default function IdentitySelection({
  lang,
  setLang,
  onSelectRole,
  onLogBehavior,
  onAddMessage
}: IdentitySelectionProps) {
  // Navigation states
  // 'selection' | 'onboarding'
  const [screen, setScreen] = useState<'selection' | 'onboarding'>('selection');
  const [selectedRole, setSelectedRole] = useState<'employee' | 'hr' | 'esg' | 'leadership' | null>(null);
  
  // Onboarding generic steps: 1 to 4
  const [onboardingStep, setOnboardingStep] = useState<number>(1);

  // --- Form & Interactive States inside Onboarding ---
  // Employee Onboarding
  const [commuteHabit, setCommuteHabit] = useState<string>('transit');
  const [printVolume, setPrintVolume] = useState<string>('moderate');
  const [energySetting, setEnergySetting] = useState<string>('sleep-5');
  const [employeeFirstTaskCompleted, setEmployeeFirstTaskCompleted] = useState<boolean>(false);

  // HR Onboarding
  const [targetParticipation, setTargetParticipation] = useState<number>(85);
  const [kpiFocus, setKpiFocus] = useState<string>('balanced');
  const [hrCourseConfig, setHrCourseConfig] = useState<boolean>(true);

  // Director Onboarding
  const [governanceStrictness, setGovernanceStrictness] = useState<'balanced' | 'rigorous'>('balanced');
  const [auditTestActive, setAuditTestActive] = useState<boolean>(false);

  // Executive Onboarding
  const [boardTargetCarbon, setBoardTargetCarbon] = useState<string>('15'); // 15% reduction target
  const [roiFocusArea, setRoiFocusArea] = useState<'talent' | 'ops'>('talent');

  const rolesConfig = {
    employee: {
      id: 'employee' as const,
      titleEn: 'Employee Activation / PEB Hub',
      titleZh: '员工激活端 / PEB Hub',
      descEn: 'Build sustainable workplace habits and improve your daily environmental impact through personalized AI guidance.',
      descZh: '在个性化 AI 引导下，重塑日常行为模式，将不可见的环境倡议转为可见、有成就感且对接真实物理福利的能量林地。',
      responsibilitiesEn: 'Log personal low-carbon habits daily, harvest energy bubbles, nurture carbon-neutral plants, and complete customized lessons.',
      responsibilitiesZh: '按日登记低碳行为、收取并拼版激活 Amo 能量泡、申领西部防风生态林、消减电脑与办公纸耗。',
      coreValueEn: 'Transforms minor eco-habits into active personal motivation while feeding back real green indicators.',
      coreValueZh: '通过无感化的微游戏机制，将“要我做”的环境守则化作“我要做”的主观利他习惯。',
      workflowEn: 'Check habits checklist ➔ Log action ➔ Harvest floating bubbles ➔ Redeem green rewards.',
      workflowZh: '查阅习惯清单 ➔ 单击申报低碳事实 ➔ 林地打卡收获 GP 能量球 ➔ 福利商店兑换礼品。',
      aiSummaryEn: 'Personal Habits Coach optimizing habits, identifying fatigue gaps, and dispatching encouragement.',
      aiSummaryZh: '“AI 绿色微习惯教练”提供即时分析、冲刺减压以及行为偏离矫正，鼓励连贯亲环境习惯。',
      themeColor: 'emerald',
      bgClass: 'from-emerald-950/45 to-slate-950 border-emerald-900/40 hover:border-emerald-500/50',
      iconColor: 'text-emerald-450 bg-emerald-500/10'
    },
    hr: {
      id: 'hr' as const,
      titleEn: 'HR Management / Green HR',
      titleZh: '人力资源端 / 绿色人资中枢',
      descEn: 'Manage organizational sustainability behavior, green talent systems, engagement, training, and ESG participation through AI-driven workforce management.',
      descZh: '以人本精神为主轴，主控全员低碳参与率、发布绿色人力培训课堂、对准全员福利预算，将低碳表现挂钩人才晋升。',
      responsibilitiesEn: 'Configure green curricula, disburse group incentive funds, audit department rankings, and review green hiring index.',
      responsibilitiesZh: '上线绿色习惯培养课程，统配企业福利兑换池，评估各科室亲环境活跃度，以及生成绿领招聘评估报告。',
      coreValueEn: 'Links corporate ESG metrics with employees actual benefit vectors, reducing attrition by driving positive organizational climate.',
      coreValueZh: '以利他文化为抓手，打通环境效益与组织氛围，借助绿色效能提升拉动优秀人才留存。',
      workflowEn: 'Assess team metrics ➔ Launch customized green courses ➔ Refuel reward multipliers ➔ Deliver policy goals.',
      workflowZh: '评判跨部门减排大表 ➔ 一键上线习惯培养方案 ➔ 配置激励池或1.5倍积分补给 ➔ 发起柔性机制。',
      aiSummaryEn: 'Workforce Analytics Engine helping you scale participation and spot active change agents.',
      aiSummaryZh: '“组织效能分析仪”监控合规断层，诊断激励发放转化率，推荐因劳累偏离的最佳代偿方案。',
      themeColor: 'sky',
      bgClass: 'from-sky-950/45 to-slate-950 border-slate-900 hover:border-sky-550/50',
      iconColor: 'text-sky-450 bg-sky-500/10'
    },
    esg: {
      id: 'esg' as const,
      titleEn: 'Compliance & Audit / Director',
      titleZh: '合规审计端 / Director',
      descEn: 'Monitor ESG governance, sustainability compliance, audit readiness, risk exposure, and organizational accountability.',
      descZh: '集团高阶治理视角：剔除水分与洗绿（Anti-greenwashing）。审核碳当量流向、穿透数据溯源账册，评估多维可信度。',
      responsibilitiesEn: 'Audit behavioral traceability records, verify data reliability (Direct vs Proxy), manage carbon volatility, and deploy governance reviews.',
      responsibilitiesZh: '审计范畴三及范畴二底层一致性、分析 IPFS 防篡改链条凭据、监管审计就绪评级及下发合规自证指令。',
      coreValueEn: 'Establishes crystal-clear operational credibility that serves as audit-ready CSRD/GRI disclosure evidence.',
      coreValueZh: '为企业可持续披露（CSRD, GRI）提供实证级无水分底层支撑，捍卫企业社会声誉、杜绝虚假打卡。',
      workflowEn: 'Check governance dashboard ➔ Review audit log queues ➔ Mitigate carbon volatility ➔ Disseminate compliance reviewed logs.',
      workflowZh: '查阅合规风险中枢 ➔ 穿透可信度账籍 ➔ 下发柔性硬化调节指令 ➔ 签署并锁定 GRI 自证证书。',
      aiSummaryEn: 'Compliance Intelligence Oracle highlighting reporting inconsistency, fatigue spikes, and tracking source credibility.',
      aiSummaryZh: '“合规风控智能体”洞悉加班导致的空载泄露，标定反常批量上报偏离，诊断认知-习惯断层。',
      themeColor: 'indigo',
      bgClass: 'from-indigo-950/45 to-slate-950 border-indigo-900/40 hover:border-indigo-500/50',
      iconColor: 'text-indigo-455 bg-indigo-500/10'
    },
    leadership: {
      id: 'leadership' as const,
      titleEn: 'Executive Leadership / Executive',
      titleZh: '决策董事会 / Executive',
      descEn: 'Access strategic sustainability intelligence, organizational culture trends, ESG performance insights, and long-term enterprise sustainability indicators.',
      descZh: '最高战略总控视角：透视降本节支（ROI）及留存绩效。沙盘推演绿色文化（OGCI）如何传导至人才留存。',
      responsibilitiesEn: 'Formulate high-level ESG vision alignments, assess green branding multipliers, interact with cost-saving simulator, allocate budget.',
      responsibilitiesZh: '校准集团 ESG 中长期低碳减额、追踪低碳溢出回报率、推演人才满意度、审议低碳文化对财务端的真实贡献。',
      workflowEn: 'Inspect board strategic KPI summary ➔ Simulate retention and paper/electricity saving paths ➔ Authorize green funds budget.',
      workflowZh: '评议董事会汇总指标 ➔ 操作 ROI 降耗/留存乘数仿真舱 ➔ 发行高阶绿色战略 ➔ 批复集团绿色总预算。',
      coreValueEn: 'Establishes direct operational linkage between organizational climate, retention buffers, and net operating cost reductions.',
      coreValueZh: '打通环境与商业资本，将绿色文化映射为员工留存溢出率，对齐企业 ESG 核心财务价值。',
      aiSummaryEn: 'Strategic Investment Copilot predicting macro organizational performance improvements stemming from green actions.',
      aiSummaryZh: '“战略治理智囊”提供前瞻性决策研判，将低碳行为转换为员工心理认同与品牌溢价之量化模拟器。',
      themeColor: 'amber',
      bgClass: 'from-amber-950/45 to-slate-950 border-slate-900 hover:border-amber-550/50',
      iconColor: 'text-amber-450 bg-amber-500/10'
    }
  };

  const handleRoleSelect = (role: 'employee' | 'hr' | 'esg' | 'leadership') => {
    setSelectedRole(role);
    setOnboardingStep(1);
    setScreen('onboarding');
  };

  const executeFirstOnboardingAction = () => {
    if (employeeFirstTaskCompleted) return;
    setEmployeeFirstTaskCompleted(true);
    // Log typical initial behavior: Double-sided printed docs (25 GP bonus)
    onLogBehavior('duplex_printing', 2, 25);
    if (onAddMessage) {
      onAddMessage(
        lang === 'en'
          ? "Onboarding Spark Selected: +25 GP verified downstream as standard carbon-neutral trace element."
          : "新手起步打卡完成！成功在物理底册登记 2 页双面无纸化协作，解锁 +25 GP 新手能量！",
        'success',
        25
      );
    }
  };

  const finishOnboardingFlow = () => {
    if (selectedRole) {
      localStorage.setItem('ghrm_identity_selected', 'true');
      if (selectedRole === 'employee') {
        localStorage.setItem('ghrm_onboarding_completed', 'true');
      }
      onSelectRole(selectedRole);
    }
  };

  return (
    <div id="identity_selection_layer" className="min-h-screen bg-gradient-to-tr from-emerald-50 via-green-50 to-teal-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      
      {/* Decorative Grid Line Ambient Background - Pure Green-Infused theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ccfbf1_1px,transparent_1px),linear-gradient(to_bottom,#ccfbf1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header element */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 border-b border-emerald-100 flex justify-between items-center bg-white/70 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-555 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-500/25">
            <Leaf className="w-5 h-5 fill-emerald-100" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black tracking-widest text-[#064e3b] uppercase font-mono">
              {lang === 'en' ? 'GHRM SUITE • AI WORKPLACE' : 'GREEN SUITE • 绿色组织低碳管理系统'}
            </h1>
            <p className="text-[10px] text-emerald-800 font-bold tracking-tight">
              {lang === 'en' ? 'Closing the loop on behavioral activation (PEB) and GHRM auditability' : '推动全员亲环境行为（PEB）与绿色人资战略（GHRM）决策闭环'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Universal Language Swapper */}
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="px-3 py-1.5 text-[10px] font-mono font-black border border-emerald-200 rounded-xl bg-white hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'en' ? '繁體中文/简体' : 'ENGLISH'}</span>
          </button>
        </div>
      </header>

      {/* Interactive Main Body Panel */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* SCREEN A: ROLE SELECTION INITIAL ARCHITECTURE */}
          {screen === 'selection' && (
            <motion.div
              key="selection_panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full space-y-8"
            >
              
              {/* Introduction Title Text */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="inline-flex items-center gap-1.5 bg-emerald-600/10 text-emerald-800 border border-emerald-250/35 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/15" />
                  {lang === 'en' ? 'GHRM Command System Gateway' : '低碳 GHRM & PEB 运转决策中枢'}
                </span>
                <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-[#064e3b] font-display">
                  {lang === 'en' ? 'Select Your Sustainable Workplace Identity' : '请选定您在集团可持续运营中的职务身份'}
                </h2>
                <p className="text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed font-semibold">
                  {lang === 'en'
                    ? 'Connect personalized micro-behaviors, customizable green incentives, traceable audit-ledgers, or corporate boardroom strategy systems to aligned GHRM operational roles.'
                    : '本平台提供因人而异、职责咬合的低碳管理控制栈。员工端重视微习惯培养（PEB）；绿色人资端主管文化激励与福利兑换；审计端锚定真实防漂绿；董事端专注战略决策。'}
                </p>
              </div>

              {/* Four Roles Grid Selection with clean visual typography layouts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.values(rolesConfig).map((r) => {
                  const IconComponent = {
                    employee: User,
                    hr: Users,
                    esg: ShieldCheck,
                    leadership: Award
                  }[r.id];

                  return (
                    <button
                      key={r.id}
                      onClick={() => handleRoleSelect(r.id)}
                      className="text-left p-6 bg-white hover:bg-emerald-50/15 border border-emerald-100 hover:border-emerald-555 rounded-2xl transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 flex flex-col justify-between h-[360px] shadow-md hover:shadow-xl group cursor-pointer relative overflow-hidden text-slate-800"
                    >
                      {/* Subtle green ambient hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="space-y-4 w-full relative z-10">
                        {/* Header badge row */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-mono font-black tracking-widest text-[#047857] bg-emerald-100/60 border border-emerald-200/50 px-2 py-0.5 rounded-md">
                            {r.id === 'employee' ? 'PEB Driver' : r.id === 'hr' ? 'Green HR' : r.id === 'esg' ? 'Compliance' : 'Executive'}
                          </span>
                          <span className="text-slate-400 text-[10px] font-mono group-hover:text-emerald-700 transition-colors">
                            0{r.id === 'employee' ? '1' : r.id === 'hr' ? '2' : r.id === 'esg' ? '3' : '4'}
                          </span>
                        </div>

                        {/* Icon and Title Container */}
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-120/45 shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <IconComponent className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-[#0f172a] group-hover:text-emerald-700 transition-colors tracking-tight">
                              {lang === 'en' ? r.titleEn.split(' / ')[0] : r.titleZh.split(' / ')[0]}
                            </h4>
                            <p className="text-[10px] text-slate-500 font-medium tracking-tight">
                              {lang === 'en' ? r.titleEn.split(' / ')[1] || 'Role Module' : r.titleZh.split(' / ')[1] || '业务单元'}
                            </p>
                          </div>
                        </div>

                        {/* Concise single sentence description */}
                        <p className="text-[11px] text-slate-600 leading-relaxed font-semibold min-h-[32px] line-clamp-2">
                          {lang === 'en' ? r.descEn : r.descZh}
                        </p>

                        {/* Core Capabilities checklist */}
                        <div className="space-y-2 pt-3 border-t border-emerald-100/80 text-[11px]">
                          <span className="font-bold text-[9px] font-mono uppercase text-slate-400 tracking-wider block">
                            {lang === 'en' ? 'Core Capabilities' : '核心赋能'}
                          </span>
                          <div className="space-y-1.5 font-bold text-slate-600">
                            {r.id === 'employee' && (
                              <>
                                <div className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="truncate text-slate-600">{lang === 'en' ? 'Low-carbon behaviors logging' : '日常低碳亲环境行为登记'}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="truncate text-slate-600">{lang === 'en' ? 'Personal forest & rewards' : '个人生态碳林地与积分兑换'}</span>
                                </div>
                              </>
                            )}
                            {r.id === 'hr' && (
                              <>
                                <div className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="truncate text-slate-600">{lang === 'en' ? 'Reward pathways & curriculum' : '低碳宣誓课件与激励指标审批'}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="truncate text-slate-600">{lang === 'en' ? 'Employee climate metrics' : '跨科室活跃表现及留存效益'}</span>
                                </div>
                              </>
                            )}
                            {r.id === 'esg' && (
                              <>
                                <div className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="truncate text-slate-600">{lang === 'en' ? 'Verified evidence-trail ledger' : '无纸化数据存证与审计控制'}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="truncate text-slate-600">{lang === 'en' ? 'Category 7 transit check' : '范畴三无偏审计与自证签署'}</span>
                                </div>
                              </>
                            )}
                            {r.id === 'leadership' && (
                              <>
                                <div className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="truncate text-slate-600">{lang === 'en' ? 'Strategic ROI simulator' : '两向收益传导沙盘仿真推演'}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="truncate text-slate-600">{lang === 'en' ? 'General budgets authority' : '集团碳资产预算与资金流批筹'}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Aligning workspace accessibility links */}
                      <div className="w-full pt-3 mt-auto border-t border-emerald-100/80 flex items-center justify-between text-[10px] text-emerald-600 font-bold font-mono relative z-10 transition-colors group-hover:text-emerald-700">
                        <span>{lang === 'en' ? 'ENTER WORKSPACE' : '进入该工作舱'}</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-emerald-600" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* System disclaimer footer banner */}
              <div className="bg-emerald-100/60 border border-emerald-200/50 p-4 rounded-2xl text-center text-emerald-800 font-mono text-[9px] max-w-4xl mx-auto shadow-sm">
                {lang === 'en'
                  ? 'Unified Green Human Resource (GHRM) Engine. All employee PEB logs are secured downstream.'
                  : '组织规范：平台后台日志算子统一运转。完成新手习惯指引后可在仪表盘右上角随时无感重绑职务身份。'}
              </div>
            </motion.div>
          )}


          {/* SCREEN B: ROLE-SPECIFIC INTERACTIVE ONBOARDING PATHS */}
          {screen === 'onboarding' && selectedRole && (
            <motion.div
              key="onboarding_wizard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 max-w-xl w-full mx-auto shadow-2xl relative text-slate-700 shadow-emerald-950/5"
            >
              
              {/* Stepper Dots Indicator Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] uppercase font-black tracking-wider text-emerald-700 font-mono inline-flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '12s' }} />
                  {lang === 'en' ? `${rolesConfig[selectedRole].titleEn} Onboarding` : `职务指引 —— ${rolesConfig[selectedRole].titleZh}`}
                  {" • "} Step {onboardingStep} of 4
                </span>
                
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((s) => (
                    <div 
                      key={s} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        s === onboardingStep ? 'w-6 bg-emerald-600' : s < onboardingStep ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-200'
                      }`} 
                    />
                  ))}
                </div>
              </div>


              {/* ============================================================ */}
              {/* ONBOARDING FLOW 1: EMPLOYEE HUB */}
              {/* ============================================================ */}
              {selectedRole === 'employee' && (
                <div className="min-h-[360px] flex flex-col justify-between">
                  {onboardingStep === 1 && (
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
                        <User className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-800 font-display">
                          {lang === 'en' ? 'Welcome to Employee Sustainability Center' : '低碳习惯塑造：开启您的绿色成长之旅'}
                        </h3>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider font-mono">
                          Employee Activation • PEB Hub
                        </p>
                      </div>
                      <p className="text-[11.5px] text-slate-600 leading-relaxed font-semibold max-w-md mx-auto">
                        {lang === 'en'
                          ? 'This dashboard transforms passive environmental rules into an active personal habit garden. In 60 seconds, we will generate your Weekly Goals and build your eco-profile.'
                          : '在这里，环保意识不再是墙上的口号或生硬的任务。通过个人碳林地、自动熄屏打卡、无纸化拼版及福利兑换柜，您的每一次随手低碳行为都将结出实物硕果。'}
                      </p>
                    </div>
                  )}

                  {onboardingStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black text-slate-800 font-display">
                          {lang === 'en' ? 'Build Sustainability Profile' : '1. 智能拼版：设定您的绿色通勤及低碳行为底色'}
                        </h3>
                        <p className="text-[10px] text-slate-500">
                          {lang === 'en' ? 'How do you usually commute and handle paperwork?' : '根据您的主要办公动作模式，系统将针对性适配微习惯目标权重'}
                        </p>
                      </div>

                      <div className="space-y-3 font-bold text-xs">
                        {/* Question 1: Commute Selection */}
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                          <span className="text-[9.5px] text-slate-500 block uppercase font-mono">
                            {lang === 'en' ? 'Typical Commuting Habit' : '您通常如何到达公司大楼？'}
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {[['bike', lang === 'en' ? 'Cycling/Walk' : '共享单车/步行', '🚲'], ['transit', lang === 'en' ? 'Metro/Transit' : '地铁/公交', '🚇'], ['car', lang === 'en' ? 'Fuel Car' : '燃油私车', '🚗']].map(([k, label, emoji]) => (
                              <button
                                key={k}
                                onClick={() => setCommuteHabit(k)}
                                className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                                  commuteHabit === k ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black' : 'bg-white border-slate-200 text-slate-600 font-semibold hover:bg-slate-50'
                                }`}
                              >
                                <span className="block text-sm mb-1">{emoji}</span>
                                <span className="text-[10px]">{label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Question 2: Printing Demand */}
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                          <span className="text-[9.5px] text-[#047857] block uppercase font-mono">
                            {lang === 'en' ? 'Weekly Printing Intake' : '您日常岗位上的打印频度情况？'}
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {[['digital', lang === 'en' ? 'Digital Only' : '完全数字流', '🖥️'], ['moderate', lang === 'en' ? 'Moderate' : '一般打印', '📧'], ['heavy', lang === 'en' ? 'Heavy Volume' : '批量票据打印', '🖨️']].map(([k, label, emoji]) => (
                              <button
                                key={k}
                                onClick={() => setPrintVolume(k)}
                                className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                                  printVolume === k ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black' : 'bg-white border-slate-200 text-slate-600 font-semibold hover:bg-slate-50'
                                }`}
                              >
                                <span className="block text-sm mb-1">{emoji}</span>
                                <span className="text-[10px]">{label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {onboardingStep === 3 && (
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-50/75 text-slate-800 rounded-3xl border border-emerald-100 space-y-2.5 shadow-sm">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
                          <div>
                            <h4 className="text-xs font-black text-emerald-950">{lang === 'en' ? 'AI Habits Diagnostic Ready' : 'AI 习惯改进教练报告生成'}</h4>
                            <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider font-mono">Custom first-week goals baseline</p>
                          </div>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-600 font-semibold border-t border-emerald-100/50 pt-2.5">
                          {lang === 'en'
                            ? 'Analysis: Paper document handling constitutes 65% of your saving opportunity. We recommend leveraging digital double-sided printers and turning monitors off immediately before lunch breaks.'
                            : 'AI 诊断：鉴于您的打印吞吐偏好，【双面无纸化协作】存在最大减排潜能。通过建立拼版自动打卡机制，您下周能自动锁定 1.83kg 办公二氧化碳流失（折合 15 张 A4 纸浆）。'}
                        </p>
                      </div>

                      {/* Customized Habits */}
                      <div className="bg-slate-50 p-4 border border-slate-100 rounded-3xl space-y-2 shadow-sm">
                        <span className="text-[9px] uppercase font-mono font-black text-slate-400 block">
                          🎯 {lang === 'en' ? 'Personal Goals Checklist' : '本周定制低碳微守则：'}
                        </span>
                        <div className="space-y-1.5 text-[11px] text-slate-600 font-semibold">
                          <p>✓ {lang === 'en' ? 'Offset 2 disposal plastic cups next week' : '在茶水间使用随身随手杯，累计避免塑料杯损耗 2 次(+30 GP)'}</p>
                          <p>✓ {lang === 'en' ? 'Avoid single-route transit by green lining' : '通过通勤绿线（地铁公交）打卡消减一次私家车开支(+42 GP)'}</p>
                          <p>✓ {lang === 'en' ? 'Check display monitors auto-sleep mode' : '设定工位显示器在离开 5 分钟后进入硬休眠，堵塞空载能耗'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {onboardingStep === 4 && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 border border-slate-100 rounded-3xl text-center space-y-3 shadow-sm">
                        <span className="text-[9.5px] uppercase font-mono font-black text-emerald-600 tracking-wider block">
                          ⚡ {lang === 'en' ? 'Simulate Your First Action' : '2. 低碳手指习惯 —— 新手初试体验'}
                        </span>
                        <p className="text-[11px] text-slate-600 leading-relaxed max-w-sm mx-auto font-medium">
                          {lang === 'en'
                            ? "Click the button below to register your very first double-sided paper print. Experience how our system instantly registers actions to spawn bubbles."
                            : "一分内完成！点击下方按键登记您今天首单【双面无纸化打印】。验证体系内的实时计分与避碳，该习惯产生的点数可以直接领取新手林地能量！"}
                        </p>

                        <button
                          type="button"
                          onClick={executeFirstOnboardingAction}
                          className={`w-full py-3.5 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            employeeFirstTaskCompleted
                              ? 'bg-emerald-600 border border-emerald-500 text-white'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm hover:scale-[1.01]'
                          }`}
                        >
                          {employeeFirstTaskCompleted ? (
                            <>
                              <Check className="w-4.5 h-4.5 animate-bounce" />
                              <span>{lang === 'en' ? 'Task Completed! +25 GP verified' : '打卡成功！已在集团存证账页注入 +25 GP'}</span>
                            </>
                          ) : (
                            <>
                              <Award className="w-4.5 h-4.5 text-emerald-600 animate-pulse" />
                              <span>{lang === 'en' ? 'Log My First Zero-Paper Action (+25 GP)' : '我今天进行了双面双版纸张打印 (+25 GP)'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-center pt-2">
                        <h4 className="text-sm font-extrabold text-slate-800">{lang === 'en' ? 'You are ready to grow!' : '您已成功加入绿色先遣序列'}</h4>
                        <p className="text-[10.5px] text-slate-500 mt-0.5">{lang === 'en' ? 'Return to Amo Canvas to gather points and evolve trees.' : '马上登入您的行为林地，收集散落 of 气体能量球吧！'}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {/* ============================================================ */}
              {/* ONBOARDING FLOW 2: HR GREEN CORE */}
              {/* ============================================================ */}
              {selectedRole === 'hr' && (
                <div className="min-h-[360px] flex flex-col justify-between">
                  {onboardingStep === 1 && (
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto border border-sky-100 shadow-sm">
                        <Users className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-800 font-display">
                          {lang === 'en' ? 'GHRM Strategic Culture Office' : 'GHRM 绿色组织文化中枢'}
                        </h3>
                        <p className="text-[10px] text-sky-600 font-bold uppercase tracking-wider font-mono">
                          Green HR • Management Side
                        </p>
                      </div>
                      <p className="text-[11.5px] text-slate-600 leading-relaxed font-semibold max-w-sm mx-auto">
                        {lang === 'en'
                          ? 'Design and deploy green employee development workflows (GHRM) to turn emission reduction goals into gamified wellness multipliers.'
                          : '在这里，您将主导全客群的低碳习惯培养（GHRM），通过习惯学堂与环保成就兑换政策，激发员工内驱力，平衡因研发任务过重带来的疲劳感。'}
                      </p>
                    </div>
                  )}

                  {onboardingStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black text-slate-800 font-display">
                          {lang === 'en' ? '1. Calibrate Group Participation Target' : '1. 设定全员低碳参与率运营目标'}
                        </h3>
                        <p className="text-[10.5px] text-slate-500 font-medium font-sans">
                          {lang === 'en' ? 'Set the target percentage of active, daily green participants:' : '设定本期期待达成的活跃低碳习惯受训与参与比例 (直接关联激励杠杆数)：'}
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3.5 shadow-sm">
                        <div className="flex justify-between items-center text-xs font-mono font-black text-[#0369a1]">
                          <span>{lang === 'en' ? 'Participation Goal' : '预设参与目标'}</span>
                          <span className="text-sm">{targetParticipation}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          step="5"
                          value={targetParticipation}
                          onChange={(e) => setTargetParticipation(Number(e.target.value))}
                          className="w-full bg-slate-200 h-2 rounded-lg appearance-none cursor-pointer accent-[#0369a1]"
                        />
                        <div className="flex justify-between text-[9px] text-slate-450 font-bold font-mono">
                          <span>50% ({lang === 'en' ? 'Bronze Level' : '大众常态'})</span>
                          <span>75% ({lang === 'en' ? 'Silver Star' : '星级倡议'})</span>
                          <span>100% ({lang === 'en' ? 'Full Cohesion' : '极致凝聚营'})</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {onboardingStep === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black text-slate-800 font-display">
                          {lang === 'en' ? 'Define Strategic KPI Objectives' : '2. 选定环境文化与业务收益咬合点'}
                        </h3>
                        <p className="text-[10.5px] text-slate-550 font-medium">
                          {lang === 'en' ? 'Select which primary behavioral retention metrics to optimize:' : '重点关注全员低碳习惯塑造时，更渴望捎带解决的痛点：'}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {[
                          ['talent', lang === 'en' ? 'Maximize Retention & Culture Cohesion' : '人才流失防范：用绿色成就对冲重压疲劳 (+14% 留存率)', '🎓'],
                          ['ops', lang === 'en' ? 'Intense Office Electricity & Paper Saving' : '运营物理节支：大幅物理减少晚上不关机及纸质损耗', '🔌'],
                          ['balanced', lang === 'en' ? 'Balanced Green HR Integration (Training + Actions)' : '两手抓均衡：既抓学堂完备率，又抓林地打卡连贯性', '⚖️']
                        ].map(([k, label, emoji]) => (
                          <button
                            key={k}
                            onClick={() => setKpiFocus(k)}
                            className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                              kpiFocus === k ? 'bg-sky-50 border-sky-500 text-sky-950 font-black' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 text-[11px] font-semibold">
                              <span>{emoji}</span>
                              <span>{label}</span>
                            </div>
                            {kpiFocus === k && <Check className="w-4 h-4 text-sky-600 shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {onboardingStep === 4 && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 border border-slate-100 rounded-3xl space-y-3 text-center shadow-sm">
                        <span className="text-[9px] uppercase font-mono font-black text-sky-600 tracking-wider block">Green HR Ready Log</span>
                        <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mx-auto border border-sky-100">
                          <Check className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-800">{lang === 'en' ? 'Curricula Configured Successfully' : '绿色人资机制已在集团全网激活！'}</h4>
                        <p className="text-[10.5px] text-slate-550 leading-relaxed max-w-sm mx-auto font-medium">
                          {lang === 'en'
                            ? 'Our AI analysis has lined up course completions vs physical carbon abated for your review, now matching your balanced Green HR preferences.'
                            : '已在低碳习惯学堂预置 2 项微课程，并在福利店开辟绿色年假换取通道。您现在可以直接登入管理控制台，查看全员排班和发放能量补贴！'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {/* ============================================================ */}
              {/* ONBOARDING FLOW 3: COMPLIANCE & AUDIT / DIRECTOR */}
              {/* ============================================================ */}
              {selectedRole === 'esg' && (
                <div className="min-h-[360px] flex flex-col justify-between">
                  {onboardingStep === 1 && (
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100 shadow-sm">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-800 font-display">
                          {lang === 'en' ? 'GRI-Compliant Traceability Console' : '数据硬审计中枢：坚守真实可防伪底线'}
                        </h3>
                        <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider font-mono">
                          Compliance & Audit • Director Side
                        </p>
                      </div>
                      <p className="text-[11.5px] text-slate-600 leading-relaxed font-semibold max-w-sm mx-auto">
                        {lang === 'en'
                          ? 'We refuse greenwashing. Track which employee and department behaviors generated specific carbon outcomes with complete evidence-trail hashes.'
                          : '不作秀、不注水。这个界面是高级治理控制台，不含有益生活的游戏，只为您呈现二氧化碳减量源数据（Category 7 通勤、LCA一纸减排），以供外部穿透核算。'}
                      </p>
                    </div>
                  )}

                  {onboardingStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black text-slate-800 font-display">
                          {lang === 'en' ? '1. Secure Data Reliability Priorities' : '1. 确定本期外部审计严苛度与存证级别'}
                        </h3>
                        <p className="text-[10.5px] text-slate-500 font-medium">
                          {lang === 'en' ? 'Choose regulatory compliance check rigor for disclosure reports:' : '选择集团核算所采用的标准与合规校验策略：'}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={() => setGovernanceStrictness('rigorous')}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                            governanceStrictness === 'rigorous' ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-black' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                            <div className="text-[11px] font-semibold">
                              <span className="text-slate-900 font-bold">{lang === 'en' ? 'CSRD High-Fidelity Ledger (Strict Source Check)' : 'CSRD 双重实质性标准 (严格追溯源数据验证)'}</span>
                              <span className="block text-[9.5px] text-slate-500 mt-0.5 font-medium">{lang === 'en' ? 'Requires direct sensors or IPFS hash proofs only.' : '所有指标必须含有真实打印机网端、物理抄表或地铁一卡通物理 API 反馈。'}</span>
                            </div>
                          </div>
                          {governanceStrictness === 'rigorous' && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                        </button>

                        <button
                          onClick={() => setGovernanceStrictness('balanced')}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                            governanceStrictness === 'balanced' ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-black' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <Sliders className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                            <div className="text-[11px] font-semibold">
                              <span className="text-slate-900 font-bold">{lang === 'en' ? 'Standard Dual-Materiality (Empirical Coefficients)' : '平衡式二元碳核算 (GRI/IPCC 通用算子)'}</span>
                              <span className="block text-[9.5px] text-slate-500 mt-0.5 font-medium">{lang === 'en' ? 'Accepts AI proxy estimate for missing data fields.' : '引入 EPA / IPCC 标准能耗折算算子，对偶发空缺字段用 AI 数据补全。'}</span>
                            </div>
                          </div>
                          {governanceStrictness === 'balanced' && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {onboardingStep === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black text-slate-800 font-display">
                          {lang === 'en' ? '2. Review Data Sources Transparency' : '2. 分解系统计算逻辑与数据源透明层'}
                        </h3>
                        <p className="text-[10.5px] text-slate-550 font-semibold">
                          {lang === 'en' ? 'The interface separates the following verified categories:' : '我们不仅披露数字，还标明数据的原始采集方法：'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono leading-normal font-bold">
                        <div className="bg-slate-50 p-2.5 border border-slate-100 rounded-xl space-y-1 shadow-sm">
                          <span className="text-emerald-700 font-black">✓ Hard-sensor Measured</span>
                          <p className="text-slate-500 text-[9px] font-semibold">{lang === 'en' ? 'Physical cloud scale counters or printer logs.' : '智慧抄表和打印机服务池，可控度约99%'}</p>
                        </div>
                        <div className="bg-slate-50 p-2.5 border border-slate-100 rounded-xl space-y-1 shadow-sm">
                          <span className="text-slate-655 font-black">⚒ Policy Coefficients</span>
                          <p className="text-slate-500 text-[9px] font-semibold">{lang === 'en' ? 'LCA carbon values verified by EPA / UNEP.' : '依照生态产品环境影响周期（LCA）乘数折算'}</p>
                        </div>
                        <div className="bg-slate-50 p-2.5 border border-slate-100 rounded-xl space-y-1 shadow-sm">
                          <span className="text-indigo-600 font-black">✦ AI Proxy Estimated</span>
                          <p className="text-slate-500 text-[9px] font-semibold">{lang === 'en' ? 'Smart models predicting gaps based on schedules.' : '对高加班大压导致未关闭状态的回归预测'}</p>
                        </div>
                        <div className="bg-slate-50 p-2.5 border border-slate-100 rounded-xl space-y-1 shadow-sm">
                          <span className="text-amber-600 font-black">❓ Employee-reported</span>
                          <p className="text-slate-500 text-[9px] font-semibold">{lang === 'en' ? 'Voluntary checklist logs requiring audit check.' : '员工打卡行为，可信度略降，采用审计校验'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {onboardingStep === 4 && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 border border-slate-100 rounded-3xl space-y-3 text-center shadow-sm">
                        <span className="text-[9.5px] uppercase font-mono font-black text-indigo-600 tracking-wider block">Governance Trigger Sandbox</span>
                        <h4 className="text-sm font-extrabold text-slate-800">{lang === 'en' ? 'Trigger Operational Risk Sandbox' : '3. 模拟合规干预工作流'}</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed max-w-sm mx-auto font-medium">
                          {lang === 'en'
                            ? 'Press below to issue an audit flag against financial paperless transactions representing high log clusters.'
                            : '点击触发按钮，即可给可能存在异常打卡的【财务共享中心】分派任务，要求其负责人补充物理 IPFS 电子归档凭据。'}
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setAuditTestActive(true);
                            if (onAddMessage) {
                              onAddMessage(
                                lang === 'en'
                                  ? "Compliance Sandboxed Audit Signal: Issued compliance warning dispatch to finance cluster."
                                  : "合规治理指令已分发！针对财务部批量打卡异常，已通知派发可信自证指令。",
                                  'warning'
                              );
                            }
                          }}
                          className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                            auditTestActive
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white text-indigo-900 border border-indigo-200 hover:bg-indigo-50/50'
                          }`}
                        >
                          {auditTestActive ? (
                            <>
                              <CheckSquare className="w-4 h-4 text-white animate-bounce" />
                              <span>{lang === 'en' ? 'Audit Dispatch Succeeded' : '审计自证令牌分发就绪 (Pending Status)'}</span>
                            </>
                          ) : (
                            <>
                              <ShieldAlert className="w-4 h-4 text-indigo-600 animate-pulse" />
                              <span>{lang === 'en' ? 'Trigger Verification Notice' : '一键派送合规与打卡凭证复审通知'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {/* ============================================================ */}
              {/* ONBOARDING FLOW 4: EXECUTIVE LEADERSHIP / EXECUTIVE */}
              {/* ============================================================ */}
              {selectedRole === 'leadership' && (
                <div className="min-h-[360px] flex flex-col justify-between">
                  {onboardingStep === 1 && (
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-100 shadow-sm">
                        <Award className="w-8 h-8 font-light" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-slate-800 font-display">
                          {lang === 'en' ? 'Board of Directors Strategic Lounge' : '董事会决策中枢：用低碳撬动企业 ROI'}
                        </h3>
                        <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider font-mono">
                          Executive Leadership • Strategic Level
                        </p>
                      </div>
                      <p className="text-[11.5px] text-slate-600 leading-relaxed font-semibold max-w-sm mx-auto">
                        {lang === 'en'
                          ? 'We map Green HR workplace metrics into corporate finance improvements, analyzing cost-saving pathways and green branding multipliers.'
                          : '作为董事决策视角，这里不讨论无聊的具体行为，而是通过高位仿真舱，推演“绿色组织文化成熟度 (OGCI)”提高后，如何有效降低 14.2% 的核心开发人才流失率，冲销招聘与业务重建成本。'}
                      </p>
                    </div>
                  )}

                  {onboardingStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black text-slate-800 font-display">
                          {lang === 'en' ? '1. Calibrate Sustainability Baseline Index' : '1. 设定长期碳中和资产增值底色'}
                        </h3>
                        <p className="text-[10.5px] text-slate-500 font-medium">
                          {lang === 'en' ? 'Select targeted corporate Scope 3 reduction goals for 2026:' : '设定 2026 集团拟消减碳流失基准线，以此锁定高阶 AI 预算配置：'}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {[
                          ['10', '10%', lang === 'en' ? 'Conservative' : '常规低碳'],
                          ['15', '15%', lang === 'en' ? 'Balanced ESG' : '中高实质'],
                          ['25', '25%', lang === 'en' ? 'Carbon Pioneer' : '碳排领跑者']
                        ].map(([val, label, desc]) => (
                          <button
                            key={val}
                            onClick={() => setBoardTargetCarbon(val)}
                            className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer shadow-sm ${
                              boardTargetCarbon === val ? 'bg-amber-50 border-amber-555 text-amber-950 font-black' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span className="block text-xl font-mono font-black text-amber-600">{label}</span>
                            <span className="block text-[10px] font-bold mt-1.5">{desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {onboardingStep === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-black text-slate-800 font-display">
                          {lang === 'en' ? '2. Track Organizational Cohesion Core' : '2. 锚定价值杠杆：文化溢出收益（OGCI）'}
                        </h3>
                        <p className="text-[10.5px] text-slate-500 font-medium">
                          {lang === 'en' ? 'Select which corporate benefit is of highest priority right now:' : '设定本期决策模拟的传导核心阻尼：'}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {[
                          ['talent', lang === 'en' ? 'Retain High-Value Talents (Stop burnout attrition)' : '缓解研发紧绷度：用绿色连贯成就对冲脑力疲劳', '🧠'],
                          ['ops', lang === 'en' ? 'Reduce Resource Overhead (Paper/Electricity offset)' : '极尽物理开支削减：杜绝无端能源待机泄露', '💸']
                        ].map(([k, label, emoji]) => (
                          <button
                            key={k}
                            onClick={() => setRoiFocusArea(k as 'talent' | 'ops')}
                            className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                              roiFocusArea === k ? 'bg-amber-50 border-amber-555 text-amber-950 font-black' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2 text-[10.5px] font-bold">
                              <span>{emoji}</span>
                              <span>{label}</span>
                            </div>
                            {roiFocusArea === k && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {onboardingStep === 4 && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 border border-slate-100 rounded-3xl space-y-3 text-center shadow-sm">
                        <span className="text-[9px] uppercase font-mono font-black text-amber-600 tracking-wider block">Strategic Dashboard Ready</span>
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-100">
                          <Activity className="w-5 h-5 bg-transparent" />
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-800">{lang === 'en' ? 'Directors Dashboard Assets Verified' : '董事会大屏仿真舱初始化成功'}</h4>
                        <p className="text-[10.5px] text-slate-550 leading-relaxed max-w-sm mx-auto font-medium">
                          {lang === 'en'
                            ? 'Our system has configured the board indicators including carbon savings, culture indices and ROI simulator paths based on target selections!'
                            : '集团减排战略及留存推演舱已配齐。您现在可以登入顶层大屏操作降本仿真滑块，并向董事会分派绿色项目年度专项预算！'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {/* WIZARD ACTIONS NAV FOOTER FOOTER */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-6 shrink-0 text-xs font-bold font-mono">
                
                {/* Back button */}
                <button
                  type="button"
                  onClick={() => {
                    if (onboardingStep === 1) {
                      setScreen('selection');
                    } else {
                      setOnboardingStep(prev => prev - 1);
                    }
                  }}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:text-[#047857] hover:border-[#047857] rounded-xl transition-all cursor-pointer flex items-center gap-1 bg-white hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-555" />
                  <span>{lang === 'en' ? 'Back' : '上一步'}</span>
                </button>

                {/* Info summary */}
                <span className="text-[9.5px] text-slate-400 hidden sm:inline">
                  {lang === 'en' ? 'Green HR Unified Security Gateway' : '绿色人资安全加密信道'}
                </span>

                {/* Forward or Finish button */}
                {onboardingStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setOnboardingStep(prev => prev + 1)}
                    className={`px-4.5 py-2.5 text-white rounded-xl transition-all hover:scale-[1.01] cursor-pointer flex items-center gap-1 shadow-md ${
                      selectedRole === 'employee' ? 'bg-emerald-600 hover:bg-emerald-700' : selectedRole === 'hr' ? 'bg-sky-600 hover:bg-sky-700' : selectedRole === 'esg' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-600 hover:bg-amber-700'
                    }`}
                  >
                    <span>{lang === 'en' ? 'Next Step' : '下一步'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={finishOnboardingFlow}
                    className={`px-5 py-2.5 text-white rounded-xl font-black transition-all hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer shadow-md ${
                      selectedRole === 'employee' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25' : selectedRole === 'hr' ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-500/25' : selectedRole === 'esg' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25' : 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/25'
                    }`}
                  >
                    <span>{lang === 'en' ? 'Access Workspace Console' : '登入定制业务大屏'}</span>
                    <ChevronRight className="w-4.5 h-4.5 text-white" />
                  </button>
                )}

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 border-t border-emerald-100 text-center text-emerald-800 bg-emerald-50/20 font-mono text-[9px] font-semibold">
        <div>
          &copy; {new Date().getFullYear()} {lang === 'en' ? 'Sustainable Workplace Systems & AI Integration Dashboard.' : '智能办公微习惯与全员低碳习惯活跃系统。'}
        </div>
      </footer>

    </div>
  );
}
