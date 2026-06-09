/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Brain, Check, Compass, Briefcase, GraduationCap, 
  Target, Award, Users, ShieldAlert, FileText, Trees, UserCheck, 
  ArrowRight, RefreshCw, BarChart2, Star, Zap, Layers, ChevronRight,
  AlertTriangle, Clock, ClipboardCheck, ChevronLeft, ShieldCheck, Activity
} from 'lucide-react';
import { AI_MAPPING_DB, AiMappingDetails } from './AiMappingDb';

interface Domain {
  id: string;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  icon: React.ComponentType<{ className?: string }>;
  aiUseEn: string;
  aiUseZh: string;
}

const DOMAINS: Domain[] = [
  {
    id: 'recruitment',
    titleEn: 'Green Recruitment',
    titleZh: '绿色招聘',
    descEn: 'Use AI to identify, attract, and evaluate candidates with sustainability awareness and environmental values.',
    descZh: '利用AI识别、吸引并评估具有可持续发展意识的人才。',
    icon: Briefcase,
    aiUseEn: 'Automated extraction of environmental project track-record and sustainable mindset assessment from talent pools.',
    aiUseZh: '智能提取候选人的环保项目背景、GHG减排经验，并在算法面试中评估亲环境核心素养素质。'
  },
  {
    id: 'training',
    titleEn: 'Green Training & Development',
    titleZh: '绿色培训与发展',
    descEn: 'Use AI to personalize sustainability learning, training recommendations, and employee development.',
    descZh: '利用AI提升绿色培训效果并实现个性化学习发展。',
    icon: GraduationCap,
    aiUseEn: 'Highly customized learning paths utilizing LLMs for individual carbon-reducing procedures and role-based Green HR requirements.',
    aiUseZh: '使用大模型为不同岗位定制极速降碳操作与 ESG 合规学分微课，实现全员个性化能力覆盖。'
  },
  {
    id: 'performance',
    titleEn: 'Green Performance Management',
    titleZh: '绿色绩效管理',
    descEn: 'Use AI to monitor sustainability participation, environmental KPIs, and employee engagement.',
    descZh: '利用AI追踪绿色绩效与可持续发展参与情况。',
    icon: Target,
    aiUseEn: 'Integration of automated physical device logs or commuting logs into objective HR appraisal systems with anomaly correction.',
    aiUseZh: '自动将通勤闸机、双面按纸打印系统等无感传感器数据，安全回填至组织绩效考评与ESG核算体系内。'
  },
  {
    id: 'rewards',
    titleEn: 'Green Rewards & Incentives',
    titleZh: '绿色激励与奖励',
    descEn: 'Use AI to optimize recognition systems and encourage sustainable workplace behaviors.',
    descZh: '利用AI优化绿色激励机制并促进员工绿色行为。',
    icon: Award,
    aiUseEn: 'Predictive algorithm matches custom lifestyle/wellbeing reward suggestions with real-time green points balance.',
    aiUseZh: '基于员工日常激励兑现倾向偏好，智能编排兑换，精准推荐生态礼遇项目及额外福利加配权。'
  },
  {
    id: 'engagement',
    titleEn: 'Employee Green Engagement',
    titleZh: '员工绿色参与',
    descEn: 'Use AI to improve participation, communication, and employee involvement in sustainability initiatives.',
    descZh: '利用AI提升员工绿色参与度与可持续发展活动投入。',
    icon: Users,
    aiUseEn: 'Interactive chatbot facilitates custom office-level low carbon campaigns and resolves peer-to-peer carbon-saving disputes.',
    aiUseZh: '部署能碳科普智能助手，自动答疑低碳问询，并支持社群自发式小众降碳打卡挑战的动态审查。'
  },
  {
    id: 'compliance',
    titleEn: 'ESG Compliance & Auditing',
    titleZh: 'ESG合规与审计',
    descEn: 'Use AI to support compliance monitoring, ESG governance, and audit preparation.',
    descZh: '利用AI辅助ESG治理、监督与审计准备工作。',
    icon: ShieldAlert,
    aiUseEn: 'Anomalies screening and predictive compliance audit readiness alignment utilizing double-materiality audit standards.',
    aiUseZh: '智能审阅财务底单与物理用能记录的内在逻辑相关，防范任何形式的行政漂绿或口径漏洞。'
  },
  {
    id: 'reporting',
    titleEn: 'Sustainability Reporting',
    titleZh: '可持续发展报告',
    descEn: 'Use AI to simplify ESG reporting, sustainability disclosures, and impact measurement.',
    descZh: '利用AI提高可持续发展报告效率与准确性。',
    icon: FileText,
    aiUseEn: 'Synthesizing heterogeneous data streams into GRI/CSRD standardized report structures with complete trace confidence validation.',
    aiUseZh: '将琐碎多变的组织行径与硬传感器日志自动合并为高度契合CSRD披露法案的结构化环境绩效披露文件。'
  },
  {
    id: 'culture',
    titleEn: 'Organizational Green Culture',
    titleZh: '绿色组织文化',
    descEn: 'Use AI to strengthen sustainable values, workplace habits, and environmental culture.',
    descZh: '利用AI推动绿色价值观与可持续文化建设。',
    icon: Trees,
    aiUseEn: 'Social network analytics (SNA) scans informal group key leaders to maximize Green HR change agent advocacy ripple effects.',
    aiUseZh: '通过分析非正式沟通网络识别绿色火种员工，给予其荣誉加速支持以最大程度引发周围人群从众跟随。'
  },
  {
    id: 'leadership',
    titleEn: 'Sustainable Leadership Development',
    titleZh: '可持续领导力发展',
    descEn: 'Use AI to develop leaders capable of driving sustainability transformation.',
    descZh: '利用AI培养推动可持续发展的领导者。',
    icon: UserCheck,
    aiUseEn: 'Generative corporate policy sandboxes empower leaders to evaluate medium-term talent attrition against carbon saving curves.',
    aiUseZh: '构建高层沙盒演算平台，支持管理层进行“中长期低碳习惯习惯粘性 vs 管理摩擦损耗”多重模拟。'
  }
];

interface TaskSuggestion {
  id: string;
  domainId: string;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  defaultFrequency: 'daily' | 'weekly' | 'monthly';
  defaultEffort: 'low' | 'medium' | 'high';
  defaultPain: 'low' | 'medium' | 'high';
}

const TASK_SUGGESTIONS: Record<string, TaskSuggestion[]> = {
  recruitment: [
    {
      id: 'rec-1',
      domainId: 'recruitment',
      titleEn: 'Resume Screening',
      titleZh: '简历筛选',
      descEn: 'Filtering candidate profiles with environmental or ESG project experience inside massive talent databases.',
      descZh: '在海量求职数据库中筛选具有环保项目背景与低碳研究经验的候选人履历。',
      defaultFrequency: 'weekly',
      defaultEffort: 'high',
      defaultPain: 'medium'
    },
    {
      id: 'rec-2',
      domainId: 'recruitment',
      titleEn: 'Candidate Sustainability Assessment',
      titleZh: '候选人可持续发展价值观评估',
      descEn: 'Evaluating candidate alignment with green values through tailored environmental questionnaires.',
      descZh: '评估候选人对企业低碳环保意识和ESG心智的契合度，确定非财务规范认同。',
      defaultFrequency: 'weekly',
      defaultEffort: 'medium',
      defaultPain: 'high'
    },
    {
      id: 'rec-3',
      domainId: 'recruitment',
      titleEn: 'Interview Scheduling & Match',
      titleZh: '面试安排与入职预备',
      descEn: 'Coordinating interview slots for green talent badges and preparing eco-onboarding materials.',
      descZh: '协调绿色特招批次面试日程，并制作无纸化低碳入职宣导手册。',
      defaultFrequency: 'weekly',
      defaultEffort: 'low',
      defaultPain: 'low'
    }
  ],
  training: [
    {
      id: 'train-1',
      domainId: 'training',
      titleEn: 'Training Assignment',
      titleZh: '培训任务分配',
      descEn: 'Pushing customized low-carbon behavioral modules and ESG guidelines across diverse teams.',
      descZh: '对跨层级职能团队分发定制化减排守则和ESG专题应知应会微课培训计划。',
      defaultFrequency: 'monthly',
      defaultEffort: 'medium',
      defaultPain: 'low'
    },
    {
      id: 'train-2',
      domainId: 'training',
      titleEn: 'Training Progress Tracking',
      titleZh: '培训进度跟踪',
      descEn: 'Monitoring compliance and course completion marks of employees across global departments.',
      descZh: '监督并催审全员降碳操作课程及合规学分的看课率、答题通过情况。',
      defaultFrequency: 'weekly',
      defaultEffort: 'medium',
      defaultPain: 'medium'
    },
    {
      id: 'train-3',
      domainId: 'training',
      titleEn: 'Learning Reminder Notifications',
      titleZh: '学习提醒自动推送',
      descEn: 'Distributing custom nudges and alert notifications to prompt required Green HR course completion.',
      descZh: '针对仍未达标学时的部门及个人批量撰写并分发习惯提醒或企业微信微提醒通知。',
      defaultFrequency: 'daily',
      defaultEffort: 'medium',
      defaultPain: 'high'
    }
  ],
  performance: [
    {
      id: 'perf-1',
      domainId: 'performance',
      titleEn: 'ESG KPI Collection',
      titleZh: 'ESG绩效指标收集',
      descEn: 'Manual gathering of carbon counts, print volume sheets, and green transit data.',
      descZh: '从不同部门表格及设备记录中，汇总本核算期内双面打印、低碳通勤等物理数据点。',
      defaultFrequency: 'monthly',
      defaultEffort: 'high',
      defaultPain: 'high'
    },
    {
      id: 'perf-2',
      domainId: 'performance',
      titleEn: 'Sustainability Participation Monitoring',
      titleZh: '绿色参与度监测',
      descEn: 'Gauging weekly participation rates and tracking recurring outliers in Green HR programs.',
      descZh: '检测各部门PEB平均活跃情况（GBSS指数），找出参与度较低和节能退化的主要场景。',
      defaultFrequency: 'weekly',
      defaultEffort: 'medium',
      defaultPain: 'medium'
    },
    {
      id: 'perf-3',
      domainId: 'performance',
      titleEn: 'Monthly Performance Reporting',
      titleZh: '月度绩效报告整理',
      descEn: 'Drafting periodic non-financial carbon evaluation reports for HR audit signoff.',
      descZh: '汇编企业员工绿色习惯履约指数及折算二氧化碳当量的绩效通报，供管理层签阅。',
      defaultFrequency: 'monthly',
      defaultEffort: 'high',
      defaultPain: 'medium'
    }
  ],
  rewards: [
    {
      id: 'rew-1',
      domainId: 'rewards',
      titleEn: 'Incentive Catalog Balancing',
      titleZh: '绿色激励品类配额平抑',
      descEn: 'Sourcing, pricing, and organizing virtual/physical merchandise for eco-point redemption.',
      descZh: '核定与接洽低碳好礼、树金、实体联名折扣等，维系企业对位预算兑换平滑度。',
      defaultFrequency: 'monthly',
      defaultEffort: 'medium',
      defaultPain: 'medium'
    },
    {
      id: 'rew-2',
      domainId: 'rewards',
      titleEn: 'Points Calculation & Verification',
      titleZh: '绿色积分数据审计核对',
      descEn: 'Auditing generated energy bubbles and point claims to prevent manual fraud or loops.',
      descZh: '对系统产生的绿能/历史点数流水进行异常审计，阻隔由于手动造假导致的数据漏气。',
      defaultFrequency: 'daily',
      defaultEffort: 'medium',
      defaultPain: 'high'
    },
    {
      id: 'rew-3',
      domainId: 'rewards',
      titleEn: 'Redemption Fulfillment Tracking',
      titleZh: '奖励物资兑回与发放追踪',
      descEn: 'Tracking shipping of physical green products or digital token integrations.',
      descZh: '跟踪并下发已被认领的物理树木契证及实体低碳纪念水瓶的发货细节。',
      defaultFrequency: 'weekly',
      defaultEffort: 'low',
      defaultPain: 'low'
    }
  ],
  engagement: [
    {
      id: 'eng-1',
      domainId: 'engagement',
      titleEn: 'Participation Tracking',
      titleZh: '参与情况追踪',
      descEn: 'Consolidating simple user check-ins (stair climbing, reusable cup usage).',
      descZh: '每日盘点员工自发性的行为打卡（自带随身杯、餐盘光盘、黑屏待机）的平均履约。',
      defaultFrequency: 'daily',
      defaultEffort: 'medium',
      defaultPain: 'medium'
    },
    {
      id: 'eng-2',
      domainId: 'engagement',
      titleEn: 'Sustainability Campaign Management',
      titleZh: '绿色活动发起与常设监控',
      descEn: 'Organizing and updating localized eco-challenges and gamified group campaigns.',
      descZh: '策划并启动例如全大楼“下班熄灯一小时”、“低碳办公室排位战”等轻社交挑战。',
      defaultFrequency: 'monthly',
      defaultEffort: 'high',
      defaultPain: 'high'
    },
    {
      id: 'eng-3',
      domainId: 'engagement',
      titleEn: 'Employee Feedback Collection',
      titleZh: '员工绿色反馈整理',
      descEn: 'Collecting surveys to identify pain points or structural resistance to sustainable habits.',
      descZh: '向全员批量发送习惯培育难度指数问卷，提炼由于设施不足导致的行为痛点。',
      defaultFrequency: 'monthly',
      defaultEffort: 'medium',
      defaultPain: 'low'
    }
  ],
  compliance: [
    {
      id: 'comp-1',
      domainId: 'compliance',
      titleEn: 'Compliance Documentation Review',
      titleZh: '合规文件与凭证审核',
      descEn: 'Cross-checking paper invoices, logbooks against regulatory compliance requirements.',
      descZh: '逐一复核采购造纸单、燃油发票等原始物理报账核销底项以阻断漂绿过载。',
      defaultFrequency: 'weekly',
      defaultEffort: 'high',
      defaultPain: 'high'
    },
    {
      id: 'comp-2',
      domainId: 'compliance',
      titleEn: 'ESG Data Collection',
      titleZh: 'ESG跨业务数据核算',
      descEn: 'Coordinating and compiling basic energy scopes datasets across administrative systems.',
      descZh: '跨行政软硬件后台抓取冷热水能耗指标，汇总全季度的能耗数字存底。',
      defaultFrequency: 'monthly',
      defaultEffort: 'high',
      defaultPain: 'medium'
    },
    {
      id: 'comp-3',
      domainId: 'compliance',
      titleEn: 'Audit Preparation',
      titleZh: '审计背书与证据整理',
      descEn: 'Sifting datasets and formulating file packages for audit disclosure panels.',
      descZh: '在第三方权威碳评估机构造访前，组织与拉取出无疏漏、哈希一致的行为抵消链。',
      defaultFrequency: 'monthly',
      defaultEffort: 'high',
      defaultPain: 'high'
    }
  ],
  reporting: [
    {
      id: 'rep-1',
      domainId: 'reporting',
      titleEn: 'Reporting Template Updates',
      titleZh: '环境数据模板格式修订',
      descEn: 'Maintaining standard non-financial database disclosure mapping schemas periodically.',
      descZh: '紧盯最新国家环境统计法典规范，调整后台的碳抵抵消数据库格式一致率。',
      defaultFrequency: 'monthly',
      defaultEffort: 'medium',
      defaultPain: 'low'
    },
    {
      id: 'rep-2',
      domainId: 'reporting',
      titleEn: 'Multi-source Data Merging',
      titleZh: '异构环境数据映射汇总',
      descEn: 'Synthesizing personnel logs and office spatial energy readings to write data sheets.',
      descZh: '将琐碎的打卡行为日志与写字楼总线端能耗实测表单进行异构模型合并。',
      defaultFrequency: 'weekly',
      defaultEffort: 'high',
      defaultPain: 'high'
    },
    {
      id: 'rep-3',
      domainId: 'reporting',
      titleEn: 'GHG Emission Conversion Mapping',
      titleZh: '二氧化碳温室气体当量换算',
      descEn: 'Translating activity volumes to scientific equivalent units (CO2e kg).',
      descZh: '依据各地网格排放因子标准，手动将纸张克重、行公里数代换为二氧化碳当量克重。',
      defaultFrequency: 'weekly',
      defaultEffort: 'medium',
      defaultPain: 'medium'
    }
  ],
  culture: [
    {
      id: 'cult-1',
      domainId: 'culture',
      titleEn: 'Green Culture Evaluation Surveys',
      titleZh: '绿色组织文化成熟度底数追踪',
      descEn: 'Analyzing corporate-wide environmental psychology indexes to identify active hubs.',
      descZh: '面向基层随机发放心理环境行为卷，了解对低碳指令是主动执行还是被迫应付。',
      defaultFrequency: 'monthly',
      defaultEffort: 'medium',
      defaultPain: 'low'
    },
    {
      id: 'cult-2',
      domainId: 'culture',
      titleEn: 'Champion Network Coordinating',
      titleZh: '低碳志愿者意见领袖社群协调',
      descEn: 'Mobilizing and onboarding volunteer change-agents across branch sites.',
      descZh: '连结并组织各业务线的环保骨干会议，维持全员降碳的自驱和互助带动力。',
      defaultFrequency: 'weekly',
      defaultEffort: 'medium',
      defaultPain: 'medium'
    },
    {
      id: 'cult-3',
      domainId: 'culture',
      titleEn: 'Green Campaign Updates Dispatching',
      titleZh: '日常绿色宣导内容编辑与推送',
      descEn: 'Drafting success newsletters and monthly energy saving leaderboards.',
      descZh: '每周汇聚降碳先遣队排名情况，撰写企宣快报和精美榜单向全大楼推送。',
      defaultFrequency: 'weekly',
      defaultEffort: 'medium',
      defaultPain: 'low'
    }
  ],
  leadership: [
    {
      id: 'lead-1',
      domainId: 'leadership',
      titleEn: 'Executive ESG Alignment Seeding',
      titleZh: '高管环境认同与决策导向对齐',
      descEn: 'Gathering feedback from executive boards on sustainable priority milestones.',
      descZh: '与经营高管一小时对焦，提炼与本年度公司市值、ESG财报最为呼应的习惯抓手。',
      defaultFrequency: 'monthly',
      defaultEffort: 'medium',
      defaultPain: 'low'
    },
    {
      id: 'lead-2',
      domainId: 'leadership',
      titleEn: 'Decison Matrix Maintenance',
      titleZh: '决策场景沙盘边界演化校正',
      descEn: 'Updating simulation limits against latest tax reductions and credit lines.',
      descZh: '结合碳权期货波动、配额缩紧，不定期矫正员工降碳习惯沙盒推演算法。',
      defaultFrequency: 'monthly',
      defaultEffort: 'high',
      defaultPain: 'high'
    },
    {
      id: 'lead-3',
      domainId: 'leadership',
      titleEn: 'Board ESG Performance Briefing',
      titleZh: '董事会绿色低碳成果简报汇编',
      descEn: 'Framing corporate environmental score achievements elegantly for strategic signoffs.',
      descZh: '编制高维、精简的无纸化及低能耗行为的成果决议报单，供董事会决策归档。',
      defaultFrequency: 'monthly',
      defaultEffort: 'high',
      defaultPain: 'medium'
    }
  ]
};

