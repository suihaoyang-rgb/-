/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, TrendingDown, ArrowRight, ShieldCheck, ShieldAlert,
  Zap, Sparkles, Star, Award, BarChart2, Activity, Play, HelpCircle,
  AlertCircle, Check, Compass, Layers, CheckSquare, Target, Lightbulb
} from 'lucide-react';

interface LeadershipDashboardProps {
  lang?: 'en' | 'zh';
  stats: {
    totalCarbonReducedKg: number;
    currentBalance: number;
  };
  teammatesCount: number;
}

export default function LeadershipDashboard({ lang = 'zh', stats, teammatesCount }: LeadershipDashboardProps) {
  // Scenario selector states for what-if outcomes
  const [participationIncrease, setParticipationIncrease] = useState<number>(10);
  const [aiAdoption, setAiAdoption] = useState<number>(30);

  // Active Alert selection state
  const [activeTab, setActiveTab] = useState<'all' | 'strategy'>('all');

  // Interactive Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Company Overview Scores (Visual scorecards utilizing simplified terminology)
  const overviewCards = useMemo(() => {
    return [
      {
        id: 'green-perf',
        titleEn: 'Green Performance',
        titleZh: '绿色表现',
        subTextEn: 'Overall baseline eco performance',
        subTextZh: '组织低碳习惯整体践行度',
        score: '87%',
        statusEn: 'On Track',
        statusZh: '运行良好',
        trendEn: '↑ Improving',
        trendZh: '↑ 稳步提升',
        color: 'emerald',
        oldTerm: 'Organizational Sustainability Performance'
      },
      {
        id: 'goal-prog',
        titleEn: 'Goal Progress',
        titleZh: '目标进展',
        subTextEn: 'Alignment with green net-zero milestones',
        subTextZh: '对齐年度零碳文化演进节点',
        score: '92%',
        statusEn: 'Excellent',
        statusZh: '超出预期',
        trendEn: '↑ Ahead',
        trendZh: '↑ 提前达成',
        color: 'sky',
        oldTerm: 'Strategic Sustainability Alignment'
      },
      {
        id: 'risk-lvl',
        titleEn: 'Risk Level',
        titleZh: '风险等级',
        subTextEn: 'Active governance/slippage threats',
        subTextZh: '当前用能与大楼能碳敞口威胁',
        score: 'Low',
        scoreZh: '低复合风险',
        statusEn: 'Secure',
        statusZh: '安全无虞',
        trendEn: '↓ Declining',
        trendZh: '↓ 正在改善',
        color: 'amber',
        oldTerm: 'Governance Risk'
      },
      {
        id: 'ai-prog',
        titleEn: 'AI Progress',
        titleZh: 'AI进展',
        subTextEn: 'Automatic telemetry & nudging adoption',
        subTextZh: '物理探针接入与自动化推送覆盖率',
        score: '78%',
        statusEn: 'Accelerating',
        statusZh: '快速孵化',
        trendEn: '↑ Improving',
        trendZh: '↑ 部署中',
        color: 'indigo',
        oldTerm: 'Transformation Readiness'
      }
    ];
  }, []);

  // 2. Key Business Metrics
  const coreMetrics = [
    { labelEn: 'Employee Participation', labelZh: '员工参与度', val: '85%', color: 'from-emerald-500 to-teal-500' },
    { labelEn: 'Training Completion', labelZh: '培训完成率', val: '91%', color: 'from-sky-500 to-indigo-500' },
    { labelEn: 'Compliance Score', labelZh: '合规得分', val: '93%', color: 'from-indigo-500 to-violet-500' },
    { labelEn: 'Green Culture Score', labelZh: '绿色文化得分', val: '88%', color: 'from-amber-500 to-orange-500' }
  ];

  // 3. Risks & Opportunities Matrix (Strict plain language mapping)
  const matrixData = {
    highRisks: {
      titleEn: 'High Priority Risks',
      titleZh: '重点风险 (立即关注)',
      itemsEn: ['Operations energy standby leakages during extra hours', 'Low-carbon training completion gap in sales segment'],
      itemsZh: ['运营部门核心设备加班期间待机空耗严重', '销售分部绿色宣签完成率低于合规基准红线']
    },
    growthOpps: {
      titleEn: 'Growth Opportunities',
      titleZh: '发展机会 (投资增效)',
      itemsEn: ['Deploy IoT automatic sleep settings for heavy divisions', 'Scale green training gamification modules to save $15k'],
      itemsZh: ['重灾区设备部署全自动无感智能控制，取代手动打卡', '通过将学习活动积分对接物理礼券节省重置管理开销']
    },
    futureOpps: {
      titleEn: 'Future Opportunities',
      titleZh: '未来机会 (长线布局)',
      itemsEn: ['API integrations for public transport commuting points', 'Carbon offsets valuation aligned with hiring retention'],
      itemsZh: ['对接公共交通与员工零碳通勤APIs的积分奖励', '引入能碳习惯保护因子，对齐年度ESG企业价值溢价']
    },
    lowIssues: {
      titleEn: 'Low Priority Issues',
      titleZh: '一般问题 (监控观察)',
      itemsEn: ['Occasional paper logs filing lags in logistics', 'Awaiting full-scope signature lock on Scope 3 report'],
      itemsZh: ['后勤中心个别纸张用量未进入当日存证账册', '范畴三数据报告等待进行审计链盖章锁定']
    }
  };

  // 4. Investment Priority Ranking
  const investmentRankings = [
    { labelEn: 'AI Green Training', labelZh: 'AI 智慧绿色培训系统', score: 95, color: 'bg-emerald-500', roiEn: 'High ROI', roiZh: '高回报量化' },
    { labelEn: 'Employee Engagement Platform', labelZh: '全员习惯互动参与大楼', score: 89, color: 'bg-emerald-400', roiEn: 'Strong Engagement', roiZh: '社群效应显著' },
    { labelEn: 'Green Leadership Program', labelZh: '领袖绿色管理示范课', score: 84, color: 'bg-indigo-500', roiEn: 'Steady Culture', roiZh: '中长效文化' },
    { labelEn: 'AI ESG Reporting', labelZh: 'AI 合规数据自动汇至账册', score: 78, color: 'bg-indigo-400', roiEn: 'Risk Mitigation', roiZh: '高规避审计风险' }
  ];

  // 5. Future Impact Simulator output logic (Simple Business Outcomes)
  const simulatedImpact = useMemo(() => {
    const baselineGPerf = 87;
    const baselineGProgress = 92;
    const baselineCulture = 88;
    const auditWorkReduction = Math.min(60, Math.round(aiAdoption * 1.5));
    
    const addedGPerf = Math.min(100, Math.round(baselineGPerf + (participationIncrease * 0.4)));
    const addedGProgress = Math.min(100, Math.round(baselineGProgress + (participationIncrease * 0.3) + (aiAdoption * 0.2)));
    const addedCulture = Math.min(100, Math.round(baselineCulture + (participationIncrease * 0.5)));

    return {
      greenPerf: addedGPerf,
      goalProgress: addedGProgress,
      cultureScore: addedCulture,
      adminReduction: auditWorkReduction,
      trainingEffectiveness: Math.min(99, 81 + Math.round(aiAdoption * 0.4))
    };
  }, [participationIncrease, aiAdoption]);

  // 6. Action Recommendation Suggestion Box
  const activeRecommendation = {
    titleEn: "Deploy AI-supported Green Training to all business units.",
    titleZh: "拟全量下发推广“AI物理无感低碳培训与提示系统”到所有运营部门。",
    reasonEn: "High strategic impact, minimal deployment friction, and directly addresses active participation slippage.",
    reasonZh: "理由：低落地阻力，能有效补强当下运营分部存在的零碳习惯滑坡，拉升合规总表现。"
  };

  const handleApplyStrategicRecommendation = () => {
    triggerToast(
      lang === 'en'
        ? "Strategic recommendation approved! Directive broadcasted across the corporate network."
        : "董事会战略指令已签发！系统将一键对齐在所有子业务单元中激活AI宣贯挑战系统。"
    );
  };

  return (
    <div id="leadership_boardroom_cockpit" className="bg-[#f8fafc] rounded-[2.5rem] border border-slate-200/80 shadow-lg overflow-hidden text-slate-800 flex flex-col font-sans">
      
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0a1128] to-slate-950 text-white p-7 relative overflow-hidden border-b border-white/5">
        <div className="absolute right-0 top-0 bottom-0 opacity-15 pointer-events-none w-1/3 flex items-center justify-center">
          <Target className="w-80 h-80 text-emerald-450 stroke-[0.3] animate-pulse" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-7xl mx-auto w-full relative z-10">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-black px-3 py-1 bg-emerald-500/10 text-emerald-350 border border-emerald-500/20 rounded-lg tracking-wider uppercase inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-emerald-400" />
              {lang === 'en' ? 'BOARDROOM STRATEGIC COMMAND CENTRAL' : '董事会高维度低碳决策控制台'}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display">
              {lang === 'en' ? 'What Should We Do Next? / 下一步做什么？' : '下一步做什么？ / What Should We Do Next?'}
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
              {lang === 'en'
                ? 'Answers three simple questions: How are we doing? Where are the risks? What should we do next?'
                : '直观解答三个核心问题：我们做得怎么样？哪里有潜在风险？下一步该怎么调整？'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto bg-slate-900/60 p-1.5 border border-white/5 rounded-2xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'Foresight View' : '前瞻决策沙盘'}
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'strategy' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'One-Page Blueprint' : '一页战略总览'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        
        {activeTab === 'all' ? (
          <>
            {/* 1. COMPANY OVERVIEW - FOUR STREAMLINED VISUAL SCORECARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewCards.map((card) => {
                return (
                  <div key={card.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all relative group overflow-hidden">
                    <span className="text-[10px] uppercase font-mono font-black text-slate-400 block tracking-wider mb-2">
                      {lang === 'en' ? card.titleEn : card.titleZh}
                    </span>
                    
                    <div className="flex justify-between items-baseline mb-2">
                      <h2 className="text-3xl font-mono font-black text-slate-900 leading-none">
                        {lang === 'zh' && card.scoreZh ? card.scoreZh : card.score}
                      </h2>
                      <span className="text-[11px] font-mono font-black text-emerald-600 flex items-center">
                        {card.trendEn && card.trendEn.includes('↑') ? (
                          <TrendingUp className="w-3.5 h-3.5 mr-0.5 text-emerald-500" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5 mr-0.5 text-amber-500" />
                        )}
                        {lang === 'en' ? card.trendEn : card.trendZh}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-550 leading-relaxed font-semibold">
                      {lang === 'en' ? card.subTextEn : card.subTextZh}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-50 flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-black uppercase text-center ${
                        card.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        card.color === 'sky' ? 'bg-sky-50 text-sky-700 border border-sky-100' :
                        card.color === 'amber' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}>
                        {lang === 'en' ? card.statusEn : card.statusZh}
                      </span>
                      <span className="text-[7.5px] text-slate-350 font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                        {lang === 'en' ? `Replaces: ${card.oldTerm}` : `对齐术语: ${card.oldTerm}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. KEY BUSINESS METRICS CARD DISPLAY */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-[2.2rem] shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <BarChart2 className="w-4.5 h-4.5 text-indigo-600" />
                  {lang === 'en' ? 'How Are We Doing? / 我们做得怎么样？' : '我们做得怎么样？ / How Are We Doing?'}
                </h3>
                <p className="text-[10px] text-slate-500">
                  {lang === 'en' ? 'Core low-carbon daily habit participation metrics across the enterprise.' : '实时监控全集团自主微习惯养成与低碳参与度表现：'}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {coreMetrics.map((met, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-150 flex flex-col justify-between space-y-2 group hover:bg-slate-100/50 transition-colors">
                    <span className="text-[10.5px] font-bold text-slate-600 block">{lang === 'en' ? met.labelEn : met.labelZh}</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-mono font-black text-slate-950">{met.val}</span>
                      <div className="w-1.5 h-8 bg-slate-200 rounded-full overflow-hidden shrink-0">
                        <div className={`w-full h-full gradient-bg ${met.color} origin-bottom`} style={{ transform: 'scaleY(0.9)' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 & 4. RISKS MATRIX & INVESTMENT RECOMMENDATIONS RANKING */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Risks & Opportunities visual map (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200/80 p-6 rounded-[2.3rem] shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Compass className="w-4.5 h-4.5 text-amber-500 animate-spin" />
                    {lang === 'en' ? 'Where Are the Risks? / 哪里有风险？' : '哪里有风险？ / Where Are the Risks?'}
                  </h3>
                  <p className="text-[10.5px] text-slate-500">
                    {lang === 'en' ? 'Direct map pinpointing active behavior slippages and key potential opportunities.' : '排查运营用电浪费与未完成宣贯习惯的科室，发掘节流增效空间：'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Top Left: High Priority Risks */}
                  <div className="p-4 bg-rose-50/50 rounded-2.5xl border border-rose-100 flex flex-col justify-between min-h-[140px] space-y-2">
                    <span className="text-[10px] font-mono font-black text-rose-800 uppercase flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                      {lang === 'en' ? matrixData.highRisks.titleEn : matrixData.highRisks.titleZh}
                    </span>
                    <ul className="text-[11px] font-bold text-slate-700 space-y-1.5 leading-relaxed list-disc list-inside">
                      {(lang === 'en' ? matrixData.highRisks.itemsEn : matrixData.highRisks.itemsZh).map((item, idx) => (
                        <li key={idx}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Top Right: Growth Opportunities */}
                  <div className="p-4 bg-emerald-50/50 rounded-2.5xl border border-emerald-100 flex flex-col justify-between min-h-[140px] space-y-2">
                    <span className="text-[10px] font-mono font-black text-emerald-850 uppercase flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      {lang === 'en' ? matrixData.growthOpps.titleEn : matrixData.growthOpps.titleZh}
                    </span>
                    <ul className="text-[11px] font-bold text-slate-700 space-y-1.5 leading-relaxed list-disc list-inside">
                      {(lang === 'en' ? matrixData.growthOpps.itemsEn : matrixData.growthOpps.itemsZh).map((item, idx) => (
                        <li key={idx}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Left: Future Opportunities */}
                  <div className="p-4 bg-sky-50/50 rounded-2.5xl border border-sky-100 flex flex-col justify-between min-h-[140px] space-y-2">
                    <span className="text-[10px] font-mono font-black text-sky-850 uppercase flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-sky-600" />
                      {lang === 'en' ? matrixData.futureOpps.titleEn : matrixData.futureOpps.titleZh}
                    </span>
                    <ul className="text-[11px] font-bold text-slate-700 space-y-1.5 leading-relaxed list-disc list-inside">
                      {(lang === 'en' ? matrixData.futureOpps.itemsEn : matrixData.futureOpps.itemsZh).map((item, idx) => (
                        <li key={idx}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Right: Low Priority Issues */}
                  <div className="p-4 bg-slate-50 rounded-2.5xl border border-slate-200 flex flex-col justify-between min-h-[140px] space-y-2">
                    <span className="text-[10px] font-mono font-black text-slate-500 uppercase flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-slate-450" />
                      {lang === 'en' ? matrixData.lowIssues.titleEn : matrixData.lowIssues.titleZh}
                    </span>
                    <ul className="text-[11px] font-bold text-slate-600 space-y-1.5 leading-relaxed list-disc list-inside">
                      {(lang === 'en' ? matrixData.lowIssues.itemsEn : matrixData.lowIssues.itemsZh).map((item, idx) => (
                        <li key={idx}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Investment priority rankings block (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-slate-200/80 p-5 rounded-[2.3rem] shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Award className="w-4.5 h-4.5 text-emerald-600" />
                    {lang === 'en' ? 'What Should We Do First? / 我们先做什么？' : '我们先做什么？ / What Should We Do First?'}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    {lang === 'en' ? 'Smart prioritized paths that yield the highest ESG and behavior ROI.' : '投资哪里能最快产生减碳成效、形成组织习惯，创造最高能碳ROI：'}
                  </p>
                </div>

                <div className="space-y-3.5">
                  {investmentRankings.map((item, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between items-center font-bold text-slate-900">
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 bg-slate-100 text-slate-600 rounded-lg text-[9.5px] font-mono font-black flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <span className="text-[11.5px] font-extrabold">{lang === 'en' ? item.labelEn : item.labelZh}</span>
                        </span>
                        <span className="font-mono text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                          {lang === 'en' ? item.roiEn : item.roiZh} (Score: {item.score})
                        </span>
                      </div>

                      {/* Bar visualization */}
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${item.color}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <span className="text-[9px] font-mono text-slate-400 block text-right">
                  * Generated dynamically by double-materiality weightings
                </span>
              </div>
            </div>

            {/* 5. ROADMAP ("WHAT'S NEXT?") SECTION */}
            <div className="bg-white border border-slate-205 p-6 rounded-[2.2rem] shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Layers className="w-4.5 h-4.5 text-indigo-650" />
                    {lang === 'en' ? "What's Next? / 下一步做什么？" : "下一步做什么？ / What's Next?"}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    {lang === 'en' ? 'Three-phase roadmap scaled from quick wins to continuous autonomous cultural loops.' : '分阶铺排：低度试点成效落地、数据流自动挂接与能碳自决智慧循环生态：'}
                  </p>
                </div>
                <span className="text-[8px] font-mono bg-indigo-50 border border-indigo-150 px-2 py-0.5 text-indigo-700 font-extrabold rounded-lg">
                  TIMELINE BLUEPRINT
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
                {/* Horizontal dotted connector arrow line */}
                <div className="hidden lg:block absolute top-[40px] left-10 right-10 h-0.5 border-t border-dashed border-slate-350 z-0" />

                {/* Phase 1 */}
                <div className="p-4 bg-slate-50 rounded-2.5xl space-y-3 border border-slate-150 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.8 bg-rose-50 text-rose-700 border border-rose-150 text-[9px] font-mono font-bold rounded-lg uppercase">
                      Phase 1 • Quick Wins (1-3M)
                    </span>
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{lang === 'en' ? 'Quick Wins / 快速见效' : '一期：敏捷提效与低度试点'}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                      {lang === 'en' ? 'Immediate high impact action targeting direct cost savings.' : '首轮试点，极速解决用电/打卡空载消耗，拉升组织低碳信心。'}
                    </p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/55 text-xs text-slate-800 font-bold">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{lang === 'en' ? 'AI Green Training gamification' : 'AI 智能绿色环保趣味挑战系统'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-605 shrink-0" />
                      <span>{lang === 'en' ? 'AI Smart idle Reminder System' : '工位设备AI多点智能熄屏告知'}</span>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="p-4 bg-slate-50 rounded-2.5xl space-y-3 border border-slate-150 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.8 bg-amber-50 text-amber-700 border border-amber-150 text-[9px] font-mono font-bold rounded-lg uppercase">
                      Phase 2 • Improve (3-6M)
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{lang === 'en' ? 'Improve Processes / 流程优化' : '二期：系统融合与硬指标整合'}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                      {lang === 'en' ? 'Systemic optimization interfacing tools into business workflows.' : '与OA报销及人事薪酬中枢打通，全电子账册免票据流程自循环。'}
                    </p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/55 text-xs text-slate-800 font-bold">
                    <div className="flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-indigo-600 shrink-0 fill-indigo-600/10" />
                      <span>{lang === 'en' ? 'AI ESG automated report compilation' : '范畴三去纸化零墨迹自动归档审计'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-indigo-600 shrink-0 fill-indigo-600/10" />
                      <span>{lang === 'en' ? 'AI Recruitment carbon analytics match' : '绿色低碳ESG人才属性画像筛查'}</span>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="p-4 bg-slate-50 rounded-2.5xl space-y-3 border border-slate-150 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.8 bg-blue-50 text-blue-700 border border-blue-150 text-[9px] font-mono font-bold rounded-lg uppercase">
                      Phase 3 • Future (6-12M)
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{lang === 'en' ? 'Future Growth / 未来发展' : '三期：长线自决与高附加赋能'}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                      {lang === 'en' ? 'Establishing autonomous sustainability feedback ecosystems.' : '跨多APIs自动对齐，将低碳勋章积分对接物理防沙林的实质认领。'}
                    </p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/55 text-xs text-slate-800 font-bold">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      <span>{lang === 'en' ? 'AI Autonomous Sustainability Intelligence' : '能碳长周期波动预测沙盘'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      <span>{lang === 'en' ? 'AI Green Culture deep learning analytics' : '多中心亲环境文化主动性深度感知'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 & 7. ACTIONABLE FUTURE IMPACT SIMULATOR & SINGLE RECOMMENDATION BOX */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Future Impact Simulator Play Sandbox (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200/80 p-5 rounded-[2.2rem] shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Activity className="w-4.5 h-4.5 text-indigo-650 animate-pulse" />
                    {lang === 'en' ? "What is the Future Impact? / 未来影响如何？" : "未来影响如何？ / What is the Future Impact?"}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    {lang === 'en' ? 'Drag sliders to estimate voluntary retention gains and workload reductions.' : '管理试推演：拖拽下方滑块，实时算定低碳习惯粘性对全组织及审计事务的节流拉动力：'}
                  </p>
                </div>

                <div className="space-y-4 p-4 bg-slate-50 rounded-2xl border border-slate-150">
                  {/* Slider A: Employee Participation */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                      <span>{lang === 'en' ? 'If employee participation increases' : '假设全员参与度进一步增量提升'}</span>
                      <span className="font-mono text-indigo-700 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded-lg">+{participationIncrease}%</span>
                    </div>
                    <input 
                      type="range"
                      min="5"
                      max="40"
                      value={participationIncrease}
                      onChange={(e) => setParticipationIncrease(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Slider B: AI Tools Adoption */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                      <span>{lang === 'en' ? 'If AI auto-nudges tools adoption expands' : '假设 AI 无感硬件、微信APIs等探针覆盖率提升'}</span>
                      <span className="font-mono text-indigo-700 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded-lg">+{aiAdoption}%</span>
                    </div>
                    <input 
                      type="range"
                      min="10"
                      max="80"
                      value={aiAdoption}
                      onChange={(e) => setAiAdoption(Number(e.target.value))}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Outputs Display (Visual grid, short and plain outcome statements) */}
                <div className="grid grid-cols-3 gap-3.5 text-center">
                  <div className="p-3 bg-emerald-50/40 border border-emerald-100 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono font-black text-emerald-800 uppercase leading-none block">GREEN PERFORMANCE</span>
                    <span className="text-xl font-mono font-black text-slate-900">↑ {simulatedImpact.greenPerf}%</span>
                    <span className="text-[10px] text-slate-500 block leading-none">{lang === 'en' ? 'Eco-Active' : '绿色表现稳固'}</span>
                  </div>
                  <div className="p-3 bg-sky-50/40 border border-sky-100 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono font-black text-sky-800 uppercase leading-none block">GOAL PROGRESS</span>
                    <span className="text-xl font-mono font-black text-slate-900">↑ {simulatedImpact.goalProgress}%</span>
                    <span className="text-[10px] text-slate-500 block leading-none">{lang === 'en' ? 'On Schedule' : '目标进展提前'}</span>
                  </div>
                  <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-xl space-y-1">
                    <span className="text-[9px] font-mono font-black text-indigo-800 uppercase leading-none block">ADMIN SAVINGS</span>
                    <span className="text-xl font-mono font-black text-slate-900">↓ {simulatedImpact.adminReduction}%</span>
                    <span className="text-[10px] text-slate-500 block leading-none">{lang === 'en' ? 'Manual Work Saved' : '减少事务性工时'}</span>
                  </div>
                </div>
              </div>

              {/* Single targeted Boardroom Next Action recommendation (5 cols) */}
              <div className="lg:col-span-12 xl:col-span-5 bg-gradient-to-br from-[#0c1020] via-[#1a233d] to-slate-950 text-white p-6 rounded-[2.3rem] shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 opacity-[0.04] pointer-events-none w-1/2 flex items-center justify-center">
                  <Lightbulb className="w-64 h-64 text-indigo-400 stroke-[0.3]" />
                </div>

                <div className="space-y-1.5 relative z-10">
                  <span className="text-[9px] font-mono font-black px-2.5 py-0.5 bg-emerald-500/10 text-emerald-350 border border-emerald-500/25 rounded-md uppercase tracking-wider block w-fit">
                    ⚡ {lang === 'en' ? 'TARGETED STRATEGIC INTERVENTION' : '当前重点纠偏战略决策意见'}
                  </span>
                  <h4 className="text-sm font-mono font-black tracking-wider text-[#93c5fd] mt-1 uppercase">
                    {lang === 'en' ? 'Next Action / 下一步行动' : '下一步行动 / Next Action'}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {lang === 'en' ? 'Review single actionable target matching immediate ROI.' : '直切要害：去伪存真，一击必中解决局部分部用能空耗问题：'}
                  </p>
                </div>

                <div className="p-4 bg-white/[0.04] rounded-2.5xl border border-white/10 space-y-2 relative z-10">
                  <p className="text-xs font-extrabold text-white leading-relaxed">
                    🗣️ {lang === 'en' ? activeRecommendation.titleEn : activeRecommendation.titleZh}
                  </p>
                  <p className="text-[11px] text-slate-350 leading-relaxed italic">
                    {lang === 'en' ? activeRecommendation.reasonEn : activeRecommendation.reasonZh}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2 relative z-10 border-t border-white/5">
                  <span className="text-[9.5px] font-mono text-slate-400">Compliance alignment verified by AI</span>
                  <button
                    onClick={handleApplyStrategicRecommendation}
                    className="p-3 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl tracking-wider cursor-pointer shadow-sm active:scale-[0.98] transition-all"
                  >
                    🚀 {lang === 'en' ? 'Deploy Direct Directive' : '确认批准并一键部署下发'}
                  </button>
                </div>
              </div>

            </div>
          </>
        ) : (
          /* 8. ONE-PAGE STRATEGY SUMMARY - VISUAL FLOW SUITABLE FOR PRESENTATION */
          <motion.div
            key="presentation_view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-[#0b0f19] text-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

            {/* Header branding */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest block">
                  ONE-PAGE COMPACT PRESENTATION DECK
                </span>
                <h3 className="text-lg font-black text-white tracking-tight">
                  {lang === 'en' ? 'Green Single-Page Strategic Blueprint (Board of Directors)' : '一页微习惯能碳战略蓝图（董事会高管汇报页）'}
                </h3>
              </div>
              <span className="text-[9px] font-mono font-black border border-emerald-500/30 px-2.5 py-1 text-emerald-400 bg-emerald-500/5 rounded-xl uppercase">
                CSRD • GRI COMPLIANT STANDARD
              </span>
            </div>

            {/* Visual strategic directional flow block */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {/* Desktop connected horizontal timeline arrows */}
              <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 border-t border-dashed border-white/10 -translate-y-1/2 pointer-events-none z-0" />

              {/* Column 01: Where We Are Now */}
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2.5xl space-y-2.5 flex flex-col justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-white/10 text-emerald-400 font-mono text-[10px] font-black rounded-lg flex items-center justify-center">01</span>
                  <h4 className="text-[11.5px] font-black uppercase text-slate-350">{lang === 'en' ? 'Where We Are Now' : '我们现在在哪'}</h4>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">
                  <span className="text-2xl font-mono font-black text-emerald-450 block">87%</span>
                  <span className="text-[9px] text-slate-400 block tracking-wider uppercase font-mono">{lang === 'en' ? 'Green Performance' : '绿色表现稳固'}</span>
                </div>
              </div>

              {/* Column 02: Key Risks */}
              <div className="p-4 bg-white/[0.02] border border-orange-500/10 rounded-2.5xl space-y-2.5 flex flex-col justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black rounded-lg flex items-center justify-center">02</span>
                  <h4 className="text-[11.5px] font-black uppercase text-slate-350">{lang === 'en' ? 'Key Risks' : '主要存留风险'}</h4>
                </div>
                <div className="bg-orange-500/5 border border-orange-500/15 p-2 rounded-xl text-center">
                  <span className="text-[11px] font-black text-orange-400 block leading-tight">{lang === 'en' ? 'Operations Standby Leak' : '运营设备待机空流'}</span>
                  <span className="text-[9.5px] text-slate-405 block font-mono mt-1">{lang === 'en' ? 'Risk level: MODERATE' : '需重点纠偏关注'}</span>
                </div>
              </div>

              {/* Column 03: Growth Opportunities */}
              <div className="p-4 bg-white/[0.02] border border-sky-400/10 rounded-2.5xl space-y-2.5 flex flex-col justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-sky-450/10 text-sky-400 font-mono text-[10px] font-black rounded-lg flex items-center justify-center">03</span>
                  <h4 className="text-[11.5px] font-black uppercase text-slate-350">{lang === 'en' ? 'Growth Opportunities' : '优先发展机会'}</h4>
                </div>
                <div className="bg-sky-500/5 border border-sky-500/15 p-2 rounded-xl text-center">
                  <span className="text-[11px] font-black text-sky-300 block leading-tight">{lang === 'en' ? 'Smart Telemetry IoT' : 'AI无感控制硬件'}</span>
                  <span className="text-[9.5px] text-slate-400 block font-mono mt-1">{lang === 'en' ? 'Replace paper processes' : '大幅替代琐碎手动'}</span>
                </div>
              </div>

              {/* Column 04: Priority Investments */}
              <div className="p-4 bg-white/[0.02] border border-indigo-500/10 rounded-2.5xl space-y-2.5 flex flex-col justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-indigo-500/10 text-indigo-450 font-mono text-[10px] font-black rounded-lg flex items-center justify-center">04</span>
                  <h4 className="text-[11.5px] font-black uppercase text-slate-350">{lang === 'en' ? 'Priority Investments' : '核心优先投资'}</h4>
                </div>
                <div className="bg-indigo-500/5 border border-indigo-505/15 p-2 rounded-xl text-center">
                  <span className="text-[11px] font-black text-indigo-350 block leading-tight">{lang === 'en' ? 'Gamified Trainer SDK' : '低碳趣味关卡宣示'}</span>
                  <span className="text-[9.5px] text-slate-400 block font-mono mt-1">{lang === 'en' ? 'Highest verified ROI' : '高留存低管理开支'}</span>
                </div>
              </div>

              {/* Column 05: Future Goals */}
              <div className="p-4 bg-white/[0.02] border border-emerald-500/10 rounded-2.5xl space-y-2.5 flex flex-col justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-black rounded-lg flex items-center justify-center">05</span>
                  <h4 className="text-[11.5px] font-black uppercase text-slate-350">{lang === 'en' ? 'Future Goals' : '长线愿瞻节点'}</h4>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/15 p-2 rounded-xl text-center">
                  <span className="text-2xl font-mono font-black text-emerald-450 block">95%+</span>
                  <span className="text-[9px] text-slate-400 block tracking-wider uppercase font-mono">{lang === 'en' ? 'Zero-waste compliance' : '一键自动化无纸核销'}</span>
                </div>
              </div>
            </div>

            {/* Strategic executive footer summary block */}
            <div className="p-4.5 bg-white/5 border border-white/10 rounded-2.5xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed font-bold">
                💡 <span className="text-emerald-400">{lang === 'en' ? 'Executive Sandpan Synthesis Outcome:' : '董事会大屏核销研判：'}</span>
                {lang === 'en'
                  ? 'By aligning daily paperless habits with clear gamified rewards and AI sleep cycles, operations can yield a continuous 14.2% voluntary recruitment departure buffer while securing 100% compliant reporting baselines.'
                  : '通过在运营部门快速下发“AI智慧宣贯”与“空载熄屏控制探针”组合，不仅能秒级扑灭39%的工位设备待机赤字，更可为三季度范畴三核减账册释放至少 1,200kg 实测降碳信用。'}
              </p>

              <button
                onClick={() => {
                  triggerToast(
                    lang === 'en' 
                      ? "Strategic presentation locked and exported successfully!" 
                      : "汇报就绪！大屏截图已导出。您可以将其无缝应用至年报及路演幻灯片中。"
                  );
                }}
                className="px-5 py-2.5 bg-white text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:bg-slate-100 transition-colors shrink-0"
              >
                📥 {lang === 'en' ? 'Export Slide' : '导出多端汇报PPT'}
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* Slide-in Action Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="p-4 bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl font-bold flex items-center gap-2.5 shadow-2xl text-xs max-w-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{toastMessage}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Disclaimer Footer */}
      <footer className="bg-[#0f172a] text-slate-500 px-6 py-4.5 border-t border-slate-800 text-[10px] flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span>© 2026 Green Enterprise Sandpan System</span>
        </div>
        <span className="font-mono text-[9px] text-slate-600">Block height: 7,492,021 • IPFS Ledger active</span>
      </footer>

    </div>
  );
}
