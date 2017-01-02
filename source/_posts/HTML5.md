# HTML5 基础

> 1. HTML5 肯定不是多了一些标签就完事了
> 2. HTML5 根酷炫没什么关系，更多的职责是功能，而不是外观


*****

## 1. 概要

### 1.1. WEB技术阶段

1. Web 1.0 内容为主，主要流行HTML和CSS
2. Web 2.0 动态网页，流行AJAX/JavaScript/DOM
3. HTML5 时代，WEB开发回归富客户端

### 1.2. 什么是HTML5

- 是HTML的超集，不仅仅是HTML，更多的是JavaScript API和CSS的提升，
- 构建 Web 应用程序整体解决方案

> API的概念就是我们编程时所依赖的东西的总称

### 1.3. 什么是Web Application

- HTML5 前身，由WHATWG组织提出
- 推出的目的主要是提高Web应用程序的功能
- 2007年提交到W3C组织，成了现在我们看到的HTML5

### 1.4. HTML5应用场景

- 极具表现力的网页
    + 案例非常多
- 网页应用程序
    + PC端：iCloud、百度脑图、Office 365···
    + APP端：淘宝、京东、美团···
    + WeChat端：淘宝、京东、美团···
- 混合式本地应用
    + PC端：网易云音乐、有道词典···
    + APP端：淘宝、京东、美团···
- 简单的游戏

### 1.5. H5新特性概要

> 我们这里只是列出了H5中所有的新特性，大部分内容会在以后的课程中专门学习

#### 1.5.1. HTML

- 标签
    + 更语义化标签
- 智能表单
    + 新的表单类型，如：email,url,number
    + 新增表单功能属性，如：autocomplete，autofocus
    + 虚拟键盘适配，通过表单的类型决定移动端弹出的键盘类型
- 网页多媒体，我们可以在网页中直接通过原生方式播放视频音频
    + 音频
    + 视频
    + 字幕
- 属性，语义化属性，在移动Web bootstrap的课程中用到
    + 链接关系描述
    + 结构数据标记
    + ARIA
    + 自定义属性
- Canvas，提供网页绘图的可能，后面在Canvas课程会专门去学习
    + 2D 绘图
    + 3D (WebGL)
- SVG，仅仅了解即可

#### 1.5.2. JavaScript API

- 核心平台提升，JS在DOM和BOM两个方向上都新增了很多api，便于开发应用程序
    + 新的选择器
    + Element.classList
    + 访问历史API
    + 全屏API
- 网页存储，提供网页中操作客户端本地存储的API
    + Application Cache
    + localStorage
    + sessionStorage
    + WebSQL
    + IndexedDB
- 设备信息访问，JS可以访问硬件的一些信息，我们在移动手机APP的课程中再看
    + 网络状态
    + 硬件访问
    + 设备方向
    + 地理围栏
- 拖放操作
    + 网页内拖放
    + 桌面拖入
- 文件
    + 文件系统API
    + FileReader
- 网络访问，后面AJAX和服务端编程的课程再去看
    + XMLHttpRequest
    + fetch
    + WebSocket
- 多线程
- 桌面通知

#### 1.5.3. CSS

- 后面详细讨论

*****

### 1.6. HTML5 骨架

```html
<!-- HTML5的DOCTYPE声明做了最大简化 -->
<!DOCTYPE html>
<!-- lang属性根据当前网页大量使用的语言种类决定，大量使用中文则使用zh-CN，英文则使用en -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- 在标准的HTML5骨架中charset是直接在meta中设置charset -->
    <!-- 字符编码的设置一定是在head中的第一行 -->
    <title>页面标题</title>
</head>
<body>
    
</body>
</html>
```

- HTML5的DOCTYPE声明做了最大简化
- 在标准的HTML5骨架中charset是直接在meta中设置charset
- 字符编码的设置一定是在head中的第一行，再晚就来不及了
- lang属性根据当前网页大量使用的语言种类决定，大量使用中文则使用zh-CN，英文则使用en

## 2. 语义化标签

### 2.1. 什么是语义化标签

