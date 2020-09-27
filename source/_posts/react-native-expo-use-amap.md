---
title: 创建 Expo 项目以及关于 React-Native 使用高德地图(AMap)
date: 2020-09-27 08:51:42
tags:
  - JavaScript
  - React-Native
  - AMap
  - Expo
categories:
  - Front-End
  - React-Native
---

> expo 没办法使用 [react-native-amap3d](https://github.com/qiuxiang/react-native-amap3d) (尝试过, 会报错 module null), 需要 `expo eject` 变为 react-native 项目, 进行 `react-native link` (从 v2.0.0 开始支持 RN 的 autolinking，不再需要手动配置。), `expo eject` 会导致 `expo start` 等功能不能用.
> 萌新前端, 请多多包涵!~OWO

## 初始化 Expo 项目

如果没有安装 expo/cli 先 `npm i -g expo/cli` 或 `yarn global add expo/cli` 进行安装

```bash
$ expo init

What would you like to name your app? (你想为你的应用命名什么)

Choose a template (选择模板)
```

## Eject Expo 项目

```bash
$ npm run eject
or
$ yarn eject

What would you like your Android package name to be? (您希望 Android 包名是什么？)

What would you like your iOS bundle identifier to be? (您希望 iOS bundle identifier 是什么？)
```

## 初始化项目环境

如果直接使用 `npm run android` 或 `yarn android` 会报错 `error Failed to install the app. Make sure you have the Android development environment set up` (错误：无法安装应用程序。确保您已经设置了 Android 开发环境)

需要使用 Android Studio 先打开此项目下的 android 文件夹, 它会自动帮你设置环境!

## 启动项目

```base
$ npm run android
or
$ yarn android
```

我所在的 Expo 版本有个坑, 如果直接使用 `npm run android` 或 `yarn android` 会报错 (如果启动成功, 直接略过此处)

```bash
xxx/my-app/android/app/src/main/java/com/runomeow/myapp/MainActivity.java:19: 错误: 对于show(MainActivity,SplashScreenImageResizeMode,boolean), 找不到合适的方法
    SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN, false);
                ^
    方法 SplashScreen.show(Activity,SplashScreenViewProvider,Class<? extends ViewGroup>,boolean,Function0<Unit>,Function1<? super String,Unit>)不适用
      (实际参数列表和形式参数列表长度不同)
    方法 SplashScreen.show(Activity,SplashScreenViewProvider,Class<? extends ViewGroup>,boolean,Function0<Unit>)不适用
      (实际参数列表和形式参数列表长度不同)
    方法 SplashScreen.show(Activity,SplashScreenViewProvider,Class<? extends ViewGroup>,boolean)不适用
      (实际参数列表和形式参数列表长度不同)
    方法 SplashScreen.show(Activity,SplashScreenImageResizeMode,Class<? extends ViewGroup>,boolean,SplashScreenViewProvider,Function0<Unit>,Function1<? super String,Unit>)不适用
      (实际参数列表和形式参数列表长度不同)
    方法 SplashScreen.show(Activity,SplashScreenImageResizeMode,Class<? extends ViewGroup>,boolean,SplashScreenViewProvider,Function0<Unit>)不适用
      (实际参数列表和形式参数列表长度不同)
    方法 SplashScreen.show(Activity,SplashScreenImageResizeMode,Class<? extends ViewGroup>,boolean,SplashScreenViewProvider)不适用
      (实际参数列表和形式参数列表长度不同)
    方法 SplashScreen.show(Activity,SplashScreenImageResizeMode,Class<? extends ViewGroup>,boolean)不适用
      (实际参数列表和形式参数列表长度不同)
```

[issues#9047](https://github.com/expo/expo/issues/9047)

结合 issues 修改 `/android/app/src/main/java/com/runomeow/myapp/MainActivity.java:19` 就可以了

```java
找到
SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN, false);

改为
SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN, ReactRootView.class, false);
```

## 使用 [react-native-amap3d](https://github.com/qiuxiang/react-native-amap3d)

> 注意, 一定要设置 `<MapView />` 宽高才能显示. [react-native-amap3d](https://github.com/qiuxiang/react-native-amap3d) 不支持 x86 平台, 模拟器运行会闪退, 真机运行正常!

```bash
$ npm install react-native-amap3d
or
$ yarn add react-native-amap3d
```

修改 App.tsx

```javascript
import { MapView } from 'react-native-amap3d';

<MapView
  center={{
    latitude: 3,
    longitude: 106,
  }}
  style={{
    width: 233,
    height: 233,
  }}
/>;
```
