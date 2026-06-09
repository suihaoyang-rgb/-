/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, RefreshCw, AlertTriangle, CheckCircle, 
  HelpCircle, ArrowRight, TrendingDown, Users, MessageSquare, ShieldAlert
} from 'lucide-react';

interface AiGreenCoachProps {
  onLogBehavior: (behaviorId: string, quantity: number, points: number) => void;
  lang?: 'en' | 'zh';
}

interface CoachMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  meta?: {
    type: 'warning' | 'success' | 'info';
    pointsModifier?: number;
    pointsTitle?: string;
    alternatives?: string[];
    statCompare?: string;
    confidence?: string;
    citation?: string;
  };
}

export default function AiGreenCoach({ onLogBehavior, lang = 'zh' }: AiGreenCoachProps) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<CoachMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'ai',
      text: lang === 'en' 
        ? "AI Habit Coach is active. Tell me about your daily habit (e.g., 'I used a paper cup' or 'I cycled 10km'). I will check the carbon balance, calculate your score, and recommend direct actions."
        : "AI 减碳教练已联机。请告诉我一个您今日的办公行为（如：‘我今天用了纸杯’、‘离岗忘关显示器’、‘我骑车5公里通勤’）。我会为您快查碳效益并赠予 GP 积分！",
      timestamp: new Date(),
      meta: {
        type: 'info',
        statCompare: lang === 'en'
          ? "You successfully avoided 3 disposable cups this week, leading 72% of your teammates."
          : "同辈榜单：本周您已累计自主少用了 3 个一次性纸杯，在所属团队中超越了 72% 的同仁！"
      }
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const processInput = (text: string): CoachMessage['meta'] => {
    const lower = text.toLowerCase();
    
    // Check for disposables/paper cups
    if (lower.includes('纸杯') || lower.includes('一次性') || lower.includes('paper cup') || lower.includes('plastic cup') || lower.includes('disposable')) {
      return {
        type: 'warning',
        pointsModifier: -10,
        pointsTitle: lang === 'en' ? 'Carbon Leakage (-10 GP)' : '一次性消耗流失 (-10 GP)',
        alternatives: lang === 'en' 
          ? [
               "Switch to personal steel mugs (Avoids 120g CO2 footprint).",
               "Grab reusable cups in the office pantry."
            ]
          : [
               "建议改用个人常备杯（每次能省下 120g 碳足迹）",
               "领用茶歇间高温消毒的共享马克杯"
            ],
        statCompare: lang === 'en'
          ? "Paper cups represent 14% of trash. 82% of R&D team have switched to steel mugs."
          : "诊断对比：纸杯废弃占生活垃圾的14%。目前研发部门 82% 的同仁已转换用常备水杯。",
        confidence: lang === 'en'
          ? "Confidence: High (94.0%)"
          : "数据置信度：高 (94.0% 对齐固体废弃物模型)",
        citation: lang === 'en'
          ? "UNEP LCA Factors"
          : "联合国环境署生命周期排放标准"
      };
    }

    // Commuting / Cycling
    if (lower.includes('骑车') || lower.includes('地铁') || lower.includes('公交') || lower.includes('commute') || lower.includes('bike') || lower.includes('metro') || lower.includes('cycle') || lower.includes('walking') || lower.includes('walk')) {
      setTimeout(() => onLogBehavior('green_commuting', 5, 60), 1000);
      return {
        type: 'success',
        pointsModifier: 60,
        pointsTitle: lang === 'en' ? 'Green Commute Verified (+60 GP)' : '绿色通勤加分 (+60 GP)',
        alternatives: lang === 'en'
          ? [
              "Link public transportation cards to unlock double GP bonuses."
            ]
          : [
              "下次使用企业一卡通，可直接核算双倍薪点积分。"
            ],
        statCompare: lang === 'en'
          ? "Saved 1.2kg emission, placing you in top 19% of active green users."
          : "诊断对比：您今日的绿色出行共减免了 1.2kg 车辆尾气，表现在所属团队中领先前 19%。",
        confidence: lang === 'en'
          ? "Confidence: Exceptional (98.6%)"
          : "数据置信度：极高 (98.6% 支持通勤排班比对)",
        citation: lang === 'en'
          ? "US EPA Emission Factors"
          : "国家交通碳排放因子计量准则"
      };
    }

    // Electricity/Power saves
    if (lower.includes('关灯') || lower.includes('空调') || lower.includes('电脑') || lower.includes('power') || lower.includes('light') || lower.includes('electricity') || lower.includes('monitor')) {
      setTimeout(() => onLogBehavior('saving_electricity', 4, 24), 1000);
      return {
        type: 'success',
        pointsModifier: 24,
        pointsTitle: lang === 'en' ? 'Electricity Saved (+24 GP)' : '智慧用电设备省电加分 (+24 GP)',
        alternatives: lang === 'en'
          ? [
              "Set hardware monitors to auto-sleep style to prevent standby power waste."
            ]
          : [
              "配合设定终端5分钟闲置进入睡眠，每日为主路电网空载省电 45W。"
            ],
        statCompare: lang === 'en'
          ? "Power audit done. Outperforming 90% of team on device standby indicators."
          : "诊断对比：检测到您主动防用电耗散，本项优异表现已记入部门低碳节流底账。",
        confidence: lang === 'en'
          ? "Confidence: Medium (76.4%)"
          : "数据置信度：中等 (76.4% 结合本地分电度核验)",
        citation: lang === 'en'
          ? "GRI 302 Energy guidelines"
          : "GRI 302 能源行业核心计量披露规范"
      };
    }

    // Default response
    return {
      type: 'info',
      pointsModifier: 15,
      pointsTitle: lang === 'en' ? 'Low-Carbon Engagement (+15 GP)' : '亲环境意识打卡加分 (+15 GP)',
      alternatives: lang === 'en'
        ? [
            "Participate in the training modules to align habits with active roles."
          ]
        : [
            "点击进入低碳学习堂微课，解锁并匹配更多本岗位环境行为与集团的低碳行动实践。"
          ],
      statCompare: lang === 'en'
        ? "Consistent activity logging increases workplace daily awareness by 0.4%."
        : "诊断对比：稳定的记录对活跃团队氛围、降低办公耗损有显著正向溢出。",
      confidence: lang === 'en'
        ? "Confidence: Applying baseline guidelines template"
        : "数据置信度：系统已采用行业常态基准底账套算",
      citation: lang === 'en'
        ? "Behavioral Nudge Models"
        : "行为决策助推理论"
    };
  };

  const generateReply = (text: string) => {
    const meta = processInput(text);
    const lower = text.toLowerCase();
    
    let textReply = '';
    if (meta.type === 'warning') {
      textReply = lang === 'en'
        ? "Disposable utensil usage detected (-10 GP). Upstream plastics manufacturing generates 120g of avoidable carbon footprint. Please switch to reusable stainless cups to maintain your score."
        : "诊断反馈：检测到一次性杯具消耗 (-10 GP)。非循环包装制造会带来 120g 二氧化碳流失。建议下场打卡转换使用保温杯以稳定绿色得分。";
    } else if (lower.includes('骑车') || lower.includes('地铁') || lower.includes('公交') || lower.includes('commute') || lower.includes('bike') || lower.includes('metro') || lower.includes('cycle') || lower.includes('walking') || lower.includes('walk')) {
      textReply = lang === 'en'
        ? "Excellent green transit choice logged (+60 GP)! Zero-emission travel directly offsets 1.2kg of vehicle transit exhaust. Keep it up to lock double points soon."
        : "诊断反馈：低碳通勤登记成功 (+60 GP)！以共享骑行、地铁代步能即时减免 1.2kg 车辆尾气。建议继续坚持，明天出行能激发双倍能量！";
    } else if (lower.includes('关灯') || lower.includes('空调') || lower.includes('电脑') || lower.includes('power') || lower.includes('light') || lower.includes('electricity') || lower.includes('monitor')) {
      textReply = lang === 'en'
        ? "Workstation device electricity saved (+24 GP)! Disabling idle monitors saves 45W of empty grid draw. Let's make screen-sleep a daily leaving habit."
        : "诊断反馈：随手熄灯、离岗关机节流加分 (+24 GP)！清理工位待机用电可省下 45W grid 空载能耗。建议将个人电脑预设为 5分钟无操作自动休眠。";
    } else {
      textReply = lang === 'en'
        ? `Action "${text}" has been filed (+15 GP). Every logged environmental choice raises the team's active green index. Keep logging to grow your digital tree!`
        : `诊断反馈：日常绿色微习惯“${text}”已登记存证 (+15 GP)！稳定的行为可以即时增加所属团队的得分。建议每日随时打卡记录！`;
    }

    return {
      text: textReply,
      meta
    };
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: CoachMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const replyParts = generateReply(userMsg.text);
      const aiMsg: CoachMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyParts.text,
        timestamp: new Date(),
        meta: replyParts.meta
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1200);
  };

  // Preset chips (the user can click to test)
  const PRESET_PROMPTS = [
    { labelEn: "I used paper cups", labelZh: "我今天用了纸面杯" },
    { labelEn: "I commuted by bike", labelZh: "我地铁骑车绿色出行" },
    { labelEn: "I turned off pantry lights", labelZh: "我午休随手关闭了排灯" }
  ];

  const t = {
    cardTitle: lang === 'en' ? 'AI Green Coach' : 'AI 智能绿色教练',
    tagline: lang === 'en' ? 'Cognitive Behavioral Feedback & Nudges' : '认知行为反馈与企业 PEB 行为干预',
    placeholder: lang === 'en' ? 'E.g., "I left my monitor running all night" or "Cycled 5km"' : '示例：“我今日外出乘了地铁”、“我忘了随手关电脑”...',
    btnSend: lang === 'en' ? 'Evaluate' : '行为诊断',
    suggestTitle: lang === 'en' ? 'Low-Carbon Alternative Recommendations' : 'AI 给您的低碳替代方案与规范推荐:',
    socialStand: lang === 'en' ? 'Peer Standings Nudge' : '同侪群组低碳压力对照:',
    presetTitle: lang === 'en' ? 'Try these behaviors:' : '快捷投喂干预场景样本:',
    statsHeading: lang === 'en' ? 'PEB Habits Engine' : '个人低碳成就塑造行为转化率(PEB)',
    habitScore: lang === 'en' ? 'Habit Score' : '当前利他环保意识(PEB)',
    vol: lang === 'en' ? 'Workspace Engagement' : '低碳事务参与密度',
    carbonLabel: lang === 'en' ? 'Verified Carbon Avoided' : '核定累计避碳损耗'
  };

  return (
    <div id="ai_coach_view" className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-5">
        
        {/* Module Header wrapper */}
        <div className="flex items-start justify-between">
          <div>
            <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide inline-flex items-center gap-1.5 mb-2 border border-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
              MODEL THESIS COMPLIANT
            </span>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 font-display flex items-center gap-2">
              {t.cardTitle}
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{t.tagline}</p>
          </div>
          
          <div className="bg-slate-50 border border-slate-150 rounded-2xl p-3.5 text-right hidden sm:block">
            <span className="block text-[8px] text-slate-400 uppercase font-bold">{t.habitScore}</span>
            <span className="font-mono font-black text-rose-600 text-lg">94%</span>
          </div>
        </div>

        {/* Dynamic PEB state highlights grid matching your thesis style */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-50/50 hover:bg-emerald-100/30 border border-emerald-100 p-3 rounded-2xl transition-all">
            <span className="text-slate-400 block text-[8px] uppercase font-bold">{t.vol}</span>
            <span className="font-mono text-xs font-black text-emerald-800 block mt-1">12次 / 周</span>
            <span className="text-[9px] text-emerald-600">超65%同仁</span>
          </div>
          <div className="bg-sky-50/50 hover:bg-sky-100/30 border border-sky-100 p-3 rounded-2xl transition-all">
            <span className="text-slate-400 block text-[8px] uppercase font-bold">{t.carbonLabel}</span>
            <span className="font-mono text-xs font-black text-sky-800 block mt-1">12.8 kg</span>
            <span className="text-[9px] text-sky-600">已冲治沙一木</span>
          </div>
          <div className="bg-amber-50/50 hover:bg-amber-100/30 border border-amber-100 p-3 rounded-2xl transition-all">
            <span className="text-slate-400 block text-[8px] uppercase font-bold">{lang === 'en' ? 'Carbon Reductions' : '低碳负罪感抑制率'}</span>
            <span className="font-mono text-xs font-black text-amber-800 block mt-1">92%</span>
            <span className="text-[9px] text-amber-600">无纸办公高达95%</span>
          </div>
        </div>

        {/* Chat log wrapper */}
        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 min-h-[220px] max-h-[340px] overflow-y-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-normal ${
                  msg.sender === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none font-medium' 
                    : 'bg-white border border-slate-150 text-slate-800 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}

                  {/* Recommendations & cognitive corrections */}
                  {msg.meta && (
                    <div className="mt-3.5 pt-3.5 border-t border-slate-100 space-y-3">
                      
                      {msg.meta.pointsTitle && (
                        <div className="flex items-center gap-1.5 font-bold text-[10.5px] uppercase font-mono">
                          {msg.meta.type === 'warning' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-orange-500 fill-orange-100" />
                          ) : (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                          )}
                          <span className={msg.meta.type === 'warning' ? 'text-orange-600' : 'text-emerald-700'}>
                            {msg.meta.pointsTitle}
                          </span>
                        </div>
                      )}

                      {msg.meta.alternatives && msg.meta.alternatives.length > 0 && (
                        <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-150 text-[10.5px] text-slate-600 font-medium">
                          <span className="block font-bold text-slate-700 uppercase tracking-tight text-[8px] mb-1">
                            {t.suggestTitle}
                          </span>
                          {msg.meta.alternatives.map((alt, i) => (
                            <div key={i} className="flex items-start gap-1">
                              <ArrowRight className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{alt}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.meta.statCompare && (
                        <div className="text-[10px] text-slate-400 font-medium leading-relaxed bg-slate-50/50 p-2.5 rounded-lg border border-slate-100/50">
                          <strong className="text-slate-600">{t.socialStand}</strong> {msg.meta.statCompare}
                        </div>
                      )}

                      {msg.meta.confidence && (
                        <div className="flex flex-col gap-1 p-2.5 rounded-lg border text-[9.5px] mt-2 bg-slate-50/70 border-slate-150">
                          <div className="font-bold flex items-center gap-1 text-[9px]">
                            <span className={`w-1.5 h-1.5 rounded-full ${msg.meta.type === 'info' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            <span className="text-slate-700 uppercase">{lang === 'en' ? 'Data Quality Attribution' : '数据置信度等级与存证溯源'}</span>
                          </div>
                          <div className="text-slate-600 font-mono text-[9px]">{msg.meta.confidence}</div>
                          {msg.meta.citation && (
                            <div className="text-[8.5px] text-slate-400 italic font-medium pt-1 border-t border-slate-200 mt-1">
                              📂 {lang === 'en' ? 'Audit Standard Reference:' : '审计规范指南引用:'} {msg.meta.citation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[8px] text-slate-400 font-mono mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex items-center justify-start gap-2.5 text-slate-400 text-[11px] font-bold px-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>AI is thinking about your carbon impact...</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        {/* Preset tags for instant interactive test */}
        <div className="mb-3">
          <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1.5">{t.presetTitle}</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROMPTS.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInputText(lang === 'en' ? p.labelEn : p.labelZh)}
                className="text-[10px] bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200 transition-all cursor-pointer"
              >
                {lang === 'en' ? p.labelEn : p.labelZh}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="flex gap-2.5">
          <input
            id="ai_coach_input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 border border-slate-200 focus:border-emerald-500 rounded-2xl px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/10 min-w-0"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-2xl bg-slate-900 text-white hover:bg-emerald-600 font-extrabold text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.btnSend}</span>
          </button>
        </form>
      </div>

    </div>
  );
}
