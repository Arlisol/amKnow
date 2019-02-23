<template>
  <div class="chart-container">
    <el-row>
      <el-col :span="24">
        <div id="chartBar" class="chart-style"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="chartPie" class="chart-style"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartLine" class="chart-style"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "Dashboard",
  data() {
    return {
      chartBar: null,
      chartPie: null
    };
  },

  methods: {
    drawBarChart() {
      var option = {
        title: { text: "库存量" },
        tooltip: {},
        xAxis: {
          axisLabel: {
            interval: 0
          },
          data: [
            "朗逸",
            "卡罗拉",
            "捷达",
            "速腾",
            "汉兰达",
            "本田CR-V",
            "揽胜",
            "奔驰GLC",
            "RAV4荣放",
            "奥德赛",
            "保时捷911",
            "日产GT-R",
            "索罗德",
            "五菱宏光",
            "柯斯达"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "库存量",
            type: "bar",
            data: [13, 16, 24, 21, 8, 13, 3, 6, 9, 9, 2, 4, 5, 18, 3]
          }
        ]
      };
      this.chartColumn = echarts.init(document.getElementById("chartBar"));
      this.chartColumn.setOption(option);
    },
    drawPieChart() {
      var option = {
        title: {
          text: "国家品牌数",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "中国",
            "德国",
            "美国",
            "法国",
            "意大利",
            "日本",
            "韩国",
            "其他"
          ]
        },
        series: [
          {
            name: "品牌数",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 1, name: "中国" },
              { value: 5, name: "德国" },
              { value: 3, name: "美国" },
              { value: 1, name: "法国" },
              { value: 1, name: "意大利" },
              { value: 3, name: "日本" },
              { value: 1, name: "韩国" },
              { value: 2, name: "其他" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.chartPie = echarts.init(document.getElementById("chartPie"));
      this.chartPie.setOption(option);
    },
    drawLineChart() {
      var option = {
        title: {
          text: "车型占有率"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["轿车", "SUV", "MPV", "其他"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2012年", "2013年", "2014年", "2015年", "2016年", "2017年", "2018年"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "MPV",
            type: "line",
            stack: "占有率",
            data: [0.1, 0.1, 0.11, 0.11, 0.13, 0.15, 0.2]
          },
          {
            name: "SUV",
            type: "line",
            stack: "占有率",
            data: [0.1, 0.09, 0.12, 0.13, 0.15, 0.19, 0.24]
          },
          {
            name: "轿车",
            type: "line",
            stack: "占有率",
            data: [0.3, 0.32, 0.35, 0.36, 0.4, 0.44, 0.46]
          }
        ]
      };
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      this.chartLine.setOption(option);
    },
    drawCharts() {
      this.drawBarChart();
      this.drawPieChart();
      this.drawLineChart();
    }
  },
  mounted: function() {
    this.drawCharts();
  }
};
</script>
<style scoped>
.chart-container {
  height: 600px;
  overflow: auto;
}
.el-col {
  padding: 30px 20px;
}
.chart-style {
  width: 100%;
  height: 400px;
}
</style>