- HTML5中制定了一系列语义化标签：
    + section：独立的内容节块，一般包含标题和内容
    + article：一种特殊的section，定义文档中的具体的文章内容
    + nav：页面导航的链接组
    + aside：标签用来装载非正文的内容，此标签中的文字权重低
    + header：定义文档的页眉，不仅仅是文档的页头可以使用header，一个独立块的头部也应该使用header
    + footer：定义section或document的页脚
- 我们应该根据内容的性质决定使用特定的标签
- h1一定只能出现一个，不是HTML的约定，页面中最重要的内容

- time标签专门用于时间，
    + datetime应该是一个标准时间格式，
    + pubdate指的是当前时间为article的发布时间 

- 在H5中，主体结构标签默认和DIV都是相同的块级效果，
- 但是DIV没有语义，而以上标签有特定语义

### 2.2. 为什么要有语义化标签

- 能够便于开发者阅读和写出更优雅的代码，代码如诗
- 同时让浏览器或是网络爬虫可以很好地解析，从而更好分析其中的内容
- 使用语义化标签会具有更好地搜索引擎优化

#### 切记

- HTML的职责是描述一块内容是什么（或其意义）
- 而不是它长的什么样子，它的外观应该由CSS来决定。

*****

## 3. 智能表单

### 3.1. 新的表单类型

- email - 限定输入内容为邮箱地址，表单提交时会校验格式
- url - 限定输入内容为URL，表单提交时会校验格式
- number - 限定输入内容为数字，表单提交时会校验格式
- range - 数值范围选择器
- Date Pickers - 日期时间选择器
    + 样式不能修改，移动端用的比较多，因为移动端显示的是系统的时间或日期选择器
    + date - 选取日、月、年
    + month - 选取月、年
    + week - 选取周和年
    + time - 选取时间（小时和分钟）
    + datetime - 选取时间、日、月、年，浏览器兼容性不好，效果等同于datetime-local
    + datetime-local - 选取本地时间、日、月、年
- search - 搜索域，语义化，表示定义搜索框

### 3.2. 新的表单属性

- form 上使用的新属性
    + autocomplete 设置整个表单是否开启自动完成 on|off
    + novalidate 设置H5的表单校验是否工作 true 不工作  不加该属性代表校验

- input 上使用的新属性
    + autocomplete 单独设置每个文本框的自动完成
    + autofocus 设置当前文本域页面加载完了过后自动得到焦点
    + form 属性是让表单外的表单元素也可以跟随表单一起提交
    + form overrides
        * formaction 在submit上重写表单的特定属性，当点击当前submit时会以当前值使用
        * formenctype,
        * formmethod,
        * formnovalidate,
        * formtarget
    + list 作用就是指定当前文本框的自动完成列表的数据 datalist 在界面上是看不见的，只是用于定义数据列表的
    + min / max / step
        * min max 限制值的范围，但是不会再输入时限制，提交时校验，
        * step设置的是每次加减的增量
        * 主要使用在number range datepicker上
    + multiple
        * 文本域的多选
    + pattern
        * 设置文本框的匹配格式（正则）
    + placeholder
        * 文本框占位符
    + required
        * 限制当前input为必须的

### 3.3. 虚拟键盘适配

- 在移动端中，我们可以通过不同的表单类型控制弹出的键盘类型


### 3.4. 关于什么时候使用H5的新特性，能不能使用新特性的问题

- 无伤大雅的地方直接用
    + 比如一个文本框，加上placeholder就具备占位文本提示功能，浏览器不支持也不会报错，那就可以直接使用
    + 再比如`<input type="email">`，如果浏览器不支持，默认会显示文本框，那也可以直接用。

*****

## 4. 网页多媒体

### 4.1. 音频

- 定义音频播放组件

```html
<audio src="要播放的音频文件"></audio>
```

### 4.2. 视频

- 定义播放视频组件

```html
<video src="要播放的视频文件"></video>
```

### 4.3. 旧版本浏览器提示

- 如果HTML中遇到不能识别的标签，就会将该标签当做DIV(块级元素) 
- 那么video中的innerHTML也就会直接显示在界面上
- 利用这个特点我们可以实现不支持video标签的浏览器提示

