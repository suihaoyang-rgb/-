/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, GraduationCap, Target, Sliders, Check, 
  TrendingUp, AlertTriangle, ChevronRight, Sparkles, Award, Brain
} from 'lucide-react';
import AiOpportunityDiscovery from './AiOpportunityDiscovery';

interface HrSaasManagementProps {
  lang?: 'en' | 'zh';
  stats: {
    currentBalance: number;
    totalCarbonReducedKg: number;
    streakLevel: number;
  };
  teammates: {
    id: string;
    name: string;
    dept: string;
    points: number;
    badges: string[];
    carbonSaved: number;
    streak: number;
    role?: string;
  }[];
  onAddLogEntry?: (msg: string) => void;
}

export default function HrSaasManagement({ lang = 'zh', stats, teammates, onAddLogEntry }: HrSaasManagementProps) {
  // Green HR Segment Navigation State
  const [activeSubTab, setActiveSubTab] = useState<'engagement' | 'ai_discovery'>('engagement');

  // Policy Coefficients State (Custom Incentive Policy)
  const [incentiveMultiplier, setIncentiveMultiplier] = useState<'standard' | 'high_bonus'>('standard');
  const [selectedPolicyType, setSelectedPolicyType] = useState<string>('all');
  const [activePolicyMessage, setActivePolicyMessage] = useState<string | null>(null);

  // Smart Targeting Outliers Data
  const [outliers, setOutliers] = useState([
    {
      id: 'out-1',
      deptEn: 'Finance Shared Services',
      deptZh: '财务共享中心',
      issueEn: 'High physical printing volume (exceeds median by 180%)',
      issueZh: '周均物理复印打印频繁 (超行业中位数 180%)',
      co2LeakEn: '32.4kg extra carbon footprint / week',
      co2LeakZh: '本周溢增排碳约 32.4kg',
      recommendedCourseId: 't-2',
      recommendedCourseEn: 'Paperless B2B Transaction Transformation',
      recommendedCourseZh: '无纸化数字票券：自发签署流',
      targeted: false
    },
    {
      id: 'out-2',
      deptEn: 'Hardware Validation Lab',
      deptZh: '硬件联调测试室',
      issueEn: 'Weekend idle server standby power drain',
      issueZh: '检测到周末机器大宗空置空载耗电',
      co2LeakEn: '440kWh excess standby draw / weekend',
      co2LeakZh: '周末折虚电耗折合 211kg 范畴二排放',
      recommendedCourseId: 't-1',
      recommendedCourseEn: 'Decarbonizing Digital Infrastructure',
      recommendedCourseZh: '物理用电节能与熄屏硬自检',
      targeted: false
    }
  ]);

  // Handle Dispatch of course to outliers (Smart Targeting)
  const handleDeployTargetedCourse = (id: string, deptZh: string, courseZh: string) => {
    setOutliers(outliers.map(o => o.id === id ? { ...o, targeted: true } : o));
    
    const timestamp = new Date().toLocaleTimeString();
    if (onAddLogEntry) {
      onAddLogEntry(`Green HR Directive: Deployed targeted training course "${courseZh}" to ${deptZh}.`);
    }

    setActivePolicyMessage(
      lang === 'en'
        ? `Targeted course deployed! Course notification dispatched directly to division workspace channels.`
        : `精准纠偏成功！已向【${deptZh}】全网广播《${courseZh}》减排必修课，配套 1.5 倍完成积分加速！`
    );

    setTimeout(() => {
      setActivePolicyMessage(null);
    }, 4500);
  };

  // Handle incentive policy change
  const handlePoliciesToggle = (type: 'standard' | 'high_bonus') => {
    setIncentiveMultiplier(type);
    if (onAddLogEntry) {
      onAddLogEntry(`Custom state update: Incentive set to ${type === 'high_bonus' ? '1.5x compensating multiplier' : 'standard 1.0x'}.`);
    }

    setActivePolicyMessage(
      lang === 'en'
        ? `Amo Incentive Policy updated to ${type === 'high_bonus' ? '1.5x compensatory weight' : 'Standard 1x'}.`
        : `低碳激励政策更新：已将重压加班分部的习惯积分兑换上限调整为 【${type === 'high_bonus' ? '1.5倍 负载代偿' : '标准 1.0倍'}】！`
    );

    setTimeout(() => {
      setActivePolicyMessage(null);
    }, 4550);
  };

  // Static index score datasets for representation
  const DEPT_PERFORMANCE = [
    { deptEn: 'R&D', deptZh: '研发与系统工程部', index: 94.2, change: '+2.8%', completion: 93 },
    { deptEn: 'Marketing & Sales', deptZh: '市场营销分部', index: 61.4, change: '-4.6%', completion: 65 },
    { deptEn: 'Finance Shared Services', deptZh: '财务共享大厅', index: 72.8, change: '+1.5%', completion: 74 },
    { deptEn: 'Logistics & Ops', deptZh: '供应链及物流部', index: 81.0, change: '0.0%', completion: 82 }
  ];

  return (
    <div id="hr_portal_compartment" className="bg-slate-50 rounded-[2rem] border border-slate-205 shadow-md overflow-hidden text-slate-800 flex flex-col font-sans">
      
      {/* SECTION 1: Top Strategic HR Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-850 text-white p-5 relative overflow-hidden border-b border-slate-750">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto w-full relative z-10">
          <div className="space-y-1">
            <span className="text-[9.5px] font-mono font-black px-2.5 py-1 bg-sky-500/10 text-sky-300 border border-sky-500/20 rounded-full tracking-wider uppercase">
              👥 Green HR Portal / 绿色人力资源中枢
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white font-display">
              {lang === 'en' ? 'Green HR / Employee Habit Center' : '绿色人力资源 / 员工习惯管理中心'}
            </h1>
            <p className="text-xs text-slate-355 max-w-3xl leading-relaxed">
              {lang === 'en'
                ? 'Manage active low-carbon courses, deploy double score incentives, and monitor team habit indicators in one touch.'
                : '低碳活跃度中枢：在此部署绿色微课堂，一键将低碳积分与福利、年假挂钩，并使用双倍补偿补贴激活员工习惯。'}
            </p>
          </div>

          <div className="px-4.5 py-2.5 bg-slate-950/60 rounded-2xl border border-white/5 flex gap-4 shrink-0 text-white self-start md:self-auto font-mono">
            <div>
              <span className="block text-[8px] text-sky-400 font-extrabold uppercase tracking-widest">{lang === 'en' ? 'POOL BALANCE' : '碳林总积蓄'}</span>
              <span className="text-md font-black">{stats.currentBalance} GP</span>
            </div>
            <div>
              <span className="block text-[8px] text-[#2dd4bf] font-extrabold uppercase tracking-widest">{lang === 'en' ? 'TOTAL REDUCTION' : '实物避碳量'}</span>
              <span className="text-md font-black">{stats.totalCarbonReducedKg.toFixed(1)}kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Master Indicators Box (One Screen focus) */}
      <div className="bg-white border-b border-slate-200/80 px-6 py-4.5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="space-y-1">
            <span className="text-[9.5px] uppercase font-mono font-extrabold text-slate-400 block tracking-wider">
              {lang === 'en' ? 'Team Sustainability Index (Average)' : '集团全员习惯活跃指数 (GBSS)'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-black text-slate-900">82.3 / 100</span>
              <span className="text-xs text-emerald-600 font-bold font-mono">+1.8%</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none">
              {lang === 'en' ? 'Target: 85.0% by end of Q3' : 'Q3季度基准线设定: 稳步向 85% 冲刺'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9.5px] uppercase font-mono font-extrabold text-slate-400 block tracking-wider">
              {lang === 'en' ? 'Training Completion Rate' : '习惯学堂必修课完备度'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-black text-slate-900">82.5%</span>
              <span className="text-xs text-blue-600 font-bold font-mono">Led by R&D</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none">
              {lang === 'en' ? '92% completion target' : '研发部 93% 领跑全网；财务部稍慢待纠偏'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9.5px] uppercase font-mono font-extrabold text-slate-400 block tracking-wider">
              {lang === 'en' ? 'Active Welfare Claims' : '集团低碳积分换兑率'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-black text-slate-900">92.4%</span>
              <span className="text-xs text-sky-600 font-bold font-mono">High Loyalty</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none">
              {lang === 'en' ? 'Amo carbon seeds matched' : '大部分积分已在福利店成功换免福利'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9.5px] uppercase font-mono font-extrabold text-slate-400 block tracking-wider">
              {lang === 'en' ? 'Incentive Multiplier Level' : '当前负载代偿加成系数'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-black text-[#f97316]">
                {incentiveMultiplier === 'high_bonus' ? '1.5x Compensate' : '1.0x Standard'}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none">
              {lang === 'en' ? 'Adaptive stress buffer active' : '根据各科室交付节奏动态加成'}
            </p>
          </div>

        </div>
      </div>

      {/* SECTION 2.5: Green HR Navigation Sub-Tabs */}
      <div id="ghrm_subtabs_navigator" className="bg-slate-100 border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">
            {lang === 'en' ? 'GREEN HR AREAS / 绿色管理' : '绿色人力管理模块'}
          </span>
        </div>

        <div className="flex gap-2 bg-slate-205 p-1 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveSubTab('engagement')}
            className={`px-4 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'engagement'
                ? 'bg-white text-slate-900 shadow-sm font-black'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/35'
            }`}
          >
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span>{lang === 'en' ? 'Engagement & Incentives' : '全员绿色活跃与激励'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('ai_discovery')}
            className={`px-4 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'ai_discovery'
                ? 'bg-indigo-950 text-white shadow-sm font-black'
                : 'text-slate-500 hover:text-indigo-950 hover:bg-white/35'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-indigo-505 shrink-0" />
            <span>{lang === 'en' ? 'AI Opportunity Discovery' : 'AI 机会识别诊断'}</span>
            <span className="bg-indigo-105/20 text-[#4f46e5] text-[7.5px] font-mono px-1 rounded uppercase tracking-wider scale-90">Workshop</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'engagement' ? (
        /* SECTION 3: Main Layout Gird */
        <div className="p-6 bg-slate-50 flex-grow max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Team Index / Training Completion Rate (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Card A: Team Sustainability Index */}
            <div className="bg-white border border-slate-205 p-5 rounded-[2rem] shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Users className="w-4.5 h-4.5 text-sky-600" />
                  {lang === 'en' ? 'Team Sustainability Index & engagement' : '跨部门低碳习惯活跃指数评星榜 (GBSS / Index)'}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">
                  {lang === 'en' 
                    ? 'Green index evaluates active participation, printing reduction, and device monitor shutoff discipline per team.'
                    : '人本核算：评估部门在通勤避碳、双面去纸、熄屏降耗自发坚持程度所得出的综合低碳学分。'}
                </p>
              </div>

              {/* Department Index grid sheet */}
              <div className="space-y-3.5">
                {DEPT_PERFORMANCE.map((item) => (
                  <div key={item.deptEn} className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between text-[11px] font-bold">
                    <div className="space-y-0.5">
                      <span className="text-slate-805 text-xs block">{lang === 'en' ? item.deptEn : item.deptZh}</span>
                      <span className="text-[9.5px] text-slate-400 uppercase font-mono">Training Rate: {item.completion}% completed</span>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="block text-slate-900 text-xs font-mono">{item.index} / 100</span>
                        <span className={`text-[8.5px] font-mono leading-none font-black ${item.change.startsWith('+') ? 'text-emerald-600' : item.change.startsWith('-') ? 'text-rose-500' : 'text-slate-400'}`}>
                          {item.change}
                        </span>
                      </div>
                      
                      {/* Tiny Progress visual bar */}
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.index > 80 ? 'bg-emerald-500' : item.index > 70 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${item.index}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Card B: Training Participation Rate */}
            <div className="bg-white border border-slate-205 p-5 rounded-[2rem] shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <GraduationCap className="w-5 h-5 text-sky-600" />
                  {lang === 'en' ? 'Green Training Curricula Course Participation Rate' : '低碳行动微课程学习完备率与选课状态'}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">
                  {lang === 'en' 
                    ? 'Completing low-carbon courses unlocks points bonus in the employee welfare incentives catalog.'
                    : '行为学堂：习惯学堂完备度直接对位着后续低碳微习惯的能碳学分兑换资格。'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { titleZh: "云原生能效：减免闲置电力", titleEn: "Decarbonizing Digital hosting", rate: 88, dept: "Engineering / R&D" },
                  { titleZh: "无纸无干贴签：契合低碳流程", titleEn: "Paperless B2B transaction flows", rate: 72, dept: "Finance / Sales / HR" }
                ].map((course, idx) => (
                  <div key={idx} className="p-3 bg-sky-500/[0.02] border border-sky-100 rounded-2xl flex flex-col justify-between h-[105px]">
                    <div>
                      <span className="text-[8.5px] font-mono text-[#0284c7] font-black uppercase tracking-wider block">Course {idx + 1} • {course.dept}</span>
                      <span className="text-xs font-extrabold text-[#0369a1] block mt-1 leading-tight">{lang === 'en' ? course.titleEn : course.titleZh}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] font-mono text-slate-450 font-bold">
                        <span>COMPLETED ENROLLMENTS:</span>
                        <span>{course.rate}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                        <div className="bg-[#0284c7] h-full rounded-full" style={{ width: `${course.rate}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Smart Recommendations & Custom Incentive Policy (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card C: Smart Targeting Recommendations */}
            <div className="bg-white border border-slate-205 p-5 rounded-[2rem] shadow-xs space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Target className="w-4.5 h-4.5 text-sky-600 animate-pulse" />
                    {lang === 'en' ? 'Smart Targeting Recommendations' : 'AI 习惯审计与部门减排精准纠偏推荐'}
                  </h3>
                  <span className="text-[8px] font-mono font-black uppercase text-amber-500 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded leading-none">
                    AI ORACLE
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  {lang === 'en' ? 'AI tracks outliers in standby electricity and copy paper. Push courses and alerts to resolve.' : '前沿诊断：AI 检测各分部在周末大宗服务器空泄 or 物理纸耗异常，可定向派发微倡导。'}
                </p>
              </div>

              {/* Smart Targeting List */}
              <div className="space-y-2.5">
                {outliers.map((o) => (
                  <div key={o.id} className="p-3 bg-amber-500/[0.02] border border-amber-100 rounded-xl flex flex-col justify-between space-y-2.5">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9.5px]">
                        <span className="font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-lg font-mono">⚠️ OUTLIER: {lang === 'en' ? o.deptEn : o.deptZh}</span>
                        <span className="font-mono text-slate-400 uppercase text-[8px]">ID: {o.id}</span>
                      </div>
                      <p className="text-xs text-slate-800 font-extrabold">{lang === 'en' ? o.issueEn : o.issueZh}</p>
                      <p className="text-[10px] text-rose-600 font-bold">☠️ {lang === 'en' ? o.co2LeakEn : o.co2LeakZh}</p>
                    </div>

                    <div className="flex gap-2 items-center pt-1 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 font-medium truncate flex-1 block">
                        👉 {lang === 'en' ? 'Course: ' : '关联微课程：'}{lang === 'en' ? o.recommendedCourseEn : o.recommendedCourseZh}
                      </span>
                      
                      <button
                        type="button"
                        disabled={o.targeted}
                        onClick={() => handleDeployTargetedCourse(o.id, o.deptZh, o.recommendedCourseZh)}
                        className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                          o.targeted 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                            : 'bg-sky-600 text-white hover:bg-sky-500'
                        }`}
                      >
                        {o.targeted ? (
                          <span className="flex items-center gap-0.5">✓ {lang === 'en' ? 'Targeted' : '已纠偏'}</span>
                        ) : (
                          <span>🎯 {lang === 'en' ? 'Deploy' : '定向投课'}</span>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Card D: Custom Incentive Policy Setup */}
            <div className="bg-white border border-slate-205 p-5 rounded-[2rem] shadow-xs space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Sliders className="w-4.5 h-4.5 text-sky-600" />
                  {lang === 'en' ? 'Custom Incentive Policy Coefficients' : '日常低碳福利系数与负载调节'}
                </h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  {lang === 'en' 
                    ? 'Flexibly configure incentive budgets during overtime blocks. Set double multiplier compensation points to avoid worker weariness.'
                    : '柔性调和：业务线高压期，强力要求纸张打卡往往引发反面拉鋸。在此一键开启“能碳赔偿折消系数”，系统将静调并向员工派赠 1.5 倍赔偿性绿林奖励。'}
                </p>
              </div>

              {/* Custom Policy Multipliers Form */}
              <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl space-y-3 font-bold text-xs my-2">
                <span className="text-[9.5px] text-slate-400 block uppercase font-mono tracking-wider">
                  {lang === 'en' ? 'Incentive Multiplier Level / 政策兑现等级' : '负载补偿倍率调节'}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handlePoliciesToggle('standard')}
                    className={`p-2 rounded-xl text-center border font-bold text-xs cursor-pointer transition-all ${
                      incentiveMultiplier === 'standard' 
                        ? 'bg-sky-50 border-sky-505 text-sky-850' 
                        : 'bg-slate-900 text-slate-400 border-transparent hover:bg-slate-800'
                    }`}
                  >
                    <span className="block text-md mb-0.5">🌱</span>
                    <span className="text-[10px]">{lang === 'en' ? '1.0x Standard' : '1.0x 基准常态'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePoliciesToggle('high_bonus')}
                    className={`p-2 rounded-xl text-center border font-bold text-xs cursor-pointer transition-all ${
                      incentiveMultiplier === 'high_bonus' 
                        ? 'bg-rose-50 border-rose-500 text-rose-950 font-black' 
                        : 'bg-slate-900 text-slate-400 border-transparent hover:bg-slate-800'
                    }`}
                  >
                    <span className="block text-md mb-0.5">🔥</span>
                    <span className="text-[10px]">{lang === 'en' ? '1.5x Overtime Buffer' : '1.5x 加班冲刺负载'}</span>
                  </button>
                </div>

                <div className="p-2.5 bg-sky-950/5 rounded-xl border border-sky-100 text-[10px] text-slate-500 leading-normal">
                  💡 <span className="font-extrabold text-sky-905">AI Simulator Projection:</span> {
                    incentiveMultiplier === 'high_bonus'
                      ? (lang === 'en' ? "Simulated: Increases Q2 active task retention by +18.4% and decreases employee friction by 24%." : "仿真研判：下周将提升高压团队的亲环境行为稳定性约 18.4％，组织摩擦感削减 24％。")
                      : (lang === 'en' ? "Simulated: Baseline engagement is steady but local stress division standby decay will remain." : "仿真研判：维持日常基准。重压分部（如市场部）因精力不足导致的离岗电脑忘记熄屏幕漏电反弹率预计将攀升至 39％。")
                  }
                </div>
              </div>

              {/* Micro Global Policy Feedback Dialog */}
              <AnimatePresence>
                {activePolicyMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-sky-950 text-sky-200 border border-sky-800 rounded-xl text-[10.5px] leading-normal font-semibold text-center shadow-lg relative flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
                    <span>{activePolicyMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      ) : (
        /* SECTION 3B: AI Opportunity Discovery Workshop Section */
        <div id="ai_discovery_section" className="p-6 bg-slate-50 flex-grow max-w-7xl mx-auto w-full">
          <AiOpportunityDiscovery lang={lang} />
        </div>
      )}

      {/* SECTION 4: Disclaimer */}
      <footer className="bg-slate-900 text-slate-400 p-4 border-t border-slate-800 text-[10px] leading-relaxed relative flex justify-between items-center">
        <span>© 2026 Green HR Enterprise Suite</span>
        <span className="font-mono text-[9px] text-slate-500">Authorized personnel only</span>
      </footer>

    </div>
  );
}
