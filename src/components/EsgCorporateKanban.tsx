/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Activity, Award, CheckCircle2, ChevronRight, 
  Sparkles, ShieldAlert, Layers, RefreshCw, FileCheck, Sliders,
  Check, X, AlertTriangle, TrendingUp, TrendingDown, Info,
  Building2, Users, FileText, CheckSquare, ListTodo, AlertOctagon, HelpCircle
} from 'lucide-react';

interface EsgCorporateKanbanProps {
  lang?: 'en' | 'zh';
}

export default function EsgCorporateKanban({ lang = 'zh' }: EsgCorporateKanbanProps) {
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [activeDeptDetail, setActiveDeptDetail] = useState<string | null>(null);
  const [selectedAlertIdx, setSelectedAlertIdx] = useState<number>(0);
  const [isSignOffLocked, setIsSignOffLocked] = useState<boolean>(false);

  // Compliance Checklist Items (Interactive toggles)
  const [checklist, setChecklist] = useState([
    { id: 'training', textEn: 'Employee Training Completed', textZh: '员工绿色培训完成率达标', checked: true },
    { id: 'records', textEn: 'ESG Records Updated', textZh: '能能碳数据记录完成更新', checked: true },
    { id: 'policy', textEn: 'Policy Acknowledgement Completed', textZh: '低碳习惯大楼规范宣签', checked: false },
    { id: 'reports', textEn: 'Required Reports Submitted', textZh: '周度外部碳指标分析报送', checked: true },
  ]);

  // Handle Checklist Item clicking
  const toggleChecklistItem = (id: string) => {
    if (isSignOffLocked) {
      setActiveToast(
        lang === 'en' 
          ? "Workspace locked! Unlock to modify checklist metrics." 
          : "账册已锁定并哈希封存，无法修改检查板状态。 "
      );
      setTimeout(() => setActiveToast(null), 3000);
      return;
    }
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  // Helper calculating real-time Compliance Score based on checklist counts
  const dynamicComplianceScore = useMemo(() => {
    const checkedCount = checklist.filter(c => c.checked).length;
    const baseScore = 65; // Minimum base
    const rewardPerCheck = 8.25; // Variable reward
    return Math.min(100, Math.round(baseScore + checkedCount * rewardPerCheck));
  }, [checklist]);

  // Simplified Terminology Legend (For transparent UI presentation mapping)
  const simplifiedTerms = [
    { old: 'ESG Governance Stability', newEn: 'Management Health', newZh: '管理健康度' },
    { old: 'Compliance Maturity', newEn: 'Compliance Score', newZh: '合规得分' },
    { old: 'Sustainability Risk Assessment', newEn: 'Risk Level', newZh: '风险等级' },
    { old: 'Disclosure Readiness', newEn: 'Report Readiness', newZh: '报告准备度' },
    { old: 'Organizational Sustainability Performance', newEn: 'Green Performance', newZh: '绿色表现' },
    { old: 'Governance Deficiencies', newEn: 'Areas Needing Attention', newZh: '需要关注的问题' }
  ];

  // 1. Compliance Scorecards Data
  const scorecards = useMemo(() => {
    return [
      {
        id: 'compliance-score',
        titleEn: 'Compliance Score',
        titleZh: '合规得分',
        value: `${dynamicComplianceScore}%`,
        statusEn: dynamicComplianceScore >= 90 ? '✓ Good' : '⚠ Caution',
        statusZh: dynamicComplianceScore >= 90 ? '✓ 优秀' : '⚠ 需关注',
        trendEn: '↑ Improving',
        trendZh: '↑ 提升中',
        trendIsUp: true,
        bgColor: 'bg-emerald-50/50 border-emerald-100',
        textColor: 'text-emerald-700',
        icon: ShieldCheck,
        oldTerm: 'Compliance Maturity'
      },
      {
        id: 'risk-level',
        titleEn: 'Risk Level',
        titleZh: '风险等级',
        value: dynamicComplianceScore >= 90 ? 'Low' : 'Medium',
        valueZh: dynamicComplianceScore >= 90 ? '低风险' : '中等风险',
        statusEn: dynamicComplianceScore >= 90 ? '✓ Healthy' : '⚠ Attention Needed',
        statusZh: dynamicComplianceScore >= 90 ? '✓ 健康' : '⚠ 立即排查',
        trendEn: '↓ Declining',
        trendZh: '↓ 正在改善',
        trendIsUp: false,
        bgColor: 'bg-red-50/40 border-red-100',
        textColor: 'text-red-700',
        icon: ShieldAlert,
        oldTerm: 'Sustainability Risk Assessment'
      },
      {
        id: 'data-completion',
        titleEn: 'Data Completion',
        titleZh: '数据完整率',
        value: '88%',
        statusEn: '✓ Reliable',
        statusZh: '✓ 数据齐全',
        trendEn: '→ Stable',
        trendZh: '→ 运算稳定',
        trendIsUp: true,
        bgColor: 'bg-sky-50/40 border-sky-100',
        textColor: 'text-sky-700',
        icon: Activity,
        oldTerm: 'Disclosure Readiness'
      },
      {
        id: 'audit-readiness',
        titleEn: 'Audit Readiness',
        titleZh: '报告准备度',
        value: '90%',
        statusEn: '✓ Prepared',
        statusZh: '✓ 审计就绪',
        trendEn: '↑ Ready',
        trendZh: '↑ 随时过审',
        trendIsUp: true,
        bgColor: 'bg-indigo-50/45 border-indigo-100',
        textColor: 'text-indigo-700',
        icon: FileCheck,
        oldTerm: 'Disclosure Readiness'
      }
    ];
  }, [dynamicComplianceScore]);

  // 2. Risk Heatmap Matrix Data (Comparing Departments)
  const heatmapData = [
    {
      id: 'ops',
      deptEn: 'Operations',
      deptZh: '运营部',
      risk: { labelEn: 'High Risk', labelZh: '高风险', color: 'bg-rose-500 text-white' },
      dataQuality: { labelEn: 'Poor', labelZh: '残缺', color: 'bg-rose-500 text-white' },
      policyCompliance: { labelEn: 'Attention', labelZh: '待补强', color: 'bg-amber-400 text-slate-900' },
      participation: { labelEn: 'Unstable', labelZh: '脆弱', color: 'bg-rose-500 text-white' },
      descEn: 'Missing active logs and training gaps.',
      descZh: '数据底账缺失，环保宣签率偏低。'
    },
    {
      id: 'sales',
      deptEn: 'Sales',
      deptZh: '销售部',
      risk: { labelEn: 'Normal', labelZh: '中等', color: 'bg-amber-400 text-slate-900' },
      dataQuality: { labelEn: 'Attention', labelZh: '待干预', color: 'bg-amber-400 text-slate-900' },
      policyCompliance: { labelEn: 'Healthy', labelZh: '合规', color: 'bg-emerald-500 text-white' },
      participation: { labelEn: 'Healthy', labelZh: '良好', color: 'bg-emerald-500 text-white' },
      descEn: 'Moderate travel logging delays.',
      descZh: '出行申报存在周度延迟。'
    },
    {
      id: 'marketing',
      deptEn: 'Marketing',
      deptZh: '市场部',
      risk: { labelEn: 'Normal', labelZh: '中等', color: 'bg-amber-400 text-slate-900' },
      dataQuality: { labelEn: 'Healthy', labelZh: '健康', color: 'bg-emerald-500 text-white' },
      policyCompliance: { labelEn: 'Healthy', labelZh: '合规', color: 'bg-emerald-500 text-white' },
      participation: { labelEn: 'Attention', labelZh: '流失风险', color: 'bg-amber-400 text-slate-900' },
      descEn: 'Minor participation drops.',
      descZh: '部分员工低碳打卡存在疲劳期。'
    },
    {
      id: 'hr',
      deptEn: 'HR',
      deptZh: '人力资源部',
      risk: { labelEn: 'Healthy', labelZh: '健康', color: 'bg-emerald-500 text-white' },
      dataQuality: { labelEn: 'Healthy', labelZh: '充沛', color: 'bg-emerald-500 text-white' },
      policyCompliance: { labelEn: 'Healthy', labelZh: '合规', color: 'bg-emerald-500 text-white' },
      participation: { labelEn: 'Excellent', labelZh: '极活跃', color: 'bg-emerald-500 text-white' },
      descEn: 'Excellent onboarding integration.',
      descZh: '迎新增效与绿色培训率居榜首。'
    },
    {
      id: 'finance',
      deptEn: 'Finance',
      deptZh: '财务部',
      risk: { labelEn: 'Healthy', labelZh: '安全', color: 'bg-emerald-500 text-white' },
      dataQuality: { labelEn: 'Perfect', labelZh: '完美', color: 'bg-emerald-500 text-white' },
      policyCompliance: { labelEn: 'Healthy', labelZh: '合规', color: 'bg-emerald-500 text-white' },
      participation: { labelEn: 'Healthy', labelZh: '稳定', color: 'bg-emerald-500 text-white' },
      descEn: '100% paperless audit synchronization.',
      descZh: '无纸化签批报载数据高度一致。'
    }
  ];

  // 3. Departments Risk Ranking (Progress-based mapping chart)
  const departmentRankings = [
    { id: 'ops', nameEn: 'Operations', nameZh: '运营部', riskLevel: 'High Risk', riskZh: '高风险', riskPct: 88, colorClass: 'bg-rose-500' },
    { id: 'sales', nameEn: 'Sales', nameZh: '销售部', riskLevel: 'Medium Risk', riskZh: '中等风险', riskPct: 56, colorClass: 'bg-amber-405' },
    { id: 'marketing', nameEn: 'Marketing', nameZh: '市场部', riskLevel: 'Medium Risk', riskZh: '中等风险', riskPct: 42, colorClass: 'bg-amber-405' },
    { id: 'hr', nameEn: 'HR', nameZh: '人力资源部', riskLevel: 'Low Risk', riskZh: '低风险', riskPct: 15, colorClass: 'bg-emerald-500' },
    { id: 'finance', nameEn: 'Finance', nameZh: '财务部', riskLevel: 'Low Risk', riskZh: '低风险', riskPct: 8, colorClass: 'bg-emerald-500' },
  ];

  // 4. Audit Readiness Progress Indicators
  const auditProgressMetrics = [
    { labelEn: 'Documentation', labelZh: '合规证明文件归档', pct: 85 },
    { labelEn: 'Training Records', labelZh: '绿色技能培训账册', pct: 92 },
    { labelEn: 'Participation Records', labelZh: '全员习惯行为打卡存证', pct: 88 },
    { labelEn: 'Policy Compliance', labelZh: '政策一致性审计率', pct: 95 },
    { labelEn: 'Overall Audit Readiness', labelZh: '综合报告准备就绪度', pct: 90 },
  ];

  // 5. Active Compliance Alerts
  const activeAlerts = [
    {
      id: 'alert-ops-missing',
      textEn: '⚠ Missing ESG data from Operations',
      textZh: '⚠ 运营部门未提交周度碳轨迹与纸张耗用数据'
    },
    {
      id: 'alert-training-low',
      textEn: '⚠ Training completion below target and thresholds',
      textZh: '⚠ 运营部门与销售团队宣签培训率低于合规红线'
    },
    {
      id: 'alert-participation-drop',
      textEn: '⚠ Employee low-carbon participation is declining',
      textZh: '⚠ 局部员工无纸化行为参与惯性呈微幅回踩趋势'
    }
  ];

  // 6. Action Recommendations List
  const recommendations = [
    {
      actionEn: "Employee sustainability training completion is declining in Operations. Consider launching a targeted training campaign next month.",
      actionZh: "运营部门的员工绿色培训完成率正在下降。建议下个月精准启动对口的低碳意识培训挑战活动。"
    },
    {
      actionEn: "Data gaps identified in Operations workflow bounds. Connect intelligent automatic NFC/printer counter APIs immediately.",
      actionZh: "检测到运营部门部分能耗底账缺失。建议即时配置地铁通勤刷卡与打印APIs数据流自动化对接。"
    },
    {
      actionEn: "Policy acknowledgements show incomplete warning indicators. Trigger push alarms via regional team manager consoles.",
      actionZh: "大楼低碳行为规范宣签完成度低。请对未签约员工发布轻量级温馨习惯警示告知。"
    }
  ];

  const handleApplyActionRecommendation = () => {
    setActiveToast(
      lang === 'en'
        ? "Action Initiative deployed to Green HR automation pipeline!"
        : "联动决策已下发！系统将自动在受影响部门发布靶向激励与低碳宣训活动。"
    );
    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  const handleSealProofCryptographically = () => {
    setIsSignOffLocked(prev => !prev);
    setActiveToast(
      lang === 'en'
        ? (!isSignOffLocked ? "Audit Sealed! Secure hash locked successfully on ledger." : "Digital signature released.")
        : (!isSignOffLocked ? "哈希盖戳封存成功！合规审计数据已锁定并记录防洗绿安全标识。" : "账册封签已临时重置，处于编辑整改态。")
    );
    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  };

  return (
    <div id="compliance_kanban_root" className="bg-[#f8fafc] rounded-[2.5rem] border border-slate-200/80 shadow-lg overflow-hidden text-slate-800 flex flex-col font-sans">
      
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0f172a] to-slate-950 text-white p-6 relative overflow-hidden border-b border-slate-800">
        <div className="absolute right-0 top-0 bottom-0 opacity-15 pointer-events-none w-1/3 flex items-center justify-center">
          <Activity className="w-80 h-80 text-cyan-500 stroke-[0.3] animate-pulse" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 max-w-7xl mx-auto w-full relative z-10">
          <div className="space-y-1.5">
            <span className="text-[9.5px] font-mono font-black px-2.5 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 rounded-md tracking-wider uppercase inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {lang === 'en' ? 'PHYSICAL AUDIT CONTROL CENTER' : '物理审计总控制台'}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {lang === 'en' ? 'Compliance Control Center / Director Desk' : '合规控制中心 / 审计官工作台'}
            </h1>
            <p className="text-xs text-slate-400 max-w-4xl font-medium">
              {lang === 'en'
                ? 'A streamlined visual system designed for instant answers: Are we safe? Where are the risks? What should we fix first?'
                : '无感脱水核销系统：一屏解答“我们现在做得怎么样？哪里有风险？下一步应该整改什么？”'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Legend Popover describing simplifications */}
            <div className="group relative shrink-0">
              <button className="p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer">
                <HelpCircle className="w-4.5 h-4.5" />
              </button>
              <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-slate-850 hidden group-hover:block z-50">
                <h4 className="text-xs font-mono font-black text-slate-900 border-b border-slate-100 pb-1.5 mb-2 uppercase flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                  {lang === 'en' ? 'Bilingual Simplified Terms' : '管理层减压：业务术语精简对齐'}
                </h4>
                <div className="space-y-2 text-[10.5px]">
                  {simplifiedTerms.map((term, i) => (
                    <div key={i} className="flex justify-between items-start border-b border-slate-50 pb-1">
                      <span className="text-slate-400 line-through shrink-0 pr-2">{term.old}</span>
                      <span className="font-bold text-emerald-700 text-right">
                        → {lang === 'en' ? term.newEn : term.newZh}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSealProofCryptographically}
              className={`p-3 px-4.5 text-xs text-white font-black rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                isSignOffLocked 
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-950/10' 
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-950/10'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSignOffLocked ? '' : 'animate-spin'}`} />
              <span>
                {isSignOffLocked 
                  ? (lang === 'en' ? 'Locked Ledger Sign-off' : '账册已锁定审计度')
                  : (lang === 'en' ? 'Seal Cryptographic Ledger' : '我确认签署真实一致账页')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* 1. COMPLIANCE OVERVIEW DASHBOARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scorecards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id} 
                className={`p-5 rounded-2.5xl border bg-white shadow-xs hover:shadow-md transition-all space-y-3 relative group overflow-hidden ${
                  activeDeptDetail === card.id ? 'ring-2 ring-indigo-505 bg-indigo-50/5 border-indigo-200' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono font-black text-slate-400 uppercase block tracking-wider leading-none mb-1.5 matches-simplified-rules">
                      {lang === 'en' ? card.titleEn : card.titleZh}
                    </span>
                    <h2 className="text-3xl font-mono font-black text-slate-900 tracking-tight leading-none">
                      {lang === 'en' ? card.value : (card.valueZh || card.value)}
                    </h2>
                  </div>
                  <span className={`p-2 rounded-xl bg-slate-50 text-slate-600 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-5 h-5 text-indigo-600" />
                  </span>
                </div>

                {/* Sub Score metadata */}
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                  <span className={`px-2 py-0.5 rounded-md font-extrabold text-[9px] uppercase font-mono tracking-wide ${card.bgColor} ${card.textColor}`}>
                    {lang === 'en' ? card.statusEn : card.statusZh}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-slate-500">
                    {lang === 'en' ? card.trendEn : card.trendZh}
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 leading-tight mt-1">
                  {lang === 'en' ? card.descEn : card.descZh}
                </p>

                <div className="absolute right-2 bottom-2 text-[7.5px] font-mono text-slate-350 opacity-40 group-hover:opacity-100 transition-opacity">
                  {lang === 'en' ? `Replaces: ${card.oldTerm}` : `替换术语: ${card.oldTerm}`}
                </div>
              </div>
            );
          })}
        </div>

        {/* 2 & 3. COMPLIANCE CHECKBOX BOARD & AUDIT READINESS TRACKER & MORE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Block: Risk Heatmap Matrix (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Layers className="w-4.5 h-4.5 text-indigo-600 animate-pulse" />
                  {lang === 'en' ? 'Bilingual Risk Heatmap Matcher' : '跨部门习惯表现合规风控热力图'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {lang === 'en' 
                    ? 'Comparing business division attributes to highlight immediate governance gaps.' 
                    : '部门健康对齐：直观呈现政策实施漏点、数据缺漏。绿色代表健康，黄色代表关注，红色代表高风险。'}
                </p>
              </div>

              {/* Minimal legend indicators */}
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold shrink-0">
                <span className="flex items-center gap-1 text-emerald-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  {lang === 'en' ? 'Healthy' : '健康'}
                </span>
                <span className="flex items-center gap-1 text-amber-550">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                  {lang === 'en' ? 'Needs Attention' : '待提升'}
                </span>
                <span className="flex items-center gap-1 text-rose-550">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                  {lang === 'en' ? 'High Risk' : '高危机风险'}
                </span>
              </div>
            </div>

            {/* Micro-designed Grid Table for Heatmap */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-mono uppercase bg-slate-50 font-black text-slate-500">
                    <th className="py-2.5 px-3 rounded-l-xl">{lang === 'en' ? 'BUSINESS DIVISION' : '评估审查科室'}</th>
                    <th className="py-2.5 px-3 text-center">{lang === 'en' ? 'Risk Level' : '风险等级'}</th>
                    <th className="py-2.5 px-3 text-center">{lang === 'en' ? 'Data Quality' : '数据质量率'}</th>
                    <th className="py-2.5 px-3 text-center">{lang === 'en' ? 'Policy Compliance' : '政策合规率'}</th>
                    <th className="py-2.5 px-3 text-center rounded-r-xl">{lang === 'en' ? 'Participation Stability' : '习惯参与活跃度'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {heatmapData.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => setActiveDeptDetail(activeDeptDetail === row.id ? null : row.id)}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${activeDeptDetail === row.id ? 'bg-indigo-50/20' : ''}`}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <div>
                            <span className="font-extrabold text-slate-900 block">{lang === 'en' ? row.deptEn : row.deptZh}</span>
                            <span className="text-[9.5px] text-slate-400 font-mono italic block">{lang === 'en' ? row.descEn : row.descZh}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-xl text-[10.5px] font-mono font-black ${row.risk.color} w-24`}>
                          {lang === 'en' ? row.risk.labelEn : row.risk.labelZh}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-xl text-[10.5px] font-mono font-black ${row.dataQuality.color} w-24`}>
                          {lang === 'en' ? row.dataQuality.labelEn : row.dataQuality.labelZh}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-xl text-[10.5px] font-mono font-black ${row.policyCompliance.color} w-24`}>
                          {lang === 'en' ? row.policyCompliance.labelEn : row.policyCompliance.labelZh}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-3 py-1 rounded-xl text-[10.5px] font-mono font-black ${row.participation.color} w-24`}>
                          {lang === 'en' ? row.participation.labelEn : row.participation.labelZh}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Audit Readiness Progress Tracker */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-mono font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  {lang === 'en' ? 'Audit Readiness Progress Tracker' : '国家级/外部合规审计准备度进度条'}
                </h4>
                <span className="text-[10px] font-mono font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg animate-pulse">
                  {lang === 'en' ? 'OVERALL READY: 90%' : '综合就绪率：90%'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {auditProgressMetrics.map((met, i) => (
                  <div key={i} className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-150 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-800">{lang === 'en' ? met.labelEn : met.labelZh}</span>
                      <span className="text-slate-900 font-mono">{met.pct}%</span>
                    </div>
                    {/* Visual Progress Bar Wrapper */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          met.pct >= 90 ? 'bg-emerald-500' : met.pct >= 80 ? 'bg-indigo-600' : 'bg-rose-500'
                        }`}
                        style={{ width: `${met.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Sidebar Components (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Compliance Checklist Board */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-2">
                  <CheckSquare className="w-4.5 h-4.5 text-indigo-600" />
                  {lang === 'en' ? 'Compliance Checklist Board' : '大楼低碳合规核心检查板'}
                </h3>
                <p className="text-[10px] text-slate-500">
                  {lang === 'en' 
                    ? 'Simple, clear indicators. Click items below to simulate status updates.' 
                    : '管理人员可在此快速查明组织工作完成进度、避免复杂汇报。点击条目可进行整改勾选。'}
                </p>
              </div>

              <div className="space-y-2.5">
                {checklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-[11.5px] font-semibold transition-all cursor-pointer hover:shadow-xs active:scale-[0.98] ${
                      item.checked 
                        ? 'bg-slate-50/40 border-slate-200 text-slate-800' 
                        : 'bg-amber-50/20 border-amber-200 text-slate-900 shadow-sm'
                    }`}
                  >
                    <span className="font-bold flex items-center gap-2 max-w-[85%]">
                      {item.checked ? (
                        <Check className="w-4 h-4 text-emerald-650 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 animate-pulse shrink-0" />
                      )}
                      <span className="truncate">{lang === 'en' ? item.textEn : item.textZh}</span>
                    </span>

                    <span className={`text-[9.5px] font-mono font-black uppercase px-2 py-0.5 rounded-lg ${
                      item.checked ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-100 text-amber-800 animate-pulse'
                    }`}>
                      {item.checked ? (lang === 'en' ? 'Done ✓' : '已完成') : (lang === 'en' ? 'Alert ⚠' : '待处理')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Department Risk Ranking */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-indigo-600 animate-bounce" />
                  {lang === 'en' ? 'Department Risk Ranking' : '部门高碳行为/合规风险排行榜'}
                </h3>
                <p className="text-[10px] text-slate-500">
                  {lang === 'en' 
                    ? 'Identifies where intervention is needed immediately.' 
                    : '聚焦最高负荷源头：管理层可立刻圈定待核查纠错的一线业务口径。'}
                </p>
              </div>

              <div className="space-y-3">
                {departmentRankings.map((dept, ind) => (
                  <div key={dept.id} className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-slate-100 text-slate-600 font-mono text-[10px] font-black rounded-lg flex items-center justify-center">
                          #{ind + 1}
                        </span>
                        <span className="text-slate-850 font-extrabold">{lang === 'en' ? dept.nameEn : dept.nameZh}</span>
                      </span>
                      <span className={`text-[10px] uppercase font-mono font-black ${
                        dept.riskLevel.includes('High') ? 'text-rose-600' : dept.riskLevel.includes('Medium') ? 'text-amber-550' : 'text-emerald-600'
                      }`}>
                        {lang === 'en' ? dept.riskLevel : dept.riskZh}
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-700 ${dept.colorClass}`}
                        style={{ width: `${dept.riskPct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 4. COMPLIANCE ALERTS & RECOMMENDATIONS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Active Alerts List (Alert Center) */}
          <div className="bg-white border border-slate-200/80 p-5 rounded-[2.2rem] shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-2">
                  <AlertOval glowing className="w-4.5 h-4.5 text-rose-500 animate-pulse" />
                  {lang === 'en' ? 'Active Compliance Alerts Center' : '物理一致性报警与风险提醒中心'}
                </h3>
                <span className="text-[9px] font-mono font-black bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-100">
                  {lang === 'en' ? '3 ACTIVE THREATS' : '当前存证存在 3 条合规隐患'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                {lang === 'en' 
                  ? 'Real-time alert engine with zero complex AI jargon. Minimal and readable.' 
                  : '去伪存真安全阀：直接抓取数据层偏离，不输出大量无用文书，助力业务部门直截了当整改。'}
              </p>
            </div>

            <div className="space-y-2.5">
              {activeAlerts.map((alert, i) => (
                <div 
                  key={alert.id}
                  onClick={() => setSelectedAlertIdx(i)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-[11.5px] font-bold ${
                    selectedAlertIdx === i 
                      ? 'bg-rose-50/40 border-rose-220 text-rose-950 shadow-xs' 
                      : 'bg-slate-50/50 border-slate-150 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    <span>{lang === 'en' ? alert.textEn : alert.textZh}</span>
                  </div>
                  <ChevronRight className={`w-4.5 h-4.5 transition-transform ${selectedAlertIdx === i ? 'rotate-90 text-rose-605' : 'text-slate-400'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Action Recommendation Card */}
          <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-slate-950 text-white p-6 rounded-[2.2rem] shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none">
              <Sparkles className="w-64 h-64 text-indigo-400" />
            </div>

            <div className="space-y-1 relative z-10">
              <span className="text-[9px] font-mono font-black px-2 py-0.5 bg-amber-500/10 text-amber-305 border border-amber-500/20 rounded-md uppercase tracking-wider">
                💡 {lang === 'en' ? 'SINGLE TARGETED RECOMMENDATION' : '当前首席推荐整改举措'}
              </span>
              <h4 className="text-xs font-mono font-black tracking-widest text-[#a5f3fc] uppercase pt-1 inline-block">
                {lang === 'en' ? 'Management Action Suggestion' : '低碳习惯纠偏与降碳动作指涉'}
              </h4>
              <p className="text-[11px] text-slate-350 leading-relaxed">
                {lang === 'en' 
                  ? 'Limit search complexity. Execute the key corrective action to restore performance parity.' 
                  : '减压高效决策：无需搜寻各部门繁言，一键推演解决当前高风险磨损。'}
              </p>
            </div>

            {/* Displaying ONE recommendation at a time */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl relative z-10 min-h-[72px] flex items-center">
              <p className="text-xs text-slate-100 font-extrabold leading-relaxed">
                {lang === 'en' ? recommendations[selectedAlertIdx].actionEn : recommendations[selectedAlertIdx].actionZh}
              </p>
            </div>

            <div className="flex justify-between items-center gap-3 relative z-10 pt-2">
              <div className="flex items-center gap-1">
                {recommendations.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedAlertIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${selectedAlertIdx === i ? 'bg-cyan-405 w-4' : 'bg-white/30'}`}
                  />
                ))}
              </div>

              <button
                onClick={handleApplyActionRecommendation}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4.5 py-2 rounded-xl text-[11px] tracking-wider transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
              >
                ⚡ {lang === 'en' ? 'Direct Deploy Initiative' : '采纳并直接下发任务'}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Pop up message feedback toast slider */}
      <AnimatePresence>
        {activeToast && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="p-4 bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl font-bold flex items-center gap-2 shadow-2xl text-xs max-w-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{activeToast}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer footprint */}
      <footer className="bg-[#0f172a] text-slate-500 p-4 border-t border-slate-800 text-[10px] leading-relaxed relative flex justify-between items-center shrink-0">
        <span>© 2026 Compliance Director Inspection Desk • CSRD Standard Double-Materiality Compliant</span>
        <span className="font-mono text-[9px] text-indigo-400/50">Traceability rating: AAA Confirmed</span>
      </footer>

    </div>
  );
}

// Simple Helper inner component just to prevent naming clashes
function AlertOval({ className }: { className?: string; glowing?: boolean }) {
  return (
    <span className={`relative flex h-2.5 w-2.5 ${className}`}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
    </span>
  );
}
