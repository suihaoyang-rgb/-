/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GreenBehaviorType, DepartmentRanking, Teammate, RewardItem, PointBubble } from './types';

export const GREEN_BEHAVIORS: GreenBehaviorType[] = [
  {
    id: 'green_commuting',
    name: 'Green Commuting',
    nameZh: '低碳骑行与绿色通勤',
    icon: 'Bike',
    category: 'E',
    pointsPerUnit: 12, // 12 points per km
    unitName: 'km',
    unitNameZh: '公里',
    description: 'Walking, bicycling, riding electric scooters, or taking lines of buses and subways/trains.',
    descriptionZh: '倡导步行、骑行公共单车或乘坐巴士、轨道交通，摒弃燃油私家车。',
    limitMessage: 'Saves approx. 240g CO2 per km compared to average gasoline passenger cars. [Reference: EPA Transit Standards]',
    limitMessageZh: '每公里可避免汽油车乘载排放约 240g 二氧化碳。[数据源：美国环保署 EPA 碳足迹核算标准]',
  },
  {
    id: 'duplex_printing',
    name: 'Duplex Printing',
    nameZh: '无纸数字化与双面打印',
    icon: 'Printer',
    category: 'E',
    pointsPerUnit: 4, // 4 points per double-sided page
    unitName: 'sheets',
    unitNameZh: '张',
    description: 'Using double-sided printing or digital draft sharing instead of one-sided outputs.',
    descriptionZh: '减少单面打印浪费，主动使用双面拼版、或者无纸化数字邮件/云文档共享草案。',
    limitMessage: 'Reducing paper use saves approx. 15g CO2 equivalent per sheet. [Reference: ESG Carbon Wood-Pulp Index]',
    limitMessageZh: '双面用纸可减少约 15g 生产能耗二氧化碳折算当量。[数据源：国际林业 ESG 浆木生命周期系数]',
  },
  {
    id: 'saving_electricity',
    name: 'Saving Electricity',
    nameZh: '随手关灯与空调省电',
    icon: 'Lightbulb',
    category: 'E',
    pointsPerUnit: 6, // 6 points per hour
    unitName: 'hours',
    unitNameZh: '小时',
    description: 'Switching off unnecessary office lights, computers, monitors, workspace appliances or dialing down heating/AC.',
    descriptionZh: '午休及离岗后关闭个人显示器，或协助断开空闲会议组的照明、风扇及空调。',
    limitMessage: 'Saves approx. 380g CO2 per kWh equivalent on general office grids. [Reference: UN Carbon Grid Factors]',
    limitMessageZh: '每省电一小时折合减少空调/用电排放约 380g 二氧化碳。[数据源：联合国 UN 全球电网排放因子]',
  },
  {
    id: 'reduce_disposables',
    name: 'Reduce Disposables',
    nameZh: '减塑减纸自带环保杯',
    icon: 'CupSoda',
    category: 'E',
    pointsPerUnit: 15, // 15 points per time
    unitName: 'instances',
    unitNameZh: '次',
    description: 'Using persistent custom water cups, metal cutlery, reusable lunch bags and rejecting plastic straws/sleeves.',
    descriptionZh: '拒绝外卖塑料餐盒、吸管、纸杯托，携带个人可循环水杯、金属餐具。',
    limitMessage: 'Transitioning to reusable cups avoids 120g CO2 per cup. [Reference: UNEP Lifecycle Assessment Report]',
    limitMessageZh: '替代一次性容器可规避约 120g 塑料与纸足迹碳消耗。[数据源：联合国环境署 UNEP 废弃物生命周期模型]',
  },
  {
    id: 'recycle',
    name: 'Waste & Item Recycling',
    nameZh: '废弃物与二次资源回收',
    icon: 'Trash2',
    category: 'E',
    pointsPerUnit: 20, // 20 points per kg
    unitName: 'kg',
    unitNameZh: '公斤',
    description: 'Correctly dividing beverage cans, plastic canisters, scrap cardboard sheets, and batteries for deep reclamation.',
    descriptionZh: '正确分类饮品铝罐、聚酯塑料瓶、纸板邮品箱以及报废电池投递进专属回收站。',
    limitMessage: 'Recycling cardboards and paper avoids 1.1kg CO2 per kg recycled. [Reference: EPA WARM Materials Standards]',
    limitMessageZh: '分类回收每公斤包装纸版可减免 1.1kg 直接及间接碳通量。[数据源：美国环保署 EPA WARM 深度循环标准]',
  },
  {
    id: 'participate_activities',
    name: 'Eco Events & Volunteer',
    nameZh: '企业绿色活动与生态义工',
    icon: 'Calendar',
    category: 'S',
    pointsPerUnit: 80, // 80 points per participate instance
    unitName: 'sessions',
    unitNameZh: '次',
    description: 'Joining carbon-conscious seminar programs, local garden planting, community pickups, or carbon courses.',
    descriptionZh: '打卡低碳可持续研讨会、企业公益植树、社区垃圾清捡或 ESG 可持续讲座课。',
    limitMessage: 'Engages corporate carbon awareness by up to 12% per attendee. [Reference: Corporate Green Action Theory]',
    limitMessageZh: '凝聚团队低碳共识，单次参与可有效激发约 12% 的全员利群亲环境行为倾向。',
  },
];

