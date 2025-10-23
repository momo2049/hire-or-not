import React, { useState } from 'react';
import { Award, Briefcase } from 'lucide-react';

const PROFILES = [
  {
    id: 'TECH-036',
    name: 'Susan Wojcicki',
    emoji: '👩‍💼',
    industry: '科技行业',
    age: 36,
    position: '产品总监 / 广告技术战略负责人',
    education: [
      {
        period: '1986-1990',
        school: '某顶尖文理学院',
        degree: '历史与文学学士',
        details: '辅修经济学；GPA 3.6；毕业论文《20世纪媒体商业模式演变》获优秀论文奖'
      },
      {
        period: '1990-1993',
        school: '某常春藤大学',
        degree: 'MBA',
        details: '专注技术战略方向；未修计算机相关课程；参与多个科技公司案例研究项目'
      }
    ],
    experience: [
      {
        period: '1993-1995',
        company: '某全球咨询公司',
        position: '商业分析师',
        details: [
          '服务于多家科技类客户，撰写市场进入策略报告',
          '首次接触互联网公司，提出"免费服务+广告变现"商业模式，但未被客户采纳',
          '负责竞争对手分析和市场调研，累计完成15个项目'
        ]
      },
      {
        period: '1995-1998',
        company: '某半导体公司',
        position: '战略规划经理',
        details: [
          '分析新兴网络设备市场，提出"软件定义硬件"未来趋势',
          '因非技术背景，在推动工程部门合作时遇到困难',
          '主导年度战略规划流程，但多项建议因"过于超前"被搁置'
        ]
      },
      {
        period: '1998-2003',
        company: '某搜索引擎初创公司（员工数<20人）',
        position: '业务发展经理 → 产品负责人',
        details: [
          '初期职责：协调销售与工程团队，定义广告产品需求文档',
          '主导设计"基于网页内容的关键词匹配广告系统"（后称为AdSense）',
          '面临内部阻力：工程师认为算法"逻辑过于简单"，销售团队认为"无法向客户定价"',
          '推动内部小规模试点：在公司博客和3家合作网站部署，3个月内点击率(CTR)提升400%',
          '2001年因需要照顾家庭，长期缺席晚间产品发布会议，被临时排除在核心产品路线图决策之外',
          '2002年主动申请转岗至新成立的图像搜索项目，从零搭建用户调研和测试体系'
        ]
      }
    ],
    skills: {
      product: '需求定义、A/B测试设计、跨职能团队协调、产品路线图规划',
      analysis: 'Excel高级建模、SQL（基础）、市场sizing、数据驱动决策',
      tools: 'PowerPoint（擅长将复杂技术逻辑转化为商业故事）、Google Analytics、Jira',
      soft: '跨文化沟通、项目管理、战略思维'
    },
    languages: '英语（母语）、法语（流利）',
    statement: '我可能不是工程师，但我擅长在技术可能性与商业现实之间架桥。过去五年，我推动了一个被多数人认为"太简单"的广告产品，如今它支撑着公司80%的收入。我相信最好的产品源于对用户需求的深刻理解，而非技术的复杂度。如果贵团队在探索技术变现的新路径，我愿意从最基础的用户访谈做起。',
    title: 'Google第16号员工，AdSense主要发起人，前YouTube CEO',
    avatar: '🎯',
    story: '她在Google车库办公期间，一边推进广告系统，一边经历多次生育。她坚持用数据说话，最终让AdSense成为Google商业帝国的基石。2006年主导以16.5亿美元收购YouTube，并担任CEO长达9年，将其打造成全球最大视频平台。',
    insight: 'Everyone is a genius until HR disagrees'
  },
  {
    id: 'TECH-052',
    name: 'Steve Jobs',
    emoji: '👨‍🎨',
    industry: '科技行业',
    age: 52,
    position: '产品设计总监 / 用户体验负责人',
    education: [
      {
        period: '1972-1972',
        school: 'Reed College',
        degree: '肄业（入学仅6个月后退学）',
        details: '退学后继续旁听书法课程；睡在朋友宿舍地板上；靠收集可乐瓶退瓶费维持生活'
      }
    ],
    experience: [
      {
        period: '1974-1976',
        company: 'Atari游戏公司',
        position: '技术员',
        details: [
          '因个人卫生问题（体味严重），被主管要求调到夜班单独工作',
          '存钱去印度寻找精神导师，在印度待了7个月',
          '回美国后在俄勒冈州的一个苹果农场短暂工作'
        ]
      },
      {
        period: '1976-1985',
        company: '某知名计算机公司',
        position: '联合创始人兼CEO',
        details: [
          '1976年在车库创办公司，1980年成功上市，市值达到12亿美元',
          '1983年推出的新产品因价格过高（$9,995）销售惨淡',
          '1985年因管理理念与董事会冲突，被自己创办的公司解雇',
          '离职时公司正处于巅峰期，年收入超过20亿美元'
        ]
      },
      {
        period: '1985-1996',
        company: 'NeXT Computer',
        position: '创始人兼CEO',
        details: [
          '投入个人全部积蓄1200万美元创办公司',
          '产品定价过高（NeXT Cube售价$6,500，后续机型$10,000），远超市场预期',
          '11年间累计仅售出约50,000台计算机，远低于预期的百万台目标',
          '1993年被迫停止硬件业务，仅保留软件部门，公司濒临破产',
          '期间还投资了一家计算机图形公司Pixar，连续5年亏损'
        ]
      },
      {
        period: '1996-至今',
        company: 'Pixar动画工作室',
        position: '董事长',
        details: [
          '累计投入超过5000万美元，多次想以亏本价出售',
          '1995年《玩具总动员》上映后公司才首次盈利'
        ]
      }
    ],
    skills: {
      design: '用户体验直觉、产品美学、细节控制、视觉设计敏感度',
      business: '演讲能力（被评价为"现实扭曲力场"）、谈判技巧、品牌建设',
      technical: '对技术有基本理解但不擅长编程',
      other: '禅修（7年日常实践）、极简主义、书法鉴赏'
    },
    languages: '英语（母语）',
    statement: '我相信伟大的产品源于对细节的极致追求，而非技术的堆砌。过去十年我经历了失败，被自己创办的公司扫地出门，创业项目几乎破产，但这些失败让我更清楚什么是真正重要的——为用户创造他们还不知道自己需要的产品。我不需要最高的薪水或最大的团队，只需要一个能让我倾注所有热情的产品，和一群愿意追求完美的人。',
    title: 'Apple联合创始人，iPhone之父',
    avatar: '🍎',
    story: '1985年被苹果扫地出门后，他创办NeXT惨败，投资Pixar濒临破产。1996年苹果以4.29亿美元收购NeXT，乔布斯以顾问身份回归。1997年重新担任CEO后，推出iMac、iPod、iPhone、iPad，将苹果从破产边缘（市值30亿）带到全球市值第一（3500亿）。',
    insight: 'Everyone is a genius until HR disagrees'
  }
];

