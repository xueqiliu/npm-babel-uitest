<template>
  <div class="default-card-box cube-common-box" :class="proxy_params.type" @click.stop="hidePanel($event)" v-if="params!='{}' && dataHeaders.length>0">
    <div class="line0">
      <span class="key">{{dataHeaders[0]}}</span>
      <span class="value" v-html="dataSource0"></span>
      <span class="tooltip-box" v-if="proxy_params.explain && proxy_params.type==='card1'">
        <pre class="tooltip-text" v-if="tooltip">{{proxy_params.textarea}}</pre>
        <em class="tooltip-icon" ref="tooltip"></em>
      </span>
    </div>
    <div class="line1">
      <span class="key">{{dataHeaders[1]}}</span>
      <span class="value" v-html="dataSource1"></span>
    </div>
  </div>
</template>
<script>
import myMixin from '../mixin'
export default {
  name: 'cube-card',
  mixins: [myMixin],
  props: {
    params: {
      default() {
        return {
          type: "card1",
          explain: true,
          textarea: '',
          values: [
            {
              format: 'original',
              fixed: 2,
              thousand: true,
              addColor: false,
              colorNumber: 0
            },
            {
              format: 'original',
              fixed: 2,
              thousand: false,
              addColor: true,
              colorNumber: 0
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      tooltip: false
    }
  },
  mounted() {
    document.addEventListener('click', (event) => {
      this.hidePanel(event)
    }, false)
  },
  computed: {
    dataSource0: function () {
      let result;
      if (this.dataBody && this.dataBody[0].length > 0) {
        result = this.filterValue(this.dataBody[0][0], this.proxy_params.values[0], false, true)
      }
      return result;
    },
    dataSource1: function () {
      let result;
      if (this.dataBody && this.dataBody[0].length > 0) {
        result = this.filterValue(this.dataBody[0][1], this.proxy_params.values[1], false, true)
      }
      return result;
    }
  },
  methods: {
    hidePanel(event) {
      if (this.$refs.tooltip) {
        if (!this.$refs.tooltip.contains(event.target)) {
          this.tooltip = false;
        } else {
          this.tooltip = !this.tooltip
          if (this.tooltip) {
            this.$emit('clickTooltip', this.tooltip)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.default-card-box {
  font-size: 1.2em;
  color: #333;
  box-sizing: border-box;
  text-align:left;
  .line0 {
    position: relative;
    span {
      display: block;
    }
  }
  .line1 {
    .key {
      color: #999;
    }
  }
  .tooltip-text {
    background-color: rgba(0, 0, 0, 0.85);
    color: #fff;
    border-radius: 4px;
    padding: 0.5em 0.8em;
    position: absolute;
    right: -0.2em;
    top: 1.6em;
    line-height: 1.3em;
    word-wrap: break-word;
    white-space: pre-wrap;
    max-width: 12em;
    font-weight: bold;
    z-index: 1000;
  }
  .tooltip-icon {
    position: absolute;
    right: -0.4em;
    top: 0;
    width: 1.5em;
    height: 1.5em;
    text-align: right;
    display: inline-block;
    background-image: url("../../static/imgs/e-icon.png");
    background-size: 65%;
    background-position: top center;
    background-repeat: no-repeat;
  }
}
.card1 {
  border-bottom: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  width: 50%;
  background: #fff;
  padding: 0.7em 1.2em;
  .line0 .value {
    font-size: 1.5em;
    padding: 0.25em 0.25em;
  }
}
.card2 {
  background: #eee;
  text-align: center;
  border-radius: 4px;
  color: #999;
  width: 8.6em;
  margin-bottom: 1em;
  padding: 0.5em 0;
  .line0 .value {
    padding: 0.1em 0.25em;
  }
  .line1 .key {
    color: hsla(0, 0%, 60%, 0.5);
  }
}
.current {
  background: #468aff;
  color: #fff;
  .line1 .key {
    color: #fff;
  }
}
</style>
