/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EsgCategory = 'E' | 'S' | 'G';

export interface GreenBehaviorType {
  id: string;
  name: string;
  icon: string;
  category: EsgCategory;
  pointsPerUnit: number;
  unitName: string;
  description: string;
  limitMessage: string;
  nameZh?: string;
  unitNameZh?: string;
  descriptionZh?: string;
  limitMessageZh?: string;
}

export interface LoggedAction {
  id: string;
  behaviorId: string;
  quantity: number;
  pointsEarned: number;
  timestamp: string; // ISO string
  notes?: string;
}

export interface PointBubble {
  id: string;
  behaviorId: string;
  behaviorName: string;
  points: number;
  x: number; // percentage width 10-90
  y: number; // percentage height 15-75
  isHarvested: boolean;
  isCustomLogged?: boolean;
}

export interface DepartmentRanking {
  department: string;
  totalPoints: number;
  memberCount: number;
  averagePoints: number;
  carbonReducedKg: number; // Estimated CO2 reduced
  rank: number;
}

export interface Teammate {
  id: string;
  name: string;
  department: string;
  avatarUrl?: string;
  totalPoints: number;
  carbonReducedKg: number;
  joinedDate: string;
}

export interface RewardItem {
  id: string;
  name: string;
  cost: number;
  type: 'tree' | 'voucher' | 'merch';
  description: string;
  icon: string;
  carbonOffsetKg: number; // Environmental impact of reward
  rarity?: 'common' | 'rare' | 'epic';
}

export interface PlantedTree {
  id: string;
  rewardId: string;
  treeName: string;
  plantedAt: string;
  progress: number; // 0 to 100 for tree maturity
}

export interface UserStats {
  totalPointsCollected: number;
  currentBalance: number;
  totalCarbonReducedKg: number;
  esgScore: number; // 0-100 score which ranks user from C to AAA
  pillars: {
    E: number; // Environmental points
    S: number; // Social points
    G: number; // Governance points
  };
}