const playSound = (type) => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'swipe-left') {
      oscillator.frequency.value = 200;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } else if (type === 'swipe-right') {
      oscillator.frequency.value = 600;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } else if (type === 'reveal') {
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  } catch (e) {
    console.log('Audio not supported');
  }
};

export default function HireOrNot() {
  const [gameState, setGameState] = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions] = useState([]);
  const [showReveal, setShowReveal] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const currentProfile = PROFILES[currentIndex];

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || showReveal) return;
    setDragOffset(clientX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (dragOffset > threshold) {
      handleDecision(true);
    } else if (dragOffset < -threshold) {
      handleDecision(false);
    }
    setDragOffset(0);
  };

  const handleDecision = (hired) => {
    playSound(hired ? 'swipe-right' : 'swipe-left');
    setDecisions([...decisions, { name: currentProfile.name, hired }]);
    setShowReveal(true);
    setTimeout(() => playSound('reveal'), 300);
  };

  const handleNext = () => {
    setShowReveal(false);
    if (currentIndex < PROFILES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameState('finished');
    }
  };

  // 开始页面
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <div className="text-7xl mb-4">💼</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Hire or Not</h1>
          </div>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">⬅️</span>
                <p className="text-lg font-bold text-gray-800">左滑<span className="text-red-500">拒绝</span>候选人</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">➡️</span>
                <p className="text-lg font-bold text-gray-800">右滑<span className="text-green-500">雇佣</span>候选人</p>
              </div>
              <div className="pt-4 border-t border-purple-200 mt-4">
                <p className="text-base font-bold text-purple-600">Guess Who You Rejected</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setGameState('playing')}
            className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white py-4 rounded-2xl font-bold text-lg"
          >
            开始游戏
          </button>
        </div>
      </div>
    );
  }

  // 结束页面
  if (gameState === 'finished') {
    const hiredCount = decisions.filter(d => d.hired).length;
    const score = Math.round((hiredCount / PROFILES.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">🏆</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">游戏结束</h2>
            <p className="text-6xl font-bold text-purple-600 my-4">{score}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-2xl p-5 text-center">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-3xl font-bold text-green-600">{hiredCount}</div>
              <div className="text-sm text-gray-600">雇佣</div>
            </div>
            <div className="bg-red-50 rounded-2xl p-5 text-center">
              <div className="text-4xl mb-2">❌</div>
              <div className="text-3xl font-bold text-red-600">{PROFILES.length - hiredCount}</div>
              <div className="text-sm text-gray-600">拒绝</div>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg"
          >
            再玩一次
          </button>
        </div>
      </div>
    );
  }

  // 游戏进行中 - 确保有数据
  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center text-white">
        <div>错误: 无法加载数据 currentIndex={currentIndex}</div>
      </div>
    );
  }

  // 简历卡片视图
  if (!showReveal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mb-4">
          <h1 className="text-white text-3xl font-bold text-center mb-3">Hire or Not</h1>
          <div className="text-white text-center text-sm">候选人 {currentIndex + 1} / {PROFILES.length}</div>
        </div>

        <div 
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing relative"
          style={{
            transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {dragOffset !== 0 && (
            <div className={`absolute top-10 ${dragOffset > 0 ? 'right-10' : 'left-10'} z-10`}>
              <div className={`text-6xl font-bold px-6 py-3 rounded-2xl border-4 transform rotate-12 ${
                dragOffset > 0 ? 'text-green-500 border-green-500 bg-green-50' : 'text-red-500 border-red-500 bg-red-50'
              }`}>
                {dragOffset > 0 ? 'HIRE' : 'NOPE'}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 px-6 py-8">
            <div className="text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-3">
                <span className="text-white font-mono text-sm font-semibold">{currentProfile.id}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{currentProfile.industry}</h2>
              <p className="text-white/90 text-sm">{currentProfile.age}岁 · {currentProfile.position}</p>
            </div>
          </div>

          <div className="p-6 max-h-[480px] overflow-y-auto">
            {/* 教育背景 */}
            <div className="mb-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-base border-b border-gray-200 pb-2">
                <Award size={18} className="text-purple-500" /> 教育背景
              </h3>
              {currentProfile.education.map((edu, i) => (
                <div key={i} className="mb-3 pl-4 border-l-2 border-purple-200">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{edu.degree}</span>
                    <span className="text-xs text-gray-500">{edu.period}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">{edu.school}</div>
                  <div className="text-xs text-gray-600">{edu.details}</div>
                </div>
              ))}
            </div>

            {/* 工作经历 */}
            <div className="mb-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-base border-b border-gray-200 pb-2">
                <Briefcase size={18} className="text-purple-500" /> 工作经历
              </h3>
              {currentProfile.experience.map((exp, i) => (
                <div key={i} className="mb-4 pl-4 border-l-2 border-blue-200">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{exp.position}</span>
                    <span className="text-xs text-gray-500">{exp.period}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">{exp.company}</div>
                  <ul className="space-y-1">
                    {exp.details.map((detail, j) => (
                      <li key={j} className={`text-xs leading-relaxed ${
                        detail.includes('失败') || detail.includes('解雇') || detail.includes('困难') || 
                        detail.includes('阻力') || detail.includes('排除') || detail.includes('破产') ||
                        detail.includes('未被采纳') || detail.includes('被搁置') || detail.includes('惨淡') ||
                        detail.includes('亏损') || detail.includes('卫生问题')
                          ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        • {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 专业技能 */}
            <div className="mb-5">
              <h3 className="font-bold text-gray-800 mb-3 text-base border-b border-gray-200 pb-2">专业技能</h3>
              <div className="space-y-2">
                {Object.entries(currentProfile.skills).map(([category, skills]) => (
                  <div key={category} className="text-xs">
                    <span className="font-semibold text-gray-700">
                      {category === 'product' ? '产品' : 
                       category === 'analysis' ? '分析' : 
                       category === 'tools' ? '工具' :
                       category === 'technical' ? '技术' :
                       category === 'design' ? '设计' :
                       category === 'business' ? '商业' :
                       category === 'soft' ? '软技能' :
                       category === 'other' ? '其他' : category}：
                    </span>
                    <span className="text-gray-600 ml-1">{skills}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 语言能力 */}
            <div className="mb-5">
              <h3 className="font-bold text-gray-800 mb-2 text-base border-b border-gray-200 pb-2">语言能力</h3>
              <p className="text-xs text-gray-600">{currentProfile.languages}</p>
            </div>

            {/* 自我陈述 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-l-4 border-purple-400">
              <h4 className="font-bold text-gray-800 mb-2 text-sm">求职信节选</h4>
              <p className="text-xs text-gray-700 leading-relaxed italic">{currentProfile.statement}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 彩蛋揭晓视图
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-4">
        <h1 className="text-white text-3xl font-bold text-center mb-3">Hire or Not</h1>
        <div className="text-white text-center text-sm">候选人 {currentIndex + 1} / {PROFILES.length}</div>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 px-6 py-8">
          <div className="text-center">
            <div className="text-8xl mb-3">{currentProfile.avatar}</div>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-mono text-sm font-semibold">{currentProfile.id}</span>
            </div>
          </div>
        </div>

        <div className="p-6 max-h-[500px] overflow-y-auto">
          {/* 真实身份 */}
          <div className="text-center mb-6 pb-5 border-b-2 border-gray-100">
            <h3 className="text-3xl font-bold text-gray-800 mb-3">{currentProfile.name}</h3>
            <p className="text-base text-purple-600 font-semibold leading-relaxed">{currentProfile.title}</p>
          </div>

          {/* 故事 */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-800 mb-3 text-base flex items-center gap-2 border-b border-gray-200 pb-2">
              📖 她/他们的故事
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">{currentProfile.story}</p>
          </div>

          {/* 真相 */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 mb-5 border-l-4 border-amber-400">
            <h4 className="font-bold text-gray-800 mb-3 text-base flex items-center gap-2">
              💡 真相
            </h4>
            <p className="text-base text-gray-800 leading-relaxed font-semibold italic">
              "{currentProfile.insight}"
            </p>
          </div>

          {/* 按钮 */}
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            {currentIndex < PROFILES.length - 1 ? '下一位候选人 →' : '查看评级 🏆'}
          </button>
        </div>
      </div>
    </div>
  );
}