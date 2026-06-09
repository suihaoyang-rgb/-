/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GREEN_BEHAVIORS } from '../data';
import { GreenBehaviorType } from '../types';
import { 
  Bike, Printer, Lightbulb, CupSoda, Trash2, Calendar, 
  Leaf, Plus, Sparkles, Check, Zap, Info, ShieldAlert
} from 'lucide-react';

// Maps string icons to actual Lucide react elements
function renderBehaviorIcon(iconName: string, className?: string) {
  switch (iconName) {
    case 'Bike': return <Bike className={className} />;
    case 'Printer': return <Printer className={className} />;
    case 'Lightbulb': return <Lightbulb className={className} />;
    case 'CupSoda': return <CupSoda className={className} />;
    case 'Trash2': return <Trash2 className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    default: return <Leaf className={className} />;
  }
}

interface BehaviorLoggerProps {
  onLogBehavior: (behaviorId: string, quantity: number, pointsEarned: number) => void;
  lang?: 'en' | 'zh';
}

export default function BehaviorLogger({ onLogBehavior, lang = 'zh' }: BehaviorLoggerProps) {
  const [selectedBehavior, setSelectedBehavior] = useState<GreenBehaviorType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleSelect = (behavior: GreenBehaviorType) => {
    setSelectedBehavior(behavior);
    // Initialize default logical quantities per type
    if (behavior.id === 'green_commuting') setQuantity(5); // default 5 km
    else if (behavior.id === 'duplex_printing') setQuantity(10); // default 10 sheets
    else if (behavior.id === 'saving_electricity') setQuantity(4); // default 4 hours
    else if (behavior.id === 'reduce_disposables') setQuantity(1); // default 1 cup
    else if (behavior.id === 'recycle') setQuantity(2); // default 2 kg
    else if (behavior.id === 'participate_activities') setQuantity(1); // default 1 session
  };

  const calculatePoints = (behavior: GreenBehaviorType, qty: number) => {
    return behavior.pointsPerUnit * qty;
  };

  const estimateCarbonSaved = (behavior: GreenBehaviorType, qty: number) => {
    // Basic approximate conversions
    switch (behavior.id) {
      case 'green_commuting':
        return qty * 0.24; // 240g CO2 per km compared to average car
      case 'duplex_printing':
        return qty * 0.015; // 15g CO2 saved per sheet duplicated
      case 'saving_electricity':
        return qty * 0.38; // 380g CO2 saved per kWh equivalent
      case 'reduce_disposables':
        return qty * 0.12; // 120g CO2 offset per drink save
      case 'recycle':
        return qty * 1.15; // 1.15kg CO2 offset per 1kg paper recycling
      case 'participate_activities':
        return qty * 2.5; // High educational value multiplier
      default:
        return qty * 0.1;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBehavior) return;

    const points = calculatePoints(selectedBehavior, quantity);
    onLogBehavior(selectedBehavior.id, quantity, points);

    // Trigger success notification
    const behaviorName = lang === 'en' ? selectedBehavior.name : (selectedBehavior.nameZh || selectedBehavior.name);
    const carbonQty = estimateCarbonSaved(selectedBehavior, quantity).toFixed(2);
    setSuccessToast(
      lang === 'en' 
        ? `Behavior Logged! Verified +${points} GP and minimized carbon load by -${carbonQty}kg CO₂. [Credibility factor audited]`
        : `行为记录已存证！本次动作已审核获批：增量贡献 +${points} GP 并直接减少了约 ${carbonQty}kg CO₂ 碳流失折算。[经合规审计因子核审]`
    );
    setSelectedBehavior(null);

    setTimeout(() => {
      setSuccessToast(null);
    }, 5000);
  };

  const getPillarLabel = (category: string) => {
    switch (category) {
      case 'E': return { 
        label: lang === 'en' ? 'Environmental' : '环境 E', 
        colors: 'bg-emerald-100 text-emerald-800 border-emerald-250' 
      };
      case 'S': return { 
        label: lang === 'en' ? 'Social & Culture' : '社群 S', 
        colors: 'bg-blue-100 text-blue-800 border-blue-250' 
      };
      case 'G': return { 
        label: lang === 'en' ? 'Governance' : '治理 G', 
        colors: 'bg-purple-100 text-purple-800 border-purple-250' 
      };
      default: return { 
        label: lang === 'en' ? 'Pillar' : '责任支柱', 
        colors: 'bg-slate-100 text-slate-700' 
      };
    }
  };

  // Translations
  const t = {
    title: lang === 'en' ? 'Log Green Behavior' : '手工记一笔环保事',
    subTitle: lang === 'en' ? 'Carbon Offset Actions' : '低碳日常积分登记',
    desc: lang === 'en' 
      ? 'Select an environmental action you performed today to transform physical green deeds into corporate virtual points!'
      : '选择您今日完成的绿色环保事务，将微小而伟大的低碳修行录入平台，孕育您的企业公益能量！',
    cancel: lang === 'en' ? 'Cancel' : '取消',
    confirm: lang === 'en' ? 'Confirm & Spawn Bubble' : '确认并催生能量球',
    completedQ: lang === 'en' ? 'How many did you complete?' : '您今日完成了多少量？',
    pointsEarn: lang === 'en' ? 'Points Earned' : '积分获得',
    carbonSaved: lang === 'en' ? 'Carbon Reduced' : '二氧化碳减排折合',
    conversionTitle: lang === 'en' ? 'Conversion Impact:' : '减排环保贡献效能:',
    enterDetails: lang === 'en' ? 'Enter details:' : '登记事件详情:'
  };

  return (
    <div id="behavior_logger_section" className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 font-display flex items-center gap-2">
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <Zap className="w-5 h-5 fill-emerald-100" />
            </span>
            {t.title}
          </h2>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-semibold border border-slate-200">
            {t.subTitle}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          {t.desc}
        </p>

        {/* Behavior card triggers */}
        <div className="grid grid-cols-2 gap-3.5">
          {GREEN_BEHAVIORS.map((behavior) => {
            const pillar = getPillarLabel(behavior.category);
            const dispName = lang === 'en' ? behavior.name : (behavior.nameZh || behavior.name);
            const dispUnit = lang === 'en' ? behavior.unitName : (behavior.unitNameZh || behavior.unitName);

            return (
              <button
                type="button"
                key={behavior.id}
                id={`behavior_btn_${behavior.id}`}
                onClick={() => handleSelect(behavior)}
                className="group p-3.5 rounded-2xl border border-slate-100 hover:border-emerald-300 bg-slate-50/50 hover:bg-emerald-50/20 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div className="p-2.5 bg-white border border-slate-100 group-hover:border-emerald-100 rounded-xl text-slate-700 group-hover:text-emerald-700 shadow-sm transition-colors">
                    {renderBehaviorIcon(behavior.icon, "w-4 h-4")}
                  </div>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${pillar.colors} font-display uppercase`}>
                    {pillar.label}
                  </span>
                </div>
                
                <h3 className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 truncate">
                  {dispName}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  +{behavior.pointsPerUnit} GP / {dispUnit}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Success alert message overlay */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-3 bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs rounded-xl flex items-start gap-2.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
            <div className="flex-1">
              <span className="font-bold">{lang === 'en' ? 'Action Confirmed!' : '记账低碳修行!'}</span> {successToast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input popup dialog */}
      <AnimatePresence>
        {selectedBehavior && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-150"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                    {renderBehaviorIcon(selectedBehavior.icon, "w-5 h-5")}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 font-display">
                      {t.enterDetails} {lang === 'en' ? selectedBehavior.name : (selectedBehavior.nameZh || selectedBehavior.name)}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium">Logged live as employee carbon deed</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBehavior(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-xs bg-slate-150 px-2.5 py-1 rounded-full cursor-pointer"
                >
                  {t.cancel}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.completedQ}{' '}
                    <span className="text-emerald-700 uppercase">
                      {lang === 'en' ? selectedBehavior.unitName : (selectedBehavior.unitNameZh || selectedBehavior.unitName)}
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      id="logging_quantity_input"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 border border-slate-250 rounded-xl px-4 py-2.5 text-center font-mono font-bold text-slate-800 focus:outline-none focus:border-emerald-500 text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Info Card with dynamic computation live update */}
                <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100 space-y-2.5">
                  <p className="text-[11px] text-emerald-950 font-medium leading-relaxed">
                    🌟 {lang === 'en' ? selectedBehavior.description : (selectedBehavior.descriptionZh || selectedBehavior.description)}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2.5 border-t border-emerald-100/50">
                    <div>
                      <span className="block text-[9px] text-slate-400 uppercase font-semibold">{t.pointsEarn}</span>
                      <span className="text-base font-mono font-extrabold text-emerald-750">
                        {calculatePoints(selectedBehavior, quantity)} <span className="text-xs font-normal text-slate-400">GP</span>
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 uppercase font-semibold">{t.carbonSaved}</span>
                      <span className="text-base font-mono font-extrabold text-emerald-750">
                        {estimateCarbonSaved(selectedBehavior, quantity).toFixed(2)} <span className="text-xs font-normal text-slate-400">kg</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtext info */}
                <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-150 text-[10px] text-slate-500 leading-normal">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-700">{t.conversionTitle}</span>{' '}
                    {lang === 'en' ? selectedBehavior.limitMessage : (selectedBehavior.limitMessageZh || selectedBehavior.limitMessage)}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBehavior(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold py-3 rounded-xl transition-all text-xs cursor-pointer"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    id="submit_green_behavior_btn"
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3 rounded-xl transition-all text-xs shadow-md shadow-emerald-600/10 cursor-pointer"
                  >
                    {t.confirm}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
