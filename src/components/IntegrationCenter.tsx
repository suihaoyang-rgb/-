/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Database, Link, RefreshCw, Check, AlertCircle, 
  Sparkles, BookOpen, Award, ExternalLink, ShieldCheck, CheckCircle
} from 'lucide-react';

interface IntegrationCenterProps {
  onLogBehavior: (behaviorId: string, quantity: number, pointsEarned: number) => void;
  lang: 'en' | 'zh';
}

interface CalendarEvent {
  id: string;
  titleEn: string;
  titleZh: string;
  date: string;
  points: number;
  type: 'workshop' | 'cleanup' | 'commute' | 'recycle';
  status: 'pending' | 'claimed' | 'syncing';
  organizer: string;
}

interface HrCourse {
  id: string;
  titleEn: string;
  titleZh: string;
  points: number;
  certCode: string;
  status: 'locked' | 'completed' | 'synced';
}

export default function IntegrationCenter({ onLogBehavior, lang }: IntegrationCenterProps) {
  const [activeTab, setActiveTab] = useState<'calendar' | 'hr'>('calendar');
  const [isCalendarConnected, setIsCalendarConnected] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial Calendar Events
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: 'cal-1',
      titleEn: 'CSR & Sustainability Practices Workshop (Q2)',
      titleZh: '企业CSR与绿色可持续发展讲座 (第二季度)',
      date: '2026-05-24',
      points: 120,
      type: 'workshop',
      status: 'pending',
      organizer: 'Corporate CSR Dept'
    },
    {
      id: 'cal-2',
      titleEn: 'Voluntary Carbon Neutral Forest Planting Init',
      titleZh: '团队志愿温室碳中和荒漠植树公益挑战会',
      date: '2026-05-20',
      points: 200,
      type: 'cleanup',
      status: 'pending',
      organizer: 'Operations & Community'
    },
    {
      id: 'cal-3',
      titleEn: 'Smart Low Carbon Commute & Cycling Week Info',
      titleZh: '企业低碳智慧通勤暨微移动骑行周宣讲会',
      date: '2026-05-22',
      points: 80,
      type: 'commute',
      status: 'pending',
      organizer: 'Engineering Carbon Club'
    },
    {
      id: 'cal-4',
      titleEn: 'E-Waste & Electronics Scrap Safe Reclamation Drive',
      titleZh: '电子垃圾与老旧设备安全下线回收利用专场',
      date: '2026-05-18',
      points: 150,
      type: 'recycle',
      status: 'pending',
      organizer: 'IT Asset Support Group'
    }
  ]);

  // Initial HR Completed Courses in LMS
  const [hrCourses, setHrCourses] = useState<HrCourse[]>([
    { id: 'hr-1', titleEn: 'Introduction to Corporate Circular Economy & Net-Zero', titleZh: '企业循环经济与低碳净零战略入门课', points: 150, certCode: 'CERT-NZ-2026-880', status: 'completed' },
    { id: 'hr-2', titleEn: 'Office Waste Sorting, Dual Sided Printing Guidelines', titleZh: '办公室垃圾分类与低能耗无纸化双面打印细则', points: 60, certCode: 'CERT-PRNT-2026-104', status: 'completed' },
    { id: 'hr-3', titleEn: 'Smart Energy Conservation in Enterprise Core Facilities', titleZh: '企业数据中心与核心机能设施智能节能技术规范', points: 200, certCode: 'CERT-POW-2026-302', status: 'locked' }
  ]);

  // Toast handler
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Connect Google Calendar Simulation
  const handleConnectCalendar = () => {
    if (isCalendarConnected) {
      setIsCalendarConnected(false);
      // Reset statuses
      setCalendarEvents(prev => prev.map(e => ({ ...e, status: 'pending' })));
      showToast(lang === 'en' ? 'Disconnected from Google Calendar.' : '已成功断开 Google Calendar 日历服务。');
    } else {
      setIsSyncing(true);
      setTimeout(() => {
        setIsCalendarConnected(true);
        setIsSyncing(false);
        showToast(lang === 'en' ? 'Successfully authenticated with Workspace. Found 4 carbon activities!' : '谷歌 Workspace 授权通过！日历云端检索出 4 个符合可持续认证的企业活动。');
      }, 1200);
    }
  };

  // Sync specific Calendar Activity
  const handleClaimEventPoints = (id: string, points: number, title: string) => {
    setCalendarEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'claiming' as any } : e));
    
    // Simulate web api verification request
    setTimeout(() => {
      setCalendarEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'claimed' } : e));
      onLogBehavior('participate_activities', 1, points);
      
      const successMsg = lang === 'en' 
        ? `Successfully synced event "${title}"! Recieved +${points} Gold Points in your Forest.`
        : `成功同步活动 "${title}"！奖励 +${points} 绿色积分。请至能量林收获！`;
      showToast(successMsg);
    }, 1000);
  };

  // Simulate HR Webhook integration triggers
  const handleSyncHrCourse = (id: string, title: string, points: number) => {
    setHrCourses(prev => prev.map(c => c.id === id ? { ...c, status: 'synced' } : c));
    onLogBehavior('participate_activities', 1, points);
    
    const successMsg = lang === 'en'
      ? `HR System Webhook triggered! Complete Course Cert verified. Recieved +${points} GP!`
      : `HR Webhook 校验通过！员工完课资质已完成链上认证。已派发 +${points} GP 积分！`;
    showToast(successMsg);
  };

  // Dynamic Translations
  const t = {
    title: lang === 'en' ? 'Enterprise Smart Integrations' : '企业服务智能集成中心',
    desc: lang === 'en' 
      ? 'Automatically sync and redeem carbon initiatives and environmental credentials from enterprise Workspace Calendar and HR learning portals.'
      : '无缝绑定企业 Workspace 办公日历、Workday HR 培训、钉钉等管理门户，自动发现并转化绿色公益分，告别繁琐的手工填写。',
    tabCalendar: lang === 'en' ? 'Google Calendar Sync' : '企业日历定时扫描',
    tabHr: lang === 'en' ? 'HR / Workday Learning Sync' : 'Workday HR 培训资质核证',
    btnConnect: lang === 'en' ? 'Connect Corporate Workspace Calendar' : '连接谷歌 Workspace 企业日历',
    btnDisconnect: lang === 'en' ? 'Disconnect Calendar' : '断开日历连接',
    btnClaims: lang === 'en' ? 'Sync Points' : '同步获取积分',
    btnClaimed: lang === 'en' ? 'Points Awarded' : '积分已发放',
    notConnected: lang === 'en' ? 'Google Calendar is currently disconnected.' : '云端日历处于离线状态。请绑定账号以启动自动加分。',
    connectedDesc: lang === 'en' 
      ? 'Successfully connected. Below are carbon activities detected from your corporate events:'
      : '日历自动扫描已激活！系统自动识别含 “碳”、“低碳”、“环保”、“公益” 关键字的有考勤记录的企业事件：',
    hrSubHeader: lang === 'en' ? 'Verified Course Achievements' : '数字证书验证与自动化同步（LMS / Webhooks）',
    hrDesc: lang === 'en'
      ? 'The LMS integration detects whenever an employee finishes certified ESG training courses and issues certificates with unique hashes, rewarding them instantly.'
      : '系统连接底层企业学习管理后台。一旦检测到员工完成指定的 ESG、无纸化办公科普、废弃物回收技术培训课，自动验证证书并累加积分。',
    certCodeLabel: lang === 'en' ? 'Certificate Hash:' : '完课核销码:',
    statusLocked: lang === 'en' ? 'Course Locked' : '课程尚未解锁',
    statusCompleted: lang === 'en' ? 'Verification Needed' : '等待同步加分',
    statusSynced: lang === 'en' ? 'Points Distributed' : '完成同步加分'
  };

  return (
    <div id="smart_integration_card" className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Header Title with animated integration core badge */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 font-display flex items-center gap-2">
            <span className="p-1.5 bg-sky-50 text-sky-600 rounded-lg">
              <Database className="w-5 h-5" />
            </span>
            {t.title}
          </h2>
          <span className="text-[10px] bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full font-bold border border-sky-200 animate-pulse">
            API Sync Auto-Reward
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          {t.desc}
        </p>

        {/* Tab Headers */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-5 border border-slate-150">
          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'calendar' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-150/50' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            {t.tabCalendar}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hr')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'hr' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-150/50' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {t.tabHr}
          </button>
        </div>

        {/* Tab 1: Calendar Integration UI */}
        {activeTab === 'calendar' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-150 rounded-2xl transition-all">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl text-white ${isCalendarConnected ? 'bg-emerald-500' : 'bg-slate-400'}`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {isCalendarConnected ? (lang === 'en' ? 'Connected to Workspace' : '已成功连接谷歌日历') : (lang === 'en' ? 'Calendar Sync Offline' : '谷歌日历云端未同步')}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    {isCalendarConnected ? 'suihaoyang@khu.ac.kr • Active' : 'Enable auto-attendance compliance rewards'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConnectCalendar}
                disabled={isSyncing}
                className={`text-[10px] font-extrabold px-3.5 py-1.8 rounded-xl transition-all cursor-pointer shadow-sm ${
                  isCalendarConnected 
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100/50' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isSyncing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : isCalendarConnected ? (
                  t.btnDisconnect
                ) : (
                  lang === 'en' ? 'Authorize Google Auth' : '谷歌授权绑定'
                )}
              </button>
            </div>

            {/* List of Scanned Calendar Events */}
            {!isCalendarConnected ? (
              <div className="p-6 border border-dashed border-slate-200 rounded-3xl text-center bg-slate-50/30">
                <AlertCircle className="w-8 h-8 text-slate-350 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">{t.notConnected}</p>
                <div className="mt-4 flex flex-col gap-1 text-[10px] text-slate-400 max-w-xs mx-auto">
                  <span className="flex items-center gap-1.5 justify-center">✔️ 识别 “Sustainability”, “Clean-up”, “环保”, “低碳” 等关键字</span>
                  <span className="flex items-center gap-1.5 justify-center">✔️ 配合企业考勤打卡，100% 自动派发社交与倡导GP积分</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  {t.connectedDesc}
                </p>

                <div className="space-y-2.5">
                  {calendarEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="p-3 bg-white border border-slate-100 hover:border-sky-100 rounded-2xl flex items-center justify-between gap-3 shadow-xs hover:shadow-sm transition-all"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100 uppercase uppercase-none">
                            {event.organizer}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">{event.date}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 leading-snug truncate">
                          {lang === 'en' ? event.titleEn : event.titleZh}
                        </h4>
                        <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600 font-semibold font-mono">
                          <span>+{event.points} GP</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[9px] text-slate-400 font-normal">Social Advocacy Pillar S</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={event.status === 'claimed' || event.status === 'syncing'}
                        onClick={() => handleClaimEventPoints(event.id, event.points, lang === 'en' ? event.titleEn : event.titleZh)}
                        className={`text-[10px] font-extrabold px-3 py-1.5 rounded-xl shrink-0 transition-all cursor-pointer ${
                          event.status === 'claimed' 
                            ? 'bg-slate-100 text-slate-400 border border-slate-200' 
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
                        }`}
                      >
                        {event.status === 'claimed' ? (
                          <span className="flex items-center gap-1 text-[9.5px]">
                            <Check className="w-3 h-3 text-emerald-600" />
                            {t.btnClaimed}
                          </span>
                        ) : (
                          t.btnClaims
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: HR / learning Integration UI */}
        {activeTab === 'hr' && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50/40 border border-emerald-100/50 rounded-2xl space-y-1">
              <h4 className="text-xs font-bold text-slate-850 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t.hrSubHeader}
              </h4>
              <p className="text-[10.5px] text-slate-500 leading-relaxed md:pr-4">
                {t.hrDesc}
              </p>
            </div>

            <div className="space-y-3">
              {hrCourses.map((course) => (
                <div 
                  key={course.id}
                  className="p-3.5 bg-white border border-slate-150/70 hover:border-emerald-200 rounded-2xl flex items-center justify-between gap-4 shadow-xs transition-all"
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <h5 className="text-xs font-bold text-slate-850 leading-relaxed">
                      {lang === 'en' ? course.titleEn : course.titleZh}
                    </h5>

                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">+{course.points} GP</span>
                      <span className="text-slate-300">•</span>
                      <div className="text-[9.5px] text-slate-400 font-mono flex items-center gap-1">
                        <span>{t.certCodeLabel}</span>
                        <span className="font-bold underline text-slate-550">{course.certCode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cert Button interaction */}
                  <button
                    type="button"
                    disabled={course.status === 'locked' || course.status === 'synced'}
                    onClick={() => handleSyncHrCourse(course.id, lang === 'en' ? course.titleEn : course.titleZh, course.points)}
                    className={`text-[10px] font-extrabold px-3 py-1.8 rounded-xl shrink-0 transition-all ${
                      course.status === 'synced'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : course.status === 'locked'
                        ? 'bg-slate-100 text-slate-350 border border-slate-150 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-sm cursor-pointer'
                    }`}
                  >
                    {course.status === 'synced' ? (
                      <span className="flex items-center gap-0.5">
                        <CheckCircle className="w-3.5 h-3.5 fill-emerald-100" />
                        {t.statusSynced}
                      </span>
                    ) : course.status === 'locked' ? (
                      t.statusLocked
                    ) : (
                      lang === 'en' ? 'Verify Certificate' : '验证/同步加分'
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Webhook API Information block */}
            <div className="bg-slate-50 border border-slate-150 rounded-2.5xl p-4.5 space-y-2">
              <span className="text-[8px] font-bold font-mono tracking-wider text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded border border-slate-250 uppercase">
                Integration Protocol Spec (企业开发集成文档)
              </span>
              <p className="text-[10px] text-slate-500 leading-normal">
                {lang === 'en' 
                  ? 'Your HR can configure corporate learning triggers to hit your system securely via post requests:'
                  : '开发者可使用 Webhook 将系统与企业自建 HR 服务或第三方生态联动（如飞书/钉钉打卡系统），发送安全请求实现：'}
              </p>
              <div className="bg-slate-900 text-sky-400 text-[10px] p-2.5 rounded-xl font-mono overflow-x-auto whitespace-pre">
                {`POST /api/v1/hr-event-webhook
Headers: { "Authorization": "Bearer SECREC_TOKEN" }
Payload: { "uid": "suihaoyang@khu.ac.kr", "action": "workshop", "points": 120 }`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating success toast message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-4 p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs rounded-xl flex items-start gap-2.5 shadow-md shadow-indigo-500/5"
          >
            <Sparkles className="w-4 h-4 text-indigo-650 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '3s' }} />
            <div className="flex-1">
              <span className="font-bold">{lang === 'en' ? 'Sync Core Updated!' : '集成云端同步成功！'}</span> {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