```html
<video src="demo.mp4">
  <!-- 如果浏览器不识别video标签，以下内容可以直接显示在浏览器上 -->
  <p>抱歉，您的浏览器不支持视频播放！</p>
</video>
```

### 4.4. 格式兼容

- 每个浏览器的音视频格式支持不同（版权问题）
- 需要兼容更多的浏览器，可以通过定义多个`<source>`的方式实现
- html解析过程中会找其中第一个能认识的格式播放，一旦找到认识的视频格式，就不会再往后找了

```html
<video controls width="500">
  <!-- 分析第一个source格式是否支持，如果支持则加载该文件，不支持继续往下解析 -->
  <source src="chrome.mp4">
  <source src="chrome.ogv">
  <source src="chrome.webm">
  <p>抱歉，您的浏览器不支持视频播放！</p>
</video>
```

- 因此不管是audio还是video都不要直接设置标签的src

### 4.5. 多媒体标签属性

|属性           | 含义                                          |
|---------------|----------------------------------------------|
|controls       | 决定是否显示控制菜单                            |
|autoplay       | 自动播放                                      |
|loop           | 循环播放                                      |
|height/width   | 定义播放器的宽高，只会在视频标签中生效             |
|preload        | 预加载 是否在页面加载完成并且没有开始播放时就开始加载文件，如果有自动播放属性则该属性无意义  |

### 4.6. 自定义播放器外观

1. 隐藏原生的控制菜单，也就是删除标签中的controls属性
2. 自己设计一套界面控制元素，比如播放按钮，音量控制开关之类
3. 为每个不同的控制元素注册对应的事件
4. 在事件中通过视频元素的API实现自定义播放器的效果
5. 具体的多媒体元素API表：

#### 4.6.1. 方法

|方法              |描述                                |
|-----------------|-----------------------------------|
|addTextTrack()   |向音频/视频添加新的文本轨道             |
|canPlayType()    |检测浏览器是否能播放指定的音频/视频类型   |
|load()           |重新加载音频/视频元素                  |
|play()           |开始播放音频/视频                     |
|pause()          |暂停当前播放的音频/视频                |

#### 4.6.2. 属性

|属性                 |描述
|---------------------|---------------------------------------
|audioTracks          |返回表示可用音轨的 AudioTrackList 对象                 
|autoplay             |设置或返回是否在加载完成后随即播放音频/视频
|buffered             |返回表示音频/视频已缓冲部分的 TimeRanges 对象 
|controller           |返回表示音频/视频当前媒体控制器的 MediaController 对象
|controls             |设置或返回音频/视频是否显示控件（比如播放/暂停等）
|crossOrigin          |设置或返回音频/视频的 CORS 设置 
|currentSrc           |返回当前音频/视频的 URL
|currentTime          |设置或返回音频/视频中的当前播放位置（以秒计）
|defaultMuted         |设置或返回音频/视频默认是否静音
|defaultPlaybackRate  |设置或返回音频/视频的默认播放速度
|duration             |返回当前音频/视频的长度（以秒计）
|ended                |返回音频/视频的播放是否已结束
|error                |返回表示音频/视频错误状态的 MediaError 对象
|loop                 |设置或返回音频/视频是否应在结束时重新播放
|mediaGroup           |设置或返回音频/视频所属的组合（用于连接多个音频/视频元素）
|muted                |设置或返回音频/视频是否静音
|networkState         |返回音频/视频的当前网络状态
|paused               |设置或返回音频/视频是否暂停
|playbackRate         |设置或返回音频/视频播放的速度
|played               |返回表示音频/视频已播放部分的 TimeRanges 对象
|preload              |设置或返回音频/视频是否应该在页面加载后进行加载
|readyState           |返回音频/视频当前的就绪状态
|seekable             |返回表示音频/视频可寻址部分的 TimeRanges 对象
|seeking              |返回用户是否正在音频/视频中进行查找
|src                  |设置或返回音频/视频元素的当前来源
|startDate            |返回表示当前时间偏移的 Date 对象
|textTracks           |返回表示可用文本轨道的 TextTrackList 对象
|videoTracks          |返回表示可用视频轨道的 VideoTrackList 对象
|volume               |设置或返回音频/视频的音量

