# 🎯 Hire or Not

<div align="center">

**Guess who you rejected.**

一个让你体验招聘决策的互动游戏 —— 你能识别出那些被简历掩盖的传奇吗？

[🎮 在线试玩](https://momo2049.github.io/hire-or-not) | [📖 English](./README_EN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## ✨ 游戏特色

- 🎴 **Tinder 风格交互** - 左滑拒绝，右滑雇佣，流畅的卡片动画
- 🎭 **真实传奇简历** - 改变世界的人物
- 🤖 **AI 虚拟陷阱** - 精心设计的完美简历，考验你的判断力
- 🏆 **评级系统** - 从"人力资源灾难"到"传奇伯乐"共 6 个等级

## 🎮 游戏玩法

### 规则
1. 查看 10 份匿名简历（x 份真实传奇 + x 份 AI 虚拟）
2. 左滑或点击 ❌ 拒绝候选人
3. 右滑或点击 ✅ 雇佣候选人
4. 每次决策后揭晓真实身份
5. 完成后获得你的"慧眼识珠"评级

### 评分标准
- **雇佣真实传奇** ✅ = 正确决策
- **拒绝 AI 虚拟简历** ✅ = 正确决策
- **满分 100 分** = 雇佣所有传奇 + 识破所有 AI

### 评级等级

| 分数 | 称号 | 说明 |
|------|------|------|
| 100 | 🏆 传奇伯乐 | 完美！雇佣所有传奇，拒绝所有AI陷阱 |
| 70-99 | 💎 慧眼识珠 | 你几乎识别了所有传奇！ |
| 50-69 | 👍 合格HR | 识别出了大部分真正的人才 |
| 30-49 | 👔 普通筛选者 | 表现中规中矩，但错失了一些机会 |
| 1-29 | 📋 新手HR | 需要更多训练才能识别人才 |
| 0 | 💀 人力资源灾难 | 你错过了所有传奇，还雇佣了AI |

## 🎯 游戏灵感

> "Before they were famous, they were candidates."

这个游戏旨在展示：
- 📄 **简历的局限性** - 一份简历很难完整呈现一个人的经历、成长与潜力
- 🚫 **偏见的危险** - 职业空白、失败尝试或非传统路径，往往是韧性与探索的见证
- 🤖 **完美的陷阱** - AI 可以生成逻辑严密的简历，但无法复制真实人生中的坚持与转变。
- 💡 **潜力 vs 简历** - 真正有价值的人才，往往藏在那些不完美的经历和持续的努力之中

## 🛠️ 技术栈

- **React** - UI 框架
- **Tailwind CSS** - 样式设计
- **Lucide React** - 图标库
- **Web Audio API** - 音效系统
- **GitHub Pages** - 免费托管

## 🚀 本地运行
```bash
# 克隆项目
git clone https://github.com/momo2049/hire-or-not.git
cd hire-or-not

# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build
```

## 📁 项目结构
```
hire-or-not/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          # 主游戏组件
│   ├── data/
│   │   └── profiles.js  # 人物简历数据
│   └── index.js
├── package.json
└── README.md
```

## 📊 数据格式

每个简历包含以下字段：
```javascript
{
  id: 'TECH-036',
  name: 'Susan Wojcicki',
  type: 'real',  // 'real' 或 'fake'
  emoji: '👩‍💼',
  industry: '科技行业',
  age: 36,
  position: '产品总监',
  education: [...],
  experience: [...],
  skills: {...},
  statement: '...',
  reveal: {
    name: 'Susan Wojcicki',
    title: 'Google第16号员工',
    avatar: '🎯',
    story: '...',
    insight: 'Everyone is a genius until HR disagrees'
  }
}
```

## 🎨 自定义

### 添加新人物

1. 在 `src/data/profiles.js` 中添加新简历
2. 确保包含所有必需字段
3. 设置 `type: 'real'` 或 `type: 'fake'`
4. 为彩蛋页面准备 `reveal` 信息

### 修改评级标准

在 `App.jsx` 中的 `finished` 页面修改评分逻辑：
```javascript
if (score === 100) {
  rating = { title: '传奇伯乐', emoji: '🏆', desc: '...' };
} else if (score >= 70) {
  rating = { title: '慧眼识珠', emoji: '💎', desc: '...' };
}
// ...
```

## 🌟 特色功能

### 滑动交互
- 支持鼠标拖拽和触摸滑动
- 实时显示 "HIRE" / "NOPE" 提示
- 卡片旋转动画
- 滑动阈值：100px

### 音效系统
- **左滑音效** (200Hz) - 拒绝候选人
- **右滑音效** (600Hz) - 雇佣候选人
- **揭晓音效** (400-800Hz) - 彩蛋显示

### 响应式设计
- 移动端：触摸滑动
- 桌面端：鼠标拖拽
- 自适应布局

## 🤝 贡献指南

欢迎提交 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 贡献方向

- 📝 添加更多传奇人物简历
- 🤖 改进 AI 虚拟简历生成
- 🎨 优化 UI/UX 设计
- 🌍 多语言支持
- 📱 移动端体验优化
- 🎵 更丰富的音效

## 📜 开源协议

本项目采用 [MIT License](./LICENSE) 开源协议。

## 🙏 致谢

- 所有简历内容基于Qwen和chatgpt提供
- 灵感来源于 Tinder 的滑动交互设计


## 📮 联系方式

- GitHub: [@momo2049](https://github.com/momo2049)
- 问题反馈: [Issues](https://github.com/momo2049/hire-or-not/issues)
- Email：momo21490@163.com
---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**

Made with ❤️ by [momo]

</div>
