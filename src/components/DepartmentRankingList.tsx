/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DepartmentRanking, Teammate } from '../types';
import { Trophy, Users, RefreshCw, Flame, HelpCircle, ArrowUpRight, Award, Check } from 'lucide-react';

interface DepartmentRankingListProps {
  departments: DepartmentRanking[];
  teammates: Teammate[];
  userDepartment: string;
  onSwitchDepartment: (deptName: string) => void;
  userPoints: number;
  userCarbonReduced: number;
  lang?: 'en' | 'zh';
}

export default function DepartmentRankingList({
  departments,
  teammates,
  userDepartment,
  onSwitchDepartment,
  userPoints,
  userCarbonReduced,
  lang = 'zh',
}: DepartmentRankingListProps) {
  const [activeTab, setActiveTab] = useState<'departments' | 'teammates'>('departments');
  const [showSwitchMenu, setShowSwitchMenu] = useState<boolean>(false);

  // Filter and enrich teammate list dynamically based on active user points
  const getDynamicTeammates = (): Teammate[] => {
    return teammates.map(t => {
      if (t.id === 'tm-1') {
        return {
          ...t,
          department: userDepartment,
          totalPoints: userPoints,
          carbonReducedKg: userCarbonReduced
        };
      }
      return t;
    }).sort((a, b) => b.totalPoints - a.totalPoints);
  };

  const dynamicTeammates = getDynamicTeammates();

  // Translations for departments and departments headings
  const translateDept = (deptName: string) => {
    if (lang === 'en') return deptName;
    switch (deptName) {
      case 'Engineering & Tech': return '工程研发部';
      case 'Operations & HR': return '运营与行政人力';
      case 'Marketing & PR': return '市场与公共关系部';
      case 'Design & Product': return '设计与产品体验部';
      case 'Finance & Sales': return '财务与大客户销售';
      default: return deptName;
    }
  };

  const t = {
    title: lang === 'en' ? 'Impact Leaderboard' : '企业低碳风云榜',
    subTitle: lang === 'en' ? 'Check how your department matches against the organization' : '查看您所属的中心在全企业中的低碳排名与荣誉',
    tabDepts: lang === 'en' ? 'Departments' : '组织机构榜',
    tabTeammates: lang === 'en' ? 'Teammate Ranks' : '低碳行者排位',
    myDivision: lang === 'en' ? 'My Division' : '我代表的团队',
    switchBtn: lang === 'en' ? 'Switch Department' : '切换代表团队',
    switchLabel: lang === 'en' ? 'Represent another branch:' : '选择需要效力的其他中心部门:',
    thRank: lang === 'en' ? 'Rank' : '名次',
    thDept: lang === 'en' ? 'Department' : '代表中心',
    thCarbon: lang === 'en' ? 'Carbon Reduced' : '绿化二氧化碳减碳量',
    thAvgPoints: lang === 'en' ? 'Avg GP / User' : '人均 GP 水平',
    thTotalPoints: lang === 'en' ? 'Total points' : '整队总能积攒',
    thTeammate: lang === 'en' ? 'Teammate' : '开拓者',
    thEcoFootprint: lang === 'en' ? 'Total GP' : '贡献总绿色 GP',
    thCarbonWeight: lang === 'en' ? 'CO₂ offset' : '抵碳环保总量',
    currentUserTag: lang === 'en' ? 'ME' : '您',
    statusEnthusiast: lang === 'en' ? 'Active' : '今日活跃',
    streakDay: lang === 'en' ? 'd streak' : '天极光打卡'
  };

  return (
    <div id="rankings_dashboard" className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Header and Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 font-display flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-100" />
              {t.title}
            </h2>
            <p className="text-[11px] text-slate-500 mt-1">{t.subTitle}</p>
          </div>

          <div className="flex bg-slate-50 border border-slate-150 rounded-xl p-1 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('departments')}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'departments' 
                  ? 'bg-white text-emerald-800 shadow'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.tabDepts}
            </button>
            <button
              onClick={() => setActiveTab('teammates')}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'teammates' 
                  ? 'bg-white text-emerald-800 shadow'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.tabTeammates}
            </button>
          </div>
        </div>

        {/* Outer Highlight of user's department representation */}
        <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-3.5 mb-5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-emerald-700" />
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-semibold">{t.myDivision}</span>
              <span className="font-extrabold text-slate-850 font-display">{translateDept(userDepartment)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowSwitchMenu(!showSwitchMenu)}
            className="flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-700 bg-white hover:bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin" style={{ animationDuration: '8s' }} />
            {t.switchBtn}
          </button>
        </div>

        {/* Switch Department Dropdown / selector list */}
        {showSwitchMenu && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-5 space-y-2">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-1">{t.switchLabel}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {departments.map((d) => (
                <button
                  key={d.department}
                  onClick={() => {
                    onSwitchDepartment(d.department);
                    setShowSwitchMenu(false);
                  }}
                  className={`text-[10.5px] font-bold text-left px-3 py-2 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    userDepartment === d.department
                      ? 'bg-emerald-100/50 text-emerald-900 border-emerald-300'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-150'
                  }`}
                >
                  {translateDept(d.department)}
                  {userDepartment === d.department && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboards layout rendering */}
        {activeTab === 'departments' ? (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs text-slate-500 whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-2">{t.thRank}</th>
                  <th className="py-2.5 px-2">{t.thDept}</th>
                  <th className="py-2.5 px-2 text-right">{t.thCarbon}</th>
                  <th className="py-2.5 px-2 text-right">{t.thAvgPoints}</th>
                  <th className="py-2.5 px-2 text-right">{t.thTotalPoints}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {departments.map((dept, index) => {
                  const isUserGroup = dept.department === userDepartment;
                  // Get actual beautiful index badges
                  const getBadgeRank = (r: number) => {
                    if (r === 1) return <span className="w-5 h-5 bg-amber-100 border border-amber-300 text-amber-700 text-[10px] font-black rounded-full flex items-center justify-center">1</span>;
                    if (r === 2) return <span className="w-5 h-5 bg-slate-100 border border-slate-300 text-slate-700 text-[10px] font-black rounded-full flex items-center justify-center">2</span>;
                    if (r === 3) return <span className="w-5 h-5 bg-orange-100 border border-orange-350 text-orange-700 text-[10px] font-black rounded-full flex items-center justify-center">3</span>;
                    return <span className="w-5 h-5 text-slate-400 font-mono text-[11px] font-bold flex items-center justify-center">{r}</span>;
                  };

                  return (
                    <tr 
                      key={dept.department} 
                      className={`hover:bg-slate-50 transition-colors ${
                        isUserGroup ? 'bg-emerald-50/20 font-semibold text-slate-900 border-l-2 border-l-emerald-500' : ''
                      }`}
                    >
                      <td className="py-3 px-2 flex items-center">
                        {getBadgeRank(index + 1)}
                      </td>
                      <td className="py-3 px-2 font-display">
                        <div className="flex flex-col">
                          <span className="font-extrabold text-slate-800">
                            {translateDept(dept.department)}
                          </span>
                          {isUserGroup && (
                            <span className="text-[8.5px] text-emerald-600 font-semibold uppercase">{lang === 'en' ? 'My division' : '我代表团队'}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right font-mono font-bold text-teal-800">
                        {(dept.carbonReducedKg || 0).toFixed(1)} <span className="text-[10px] font-normal text-slate-400">kg</span>
                      </td>
                      <td className="py-3 px-2 text-right font-mono text-slate-600">
                        {dept.averagePoints}
                      </td>
                      <td className="py-3 px-2 text-right font-mono font-extrabold text-emerald-800 text-sm">
                        {dept.totalPoints}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-3">
            {dynamicTeammates.map((teammate, idx) => {
              const isUser = teammate.id === 'tm-1';
              const teammateAvatar = (teammate as any).avatar || (teammate.name ? teammate.name.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() : '🌿');
              const streakDays = (teammate as any).streakDays || Math.floor((teammate.id === 'tm-1' ? 4 : (teammate.totalPoints % 5) + 2));
              
              return (
                <div
                  key={teammate.id}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isUser
                      ? 'bg-emerald-50/30 border-emerald-250 ring-1 ring-emerald-500/10'
                      : 'bg-slate-50/40 border-slate-100 hover:border-slate-250/90 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Number Circle */}
                    <div className="w-5 text-center font-mono text-sm font-extrabold text-slate-400">
                      {idx + 1}
                    </div>

                    {/* Avatar Badge */}
                    <div className="relative">
                      <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${
                        isUser 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}>
                        {teammateAvatar}
                      </div>
                      
                      {/* Active Streak Dot badge */}
                      {streakDays > 1 && (
                        <div className="absolute -bottom-1 -right-1 bg-amber-450 text-[8px] px-1.2 py-0.2 rounded-full font-black text-rose-950 font-mono shadow-xs border border-white flex items-center gap-0.5" title="Sustainable Streak">
                          <Flame className="w-2 h-2 text-orange-950 fill-orange-950" />
                          <span>{streakDays}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-slate-850">
                          {isUser ? `suihaoyang ${lang === 'en' ? '(Me)' : '(您)'}` : teammate.name}
                        </span>
                        
                        {isUser && (
                          <span className="text-[8px] bg-emerald-600 text-white font-black px-1 rounded uppercase">
                            {t.currentUserTag}
                          </span>
                        )}
                      </div>
                      <span className="text-[9.5px] text-slate-400 block mt-0.5">
                        {translateDept(teammate.department)} • <span className="text-rose-600/90 font-mono font-bold">{streakDays}{t.streakDay}</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block font-mono font-extrabold text-xs text-slate-850">
                      {teammate.totalPoints} <span className="text-[10px] font-normal text-slate-400">GP</span>
                    </span>
                    <span className="text-[9px] text-teal-700 block mt-0.5 font-mono">
                      -{(teammate.carbonReducedKg || 0).toFixed(1)}kg CO₂
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
          <span>{lang === 'en' ? 'Streaks calculate rolling logging frequencies.' : '连击指标通过滚动打卡考勤频率自动汇记。'}</span>
        </span>
        <span className="font-mono">Real-time sync active</span>
      </div>
    </div>
  );
}
