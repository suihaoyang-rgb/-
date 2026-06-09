import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, FileSpreadsheet, Code, BookOpen, Check, Copy, 
  Terminal, Globe, ShieldCheck, Cpu, Database, Award, ExternalLink
} from 'lucide-react';
import { UserStats, PlantedTree, DepartmentRanking, Teammate } from '../types';

interface ExportAppCenterProps {
  lang: 'en' | 'zh';
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  completedToday: Array<{
    id: string;
    name: string;
    nameZh: string;
    points: number;
    time: string;
    carbon: number;
  }>;
  departments: DepartmentRanking[];
  teammates: Teammate[];
  plantedTrees: PlantedTree[];
  userDepartment: string;
}

export default function ExportAppCenter({
  lang,
  isOpen,
  onClose,
  stats,
  completedToday,
  departments,
  teammates,
  plantedTrees,
  userDepartment
}: ExportAppCenterProps) {
  const [activeTab, setActiveTab] = useState<'data' | 'code' | 'cert'>('data');
  const [copiedCodeEnv, setCopiedCodeEnv] = useState<boolean>(false);
  const [copiedInstallCmd, setCopiedInstallCmd] = useState<boolean>(false);

  if (!isOpen) return null;

  // 1. Export JSON Data Functionality
  const handleExportJSON = () => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      userEmail: "suihaoyang@khu.ac.kr",
      userDepartment: userDepartment,
      systemMetrics: {
        totalPointsCollected: stats.totalPointsCollected,
        currentBalance: stats.currentBalance,
        totalCarbonReducedKg: stats.totalCarbonReducedKg,
        esgScore: stats.esgScore,
        esgPillars: stats.pillars
      },
      completedTracesToday: completedToday.map(item => ({
        id: item.id,
        actionNameEn: item.name,
        actionNameZh: item.nameZh,
        points: item.points,
        carbonReducedKg: item.carbon,
        timeCompleted: item.time
      })),
      plantedForest: plantedTrees,
      departmentRanks: departments.map(d => ({
        department: d.department,
        rank: d.rank,
        points: d.totalPoints,
        carbonReducedKg: d.carbonReducedKg,
        averagePoints: d.averagePoints
      })),
      registeredTeammates: teammates.map(t => ({
        name: t.name,
        department: t.department,
        totalPoints: t.totalPoints,
        carbonSavedKg: t.carbonReducedKg
      }))
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Green_LowCarbon_Export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 2. Export CSV Data Functionality (Excel compatible)
  const handleExportCSV = () => {
    let csvRows = [];
    
    // CSV Header info
    csvRows.push(`${lang === 'en' ? 'Low Carbon Behavior Audit Trail CSV' : '员工绿色低碳行为合规审计清单'}`);
    csvRows.push(`Exported At,${new Date().toLocaleString()}`);
    csvRows.push(`Operator,suihaoyang@khu.ac.kr`);
    csvRows.push(`Department,${userDepartment}`);
    csvRows.push(`ESG Total Score,${stats.esgScore}`);
    csvRows.push(`Cumulative Carbon Saved (kg),${stats.totalCarbonReducedKg.toFixed(3)}`);
    csvRows.push('');
    
    // Headings for Table
    csvRows.push('Log ID,Time,Behavior Description (EN),Behavior (ZH),Points Gained (GP),Carbon Equivalent Saved (kg)');

    // Logged activities
    completedToday.forEach(log => {
      csvRows.push(`"${log.id}","${log.time}","${log.name}","${log.nameZh}",${log.points},${log.carbon.toFixed(3)}`);
    });

    // Department benchmark additions
    csvRows.push('');
    csvRows.push(`${lang === 'en' ? 'Department Leaderships Summary' : '跨部门低碳减排榜单 bench'}`);
    csvRows.push('Rank,Division Name,Total Score,Average Score,Total Carbon Saved (kg)');
    departments.forEach(d => {
      csvRows.push(`${d.rank},"${d.department}",${d.totalPoints},${d.averagePoints},${d.carbonReducedKg.toFixed(2)}`);
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csvRows.join('\n'));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", csvContent);
    downloadAnchor.setAttribute("download", `ESG_Compliance_Report_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 3. Export Certificate of Environmental Contribution
  const handleExportCertificate = () => {
    const lines = [
      "==================================================",
      "     CORPORATE ESG ENVIRONMENTAL CONTRIBUTION      ",
      "              GREEN DIGITAL CERTIFICATE             ",
      "==================================================",
      "",
      `Certified Holder:  suihaoyang@khu.ac.kr`,
      `Affiliated Dept:   ${userDepartment}`,
      `Date of Issuance:  ${new Date().toLocaleDateString()}`,
      `Registry Status:   AAA Compliance Approved`,
      "",
      "---------------- CONTRIBUTIONS -------------------",
      `1. GP Earned (Green Points):     ${stats.totalPointsCollected} Points`,
      `2. Carbon Emissions Avoided:     ${stats.totalCarbonReducedKg.toFixed(3)} kg CO2e`,
      `3. Virtual Trees Planted:        ${plantedTrees.length} Trees`,
      `4. Corporate General ESG Score:  ${stats.esgScore} / 100`,
      "",
      "---------------- PLANTED ARBORETUMS --------------",
      ...plantedTrees.map((tree, index) => (
        ` - Tree #${index + 1}: ${tree.treeName} (Planted:${new Date(tree.plantedAt).toLocaleDateString()})`
      )),
      plantedTrees.length === 0 ? " [No trees claimed yet - Participate in incentives tab]" : "",
      "",
      "---------------- ESTIMATION METHODOLOGY -----------",
      "Calculations adhere strictly to international IPCC and EPA emission",
      "reduction coefficients (e.g. digital recycling, standby mitigation,",
      "and dual-sided printing resource preservation controls).",
      "",
      "==================================================",
      "Certified under Green ESG Compliance Framework v1.4",
      "Sustainable Ecological Systems Compliance Board"
    ];

    const textContent = "data:text/plain;charset=utf-8," + encodeURIComponent(lines.join('\n'));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", textContent);
    downloadAnchor.setAttribute("download", `EcoContribution_Certificate_${Date.now()}.txt`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyText = (text: string, type: 'env' | 'install') => {
    navigator.clipboard.writeText(text);
    if (type === 'env') {
      setCopiedCodeEnv(true);
      setTimeout(() => setCopiedCodeEnv(false), 2000);
    } else {
      setCopiedCodeEnv(true);
      setCopiedInstallCmd(true);
      setTimeout(() => setCopiedInstallCmd(false), 2000);
    }
  };

  const docSetupCode = `git clone <your-repository-url>
cd react-example
npm install
npm run dev`;

  const docEnvContent = `GEMINI_API_KEY="AI_STUDIO_INJECTED_SECRET"
VITE_APP_NAME="Remix: Green Behavior Points System"`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-[2rem] max-w-2xl w-full shadow-2xl border border-slate-150 overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Modal Banner Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-6 text-white shrink-0 relative overflow-hidden">
          <div className="absolute right-4 top-4 opacity-5 pointer-events-none">
            <Cpu className="w-40 h-40" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase font-mono">
                🚀 Export Engine Status: Active
              </span>
              <h3 className="text-lg font-black tracking-tight font-display">
                {lang === 'en' ? 'App Package & ESG Data Export Center' : '绿色系统行为数据与APP代码导出控制台'}
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                {lang === 'en' 
                  ? 'Audit compliant data formatting exports & guidance to set up the app independently.' 
                  : '一键将应用运行底数、碳账册生成合规数据备份，同时提供本地离线发布及云端容器迁移向导。'}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 cursor-pointer"
            >
              [✕] {lang === 'en' ? 'Dismiss' : '关闭'}
            </button>
          </div>
        </div>

        {/* Modular Navigation Tabs for Export Center */}
        <div className="flex bg-slate-50 border-b border-slate-150 p-1 shrink-0">
          <button
            onClick={() => setActiveTab('data')}
            className={`flex-1 py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'data' 
                ? 'bg-white text-emerald-900 shadow-sm border-b-2 border-emerald-600 rounded-xl' 
                : 'text-slate-550 hover:text-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{lang === 'en' ? 'ESG Low Carbon Datasets (CSV/JSON)' : '导出减排账册 (CSV/JSON)'}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('cert')}
            className={`flex-1 py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'cert' 
                ? 'bg-white text-emerald-900 shadow-sm border-b-2 border-emerald-600 rounded-xl' 
                : 'text-slate-550 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{lang === 'en' ? 'Official Contribution Cert' : '导出绿色荣誉勋章证照'}</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-3 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'code' 
                ? 'bg-white text-emerald-900 shadow-sm border-b-2 border-emerald-600 rounded-xl' 
                : 'text-slate-550 hover:text-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>{lang === 'en' ? 'App Standalone Guide' : '如何导出/脱离平台复刻'}</span>
          </button>
        </div>

        {/* Interactive Scrollable Content Panels */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* TAB 1: Datasets Exports */}
          {activeTab === 'data' && (
            <div className="space-y-4">
              <div id="data_description_card" className="p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5 mb-1">
                  <Database className="w-4 h-4 text-emerald-600" />
                  {lang === 'en' ? 'Compliance Metric Data Streams' : '高穿透、双语结构化账册流导出'}
                </h4>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  {lang === 'en'
                    ? 'Exports contain today’s fully authenticated physical records mapped with points balances, carbon equivalents (kg), department contributions, and custom timestamps compliant with ESG auditing criteria (Scope 2 & 3).'
                    : '此处导出的全量环境绩效数字集已通过组织环境绩效算法校验。导出的 CSV 及 JSON 涵盖今日申报、历史持存、以及个人对应的范畴2（控电）/范畴3（交通、无纸打印）积分，并携带唯一哈希标识，供企业合规审计穿透拉取。'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Excel CSV */}
                <div className="p-5 border border-slate-200 bg-white hover:border-emerald-250 hover:shadow-sm rounded-2xl flex flex-col justify-between space-y-3.5 transition-all">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-150 px-1.5 py-0.5 rounded-md uppercase">
                      CSV Spreadsheet / 表格
                    </span>
                    <h5 className="font-bold text-slate-800 text-xs">
                      {lang === 'en' ? 'Export Habits Ledger (.CSV)' : '低碳习惯与排碳抵消流水明细'}
                    </h5>
                    <p className="text-slate-500 leading-relaxed text-[11px]">
                      {lang === 'en' 
                        ? 'Download physical activities completed today for direct parsing on MS Excel, WPS or Salesforce.' 
                        : '导出包含员工低碳打卡履行详情、今日减排克重、完成时刻及对应代偿能量积分，可使用 Excel/WPS 直接读取。'}
                    </p>
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold block rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Download Excel CSV' : '生成并导出 CSV 账本'}</span>
                  </button>
                </div>

                {/* Audit JSON */}
                <div className="p-5 border border-slate-200 bg-white hover:border-sky-200 hover:shadow-sm rounded-2xl flex flex-col justify-between space-y-3.5 transition-all">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-150 px-1.5 py-0.5 rounded-md uppercase">
                      API JSON Payload / 报文
                    </span>
                    <h5 className="font-bold text-slate-800 text-xs">
                      {lang === 'en' ? 'Full System State Dump (.JSON)' : '全系统结构化数据集备份'}
                    </h5>
                    <p className="text-slate-500 leading-relaxed text-[11px]">
                      {lang === 'en' 
                        ? 'Download full stats hierarchy including department rankings and teammates database.' 
                        : '导出包含所有组织部门排行榜、员工对齐指数、当前绿能森林状态的 JSON 配置文件，支持跨平台系统全量迁移复原。'}
                    </p>
                  </div>

                  <button
                    onClick={handleExportJSON}
                    className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold block rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Download Raw JSON' : '生成并导出 JSON 数据集'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Official Achievement Certificate */}
          {activeTab === 'cert' && (
            <div className="space-y-5">
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2.5xl flex gap-3 text-emerald-950 font-medium">
                <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-bounce" style={{ animationDuration: '4s' }} />
                <div>
                  <h4 className="font-bold text-emerald-950 text-xs">
                    {lang === 'en' ? 'Low-Carbon Digital Credentials Approved' : '数字生态行为荣誉认证（绿色合规证书）'}
                  </h4>
                  <p className="text-slate-650 leading-relaxed text-[11px] mt-1">
                    {lang === 'en' 
                      ? 'This certificate records your cumulative environmental efforts, including Green Points collected, carbon reduced and verified, and total virtual trees established in西部沙区生态林.'
                      : '该数字凭证由企业低碳技术中心背书，如实纪录了当前登录用户累计持存积分、真实减碳核算，可用于个人评优与 CSR 年碳自证。'}
                  </p>
                </div>
              </div>

              {/* Interactive Certificate Preview Panel */}
              <div className="border border-slate-205 bg-slate-50 rounded-2xl p-4 font-mono text-[10px] text-slate-600 space-y-2 select-none shadow-inner">
                <div className="text-center font-bold text-slate-700 text-xs tracking-wider border-b border-dashed border-slate-200 pb-2">
                  🎖️ {lang === 'en' ? 'Digital ESG Certificate Mockup' : '数字证书生成样张'} 🎖️
                </div>
                <div className="space-y-1 text-slate-500">
                  <p><strong className="text-slate-700">Holder/代表账号:</strong> suihaoyang@khu.ac.kr</p>
                  <p><strong className="text-slate-700">Department/所属团队:</strong> {userDepartment}</p>
                  <p><strong className="text-slate-700">Carbon Saved/碳减总量:</strong> {stats.totalCarbonReducedKg.toFixed(3)} kg CO2e</p>
                  <p><strong className="text-slate-700">Planted Oasis/植树数量:</strong> {plantedTrees.length} {lang === 'en' ? 'Arboretums' : '棵灌木梭梭树'}</p>
                  <p><strong className="text-slate-700">Cert Hash/上链校验哈希:</strong> ESG-SHA-256-X992084772</p>
                </div>
                <div className="text-center text-[8.5px] text-slate-400 font-sans pt-1 border-t border-slate-100">
                  {lang === 'en' ? 'Press button below to download official TXT certificate' : '点击下方按钮即可获得完整的生态证书报告，可打印或转为 PDF'}
                </div>
              </div>

              <button
                onClick={handleExportCertificate}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-2xl flex items-center justify-center gap-1.5 shadow-md active:scale-[0.99] transition-all cursor-pointer text-xs"
              >
                <Award className="w-4 h-4 fill-emerald-100" />
                <span>{lang === 'en' ? 'Download Contribution Certificate (.TXT)' : '一键生成并导出 TXT 荣誉证书'}</span>
              </button>
            </div>
          )}

          {/* TAB 3: Code and App Release Guide */}
          {activeTab === 'code' && (
            <div className="space-y-5">
              <div className="p-4 bg-amber-50/40 border border-amber-150 rounded-2xl text-[11px] leading-relaxed text-amber-900 font-medium">
                🛡️ <span className="font-bold text-amber-950">{lang === 'en' ? 'Exporting App Mode Disclaimer: ' : '应用出海与脱壳发布说明：'}</span>
                {lang === 'en'
                  ? 'To run this fully interactive React web application on your local machine, corporate server, Node.js container, or Vercel, use the settings menu in the top-right corner of Google AI Studio to download the complete source code ZIP package.'
                  : '您可在 Google AI Studio 的右上角系统设置菜单中，选择 “Export as ZIP” 或 “Export to GitHub”一键下载该应用的完整源代码纯净包。下面为本地安装及生产部署规范，以完美运行本网页低碳习惯体系。'}
              </div>

              {/* Developer commands terminal layout */}
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 text-[11px] flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-slate-500" />
                      1. {lang === 'en' ? 'Local Installation & Kickstart Commands' : '本地安装与启动指令（快速开始）'}
                    </span>
                    <button
                      onClick={() => handleCopyText(docSetupCode, 'install')}
                      className="text-slate-400 hover:text-slate-700 flex items-center gap-1 font-bold pointer cursor-pointer"
                    >
                      {copiedInstallCmd ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedInstallCmd ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-slate-900 text-sky-400 p-3.5 rounded-xl font-mono text-[10px] overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
                    {docSetupCode}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 text-[11px] flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-slate-500" />
                      2. {lang === 'en' ? 'Environment Variables Setting (.env)' : '环境变量配置（.env）'}
                    </span>
                    <button
                      onClick={() => handleCopyText(docEnvContent, 'env')}
                      className="text-slate-400 hover:text-slate-700 flex items-center gap-1 font-bold pointer cursor-pointer"
                    >
                      {copiedCodeEnv ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCodeEnv ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-slate-900 text-indigo-300 p-3.5 rounded-xl font-mono text-[10px] overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
                    {docEnvContent}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-150">
                  <span className="font-bold text-slate-700 text-[11.5px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-650" />
                    3. {lang === 'en' ? 'Production Build Strategy (Deploy anywhere)' : '生产脱嵌编译与发布（Deploy）'}
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-550 leading-relaxed text-[11px] font-medium pt-1">
                    <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl space-y-1">
                      <span className="font-bold text-slate-800 block">⚡ Static Build / SPA (Vercel)</span>
                      <span>Run <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[9px] text-slate-800 font-bold">npm run build</code>. Simply host the compiled <code className="bg-slate-200 px-1 font-bold py-0.5 rounded font-mono text-[9px] text-slate-800">dist/</code> folder anywhere. Perfect for cloud static hosts.</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl space-y-1">
                      <span className="font-bold text-slate-800 block">🐳 Dockerized Container (Cloud Run)</span>
                      <span>Integrate a basic nginx static container, exposing port 3000 to route client side single page assets instantly. Complete offline compliance assured.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Secondary Action Banner Footer */}
        <div className="bg-slate-50 px-6 py-4.5 border-t border-slate-150 shrink-0 text-[10.5px] text-slate-500 font-medium flex flex-col sm:flex-row items-center justify-between gap-3.5">
          <div className="flex items-center gap-1.5 text-slate-650">
            <span className="p-1 bg-emerald-50 text-emerald-600 rounded">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
            <span>{lang === 'en' ? 'ISO and EPA Compliance Validated Estimates' : '计算系数由集团 ISO 认证委员会审核'}</span>
          </div>

          <div className="flex gap-4">
            <span className="text-slate-350">•</span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">Export Center Core v1.4</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