#### 4.6.3. 事件

|事件             |描述
|-----------------|------------------------------------------
|abort            |当音频/视频的加载已放弃时
|canplay          |当浏览器可以播放音频/视频时
|canplaythrough   |当浏览器可在不因缓冲而停顿的情况下进行播放时
|durationchange   |当音频/视频的时长已更改时
|emptied          |当目前的播放列表为空时
|ended            |当目前的播放列表已结束时
|error            |当在音频/视频加载期间发生错误时
|loadeddata       |当浏览器已加载音频/视频的当前帧时
|loadedmetadata   |当浏览器已加载音频/视频的元数据时
|loadstart        |当浏览器开始查找音频/视频时
|pause            |当音频/视频已暂停时
|play             |当音频/视频已开始或不再暂停时
|playing          |当音频/视频在已因缓冲而暂停或停止后已就绪时
|progress         |当浏览器正在下载音频/视频时
|ratechange       |当音频/视频的播放速度已更改时
|seeked           |当用户已移动/跳跃到音频/视频中的新位置时
|seeking          |当用户开始移动/跳跃到音频/视频中的新位置时
|stalled          |当浏览器尝试获取媒体数据，但数据不可用时
|suspend          |当浏览器刻意不获取媒体数据时
|timeupdate       |当目前的播放位置已更改时
|volumechange     |当音量已更改时
|waiting          |当视频由于需要缓冲下一帧而停止

```javascript
// 获取界面上的video元素，所有的操作必须通过它实现
var video = document.getElementById('video');
var btn_play = document.getElementById('btn_play');
// 注册点击事件
// addEventListener 用于注册事件， 将事件属性的on去掉 作为第一个参数传入
btn_play.addEventListener('click', function() {
  video.play();
  btn_play.disabled = true;
  btn_pause.disabled = false;
});
var btn_pause = document.getElementById('btn_pause');
btn_pause.addEventListener('click', function() {
  video.pause();
  btn_play.disabled = false;
  btn_pause.disabled = true;
});
var btn_muted = document.getElementById('btn_muted');
btn_muted.addEventListener('click', function() {
  // 交互变化true或false
  video.muted = !video.muted;
  btn_muted.innerHTML = video.muted ? "取消静音" : "静音";
});
var volume = document.getElementById('volume');
volume.addEventListener('change', function(e) {
  // 拿一下当前volume的值
  video.volume = volume.value;
});
var btn_speed_up = document.getElementById('btn_speed_up');
btn_speed_up.addEventListener('click', function(e) {
  // 加速
  video.playbackRate += 0.1;
});
var btn_speed_down = document.getElementById('btn_speed_down');
btn_speed_down.addEventListener('click', function(e) {
  // 减速
  video.playbackRate -= 0.1;
});
var btn_forward = document.getElementById('btn_forward');
btn_forward.addEventListener('click', function(e) {
  // 前进5秒
  video.currentTime += 5;
});
var btn_back = document.getElementById('btn_back');
btn_back.addEventListener('click', function(e) {
  // 后退5秒
  video.currentTime -= 5;
});

// 注册视频播放状态变化事件
video.addEventListener('timeupdate', function() {
  // console.log(1111);
  progress.value = (video.currentTime / video.duration) * 100;
});
```

### 4.7. 全屏 API

- HTML5中提供了可以通过JS实现网页全屏的效果
- 具体的方式就是通过特定元素的`requestFullScreen`方法实现
- 由于在不同浏览器中该方法需要加上特定前缀
- 退出全屏通过`exitFullScreen`方法

```javascript
// 全屏
function fullScreen(element) {
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.oRequestFullScreen) {
    element.oRequestFullScreen()
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen()
  }
}
var btnFullScreen = document.getElementById('btn_fullscreen');
btnFullScreen.addEventListener('click', function() {
  fullScreen(video);
  // fullScreen(document.body);
});
```

> 解决问题的思路比如何实现一个需求更重要，因为你不可能每次都遇到相同的需求


### 4.8. SVG 了解* 

