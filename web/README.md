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

## App Terminal 模块的逻辑

对于终端内容命令的展示，通过一个 JSX 数组存储并渲染的

```typescript
const [content, setContent] = useState<JSX.Element[]>([])

// 渲染
{ ...content }
```

还有两个变量用于历史记录的查找

- commandHistory: 存储执行的命令
- commandOffset: 跳转历史记录的偏移量(-commandHistory.length, 0)

命令交互的就不说了，说一下命令的执行
通过监听键盘事件来判断不同的情况

- ArrowUp: 查找上一条历史记录
- ArrowDown: 查找下一条历史记录
- Tab: command 补全
- Enter: 执行命令

上面三个很简单，主要说一下执行命令的逻辑

补充一个变量，用于记录已经注册的指令

```typescript
const commandList: CommandList = { open, close, clear }
```

都已经到执行命令的内部了，所以可以先将命令存入历史记录中，然后就找到指定的命令去执行即可

## App TurboChat 模块的逻辑

### Websocket 的逻辑

先说整体，当用户加入的时候，会通知更新当前在线人数，以及获取之前发送的消息（15 条）；当用户离开的时候，也一样，更新当前在线人数。

- onlineUsers（当前在线人数）
  通过前端连接时，添加的`query.id`来唯一标识每一个 client socket，通过 server 获取到所有 socket，并进行过滤查询从而获取到所有用户的信息。

- getMessages（获取历史消息）
  我是根据偏移量（即已收到的消息个数）来再获取之前的消息历史，再查找想要的记录即可

  ```typescript
  // count 为传入的偏移量，pageSize 默认为15
  const length = await this.prismaService.message.count()
  const skip = length - count < this.pageSize ? 0 : length - count - this.pageSize
  const take = length - count < this.pageSize ? length - count : this.pageSize
  ```

- createMessage（发送消息）
  创建一个 newMessage，同时通知其他用户获取该消息
  即通过`addMessage`事件派发新的一个消息

### Communication 的逻辑

其实难点主要在于 Communication 模块对于消息的更新及其相应的处理

- 滚动更新历史记录
  通过监听`onScroll`事件并判断消息是否更新完判断是否接着更新

  ```typescript
  // 通过该条件判断是否更新
  chatList.scrollTop < 50 && !isAll
  ```

- 消息渲染

  - 时间渲染
    通过判断与上一条消息间隔是否超出了 5 分钟，从而显示时间戳
    主要时间戳有今天的上午、下午，昨天的时间，及以前的日期

  - 消息渲染
    有一个麻烦的地方就是要判断是自己发的消息还是对方发的消息，然后再显示消息的左右

- 其余
  （当然我目前的判定是有点问题的）
  - 发送消息后自动滚动到末尾
  - 开始滚动到末尾

## Input 的逻辑

### Upload 的逻辑

首先重写了 storage 的存储方式

```typescript
MulterModule.register({
	storage: diskStorage({
		destination: config.uploadPath,
		// 重写文件名
		filename: (_, file, callback) => {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-'
			callback(null, uniqueSuffix + decodeURI(file.originalname))
		},
	}),
})
```

条件过滤，文件为最大值：4MB，以及一些文件格式的过滤
上传后，获取到文件的 url 地址、类型，以及文件的大小，进行格式化（用于 web 端的显示）

### Input 的逻辑

通过`createMessage`事件进行消息的发送

- upload（文件上传并发送）
  通过上传文件获取到对应的 type、url、size，再通过`createMessage`将消息发送出去

- 媒体的渲染
  就通过 src 来链接到对应的资源上，并通过对应的元素渲染它即可
