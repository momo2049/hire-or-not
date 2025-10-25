import React, { useState } from 'react';
import { Award, Briefcase } from 'lucide-react';
import { PROFILES } from './data/profiles'; // ✅ 从新文件导入数据

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
              📖 背后故事
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