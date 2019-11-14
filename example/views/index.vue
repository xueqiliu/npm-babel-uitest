<template>
  <div class="home">
    <cube-card :dataBody="data.body" :dataHeaders="data.headers"></cube-card>
    <cube-table :dataBody="data.body" :dataHeaders="data.headers"></cube-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      data: {
        "headers": ["区域", "最终销额（万元）", "销额同比", "最终折扣", "折扣同比（百分点)"],
        "body": [
          ["天猫", 108.03, 0.1065, -0.42, 0.01],
          ["淘宝", 104.88, 0.2221, 0.4, 0.01],
          ["唯品会", 8841.93, -0.0543, 0.43, 0.0],
        ]
      }

    }
  }

}
</script>
<style lang="scss" scoped>
*,
body {
  margin: 0;
  padding: 0;
  font-size: 12px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  li {
    width: 50%;
  }
}
</style>
