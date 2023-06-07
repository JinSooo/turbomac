# Web

## TODO

### 将 Alert 组件更新多多消息型，类型 AntD 那种

### Dark Mode -> Light Mode 会导致控制中心消失

当点击 mode 时，title 会更新，导致 mode 窗口失效

```typescript
<ModeItem
	title={isDark ? 'Dark Mode' : 'Light Mode'}
	isDark={isDark}
	val={val}
	setVal={setVal}
	Icon={val ? <Moon size={16} /> : <Sun size={16} />}
/>
```

# Knowledge

## 调节 Web 亮度(Brightness)

```css
filter: brightness(100%);
```

## TopBar 背景滤镜

backdrop-filter CSS 属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明。

```css
backdrop-filter: blur(16px);
```

## App Window 窗口的逻辑

### 总体逻辑

应用的展现通过一个 displayApp 数组来记录所有启动的 app，再用 minimizeApps 数组记录缩小化的 app，还有两个特殊的记录值: maximizeApp 和 focusApp，分别记录当前最大化的 app 和当前聚焦的 app

当我们在 Dock 中点击一个 app 的时候，我们通过 Window 组件来展示它，主体逻辑是 Window 组件遍历 displayApp 展示所有需要渲染的 app，对于 minimizeApps，实现的逻辑很简单，如果最小化了，那就让当前 app 隐藏

### 操作

首先是一个 app 的注册配置文件,我展示其中一个的注册信息

```typescript
{
	id: 'vscode',
	title: 'VSCode',
	img: '/img/icons/vscode.png',
	width: 860,
	height: 560,
	content: <LinkWeb src="https://github1s.com/ljq0226/turbomac" title="VSCode" />,
},
```

然后先说明声明几个需要使用的变量，如上面逻辑展示

```typescript
{
  maximizeApp: '',
	focusApp: '',
	minimizeApps: [],
	displayApps: [],
}
```

WindowApp 组件就是渲染需要展示的 app，难点在于 Window 组件的设计

可以分为三个部分

- 窗口大小和位置的记录
- 拖拽设计
- 放大缩小所对应的逻辑

具体的就不展示了，整体来说，其实还是很简单的。
