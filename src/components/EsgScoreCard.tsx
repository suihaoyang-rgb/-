/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserStats } from '../types';
import { 
  Award, ShieldAlert, Sparkles, AlertCircle, HelpCircle, 
  Check, ArrowUpRight, Scale, Info, Globe, Trees
} from 'lucide-react';

interface EsgScoreCardProps {
  stats: UserStats;
  onGovernanceComplete: (points: number) => void;
  hasCompletedGovernanceAudit: boolean;
  lang?: 'en' | 'zh';
}

export default function EsgScoreCard({
  stats,
  onGovernanceComplete,
  hasCompletedGovernanceAudit,
  lang = 'zh',
}: EsgScoreCardProps) {
  const [showHelper, setShowHelper] = useState<boolean>(false);
  const [auditOpen, setAuditOpen] = useState<boolean>(false);
  const [auditStep, setAuditStep] = useState<number>(0);
  const [auditAnswers, setAuditAnswers] = useState<boolean[]>([false, false, false]);

  // Determine the Letter grade based on cumulative points
  const getEsgGrade = (points: number) => {
    if (points <= 200) {
      return { 
        grade: 'C', 
        rating: 68, 
        labelEn: 'Evolving Catalyst', 
        labelZh: '低碳进化观察员', 
        color: 'border-t-orange-500', 
        text: 'text-orange-400' 
      };
    }
    if (points <= 450) {
      return { 
        grade: 'B', 
        rating: 78, 
        labelEn: 'Eco Practitioner', 
        labelZh: '环保先锋践行者', 
        color: 'border-t-yellow-400', 
        text: 'text-yellow-400' 
      };
    }
    if (points <= 750) {
      return { 
        grade: 'BB', 
        rating: 85, 
        labelEn: 'Green Vanguard', 
        labelZh: '绿色排头尖兵', 
        color: 'border-t-blue-400', 
        text: 'text-blue-400' 
      };
    }
    if (points <= 1100) {
      return { 
        grade: 'BBB', 
        rating: 90, 
        labelEn: 'Sustainability Steward', 
        labelZh: '低碳可持续管家', 
        color: 'border-t-teal-400', 
        text: 'text-teal-400' 
      };
    }
    if (points <= 1500) {
      return { 
        grade: 'A', 
        rating: 94, 
        labelEn: 'Corporate Eco Champion', 
        labelZh: '集团绿色生态卫士', 
        color: 'border-t-emerald-400', 
        text: 'text-emerald-400' 
      };
    }
    if (points <= 2000) {
      return { 
        grade: 'AA', 
        rating: 97, 
        labelEn: 'ESG Visionary Practitioner', 
        labelZh: 'ESG 卓越远见实践家', 
        color: 'border-t-cyan-400', 
        text: 'text-cyan-400' 
      };
    }
    return { 
      grade: 'AAA', 
      rating: 99, 
      labelEn: 'Ecosystem Co-Founder', 
      labelZh: '生态界联合共创者', 
      color: 'border-t-emerald-400', 
      text: 'text-emerald-300' 
    };
  };

  const getPillarProgress = (value: number) => {
    return Math.min(100, Math.max(8, (value / 800) * 100));
  };

  const currentStatus = getEsgGrade(stats.totalPointsCollected);

  // ESG Questions to trigger Governance scores
  const GOV_QUESTIONS = [
    {
      qEn: "Have you reviewed and agreed to comply with the Corporate Sustainable Workplace Policy (e.g., ensuring sleep-mode on high-draw monitors)?",
      qZh: "您是否已审阅并承诺遵守《企业可持续智慧办公守则》（例如，设定电脑闲置 5 分钟自动休眠，减少高负载能耗）？",
      tipEn: "Compliance saves an average of 140W of idle electricity load per desk.",
      tipZh: "绿色守则合规单人每个工位每日平均可节约 140W 的待机空转电力消耗。"
    },
    {
      qEn: "Have you reported or resolved any office energy waste, such as leaky faucets, unclosed drafts, or HVAC systems left humming in vacant rooms?",
      qZh: "您今日是否发现并主动提报/消除至少一次办公区的隐性能源浪费（如随手反锁消防门锁以防冷气溢出、顺手关闭空闲会商室照明等）？",
      tipEn: "Spotting energy leaks reduces company operational carbon by up to 4%.",
      tipZh: "能效跑冒滴漏的隐患消除能有效使全栋企业楼宇二氧化碳减排达 4% 左右。"
    },
    {
      qEn: "Have you participated in establishing electronic invoice and digital documentation standards for your department this quarter?",
      qZh: "本季度您是否协助/参与了本团队电子报账票据或全面无纸化知识标准流程体系的建立与执行？",
      tipEn: "Digital transformation reduces company wood pulping reliance.",
      tipZh: "全面数字报账体系与智慧办公流能消减集团造纸及漂白化学品的消耗与碳足迹。"
    }
  ];

  const handleAuditSubmit = () => {
    onGovernanceComplete(75);
    setAuditOpen(false);
    setAuditStep(0);
  };

  // UI dictionary elements
  const t = {
    title: lang === 'en' ? 'My GHRM & PEB Profile' : '我的个人 GHRM / PEB 表现壁',
    subTitle: lang === 'en' ? 'Pillar Breakdown' : 'GHRM / PEB 责任支柱指标',
    ratingLabel: lang === 'en' ? 'Prestige Rating' : '等级评定',
    pointsLabel: lang === 'en' ? 'GP' : '成长能量',
    savedLabel: lang === 'en' ? 'CO₂ Saved' : '已减排量',
    impactLabel: lang === 'en' ? 'Impact Breakdown' : '低碳社会合规细分明细',
    ePillar: lang === 'en' ? 'Environmental' : '环境支柱 (Environmental)',
    sPillar: lang === 'en' ? 'Social & Culture' : '社会与倡议 (Social)',
    gPillar: lang === 'en' ? 'Governance Audit' : '公司治理合规 (Governance)',
    complyBtn: lang === 'en' ? 'Verify Compliance' : '验证履行合规',
    auditCompleted: lang === 'en' ? 'Weekly Compliance Approved' : '每周治理解析已通过',
    auditCompletedDesc: lang === 'en' 
      ? 'Your sustainable workspace protocol checklists were completed today.' 
      : '恭喜！您今日均达成办公室节电及数字行政全套审查指标。',
    auditTip: lang === 'en' 
      ? 'Acquire +75 GP Governance Points by satisfying environmental checklist items at your office.' 
      : '每周完成企业桌面治理合规检查，可立刻在画布浮现并收获 +75 GP 治理能力分数。',
    auditTitle: lang === 'en' ? 'Sustainable Office Audit' : '绿色健康办公室治理审计',
    modalTitle: lang === 'en' ? 'Compliance Audit' : '合规考评问卷',
    stepLabel: lang === 'en' ? 'Step' : '步骤',
    stepOf: lang === 'en' ? 'of' : '/',
    btnSkip: lang === 'en' ? 'No, Skip' : '不了解/跳过',
    btnComply: lang === 'en' ? 'Yes, Complied' : '是的，符合行为'
  };

  return (
    <div id="esg_score_dashboard" className="bg-emerald-950 text-white rounded-3xl border border-emerald-900 shadow-xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Subtle organic light backdrop */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-900/50 text-emerald-400 rounded-lg">
              <Globe className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-emerald-50 font-display">
              {t.title}
            </h2>
          </div>
          
          <button
            onClick={() => setShowHelper(!showHelper)}
            className="text-emerald-400 hover:text-emerald-250 p-1 rounded-full hover:bg-emerald-900/50 transition-colors cursor-pointer"
            title="How is ESG tracked?"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic score explanation banner */}
        <AnimatePresence>
          {showHelper && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="p-4 bg-emerald-900/80 border border-emerald-800 rounded-2xl text-[11px] text-emerald-100 leading-relaxed space-y-1.5">
                <span className="font-bold flex items-center gap-1 text-emerald-300">
                  <Info className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'What are E-S-G pillars?' : '什么是 ESG 考评模型？'}
                </span>
                <p>
                  <strong>{lang === 'en' ? 'Environmental (E):' : '环境（E）:'}</strong> {lang === 'en' ? 'Earned through physical carbon offset entries (commuting, recycling, power logging).' : '个人日常通勤能耗、无纸办公、金属器皿减塑、垃圾分类投递等绿色减碳行为所得。'}
                </p>
                <p>
                  <strong>{lang === 'en' ? 'Social (S):' : '社会（S）:'}</strong> {lang === 'en' ? 'Earned through attending corporate eco volunteer programs, seminars, or community events.' : '参加企业组织的环保研讨会议、极简宣读打卡、公益义工及生态垃圾清理活动所得。'}
                </p>
                <p>
                  <strong>{lang === 'en' ? 'Governance (G):' : '治理（G）:'}</strong> {lang === 'en' ? 'Earned by completing sustainable policy audits, green checkups, or compliance reports.' : '通过每周自查企业桌面合规、完成绿色审计报告与治理评定等合规事务所得。'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Circular Rating Dome & Grade matching the Bento look */}
        <div className="py-6 flex flex-col items-center justify-center">
          <div className={`w-32 h-32 rounded-full border-8 border-emerald-900/60 ${currentStatus.color} flex flex-col items-center justify-center relative shadow-lg bg-emerald-950/40`}>
            <span className="text-4xl font-extrabold font-display leading-none tracking-tight text-white">{currentStatus.grade}</span>
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-1">{t.ratingLabel}</span>
            
            {/* Tiny live pulse indicator for realtime logging synchronization */}
            <span className="absolute top-2 right-4 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-450"></span>
            </span>
          </div>

          <div className="mt-4 text-center">
            <p className={`text-xs font-bold uppercase tracking-widest ${currentStatus.text}`}>
              {lang === 'en' ? currentStatus.labelEn : currentStatus.labelZh}
            </p>
            <div className="mt-2 text-emerald-100 font-medium text-xs">
              <span className="font-mono font-bold text-white text-base">{stats.totalPointsCollected}</span> {t.pointsLabel} • <strong className="text-emerald-400 font-mono">{stats.totalCarbonReducedKg.toFixed(1)}kg</strong> {t.savedLabel}
            </div>
          </div>
        </div>

        {/* Progress meters for each individual pillar */}
        <div className="space-y-3.5 bg-emerald-900/30 p-4 rounded-3xl border border-emerald-900/50">
          <p className="text-[10px] text-emerald-400 uppercase font-black tracking-wider">{t.impactLabel}</p>
          
          {/* E - Pillar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-emerald-100 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-[9px]">E</span>
                {t.ePillar}
              </span>
              <span className="font-mono text-emerald-300 font-bold">{stats.pillars.E} {t.pointsLabel}</span>
            </div>
            <div className="w-full bg-emerald-950 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${getPillarProgress(stats.pillars.E)}%` }}
              />
            </div>
          </div>

          {/* S - Pillar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-emerald-100 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-sky-900 text-white flex items-center justify-center font-bold text-[9px]">S</span>
                {t.sPillar}
              </span>
              <span className="font-mono text-emerald-300 font-bold">{stats.pillars.S} {t.pointsLabel}</span>
            </div>
            <div className="w-full bg-emerald-950 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-sky-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${getPillarProgress(stats.pillars.S)}%` }}
              />
            </div>
          </div>

          {/* G - Pillar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-emerald-100 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-amber-900/80 text-white flex items-center justify-center font-bold text-[9px]">G</span>
                {t.gPillar}
              </span>
              <span className="font-mono text-emerald-300 font-bold">{stats.pillars.G} {t.pointsLabel}</span>
            </div>
            <div className="w-full bg-emerald-950 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-450 h-full rounded-full transition-all duration-1000"
                style={{ width: `${getPillarProgress(stats.pillars.G)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Governance Interactive Area */}
      <div className="mt-5 pt-4 border-t border-emerald-900/60">
        {!hasCompletedGovernanceAudit ? (
          <div className="bg-emerald-900/40 border border-emerald-900 rounded-2xl p-4 flex flex-col items-center text-center">
            <Scale className="w-5 h-5 text-emerald-400 mb-1" />
            <h4 className="text-xs font-bold text-emerald-100 mb-0.5">{t.auditTitle}</h4>
            <p className="text-[10px] text-emerald-300/80 mb-3 max-w-xs leading-normal">
              {t.auditTip}
            </p>
            <button
              onClick={() => {
                setAuditAnswers([false, false, false]);
                setAuditStep(0);
                setAuditOpen(true);
              }}
              className="bg-emerald-450 hover:bg-emerald-500 text-emerald-950 font-extrabold text-[10px] px-3.5 py-1.8 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              {t.complyBtn}
            </button>
          </div>
        ) : (
          <div className="bg-emerald-900/50 border border-emerald-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-250">{t.auditCompleted}</h4>
              <p className="text-[10px] text-emerald-300/80 leading-normal mt-0.5">{t.auditCompletedDesc}</p>
            </div>
          </div>
        )}
      </div>

      {/* Audit Modal */}
      <AnimatePresence>
        {auditOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-emerald-950 text-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-emerald-800">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-emerald-900">
                <span className="text-[10px] uppercase font-bold text-emerald-400 font-display font-medium">{t.modalTitle}</span>
                <span className="text-[10px] text-emerald-300/60 font-mono">
                  {t.stepLabel} {auditStep + 1} {t.stepOf} 3
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-extrabold text-emerald-50 leading-relaxed font-display">
                  {lang === 'en' ? GOV_QUESTIONS[auditStep].qEn : GOV_QUESTIONS[auditStep].qZh}
                </p>

                <div className="p-3 bg-emerald-900/50 rounded-xl border border-emerald-800 text-[10px] text-emerald-200 leading-normal">
                  💡 <span className="font-semibold text-emerald-300">{lang === 'en' ? 'Sustainable Guideline:' : '低碳守则规范:'}</span> {lang === 'en' ? GOV_QUESTIONS[auditStep].tipEn : GOV_QUESTIONS[auditStep].tipZh}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const nextAnswers = [...auditAnswers];
                      nextAnswers[auditStep] = false;
                      setAuditAnswers(nextAnswers);
                      if (auditStep < 2) setAuditStep(s => s + 1);
                      else handleAuditSubmit();
                    }}
                    className="flex-1 border border-emerald-800 hover:bg-emerald-900/60 text-emerald-300 font-bold py-2.5 rounded-xl text-[11px] transition-all cursor-pointer"
                  >
                    {t.btnSkip}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const nextAnswers = [...auditAnswers];
                      nextAnswers[auditStep] = true;
                      setAuditAnswers(nextAnswers);
                      if (auditStep < 2) setAuditStep(s => s + 1);
                      else handleAuditSubmit();
                    }}
                    className="flex-1 bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-extrabold py-2.5 rounded-xl text-[11px] transition-all shadow-sm cursor-pointer"
                  >
                    {t.btnComply}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
