<template>
  <div id="app">
    <h2>蛤蟆头条</h2>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <router-view />
  </div>
</template>

<style lang="less">
h2 {
  padding: 75px;
}
</style>
