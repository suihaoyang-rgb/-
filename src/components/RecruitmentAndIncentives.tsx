/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gift, Heart, UserCheck, ShieldCheck, Sparkles, Award, 
  ArrowRight, Search, FileText, CheckCircle, Flame, TreePine, Smile
} from 'lucide-react';

interface RecruitmentAndIncentivesProps {
  currentBalance: number;
  onDeductPoints: (points: number) => void;
  lang?: 'en' | 'zh';
}

export default function RecruitmentAndIncentives({
  currentBalance,
  onDeductPoints,
  lang = 'zh',
}: RecruitmentAndIncentivesProps) {
  const [activeSubTab, setActiveSubTab] = useState<'incentives' | 'recruitment'>('incentives');

  // Module 4: Green Incentives Exchange State
  const [purchasedPerks, setPurchasedPerks] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successExchangeMessage, setSuccessExchangeMessage] = useState<string | null>(null);

  // Module 5: Green Recruitment State
  const [candidateResumeTxt, setCandidateResumeTxt] = useState<string>('');
  const [analyzingCandidate, setAnalyzingCandidate] = useState<boolean>(false);
  const [candidateProfileReport, setCandidateProfileReport] = useState<{
    score: number;
    rating: 'AAA' | 'AA' | 'A' | 'B' | 'C';
    typeEn: string;
    typeZh: string;
    sustainabilityAwareness: string;
    esgAlignment: string;
    prosEn: string[];
    prosZh: string[];
    recEn: string;
    recZh: string;
  } | null>(null);

  const SPECIAL_INCENTIVES = [
    {
      id: 'perk_holiday',
      nameEn: "🌴 1-Day Low-Carbon Extra Paid Leave",
      nameZh: "🌴 低碳调休额度（全额带薪）/ 1天",
      cost: 800,
      impactEn: "Direct wellness perk to reward zero-carbon behavior consistent over 6 months.",
      impactZh: "对持续 6 个月保持零碳行为的顶尖低碳先锋予以 1 天带薪返乡或休假补偿，由主管行政特批。",
      category: 'Benefits'
    },
    {
      id: 'perk_badge',
      nameEn: "🏢 'Green Sector' Slack & Title Banner",
      nameZh: "🏢 部门专属“绿色领航组”视觉挂牌",
      cost: 400,
      impactEn: "Grants exclusive carbon sector icon for your entire division.",
      impactZh: "认领该挂牌后，您所在小组的所有成员都将在系统与即时通讯软件中获得带有环保光环的专属挂件，彰显荣誉。",
      category: 'In-Group PK'
    },
    {
      id: 'perk_linkedin_cert',
      nameEn: "📜 Verified LinkedIn ESG Star Officer Certificate",
      nameZh: "📜 权威机构联合签发 ESG 明星实践官证书",
      cost: 600,
      impactEn: "Authorized block-signed audit credential ready for professional profile.",
      impactZh: "由平台联合环境工程系签发起草、具备唯一核销哈希的数字版 ESG 办公先锋专家证书，支持 LinkedIn 披露展示。",
      category: 'ESG Professional'
    }
  ];

  const handleExchangePerk = (perkId: string, cost: number, title: string) => {
    if (currentBalance < cost) {
      setErrorMessage(
        lang === 'en' 
          ? `Insufficient Balance. You need ${cost - currentBalance} more GP to redeem this benefit.`
          : `操作失败：您的绿色能量余额不足。距离兑换此项福利还差 ${cost - currentBalance} GP 能量。`
      );
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    onDeductPoints(cost);
    setPurchasedPerks(prev => [...prev, perkId]);
    setSuccessExchangeMessage(
      lang === 'en'
        ? `Exchange Approved! "${title}" has been linked to your HR core profile. -${cost} GP`
        : `申领成功！您的福利“${title}”已正式推送到集团 HR 资源管理数据库中进行派发核准。划扣 -${cost} GP！`
    );
    setTimeout(() => setSuccessExchangeMessage(null), 5000);
  };

  // Module 5 AI Recruitment analysis rules
  const handleAnalyzeCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateResumeTxt.trim()) return;

    setAnalyzingCandidate(true);
    setCandidateProfileReport(null);

    setTimeout(() => {
      const text = candidateResumeTxt.toLowerCase();
      let score = 55;
      let rating: 'AAA' | 'AA' | 'A' | 'B' | 'C' = 'C';
      let typeEn = "Traditional Player";
      let typeZh = "务实型骨干（ESG 意识需培养）";
      let awareness = "Candidate relies on physical materials; values compliance but has minimal carbon footprint knowledge.";
      let alignment = "Aligned with core productivity; might need basic green training upon onboard checklist.";
      let prosEn = ["High execution focus", "Complies with directive rules"];
      let prosZh = ["执行力极其专注强悍", "在传统制度框架下高度配合"];
      let recEn = "Onboard with immediate 3-minute Green Scope 3 micro-courses to transition into digital paperless mode.";
      let recZh = "入职当天须在“低碳学习堂”选修其所需岗位无纸化流程，加速纠偏传统物理材料印制旧习惯。";

      if (text.includes('paperless') || text.includes('digital') || text.includes('optimize') || text.includes('efficiency') || text.includes('优化') || text.includes('算法') || text.includes('数字化') || text.includes('提效')) {
        score = 88;
        rating = 'AA';
        typeEn = "Eco-Optimizer";
        typeZh = "环境提效低碳优化师 (AA)";
        awareness = "Deep interest in cloud systems, automated workflows, and paperless business transactions.";
        alignment = "Excellent harmony with Scope 3 corporate targets. Highly proactive eco-centric thinker.";
        prosEn = ["Strong software paperless optimization focus", "Demonstrates energy reduction awareness"];
        prosZh = ["拥有纯熟的数字无纸化重构视野", "对设备后台能耗极具自发管理警觉"];
        recEn = "High alignment candidate. Recommend direct assignment to local division's ESG green committee.";
        recZh = "高质量绿色低碳基因候选人，极力推荐兼任本组内的兼职 ESG 绿色低碳委员会委员。";
      }

      if (text.includes('carbon') || text.includes('sustainability') || text.includes('esg') || text.includes('green') || text.includes('可持续') || text.includes('节能') || text.includes('低碳') || text.includes('环保')) {
        score = 98;
        rating = 'AAA';
        typeEn = "Green Evangelist";
        typeZh = "先锋级 ESG 零碳使者 (AAA)";
        awareness = "Superb credentials in eco-design. Treats environment and operational performance as high-harmony metrics.";
        alignment = "Outstanding ESG mission match. Candidate holds proactive carbon governance capabilities.";
        prosEn = ["Exceptional Pro-Environmental Behavior drive", "Proven metrics of reducing server energy footprints"];
        prosZh = ["具备高阶 PEB 自觉主动利他行为机制", "有过具体推行可持续减碳流程的实证业绩"];
        recEn = "Outstanding ESG talent! Fast-track hire and request them to pioneer team low-carbon commute initiatives.";
        recZh = "万里挑一的顶配低碳契合人才！强烈建议破格录用，并邀其为部门领衔打磨全新的 Scope 3 避碳方案。";
      }

      setCandidateProfileReport({
        score,
        rating,
        typeEn,
        typeZh,
        sustainabilityAwareness: awareness,
        esgAlignment: alignment,
        prosEn,
        prosZh,
        recEn,
        recZh
      });
      setAnalyzingCandidate(false);
    }, 1500);
  };

  const handleTestCandidateSample = (sampleType: 'junior' | 'advanced') => {
    if (sampleType === 'junior') {
      setCandidateResumeTxt(
        lang === 'en'
          ? "5 years experienced desk marketer. Values daily traditional layouts, prints client proposal drafts for hand-marking, prefers high travel availability."
          : "资深业务拓展经理。擅长打印全套方案对客面谈并用红笔批注，出差适应性极高（优先自驾），惯用大量纸质名片。"
      );
    } else {
      setCandidateResumeTxt(
        lang === 'en'
          ? "Software architect specializing in paperless workflows and automated cloud infrastructures, optimized local server standby configurations, actively commutes via e-metro."
          : "服务端软件架构师，日常主攻无纸化业务重构与微服务云原生资源自动归档缩容，随手关闭闲闲服务器，坚持骑车/地铁极简生活。"
      );
    }
  };

  const t = {
    title: lang === 'en' ? 'Incentives & Recruitment Hub' : '绿色激励与招聘契合中心',
    tagline: lang === 'en' ? 'Green Incentives & Value Assessments' : '企业激励杠杆与候选人低碳契合度 AI 评测',
    tabIncentives: lang === 'en' ? '🎁 Premium Corporate Perks' : '🎁 B端高能利他激励兑换柜',
    tabRecruitment: lang === 'en' ? '👥 Green Recruitment Parser' : '👥 候选人低碳人格 AI 评测',
    currentBalanceLabel: lang === 'en' ? "My Points:" : "我的绿色可支划能量:",
    btnExchange: lang === 'en' ? 'Claim Perk' : '立即抵扣申领',
    exchangeSuccess: lang === 'en' ? 'Redeemed' : '已入HR库审核',
    recruitDesc: lang === 'en' 
      ? 'Paste a resume excerpt or professional profile below. Our ESG analysis engines will evaluate the candidate’s Carbon Awareness index and construct an eco-profile.'
      : '粘贴求职候选人的自我评价、特长陈述 or 履历摘要。算法将智能透视该人选潜在的 PEB（利他环保行为）觉醒度与 ESG 契合底色:',
    placeholderResume: lang === 'en' ? 'Paste candidate summary here...' : '粘贴候选人简介段落...',
    btnAnalyze: lang === 'en' ? 'Analyze ESG Profile' : 'AI 环境人格透视',
    analyzingLabel: lang === 'en' ? 'Poreing with ESG engine...' : '正在检索 ESG 多项度中和模型...',
    cardReportHeader: lang === 'en' ? 'Green Personality Profile Report' : '候选人 ESG 低碳人格穿透报告',
    recLabel: lang === 'en' ? 'Green HR Recommendation' : '录用落地低碳指引:',
    sampleJunior: lang === 'en' ? 'Load Paper-Heavy Candidate' : '高碳传统简历样本',
    sampleSenior: lang === 'en' ? 'Load Low-Carbon Tech Candidate' : '低碳数字简历样本'
  };

  return (
    <div id="recruitment_incentives_view" className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 font-display flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600" />
              {t.title}
            </h2>
            <p className="text-[11px] text-slate-500 mt-1">{t.tagline}</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-150 rounded-2xl px-3 py-1.5 flex items-center gap-2 text-xs font-mono font-bold self-start sm:self-auto shrink-0">
            <Smile className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="block text-[8px] text-slate-400 font-sans uppercase font-bold">{t.currentBalanceLabel}</span>
              <span className="text-emerald-800">{currentBalance} GP</span>
            </div>
          </div>
        </div>

        {/* Sub-tabs selectors */}
        <div className="flex gap-2 mb-5 border-b border-slate-100 pb-3">
          <button
            onClick={() => setActiveSubTab('incentives')}
            className={`text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'incentives' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.tabIncentives}
          </button>
          <button
            onClick={() => setActiveSubTab('recruitment')}
            className={`text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'recruitment' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.tabRecruitment}
          </button>
        </div>

        {/* TOAST alerts */}
        <AnimatePresence>
          {successExchangeMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3.5 bg-emerald-600 text-white border border-emerald-500 rounded-2xl text-[10.5px] font-bold leading-normal flex items-start gap-2.5 shadow-md"
            >
              <CheckCircle className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5 animate-spin" />
              <div>{successExchangeMessage}</div>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-2xl text-[10.5px] font-bold leading-normal flex items-start gap-2.5 shadow-sm"
            >
              <div>{errorMessage}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Module 4: Incentives Board */}
        {activeSubTab === 'incentives' && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-150 text-amber-900 rounded-2xl text-[9.5px] leading-relaxed">
              ⭐ <strong>为什么企业极乐意买单？</strong> 传统企业面临极高的 ESG 数据合规壁垒与员工环保冷漠度（PPT培训看了就忘）。提供可调休假期、明星挂件和官方 ESG 勋章能极大促成“绩效化”的员工减碳冲劲，是目前市面上最易完成 B 端商业化闭环的模块。
            </div>

            <div className="space-y-3.5">
              {SPECIAL_INCENTIVES.map((item) => {
                const isRedeemed = purchasedPerks.includes(item.id);
                const isAffordable = currentBalance >= item.cost;

                return (
                  <div 
                    key={item.id}
                    className="p-4 border border-slate-100 rounded-2xl bg-slate-50/20 hover:bg-slate-50/70 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-black text-slate-800 font-display">
                          {lang === 'en' ? item.nameEn : item.nameZh}
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal font-medium">
                        {lang === 'en' ? item.impactEn : item.impactZh}
                      </p>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-2.5 border-t border-slate-100 pt-3 md:pt-0 md:border-t-0 shrink-0 select-none">
                      <div className="text-left md:text-right font-mono text-xs text-slate-500 font-extrabold">
                        {item.cost} GP
                      </div>

                      <button
                        onClick={() => handleExchangePerk(item.id, item.cost, lang === 'en' ? item.nameEn : item.nameZh)}
                        disabled={isRedeemed}
                        className={`text-[9px] font-black px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer ${
                          isRedeemed 
                            ? 'bg-slate-105 border border-slate-200 text-slate-400 cursor-not-allowed' 
                            : isAffordable
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-slate-100 hover:bg-emerald-50 text-emerald-800 border border-slate-200'
                        }`}
                      >
                        {isRedeemed ? t.exchangeSuccess : t.btnExchange}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Module 5: Recruitment Evaluator */}
        {activeSubTab === 'recruitment' && (
          <div className="space-y-5">
            <p className="text-[10px] text-slate-550 leading-relaxed font-semibold">
              {t.recruitDesc}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleTestCandidateSample('junior')}
                className="text-[9.5px] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold cursor-pointer"
              >
                📝 {t.sampleJunior}
              </button>
              <button
                type="button"
                onClick={() => handleTestCandidateSample('advanced')}
                className="text-[9.5px] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold cursor-pointer"
              >
                📝 {t.sampleSenior}
              </button>
            </div>

            <form onSubmit={handleAnalyzeCandidate} className="space-y-3">
              <textarea
                id="recruit_resume_input"
                rows={3}
                value={candidateResumeTxt}
                onChange={(e) => setCandidateResumeTxt(e.target.value)}
                placeholder={t.placeholderResume}
                className="w-full border border-slate-200 focus:border-emerald-500 rounded-2xl p-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={analyzingCandidate || !candidateResumeTxt.trim()}
                  className="bg-slate-900 hover:bg-emerald-650 disabled:bg-slate-100 text-white disabled:text-slate-450 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{analyzingCandidate ? t.analyzingLabel : t.btnAnalyze}</span>
                </button>
              </div>
            </form>

            {/* AI Diagnosis Evaluation Card */}
            {candidateProfileReport && (
              <div className="p-5 border border-emerald-150 rounded-2.5xl bg-emerald-50/30 space-y-4">
                <div className="flex items-start justify-between border-b border-emerald-100 pb-3">
                  <div>
                    <span className="text-[8px] text-emerald-700 bg-emerald-100 border border-emerald-150 rounded px-1.5 py-0.5 font-black uppercase tracking-wider">
                      PROACTIVE PEB INDEX
                    </span>
                    <h4 className="text-xs font-black text-slate-800 font-display mt-1">
                      {t.cardReportHeader}
                    </h4>
                  </div>

                  <div className="text-right">
                    <span className="block text-[8px] text-slate-400 font-bold uppercase">ESG MATCHING</span>
                    <strong className="text-emerald-700 text-base font-mono font-black">
                      {candidateProfileReport.score} <span className="text-xs font-normal">({candidateProfileReport.rating})</span>
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="block text-[8px] text-slate-400 uppercase font-black tracking-wide">
                      Environmental Outlook Style:
                    </span>
                    <p className="font-extrabold text-slate-800">
                      {lang === 'en' ? candidateProfileReport.typeEn : candidateProfileReport.typeZh}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-normal font-medium mt-1">
                      {candidateProfileReport.sustainabilityAwareness}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="block text-[8px] text-slate-400 uppercase font-black tracking-wide">
                      Cultural Fit Index:
                    </span>
                    <p className="font-extrabold text-slate-800">
                      {candidateProfileReport.esgAlignment}
                    </p>
                    <div className="space-y-1 mt-1 font-medium text-[10.5px]">
                      {(lang === 'en' ? candidateProfileReport.prosEn : candidateProfileReport.prosZh).map((pro, idx) => (
                        <div key={idx} className="flex items-start gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Green HR Guidelines Recommendation */}
                <div className="bg-white p-3.5 border border-slate-150 rounded-xl text-xs space-y-1 font-medium border-l-3 border-l-emerald-600">
                  <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-tight">
                    {t.recLabel}
                  </span>
                  <p className="text-[10.5px] text-slate-650 leading-relaxed font-medium">
                    {lang === 'en' ? candidateProfileReport.recEn : candidateProfileReport.recZh}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
