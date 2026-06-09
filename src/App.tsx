/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  INITIAL_BUBBLES, INITIAL_DEPARTMENTS, TEAMMATES_DATA, REWARDS_SHOP, GREEN_BEHAVIORS 
} from './data';
import { 
  PointBubble, LoggedAction, DepartmentRanking, Teammate, RewardItem, PlantedTree, UserStats 
} from './types';

// Importing high fidelity sub-components
import AntForestCanvas from './components/AntForestCanvas';
import BehaviorLogger from './components/BehaviorLogger';
import EsgScoreCard from './components/EsgScoreCard';
import DepartmentRankingList from './components/DepartmentRankingList';
import RewardsStore from './components/RewardsStore';
import IntegrationCenter from './components/IntegrationCenter';

import AiGreenCoach from './components/AiGreenCoach';
import GreenTraining from './components/GreenTraining';
import EsgCorporateKanban from './components/EsgCorporateKanban';
import RecruitmentAndIncentives from './components/RecruitmentAndIncentives';
import HrSaasManagement from './components/HrSaasManagement';
import LeadershipDashboard from './components/LeadershipDashboard';
import EmployeeJourney from './components/EmployeeJourney';
import OnboardingWizard from './components/OnboardingWizard';
import IdentitySelection from './components/IdentitySelection';
import ExportAppCenter from './components/ExportAppCenter';

import { 
  Leaf, Globe, HelpCircle, Trophy, User, Sparkles, 
  HelpCircle as InfoIcon, Heart, Target, Award, Calendar, ExternalLink,
  Flame, Briefcase, Zap, AlertCircle, ChevronRight, Download
} from 'lucide-react';