1. iframe的作用就是在网页中挖个坑，在这个坑里再展示一个页面
2. svg本身也是文档 所以可以使用iframe的方式载入

***** 

## 5. JS 基础 API

### 5.1. 新选择器

- JavaScript在HTML5中多了一套原生选择器API
- 其功能类似jQuery选择器
- 写法上类似原本的document.getElementById('xxx')

```javascript
var element1 = document.getElementById('section1'); √ 已经get
var elements2 = document.getElementsByTagName('div'); √ 已经get
var elements3 = document.getElementsByClassName('section');
```

- 除了这种简单的类名选择器，H5中新增了很多更高级的API：

```javascript
document.querySelectorAll('ul');
document.querySelectorAll('.container');
document.querySelector('div#container > .inner');
```

|API                      |描述                           |返回结果
|-------------------------|------------------------------|----------------------------
|querySelector            |获取第一个满足选择器条件的元素     |一个DOM对象
|querySelectorAll         |获取所有满足选择器条件的元素       |包含多个DOM对象的数组
|getElementsByClassName   |获取所有使用指定类名的元素         |包含多个DOM对象的数组

> 小提示：h5大部分时候就是将我们经常需要的操作原生支持一下，让我们使用起来更方便，不用再借助第三方的框架

### 5.2. Element.classList

- H5中DOM对象多了一个classList属性
- 该属性其实就是是一个数组
- 这个数组中的内容就是当前DOM元素的每一个类
- 具体的操作如下：

| API | 描述 | 对比jQuery |
| --- | --- | --- |
| element.classList.add() | 给当前元素添加指定类名 | $element.addClass() |
| element.classList.remove() | 在当前元素中删除指定类名 | $element.removeClass() |
| element.classList.contains() | 判断当前元素中是否存在指定类名 | $element.hasClass() |
| element.classList.toggleClass() | 在当前元素上切换指定类名的存在 | $element.toggleClass() |

### 5.3. 自定义属性 DATA-* !

- 在HTML5中，如果想要给元素添加一些自定义属性
- 可以DOM对象添加一些data-xxx的属性
- HTML5中**data-**是自定义属性的前缀
- 一般用来记录与当前DOM强相关的数据

```html
<ul id="users">
  <li data-id="1" data-age="18" data-gender="true">张三</li>
</ul>
```

- 如果需要用JS的方式操作自定义属性，可以通过getAttribute()/setAttribute()方式
- 当然HTML5在JavaScript中提供了一个新的 API：**dataset**， 
- 用于操作元素的自定义属性

```javascript
var liElement = document.querySelector('#users > li');

// 添加一个自定义属性
liElement.dataset['name'] = '张三';

// 获取liElement中所有的自定义属性
console.log(liElement.dataset);
// output: {id: 1, age: 18, gender: true, name: '张三'}

```

*****

## 6. 离线 & 存储

### 6.1. Application Cache

Application Cache 就是让网页可以离线访问的技术

使用方式：

1. 创建一个缓存清单文件（比如：cache.manifest）

    ```
    CACHE MANIFEST
    # version 1.0.7

    CACHE:
      css/style.css
      js/script.js
      img/logo.png
      index.html

    NETWORK:
      *
    ```

2. 回到HTML中，给HTML标签添加manifest属性，指向刚刚创建的缓存清单文件

    ```html
    <html manifest="cache.manifest">
    ...
    </html>
    ```

3. JS中可以捕获到Application Cache的更新事件：

  ```javascript
  if (window.applicationCache) {
    window.applicationCache.addEventListener('updateready', function(e) {
      // 更新完成触发
      if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
        window.applicationCache.swapCache();
        if (confirm('更新成功，是否刷新页面?')) {
          window.location.reload();
        }
      }
    });
  }
  ```

### 6.2. Web Storage

HTML5中提供了可以离线操作的数据存储接口：

- localStorage （永久，除非用户手动清除）
- sessionStorage （会话，关闭浏览器清除）

两者操作方式完全相同，只不过是数据存储的周期不同

