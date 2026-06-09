import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, TrendingUp, Calendar, ChevronRight, Sparkles, Heart, 
  MapPin, Milestone, CheckCircle2, ShieldAlert, FileText, Send 
} from 'lucide-react';

interface EmployeeJourneyProps {
  lang?: 'en' | 'zh';
  stats: {
    totalCarbonReducedKg: number;
    currentBalance: number;
    esgScore: number;
  };
}

export default function EmployeeJourney({ lang = 'zh', stats }: EmployeeJourneyProps) {
  // Weekly diary / reflection notes
  const [reflections, setReflections] = useState([
    {
      id: 'ref-1',
      date: '2026-05-24',
      mood: '🌿 Positive',
      text: lang === 'en' 
        ? 'Successfully commuted via e-bike for 4 continuous days. Felt very energetic and directly reduced ~2.4kg checkout emission.' 
        : '这周连续 4 天骑行共享单车上下班。早晨在大自然中呼吸非常清爽，还顺便抵消了大约 2.4kg 的通勤碳排。',
      aiResponse: lang === 'en'
        ? 'Excellent habit momentum! Your Scope 3 commute resilience index is outstanding. “Your strongest sustainable habit is low-carbon commuting.” You are performing better than 72% of employees on this dimension.'
        : '优秀的低碳行为连贯性！您的 Scope 3 通勤韧性在同级群组中排名前 5%。“您的低碳通勤是当前最牢固的主导绿色习惯。” 本维度表现您已超越 72% 的企业同仁。'
    },
    {
      id: 'ref-2',
      date: '2026-05-20',
      mood: '🔥 Fatigue',
      text: lang === 'en'
        ? 'Had 3 continuous nights of overtime coding for the release. Forgotten to turn off some desk switches twice. Feeling slightly exhausted.'
        : '本周因为版本发布连续加了 3 天夜班。有两次离开工位时忘了关闭排插电源，感到有些精力衰减。',
      aiResponse: lang === 'en'
        ? 'We detect the deadline pressure. “Your recent overtime workload may be affecting your sustainability participation.” This is a completely realistic human fluctuation. Do not feel guilty; sustainable habits thrive with stress recovery.'
        : '诊断引擎已捕捉到您的版本期交付压力。“您近期增加的加班工作量可能开始对低碳微习惯产生心理摩擦。” 真实的习惯培养必然伴随波动期。无须自责，合理的能量回充与韧性修复是重建一致率的关键。'
    }
  ]);

  const [newReflection, setNewReflection] = useState('');
  const [newMood, setNewMood] = useState(lang === 'en' ? '🌿 Positive' : '🌿 积极饱满');
  const [reflectionToast, setReflectionToast] = useState(false);

  // Growth journey milestones list
  const MILESTONES = [
    {
      id: 'm-1',
      titleEn: 'Green Onboarding Complete',
      titleZh: '新晋探路者：ESG 赋能宣誓达成',
      descEn: 'Completed personal profile & took the zero-carbon workspace oath.',
      descZh: '完成个人低碳价值观拟合画像注册，成功宣誓入驻企业脱碳阵列。',
      status: 'completed',
      date: '2026-05-20'
    },
    {
      id: 'm-2',
      titleEn: 'First Weekly Reflection Logged',
      titleZh: '初涉微平衡：首次记录低碳感知周记',
      descEn: 'Unlocked emotional balance by logging weekly behavioral energy logs.',
      descZh: '成功撰写并归纳首周办公除碳的心流体悟，AI 介入赋能习惯诊断。',
      status: 'completed',
      date: '2026-05-24'
    },
    {
      id: 'm-3',
      titleEn: 'Paperless Champion Badge',
      titleZh: '无纸化隐士：单人省下半株速生白桦树',
      descEn: 'Achieved 100% digital duplex documentation compliance rates.',
      descZh: '双面无纸印制协同、电子财务发票核销，累计减免 500 张 A4 纸张负荷。',
      status: 'active',
      date: 'In Progress'
    },
    {
      id: 'm-4',
      titleEn: 'Carbon Neutral Pioneer 2026',
      titleZh: '低碳掌灯者：百公斤碳抵消圣杯称号',
      descEn: 'Accumulate 100kg of certified carbon balance equivalent in live trees.',
      descZh: '个人在林地或荒漠中累积置信减排当量达 100 kg，触发终极低碳称号。',
      status: 'locked',
      date: 'Locked'
    }
  ];

  const handleAddReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReflection.trim()) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const item = {
      id: `ref-${Date.now()}`,
      date: todayStr,
      mood: newMood,
      text: newReflection,
      aiResponse: lang === 'en'
        ? 'Insightful reflection accepted! Behavioral growth trajectory analyzed. Unlocked +15 PEB confidence points.'
        : '心流足迹已载入！AI 自动提炼分析：您的环保情绪对齐度十分健康，已成功解锁 15 个 PEB 自信心点数。'
    };

    setReflections([item, ...reflections]);
    setNewReflection('');
    setReflectionToast(true);
    setTimeout(() => setReflectionToast(false), 3000);
  };

  return (
    <div id="employee_journey_panel" className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs text-slate-700">
      
      {/* LEFT COLUMN: Personal growth trajectory & AI Habit Insights */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Weekly Reflection & Mindfulness logging */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <span>🌱</span>
                {lang === 'en' ? 'My Green Reflection Companion' : '低碳心流体悟与情感反射舱'}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {lang === 'en' 
                  ? 'Record your weekly sustainability feelings & hurdles. Strengthen long-term eco-habits.'
                  : '拒绝机械打卡，倾听内心声音。记录本周低碳执行时的困难与感触，形成有张力的人文低碳链。'}
              </p>
            </div>
          </div>

          <form onSubmit={handleAddReflection} className="space-y-3 font-bold">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-500 block">{lang === 'en' ? 'Current Feeling:' : '今日低碳状态感悟：'}</label>
                <select 
                  value={newMood} 
                  onChange={(e) => setNewMood(e.target.value)}
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-xs font-semibold focus:border-emerald-500 focus:outline-none"
                >
                  <option value={lang === 'en' ? '🌿 Positive' : '🌿 积极饱满'}>{lang === 'en' ? '🌿 Positive & Energetic' : '🌿 积极顺畅'}</option>
                  <option value={lang === 'en' ? '🔋 Challenged' : '🔋 感到挑战'}>{lang === 'en' ? '🔋 Overcoming Hurdles' : '🔋 受到瓶颈挑战'}</option>
                  <option value={lang === 'en' ? '💡 Mindfulness' : '💡 静悟沉思'}>{lang === 'en' ? '💡 Thoughtful & Skeptical' : '💡 脱水沉思与反思'}</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-slate-500 block">{lang === 'en' ? 'Linked Footprint Indicator:' : '行为足迹相关：'}</label>
                <input 
                  type="text" 
                  disabled 
                  value={lang === 'en' ? `Live ESG Score: ${stats.esgScore} pts` : `实拍能效分数: ${stats.esgScore} 分`}
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-xs text-slate-400 bg-slate-50 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-500 block">{lang === 'en' ? 'Weekly Reflection Text:' : '心流体悟随笔(记录您眼里的绿色环保瞬间/挑战)：'}</label>
              <textarea
                required
                rows={3}
                value={newReflection}
                onChange={(e) => setNewReflection(e.target.value)}
                placeholder={lang === 'en' 
                  ? "Describe what physical obstacles or green successes you ran into this week (e.g. Overtime strain, physical desk hurdles)..." 
                  : "例如：这星期天天加班真的好累，随手熄屏有点费神，但我还是挺过来了... 或者：点咖啡时让小哥帮我装进了自带杯中，省钱又干净..."}
                className="w-full border border-slate-200 p-3 rounded-2xl text-xs font-medium focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/10"
              />
            </div>

            {reflectionToast && (
              <div className="p-2.5 bg-emerald-600 text-white rounded-xl font-bold text-center text-[10.5px]">
                🎉 {lang === 'en' ? 'Reflection Logged! AI Coach has loaded this into your sustainability intelligence footprint.' : '足迹录入成功！AI 可持续诊断微引擎已更新您的综合低碳韧性指数。'}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-extrabold transition-all shadow-sm cursor-pointer flex justify-center items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Log My Green Reflection & Query AI Coach' : '封存低碳心流并唤醒 AI 情绪对齐分析'}</span>
            </button>
          </form>

          {/* Reflections List timeline */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block font-mono">
              {lang === 'en' ? 'Historical Reflection Footprints' : '已封存的低碳心流历史轴'}
            </span>

            <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto pr-1">
              {reflections.map((ref) => (
                <div key={ref.id} className="py-3 space-y-2 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-800">{ref.mood}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{ref.date}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">{ref.text}</p>
                  
                  {/* AI Response Card */}
                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600 animate-pulse" />
                      <span className="text-[9.5px] font-black uppercase text-slate-500 font-mono">AI Active Mentor Diagnostic:</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal font-medium">{ref.aiResponse}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Habit Insights & Behavioral Consistency charts */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              {lang === 'en' ? 'Deep AI Habit Insights & Consistency Metrics' : 'AI 亲环境习惯连贯性深度洞察'}
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {lang === 'en' ? 'Real-time indicators derived from physical office habit logs and department variables.' : '结合当前科室考勤、日常熄屏耗电及纸张替代行为自动加权推算的习惯形成画像。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Metric Box 1 */}
            <div className="p-4 bg-emerald-50/55 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[9px] text-emerald-800 font-black tracking-wider uppercase font-mono">
                {lang === 'en' ? 'Habit Consistency Trend' : '亲环境连贯度趋势'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-black text-emerald-900">82.4%</span>
                <span className="text-[9px] text-emerald-600 font-extrabold">+8.5% This Month</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold pt-1">
                {lang === 'en' 
                  ? '“Your sustainability consistency improved this month.” Outperforming 72% of employees in energy saving thresholds.' 
                  : '“您的低碳习惯一致率在本月有显著改善。” 本环节考核您当前已跑赢全集团平均 72% 的其他雇员。'}
              </p>
            </div>

            {/* Metric Box 2 */}
            <div className="p-4 bg-amber-50/55 rounded-2xl border border-amber-100 space-y-1">
              <span className="text-[9px] text-amber-805 font-black tracking-wider uppercase font-mono">
                {lang === 'en' ? 'Workplace Fatigue Coefficient' : '高强度交付干扰预警 (Strain)'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-black text-amber-900">Moderate</span>
                <span className="text-[9px] text-amber-600 font-extrabold">Recent Overtime Impact</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold pt-1">
                {lang === 'en'
                  ? '“Your recent overtime workload may be affecting your sustainability participation.” Monitor sleep features to save cognitive energy.'
                  : '“您近期的研发加班负荷可能开始对日常低碳打卡响应率形成摩擦。” 可先攻坚随手熄屏等低决策耗能事务。'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Milestone Journeys timeline */}
      <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
            <Milestone className="w-4 h-4 text-emerald-600" />
            {lang === 'en' ? 'My Milestone Sustainability Journey' : '个人可持续成长里程碑轴'}
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {lang === 'en' ? 'Track real, permanent growth increments on your career dossier.' : '记录您与集团绿色愿景并肩奋斗的实质印记，成果将同步计入年度雇员荣誉资历档案。'}
          </p>
        </div>

        {/* Milestone Steps Vertical Timeline */}
        <div className="space-y-5 pt-2 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100">
          {MILESTONES.map((ms) => (
            <div key={ms.id} className="flex gap-4 relative">
              
              {/* Timeline circle icon */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 border shadow-xs ${
                ms.status === 'completed' 
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                  : ms.status === 'active'
                  ? 'bg-amber-100 border-amber-400 text-amber-800 animate-pulse'
                  : 'bg-slate-100 border-slate-205 text-slate-400'
              }`}>
                {ms.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Award className="w-4 h-4" />
                )}
              </div>

              {/* Milestone Details text */}
              <div className="space-y-1 bg-slate-50/70 hover:bg-slate-50 transition-all p-3.5 rounded-2xl border border-slate-150 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-extrabold text-slate-800 leading-tight">
                    {lang === 'en' ? ms.titleEn : ms.titleZh}
                  </h4>
                  <span className="text-[8px] font-mono text-slate-400 tracking-tight shrink-0">
                    {ms.date}
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-455 font-medium leading-relaxed">
                  {lang === 'en' ? ms.descEn : ms.descZh}
                </p>

                {ms.status === 'active' && (
                  <div className="pt-2">
                    <span className="text-[8px] uppercase font-black px-2 py-0.5 bg-amber-500/10 text-amber-800 border border-amber-300/30 rounded font-mono">
                      {lang === 'en' ? 'ACTIVE FOCUS GOAL' : '今日核心攻关奋斗目标'}
                    </span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Career Impact disclaimer */}
        <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl text-[10px] text-slate-550 leading-relaxed font-medium">
          🛡️ <span className="font-extrabold text-slate-700">{lang === 'en' ? 'Verified Credentials:' : '低碳信用存证说明：'}</span>
          {lang === 'en' 
            ? 'All milestone achievements are written directly to your ESG profile metadata block, empowering personal green leader promotions.'
            : '所有里程碑通过企业内控数据存根核验，形成不可篡改的“碳信用印记”。年度审核时由人事部门一键导出，作为“绿色领导力/优秀雇员”晋升的关键考评要素。'}
        </div>

      </div>

    </div>
  );
}
