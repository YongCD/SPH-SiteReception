<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('handlePageNo', pageNo-1)">上一页</button>
    <button v-if="start > 1" @click="pageNoHandler">1</button>
    <button v-if="start > 2">···</button>

    <!-- 判断连续页码逻辑 -->
    <button v-for="(_, index) in Math.min(this.continues, this.totalPage)" 
        :key="index" @click="pageNoHandler" 
        :class="{active:start+index === pageNo}">
        {{ start + index}}
    </button>

    <button v-if="end < totalPage - 1">···</button>
    <button v-if="end < totalPage" @click="pageNoHandler">{{ totalPage }}</button>
    <button :disabled="pageNo === totalPage" @click="$emit('handlePageNo', pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    startNumAndEndNum() {
        const {pageNo, totalPage, continues} = this
        let start = 0, end = 0
        if(totalPage < continues) {
            start = 1
            end = totalPage
        }else {
            start = pageNo - parseInt(continues / 2)
            end = pageNo + parseInt(continues / 2)
            if(start < 1) {
                start = 1
                end = continues
            }
            if(end > totalPage) {
                end = totalPage
                start = end - continues + 1
            }
        }
        return {start, end}
    },
    start() {
        return this.startNumAndEndNum.start
    },
    end() {
        return this.startNumAndEndNum.end
    },
  },
  methods: {
    pageNoHandler(e) {
        const pageNo = Number(e.target.innerText)
        this.$emit('handlePageNo', pageNo)
    }
  }
}

</script>
  
<style lang="less" scoped>
.active {
    background-color: skyblue;
}
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>