```javascript
var btnSet = document.querySelector('#btn_set');
var btnGet = document.querySelector('#btn_get');
var txtValue = document.querySelector('#txt_value');
btnGet.addEventListener('click', function() {
  // txtValue.value = localStorage.getItem('key1');
  txtValue.value = localStorage['key1'];
});
btnSet.addEventListener('click', function() {
  // localStorage.setItem('key1', txtValue.value);
  localStorage['key1'] = txtValue.value;
});
```

> 1. getItem方式获取一个不存在的键 返回空字符串
> 2. []方式获取一个不存在的键 返回undefined


## 7. 文件 API

> [input file类型，文件类型的限制](http://www.cnblogs.com/Joans/p/3158582.html)

### 7.1. 读取本地文件信息

文件域对象可以获取用户选择文件的信息：

- 文件名
- 最近修改时间
- 文件大小
- 文件类型

```javascript
var input = document.querySelector('#input_1');
var file = input.files[0];
file.name // 获取文件名
file.lastModifiedDate // 获取最近修改时间
file.size // 获取文件大小（单位KB）
file.type // 获取文件类型（如：text/plain、image/png）
```

### 7.2. 文件域改变事件

### 7.3. 文件域样式

### 7.4. 使用FileReader读取文件内容

FileReader就是用来读取本地文件的对象

```javascript
var reader = new FileReader();
reader.addEventListener('load', function () {
  this.result; // 读取出来的结果
});
reader.readAsText(file); // 以文本的形式读取
reader.readAsDataURL(file); // 以DataURI的形式读取
// 以下（后台工程师用，前端不会用到）
reader.readAsBinaryString(file); // 二进制格式
reader.readAsArrayBuffer(file); // 字节数组
```

## 8. 拖放操作

### 8.1. 网页内元素拖放

- 拖放是 HTML5 中非常常见的功能
- 我们可以通过在元素上添加`draggable="true"`属性实现元素允许被拖拽

> 提示：链接和图片默认是可拖动的，不需要 draggable 属性。

- ondrag 事件在元素或者选取的文本被拖动时触发。
- 在拖放的过程中会触发以下事件：
  + 在拖动目标上触发事件 (源元素):
    * ondragstart - 用户开始拖动元素时触发
    * ondrag - 元素正在拖动时触发
    * ondragend - 用户完成元素拖动后触发
  + 释放目标时触发的事件（目标元素）:
    * ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
    * ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    * ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
    * ondrop - 在一个拖动过程中，释放鼠标键时触发此事件

> 注意： 在拖动元素时，每隔 350 毫秒会触发 ondrag 事件。

### 8.2. 拖拽删除效果

- 作业

### 8.3. 桌面文件拖拽至网页

```javascript
// 找到目标位置框框
var target = document.querySelector('#target');
var fileList = document.querySelector('#result');
// 注册拖拽进入
target.addEventListener('dragenter', function() {
  this.classList.add('actived');
});
// 离开
target.addEventListener('dragleave', function() {
  this.classList.remove('actived');
});

// 如果想要捕获drop事件 就一定得在该事件中阻止默认事件
target.addEventListener('dragover', function(e) {
  e.preventDefault();
  e.stopPropagation();
});

// 当元素放到该对象上
target.addEventListener('drop', function(e) {
  if (e.dataTransfer.files.length) {
    var files = e.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
      var li = document.createElement('li');
      li.setAttribute('class', 'list-group-item');
      // 创建信息的子节点
      li.innerHTML = '<h5 class="list-group-item-heading">' + files[i].name + '</h5><p class="list-group-item-text">' + files[i].lastModifiedDate.toLocaleDateString() + ' ' + files[i].lastModifiedDate.toLocaleTimeString() + ' ' + (files[i].size / 1024).toFixed(2) + 'KB</p>';
      fileList.appendChild(li);
    }
  } else {
    // 短路运算
    // var data = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text/uri-list');
    var data = e.dataTransfer.getData('text/plain');
    if (data) {
      // 拖入的是文本
      target.innerHTML = data;
    } else {
      var img = document.createElement('img');
      img.src = e.dataTransfer.getData('text/uri-list');
      target.appendChild(img);
    }
  }
  this.classList.remove('actived');
  e.preventDefault();
  e.stopPropagation();
});
```