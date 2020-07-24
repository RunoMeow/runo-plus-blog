---
title: 纯JS控制DOM实现HTML滚动条动画
date: 2020-7-24 18:05:04
tags:
  - JavaScript
  - HTML
  - CSS
categories:
  - Front-End
    - JavaScript
---

> 一直用别人的有点没意思 QAQ  
> 摸鱼自己写一个试试  
> 渣渣代码慎入!!!

![演示图片](/images/posts/js-scroll-to-animate/gif.gif)

## JavaScript

```javascript
const list = document.getElementById('list'); // 获取元素
list.addEventListener('click', () => scrollAnimate(list, 200, 1000, 120)); // 绑定事件

// scrollElement 列表元素
// newScrollTop 移动到什么位置
// direction 动画时间
// fps 帧率
function scrollAnimate(scrollElement, newScrollTop, direction, fps = 60) {
  const oldScrollTop = scrollElement.scrollTop; // 原来的位置
  const diffScrollTop = newScrollTop - oldScrollTop;// 相差多少
  const tickTime = 1000 / fps; // 根据FPS计算每一帧延迟
  const num = 1 - 60 / fps / (direction * 0.01); // 根据FPS计算每一帧移动百分之多少
  let rate = num; // 当前百分比(默认移动一帧)

  const timer = setInterval(() => {
    const nowScrollTop = oldScrollTop + diffScrollTop * (1 - rate); // 原来的位置 + 差多少 * 百分比 (0 + 200 * (1 - 0.95))
    if (Math.abs(newScrollTop - nowScrollTop) > 1) {
      // 如果位置绝对值大于1px, 移动滚动条
      scrollElement.scrollTo(0, nowScrollTop);
    } else {
      // 清除时钟, 直接设为需要移动到的位置
      clearInterval(timer);
      scrollElement.scrollTo(0, newScrollTop);
    }
    rate *= num; // 计算百分比(0.95 * 0.95 不断减少)
  }, tickTime);
}
```

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Runo</title>
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <div id="list">
      <div class="list-item">
        <div class="list-title">
          <div class="list-left">
            <span>喵了个咪喵了个咪</span>
          </div>
          <div class="list-right">
            <span>2020-7-24 10:51:49</span>
          </div>
        </div>
        <div class="list-content">
          <span>喵呜喵呜喵呜</span>
        </div>
      </div>
      <div class="list-item">
        <div class="list-title">
          <div class="list-left">
            <span>喵了个咪喵了个咪</span>
          </div>
          <div class="list-right">
            <span>2020-7-24 10:51:49</span>
          </div>
        </div>
        <div class="list-content">
          <span>喵呜喵呜喵呜</span>
        </div>
      </div>
      <div class="list-item">
        <div class="list-title">
          <div class="list-left">
            <span>喵了个咪喵了个咪</span>
          </div>
          <div class="list-right">
            <span>2020-7-24 10:51:49</span>
          </div>
        </div>
        <div class="list-content">
          <span>喵呜喵呜喵呜</span>
        </div>
      </div>
      <div class="list-item">
        <div class="list-title">
          <div class="list-left">
            <span>喵了个咪喵了个咪</span>
          </div>
          <div class="list-right">
            <span>2020-7-24 10:51:49</span>
          </div>
        </div>
        <div class="list-content">
          <span>喵呜喵呜喵呜</span>
        </div>
      </div>
    </div>
    <script src="./main.js"></script>
  </body>
</html>
```

## CSS

```CSS
body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

#list {
  width: 750px;
  height: 750px;
  overflow-y: auto;

  background-color: #f0f0f0;
  border-radius: 10px;
}
.list-item {
  position: sticky;
  top: 10px;
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100px;
  overflow: hidden;
  box-sizing: border-box;

  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
}
.list-item:last-of-type {
  margin-bottom: 640px;
}
.list-title, .list-content {
  width: 100%;
}
.list-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  
}
.list-left {

}
.list-right {

}
.list-content {
  overflow: hidden;
}
```
