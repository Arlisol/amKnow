<template>
  <div class="all-tabs">
    <el-tabs type="border-card" v-model="tabValue" @tab-click="handleClick" v-loading="loading" stretch>
      <template v-for="automobileCategory in automobileCategorys">
        <el-tab-pane
          :key="automobileCategory.value"
          :label="automobileCategory.label"
          :name="automobileCategory.value"
          :class="filterAutomobileStock.length == 0 ? 'tab-small' : 'tab-normal'"
        >
          <el-col
            :span="getShow < 3 ? 4 : 7"
            v-for="(item,index) in filterAutomobileStock"
            :key="item.name"
            :offset="index > 0 && index % 4 != 0 && getShow < 3 ? 2 : 1"
            :class="(index >= 4 && getShow < 3) || (index >= 3 && getShow >= 3) ? 'col-padding-rest' : 'col-padding-first'"
          >
            <el-card :body-style="{ padding: '0px',width:'100%' }" shadow="hover">
              <img :src="item.image" :alt="item.name" width="100%" v-if="item.image">
              <div class="card-content">
                <span :class="getShow <= 2 ? 'name-small' : 'name-mini'">
                  <strong>{{item.name}}</strong>
                </span>
                <br>
                <span :class="getShow <= 2 ? 'stock-small' : 'stock-mini'">
                  库存量:
                  <strong>{{item.inventory}}</strong>辆
                </span>
                <br>
                <div class="button-padding-top">
                  <el-button
                    type="warning"
                    icon="el-icon-edit-outline"
                    size="small"
                    v-show="getShow == 1"
                    @click="handleChange(item.name,item.inventory)"
                    round
                    plain
                  >库存变更</el-button>
                  <el-button
                    type="warning"
                    icon="el-icon-edit-outline"
                    :size="getShow >= 3 ? 'mini':'small'"
                    title="库存变更"
                    v-show="getShow != 1"
                    @click="handleChange(item.name,item.inventory)"
                    circle
                    plain
                  ></el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <div v-if="filterAutomobileStock.length == 0" style="color:#909399;">
            <span>暂无数据</span>
          </div>
        </el-tab-pane>
      </template>
    </el-tabs>

    <!--库存变更界面-->
    <el-dialog
      title="库存变更"
      :visible.sync="formVisible"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="brand-dialog-min-width"
      top="28vh"
      width="32%"
    >
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-form-item label="操作" class="row-padding-bottom">
          <el-switch
            v-model="formData.operation"
            active-color="#98FB98"
            inactive-color="#FA8072"
            active-text="增加"
            inactive-text="减少"
            :disabled="stockNumber == 0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="变更数量" prop="number" class="row-padding-bottom">
          <el-input type="age" v-model.number="formData.number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="changeSubmit">提交</el-button>
        <el-button @click.native="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/vuex/store";
import axios from "axios";
export default {
  name: "StockMng",
  store,
  data() {
    let checkNumber = (rule, value, callback) => {
      if (!this.formData.operation && value > this.stockNumber) {
        return callback(new Error("减少量不能多于库存量"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      tabValue: "car",
      filterAutomobileStock: [],
      formVisible: false, //变更界面是否显示
      formData: {}, //变更界面数据
      changeObject: "", //当然变更对象
      stockNumber: 0, //当然变更对象库存量
      automobileCategorys: [
        {
          label: "轿车",
          value: "car"
        },
        {
          label: "SUV",
          value: "suv"
        },
        {
          label: "MPV",
          value: "mpv"
        },
        {
          label: "跑车",
          value: "sportscar"
        },
        {
          label: "皮卡",
          value: "pickup"
        },
        {
          label: "微面",
          value: "minivan"
        },
        {
          label: "微卡",
          value: "minitruck"
        },
        {
          label: "轻客",
          value: "lightbus"
        }
      ],
      automobileStock: [],
      formRules: {
        number: [
          { required: true, message: "请输入变更数量", trigger: "blur" },
          { pattern: /^[1-9]\d*$/, message: "请输入正整数", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.loading = true;
    let that = this;
    axios
      .get(
        "https://www.easy-mock.com/mock/5c702a27d3044d1448586d67/amKnow/stock"
      )
      .then(response => {
        that.automobileStock = response.data;
        that.filterStock();
        that.loading = false;
      })
      .catch(error => {
        that.$message({
          message: "网络错误,请稍后再试",
          type: "error"
        });
        that.loading = false;
      });
  },
  computed: {
    getShow() {
      return this.$store.state.isShow;
    }
  },
  methods: {
    handleClick(tab) {
      this.tabValue = tab.name;
      this.filterStock();
    },
    filterStock() {
      let tabValue = this.tabValue;
      let filterAutomobileStock = this.automobileStock.filter(item => {
        return item.category == tabValue;
      });
      this.filterAutomobileStock = filterAutomobileStock;
    },
    handleChange(name, inventory) {
      this.formVisible = true;
      if (inventory == 0) {
        this.formData = {
          operation: true,
          number: null
        };
      } else {
        this.formData = {
          operation: false,
          number: null
        };
      }
      this.changeObject = name;
      this.stockNumber = inventory;
    },
    changeSubmit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            cancelButtonClass: "btn-custom-cancel"
          })
            .then(() => {
              let changedInventory = 0;
              if (this.formData.operation) {
                changedInventory = this.stockNumber + this.formData.number;
              } else {
                changedInventory = this.stockNumber - this.formData.number;
              }
              let automobileStock = this.automobileStock;
              for (let index in automobileStock) {
                if (automobileStock[index].name == this.changeObject) {
                  automobileStock[index].inventory = changedInventory;
                  break;
                }
              }
              this.filterStock();
              this.$message({
                message: "变更成功",
                type: "success"
              });
              this.$refs["formData"].resetFields();
              this.changeObject = "";
              this.stockNumber = 0;
              this.formVisible = false;
            })
            .catch(() => {
              // this.$message.error("变更失败");
            });
        }
      });
    },
    closeDialog() {
      this.changeObject = "";
      this.stockNumber = 0;
      this.$refs["formData"].resetFields();
    },
    handleClose() {
      this.changeObject = "";
      this.stockNumber = 0;
      this.formVisible = false;
      this.$refs["formData"].resetFields();
    }
  }
};
</script>

<style>
.all-tabs {
  padding: 10px 0;
}
.col-padding-first {
  padding: 0 5px;
}
.col-padding-rest {
  padding: 15px 5px 0;
}
.tab-normal {
  overflow: auto;
  height: 100%;
}
.tab-small {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: Center;
}
.card-content {
  text-align: center;
  padding: 5px 0 10px;
}
.name-small {
  font-size: 16px;
}
.name-mini {
  font-size: 12px;
}
.stock-small {
  font-size: 12px;
}
.stock-mini {
  font-size: 10px;
}
.button-padding-top {
  padding-top: 5px;
}
.brand-dialog-min-width {
  min-width: 350px;
}
</style>
