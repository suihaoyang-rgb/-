/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PointBubble } from '../types';
import { 
  Sprout, Trees, Leaf, Sparkles, Award, 
  Bike, Printer, Lightbulb, CupSoda, Trash2, Calendar
} from 'lucide-react';

// Safe icon lookup helper
function getBubbleIcon(iconName: string, className?: string) {
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

interface AntForestCanvasProps {
  bubbles: PointBubble[];
  onHarvestBubble: (id: string) => void;
  plantedTreeCount: number;
  totalPointsCollected: number;
}

export default function AntForestCanvas({
  bubbles,
  onHarvestBubble,
  plantedTreeCount,
  totalPointsCollected,
}: AntForestCanvasProps) {
  const [collectionFlickers, setCollectionFlickers] = useState<{ id: string; x: number; y: number; text: string }[]>([]);

  const handleBubbleClick = (bubble: PointBubble, e: React.MouseEvent<HTMLButtonElement>) => {
    if (bubble.isHarvested) return;
    
    // Catch-coordinates for the custom floating text effect
    const rect = e.currentTarget.getBoundingClientRect();
    const parent = e.currentTarget.parentElement?.getBoundingClientRect();
    
    if (parent) {
      const clickX = ((rect.left + rect.width / 2) - parent.left) / parent.width * 100;
      const clickY = ((rect.top) - parent.top) / parent.height * 100;
      
      const flickerId = `${bubble.id}-${Date.now()}`;
      setCollectionFlickers(prev => [...prev, {
        id: flickerId,
        x: clickX,
        y: clickY - 5,
        text: `+${bubble.points} XP`
      }]);

      // Remove the flicker after animation completes
      setTimeout(() => {
        setCollectionFlickers(prev => prev.filter(f => f.id !== flickerId));
      }, 1200);
    }

    onHarvestBubble(bubble.id);
  };

  // Determine which tree stage to render based on total trees planted
  const getTreeStage = () => {
    if (plantedTreeCount === 0) {
      return {
        name: 'Sprouting Seedling',
        level: 1,
        subtitle: 'Plant your first tree to see it grow!',
        svg: (
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto self-end transition-all duration-700">
            {/* Ground */}
            <path d="M 30,170 Q 100,150 170,170 L 170,195 L 30,195 Z" fill="#606A46" />
            <path d="M 50,170 Q 100,160 150,170" stroke="#7E8F56" strokeWidth="2" fill="none" />
            {/* Sprout Stem */}
            <path d="M 100,165 Q 98,140 100,115" stroke="#4ADE80" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Left Leaf */}
            <path d="M 98,135 Q 73,120 75,108 Q 92,112 98,130" fill="#22C55E" />
            {/* Right Leaf */}
            <path d="M 100,125 Q 125,110 120,98 Q 108,105 100,120" fill="#4ADE80" stroke="#22C55E" strokeWidth="1" />
            {/* Sparkle details */}
            <circle cx="98" cy="115" r="1.5" fill="#FFF" className="animate-pulse" />
            <circle cx="80" cy="125" r="1" fill="#FFF" />
          </svg>
        )
      };
    } else if (plantedTreeCount >= 1 && plantedTreeCount <= 2) {
      return {
        name: 'Young Sapling',
        level: 2,
        subtitle: 'Keep saving carbon! Sapling has taken root.',
        svg: (
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto self-end transition-all duration-700">
            {/* Ground */}
            <path d="M 20,170 Q 100,145 180,170 L 180,195 L 20,195 Z" fill="#4D5539" />
            <path d="M 40,167 Q 100,152 160,167" stroke="#70824B" strokeWidth="2" fill="none" />
            {/* Trunk */}
            <path d="M 100,165 Q 96,120 102,85" stroke="#854D0E" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Branches */}
            <path d="M 98,125 Q 80,110 70,105" stroke="#854D0E" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 100,105 Q 120,95 130,90" stroke="#854D0E" strokeWidth="4" strokeLinecap="round" fill="none" />
            
            {/* Leaf Clusters */}
            {/* Bottom Left */}
            <circle cx="68" cy="102" r="15" fill="#15803D" opacity="0.9" />
            <circle cx="73" cy="98" r="12" fill="#22C55E" opacity="0.95" />
            {/* Top Right */}
            <circle cx="132" cy="88" r="14" fill="#166534" opacity="0.9" />
            <circle cx="128" cy="85" r="11" fill="#4ADE80" opacity="0.95" />
            {/* Top Crown */}
            <circle cx="102" cy="74" r="20" fill="#14532D" opacity="0.85" />
            <circle cx="104" cy="72" r="16" fill="#15803D" opacity="0.9" />
            <circle cx="100" cy="68" r="12" fill="#2BE17E" opacity="0.95" />
          </svg>
        )
      };
    } else if (plantedTreeCount >= 3 && plantedTreeCount <= 5) {
      return {
        name: 'Eco-Birch Tree',
        level: 3,
        subtitle: 'Your continuous green actions fuel carbon absorption.',
        svg: (
          <svg viewBox="0 0 200 200" className="w-52 h-52 mx-auto self-end transition-all duration-700">
            {/* Ground */}
            <path d="M 15,170 Q 100,140 185,170 L 185,195 L 15,195 Z" fill="#3D452D" />
            <path d="M 30,165 Q 100,148 170,165" stroke="#60733B" strokeWidth="2.5" fill="none" />
            {/* Trunk with bark pattern */}
            <path d="M 100,165 Q 98,110 100,55" stroke="#713F12" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M 100,165 Q 98,110 100,55" stroke="#A16207" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.4" />
            {/* Secondary branches */}
            <path d="M 99,115 Q 70,95 55,95" stroke="#713F12" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 100,95 Q 128,80 145,80" stroke="#713F12" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 100,75 Q 85,60 70,55" stroke="#713F12" strokeWidth="4" strokeLinecap="round" fill="none" />
            
            {/* Rich Leaf Bunches */}
            {/* Left Lower */}
            <ellipse cx="52" cy="94" rx="20" ry="15" fill="#166534" />
            <ellipse cx="55" cy="90" rx="16" ry="12" fill="#15803D" />
            {/* Right Lower */}
            <ellipse cx="145" cy="78" rx="22" ry="16" fill="#14532D" />
            <ellipse cx="140" cy="75" rx="18" ry="13" fill="#22C55E" />
            {/* Mid Left */}
            <ellipse cx="72" cy="52" rx="18" ry="14" fill="#15803D" />
            <ellipse cx="74" cy="48" rx="14" ry="10" fill="#4ADE80" />
            {/* Main Crown */}
            <ellipse cx="100" cy="44" rx="28" ry="24" fill="#052E16" />
            <ellipse cx="102" cy="40" rx="22" ry="18" fill="#166534" />
            <ellipse cx="98" cy="35" rx="16" ry="13" fill="#22C55E" />
          </svg>
        )
      };
    } else {
      // Level 4: Mighty Forest Oasis
      return {
        name: 'Mighty ESG Forest',
        level: 4,
        subtitle: 'Outstanding! Your forest is now a fully self-sustaining oxygen dome.',
        svg: (
          <svg viewBox="0 0 200 200" className="w-56 h-56 mx-auto self-end transition-all duration-700">
            {/* Ground */}
            <path d="M 10,165 Q 100,135 190,165 L 190,195 L 10,195 Z" fill="#242B1A" />
            <path d="M 20,160 Q 100,140 180,160" stroke="#485A26" strokeWidth="3" fill="none" />
            
            {/* Background tree (shadow style) */}
            <path d="M 60,160 Q 56,120 62,80" stroke="#451A03" strokeWidth="8" fill="none" opacity="0.6" />
            <circle cx="62" cy="70" r="22" fill="#14532D" opacity="0.7" />
            <circle cx="64" cy="65" r="16" fill="#15803D" opacity="0.8" />
            
            {/* Background tree right */}
            <path d="M 140,160 Q 138,125 142,90" stroke="#451A03" strokeWidth="8" fill="none" opacity="0.6" />
            <circle cx="142" cy="78" r="20" fill="#14532D" opacity="0.7" />
            <circle cx="138" cy="75" r="15" fill="#166534" opacity="0.8" />
            
            {/* Foreground Main Mighty Tree */}
            <path d="M 100,160 Q 98,100 100,45" stroke="#3F1D0B" strokeWidth="15" strokeLinecap="round" fill="none" />
            <path d="M 100,160 Q 98,100 100,45" stroke="#713F12" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.3" />
            
            {/* Branches */}
            <path d="M 98,110 Q 60,90 40,85" stroke="#3F1D0B" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 100,90 Q 140,75 160,75" stroke="#3F1D0B" strokeWidth="6" strokeLinecap="round" fill="none" />
            
            {/* Forest Crowns */}
            <circle cx="36" cy="80" r="24" fill="#166534" />
            <circle cx="38" cy="76" r="18" fill="#15803D" />
            <circle cx="34" cy="72" r="12" fill="#4ADE80" opacity="0.9" />
            
            <circle cx="164" cy="70" r="26" fill="#14532D" />
            <circle cx="160" cy="66" r="20" fill="#22C55E" opacity="0.95" />
            
            {/* Big center crown */}
            <ellipse cx="100" cy="38" rx="35" ry="28" fill="#022C22" />
            <ellipse cx="102" cy="34" rx="28" ry="22" fill="#14532D" />
            <ellipse cx="98" cy="30" rx="20" ry="16" fill="#10B981" />
            
            {/* Ecological features */}
            {/* Birds */}
            <path d="M 52,40 Q 56,36 60,40 Q 64,36 68,40" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" fill="none" className="animate-pulse" />
            <path d="M 140,28 Q 144,24 148,28 Q 152,24 156,28" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        )
      };
    }
  };

  const currentTree = getTreeStage();
  const activeBubbles = bubbles.filter(b => !b.isHarvested);

  // Speed configuration based on coordinates to make movements look natural
  const getBubbleFloatingSpeedClass = (points: number) => {
    if (points > 50) return 'animate-float-slow';
    if (points > 20) return 'animate-float-medium';
    return 'animate-float-fast';
  };

  return (
    <div 
      id="ant_forest_dome" 
      className="relative overflow-hidden w-full h-[410px] sm:h-[450px] bg-gradient-to-b from-sky-100 via-teal-50/50 to-emerald-100 rounded-3xl border border-teal-200/50 shadow-inner flex flex-col justify-between p-6"
    >
      {/* Background aesthetics */}
      <div className="absolute top-4 left-6 pointer-events-none flex flex-col">
        <div className="flex items-center gap-1.5 text-xs text-teal-800 font-semibold tracking-wider uppercase font-display">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-spin" />
          Corporate Carbon Forest
        </div>
        <p className="text-[10px] text-teal-600/80">Every green log spawns harvesting-eligible energy</p>
      </div>

      <div className="absolute top-4 right-6 pointer-events-none text-right">
        <div className="text-[10px] text-teal-700 uppercase font-bold font-display">Life-cycle Status</div>
        <div className="text-sm font-semibold text-emerald-800 font-display flex items-center justify-end gap-1">
          {currentTree.name}
          <span className="bg-emerald-200 text-emerald-900 border border-emerald-300 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
            LV.{currentTree.level}
          </span>
        </div>
      </div>

      {/* Floating point bubbles section */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="relative w-full h-full">
          <AnimatePresence>
            {activeBubbles.map((bubble) => {
              const speedClass = getBubbleFloatingSpeedClass(bubble.points);
              return (
                <motion.div
                  key={bubble.id}
                  id={`bubble_${bubble.id}`}
                  initial={{ scale: 0, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ 
                    scale: 1.5, 
                    opacity: 0, 
                    y: -100,
                    transition: { duration: 0.55, ease: 'easeOut' } 
                  }}
                  className="absolute pointer-events-auto"
                  style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
                >
                  <button
                    onClick={(e) => handleBubbleClick(bubble, e)}
                    className={`group relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/60 text-emerald-950 focus:outline-none transition-all duration-300 cursor-pointer shadow-md ${speedClass} ${
                      bubble.isCustomLogged 
                        ? 'bg-gradient-to-br from-green-300/90 via-emerald-400/90 to-teal-400/90 hover:scale-110 hover:shadow-green-300/50 hover:shadow-lg' 
                        : 'bg-gradient-to-br from-emerald-200/90 via-green-300/80 to-teal-350/90 hover:scale-110 hover:shadow-emerald-200/50 hover:shadow-lg'
                    }`}
                  >
                    {/* Tiny pulsing green Halo */}
                    <span className="absolute inset-0 rounded-full bg-emerald-300/30 group-hover:bg-emerald-200/50 animate-ping group-hover:animate-none opacity-50 pointer-events-none" />

                    {/* Small inner design markup */}
                    <span className="text-[9px] font-bold text-emerald-800 tracking-tight leading-none group-hover:scale-75 transition-all">
                      {bubble.points}
                    </span>
                    <span className="mt-0.5 text-emerald-900 pointer-events-none transition-all scale-100 group-hover:scale-110">
                      {getBubbleIcon(bubble.behaviorId, "w-4 h-4 text-emerald-800")}
                    </span>

                    {/* Hover tooltip label */}
                    <span className="absolute -bottom-7 bg-emerald-900/95 text-emerald-50 text-[9px] px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow font-medium pointer-events-none z-50">
                      {bubble.behaviorName}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Render collection flickers (particles flying up on click) */}
          {collectionFlickers.map((flic) => (
            <div
              key={flic.id}
              className="absolute pointer-events-none text-emerald-700 font-extrabold text-sm font-mono tracking-tight animate-bounce mix-blend-multiply"
              style={{
                left: `${flic.x}%`,
                top: `${flic.y}%`,
                animation: 'float-bubble 1s ease-out forwards',
              }}
            >
              <div className="bg-white/90 border border-green-200 px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <Leaf className="w-3 h-3 text-green-500 fill-green-500" />
                {flic.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Core Tree graphic section */}
      <div className="w-full flex-1 flex flex-col justify-end items-center z-10 select-none pb-4">
        {currentTree.svg}
        <div className="text-center mt-2.5 max-w-xs pointer-events-none">
          <p className="text-xs text-teal-900 font-bold tracking-tight font-display">{currentTree.subtitle}</p>
        </div>
      </div>

      {/* Footer statistics overlay */}
      <div className="z-20 w-full flex items-center justify-between bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 p-3 shadow-sm select-none">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-700">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-medium">Planted Forest Tree Stock</div>
            <div className="text-xs font-extrabold text-slate-800 font-display">
              {plantedTreeCount} {plantedTreeCount === 1 ? 'tree' : 'trees'} planted
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-500 font-medium font-display">Lifetime Growth Points</div>
          <div className="text-xs font-mono font-bold text-emerald-700">
            {totalPointsCollected} <span className="text-[9px] text-slate-400 font-sans font-normal">GP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