export const INITIAL_DEPARTMENTS: DepartmentRanking[] = [
  {
    department: 'Engineering & Tech',
    totalPoints: 12450,
    memberCount: 24,
    averagePoints: 518,
    carbonReducedKg: 498.2,
    rank: 1,
  },
  {
    department: 'Marketing & Sales',
    totalPoints: 10240,
    memberCount: 18,
    averagePoints: 568,
    carbonReducedKg: 409.6,
    rank: 2,
  },
  {
    department: 'Product Strategy',
    totalPoints: 8320,
    memberCount: 12,
    averagePoints: 693,
    carbonReducedKg: 332.8,
    rank: 3,
  },
  {
    department: 'Operations & HR',
    totalPoints: 7120,
    memberCount: 15,
    averagePoints: 474,
    carbonReducedKg: 284.8,
    rank: 4,
  },
  {
    department: 'Finance & Legal',
    totalPoints: 5890,
    memberCount: 10,
    averagePoints: 589,
    carbonReducedKg: 235.6,
    rank: 5,
  },
];

export const TEAMMATES_DATA: Teammate[] = [
  {
    id: 'tm-1',
    name: 'Suihaoyang (You)',
    department: 'Engineering & Tech',
    totalPoints: 640,
    carbonReducedKg: 25.6,
    joinedDate: '2026-03-01',
  },
  {
    id: 'tm-2',
    name: 'Emily Watson',
    department: 'Engineering & Tech',
    totalPoints: 920,
    carbonReducedKg: 36.8,
    joinedDate: '2026-01-15',
  },
  {
    id: 'tm-3',
    name: 'David Kim',
    department: 'Product Strategy',
    totalPoints: 850,
    carbonReducedKg: 34.0,
    joinedDate: '2026-02-10',
  },
  {
    id: 'tm-4',
    name: 'Elena Rostova',
    department: 'Marketing & Sales',
    totalPoints: 780,
    carbonReducedKg: 31.2,
    joinedDate: '2026-01-20',
  },
  {
    id: 'tm-5',
    name: 'Marcus Chen',
    department: 'Operations & HR',
    totalPoints: 710,
    carbonReducedKg: 28.4,
    joinedDate: '2026-02-28',
  },
  {
    id: 'tm-6',
    name: 'Sofia Martinez',
    department: 'Finance & Legal',
    totalPoints: 690,
    carbonReducedKg: 27.6,
    joinedDate: '2026-03-12',
  },
  {
    id: 'tm-7',
    name: 'Kenji Sato',
    department: 'Engineering & Tech',
    totalPoints: 580,
    carbonReducedKg: 23.2,
    joinedDate: '2026-04-01',
  },
];

export const REWARDS_SHOP: RewardItem[] = [
  // Virtual Trees for corporate carbon offset forest
  {
    id: 'rew_haloxylon',
    name: 'Haloxylon Tree',
    cost: 150,
    type: 'tree',
    description: 'A resilient desert plant that locks shifting dunes and offsets 18kg of carbon per year.',
    icon: 'Trees',
    carbonOffsetKg: 18,
    rarity: 'common',
  },
  {
    id: 'rew_buckthorn',
    name: 'Sea Buckthorn',
    cost: 300,
    type: 'tree',
    description: 'Colorful berries, deep roots for soil preservation, and traps 32kg of CO2 per year.',
    icon: 'Sprout',
    carbonOffsetKg: 32,
    rarity: 'rare',
  },
  {
    id: 'rew_pinus',
    name: 'Scots Pine',
    cost: 650,
    type: 'tree',
    description: 'Stately evergreen that thrives in low water environments and traps 45kg CO2 annually.',
    icon: 'Flower2',
    carbonOffsetKg: 45,
    rarity: 'epic',
  },
  {
    id: 'rew_bamboo',
    name: 'Sacred Bamboo Grove',
    cost: 1200,
    type: 'tree',
    description: 'Fast growing, multi-shoot oxygen dome. Traps an amazing 75kg CO2 annually.',
    icon: 'Leaf',
    carbonOffsetKg: 75,
    rarity: 'epic',
  },
  // Physical and Perk vouchers
  {
    id: 'rew_eco_container',
    name: 'Fiber Lunch Box',
    cost: 450,
    type: 'merch',
    description: 'Zero plastic reusable lunch container made of highly degradable wheat straw fibers.',
    icon: 'ShoppingBag',
    carbonOffsetKg: 8,
    rarity: 'rare',
  },
  {
    id: 'rew_comm_voucher',
    name: 'Eco-Transit Pass Upgrade',
    cost: 250,
    type: 'voucher',
    description: '$10 credit to public subway or city shared bike balances.',
    icon: 'Ticket',
    carbonOffsetKg: 15,
    rarity: 'common',
  },
  {
    id: 'rew_coffee_perk',
    name: 'Free Organic Soy Latte',
    cost: 180,
    type: 'voucher',
    description: 'Enjoy a free sustainable brew in our corporate cafeteria if you bring your own mug.',
    icon: 'Coffee',
    carbonOffsetKg: 5,
    rarity: 'common',
  },
];

// Seed initial points bubbles to display on load
export const INITIAL_BUBBLES: Omit<PointBubble, 'id'>[] = [
  { behaviorId: 'green_commuting', behaviorName: 'Walked to Office', points: 60, x: 25, y: 30, isHarvested: false },
  { behaviorId: 'saving_electricity', behaviorName: 'Off AC early', points: 18, x: 50, y: 20, isHarvested: false },
  { behaviorId: 'reduce_disposables', behaviorName: 'Used Steel Mug', points: 15, x: 75, y: 35, isHarvested: false },
  { behaviorId: 'duplex_printing', behaviorName: 'Double-side reports', points: 12, x: 15, y: 55, isHarvested: false },
  { behaviorId: 'recycle', behaviorName: 'Sorted 2kg paper', points: 40, x: 80, y: 60, isHarvested: false },
];
