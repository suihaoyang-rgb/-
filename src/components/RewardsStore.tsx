/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REWARDS_SHOP } from '../data';
import { RewardItem, PlantedTree } from '../types';
import { 
  Leaf, Trees, Sprout, Flower2, ShoppingBag, 
  Ticket, Coffee, Sparkles, Check, ChevronRight, 
  Calendar, Ban, HeartHandshake, ShieldAlert, Award
} from 'lucide-react';

// Maps reward icons safely
function renderRewardIcon(iconName: string, className?: string) {
  switch (iconName) {
    case 'Trees': return <Trees className={className} />;
    case 'Sprout': return <Sprout className={className} />;
    case 'Flower2': return <Flower2 className={className} />;
    case 'Leaf': return <Leaf className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Ticket': return <Ticket className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    default: return <Leaf className={className} />;
  }
}

interface RewardsStoreProps {
  currentBalance: number;
  plantedTrees: PlantedTree[];
  onRedeemReward: (reward: RewardItem) => void;
  lang?: 'en' | 'zh';
}

export default function RewardsStore({
  currentBalance,
  plantedTrees,
  onRedeemReward,
  lang = 'zh',
}: RewardsStoreProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tree' | 'perks'>('all');
  const [recentPlantSuccess, setRecentPlantSuccess] = useState<string | null>(null);

  const filteredItems = REWARDS_SHOP.filter(item => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'tree') return item.type === 'tree';
    return item.type !== 'tree'; // merch + vouchers are perks
  });

  const translateRewardName = (id: string, defaultName: string) => {
    if (lang === 'en') return defaultName;
    switch (id) {
      case 'rew_haloxylon': return '沙漠绿洲梭梭树';
      case 'rew_buckthorn': return '中药防风沙棘群';
      case 'rew_pinus': return '常绿抗寒樟子松';
      case 'rew_bamboo': return '释氧高含碳箭竹林';
      case 'rew_eco_container': return '小麦天然麦秆餐盒';
      case 'rew_comm_voucher': return '绿色轨交 10元通勤充值卡';
      case 'rew_coffee_perk': return '食堂自备杯有机豆奶拿铁';
      default: return defaultName;
    }
  };

  const translateRewardDesc = (id: string, defaultDesc: string) => {
    if (lang === 'en') return defaultDesc;
    switch (id) {
      case 'rew_haloxylon': return '顽强的荒漠低能耗深根灌木，防沙固土尖兵，一棵树每年锁存 18kg 二氧化碳。';
      case 'rew_buckthorn': return '根系致密耐风蚀，结沙辣红果，一棵树每年净化 32kg 二氧化碳。';
      case 'rew_pinus': return '耐干瘠的高大针叶，锁蓄并涵养浅层地下水，一棵树每年封存析出 45kg 二氧化碳。';
      case 'rew_bamboo': return '生机茂盛的高含碳富氧常青大叶。每株群组每年可转换 75kg 的高纯度企业生产碳耗。';
      case 'rew_eco_container': return '秸秆环保便携热压餐具，全自降解且保温易清洗，避免白色塑料公害。提供 8kg 间接减碳。';
      case 'rew_comm_voucher': return '自动存入公共交通账户（地铁/单车）。出行可替代 15kg 的燃油尾气二氧化碳损耗。';
      case 'rew_coffee_perk': return '低碳生活态度大考。午后自备玻璃/不锈钢密封杯在公共茶歇点出票。额外折中 5kg 减量。';
      default: return defaultDesc;
    }
  };

  const handleRedeem = (item: RewardItem) => {
    if (currentBalance < item.cost) return;
    onRedeemReward(item);

    const displayName = translateRewardName(item.id, item.name);
    if (item.type === 'tree') {
      setRecentPlantSuccess(
        lang === 'en'
          ? `Successfully planted a virtual ${item.name}! It has been rooted in the corporate carbon sanctuary. -${item.cost} GP.`
          : `种植成功！您申领的“${displayName}”已被企业环保公益组成功绑定，即刻在河西荒漠沙区落槌栽培！扣减 -${item.cost} GP 能量值。`
      );
    } else {
      setRecentPlantSuccess(
        lang === 'en'
          ? `Successfully redeemed ${item.name}! A QR voucher code has been emailed to you. -${item.cost} GP.`
          : `兑换成功！您代表个人的“${displayName}”电子券号已产生，核销指南与说明已发送。扣减 -${item.cost} GP 能量值。`
      );
    }

    setTimeout(() => {
      setRecentPlantSuccess(null);
    }, 5500);
  };

  const getRarityBadge = (rarity?: string) => {
    switch (rarity) {
      case 'epic': return { label: lang === 'en' ? 'epic' : '史诗', css: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'rare': return { label: lang === 'en' ? 'rare' : '稀有', css: 'bg-blue-100 text-blue-800 border-blue-200' };
      default: return { label: lang === 'en' ? 'common' : '普通', css: 'bg-slate-150 text-slate-650 border-slate-200' };
    }
  };

  const t = {
    title: lang === 'en' ? 'Eco-Rewards & Forest Shop' : '低碳公益林与能量福利社',
    subTitle: lang === 'en' 
      ? 'Spend your accumulated green points to support carbon ecosystems or claim company perks' 
      : '扣划您积累的可持续能量余额，代表个人的名义在线认领真实野生梭梭防沙林，或申领大食堂零塑料便餐券',
    tabAll: lang === 'en' ? 'All Rewards' : '全部产品',
    tabForest: lang === 'en' ? '🌳 Virtual Carbon Forest' : '🌳 虚拟低碳森林认领',
    tabPerks: lang === 'en' ? '☕ Employee Cafeteria & Perks' : '☕ 员工减碳茶歇福利',
    exchangeCost: lang === 'en' ? 'Exchange Cost' : '领取扣划能量',
    redeemItem: lang === 'en' ? 'Redeem Item' : '立即免单申领',
    needPoints: lang === 'en' ? 'Need More GP' : '能量不足',
    rewardsTypeForest: lang === 'en' ? 'Forest Ecosystem' : '生态治沙公益林',
    rewardsTypePerk: lang === 'en' ? 'Employee Perk' : '低碳零塑福利券',
    pointsBalanceLabel: lang === 'en' ? 'Redeemable Points' : '可用绿色能量余额',
    legacyTitle: lang === 'en' ? 'My Carbon Legacy' : '我的个人低碳成就遗产',
    legacySub: lang === 'en' ? 'rooted' : '株已被治沙处认证栽植',
    plantedOn: lang === 'en' ? 'Planted' : '栽培于'
  };

  return (
    <div id="rewards_store_section" className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Header containing balance indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 font-display flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              {t.title}
            </h2>
            <p className="text-[11px] text-slate-500 mt-1">{t.subTitle}</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-150 rounded-2xl px-3 py-2 flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-sm animate-pulse" style={{ animationDuration: '4s' }}>
            <Leaf className="w-4 h-4 text-emerald-600 fill-emerald-500" />
            <div>
              <span className="block text-[8px] text-emerald-800/70 font-bold uppercase tracking-wider">{t.pointsBalanceLabel}</span>
              <span className="text-sm font-mono font-extrabold text-emerald-800">{currentBalance} <span className="text-[10px] uppercase font-sans font-medium">GP</span></span>
            </div>
          </div>
        </div>

        {/* Categories selector */}
        <div className="flex gap-1.5 mb-5 border-b border-slate-100 pb-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={`text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === 'all' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.tabAll}
          </button>
          <button
            onClick={() => setActiveCategory('tree')}
            className={`text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === 'tree' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.tabForest}
          </button>
          <button
            onClick={() => setActiveCategory('perks')}
            className={`text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === 'perks' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.tabPerks}
          </button>
        </div>

        {/* Success toast overlay inside shop */}
        <AnimatePresence>
          {recentPlantSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-500 rounded-2xl flex items-start gap-2.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '3s' }} />
              <div>
                <p className="text-[11px] font-extrabold tracking-wide uppercase">{lang === 'en' ? 'Redemption Approved!' : '绿色证书生成中!'}</p>
                <p className="text-[10px] opacity-90 leading-relaxed mt-0.5">{recentPlantSuccess}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isAffordable = currentBalance >= item.cost;
            const badge = getRarityBadge(item.rarity);
            return (
              <div 
                key={item.id}
                className="p-4 border border-slate-100 rounded-2xl bg-slate-50/30 hover:bg-slate-50/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2.5 mb-2.5">
                    <div className="p-3 bg-white border border-slate-100 rounded-xl text-emerald-700 shadow-sm shrink-0">
                      {renderRewardIcon(item.icon, "w-4 h-4")}
                    </div>
                    
                    <div className="flex flex-col items-end gap-1 select-none">
                      <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${badge.css}`}>
                        {badge.label}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">
                        {item.type === 'tree' ? t.rewardsTypeForest : t.rewardsTypePerk}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xs font-extrabold text-slate-800 font-display">
                    {translateRewardName(item.id, item.name)}
                  </h3>
                  <p className="text-[10px] text-slate-400 leading-normal mt-1 mb-3">
                    {translateRewardDesc(item.id, item.description)}
                  </p>
                </div>

                {/* Buy Area */}
                <div className="border-t border-slate-100/60 pt-3 mt-1 flex items-center justify-between">
                  <div className="text-[10px]">
                    <span className="block text-slate-400 font-medium">{t.exchangeCost}</span>
                    <strong className="text-emerald-700 font-mono font-bold text-xs">{item.cost} GP</strong>
                  </div>

                  <button
                    onClick={() => handleRedeem(item)}
                    disabled={!isAffordable}
                    className={`text-[9.5px] font-extrabold px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1 ${
                      isAffordable
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    {!isAffordable && <Ban className="w-3 h-3 text-slate-350" />}
                    {isAffordable ? t.redeemItem : t.needPoints}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Planted trees registry */}
      {plantedTrees.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <h3 className="text-[10px] bg-sky-50 text-sky-800 border border-sky-150 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-3.5">
            <Award className="w-3.5 h-3.5 text-sky-600" />
            {t.legacyTitle} ({plantedTrees.length} {t.legacySub})
          </h3>

          <div className="flex gap-2.5 overflow-x-auto pb-2">
            {plantedTrees.map((tree) => (
              <div 
                key={tree.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 shrink-0 w-28 text-center text-[10px]"
              >
                <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mx-auto mb-1.5">
                  <Trees className="w-3.5 h-3.5" />
                </div>
                <div className="font-extrabold text-slate-800 truncate select-all">{tree.treeName}</div>
                <div className="text-[8px] text-slate-400 mt-0.5">
                  {t.plantedOn} {new Date(tree.plantedAt).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
