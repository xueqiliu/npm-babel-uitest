<template>
  <div class="default-table-box cube-common-box" v-if="params!='{}' && dataHeaders.length>0">
    <v-table ref="tableIndex" style="width:100%" is-horizontal-resize :multiple-sort="false" @sort-change="sortChange" :is-vertical-resize="proxy_params.vertical" :odd-bg-color="proxy_params.oddBgColor" :even-bg-color="proxy_params.evenBgColor" :title-bg-color="proxy_params.titleBgColor" :row-height="proxy_params.rowHeight" :title-row-height="proxy_params.titleRowHeight" :columns="proxy_columns" :table-data="proxy_table_data" :height="proxy_height" :row-click="rowClick" :column-cell-class-name="columnCellClass">
    </v-table>
  </div>
</template>
<script>
import { VTable } from 'vue-easytable'
import 'vue-easytable/libs/themes-base/index.css'
import _ from 'lodash'
import myMixin from '../mixin'
export default {
  name: 'cube-table',
  mixins: [myMixin],
  components: {
    VTable
  },
  props: {
    drill: {
      type: Array,
      default() {
        return []
      }
    },
    params: {
      default() {
        return {
          titleBgColor: '#fff',
          oddBgColor: '#f8f8f8',
          evenBgColor: '#fff',
          rowHeight: 38,
          titleRowHeight: 56,
          rowNumber: 5,
          vertical: false,
          openSort: false,
          columnsList: [],
          colParams: {
            width: 100,
            titleAlign: 'center',
            columnAlign: 'center',
            orderBy: null,
            isFrozen: false,
            isResize: true,
            format: 'percent',
            thousand: true,
            fixed: 2,
            addColor: true,
            colorNumber: 0
          }
        }
      }
    }
  },
  data() {
    return {
      proxy_height: 0,
      colName: '',
      sortBy: '',
    }
  },
  computed: {
    proxy_columns() {
      if (this.dataHeaders && this.dataHeaders.length > 0) {
        let columns = [];
        if (this.proxy_params.columnsList.length == 0) {
          this.dataHeaders.forEach(() => {
            this.proxy_params.columnsList.push(_.cloneDeep(this.proxy_params.colParams))
          })
        }
        this.dataHeaders.map((name, index) => {
          let columns_obj = {
            formatter: ((rowData, rowIndex, pagingIndex, field) => {
              let flag = this.drill.length > 0 ? this.drill[0].dimension == field : false
              if (this.proxy_params.columnsList.length) {
                return this.filterValue(rowData[name], this.proxy_params.columnsList[index], flag)
              }
            })
          };
          columns_obj['field'] = columns_obj['title'] = name;
          columns_obj['orderBy'] = (this.proxy_params.openSort && typeof this.dataBody[0][index] === 'number') ? 'desc' : null;
          columns.push(_.merge(_.cloneDeep(this.proxy_params.columnsList[index]), columns_obj))  //需要深拷贝下columnsList，否则会死循环报错
        })
        //  高度 下钻时 读取父的配置，但是数据长度< 父 ，自适应展示
        if (this.dataBody.length < this.proxy_params.rowNumber) {
          this.proxy_height = this.dataBody.length * this.proxy_params.rowHeight + this.proxy_params.titleRowHeight;
        } else {
          this.proxy_height = this.proxy_params.rowNumber * this.proxy_params.rowHeight + this.proxy_params.titleRowHeight;
        }
        this.$nextTick(() => {
          if (this.$refs && this.$refs.tableIndex) {
            this.$refs.tableIndex.$el.style.height = this.proxy_height + 'px';
          }
        })
        return columns;
      }
    },
    proxy_table_data() {
      let table_data = [];  //body的行，header 的列
      let row_object;
      this.dataBody.forEach((row) => {
        row_object = {};
        this.dataHeaders.map((col, colIndex) => {
          row_object[col] = row[colIndex]
        })
        table_data.push(row_object)
      })
      table_data.sort(this.compare(this.colName, this.sortBy))
      return table_data;
    },
  },
  methods: {
    sortChange(val) {
      this.colName = '';
      this.sortBy = '';
      for (let col_name in val) {
        if (val[col_name]) {
          this.colName = col_name;
          this.sortBy = val[col_name];
        }
      }
    },
    filterVal(val) {
      if (typeof (val) === 'number') {
        return val
      } else if (typeof (val) === 'string') {
        return parseFloat(val.replace(/,/g, '').replace(/%/g, ''))
      } else if (val == null) {
        return -999999999;
      }

    },
    compare(pro, flag) {    //默认是降序
      return ((obj1, obj2) => {
        var val1 = this.filterVal(obj1[pro]);
        var val2 = this.filterVal(obj2[pro]);
        if (flag === 'desc') {
          if (val1 < val2) {     //降序
            return 1
          } else if (val1 > val2) {
            return -1
          } else {
            return 0;
          }
        } else if (flag === 'asc') {    //升
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0;
          }
        }
      })

    },
    rowClick(rowIndex, rowData, column) {   //点击发送当前点击值
      if (this.drill.length > 0 && !this.drill[0].exclude.includes(rowData[this.drill[0].dimension])) {
        this.$emit("sendDrillName", rowData[this.drill[0].dimension], this.drill[0])
      }
    },
    columnCellClass(rowIndex, columnName, rowData) {   //添加下钻样式
      if (this.drill.length > 0 && this.drill[0].dimension == columnName && !this.drill[0].exclude.includes(rowData[columnName])) {
        return 'drill'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.default-table-box {
  font-size: 1.2em;
  /deep/.v-table-views {
    border: 0;
    height: -webkit-fill-available;
    .drill {
      color: #4c85ca;
    }
    .v-table-leftview {
      box-shadow: 2px 0px 7px 0px rgba(140, 140, 140, 0.2);
    }
    .v-table-header{
      position: relative;
      z-index: 100;
    }
    .v-table-sort-icon {
      margin-left: -3px;
      .v-icon-up-dir {
        top: -3px;
      }
      .v-icon-down-dir {
        bottom: -1px;
      }
      .checked {
        color: #4c85ca;
      }
    }
    .horizontal-border {
      border-bottom-width: 0 !important;
    }
    .vertical-border {
      border-right-width: 0 !important;
    }
    .v-table-title-class {
      color: #999;
      font-weight: bold;
    }
    .v-table-body-class {
      color: #333;
    }
  }
}
</style>