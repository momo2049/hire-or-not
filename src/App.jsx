import React, { useState } from 'react';
import { X, Heart, Award, Briefcase, MapPin, Sparkles } from 'lucide-react';

const PROFILES = [
  {
    id: 'TECH-036',
    name: 'Susan Wojcicki',
    emoji: '👩‍💼',
    industry: '科技行业',
    age: 36,
    position: '产品总监',
    location: '美国加州',
    education: '某顶尖文理学院 历史与文学学士',
    experience: '某搜索引擎初创公司 产品负责人',
    skills: '需求定义、A/B测试、Excel建模',
    statement: '我擅长在技术可能性与商业现实之间架桥',
    title: 'Google第16号员工',
    avatar: '🎯',
    story: '她在Google车库办公期间推进广告系统，最终让AdSense成为Google商业帝国的基石',
    insight: 'Everyone is a genius until HR disagrees'
  },
  {
    id: 'TECH-052',
    name: 'Steve Jobs',
    emoji: '👨‍🎨',
    industry: '科技行业',
    age: 52,
    position: '产品设计总监',
    location: '美国加州',
    education: 'Reed College 肄业',
    experience: 'NeXT Computer 创始人兼CEO',
    skills: '用户体验直觉、产品美学',
    statement: '我相信伟大的产品源于对细节的极致追求',
    title: 'Apple联合创始人',
    avatar: '🍎',
    story: '1985年被苹果扫地出门后创办NeXT惨败，1996年回归后推出iPhone',
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
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Hire or Not</h1>
          </div>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">游戏规则</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>点击 ❌ 拒绝候选人</li>
              <li>点击 ✅ 雇佣候选人</li>
              <li>每次选择后揭晓真实身份</li>
            </ul>
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
          <div className="text-white text-center">{currentIndex + 1} / {PROFILES.length}</div>
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

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-48 flex items-center justify-center">
            <div className="text-9xl">{currentProfile.emoji}</div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{currentProfile.industry}</h2>
              <span className="text-xl font-semibold text-purple-600">{currentProfile.age}岁</span>
              <p className="text-base font-semibold text-gray-700 mt-2">{currentProfile.position}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <MapPin size={14} /> {currentProfile.location}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                <Award size={16} className="text-purple-500" /> 教育背景
              </h3>
              <p className="text-sm text-gray-700">{currentProfile.education}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                <Briefcase size={16} className="text-purple-500" /> 工作经历
              </h3>
              <p className="text-sm text-gray-700">{currentProfile.experience}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-2 text-sm">核心技能</h3>
              <p className="text-sm text-gray-700">{currentProfile.skills}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-l-4 border-purple-400 mb-6">
              <h4 className="font-bold text-gray-800 mb-2 text-sm">自我陈述</h4>
              <p className="text-sm text-gray-700 italic">{currentProfile.statement}</p>
            </div>

            <div className="flex justify-center gap-8">
              <button
                onClick={() => handleDecision(false)}
                className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-red-500 hover:bg-red-50 transition-all transform hover:scale-110 active:scale-95"
              >
                <X size={32} className="text-red-500" strokeWidth={3} />
              </button>
              <button
                onClick={() => handleDecision(true)}
                className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-green-500 hover:bg-green-50 transition-all transform hover:scale-110 active:scale-95"
              >
                <Heart size={32} className="text-green-500" fill="currentColor" />
              </button>
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
        <div className="text-white text-center">{currentIndex + 1} / {PROFILES.length}</div>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 h-40 flex items-center justify-center relative">
          <Sparkles className="absolute top-4 left-4 text-white/50" size={24} />
          <Sparkles className="absolute bottom-4 right-4 text-white/50" size={24} />
          <div className="text-8xl">{currentProfile.avatar}</div>
        </div>

        <div className="p-6">
          <div className="text-center mb-5">
            <div className="text-6xl mb-3">🎁</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{currentProfile.name}</h3>
            <p className="text-sm text-purple-600 font-semibold">{currentProfile.title}</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 mb-4 border-2 border-purple-200">
            <h4 className="font-bold text-gray-800 mb-2 text-sm">他们的故事</h4>
            <p className="text-gray-700 leading-relaxed text-sm">{currentProfile.story}</p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 mb-4 border-l-4 border-amber-400">
            <h4 className="font-bold text-gray-800 mb-2 text-sm">真相</h4>
            <p className="text-gray-700 leading-relaxed text-base font-semibold italic">
              {currentProfile.insight}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg"
          >
            {currentIndex < PROFILES.length - 1 ? '下一位候选人' : '查看评级'}
          </button>
        </div>
      </div>
    </div>
  );
}