interface AiOpportunityDiscoveryProps {
  lang?: 'en' | 'zh';
}

export default function AiOpportunityDiscovery({ lang = 'zh' }: AiOpportunityDiscoveryProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Task selection & evaluation rating states
  const [taskRatings, setTaskRatings] = useState<Record<string, {
    frequency: 'daily' | 'weekly' | 'monthly';
    effort: 'low' | 'medium' | 'high';
    pain: 'low' | 'medium' | 'high';
    sustainabilityImpact: 'low' | 'medium' | 'high';
    pebContribution: 'low' | 'medium' | 'high';
    implementationDifficulty: 'low' | 'medium' | 'high';
    strategicValue: 'low' | 'medium' | 'high';
    included: boolean;
  }>>(() => {
    const initial: Record<string, any> = {};
    Object.keys(TASK_SUGGESTIONS).forEach(dKey => {
      TASK_SUGGESTIONS[dKey].forEach(t => {
        initial[t.id] = {
          frequency: t.defaultFrequency,
          effort: t.defaultEffort,
          pain: t.defaultPain,
          sustainabilityImpact: 'medium',
          pebContribution: 'medium',
          implementationDifficulty: 'medium',
          strategicValue: 'medium',
          included: true
        };
      });
    });
    return initial;
  });

  const handleToggleDomain = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([...selectedIds.slice(1), id]);
      }
    }
  };

  const handleClear = () => {
    setSelectedIds([]);
    setStep(1);
    
    // Reset tasks defaults
    const resetRatings: Record<string, any> = {};
    Object.keys(TASK_SUGGESTIONS).forEach(dKey => {
      TASK_SUGGESTIONS[dKey].forEach(t => {
        resetRatings[t.id] = {
          frequency: t.defaultFrequency,
          effort: t.defaultEffort,
          pain: t.defaultPain,
          sustainabilityImpact: 'medium',
          pebContribution: 'medium',
          implementationDifficulty: 'medium',
          strategicValue: 'medium',
          included: true
        };
      });
    });
    setTaskRatings(resetRatings);
  };

  const handleUpdateRating = (
    taskId: string, 
    field: 'frequency' | 'effort' | 'pain' | 'sustainabilityImpact' | 'pebContribution' | 'implementationDifficulty' | 'strategicValue' | 'included', 
    value: any
  ) => {
    setTaskRatings(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value
      }
    }));
  };

  const handleNextToStep2 = () => {
    if (selectedIds.length !== 3) return;
    setStep(2);
  };

  const handleBackToStep1 = () => {
    setStep(1);
  };

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(4);
    }, 1200);
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      setStep(5);
    }, 1200);
  };

  const selectedDomains = useMemo(() => {
    return DOMAINS.filter(d => selectedIds.includes(d.id));
  }, [selectedIds]);

  const activeTasksForSelectedDomains = useMemo(() => {
    return selectedIds.flatMap(dId => TASK_SUGGESTIONS[dId] || []);
  }, [selectedIds]);

  const assessmentSummary = useMemo(() => {
    if (selectedIds.length !== 3) return null;

    const filteredActive = activeTasksForSelectedDomains.filter(t => taskRatings[t.id]?.included);
    if (filteredActive.length === 0) return null;

    const freqScore = { daily: 5, weekly: 3, monthly: 1 };
    const effortScore = { high: 3, medium: 2, low: 1 };
    const painScore = { high: 3, medium: 2, low: 1 };

    // 1. Most Effort Tasks
    const mostEffort = filteredActive
      .filter(t => taskRatings[t.id]?.effort === 'high')
      .map(t => ({
        id: t.id,
        titleEn: t.titleEn,
        titleZh: t.titleZh,
        domainTitleEn: DOMAINS.find(d => d.id === t.domainId)?.titleEn,
        domainTitleZh: DOMAINS.find(d => d.id === t.domainId)?.titleZh
      }));

    // 2. High Frequency Tasks
    const highFreq = filteredActive
      .filter(t => taskRatings[t.id]?.frequency === 'daily' || taskRatings[t.id]?.frequency === 'weekly')
      .map(t => ({
        id: t.id,
        titleEn: t.titleEn,
        titleZh: t.titleZh,
        frequency: taskRatings[t.id].frequency
      }));

    // 3. AI Suitability Rank = (EffortValue + PainValue) * FrequencyValue
    const rankedCandidates = filteredActive.map(t => {
      const r = taskRatings[t.id];
      const combinedComplexity = effortScore[r.effort] + painScore[r.pain];
      const frequencyMultiplier = freqScore[r.frequency];
      const score = combinedComplexity * frequencyMultiplier;
      return { task: t, score };
    }).sort((a, b) => b.score - a.score);

    // 4. Greatest Sustainability Impact Candidates (reporting, compliance, performance carry higher base weights)
    const sustainabilityImpactCandidates = filteredActive.map(t => {
      const r = taskRatings[t.id];
      let domainBase = 1;
      if (['compliance', 'reporting', 'performance'].includes(t.domainId)) {
        domainBase = 3;
      } else if (['training', 'rewards', 'engagement'].includes(t.domainId)) {
        domainBase = 2;
      }
      const score = domainBase * effortScore[r.effort] * painScore[r.pain];
      return { task: t, score };
    }).sort((a, b) => b.score - a.score);

    // Best AI Target recommendation
    let topAiPotentialTask = rankedCandidates[0]?.task;

    return {
      mostEffort,
      highFreq,
      aiTargets: rankedCandidates.slice(0, 3).map(c => c.task),
      sustainabilityTargets: sustainabilityImpactCandidates.slice(0, 2).map(c => c.task),
      topAiPotentialTask,
      totalActiveCount: filteredActive.length
    };
  }, [selectedIds, taskRatings, activeTasksForSelectedDomains]);

  // Dynamic Synthesis for Step 1 domains
  const domainSynthesis = useMemo(() => {
    if (selectedDomains.length < 3) return null;

    let bestPotential = selectedDomains[0];
    const priorityOrder = ['training', 'rewards', 'reporting', 'compliance', 'performance', 'culture', 'recruitment', 'engagement', 'leadership'];
    for (const pId of priorityOrder) {
      const match = selectedDomains.find(d => d.id === pId);
      if (match) {
        bestPotential = match;
        break;
      }
    }

    const thematicFocusEn = 
      selectedIds.includes('compliance') || selectedIds.includes('reporting') || selectedIds.includes('performance')
        ? 'A high focus on operational compliance, auditable traceability, and rigorous environment measurement layers.'
        : selectedIds.includes('culture') || selectedIds.includes('engagement') || selectedIds.includes('training')
        ? 'A strongly workforce-centric posture, aiming to cultivate grassroots engagement and long-term sustainability routines.'
        : 'An integrated Green HR strategy that targets systemic skill upgrade, recruitment filters, and leadership incentives.';

    const thematicFocusZh = 
      selectedIds.includes('compliance') || selectedIds.includes('reporting') || selectedIds.includes('performance')
        ? '高度聚焦于企业治理层面的客观合规审计、数据穿透力，致力于清除“漂绿假象”并建立无可辩驳的可追随避碳账册。'
        : selectedIds.includes('culture') || selectedIds.includes('engagement') || selectedIds.includes('training')
        ? '侧重于“组织人心激发”与“行为浸润”，提倡通过无痛的日常习惯渗透、学习心流与文化对齐，激发自发的绿色文化。'
        : '一套统合性绿色招聘、能力升级与高层激励的多维度战略，力图从人才入口与顶层决策端锁定双向减碳成果。';

    return {
      bestPotential,
      thematicFocusEn,
      thematicFocusZh
    };
  }, [selectedDomains, selectedIds]);

  // Dynamic Strategic Consensus Summary evaluation
  const strategicSummary = useMemo(() => {
    if (selectedIds.length !== 3) return null;
    const filteredActive = activeTasksForSelectedDomains.filter(t => taskRatings[t.id]?.included);
    if (filteredActive.length === 0) return null;

    const capabilities = filteredActive.map(t => AI_MAPPING_DB[t.id]?.capabilityNameZh || '流程自动化');
    const capabilitiesEn = filteredActive.map(t => AI_MAPPING_DB[t.id]?.capabilityNameEn || 'Workflow Automation');

    // Unique capability lists
    const uniqueCaps = Array.from(new Set(capabilities));
    const uniqueCapsEn = Array.from(new Set(capabilitiesEn));

    // Dynamic areas calculation
    const domainNamesZh = selectedDomains.map(d => d.titleZh);
    const domainNamesEn = selectedDomains.map(d => d.titleEn);

    const mostFreqCapZh = uniqueCaps.slice(0, 3).join('、');
    const mostFreqCapEn = uniqueCapsEn.slice(0, 3).join(', ');

    return {
      mostFreqCapZh,
      mostFreqCapEn,
      topDomainsZh: domainNamesZh.slice(0, 2).join('与'),
      topDomainsEn: domainNamesEn.slice(0, 2).join(' & ')
    };
  }, [selectedIds, activeTasksForSelectedDomains, taskRatings, selectedDomains]);

  // Helper function to extract pilot project descriptions dynamically per domain
  const getRecommendedPilot = (task: any, currentLang: 'en' | 'zh') => {
    const domainId = task.domainId;
    
    if (domainId === 'training') {
      return {
        title: currentLang === 'en' ? 'AI Green Training Assistant' : 'AI 绿色培训智能助手',
        reason: currentLang === 'en' 
          ? 'High frequency of course updates, low technical friction to implement, and high staff touchpoints making it perfect for rapid-launch cultural changes.' 
          : '课程分发高频，大模型微课流程和智能答疑体系搭建难度低，且员工日常触达面广，是拉动学习型绿色文化的最佳切入点。',
        orgBenefits: currentLang === 'en' 
          ? 'Saves 85% of course design administrative duties and automates standard competency metrics training.' 
          : '大幅消减人资团队约 85% 以上的材料汇聚和分发工作；系统自适应评核绿色学分成果。',
        esgBenefits: currentLang === 'en' 
          ? 'Unlocks auditable tracing metrics representing employee green skill milestones for double materiality.' 
          : '提供完全透明、无水分、符合第三方ESG鉴证标准的全员绿色能力发展学时与学分账册。',
        ghrmImprovements: currentLang === 'en' 
          ? 'Instantly updates human capacity planning indexes and correlates environmental training with productivity.' 
          : '使组织学习发展（L&D）体系与ESG管治指标深度咬合，提升绿色人力管治效力。',
        pebOutcomes: currentLang === 'en' 
          ? 'Improves active employee eco-participation score by 35% through custom micro-nudges and game mechanics.' 
          : '结合即时互动荣誉徽章刺激与自发打卡，推动员工日常亲环境主动执行率提升 35% 以上。'
      };
    } else if (domainId === 'performance') {
      return {
        title: currentLang === 'en' ? 'AI Green Performance Integrator' : 'AI 绿色绩效无感采集器',
        reason: currentLang === 'en' 
          ? 'Solves massive manual energy-use ledger verification issues by linking daily activities seamlessly with payroll parameters.' 
          : '打通日常减排动作与考核指标的堵点。摆脱繁琐的手工能耗报送，将员工绿色绩效直接回填至考评中心。',
        orgBenefits: currentLang === 'en' 
          ? 'Shifts evaluation overhead from spreadsheets to secure automated APIs; boosts tracking cadence.' 
          : '彻底免除纸质申报磨损；自动对齐双面复印、公交通勤等离散数据，将审核成本压低为零。',
        esgBenefits: currentLang === 'en' 
          ? 'Generates direct physical carbon offsets logging for audited CSRD environment disclosure compliance.' 
          : '生成真实的、可计量并可被会计事务所独立穿透的环境绩效数据，杜绝一切“漂绿”指控。',
        ghrmImprovements: currentLang === 'en' 
          ? 'Replaces rigid yearly appraisal templates with highly agile adaptive weekly progress checks.' 
          : '引导绩效考评管理由一刀切的硬性指标考核，转变为积极的、多维度的自适应节能行为激励。',
        pebOutcomes: currentLang === 'en' 
          ? 'Increases sustainable actions repetition rate by 45% due to immediate organizational recognition.' 
          : '通过“无感感知-极速归账-周度通报”效率发酵，使全员日常随手关灯、双面打印等行为翻倍（+45%）。'
      };
    } else if (domainId === 'rewards') {
      return {
        title: currentLang === 'en' ? 'AI Carbon Rewards Catalog Nudger' : 'AI 碳普惠与算法礼遇匹配智能助手',
        reason: currentLang === 'en' 
          ? 'Brings maximum employee satisfaction multipliers through automated preference matches against eco-goods catalog.' 
          : '员工满意度及制度感知率高。利用大模型分析员工生活偏好，定制极富吸引力的减碳礼遇，使预算效能最大化。',
        orgBenefits: currentLang === 'en' 
          ? 'Boosts eco-points store engagement rate by 60% and maintains precise budget boundaries.' 
          : '将降碳绿币兑现互动热度提升 60% 以上，并精准平抑绿币流速，防范福利预算超支。',
        esgBenefits: currentLang === 'en' 
          ? 'Publicly proves corporate alignment of wellness benefits with solid low carbon employee contributions.' 
          : '在社会与治理（S & G）维度建立企业与员工利益共享的环境合规模型，塑造卓越雇主声誉。',
        ghrmImprovements: currentLang === 'en' 
          ? 'Decentralizes micro reward allocations, shifting administration from standard bureaucracy to auto-payout algorithms.' 
          : '将报销及拨发流转从“人工签字核对”转为“系统即时履账”，大幅清除行政和财务审批磨损。',
        pebOutcomes: currentLang === 'en' 
          ? 'Builds long term low-carbon habits by establishing standard psychological reward feedback loops.' 
          : '让员工体验到降碳与日常生活的极佳互动，消除传统环保行为的道德疲劳，实现行为自驱。'
      };
    } else if (domainId === 'compliance') {
      return {
        title: currentLang === 'en' ? 'AI ESG Document Anti-Greenwash Guard' : 'AI 防漂绿合规风控智能哨兵',
        reason: currentLang === 'en' 
          ? 'Instantly flags non-conforming items in data dumps and prevents regulatory or audit reporting litigation risks.' 
          : '企业避险与披露刚需。在报告底本生成时进行秒级深度查重和归账漏洞定位，防御合规处罚。',
        orgBenefits: currentLang === 'en' 
          ? 'Provides 24/7 scanning of draft environment statistics; saves 75% of audit readiness costs.' 
          : '对采购报销单、资产碳流转进行24小时非侵入式筛检，将外部审计周期从数月压缩至数周。',
        esgBenefits: currentLang === 'en' 
          ? 'Ensures complete consistency with rigorous ISSB and double-materiality disclosure norms.' 
          : '确保对外发布的所有低碳成就与财务指标毫无逻辑冲突，完美承接国际绿色主板的顶板审验。',
        ghrmImprovements: currentLang === 'en' 
          ? 'Injects precise corporate legal awareness directly into Green HR administrative departments.' 
          : '将前沿的ESG法务知识无壁垒赋能给人力团队，保障任何机制的推行不踩法理红线。',
        pebOutcomes: currentLang === 'en' 
          ? 'Promotes high organizational credibility, showing workers that policies are verified with rigorous honesty.' 
          : '通过对数据和宣言进行“透明去水”，使员工笃信治理诚意，彻底排除“走过场”的敷衍心态。'
      };
    } else if (domainId === 'reporting') {
      return {
        title: currentLang === 'en' ? 'AI Sustainability Discloser & Aggregator' : 'AI 多源数据 ESG 披露自动编制助手',
        reason: currentLang === 'en' 
          ? 'Simplifies massive data compilation. Uses smart agent layers to merge fragmented records into unified GRI reports.' 
          : '大幅简化繁杂文档编撰。用语义大模型取代传统的跨部门“文山会海”，一键整合无纸化和能效底账。',
        orgBenefits: currentLang === 'en' 
          ? 'Drafts clear GRI-compliant executive summaries instantly, saving hundreds of labor hours annually.' 
          : '秒级汇编出专业、精炼的董事会绿政汇报文档；关联分析能消耗用与全员减排趋势。',
        esgBenefits: currentLang === 'en' 
          ? 'Ensures 100% auditable digital footprints, allowing quick external auditor signoffs.' 
          : '提供高度精确、富含数学逻辑和图表佐证的可持续报告，确保在评级中稳拿高分。',
        ghrmImprovements: currentLang === 'en' 
          ? 'Highlights human resources environmental ROI in quantitative formulas, elevating Green HR value.' 
          : '让低碳习惯和日常治理产出在董事会用“真能效”说话，提高人力资源管理的决策话语权。',
        pebOutcomes: currentLang === 'en' 
          ? 'Boosts collective staff pride by presenting beautifully interactive environmental milestones.' 
          : '将员工日常涓涓细流的环保行为自动渲染为亮眼的组织功勋墙，形成持续的群体荣誉正反馈。'
      };
    } else if (domainId === 'recruitment') {
      return {
        title: currentLang === 'en' ? 'AI Green Talent Matcher' : 'AI 绿色心智人才遴选与校准雷达',
        reason: currentLang === 'en' 
          ? 'Finds candidates with strong climate values and green technical skill sets across massive job-board dumps.' 
          : '大模型语义归类优势显著。在候选人投递初期即可识别绿色技能与对低碳愿景的契合度，从源头引进火种。',
        orgBenefits: currentLang === 'en' 
          ? 'Improves hiring efficiency of specialist sustainability staff by 70% with lower early attrition.' 
          : '将寻找 ESG 专业技能、低碳合规师的初筛耗时压缩 70% 以上，并拉升长期留任率。',
        esgBenefits: currentLang === 'en' 
          ? 'Embeds human-capital green transition KPIs directly into corporate governance evaluation vectors.' 
          : '将“绿色人才储备供给率”作为企业人力政策变革的先行指标，向社会责任考核大局交出高分答卷。',
        ghrmImprovements: currentLang === 'en' 
          ? 'Sets up standard ecological competence metrics (Eco-Competencies) dynamically across departments.' 
          : '为人资招聘规章库内嵌客观的低碳技能测试评级方案，使全集团的人员选聘自带“环保审查盾”。',
        pebOutcomes: currentLang === 'en' 
          ? 'Ensures onboarding candidates already default to active pro-environmental habits from day one.' 
          : '由于录取人员普遍在环保价值观上具备出色的心智基础，使得新制度落地时的自驱阻力降至最低。'
      };
    } else if (domainId === 'engagement') {
      return {
        title: currentLang === 'en' ? 'AI Green Engagement Bot & Nudger' : 'AI 随手节能打卡与社群交互小管家',
        reason: currentLang === 'en' 
          ? 'Leverages computer vision and natural language feedback to turn monotonous routine checks into exciting community games.' 
          : '极易调动员工积极性。利用视觉模型核准午餐光盘、随手关灯等微环境照片，自动发币发奖，活跃底座高。',
        orgBenefits: currentLang === 'en' 
          ? 'Boosts volunteer eco-campaign adoption rates; cuts weekly coordination overhead by 90% via automated verification.' 
          : '以极小运营成本拉动两倍以上的主动打卡流量，免除HR手动核对照片统计分数的冗长折磨。',
        esgBenefits: currentLang === 'en' 
          ? 'Supports robust Green HR culture tracking, representing high rating criteria within ESG social pillar audits.' 
          : '积累广泛、真实的员工绿色生活轨迹流，生成反映企业活力指数与社会责任感（Social）的实力证明。',
        ghrmImprovements: currentLang === 'en' 
          ? 'Enables direct digital outreach of custom energy-saving notifications to correct localized dropouts.' 
          : '赋予HR自运行的小程序挑战发布平台，实现去中心化的全员大楼低碳活动编排。',
        pebOutcomes: currentLang === 'en' 
          ? 'Creates intense peer positive social feedback; turns micro-saving targets into collective lifestyle.' 
          : '依托部门 PK 和碳信用排行榜建立同伴效用，让低碳节能不再是硬性管制，而是有趣、潮酷的员工新时尚。'
      };
    } else if (domainId === 'culture') {
      return {
        title: currentLang === 'en' ? 'AI Green Culture Network Advocate Map' : 'AI 组织绿色文化火种分析器',
        reason: currentLang === 'en' 
          ? 'Leverages network analytics to pin-point key influencers in informal channels to spread green habits.' 
          : '组织学科学诊断。通过分析企业微信或社交网络，挖掘隐性的环保意见领袖员工，以四两拨千斤。',
        orgBenefits: currentLang === 'en' 
          ? 'Halves cultural change timespans; strengthens natural department synchronization naturally.' 
          : '文化推进阵痛减少一半以上；利用自然形成的人际纽带传递绿色理念，提高团队整体信任满意度。',
        esgBenefits: currentLang === 'en' 
          ? 'Concretized qualitative human values into traceable network matrix change metrics.' 
          : '将抽象的“绿色组织文化建设”转化为可观测、可审计、具有数学可信度的社会变革演进谱系。',
        ghrmImprovements: currentLang === 'en' 
          ? 'Identifies and empowers low-carbon ambassadors based on peer network dynamics rather than hierarchy.' 
          : '精准圈定最具有感召力的“低碳火种团队”，让每一份环保倡议都能引发真实的波纹共振。',
        pebOutcomes: currentLang === 'en' 
          ? 'Replaces corporate enforcement policies with social mimicry and local group validation.' 
          : '让员工在日常中自发形成“低碳荣、漂绿耻”的自制文化空气，让低碳习惯升华为下意识行为。'
      };
    } else {
      return {
        title: currentLang === 'en' ? 'AI Sustainable Roadmap Optimizer' : 'AI 可持续领导力战略推演沙盒',
        reason: currentLang === 'en' 
          ? 'Empowers the executive suite with macro-policy simulations, aligning regulatory carbon goals with business viability.' 
          : '高瞻远瞩的领导决策刚需。使高管可以通过大模型算法，测算“收紧能削用量”面对企业人效的动态博弈。',
        orgBenefits: currentLang === 'en' 
          ? 'Translates complex ESG directives into visually explicit, step-by-step roadmap segments for managers.' 
          : '秒级将最新ESG法规要求转译为各职能部门能理解、好落地的“年度习惯行动优先级矩阵”。',
        esgBenefits: currentLang === 'en' 
          ? 'Attracts institutional ESG funds by showing verified top-down alignment and forward looking governance.' 
          : '向投资人及外部专业ESG评级机构彰显企业决策层强有力的绿色领导力以及顶层风险穿透智慧。',
        ghrmImprovements: currentLang === 'en' 
          ? 'Translates complex long-term emission parameters into concrete managerial coaching metrics and core KPIs.' 
          : '将集团宏大的碳中和年限目标，平稳拆卸为人资规章与领导业绩、管理梯队挂钩的科学考核体系。',
        pebOutcomes: currentLang === 'en' 
          ? 'Spurs high organizational trust; subordinates replicate green behaviors because leaders are certified pioneers.' 
          : '建立“其身正，不令而行”的领袖低碳风貌，极大强化一线人员跟进集团合规行动的主动性与信念。'
      };
    }
  };

  // Step 4 useMemo: prioritize tasks based on 6 key dimensions
  const prioritizedTasks = useMemo(() => {
    const filteredActive = activeTasksForSelectedDomains.filter(t => taskRatings[t.id]?.included);
    if (filteredActive.length === 0) return [];

    const valueMap = { low: 1, medium: 2, high: 3 };
    const freqMap = { monthly: 1, weekly: 2, daily: 3 };

    return filteredActive.map(t => {
      const r = taskRatings[t.id] || {
        frequency: t.defaultFrequency,
        effort: t.defaultEffort,
        pain: t.defaultPain,
        sustainabilityImpact: 'medium',
        pebContribution: 'medium',
        implementationDifficulty: 'medium',
        strategicValue: 'medium'
      };

      const freqScore = freqMap[r.frequency] || 2;
      const effortScore = valueMap[r.effort] || 2; // resource savings score
      const sustScore = valueMap[r.sustainabilityImpact] || 2;
      const pebScore = valueMap[r.pebContribution] || 2;
      const stratScore = valueMap[r.strategicValue] || 2;
      const easeScore = r.implementationDifficulty === 'low' ? 3 : r.implementationDifficulty === 'medium' ? 2 : 1; // Inverted diff: less difficulty = higher priority

      const totalValue = stratScore + sustScore + pebScore + freqScore + effortScore + easeScore;
      const priorityScore = Math.round((totalValue / 18) * 100);

      // Category classification
      let category: 'high' | 'medium' | 'future' = 'medium';
      if (priorityScore >= 75) {
        category = 'high';
      } else if (priorityScore < 55) {
        category = 'future';
      }

      return {
        task: t,
        ratings: r,
        score: priorityScore,
        category,
        components: {
          freqScore,
          effortScore,
          sustScore,
          pebScore,
          stratScore,
          easeScore
        }
      };
    }).sort((a, b) => b.score - a.score);
  }, [activeTasksForSelectedDomains, taskRatings]);

  // Step 4 useMemo: Recommended pilot project details
  const recommendedPilot = useMemo(() => {
    if (prioritizedTasks.length === 0) return null;
    const top = prioritizedTasks[0];
    return {
      task: top.task,
      details: getRecommendedPilot(top.task, lang),
      score: top.score
    };
  }, [prioritizedTasks, lang]);

  // Step 4 useMemo: Roadmap categorization
  const roadmapPhases = useMemo(() => {
    const phase1: typeof prioritizedTasks = [];
    const phase2: typeof prioritizedTasks = [];
    const phase3: typeof prioritizedTasks = [];

    prioritizedTasks.forEach(pt => {
      if (pt.category === 'high' && pt.ratings.implementationDifficulty !== 'high') {
        phase1.push(pt);
      } else if (pt.category === 'future' || pt.ratings.implementationDifficulty === 'high') {
        phase3.push(pt);
      } else {
        phase2.push(pt);
      }
    });

    return { phase1, phase2, phase3 };
  }, [prioritizedTasks]);

  // Step 5 useMemo: Consulting strategic summary recommendations
  const consultingSummary = useMemo(() => {
    if (prioritizedTasks.length === 0) return null;

    // Strongest ESG Impact
    const topEsg = [...prioritizedTasks].sort((a, b) => b.components.sustScore - a.components.sustScore)[0];

    // Strongest Green HR Influence
    const topGhrm = [...prioritizedTasks].sort((a, b) => b.components.stratScore - a.components.stratScore)[0];

    // Strongest PEB
    const topPeb = [...prioritizedTasks].sort((a, b) => b.components.pebScore - a.components.pebScore)[0];

    return {
      topEsg,
      topGhrm,
      topPeb
    };
  }, [prioritizedTasks]);

  return (
    <div id="ai_opportunity_discovery_panel" className="bg-white rounded-[2rem] border border-slate-200/80 shadow-md p-6 font-sans text-slate-800 space-y-6 max-w-7xl mx-auto w-full">
      
      {/* 1. Dynamic Interactive Stepper Header */}
      <div className="border-b border-slate-100 pb-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="p-1 px-2.5 bg-indigo-50 text-indigo-700 border border-indigo-150 rounded-full text-[9px] font-mono tracking-widest uppercase flex items-center gap-1 font-black">
              <Brain className="w-3.5 h-3.5 text-indigo-600" />
              AI GREEN HUB
            </span>
            <span className="p-1 px-2.5 bg-emerald-50 text-emerald-700 border border-emerald-150 rounded-full text-[9px] font-mono tracking-widest uppercase flex items-center gap-1 font-black">
              {lang === 'en' ? 'STRATEGIC INTERACTIVE WORKSHOP' : '绿色管理低碳诊断沙盘'}
            </span>
          </div>

          {/* Wizard step breadcrumbs */}
          <div className="flex items-center gap-2 text-[9.5px] sm:text-[10px] font-mono font-extrabold uppercase shrink-0 flex-wrap">
            <span className={`px-2 py-0.5 rounded-md ${step === 1 ? 'bg-indigo-950 text-white' : 'text-slate-400 bg-slate-50 border border-slate-150'}`}>
              01 • {lang === 'en' ? 'Domains' : '领域评估'}
            </span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className={`px-2 py-0.5 rounded-md ${step === 2 ? 'bg-indigo-950 text-white' : 'text-slate-400 bg-slate-50 border border-slate-150'}`}>
              02 • {lang === 'en' ? 'Tasks' : '重复任务'}
            </span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className={`px-2 py-0.5 rounded-md ${step === 3 ? 'bg-indigo-950 text-white' : 'text-slate-400 bg-slate-50 border border-slate-150'}`}>
              03 • {lang === 'en' ? 'AI Match' : '能力匹配'}
            </span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className={`px-2 py-0.5 rounded-md ${step === 4 ? 'bg-indigo-950 text-white' : 'text-slate-400 bg-slate-50 border border-slate-150'}`}>
              04 • {lang === 'en' ? 'Priorites' : '优先级评估'}
            </span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className={`px-2 py-0.5 rounded-md ${step === 5 ? 'bg-indigo-950 text-white' : 'text-slate-400 bg-slate-50 border border-slate-150'}`}>
              05 • {lang === 'en' ? 'Diagnostic' : '诊断成果'}
            </span>
          </div>
        </div>

        {/* Dynamic Titles according to steps */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              {step === 1 && (lang === 'en' ? 'AI Opportunity Discovery' : 'AI 绿色机会自诊')}
              {step === 2 && (lang === 'en' ? 'Identify Repetitive Sustainability Tasks' : '识别重复性绿色管理任务')}
              {step === 3 && (lang === 'en' ? 'Match AI Functions with Sustainability Tasks' : '匹配 AI 绿色增效能力')}
              {step === 4 && (lang === 'en' ? 'AI Opportunity Prioritization' : 'AI 机会优先级评估')}
              {step === 5 && (lang === 'en' ? 'AI Task Discovery & Consensus Report' : '组织绿色事务 AI 增效诊断报告书')}
            </h2>
            <p className="text-xs text-slate-500 max-w-4xl mt-1 leading-relaxed">
              {step === 1 && (lang === 'en' 
                ? 'Step 1: Choose the three sustainability management areas that are most important, most challenging, or most resource-intensive.'
                : '第一步：选择对贵组织最重要、最具挑战性或最消耗管理精力的三个绿色管理关键领域。')}
              {step === 2 && (lang === 'en'
                ? 'Step 2: Discover which sustainability-related activities are repeated most often and assess their exact weekly workloads and friction points.'
                : '第二步：识别组织中最频繁出现、最依赖人工录单且最适合 AI 增效的绿色管理重复作业。')}
              {step === 3 && (lang === 'en'
                ? 'Step 3: Discover how AI capabilities can support sustainability management and improve organizational performance.'
                : '第三步：识别人工智能如何有效辅助对应的重复绿色管理工作，打通效率堵点并驱动低碳运营绩效。')}
              {step === 4 && (lang === 'en'
                ? 'Step 4: Identify which AI initiatives should be implemented first to maximize organizational and sustainability impact.'
                : '第四步：识别最值得优先实施的AI项目，以实现最大的组织价值与可持续发展收益。')}
              {step === 5 && (lang === 'en'
                ? 'Step 5: Executive strategic digest analyzing custom workloads against pro-environmental constraints.'
                : '第五步：管理层合规自决底册，评估组织内“重复磨损”重灾区，勾画低碳落地与高回报 AI 替代路线图。')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <button 
                onClick={handleClear}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 font-medium cursor-pointer flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Reset Sandtable' : '重置沙盘'}
              </button>
            )}
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-[11px] font-mono font-bold flex items-center gap-1.5">
              <span className="text-slate-400">{lang === 'en' ? 'Selected Domains:' : '已选主领域:'}</span>
              <span className={selectedIds.length === 3 ? 'text-emerald-600' : 'text-indigo-600'}>
                {selectedIds.length} / 3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER STEP PAGE PANELS */}
      <AnimatePresence mode="wait">
        
        {/* ================= STEP 1: DOMAINS GRID ================= */}
        {step === 1 && (
          <motion.div
            key="step1_panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Bento Grid layout representing 9 options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
              {DOMAINS.map((domain) => {
                const isSelected = selectedIds.includes(domain.id);
                const Icon = domain.icon;
                
                return (
                  <div 
                    key={domain.id}
                    onClick={() => handleToggleDomain(domain.id)}
                    className={`p-5 rounded-[1.75rem] border transition-all relative flex flex-col justify-between h-[210px] select-none cursor-pointer group ${
                      isSelected 
                        ? 'bg-indigo-950 text-white border-indigo-900 shadow-xl scale-[1.01]' 
                        : 'bg-slate-50 border-slate-150 hover:bg-slate-100 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {/* Active check indicator top right */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1 rounded-full shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className={`p-2 rounded-xl w-10 h-10 flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-indigo-900 text-amber-300' : 'bg-white text-slate-700 border border-slate-200'
                      }`}>
                        <Icon className="w-5.5 h-5.5" />
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-mono font-bold tracking-wider opacity-60 uppercase">
                          {domain.id === 'recruitment' ? 'GH-01' : 
                           domain.id === 'training' ? 'GH-02' :
                           domain.id === 'performance' ? 'GH-03' :
                           domain.id === 'rewards' ? 'GH-04' :
                           domain.id === 'engagement' ? 'GH-05' :
                           domain.id === 'compliance' ? 'GH-06' :
                           domain.id === 'reporting' ? 'GH-07' :
                           domain.id === 'culture' ? 'GH-08' : 'GH-09'}
                        </div>
                        <h4 className={`text-sm font-extrabold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {lang === 'en' ? domain.titleEn : domain.titleZh}
                        </h4>
                      </div>

                      <p className={`text-[10.5px] leading-relaxed line-clamp-3 font-medium ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {lang === 'en' ? domain.descEn : domain.descZh}
                      </p>
                    </div>

                    <div className={`text-[8.5px] font-mono border-t pt-2 mt-2 leading-none flex items-center justify-between ${
                      isSelected ? 'border-white/10 text-slate-400' : 'border-slate-200/80 text-slate-400'
                    }`}>
                      <span className="uppercase">{lang === 'en' ? 'Click to evaluate' : '点击进行评估'}</span>
                      <span className={isSelected ? 'text-emerald-400 font-extrabold font-mono text-[9px]' : 'text-indigo-600 font-bold'}>
                        {isSelected ? 'SELECTED•已选' : 'READY•就绪'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stepper controls indicator */}
            {selectedIds.length === 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-50/65 border border-indigo-150 p-5 rounded-2.5xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-xs font-black text-indigo-950 block">🎉 {lang === 'en' ? 'Strategic Domains Configured / 领域锁定就绪' : '三大焦点方向已被锁定'}</span>
                  <p className="text-[11px] text-slate-500 leading-normal max-w-2xl font-medium">
                    {lang === 'en'
                      ? "You have chosen three priority domains. Step 2 will automatically retrieve suggested recurring tasks to run workload assessments."
                      : '您已精准勾画了最期望赋能转型的主线范畴。第二步将自动基于这三大职能，激活AI辅助脑暴，深入调研具体的日常重复管理痛点。'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNextToStep2}
                  className="px-6 py-3 bg-indigo-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md min-w-[210px] active:scale-[0.98]"
                >
                  <span>{lang === 'en' ? 'Continue to Step 2' : '推进至第二步: 识别重复任务'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ================= STEP 2: REPETITIVE TASKS WORKSHOP ================= */}
        {step === 2 && (
          <motion.div
            key="step2_panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Workshop Intro Card with guidelines instructions */}
            <div className="p-4 bg-slate-50 border border-slate-205 rounded-2.5xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-1">
                <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5 leading-none">
                  <ClipboardCheck className="w-4 h-4 text-emerald-600 animate-pulse" />
                  {lang === 'en' ? 'Smart Assisted Task Discovery Workshop' : '重复性绿色事务：AI 智能对齐盘点研讨'}
                </h4>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  {lang === 'en'
                    ? 'In any sustainable operation, administrative overhead limits actual environment actions. The system recommends three recurring tasks for each selected node. Evaluate their characteristics based on: Repetitive, Time-consuming, Manual, Data-intensive, or scaling barriers.'
                    : '要达成卓越的可持续管理，组织必须识别并剥离那些消耗海量时间、低效手工录表、高频发生且难以规模化的泥潭工作。AI已针对您第一步挑选的领域预拉取了契合的重复事务。'}
                </p>
              </div>

              {/* Task scoping guidelines box */}
              <div className="md:col-span-4 bg-white border border-slate-200 p-3 rounded-xl space-y-1.5 text-[10px] leading-normal text-slate-550 font-medium">
                <span className="font-extrabold text-slate-700 block uppercase font-mono tracking-wider">🎯 AUDIT ATTRIBUTES / 重复性工作判据:</span>
                <ul className="list-disc list-inside space-y-0.5 text-[9.5px]">
                  <li>{lang === 'en' ? 'High Repetition Frequency' : '发生频率高 (每日/每周)'}</li>
                  <li>{lang === 'en' ? 'Rely on Manual Excel/Verify' : '严重依赖人工录单/交叉查验'}</li>
                  <li>{lang === 'en' ? 'Heavy Data-intensity & Scale limits' : '信息数据量大，难以规模化对齐'}</li>
                </ul>
              </div>
            </div>

            {/* Loop through each Selected domain */}
            <div className="space-y-6">
              {selectedDomains.map((domain, dIdx) => {
                const DIcon = domain.icon;
                const tasks = TASK_SUGGESTIONS[domain.id] || [];

                return (
                  <div key={domain.id} className="border border-slate-200/90 rounded-[2rem] p-5 bg-white space-y-4 shadow-sm hover:border-slate-300 transition-all">
                    
                    {/* Domain sub header */}
                    <div className="pb-3 border-b border-slate-100 flex items-center gap-2.5">
                      <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
                        <DIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-[#4f46e5] font-black uppercase block leading-none">DOMAIN AREA 0{dIdx + 1}</span>
                        <h3 className="text-base font-extrabold text-slate-900 block mt-0.5">
                          {lang === 'en' ? domain.titleEn : domain.titleZh}
                          <span className="text-xs text-slate-400 font-medium font-sans ml-2">
                             ({lang === 'en' ? domain.descEn : domain.descZh})
                          </span>
                        </h3>
                      </div>
                    </div>

                    {/* Suggestions list for this domain */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-1">
                      {tasks.map((task) => {
                        const ratings = taskRatings[task.id] || {
                          frequency: task.defaultFrequency,
                          effort: task.defaultEffort,
                          pain: task.defaultPain,
                          included: true
                        };

                        return (
                          <div 
                            key={task.id}
                            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                              ratings.included 
                                ? 'bg-white border-indigo-200/60 shadow-xs' 
                                : 'bg-slate-50/50 border-slate-200 opacity-60'
                            }`}
                          >
                            <div className="space-y-2">
                              {/* Task header and inclusion toggle */}
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-extrabold text-xs text-slate-900 leading-tight">
                                  {lang === 'en' ? task.titleEn : task.titleZh}
                                </h4>
                                
                                <button
                                  type="button"
                                  onClick={() => handleUpdateRating(task.id, 'included', !ratings.included)}
                                  className={`px-2 py-0.5 rounded text-[8px] font-mono font-black uppercase cursor-pointer h-5 transition-colors ${
                                    ratings.included 
                                      ? 'bg-indigo-600 text-white' 
                                      : 'bg-slate-150 text-slate-400 hover:text-slate-700'
                                  }`}
                                >
                                  {ratings.included ? (lang === 'en' ? 'Audit' : '纳入') : (lang === 'en' ? 'Ignore' : '搁置')}
                                </button>
                              </div>

                              <p className="text-[10.5px] text-slate-500 leading-relaxed font-semibold">
                                {lang === 'en' ? task.descEn : task.descZh}
                              </p>
                            </div>

                            {/* ASSESSMENT pill selectors: Only interactive when included */}
                            {ratings.included ? (
                              <div className="border-t border-slate-100 pt-3.5 space-y-2 text-[9.5px]">
                                
                                {/* 1. Frequency Selector */}
                                <div className="space-y-1">
                                  <span className="text-slate-400 font-bold block">⏱️ {lang === 'en' ? 'Frequency:' : '发生频率:'}</span>
                                  <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-50 border border-slate-150 rounded-lg">
                                    {(['monthly', 'weekly', 'daily'] as const).map(f => {
                                      const isActive = ratings.frequency === f;
                                      return (
                                        <button
                                          key={f}
                                          type="button"
                                          onClick={() => handleUpdateRating(task.id, 'frequency', f)}
                                          className={`py-1 rounded-md text-[8.5px] font-mono font-bold text-center capitalize cursor-pointer transition-all ${
                                            isActive 
                                              ? f === 'daily' 
                                                ? 'bg-emerald-600 text-white shadow-xs'
                                                : f === 'weekly'
                                                  ? 'bg-blue-600 text-white shadow-xs'
                                                  : 'bg-indigo-900 text-white shadow-xs'
                                              : 'text-slate-450 hover:text-slate-800'
                                          }`}
                                        >
                                          {lang === 'en' 
                                            ? f 
                                            : f === 'daily' ? '每日' : f === 'weekly' ? '每周' : '每月'}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* 2. Effort Required Selector */}
                                <div className="space-y-1">
                                  <span className="text-slate-400 font-bold block">⚙️ {lang === 'en' ? 'Staff Workload / Effort:' : '工作量负载程度:'}</span>
                                  <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-50 border border-slate-150 rounded-lg">
                                    {(['low', 'medium', 'high'] as const).map(eff => {
                                      const isActive = ratings.effort === eff;
                                      return (
                                        <button
                                          key={eff}
                                          type="button"
                                          onClick={() => handleUpdateRating(task.id, 'effort', eff)}
                                          className={`py-1 rounded-md text-[8.5px] font-mono font-bold text-center capitalize cursor-pointer transition-all ${
                                            isActive 
                                              ? eff === 'high' 
                                                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                                                : eff === 'medium'
                                                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                              : 'text-slate-450 hover:text-slate-800'
                                          }`}
                                        >
                                          {lang === 'en' 
                                            ? eff 
                                            : eff === 'high' ? '高负载' : eff === 'medium' ? '中等' : '低载'}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* 3. Current Pain Level Selector */}
                                <div className="space-y-1">
                                  <span className="text-slate-400 font-bold block">🚨 {lang === 'en' ? 'Current Pain Level:' : '阻力痛点程度:'}</span>
                                  <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-50 border border-slate-150 rounded-lg">
                                    {(['low', 'medium', 'high'] as const).map(p => {
                                      const isActive = ratings.pain === p;
                                      return (
                                        <button
                                          key={p}
                                          type="button"
                                          onClick={() => handleUpdateRating(task.id, 'pain', p)}
                                          className={`py-1 rounded-md text-[8.5px] font-mono font-bold text-center capitalize cursor-pointer transition-all ${
                                            isActive 
                                              ? p === 'high' 
                                                ? 'bg-rose-100 text-rose-900 border border-rose-350 font-black'
                                                : p === 'medium'
                                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                              : 'text-slate-450 hover:text-slate-800'
                                          }`}
                                        >
                                          {lang === 'en' 
                                            ? p 
                                            : p === 'high' ? '严重痛' : p === 'medium' ? '中痛' : '无感'}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                              </div>
                            ) : (
                              <div className="flex-grow flex items-center justify-center border-t border-slate-100 pt-5 text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                                🔌 Task Excluded • 已忽略
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Step 2 Bottom Navigation Controllers */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-150 gap-4">
              <button
                type="button"
                onClick={handleBackToStep1}
                id="btn_back_to_step_1"
                className="px-4 py-2.5 text-xs text-slate-550 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl cursor-pointer flex items-center gap-1 transition-colors font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'en' ? 'Back to Step 1' : '返回领域评估'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                id="btn_proceed_to_step_3"
                className="px-6 py-3 bg-indigo-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm min-w-[210px] shadow-indigo-900/10 active:scale-[0.98]"
              >
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>{lang === 'en' ? 'Proceed to Step 3: Match AI Functions' : '推进至第三步：匹配AI能力'}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= STEP 3: MATCH AI FUNCTIONS ================= */}
        {step === 3 && (
          <motion.div
            key="step3_panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Workshop Instructions Card */}
            <div className="p-5 bg-indigo-50/40 border border-indigo-100 rounded-3xl space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600 animate-pulse" />
                <h4 className="font-extrabold text-[#312e81] text-xs uppercase tracking-wider">
                  {lang === 'en' ? 'MATCH AI FUNCTIONS / 匹配AI能力' : '第三步：AI 能力对齐及增效诊断'}
                </h4>
              </div>
              <p className="text-slate-550 leading-relaxed text-[11px] font-medium">
                {lang === 'en'
                  ? 'Explore how different AI capabilities can support sustainability management and improve organizational performance. This module demonstrates how specific AI capabilities create measurable value within Green HR through interactive visual connection maps.'
                  : '探索人工智能如何赋能日常绿色管理工作。与其生硬指定现成工具，本节将通过交互式路线图展示如何将大模型、行为洞察与流程网络编织，在绿色人事管理中创造可量化的长期效益。'}
              </p>
            </div>

            {/* List of active tasks and their AI recommendations */}
            <div className="space-y-6">
              {(() => {
                const filteredActive = activeTasksForSelectedDomains.filter(t => taskRatings[t.id]?.included);
                if (filteredActive.length === 0) {
                  return (
                    <div className="text-center py-12 p-8 border border-dashed border-slate-200 rounded-[2rem] bg-slate-50 space-y-4">
                      <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
                      <div className="space-y-1.5">
                        <p className="font-black text-slate-800 text-sm">
                          {lang === 'en' ? 'No Repetitive Tasks Selected for Audit' : '未选择任何重复性事务'}
                        </p>
                        <p className="text-xs text-slate-400 max-w-md mx-auto leading-normal font-medium">
                          {lang === 'en' 
                            ? 'Please return to Step 2 and toggle at least one task to "Audit" under your selected domains.' 
                            : '请回到第二步，并在您选中的绿色管理领域下至少开启一个处于“纳入”状态的重复微任务。'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        id="btn_fallback_task"
                        className="px-4 py-2 bg-indigo-950 text-white text-xs font-black uppercase rounded-lg hover:bg-slate-900 transition-colors"
                      >
                        {lang === 'en' ? 'Back and Config Tasks' : '立即返回配置任务'}
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {filteredActive.map((task, idx) => {
                      const mapping = AI_MAPPING_DB[task.id] || {
                        capabilityId: 'automation',
                        capabilityNameEn: 'Workflow Automation',
                        capabilityNameZh: '流程自动化',
                        capabilityDescEn: 'Reduce repetitive manual work and administrative burden.',
                        capabilityDescZh: '减少重复性工作与管理负担。',
                        icon: Zap,
                        functionNameEn: 'Adaptive Green HR Utility Catalyst',
                        functionNameZh: '自适应绿色人资增效助手',
                        whySuitableEn: 'Integrates and automates repetitive standard steps.',
                        whySuitableZh: '一键编排、重构日常复杂申报和数据映射断点。',
                        benefitsEn: 'Increases processing speed and reduces clerical human errors.',
                        benefitsZh: '节约大笔人工打字时间并防止输入笔误。',
                        sustContributionEn: 'Empowers sustainable daily administrative operations.',
                        sustContributionZh: '彻底降低职能团队的无感碳足迹能耗。',
                        expectedOutcomeEn: 'Improve workflow efficiency and eliminate paper audit steps.',
                        expectedOutcomeZh: '提升全流程协同效率，告别纸质流转。'
                      };
                      const IconComponent = mapping.icon;
                      
                      return (
                        <motion.div
                          id={`ai_mapping_row_${task.id}`}
                          key={task.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-xs hover:shadow-md hover:border-indigo-200 hover:scale-[1.002] transition-all space-y-4"
                        >
                          {/* Visual connection layout */}
                          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
                            
                            {/* Step A: Task Card */}
                            <div className="lg:col-span-3 p-4.5 bg-slate-50 border border-slate-150 rounded-2.5xl space-y-3 h-full flex flex-col justify-between">
                              <div className="space-y-2">
                                <span className="text-[8px] font-mono font-black text-rose-600 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded uppercase">
                                  {lang === 'en' ? `REPETITIVE TASK 0${idx + 1}` : `重复任务 0${idx + 1}`}
                                </span>
                                <h4 className="text-xs font-black text-indigo-950 font-display">
                                  {lang === 'en' ? task.titleEn : task.titleZh}
                                </h4>
                                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                                  {lang === 'en' ? task.descEn : task.descZh}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 text-[8.5px] font-mono font-bold uppercase text-slate-400">
                                <span>⏱️ {taskRatings[task.id]?.frequency ? (lang === 'en' ? taskRatings[task.id].frequency : taskRatings[task.id].frequency === 'daily' ? '每日' : taskRatings[task.id].frequency === 'weekly' ? '每周' : '每月') : ''}</span>
                                <span>•</span>
                                <span>⚙️ {taskRatings[task.id]?.effort ? (lang === 'en' ? taskRatings[task.id].effort : taskRatings[task.id].effort === 'high' ? '高负荷' : taskRatings[task.id].effort === 'medium' ? '中度' : '低负荷') : ''}</span>
                                <span>•</span>
                                <span className="text-rose-500 font-black">🚨 {taskRatings[task.id]?.pain ? (lang === 'en' ? taskRatings[task.id].pain : taskRatings[task.id].pain === 'high' ? '高阻力' : taskRatings[task.id].pain === 'medium' ? '中等' : '低阻力') : ''}</span>
                              </div>
                            </div>

                            {/* Chevron Right Divider 1 */}
                            <div className="lg:col-span-1 flex flex-col items-center justify-center text-slate-300">
                              <div className="hidden lg:flex flex-col items-center">
                                <ArrowRight className="w-5 h-5 text-indigo-400 animate-pulse" />
                                <span className="text-[8px] font-mono uppercase tracking-widest text-indigo-300 font-black mt-1">
                                  {lang === 'en' ? 'MAPS TO' : '对齐'}
                                </span>
                              </div>
                              <div className="lg:hidden flex items-center gap-1 py-1">
                                <span className="text-[9px] font-bold text-indigo-400 font-mono">∨ {lang === 'en' ? 'RECOMMENDED AI CAPABILITY' : '接入AI能力'} ∨</span>
                              </div>
                            </div>

                            {/* Step B: Recommended AI Function */}
                            <div className="lg:col-span-4 p-5 bg-gradient-to-br from-[#f8fafc]/90 to-white border border-indigo-150 rounded-2.5xl space-y-3 h-full flex flex-col justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2 border-b border-indigo-100/60 pb-1.5">
                                  <span className="text-[9px] font-mono font-black text-indigo-700 uppercase tracking-wider">
                                    {mapping.capabilityNameZh} / {mapping.capabilityNameEn}
                                  </span>
                                  <IconComponent className="w-4 h-4 text-indigo-600 animate-pulse" />
                                </div>

                                <div className="space-y-1">
                                  <h5 className="text-[11px] font-black text-indigo-950 font-display">
                                    {lang === 'en' ? mapping.functionNameEn : mapping.functionNameZh}
                                  </h5>
                                  <p className="text-[10px] text-slate-500 leading-normal font-medium">
                                    {lang === 'en' ? mapping.capabilityDescEn : mapping.capabilityDescZh}
                                  </p>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-indigo-100/50 space-y-1 text-[9.5px] leading-normal font-semibold text-slate-600">
                                <div className="flex items-start gap-1">
                                  <span className="text-indigo-600 font-black text-[10px] leading-none shrink-0">⚙️</span>
                                  <p><strong className="text-slate-800">{lang === 'en' ? 'Why suitable:' : '为什么合适:'}</strong> {lang === 'en' ? mapping.whySuitableEn : mapping.whySuitableZh}</p>
                                </div>
                                <div className="flex items-start gap-1">
                                  <span className="text-indigo-600 font-black text-[10px] leading-none shrink-0">💡</span>
                                  <p><strong className="text-slate-800">{lang === 'en' ? 'Benefits:' : '创造收益:'}</strong> {lang === 'en' ? mapping.benefitsEn : mapping.benefitsZh}</p>
                                </div>
                                <div className="flex items-start gap-1">
                                  <span className="text-indigo-600 font-black text-[10px] leading-none shrink-0">🌱</span>
                                  <p><strong className="text-slate-800">{lang === 'en' ? 'Sust. Goal:' : '减排成效:'}</strong> {lang === 'en' ? mapping.sustContributionEn : mapping.sustContributionZh}</p>
                                </div>
                              </div>
                            </div>

                            {/* Chevron Right Divider 2 */}
                            <div className="lg:col-span-1 flex flex-col items-center justify-center text-slate-300">
                              <div className="hidden lg:flex flex-col items-center">
                                <ArrowRight className="w-5 h-5 text-emerald-400 animate-pulse" />
                                <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-400 font-black mt-1">
                                  {lang === 'en' ? 'OUTCOME' : '预期收益'}
                                </span>
                              </div>
                              <div className="lg:hidden flex items-center gap-1 py-1">
                                <span className="text-[9px] font-bold text-emerald-400 font-mono">∨ {lang === 'en' ? 'EXPECTED OUTCOME' : '预期效用'} ∨</span>
                              </div>
                            </div>

                            {/* Step C: Expected Outcome */}
                            <div className="lg:col-span-2 p-4 bg-emerald-500/[0.02]/60 border border-emerald-150 rounded-2.5xl space-y-2 h-full flex flex-col justify-center text-center">
                              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                                <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono font-black text-emerald-800 uppercase tracking-wider block leading-none">
                                  EXPECTED OUTCOME / 预期收益
                                </span>
                                <h5 className="text-[10px] font-black text-slate-900 leading-relaxed font-sans">
                                  {lang === 'en' ? mapping.expectedOutcomeEn : mapping.expectedOutcomeZh}
                                </h5>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Bottom Nav */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-150 gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                id="btn_back_to_step_2"
                className="px-4 py-2.5 text-xs text-slate-550 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl cursor-pointer flex items-center gap-1 transition-colors font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'en' ? 'Back and Adjust Ratings' : '返回重复任务盘点'}</span>
              </button>

              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerateSummary}
                id="btn_proceed_to_step_4"
                className="px-6 py-3 bg-indigo-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm min-w-[260px] shadow-indigo-900/10 active:scale-[0.98]"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>{lang === 'en' ? 'Calculating Strategic Weights...' : '正在交叉计算战略要素权重...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>{lang === 'en' ? 'Proceed to Prioritization Workshop' : '推进机会优先级研讨会'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= STEP 4: AI OPPORTUNITY PRIORITIZATION ================= */}
        {step === 4 && (
          <motion.div
            key="step4_prioritize_panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Guide Board Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2.5xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">
                    {lang === 'en' ? 'AI Opportunity Evaluation Framework' : 'AI 机会优先级评估因子说明'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'en' 
                      ? 'Rate each of your identified Green HR tasks across four strategic value vectors. The platform mathematically computes high-impact pilots based on double materiality and technical ease.'
                      : '请在下方对诊断出的各项绿色工作，进行以下四个维度的战略潜力评估。算法沙盘会自动解耦出最高投资回报率（ROI）的一项作为一期先导试点项目，并绘制三阶段推进路线图。'}
                  </p>
                </div>
              </div>

              {/* Six pillars description grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
                <div className="p-3.5 bg-white rounded-xl border border-slate-150 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 block leading-none">01 • INHERITED / 自动继承</span>
                  <h4 className="text-xs font-bold text-slate-900">{lang === 'en' ? 'Task Frequency' : '工作发生频率（Frequency）'}</h4>
                  <p className="text-[11px] text-slate-500">{lang === 'en' ? 'Inherited from your Task Audit selections (Daily / Weekly / Monthly).' : '源自前文工作诊断结果。高频日常性工作由于基数大，具备更高的累积降碳空间。'}</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-slate-150 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 block leading-none">02 • INHERITED / 自动继承</span>
                  <h4 className="text-xs font-bold text-slate-900">{lang === 'en' ? 'Manual Effort' : '手工消耗（Manual Effort）'}</h4>
                  <p className="text-[11px] text-slate-500">{lang === 'en' ? 'Inherited from core workload ratings. Higher manual effort represents higher potential savings.' : '源自任务台账盘点硬性工时消耗。人工录单比重越高，实施 AI 代替后的效率溢水越丰沛。'}</p>
                </div>
                <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-150 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 block leading-none">03 • CORE VECTOR / 核心因子</span>
                  <h4 className="text-xs font-bold text-emerald-950">{lang === 'en' ? 'Sustainability Impact' : '可持续发展价值（Sust. Impact）'}</h4>
                  <p className="text-[11px] text-slate-600">{lang === 'en' ? 'How directly this tasks automation reduces corporate carbon emissions or enhances paperless footprints.' : '指该事务被 AI 替代后对企业绿色足迹、无纸化经营或资源减损的直接环境贡献度。'}</p>
                </div>
                <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-150 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 block leading-none">04 • CORE VECTOR / 核心因子</span>
                  <h4 className="text-xs font-bold text-emerald-950">{lang === 'en' ? 'PEB Contribution' : '亲环境习惯激活行为（PEB Nudges）'}</h4>
                  <p className="text-[11px] text-slate-600">{lang === 'en' ? 'How effectively it fosters active employee pro-environmental behavior and daily green awareness.' : '激发全员“亲环境主动性”与工作绿色心智的比重。优秀的低碳人资管理应杜绝敷衍，激活火种。'}</p>
                </div>
                <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-150 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 block leading-none font-bold">05 • FEASIBILITY / 落地难度</span>
                  <h4 className="text-xs font-bold text-indigo-950">{lang === 'en' ? 'Implementation Effort' : '工程部署壁垒（Feasibility）'}</h4>
                  <p className="text-[11px] text-slate-600">{lang === 'en' ? 'Assesses technical complexity and data privacy risks. Note: Lower difficulty equals faster launch priority.' : '测算系统的算法工程壁垒、合规审计侵入性与其引发的数据脱敏治理成本。越简单越优先。'}</p>
                </div>
                <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-150 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 block leading-none font-bold">06 • ALIGNMENT / 顶顶对齐</span>
                  <h4 className="text-xs font-bold text-indigo-950">{lang === 'en' ? 'Strategic Business Value' : '董事会绿色领导力对齐（Strategic Value）'}</h4>
                  <p className="text-[11px] text-slate-600">{lang === 'en' ? 'Aligns directly with ISSB/GRI requirements, audit readiness, and general executive double materiality.' : '对齐集团顶层年度ESG经营战略规划及双重重要性披露（ISSB/CSRD）的客观对审就绪度。'}</p>
                </div>
              </div>
            </div>

            {/* Main Interactive Prioritization Spreadsheet */}
            <div className="border border-slate-150 rounded-2.5xl overflow-hidden bg-white shadow-xs">
              <div className="bg-slate-950 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono tracking-wider font-extrabold uppercase">
                    {lang === 'en' ? 'Active Green Opportunities Registry' : '低碳行动先锋决策量表'}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-black text-indigo-300">
                  {lang === 'en' ? 'DYNAMIC REAL-TIME MATRIX' : '数据驱动实时解耦算法模式'}
                </span>
              </div>

              <div className="p-4 space-y-4">
                {prioritizedTasks.map(({ task, ratings, score, category }) => {
                  const domain = DOMAINS.find(d => d.id === task.domainId);
                  
                  return (
                    <div key={task.id} className="p-4 rounded-2xl border border-slate-150 hover:border-slate-350 transition-all space-y-4 bg-slate-50/30">
                      {/* Top Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          {domain && (
                            <span className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
                              <domain.icon className="w-4.5 h-4.5 text-slate-600" />
                            </span>
                          )}
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-sm font-black text-slate-900 leading-none">
                                {lang === 'en' ? task.textEn : task.textZh}
                              </h4>
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded-md font-extrabold uppercase">
                                {lang === 'en' ? domain?.titleEn : domain?.titleZh}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 mt-1 block">
                              MAPPED SYSTEM • {AI_MAPPING_DB[task.id]?.capabilityNameZh || '人工智能匹配'}
                            </span>
                          </div>
                        </div>

                        {/* Priority Score badge */}
                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 flex-wrap">
                          <div className="text-right">
                            <span className="text-[8px] font-mono font-black text-slate-450 block uppercase tracking-wider leading-none">AI PRIORITY SCORE</span>
                            <span className="text-xs font-mono font-black text-slate-500">{lang === 'en' ? 'Score: ' : '权重算力值: '}{score}%</span>
                          </div>
                          <span className={`px-2.5 py-1 text-xs font-mono font-black rounded-xl tracking-wider uppercase ${
                            category === 'high' 
                              ? 'bg-red-50 text-red-700 border border-red-200' 
                              : category === 'medium'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            {category === 'high' ? (lang === 'en' ? '🔥 High Priority' : '🔥 极速先导') : 
                             category === 'medium' ? (lang === 'en' ? '⚡️ Medium Incubation' : '⚡️ 战略孵化') : 
                             (lang === 'en' ? '⏳ Future Sandbox' : '⏳ 远期沙盒')}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Evaluation Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-100 bg-white p-3 rounded-xl border border-slate-150/50">
                        {/* 1. Sustainability Impact Selector */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                            🌱 SUSTAINABILITY IMPACT / 绿色低碳贡献
                          </span>
                          <div className="grid grid-cols-3 gap-1">
                            {['low', 'medium', 'high'].map(lvl => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => handleUpdateRating(task.id, 'sustainabilityImpact', lvl)}
                                className={`py-1 text-[10px] font-bold rounded-lg border transition-all uppercase cursor-pointer text-center ${
                                  ratings.sustainabilityImpact === lvl
                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                                }`}
                              >
                                {lvl === 'low' ? (lang === 'en' ? 'Low' : '弱') :
                                 lvl === 'medium' ? (lang === 'en' ? 'Med' : '中') :
                                 (lang === 'en' ? 'High' : '强')}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 2. PEB Contribution Selector */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                            🤝 PEB NUDGES / 激活行为低碳度
                          </span>
                          <div className="grid grid-cols-3 gap-1">
                            {['low', 'medium', 'high'].map(lvl => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => handleUpdateRating(task.id, 'pebContribution', lvl)}
                                className={`py-1 text-[10px] font-bold rounded-lg border transition-all uppercase cursor-pointer text-center ${
                                  ratings.pebContribution === lvl
                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                                }`}
                              >
                                {lvl === 'low' ? (lang === 'en' ? 'Low' : '低') :
                                 lvl === 'medium' ? (lang === 'en' ? 'Med' : '中') :
                                 (lang === 'en' ? 'High' : '高')}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 3. Strategic Value Selector */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono font-bold text-indigo-800 uppercase tracking-wider block">
                            🎯 STRATEGIC VALUE / 双重合规实质性
                          </span>
                          <div className="grid grid-cols-3 gap-1">
                            {['low', 'medium', 'high'].map(lvl => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => handleUpdateRating(task.id, 'strategicValue', lvl)}
                                className={`py-1 text-[10px] font-bold rounded-lg border transition-all uppercase cursor-pointer text-center ${
                                  ratings.strategicValue === lvl
                                    ? 'bg-indigo-950 border-indigo-950 text-white shadow-xs'
                                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                                }`}
                              >
                                {lvl === 'low' ? (lang === 'en' ? 'Low' : '一般') :
                                 lvl === 'medium' ? (lang === 'en' ? 'Med' : '中等') :
                                 (lang === 'en' ? 'High' : '重点')}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 4. Implementation Difficulty Selector */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-mono font-bold text-indigo-800 uppercase tracking-wider block">
                            ⚙️ FEASIBILITY EASE / 部署可行性易度
                          </span>
                          <div className="grid grid-cols-3 gap-1">
                            {['low', 'medium', 'high'].map(lvl => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => handleUpdateRating(task.id, 'implementationDifficulty', lvl)}
                                className={`py-1 text-[10px] font-bold rounded-lg border transition-all uppercase cursor-pointer text-center ${
                                  ratings.implementationDifficulty === lvl
                                    ? 'bg-indigo-950 border-indigo-950 text-white shadow-xs'
                                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                                }`}
                              >
                                {lvl === 'low' ? (lang === 'en' ? 'Easy' : '极其简单') :
                                 lvl === 'medium' ? (lang === 'en' ? 'Med' : '适中') :
                                 (lang === 'en' ? 'Hard' : '极难')}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Inherited Badges */}
                      <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 font-bold bg-white/40 p-2.5 rounded-xl border border-slate-150/30 flex-wrap">
                        <span>{lang === 'en' ? 'INHERITED WORKLOAD METRICS:' : '自第二步任务诊断自动继承的环境负荷指标:'}</span>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>{lang === 'en' ? `Frequency: ${ratings.frequency}` : `频次: ${ratings.frequency === 'daily' ? '每日日常' : ratings.frequency === 'weekly' ? '每周重复' : '每月一次'}`}</span>
                        </div>
                        <span className="text-slate-200">|</span>
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-slate-500" />
                          <span>{lang === 'en' ? `Manual Effort: ${ratings.effort}` : `纸质手工消耗负荷: ${ratings.effort === 'high' ? '极其严重' : ratings.effort === 'medium' ? '中等偏硬' : '轻微损耗'}`}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Pilot Spotlight Card Section */}
            {recommendedPilot && (
              <div className="p-6 rounded-[2rem] border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-lg">
                <div className="absolute right-0 top-0 bottom-0 opacity-[0.05] pointer-events-none w-1/2 flex items-center justify-center">
                  <Sparkles className="w-96 h-96 text-emerald-400 stroke-[0.3]" />
                </div>

                <div className="space-y-4 relative z-10 w-full">
                  <div className="flex sm:items-center justify-between gap-4 flex-wrap pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 px-2.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-xl text-[9px] font-mono tracking-widest uppercase flex items-center gap-1 font-extrabold animate-pulse">
                        <Star className="w-3 h-3 text-emerald-400" />
                        PILOT PROJECT RECOMMENDATION / 先导试点示范首推
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[9px] font-mono font-black text-rose-300 block uppercase tracking-wider leading-none">RECOMMENDED PILOT IMPACT SCORE</span>
                      <span className="text-lg font-mono font-black text-emerald-400">{lang === 'en' ? 'Calculated score: ' : '先锋综合推荐指数高企: '}{recommendedPilot.score}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-3 lg:col-span-1">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-wide">SELECTED INITIATIVE / 拟定工程</span>
                        <h4 className="text-lg font-black text-white mt-1 leading-snug">
                          {recommendedPilot.details.title}
                        </h4>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-wide">MAPPING ALGORITHM RATIONALE / 诊断推荐理由</span>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1">
                          {recommendedPilot.details.reason}
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Sub-cards of Pilot Outcomes */}
                      <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                        <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase tracking-wider leading-none">🌱 INTUITIVE ENVIRONMENTAL ACTION (PEB)</span>
                        <h5 className="text-xs font-bold text-white">{lang === 'en' ? 'Active Personal Eco-Behavior' : '亲环境个人节能习惯成效'}</h5>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{recommendedPilot.details.pebOutcomes}</p>
                      </div>
                      <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                        <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase tracking-wider leading-none">📈 DOUBLE MATERIALITY (ESG DOUBLE)</span>
                        <h5 className="text-xs font-bold text-white">{lang === 'en' ? 'Compliance Audit Readiness' : '外部审计与双重重要性披露'}</h5>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{recommendedPilot.details.esgBenefits}</p>
                      </div>
                      <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                        <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase tracking-wider leading-none">🧠 ORGANIZATIONAL SAVINGS (ROI EFFICIENCY)</span>
                        <h5 className="text-xs font-bold text-white">{lang === 'en' ? 'Administrative Cost Reduction' : '行政工时与经营效率跃升'}</h5>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{recommendedPilot.details.orgBenefits}</p>
                      </div>
                      <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                        <span className="text-[9px] font-mono text-emerald-400 font-bold block uppercase tracking-wider leading-none">⚡️ GREEN DEEP TRANSFORMATION</span>
                        <h5 className="text-xs font-bold text-white">{lang === 'en' ? 'Human Capital Modernization' : '绿色人力机制深度跃迁'}</h5>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{recommendedPilot.details.ghrmImprovements}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Dynamic Transformation Roadmap */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2.5xl p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono">
                    {lang === 'en' ? 'AI Strategic Transformation Roadmap' : '组织动态三阶段 AI 低碳数智化路线图'}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {lang === 'en' 
                      ? 'Based on prioritized ratings and deployment complexity, initiatives are mapped across continuous executive milestones.'
                      : '根据拟推行项目的算法阻力、战略优先级以及环境回报值，自动解耦出的推荐里程碑部署路线图。'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
                {/* Connector arrow line for desktop screens */}
                <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 border-t border-dashed border-slate-300 -translate-y-1/2 z-0 pointer-events-none" />

                {/* Phase 1 card */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 relative z-10 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="p-1 px-2.5 bg-rose-50 text-rose-700 border border-rose-150 rounded-lg text-[9px] font-mono tracking-widest uppercase font-extrabold block w-fit">
                      PHASE 01 • SHORT-TERM (1-3M)
                    </span>
                    <h4 className="text-xs font-black text-slate-950">
                      {lang === 'en' ? 'Ready for Quick Win Launch / 快速交付' : '一期：即时启动（低阻力高回报）'}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {lang === 'en'
                        ? 'Low difficulty combined with High/Medium priority score. Low friction deployments generating rapid change-management metrics.'
                        : '部署壁垒低、高敏捷且能快速调动全员感知的模块。旨在建立组织信心并形成初步的绿色数据底账。'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    {roadmapPhases.phase1.length === 0 ? (
                      <span className="text-[10px] text-slate-400 italic block">{lang === 'en' ? 'No qualified projects for quick win' : '无符合过滤标准的快速先导事务'}</span>
                    ) : (
                      roadmapPhases.phase1.map(pt => (
                        <div key={pt.task.id} className="p-2 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-800 truncate pr-2">{lang === 'en' ? pt.task.textEn : pt.task.textZh}</span>
                          <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 text-[9px] font-mono font-bold rounded shrink-0">{pt.score}%</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Phase 2 card */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 relative z-10 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="p-1 px-2.5 bg-amber-50 text-amber-700 border border-amber-150 rounded-lg text-[9px] font-mono tracking-widest uppercase font-extrabold block w-fit">
                      PHASE 02 • MID-TERM (3-6M)
                    </span>
                    <h4 className="text-xs font-black text-slate-950">
                      {lang === 'en' ? 'Systemic Integration / 系统级对齐' : '二期：系统融合（常态化机制整合）'}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {lang === 'en'
                        ? 'Solid green initiatives with moderate difficulty. Connects AI tools directly with payroll/performance system metrics.'
                        : '中等工程难度和系统级的绿色嵌入模块。需要与企业的OA、绩效考核或奖励大本营进行精密的数字总线挂接。'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    {roadmapPhases.phase2.length === 0 ? (
                      <span className="text-[10px] text-slate-400 italic block">{lang === 'en' ? 'No qualified projects for mid-term' : '此阶段无挂载对应的工作流'}</span>
                    ) : (
                      roadmapPhases.phase2.map(pt => (
                        <div key={pt.task.id} className="p-2 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-800 truncate pr-2">{lang === 'en' ? pt.task.textEn : pt.task.textZh}</span>
                          <span className="px-1.5 py-0.5 bg-amber-50 text-amber-500 text-[9px] font-mono font-bold rounded shrink-0">{pt.score}%</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Phase 3 card */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 relative z-10 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="p-1 px-2.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[9px] font-mono tracking-widest uppercase font-extrabold block w-fit">
                      PHASE 03 • LONG-TERM (6-12M)
                    </span>
                    <h4 className="text-xs font-black text-slate-950">
                      {lang === 'en' ? 'Future Custom Sandbox / 远期攻坚' : '三期：全面攻坚（顶层战略自决）'}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {lang === 'en'
                        ? 'Highly complex roadmap items or highly strategic risk preventions with significant audit compliance friction.'
                        : '部署难度极大、法务脱敏严苛，但极具长线社会资本或多重实质性合规溢价的前沿战略自决沙盒。'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    {roadmapPhases.phase3.length === 0 ? (
                      <span className="text-[10px] text-slate-400 italic block">{lang === 'en' ? 'No qualified projects for long-term' : '暂无长线极难部署模块挂单'}</span>
                    ) : (
                      roadmapPhases.phase3.map(pt => (
                        <div key={pt.task.id} className="p-2 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-800 truncate pr-2">{lang === 'en' ? pt.task.textEn : pt.task.textZh}</span>
                          <span className="px-1.5 py-0.5 bg-slate-200 text-slate-600 text-[9px] font-mono font-bold rounded shrink-0">{pt.score}%</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 bottom nav controls */}
            <div className="flex border-t border-slate-150 pt-4 items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2.5 text-xs text-slate-550 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl cursor-pointer flex items-center gap-1 transition-colors font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'en' ? 'Back to AI Mapping' : '返回 AI 绿色能力匹配'}</span>
              </button>

              <button
                type="button"
                disabled={isGeneratingReport}
                onClick={handleGenerateReport}
                className="px-6 py-3 bg-indigo-950 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm min-w-[260px] shadow-indigo-900/10 active:scale-[0.98]"
              >
                {isGeneratingReport ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>{lang === 'en' ? 'Compiling Master Diagnostic Ledger...' : '正在汇编生成主诊断账册报告...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>{lang === 'en' ? 'Generate Master Diagnostic Report' : '生成大师诊断报告及亲环境勋章'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= STEP 5: EXECUTIVE DIAGNOSTIC BLUEPRINT REPORT ================= */}
        {step === 5 && assessmentSummary && domainSynthesis && (
          <motion.div
            key="step5_panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* The main certificate-like Executive Presentation Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-6 rounded-[2rem] border border-slate-800 shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 opacity-[0.03] pointer-events-none w-1/2 flex items-center justify-center">
                <Brain className="w-96 h-96 text-white stroke-[0.3]" />
              </div>

              <div className="space-y-4 relative z-10 max-w-6xl">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#2dd4bf] uppercase font-bold block mb-1">
                    👑 CORPORATE ESG & DECARBONIZATION AUDIT LEDGER / 绿政智能合规与效率诊断总册
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {lang === 'en' ? 'Green HR Workload & Environmental Strategy Consensus Summary' : '绿色组织行动底数：任务重复磨损与减排乘数审计报告'}
                  </h3>
                  <p className="text-[11px] text-slate-305 max-w-4xl leading-relaxed mt-1.5 font-medium">
                    {lang === 'en'
                      ? `Successfully completed strategic scoping across 3 key domains: ${selectedDomains.map(d => d.titleEn).join(', ')}. This consensus summary evaluates ${assessmentSummary.totalActiveCount} priority recurring workflows against double-materiality compliance standards.`
                      : `沙盘已成功记录了对 3 大组织核心板块（${selectedDomains.map(d => d.titleZh).join('、')}）的评估共识，针对 ${assessmentSummary.totalActiveCount} 项高频发生的事务进行了工作量摩擦 auditing。诊断结果如下：`}
                  </p>
                </div>

                {/* Grid representation of chosen domains and analyzed count */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 pt-1 text-[11px]">
                  {selectedDomains.map((d, i) => {
                    const DIcon = d.icon;
                    return (
                      <div key={d.id} className="p-3 bg-white/[0.03] border border-white/5 rounded-xl flex items-center gap-2.5">
                        <div className="w-7.5 h-7.5 rounded-lg bg-indigo-950 text-amber-300 flex items-center justify-center shrink-0">
                          <DIcon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <span className="text-[8px] font-mono text-indigo-300 block uppercase font-bold">DOMAIN 0{i+1}</span>
                          <span className="font-bold text-white block truncate">{lang === 'en' ? d.titleEn : d.titleZh}</span>
                        </div>
                      </div>
                    );
                  })}

                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-center">
                    <div className="leading-none">
                      <span className="text-[20px] font-black font-mono text-emerald-400 block">{assessmentSummary.totalActiveCount}</span>
                      <span className="text-[8.5px] font-mono text-emerald-300 uppercase font-black block tracking-widest mt-0.5">{lang === 'en' ? 'Tasks Analyzed' : '项已审微任务'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Findings Grid answering the 4 points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Workload & Resource Sinks (Most Effort) */}
              <div className="p-5.5 border border-slate-150 bg-slate-50 rounded-[2rem] space-y-4 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="border-b border-slate-200 pb-2.5">
                    <span className="text-[9px] font-mono text-red-600 font-black uppercase tracking-wider block">⚠️ FINDING #1 • WORKLOAD RESOURCE SINK</span>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight font-display mt-0.5 flex items-center gap-1.5">
                      <Layers className="w-4.5 h-4.5 text-rose-600 shrink-0" />
                      {lang === 'en' ? '1. Repetitive Core Resource Sinks' : '一、重负载体力泥潭：消耗大量行政时间的重复操作'}
                    </h4>
                  </div>

                  <div className="text-[11.5px] leading-relaxed text-slate-600 font-medium space-y-2">
                    {assessmentSummary.mostEffort.length > 0 ? (
                      <div className="space-y-2">
                        <p>{lang === 'en' ? 'The following tasks are recognized as requiring the highest manual workload, making them serious bottlenecks:' : '在现行合规框架下，以下事务被判定为对员人工精力侵占最高、流程衔接最具摩擦感的重灾区，阻碍了低碳微习惯无感化落地：'}</p>
                        <ul className="space-y-1.5">
                          {assessmentSummary.mostEffort.slice(0, 3).map(eTask => (
                            <li key={eTask.id} className="p-2 bg-rose-50/50 border border-rose-200/40 rounded-xl flex items-start gap-1.5">
                              <span className="text-rose-600 font-bold mt-0.5">▪</span>
                              <div>
                                <span className="font-extrabold text-slate-800 block text-[11px]">{lang === 'en' ? eTask.titleEn : eTask.titleZh}</span>
                                <span className="text-[9.5px] text-slate-400 font-mono">Area: {lang === 'en' ? eTask.domainTitleEn : eTask.domainTitleZh}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p>{lang === 'en' ? 'No continuous High Workload tasks were selected. Operational workloads in the selected domains appear balanced.' : '未发现高工作量评级的作业，这表明大部分日常微审计工作分布于中低量级摩擦内。'}</p>
                    )}
                  </div>
                </div>

                <div className="p-2.5 bg-rose-400/5 text-rose-800 border border-rose-100 rounded-xl text-[9.5px] leading-normal font-bold">
                  ⚡ {lang === 'en' ? "Diagnostic Result: Sinks rely heavily on routine files cross-checking and manual coordination." : "自诊提示：这些重负载任务主要来源于跨层级纸质单据人工复核与繁杂的打卡报数等事务。"}
                </div>
              </div>

              {/* Card 2: Highest Frequency Pulse */}
              <div className="p-5.5 border border-slate-150 bg-slate-50 rounded-[2rem] space-y-4 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="border-b border-slate-200 pb-2.5">
                    <span className="text-[9px] font-mono text-blue-600 font-black uppercase tracking-wider block">⏱️ FINDING #2 • HIGH-FREQUENCY PULSE LOAD</span>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight font-display mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                      {lang === 'en' ? '2. High-Frequency Organizational Clatter' : '二、高频密集敲击：持续发生并造成倦怠的工作'}
                    </h4>
                  </div>

                  <div className="text-[11.5px] leading-relaxed text-slate-600 font-medium space-y-2">
                    {assessmentSummary.highFreq.length > 0 ? (
                      <div className="space-y-2">
                        <p>{lang === 'en' ? 'These recurring tasks happen daily or weekly, causing continuous attention fatigue:' : '以下事务在工作流中呈高频滚动状态。由于其发生频率高且伴随强烈的数据琐碎度，通常是导致行政推进阻力增加的主要源头：'}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {assessmentSummary.highFreq.slice(0, 5).map(fTask => (
                            <span key={fTask.id} className="p-2 bg-blue-50/50 text-blue-900 border border-blue-200/40 rounded-xl text-[10.5px] font-bold">
                              🗓️ {lang === 'en' ? fTask.titleEn : fTask.titleZh}{' '}
                              <span className="text-[8.5px] font-mono text-slate-400 uppercase">({fTask.frequency})</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p>{lang === 'en' ? 'No continuous daily or weekly tasks discovered under active scoping.' : '此职能下没有高频每日滚动任务，任务主要呈现阶梯性周期月度审计态势。'}</p>
                    )}
                  </div>
                </div>

                <div className="p-2.5 bg-blue-400/5 text-blue-800 border border-blue-100 rounded-xl text-[9.5px] leading-normal font-bold">
                  ⚡ {lang === 'en' ? "Diagnostic Result: Frequent manual reporting causes steep dropout rates in participation." : "自诊提示：过高频率的手动通知或习惯提醒在日常中极易引起员工“提示钝化”与拒绝。"}
                </div>
              </div>

              {/* Card 3: Best Candidates for AI Assistance (Ranking Formula) */}
              <div className="p-5.5 border border-slate-150 bg-slate-50 rounded-[2rem] space-y-4 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="border-b border-slate-200 pb-2.5">
                    <span className="text-[9px] font-mono text-indigo-700 font-black uppercase tracking-wider block">🤖 RECOMMENDATION #1 • AI OPPORTUNITIES</span>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight font-display mt-0.5 flex items-center gap-1.5">
                      <Brain className="w-4.5 h-4.5 text-indigo-650 shrink-0 animate-pulse" />
                      {lang === 'en' ? '3. Highest Feasible Candidates for AI Support' : '三、AI 生产力飞轮：首选转型切入与自动替代点'}
                    </h4>
                  </div>

                  <div className="text-[11.5px] leading-relaxed text-slate-600 font-medium space-y-2">
                    <p>{lang === 'en'
                      ? 'AI algorithms excel at structured semantic parsing, custom notifications tuning, and heterogenous data mapping. Ranking based on complexity-to-frequency offsets recommends:'
                      : '根据数学多目标评估（整合高负载、严重痛点与高频发生系数），判定以下三项任务对 AI 自动代偿有着最高的生产力边际效应，应作为首期建设的核心锚点：'}</p>
                    
                    <ul className="space-y-1.5 pb-2">
                      {assessmentSummary.aiTargets.map((aiT, aiIdx) => (
                        <li key={aiT.id} className="flex items-center gap-2 p-1.5 px-3 bg-white border border-indigo-150/40 rounded-xl">
                          <span className="font-mono text-[9px] font-black text-indigo-700 bg-indigo-50 border border-indigo-150 px-1.5 py-0.5 rounded-md">
                            🎯 RANK #0{aiIdx + 1}
                          </span>
                          <span className="text-[11px] font-extrabold text-slate-800">{lang === 'en' ? aiT.titleEn : aiT.titleZh}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-2.5 bg-indigo-50 text-indigo-950 border border-indigo-100 rounded-xl text-[9.5px] leading-normal font-bold">
                  💡 {lang === 'en' ? 'AI Potential Vector: Generative agents can absorb 80% of data screening and notification nudges instantly.' : 'AI 替代路径：利用大语言模型或无感采集中枢代扣，可瞬间蒸发 82% 繁琐人工录件时间。'}
                </div>
              </div>

              {/* Card 4: Greatest Sustainability Impact (Carbon equivalent) */}
              <div className="p-5.5 border border-slate-150 bg-slate-50 rounded-[2rem] space-y-4 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="border-b border-slate-200 pb-2.5">
                    <span className="text-[9px] font-mono text-emerald-700 font-black uppercase tracking-wider block">🌿 RECOMMENDATION #2 • CO2 DECARBONIZATION IMPACT</span>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight font-display mt-0.5 flex items-center gap-1.5">
                      <Trees className="w-4.5 h-4.5 text-emerald-650 shrink-0" />
                      {lang === 'en' ? '4. Greatest ESG Carbon Mitigation Lever' : '四、碳中和战略杠杆：能创造最高可持续减排成效领域'}
                    </h4>
                  </div>

                  <div className="text-[11.5px] leading-relaxed text-slate-600 font-medium space-y-2">
                    <p>{lang === 'en'
                      ? 'Improving these compliance and data-heavy domains delivers immediate auditable non-financial carbon assets:'
                      : '该诊断方向不以单纯效率为终考，而是通过将“数据杂乱、申报艰难”的合规关卡疏通，让真实的绿色避碳对合规账册无损上链，创生实际的环境合规乘数效应：'}</p>
                    
                    <ul className="space-y-1.5 pb-2">
                      {assessmentSummary.sustainabilityTargets.map(sT => (
                        <li key={sT.id} className="flex items-center gap-2 p-1.5 px-3 bg-emerald-500/[0.04] border border-emerald-200/40 rounded-xl">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-[11px] font-extrabold text-slate-800">{lang === 'en' ? sT.titleEn : sT.titleZh}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50/70 text-emerald-950 border border-emerald-100 rounded-xl text-[9.5px] leading-normal font-bold">
                  🌿 {lang === 'en' ? 'Multiplier Outcome: Resolves attitude-behavior gap to generate 1.2 tons of verified credits yearly.' : '双重增益：打通习惯难以溯源审计之梗击点，促进全大楼碳信用账本核准。'}
                </div>
              </div>

            </div>

            {/* SECTION 3: The ultimate executive consensus answer block to the core user question */}
            <div className="p-6 bg-gradient-to-r from-teal-900/5 to-emerald-900/5 border border-emerald-150 rounded-[2.25rem] space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-emerald-600 text-white rounded-2xl shrink-0 mt-1 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <span className="text-[9.5px] font-mono tracking-widest text-[#047857] font-black uppercase block">🔍 EXECUTIVE DIAGNOSTIC SUMMARY / 企业低碳AI转型战略诊断意见</span>
                    <h4 className="text-xs sm:text-sm font-black text-[#047857] mt-1 font-display">
                      {lang === 'en' 
                        ? 'AI Implementation Feasibility & Green HR Action Audit Consensus' 
                        : '核心议题自诊共识：低碳 AI 增效赋能契合度判定'}
                    </h4>
                  </div>

                  {/* Highlight answer banner */}
                  <div className="bg-white p-5 border border-emerald-150/65 rounded-2.5xl space-y-4 shadow-sm relative">
                    <p className="text-[11.5px] text-slate-700 leading-relaxed font-semibold">
                      {lang === 'en' ? (
                        <>
                           The analysis indicates that <strong className="text-indigo-950 underline decoration-indigo-500/30 decoration-2">{strategicSummary?.mostFreqCapEn || 'Workflow Automation'}</strong> provide the strongest opportunities for improvement. These capabilities can reduce administrative workload, strengthen sustainability management processes, and improve employee participation in environmental initiatives. The greatest opportunity appears within <strong className="text-indigo-950 underline decoration-emerald-500/30 decoration-2">{strategicSummary?.topDomainsEn || 'Green Training'}</strong>, where AI can simultaneously support organizational efficiency and employee behavioral change.
                        </>
                      ) : (
                        <>
                           多维度沙盘交叉诊断显示，【<strong className="text-emerald-950 font-black text-xs">{strategicSummary?.mostFreqCapZh || '流程自动化与内容生成'}</strong>】是当前拟建智能转型的【最频配、最高契合度AI能力体系】。这些人工智能能力不仅能有效清除物理能耗 and 日常耗时录单折损，更能深度加强绿色管理的合规流转和多边联动穿透力。最显著的增能提效落位点集中在【<strong className="text-emerald-950 font-black text-xs">{strategicSummary?.topDomainsZh || '绿色培训与员工激励'}</strong>】，合理切能可同步创造组织部门运作效率提升与员工日常“亲环境行为（PEB）”觉醒的双层倍增乘数。
                        </>
                      )}
                    </p>

                    {/* Detailed Five Questions Response Grid */}
                    <div id="strategic_answers_q5" className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-[10.5px] leading-relaxed">
                      
                      {/* Q1 */}
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                        <span className="text-[8px] font-mono font-black text-indigo-700 uppercase tracking-widest block">Q1 • FREQUENT CAPS / 最频现能力</span>
                        <p className="text-slate-900 font-bold">{lang === 'en' ? 'Frequent AI Cap:' : '最频配AI核心能力:'}</p>
                        <p className="text-slate-500 font-semibold">{strategicSummary ? (lang === 'en' ? strategicSummary.mostFreqCapEn : strategicSummary.mostFreqCapZh) : 'AI Analysis & Automation'}</p>
                      </div>

                      {/* Q2 */}
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                        <span className="text-[8px] font-mono font-black text-indigo-700 uppercase tracking-widest block">Q2 • MAX EFFICIENCY / 最大提能板块</span>
                        <p className="text-slate-900 font-bold">{lang === 'en' ? 'Max Efficiency Areas:' : '最大效能改进板块:'}</p>
                        <p className="text-slate-500 font-semibold">{strategicSummary ? (lang === 'en' ? strategicSummary.topDomainsEn : strategicSummary.topDomainsZh) : 'Core Operations'}</p>
                      </div>

                      {/* Q3 */}
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                        <span className="text-[8px] font-mono font-black text-indigo-700 uppercase tracking-widest block">Q3 • AUTO CANDIDATES / 自动化适配事务</span>
                        <p className="text-slate-900 font-bold">{lang === 'en' ? 'Best for Automation:' : '最适合自动代偿工作:'}</p>
                        <p className="text-slate-500 font-medium">
                          {lang === 'en' 
                            ? 'Routine checks, manual points verification & non-linear compliance calculations.' 
                            : '多层级异构能耗报表归账、手工积分合规审计及碳指标折算算子。'}
                        </p>
                      </div>

                      {/* Q4 */}
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                        <span className="text-[8px] font-mono font-black text-indigo-700 uppercase tracking-widest block">Q4 • GREEN HR INFLUENCE / 绿色管治杠杆</span>
                        <p className="text-slate-900 font-bold">{lang === 'en' ? 'Strongest Green Levers:' : '绿色管治赋能着眼点:'}</p>
                        <p className="text-slate-500 font-medium">
                          {lang === 'en' 
                            ? 'Dynamic SNA advocate identification and personalized ESG disclosure helpers.' 
                            : '通过社群挖掘隐性低碳骨干火种（SNA），以及通过语义模型进行ESG年度账单穿透。'}
                        </p>
                      </div>

                      {/* Q5 */}
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                        <span className="text-[8px] font-mono font-black text-indigo-700 uppercase tracking-widest block">Q5 • PEB BOOSTERS / 行为激发催化点</span>
                        <p className="text-slate-900 font-bold">{lang === 'en' ? 'PEB Enhancers:' : '员工行为（PEB）助推器:'}</p>
                        <p className="text-slate-500 font-medium">
                          {lang === 'en' 
                            ? 'High-empathy campaign copywriting nudger & points reward instant visualizers.' 
                            : '心理学共情环宣文案智能编排，配合奖励兑付铸账与荣誉战报一键自排。'}
                        </p>
                      </div>

                    </div>

                    {/* Meta operator verification seal */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 font-medium">
                      <span>Operator: <code className="bg-slate-150 p-0.5 px-1.5 rounded font-mono text-slate-600 font-bold">suihaoyang@khu.ac.kr</code></span>
                      <span className="text-emerald-800 font-bold">✓ Green Consensus Approved • ESG Committee Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modular Actions Footer */}
            <div className="flex border-t border-slate-150 pt-4 items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-4 py-2.5 text-xs text-slate-550 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl cursor-pointer flex items-center gap-1 transition-colors font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'en' ? 'Back to Prioritization Workbook' : '返回优先级要素调整'}</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>🔄 {lang === 'en' ? 'Evaluate Other Scenarios' : '重启其他板块沙盘模拟'}</span>
              </button>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