export default function App() {
  // Lang preference state: default to Chinese since user requested "and i need Chinese"
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  // Identity selection screen gateway state
  const [identitySelected, setIdentitySelected] = useState<boolean>(() => {
    return localStorage.getItem('ghrm_identity_selected') === 'true';
  });

  // Progressive Onboarding auto-pop-up state
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(() => {
    return localStorage.getItem('ghrm_onboarding_completed') !== 'true';
  });

  // Simulated workplace overtime / strain toggle for realistic behavioral fluctuation demonstration
  const [workplaceStrain, setWorkplaceStrain] = useState<'low' | 'high'>('low');

  // State definitions matching user interactions
  const [bubbles, setBubbles] = useState<PointBubble[]>(() => 
    INITIAL_BUBBLES.map((b, i) => ({
      ...b,
      id: `init-bub-${i}-${Math.floor(Math.random() * 1000)}`,
    }))
  );

  const [stats, setStats] = useState<UserStats>({
    totalPointsCollected: 310, 
    currentBalance: 310,
    totalCarbonReducedKg: 12.8,
    esgScore: 72,
    pillars: {
      E: 210,
      S: 100,
      G: 0,
    }
  });

  const [departments, setDepartments] = useState<DepartmentRanking[]>(INITIAL_DEPARTMENTS);
  const [teammates, setTeammates] = useState<Teammate[]>(TEAMMATES_DATA);
  const [userDepartment, setUserDepartment] = useState<string>('Engineering & Tech');
  const [hasCompletedGovernanceAudit, setHasCompletedGovernanceAudit] = useState<boolean>(false);
  const [plantedTrees, setPlantedTrees] = useState<PlantedTree[]>([]);
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [showManualLogger, setShowManualLogger] = useState<boolean>(false);
  const [showRankings, setShowRankings] = useState<boolean>(false);

  // PEB Today's completion trace log (To answer "What have I completed today?")
  const [completedToday, setCompletedToday] = useState<{ id: string; name: string; nameZh: string; points: number; time: string; carbon: number }[]>([
    { id: 'log-init-1', name: 'Double-sided printed documentation files', nameZh: '双面打印低碳习惯履约', points: 16, time: '08:14', carbon: 0.384 },
    { id: 'log-init-2', name: 'Brought reusable custom desktop mug', nameZh: '自带常备保温随手杯减塑', points: 15, time: '08:30', carbon: 0.36 }
  ]);

  // Three pre-selected daily tasks checklist state (To answer "What should I do today?")
  const [dailyHabitsStatus, setDailyHabitsStatus] = useState<Record<string, boolean>>({
    paperless: false,
    commuting: false,
    electricity: false
  });

  // Streak & Task Completion Fire Animation states
  const [streakCount, setStreakCount] = useState<number>(5);
  const [fireTrigger, setFireTrigger] = useState<number>(0);

  // Role Personas: employee, hr, esg, leadership
  const [activeRole, setActiveRole] = useState<'employee' | 'hr' | 'esg' | 'leadership'>('employee');

  // Selected active tab representing the custom sub-modules
  const [activeTab, setActiveTab] = useState<'forest' | 'coach' | 'training' | 'incentives' | 'kanban' | 'hr_portal' | 'leadership_portal' | 'journey'>('forest');

  const handleRoleChange = (role: 'employee' | 'hr' | 'esg' | 'leadership') => {
    setActiveRole(role);
    if (role === 'employee') {
      setActiveTab('forest');
    } else if (role === 'hr') {
      setActiveTab('hr_portal');
    } else if (role === 'leadership') {
      setActiveTab('leadership_portal');
    } else {
      setActiveTab('kanban');
    }
  };

  // Triggering checkbox completion for daily habit focus tasks
  const handleCompleteDailyHabit = (typeKey: string, behaviorId: string, defaultPoints: number, defaultQty: number) => {
    if (dailyHabitsStatus[typeKey]) return; // already done

    setDailyHabitsStatus(prev => ({ ...prev, [typeKey]: true }));
    setFireTrigger(prev => prev + 1);
    setStreakCount(prev => {
      // Gentle capping/incrementing of consecutive days active to keep it realistic
      return prev < 12 ? prev + 1 : prev;
    });

    // Spawn point bubble on canvas for Alipay-style energy harvesting
    const matchedType = GREEN_BEHAVIORS.find(b => b.id === behaviorId);
    const label = matchedType ? (lang === 'en' ? matchedType.name : matchedType.nameZh) : 'Daily Habit';
    
    const newlyCreatedBubble: PointBubble = {
      id: `daily-hab-${Date.now()}`,
      behaviorId,
      behaviorName: `${label} (${defaultQty} ${matchedType?.unitName || 'x'})`,
      points: defaultPoints,
      x: Math.floor(Math.random() * 50) + 25,
      y: 20,
      isHarvested: false,
      isCustomLogged: true
    };

    setBubbles(prev => [...prev, newlyCreatedBubble]);

    // Add to today's completed list
    const timeStr = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    setCompletedToday(prev => [
      {
        id: `daily-hab-trace-${Date.now()}`,
        name: matchedType ? matchedType.name : 'Daily Green Habit Completed',
        nameZh: matchedType ? matchedType.nameZh : '每日聚焦绿色习惯达成',
        points: defaultPoints,
        time: timeStr,
        carbon: defaultPoints * 0.024
      },
      ...prev
    ]);
  };

  // Multi-module point budget deduction helper
  const handleDeductPoints = (points: number) => {
    setStats(prev => ({
      ...prev,
      currentBalance: Math.max(0, prev.currentBalance - points)
    }));
  };

  // Harvesting energy bubbles (Ant Forest mechanism)
  const handleHarvestBubble = (bubbleId: string) => {
    const targetBubble = bubbles.find(b => b.id === bubbleId);
    if (!targetBubble || targetBubble.isHarvested) return;

    // Harvest bubble
    setBubbles(prev => prev.map(b => b.id === bubbleId ? { ...b, isHarvested: true } : b));

    // Dynamic Carbon Coefficient calculation: proportional to point reward
    const carbonOffset = targetBubble.points * 0.024; // 1 GP ~ 24 grams CO2
    const targetCategoryBehavior = GREEN_BEHAVIORS.find(gb => gb.id === targetBubble.behaviorId);
    const category = targetCategoryBehavior ? targetCategoryBehavior.category : 'E';

    // Update global scoreboards
    setStats(prev => {
      const newPillars = { ...prev.pillars };
      newPillars[category] = (newPillars[category] || 0) + targetBubble.points;

      const newTotal = prev.totalPointsCollected + targetBubble.points;
      const newBalance = prev.currentBalance + targetBubble.points;
      const newCarbon = prev.totalCarbonReducedKg + carbonOffset;

      return {
        ...prev,
        totalPointsCollected: newTotal,
        currentBalance: newBalance,
        totalCarbonReducedKg: newCarbon,
        pillars: newPillars
      };
    });

    // Mirror points to the user's Department totals on leaderboard
    setDepartments(prevDepts => 
      prevDepts.map(d => {
        if (d.department === userDepartment) {
          const updatedPoints = d.totalPoints + targetBubble.points;
          return {
            ...d,
            totalPoints: updatedPoints,
            carbonReducedKg: d.carbonReducedKg + carbonOffset,
            averagePoints: Math.round(updatedPoints / d.memberCount)
          };
        }
        return d;
      }).sort((a, b) => b.totalPoints - a.totalPoints)
    );
  };

  // Logging a new action from logger form
  const handleLogBehavior = (behaviorId: string, quantity: number, pointsEarned: number) => {
    const matchedType = GREEN_BEHAVIORS.find(b => b.id === behaviorId);
    if (!matchedType) return;

    // Spawn point bubble at standard organic positions to fit inside forest canvas
    const xCoord = Math.floor(Math.random() * 60) + 15; // 15% to 75% wide
    const yCoord = Math.floor(Math.random() * 45) + 20; // 20% to 65% high (trees at bottom)

    const newlyCreatedBubble: PointBubble = {
      id: `dyn-bub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      behaviorId,
      behaviorName: `${matchedType.name} (${quantity} ${matchedType.unitName})`,
      points: pointsEarned,
      x: xCoord,
      y: yCoord,
      isHarvested: false,
      isCustomLogged: true
    };

    setBubbles(prev => [...prev, newlyCreatedBubble]);
    setFireTrigger(prev => prev + 1);

    // Add to real-time completed trace log list
    const timeStr = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    setCompletedToday(prev => [
      {
        id: `dyn-trace-${Date.now()}`,
        name: matchedType.name,
        nameZh: matchedType.nameZh || matchedType.name,
        points: pointsEarned,
        time: timeStr,
        carbon: pointsEarned * 0.024
      },
      ...prev
    ]);
  };

  // Switching departments on profile
  const handleSwitchDepartment = (newDeptName: string) => {
    setUserDepartment(newDeptName);
  };

  // Completing weekly sustainable office audit
  const handleGovernanceComplete = (points: number) => {
    // Spawn audit bubble immediately on canvas for harvesting!
    const newlyCreatedBubble: PointBubble = {
      id: `gov-bub-${Date.now()}`,
      behaviorId: 'saving_electricity',
      behaviorName: `Sustainable Desk Audit`,
      points: points,
      x: Math.floor(Math.random() * 50) + 25,
      y: 15, // float higher
      isHarvested: false,
      isCustomLogged: true
    };

    setBubbles(prev => [...prev, newlyCreatedBubble]);
    setHasCompletedGovernanceAudit(true);
  };

  // Redeeming a reward (Tree or voucher)
  const handleRedeemReward = (reward: RewardItem) => {
    if (stats.currentBalance < reward.cost) return;

    setStats(prev => ({
      ...prev,
      currentBalance: prev.currentBalance - reward.cost
    }));

    if (reward.type === 'tree') {
      const serialNumber = plantedTrees.filter(t => t.rewardId === reward.id).length + 1;
      const newTree: PlantedTree = {
        id: `tree-${Date.now()}`,
        rewardId: reward.id,
        treeName: `${reward.name} Series #${serialNumber}`,
        plantedAt: new Date().toISOString(),
        progress: 100
      };
      setPlantedTrees(prev => [...prev, newTree]);
    }
  };

  if (!identitySelected) {
    return (
      <IdentitySelection
        lang={lang}
        setLang={setLang}
        onSelectRole={(role) => {
          handleRoleChange(role);
          setIdentitySelected(true);
        }}
        onLogBehavior={handleLogBehavior}
        onAddMessage={(msg, type) => {
          // Trigger optional notifications
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f7f5] text-slate-800">
      {/* Top Professional Header Bar */}
      <header id="main_header_bar" className="bg-white border-b border-slate-150/80 sticky top-0 z-40 shadow-sm/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <Leaf className="w-5.5 h-5.5 fill-emerald-100" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-[#064e3b] tracking-tight font-display">
                {lang === 'en' ? 'Green Actions & Habit Center' : '全员绿色活跃与减碳习惯中心'}{' '}
                <span className="text-emerald-600">{lang === 'en' ? '(Carbon Dashboard)' : '(能碳行为主屏)'}</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">
                {lang === 'en' ? 'Empowering your workforce to build true daily low-carbon habits' : '连接企业低碳环保：日常减碳行为、积分激励与合规审计中枢。'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="px-3 py-1.5 text-xs font-bold rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>🌐</span>
              <span>{lang === 'en' ? '简体中文' : 'English'}</span>
            </button>

            {/* Quick Helper Shortcut */}
            <button
              onClick={() => setInfoModalOpen(true)}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-55 border border-slate-150 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <InfoIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'en' ? 'Concept Specs' : '模型规范指南'}</span>
            </button>

            {/* Export App Datasets & Packages Button */}
            <button
              onClick={() => setExportModalOpen(true)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-150 hover:text-indigo-900 text-indigo-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Export APP' : '导出 APP'}</span>
            </button>

            {/* Micro User Avatar display */}
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-150 px-3 py-1.5 rounded-xl text-xs">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shadow">
                SY
              </div>
              <div className="hidden md:block text-left">
                <div className="font-extrabold text-slate-850 truncate leading-none">suihaoyang@khu.ac.kr</div>
                <div className="text-[8.5px] text-slate-400 mt-1 uppercase font-semibold">
                  {lang === 'en' ? userDepartment : (userDepartment === 'Engineering & Tech' ? '工程研发部' : userDepartment === 'Operations & HR' ? '人力与行政组' : userDepartment)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Core View Area */}
      <main id="main_dashboard_grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Ecological Overview Mission statement */}
        <div id="mission_banner" className="bg-gradient-to-r from-slate-900 via-slate-950 to-[#022c22] rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden mb-8 border border-slate-800">
          {/* Ambient organic absolute vectors */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-350 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5" /> {lang === 'en' ? 'Green Habit Hub' : '全员低碳习惯活力系统'}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display">
                {activeRole === 'employee' ? (
                  lang === 'en'
                    ? 'Foster daily habits and root corporate green values back into personal PEB.'
                    : '培养个人每日微习惯，将低碳倡议深融全员每日 PEB 环保行履。'
                ) : activeRole === 'hr' ? (
                  lang === 'en'
                    ? 'Deploy GHRM initiatives to anchor micro-habits and balanced employee wellness.'
                    : '落地 GHRM 绿色人资规划，将习惯学堂与福利补偿深度融入组织韧性。'
                ) : activeRole === 'esg' ? (
                  lang === 'en'
                    ? 'Secure raw Scope 3 carbon telemetry against greenwashing via IPFS audit hashes.'
                    : '穿透 Scope 3 底账数据核销，用真实物理 APIs 与 IPFS 签名杜绝漂绿。'
                ) : (
                  lang === 'en'
                    ? 'Simulate dynamic sustainability returns (OGCI) to drive massive carbon-retention ROI.'
                    : '推演全景组织气候行为（OGCI）投资组合，用低碳荣耀筑牢高管决策 ROI。'
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1.5 text-slate-300">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <span className="font-bold text-[#2dd4bf] block text-[11px] mb-0.5">✦ {lang === 'en' ? 'Daily Habits' : '每日低碳微习惯'}</span>
                  <span className="text-[10px] text-slate-300 block leading-tight">{lang === 'en' ? 'Personalized actions & gamified incentives.' : '定制低碳行动，游戏化轻松积分。'}</span>
                </div>
                <div className="p-3 bg-[#10b981]/5 border border-[#10b981]/20 rounded-xl">
                  <span className="font-bold text-[#2dd4bf] block text-[11px] mb-0.5">✦ {lang === 'en' ? 'Physical Telemetry' : '底账级物理化校验'}</span>
                  <span className="text-[10px] text-slate-300 block leading-tight">{lang === 'en' ? 'Real meter APIs & device logs trace.' : '对接能表、复印机APIs，数据真实可靠。'}</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <span className="font-bold text-[#2dd4bf] block text-[11px] mb-0.5">✦ {lang === 'en' ? 'Incentive Alignment' : '低碳一致性代偿'}</span>
                  <span className="text-[10px] text-slate-300 block leading-tight">{lang === 'en' ? 'Points redeem real welfare and perks.' : '环境表现兑换福利假期，降低抗性。'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-slate-800 md:border-t-0 pt-4 md:pt-0 shrink-0 select-none">
              <div className="text-center bg-white/5 border border-white/10 px-4 py-3 rounded-2xl min-w-24">
                <span className="block text-[9px] text-[#2dd4bf] font-bold uppercase tracking-wider">{lang === 'en' ? 'Balance GP' : '绿色持存 GP 量'}</span>
                <span className="text-lg font-mono font-black text-white">{stats.currentBalance}</span>
              </div>
              <div className="text-center bg-white/5 border border-white/10 px-4 py-3 rounded-2xl min-w-24">
                <span className="block text-[9px] text-[#2dd4bf] font-bold uppercase tracking-wider">{lang === 'en' ? 'Carbon Avoided' : '累计碳中和量'}</span>
                <span className="text-lg font-mono font-black text-white">{stats.totalCarbonReducedKg.toFixed(1)}kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Insulated Perspectival Workspace Control Bar based on selected organizational identity */}
        <div className={`border rounded-3xl p-5 shadow-sm space-y-4 mb-8 transition-colors duration-300 ${
          activeRole === 'employee' ? 'bg-emerald-50/40 border-emerald-150/80' :
          activeRole === 'hr' ? 'bg-sky-50/40 border-sky-150/80' :
          activeRole === 'esg' ? 'bg-indigo-50/40 border-indigo-150/80' :
          'bg-amber-50/40 border-amber-150/80'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-4 border-b border-slate-200/65">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-sans font-black tracking-widest text-emerald-600 block">
                {activeRole === 'employee' && (lang === 'en' ? 'What should I do today?' : '我今天做什么？')}
                {activeRole === 'hr' && (lang === 'en' ? 'What should I manage?' : '我应该管理什么？')}
                {activeRole === 'esg' && (lang === 'en' ? 'Where are the risks?' : '哪里有风险？')}
                {activeRole === 'leadership' && (lang === 'en' ? 'What should we do next?' : '下一步做什么？')}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm">
                  {activeRole === 'employee' ? '👤' : activeRole === 'hr' ? '👥' : activeRole === 'esg' ? '🛡️' : '👑'}
                </span>
                <h3 className="text-base font-black text-slate-900 font-display">
                  {activeRole === 'employee' && (lang === 'en' ? 'My Green Actions / 我的绿色行动' : '我的绿色行动 / My Green Actions')}
                  {activeRole === 'hr' && (lang === 'en' ? 'Green HR / 绿色人力资源' : '绿色人力资源 / Green HR')}
                  {activeRole === 'esg' && (lang === 'en' ? 'Green Performance / 绿色表现审计' : '绿色表现审计 / Green Performance')}
                  {activeRole === 'leadership' && (lang === 'en' ? 'Goal Progress / 目标进展决策' : '目标进展决策 / Goal Progress')}
                </h3>
                <span className={`text-[9.5px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase border ${
                  activeRole === 'employee' ? 'bg-emerald-100/60 border-emerald-200 text-emerald-800' :
                  activeRole === 'hr' ? 'bg-sky-100/60 border-sky-200 text-sky-800' :
                  activeRole === 'esg' ? 'bg-indigo-100/60 border-indigo-200 text-indigo-800' :
                  'bg-amber-100/60 border-amber-200 text-amber-800'
                }`}>
                  • SECUREPERSPECTIVE •
                </span>
              </div>
              <div className="text-[11.5px] text-slate-550 max-w-3xl font-medium mt-1">
                {activeRole === 'employee' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✦</span>
                      <span>{lang === 'en' ? 'AI Habit Coach: Personal diagnostics' : 'AI 诊断：行为合理性分析与诊断'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✦</span>
                      <span>{lang === 'en' ? 'Interactive Field: Collect energy bubbles' : '能量收获：收取气泡，浇灌小树种'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✦</span>
                      <span>{lang === 'en' ? 'Real Perks: SWAP points for incentives' : '权益兑换：直接解锁年假与专属福利'}</span>
                    </span>
                  </div>
                )}
                {activeRole === 'hr' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <span className="flex items-center gap-1.5">
                      <span className="text-indigo-500">✦</span>
                      <span>{lang === 'en' ? 'Compensating Multipliers: Peak adjustments' : '能量调节：加班过载低碳代偿'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-indigo-500">✦</span>
                      <span>{lang === 'en' ? 'Incentive Settings: Reward alignments' : '习惯学堂：按需部署绿色微习惯培训'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-indigo-500">✦</span>
                      <span>{lang === 'en' ? 'Engagement: Track department metrics' : '活跃监测：跨部门低碳活跃指数穿透'}</span>
                    </span>
                  </div>
                )}
                {activeRole === 'esg' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <span className="flex items-center gap-1.5">
                      <span className="text-indigo-550">✦</span>
                      <span>{lang === 'en' ? 'Physical Traceability: Device telemetry logs' : '底账核销：对接能表、复印机流APIs'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-indigo-550">✦</span>
                      <span>{lang === 'en' ? 'Checklists: Quick click to clear threat' : '待办审查：点击排查审计坏点威胁'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-indigo-550">✦</span>
                      <span>{lang === 'en' ? 'Ledger Block: IPFS hash double audit' : '锁定存证：哈希签署，拒绝假装环保'}</span>
                    </span>
                  </div>
                )}
                {activeRole === 'leadership' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    <span className="flex items-center gap-1.5">
                      <span className="text-amber-500">✦</span>
                      <span>{lang === 'en' ? 'Cockpit Simulator: Track talent attraction' : '前瞻仿真：研判减排对人才黏性贡献'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-amber-500">✦</span>
                      <span>{lang === 'en' ? 'ROI Priority: Smart capital deployments' : 'ROI先行：保障资源流向高产习惯'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-amber-500">✦</span>
                      <span>{lang === 'en' ? 'Slide Deck: Ready boardroom export blueprints' : '一屏蓝图：导出直接用于幻灯片及PPT'}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Gateway Swapper to swap roles securely via Identity Selection */}
            <button
              onClick={() => {
                setIdentitySelected(false);
              }}
              className="shrink-0 self-start lg:self-center px-4.5 py-2.5 text-xs font-mono font-black border border-slate-300 hover:border-blue-500 bg-white hover:bg-slate-50 text-slate-800 hover:text-blue-600 rounded-2xl transition-all flex items-center gap-1.5 shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <span>⚙️</span>
              <span>{lang === 'en' ? 'Switch Identity Gateway' : '切换组织职务身份'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
            <div className="text-slate-500 font-medium max-w-xl">
              💡 <span className="font-bold text-slate-700">{lang === 'en' ? 'Core Goal / 主攻方向：' : '主攻方向：'}</span>
              {activeRole === 'employee' && (
                <>
                  <span>
                    {lang === 'en' ? 'Complete low-carbon habits, earn GP energy, and receive AI coaching.' : '培养低碳硬习惯，打卡降耗通勤，收集能量气泡兑换年假福利。'}
                  </span>
                  <button
                    onClick={() => setOnboardingOpen(true)}
                    className="ml-2.5 font-extrabold inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-150 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    🚀 {lang === 'en' ? 'Reconfigure Goals' : '配置目标画像'}
                  </button>
                </>
              )}
              {activeRole === 'hr' && (lang === 'en' ? 'Manage low-carbon training, active claims, and configure peak compensations.' : '设定加班平衡补贴，部署习惯学堂必修策略，激发全员低碳活跃。')}
              {activeRole === 'esg' && (lang === 'en' ? 'Verify audit proof, monitor equipment grids, and download official IPFS compliance report.' : '核算部门用能漏损，检查审计存证，一键导出锁定防漂绿数据底账。')}
              {activeRole === 'leadership' && (lang === 'en' ? 'See overall carbon ROI, detect behavior risks, and review executive agenda.' : '决策降碳开支 ROI，诊断行为泄露死角，规划企业敏捷低碳路线图。')}
            </div>

            {/* Filtered Context Tabs */}
            <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 rounded-xl p-1 border border-slate-150 self-start sm:self-auto">
              {activeRole === 'employee' && (
                <>
                  <button
                    onClick={() => setActiveTab('forest')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeTab === 'forest' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-850'
                    }`}
                  >
                    🌳 {lang === 'en' ? 'Amo Energy Canvas' : '低碳能量林地'}
                  </button>
                  <button
                    onClick={() => setActiveTab('coach')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeTab === 'coach' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-850'
                    }`}
                  >
                    🤖 {lang === 'en' ? 'AI Diagnostic Coach' : 'AI 习惯改进教练'}
                  </button>
                  <button
                    onClick={() => setActiveTab('training')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeTab === 'training' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-850'
                    }`}
                  >
                    🎓 {lang === 'en' ? 'Green Training Academy' : '健康低碳学习堂'}
                  </button>
                  <button
                    onClick={() => setActiveTab('incentives')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeTab === 'incentives' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-850'
                    }`}
                  >
                    🎁 {lang === 'en' ? 'Welfare & Incentives' : '福利兑换柜'}
                  </button>
                  <button
                    onClick={() => setActiveTab('journey')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeTab === 'journey' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-850'
                    }`}
                  >
                    💖 {lang === 'en' ? 'My Journey & Reflections' : '低碳心路 / Reflections'}
                  </button>
                </>
              )}

              {activeRole === 'hr' && (
                <>
                  <button
                    onClick={() => setActiveTab('hr_portal')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeTab === 'hr_portal' ? 'bg-white text-sky-850 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    🏛️ {lang === 'en' ? 'Green HR Workspace' : '绿色人资管理中枢'}
                  </button>
                </>
              )}

              {activeRole === 'esg' && (
                <>
                  <button
                    onClick={() => setActiveTab('kanban')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeTab === 'kanban' ? 'bg-white text-indigo-850 shadow-sm' : 'text-slate-500 hover:text-slate-850'
                    }`}
                  >
                    📊 {lang === 'en' ? 'Quantitative Carbon Kanban' : 'GHRM & PEB 审计总控制台'}
                  </button>
                </>
              )}

              {activeRole === 'leadership' && (
                <>
                  <button
                    onClick={() => setActiveTab('leadership_portal')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeTab === 'leadership_portal' ? 'bg-white text-amber-850 shadow-sm' : 'text-slate-500 hover:text-amber-850'
                    }`}
                  >
                    👑 {lang === 'en' ? 'Executive ROI Portal' : '董事会决策中枢'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>


        {/* Conditional Tab Panels Render block with clean framer motion */}
        <AnimatePresence mode="wait">
          {activeTab === 'forest' && (
            <motion.div
              key="forest"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* COLUMN 1 (Left Sidebar) - Personal HUD & Logging */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-6 flex flex-col">
                  {/* Green Score Profile Card (EsgScoreCard) - The Green Score */}
                  <div className="shrink-0">
                    <EsgScoreCard
                      stats={stats}
                      onGovernanceComplete={handleGovernanceComplete}
                      hasCompletedGovernanceAudit={hasCompletedGovernanceAudit}
                      lang={lang}
                    />
                  </div>

                  {/* Manual Event Logger (BehaviorLogger) - Collapsible by default for high visual breathing space */}
                  <div className="space-y-4">
                    {!showManualLogger ? (
                      <button
                        onClick={() => setShowManualLogger(true)}
                        className="w-full py-4 px-4 rounded-3xl border border-dashed border-slate-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/10 text-slate-700 hover:text-emerald-800 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm uppercase font-mono"
                      >
                        ➕ {lang === 'en' ? 'Simulate Other low-carbon habits' : '登记其它低碳行为申报 (Manual Log)'}
                      </button>
                    ) : (
                      <div className="bg-white border border-slate-150 p-4 rounded-3xl relative">
                        <button
                          onClick={() => setShowManualLogger(false)}
                          className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-slate-650 font-mono z-10 cursor-pointer"
                        >
                          收起 [✕]
                        </button>
                        <BehaviorLogger
                          onLogBehavior={handleLogBehavior}
                          lang={lang}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* COLUMN 2 (Center Core Field) - Harvesting Canvas & AI Diagnostics Feed */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-6 flex flex-col">
                  {/* Interactive Bubble Harvesting Dome */}
                  <div className="rounded-3xl shadow-sm bg-white overflow-hidden border border-slate-150 p-1.5 min-h-[350px] flex flex-col">
                    <AntForestCanvas
                      bubbles={bubbles}
                      onHarvestBubble={handleHarvestBubble}
                      plantedTreeCount={plantedTrees.length}
                      totalPointsCollected={stats.totalPointsCollected}
                    />
                  </div>

                  {/* AI Behavioral Diagnostic Feedback Widget (Analytical Coach Feed) */}
                  <div className="bg-white border border-slate-150 rounded-3xl p-5 shadow-sm space-y-3.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        📢 {lang === 'en' ? 'AI Habit Diagnostics' : 'AI 习惯模式诊断反馈'}
                      </h4>
                      
                      {/* Stress & Strain Switcher */}
                      <div className="flex bg-slate-100 p-0.5 rounded-lg text-[9.5px] font-bold">
                        <button 
                          onClick={() => setWorkplaceStrain('low')}
                          className={`px-2 py-1 rounded-md transition-all cursor-pointer ${workplaceStrain === 'low' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                        >
                          {lang === 'en' ? 'Normal / Balanced' : '日常稳定模式'}
                        </button>
                        <button 
                          onClick={() => setWorkplaceStrain('high')}
                          className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-0.5 ${workplaceStrain === 'high' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                        >
                          <Briefcase className="w-2.5 h-2.5" />
                          <span>{lang === 'en' ? 'Deadline Stress' : '交付冲刺负荷'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs leading-normal font-medium text-slate-650">
                      {workplaceStrain === 'low' ? (
                        lang === 'en' ? (
                          <>
                            <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 text-[10.5px] space-y-1">
                              <p className="font-bold text-emerald-900 flex items-center gap-1">
                                <Zap className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                                <span>Habit Momentum: EXCELLENT / STABLE</span>
                              </p>
                              <p className="text-slate-500">
                                Your Scope 3 commute stability reaches 94.2% (+4.8% growth vs last week). No friction detected. 
                                <strong className="text-emerald-700 font-bold"> AI predicts continued full task completion next week.</strong>
                              </p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 text-[10.5px] space-y-1">
                              <span className="font-extrabold text-slate-700 block">💡 Easiest Action to Boost Performance Today:</span>
                              <p className="text-slate-500">
                                Log your reusable mug today to claim +15 GP. It has the lowest cognitive friction and builds the core sustainable workplace identity!
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 text-[10.5px] space-y-1">
                              <p className="font-bold text-emerald-950 flex items-center gap-1">
                                <Zap className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                                <span>习惯动力：强劲稳定 / 心理高度正向</span>
                              </p>
                              <p className="text-slate-650 font-semibold">
                                本周多项绿色行为链条运转正常。Scope 3 低碳通勤连贯度维持在 94.2% 极佳区间，
                                <strong className="text-emerald-700">AI 预测下周将突破历史惯性峰值、并带来额外 GP 能量溢出。</strong>
                              </p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 text-[10.5px] space-y-1">
                              <span className="font-bold text-slate-800 block">💡 今日最轻量降碳改进方案：</span>
                              <p className="text-slate-500">
                                建议随手打卡登记一次“低碳骑行”或“使用环保杯”(+15 GP)。本阶段此行动决策成本最低，极易在无感中巩固您的每日行为习惯。
                              </p>
                            </div>
                          </>
                        )
                      ) : (
                        lang === 'en' ? (
                          <>
                            <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-150 text-[10.5px] space-y-1.5">
                              <p className="font-bold text-rose-800 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                                <span>Habit Consistency Status: DECREASED / PRESSURE IMPACTED</span>
                              </p>
                              <p className="text-slate-600 leading-relaxed">
                                <strong className="text-rose-900 block font-black">“Your sustainability consistency decreased this week.”</strong>
                                <strong className="text-amber-800 block">“Recent work pressure may be affecting your green participation.”</strong>
                                Due to consecutive late-night deployments, secondary physical paper sorting dropped by 24%. This fluctuation is completely normal.
                              </p>
                            </div>
                            <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-200 text-[10.5px] space-y-1">
                              <p className="font-bold text-amber-900">🔮 AI Adaptive Strategy & Future Prediction:</p>
                              <p className="text-slate-650 leading-relaxed font-semibold">
                                <strong className="text-slate-800 block">“AI predicts improved task completion next week.”</strong>
                                As release sprint milestones complete, mental strain is expected to fade. Workstation screen standby (+30 GP) remains active with zero effort! Select this task below to maintain your streak.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-150 text-[10.5px] space-y-1.5 animate-pulse">
                              <p className="font-bold text-rose-850 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                                <span>习惯动态感知：出现抗性波动 / 阶段压力负荷</span>
                              </p>
                              <p className="text-slate-650 leading-relaxed">
                                <strong className="text-rose-900 block font-black">“您的绿色行为执行一致率在本周有所下降。”</strong>
                                <strong className="text-amber-850 block">“检测显示：近期加班与大版交付压力正在压制您的环保参与精力。”</strong>
                                连续夜间留守导致餐盒分类等高物理运动降碳率下跌 24%，习惯曲线由于加班压力呈现自然、真实的非线性起伏，无须产生教条负担。
                              </p>
                            </div>
                            <div className="p-3 bg-sky-50 rounded-xl border border-sky-150 text-[10.5px] space-y-1">
                              <p className="font-bold text-sky-950">🔮 AI 柔性负荷预测与心理复元引导：</p>
                              <p className="text-slate-650 leading-relaxed font-semibold">
                                <strong className="text-emerald-850 block">“AI 预测下周您的日常绿色任务完成度将大幅回升。”</strong>
                                伴随项目联调结束，大脑认知过阻将消退。今日特为您推荐【极简工位空载熄幕 (+30 GP)】微碳目标，仅需午离时顺手按灭显示器，即可无痛呵护您的绿色连贯度：
                              </p>
                            </div>
                          </>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* COLUMN 3 (Right Sidebar) - Goals, Streak Metric & Leaderboards */}
                <div className="lg:col-span-12 xl:col-span-3 space-y-6 flex flex-col">
                  {/* Three Daily Focused Tasks Checklist (Q1) */}
                  <div className="bg-white border border-slate-150 rounded-3xl p-5 shadow-sm space-y-3 shrink-0">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">
                        🎯 {lang === 'en' ? 'Daily Focus Goals' : '今日聚焦习惯目标 (Q1)'}
                      </h4>
                      <span className="text-[9.5px] text-slate-400 font-mono">Max 3 Daily</span>
                    </div>

                    <div className="space-y-2.5">
                      {/* Task 1 */}
                      <button
                        onClick={() => handleCompleteDailyHabit('paperless', 'duplex_printing', 16, 4)}
                        disabled={dailyHabitsStatus.paperless}
                        className={`w-full text-left p-3 rounded-2xl border transition-all text-xs ${
                          dailyHabitsStatus.paperless
                            ? 'bg-slate-50 border-slate-150 text-slate-400 opacity-70 cursor-not-allowed'
                            : 'bg-emerald-50/10 hover:bg-emerald-50/30 border-emerald-100/60 text-slate-800 font-bold cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate flex items-center gap-1.5">
                            <span>🖨️</span>
                            <span className="text-[10.5px]">{lang === 'en' ? 'Digital Agenda meeting over printouts' : '会议无纸化：数字白板拒绝印发草案'}</span>
                          </span>
                          <span className="font-mono text-[10px] shrink-0 font-bold text-emerald-700">
                            {dailyHabitsStatus.paperless ? '✓ LOCK' : '+16 GP'}
                          </span>
                        </div>
                      </button>

                      {/* Task 2 */}
                      <button
                        onClick={() => handleCompleteDailyHabit('commuting', 'green_commuting', 60, 5)}
                        disabled={dailyHabitsStatus.commuting}
                        className={`w-full text-left p-3 rounded-2xl border transition-all text-xs ${
                          dailyHabitsStatus.commuting
                            ? 'bg-slate-50 border-slate-150 text-slate-400 opacity-70 cursor-not-allowed'
                            : 'bg-emerald-50/10 hover:bg-emerald-50/30 border-emerald-100/60 text-slate-800 font-bold cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate flex items-center gap-1.5">
                            <span>🚲</span>
                            <span className="text-[10.5px]">{lang === 'en' ? 'Train commute instead of regional taxi' : '低碳公差：乘坐城际捷铁代替单人燃油轿车'}</span>
                          </span>
                          <span className="font-mono text-[10px] shrink-0 font-bold text-emerald-700">
                            {dailyHabitsStatus.commuting ? '✓ LOCK' : '+60 GP'}
                          </span>
                        </div>
                      </button>

                      {/* Task 3 */}
                      <button
                        onClick={() => handleCompleteDailyHabit('electricity', 'saving_electricity', 30, 5)}
                        disabled={dailyHabitsStatus.electricity}
                        className={`w-full text-left p-3 rounded-2xl border transition-all text-xs ${
                          dailyHabitsStatus.electricity
                            ? 'bg-slate-50 border-slate-150 text-slate-400 opacity-70 cursor-not-allowed'
                            : 'bg-emerald-50/10 hover:bg-emerald-50/30 border-emerald-100/60 text-slate-800 font-bold cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate flex items-center gap-1.5">
                            <span>🔌</span>
                            <span className="text-[10.5px]">{lang === 'en' ? 'Shut Down monitors during 1h lunch rest' : '随手降耗：午休1小时彻底熄灯关闭显示器'}</span>
                          </span>
                          <span className="font-mono text-[10px] shrink-0 font-bold text-emerald-700">
                            {dailyHabitsStatus.electricity ? '✓ LOCK' : '+30 GP'}
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Streak & Sparkline Consistency Widget (Q3) */}
                    <motion.div
                      key={fireTrigger === 0 ? "streak-static" : `streak-fire-${fireTrigger}`}
                      initial={fireTrigger > 0 ? { scale: 0.95, y: 5 } : {}}
                      animate={{ 
                        scale: 1, 
                        y: 0,
                        borderColor: fireTrigger > 0 ? ["rgba(251,146,60,0.8)", "rgba(220,38,38,0.4)", "rgba(251,146,60,0)"] : "rgba(251,146,60,0)",
                        boxShadow: fireTrigger > 0 ? [
                          "0 0 10px rgba(251,146,60,0.6)",
                          "0 4px 20px rgba(239,68,68,0.4)",
                          "0 0 0 rgba(0,0,0,0)"
                        ] : "none"
                      }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                      className="p-3.5 bg-gradient-to-br from-slate-900 to-[#022c22] text-white rounded-2xl space-y-2 mt-3 select-none relative overflow-hidden border border-transparent"
                    >
                      {/* Fire/Flame Particles Layer */}
                      {fireTrigger > 0 && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                          {/* Rising fire spark embers */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={`ember-${fireTrigger}-${i}`}
                              initial={{
                                opacity: 1,
                                y: 60,
                                x: 10 + (i * 15) + (Math.random() * 10) + "%",
                                scale: 0.5 + Math.random() * 0.8,
                              }}
                              animate={{
                                opacity: 0,
                                y: -25,
                                scale: 0.1,
                                rotate: Math.random() * 360,
                              }}
                              transition={{
                                duration: 1.0 + Math.random() * 0.7,
                                ease: "easeOut",
                                delay: i * 0.04
                              }}
                              className="absolute w-2 h-2 rounded-full bg-gradient-to-t from-orange-600 via-orange-400 to-amber-300 filter blur-[0.5px]"
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex items-start justify-between relative z-20">
                        <div>
                          <span className="block text-[8px] text-emerald-300 font-bold uppercase tracking-wider">
                            {lang === 'en' ? 'PEB Habits Consistency' : '低碳习惯一致率'}
                          </span>
                          <span className="text-base font-mono font-black text-emerald-100 flex items-center gap-1.5">
                            <span>94.2%</span>
                            {/* Animated Flame icon from lucide Display */}
                            <motion.span
                              animate={fireTrigger > 0 ? {
                                scale: [1, 1.4, 0.9, 1.1, 1],
                                rotate: [0, -15, 15, -5, 0],
                                color: ["#10b981", "#f97316", "#ef4444", "#fb923c", "#34d399"]
                              } : {}}
                              transition={{ duration: 0.8 }}
                              className="text-emerald-400"
                            >
                              <Flame className={`w-4 h-4 ${fireTrigger > 0 ? "fill-orange-500 stroke-orange-400" : "fill-emerald-500/20 stroke-emerald-400"}`} />
                            </motion.span>
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold block mb-1">
                            +4.8% {lang === 'en' ? 'Growth' : '周增长'}
                          </span>
                          {/* Real Dynamic Green Streak Badge */}
                          <motion.span 
                            animate={fireTrigger > 0 ? { scale: [1, 1.2, 1] } : {}}
                            className="text-[9px] font-mono font-black text-orange-400 flex items-center justify-end gap-0.5"
                          >
                            <span>🔥 {streakCount} {lang === 'en' ? 'Days Streak' : '天连续'}</span>
                          </motion.span>
                        </div>
                      </div>

                      {/* Mini Sparkline graph */}
                      <div className="h-7 flex items-end gap-1 pt-1.5 relative z-20">
                        {[42, 58, 65, 50, 78, 85, 94].map((ht, i) => (
                          <div key={i} className="flex-1 bg-slate-800 rounded-sm overflow-hidden h-full flex flex-col justify-end">
                            <motion.div
                              style={{ height: `${ht}%` }}
                              animate={fireTrigger > 0 && i === 6 ? {
                                height: ["94%", "97%", "94%"],
                                backgroundColor: ["#10b981", "#f97316", "#10b981"]
                              } : {}}
                              transition={{ duration: 0.8, repeat: 1 }}
                              className={`w-full rounded-sm transition-all duration-300 ${
                                i === 6 ? 'bg-emerald-300 animate-pulse' : 'bg-emerald-400'
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                      <span className="block text-[7.5px] text-emerald-400 mt-1 font-mono text-center relative z-20">
                        Stability Metrics (Mon - Sun)
                      </span>
                    </motion.div>
                  </div>

                  {/* Department and Comrade Rankings leaderboards - Collapsible by default for high visual breathing space */}
                  <div className="space-y-4">
                    {!showRankings ? (
                      <button
                        onClick={() => setShowRankings(true)}
                        className="w-full py-4 px-4 rounded-3xl border border-dashed border-slate-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/10 text-slate-700 hover:text-emerald-800 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm uppercase font-mono mt-3"
                      >
                        🏆 {lang === 'en' ? 'Show Corporate Rankings & Achievements' : '查看跨科室及个人行为成就排行 (Rankings)'}
                      </button>
                    ) : (
                      <div className="bg-white border border-slate-150 p-4 rounded-3xl relative mt-3">
                        <button
                          onClick={() => setShowRankings(false)}
                          className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-slate-650 font-mono z-10 cursor-pointer"
                        >
                          收起 [✕]
                        </button>
                        <DepartmentRankingList
                          departments={departments}
                          teammates={teammates}
                          userDepartment={userDepartment}
                          onSwitchDepartment={handleSwitchDepartment}
                          userPoints={stats.totalPointsCollected}
                          userCarbonReduced={stats.totalCarbonReducedKg}
                          lang={lang}
                        />
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'coach' && (
            <motion.div
              key="coach"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="max-w-4xl mx-auto w-full"
            >
              <AiGreenCoach onLogBehavior={handleLogBehavior} lang={lang} />
            </motion.div>
          )}

          {activeTab === 'training' && (
            <motion.div
              key="training"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="max-w-4xl mx-auto w-full"
            >
              <GreenTraining onLogBehavior={handleLogBehavior} lang={lang} />
            </motion.div>
          )}

          {activeTab === 'incentives' && (
            <motion.div
              key="incentives"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="max-w-4xl mx-auto w-full space-y-6"
            >
              <RecruitmentAndIncentives
                currentBalance={stats.currentBalance}
                onDeductPoints={handleDeductPoints}
                lang={lang}
              />

              {/* Real Environmental Perks Virtual Forestry */}
              <RewardsStore
                currentBalance={stats.currentBalance}
                plantedTrees={plantedTrees}
                onRedeemReward={handleRedeemReward}
                lang={lang}
              />
            </motion.div>
          )}

          {activeTab === 'kanban' && (
            <motion.div
              key="kanban"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="w-full space-y-6"
            >
              {/* Scope 2 & 3 Compliance Overview */}
              <EsgCorporateKanban lang={lang} />

              {/* Developer Webhooks and Automatic API calendar Syncs */}
              <div className="max-w-4xl mx-auto w-full">
                <IntegrationCenter
                  onLogBehavior={handleLogBehavior}
                  lang={lang}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'hr_portal' && (
            <motion.div
              key="hr_portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="w-full space-y-6"
            >
              <HrSaasManagement
                lang={lang}
                stats={{
                  currentBalance: stats.currentBalance,
                  totalCarbonReducedKg: stats.totalCarbonReducedKg,
                  streakLevel: streakCount
                }}
                teammates={teammates.map(t => ({
                  id: t.id,
                  name: t.name,
                  dept: t.department,
                  points: t.totalPoints,
                  badges: t.totalPoints > 400 ? ['AAA Green Champion', 'Paperless Pioneer'] : ['Green Core Team'],
                  carbonSaved: t.carbonReducedKg,
                  streak: 6
                }))}
                onAddLogEntry={(msg) => {
                  const timeStr = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
                  setCompletedToday(prev => [
                    {
                      id: `sug-trace-${Date.now()}`,
                      name: msg,
                      nameZh: msg,
                      points: 20,
                      time: timeStr,
                      carbon: 0.48
                    },
                    ...prev
                  ]);
                }}
              />
            </motion.div>
          )}

          {activeTab === 'leadership_portal' && (
            <motion.div
              key="leadership_portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="w-full space-y-6"
            >
              <LeadershipDashboard
                lang={lang}
                stats={{
                  currentBalance: stats.currentBalance,
                  totalCarbonReducedKg: stats.totalCarbonReducedKg
                }}
                teammatesCount={teammates.length}
              />
            </motion.div>
          )}

          {activeTab === 'journey' && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.15 }}
              className="w-full space-y-6"
            >
              <EmployeeJourney
                lang={lang}
                stats={stats}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Corporate Environmental Policy and System Details Footer */}
      <footer id="main_footer_element" className="bg-white border-t border-slate-150 mt-16 py-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-1.5 font-display font-medium text-slate-600">
            <Leaf className="w-4 h-4 text-emerald-500 fill-emerald-100" />
            <span>{lang === 'en' ? 'Green Behavior Initiative Core Project v1.4' : '绿色行为低碳普惠倡议重点体系企业端 v1.4'}</span>
          </div>
          
          <p className="max-w-md mx-auto leading-relaxed text-[11px]">
            {lang === 'en' ? 
              'Points generated are derived mathematically using estimates based on average environmental metrics. Claimed products and virtual planted trees contribute to ongoing local conservation drives.' :
              '系统产生之积分、二氧化碳减排当量计算方式已获得企业 GHRM/PEB 建设委员会审核认定。每次领取或购买林地防风环保梭梭树皆全额补贴，由集团在西部沙区真实植树生态林中落实。'}
          </p>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] gap-3">
            <div>
              &copy; {new Date().getFullYear()} {lang === 'en' ? 'Sustainable Workplace Systems. Managed under corporate GHRM & PEB compliance guidelines.' : '可持续智能办公系统。由集团 GHRM 与 PEB 合规规划管理部统一配置技术支持。'}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setInfoModalOpen(true)} className="hover:text-slate-600 underline cursor-pointer">{lang === 'en' ? 'Interactive Walkthrough' : '平台交互式指南'}</button>
              <span className="text-slate-200">|</span>
              <a href="#" className="hover:text-slate-600 underline">{lang === 'en' ? 'Privacy Policies' : '隐私权与安全规范协议'}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Walkthrough Concept Information Modal */}
      <AnimatePresence>
        {infoModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600 animate-spin" style={{ animationDuration: '10s' }} />
                  <h3 className="text-base font-extrabold text-slate-905 font-display">
                    Core Specifications Walkthrough
                  </h3>
                </div>
                <button
                  onClick={() => setInfoModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 font-bold px-3 py-1.5 rounded-full text-xs text-slate-700 cursor-pointer"
                >
                  Got it
                </button>
              </div>

              <div className="space-y-4 leading-relaxed text-xs text-slate-600">
                <p>
                  Welcome to the **Green Behavior Points System (Core)** dashboard. This is designed strictly to model gamified carbon initiatives like **Alipay Ant Forest** and **Keep**, customized for an enterprise environment.
                </p>

                <div className="bg-emerald-50/50 p-3.5 border border-emerald-100 rounded-2xl space-y-2">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1">
                    <Target className="w-4 h-4 text-emerald-700" />
                    Key Mechanics Summary:
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <strong>Step 1: Perform & Log Actions:</strong> Use the "Log Green Behavior" form to enter physical green behaviors (e.g., cycling, double-sided printing, switching off unused electricity).
                    </li>
                    <li>
                      <strong>Step 2: Spawn Floating Bubbles:</strong> Logging an action immediately spawns an energy bubble centered above the tree canvas on your dashboard.
                    </li>
                    <li>
                      <strong>Step 3: Harvest on the Canvas:</strong> Click floating bubbles to harvest points, adding them securely to your balances!
                    </li>
                    <li>
                      <strong>Step 4: Plant & Evolve:</strong> Spend Green Points in the shop to claim sustainable virtual trees. Planting trees changes your tree level on the canvas (Seedling to Massive Oasis)!
                    </li>
                    <li>
                      <strong>Step 5: Represent your Branch:</strong> Track where you stand in Teammate ranks and Switch departments to support your division's total scoreboard!
                    </li>
                  </ul>
                </div>

                <div className="border border-purple-100 bg-purple-50/30 p-3.5 rounded-2xl flex items-start gap-2.5">
                  <Award className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-purple-950 text-xs">GHRM / PEB Pillars and Auditing</h5>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Behaviors are mapped across **Environmental** (E) and **Social** (S) pillars. Fulfill the weekly "Sustainable Desk Audit Check" to boost your **Governance** (G) scores to achieve the top AAA corporate grade!
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center text-slate-400 text-[10px]">
                  Green Behavior Core Program. Created with a focus on pristine layout design.
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Progressive Onboarding Wizard */}
      <OnboardingWizard
        lang={lang}
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onLogBehavior={handleLogBehavior}
      />

      {/* Standalone Export App Center & ESG Datasets */}
      <AnimatePresence>
        {exportModalOpen && (
          <ExportAppCenter
            lang={lang}
            isOpen={exportModalOpen}
            onClose={() => setExportModalOpen(false)}
            stats={stats}
            completedToday={completedToday}
            departments={departments}
            teammates={teammates}
            plantedTrees={plantedTrees}
            userDepartment={userDepartment}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
