<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input
            v-model="filters.name"
            :placeholder="getShow == 3?'名称':'汽车名称'"
            :class="getShow == 1?'normal-input':(getShow == 2?'middle-input':'small-input')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="filters.brand"
            :placeholder="getShow == 3?'品牌':'汽车品牌'"
            :class="getShow == 1?'normal-input':(getShow == 2?'middle-input':'small-input')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="filters.category"
            :placeholder="getShow == 3?'类别':'汽车类别'"
            :class="getShow == 1?'normal-select':(getShow == 2?'middle-select':'small-select')"
          >
            <el-option value>请选择</el-option>
            <el-option
              v-for="item in automobileCategorys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            v-show="getShow == 1"
            @click="searchAutomobile"
          >查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-search"
            title="查询"
            v-show="getShow != 1"
            circle
            @click="searchAutomobile"
          ></el-button>
        </el-form-item>
        <el-form-item class="add-button">
          <el-button type="success" icon="el-icon-plus" v-show="getShow == 1" @click="handleAdd">新增</el-button>
          <el-button
            type="success"
            icon="el-icon-plus"
            title="新增"
            v-show="getShow != 1"
            circle
            @click="handleAdd"
          ></el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="showTable"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      highlight-current-row
      height="400"
      style="border:1px solid #dfe6ec;"
      v-loading="loading"
    >
      <!-- <el-table-column type="selection" width="48" align="center"></el-table-column> -->
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="汽车名称" width="92" align="center" :formatter="formatName"></el-table-column>
      <el-table-column prop="brand" label="品牌" width="92" align="center" :formatter="formatBrand"></el-table-column>
      <el-table-column
        prop="category"
        label="类别"
        width="92"
        align="center"
        :formatter="formatCategory"
      ></el-table-column>
      <el-table-column
        prop="engine"
        label="发动机"
        width="92"
        align="center"
        :formatter="formatEngine"
      ></el-table-column>
      <el-table-column
        prop="gearbox"
        label="变速箱"
        width="120"
        align="center"
        :formatter="formatGearbox"
      ></el-table-column>
      <el-table-column
        prop="drivingMode"
        label="驱动方式"
        width="92"
        align="center"
        :formatter="formatDrivingMode"
      ></el-table-column>
      <el-table-column prop="energy" label="能源" width="92" align="center" :formatter="formatEnergy"></el-table-column>
      <el-table-column
        prop="seatNumber"
        label="座位数"
        width="92"
        align="center"
        :formatter="formatSeatNumber"
      ></el-table-column>
      <el-table-column
        prop="yearStyle"
        label="年代款"
        width="92"
        align="center"
        :formatter="formatYearStyle"
      ></el-table-column>
      <el-table-column prop="price" label="售价" width="92" align="center" :formatter="formatPrice"></el-table-column>
      <el-table-column label="操作" min-width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="text-align:center">
      <!-- <el-button
        type="danger"
        icon="el-icon-delete"
        @click="batchRemove"
        v-show="getShow == 1"
        :disabled="this.sels.length===0"
        style="float:left"
      >批量删除</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        title="批量删除"
        @click="batchRemove"
        v-show="getShow != 1"
        :disabled="this.sels.length===0"
        style="float:left"
      ></el-button>-->
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :page-size="pagesize"
        :total="this.filterAutomobileInfs.length"
      ></el-pagination>
    </el-col>

    <!--新增编辑界面-->
    <el-dialog
      :title="addOrEdit == 0 ? '新增' : '编辑'"
      :visible.sync="formVisible"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="dialog-minwidth"
    >
      <el-form :model="formData" label-width="80px" :rules="formRules" ref="formData">
        <el-row class="row-padding-bottom">
          <el-col :span="12" class="col-position">
            <el-form-item label="汽车名称" prop="name">
              <el-input v-model="formData.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌">
              <el-input v-model="formData.brand"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-padding-bottom">
          <el-col :span="12" class="col-position">
            <el-form-item label="类别">
              <el-select v-model="formData.category" style="width:100%">
                <el-option
                  v-for="item in automobileCategorys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发动机">
              <el-input v-model="formData.engine"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-padding-bottom">
          <el-col :span="12" class="col-position">
            <el-form-item label="变速箱">
              <el-input v-model="formData.gearbox"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驱动方式">
              <el-radio-group v-model="formData.drivingMode">
                <el-radio class="radio" :label="0">两驱</el-radio>
                <el-radio class="radio" :label="1">四驱</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-padding-bottom">
          <el-col :span="12" class="col-position">
            <el-form-item label="能源">
              <el-select v-model="formData.energy" style="width:100%">
                <el-option :label="'汽油'" :value="0"></el-option>
                <el-option :label="'柴油'" :value="1"></el-option>
                <el-option :label="'纯电动'" :value="2"></el-option>
                <el-option :label="'油电混合'" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="座位数">
              <el-input-number v-model="formData.seatNumber" :min="2" :max="70"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="col-position">
            <el-form-item label="年代款">
              <el-input v-model="formData.yearStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="售价" prop="price">
              <el-input v-model="formData.price" placeholder="万/辆"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-show="addOrEdit == 0" @click.native="addSubmit">提交</el-button>
        <el-button type="primary" v-show="addOrEdit == 1" @click.native="editSubmit">提交</el-button>
        <el-button @click.native="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import store from "@/vuex/store";
import axios from "axios";
export default {
  name: "AutomobileInfMng",
  store,
  data() {
    return {
      loading: false,
      pagesize: 10,
      currentPage: 1,
      id: "", //原数据id
      // sels: [],
      filters: {
        name: "",
        brand: "",
        category: ""
      },
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
      filterAutomobileInfs: [],
      formVisible: false, //新增编辑界面是否显示
      formData: {}, //新增编辑界面数据
      addOrEdit: 0, //add——0  edit——1
      automobileInfs: [],
      formRules: {
        name: [
          {
            required: true,
            pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
            message: "请输入汽车名称",
            trigger: "blur"
          }
        ],
        price: [
          {
            pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/,
            message: "请输入大于0并且小数点最多两位的数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.loading = true;
    let that = this;
    axios
      .get(
        "https://www.easy-mock.com/mock/5c702a27d3044d1448586d67/amKnow/automobile"
      )
      .then(response => {
        that.automobileInfs = response.data;
        that.filterAutomobile();
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
    },
    showTable() {
      return this.filterAutomobileInfs.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  methods: {
    searchAutomobile() {
      this.currentPage = 1;
      this.filterAutomobile();
    },
    filterAutomobile() {
      let filtersName = this.filters.name.trim();
      let filtersBrand = this.filters.brand.trim();
      let filtersCategory = this.filters.category;
      let filtersAutomobile = this.automobileInfs.filter(item => {
        var isFiltersName = true;
        var isFiltersBrand = true;
        var isFiltersCategory = true;
        if (filtersName.length != 0) {
          isFiltersName = item.name.indexOf(filtersName) != -1;
        }
        if (filtersBrand.length != 0) {
          isFiltersBrand = item.brand == filtersBrand;
        }
        if (filtersCategory.length != 0) {
          isFiltersCategory = item.category == filtersCategory;
        }
        return isFiltersName && isFiltersBrand && isFiltersCategory;
      });
      this.filterAutomobileInfs = filtersAutomobile;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    //显示新增界面
    handleAdd() {
      this.formVisible = true;
      this.addOrEdit = 0;
      this.formData = {
        name: "",
        brand: "",
        category: "",
        engine: "",
        gearbox: "",
        drivingMode: 0,
        energy: null,
        seatNumber: 5,
        yearStyle: "",
        price: null
      };
    },
    //显示编辑界面
    handleEdit(index, row) {
      this.formVisible = true;
      this.addOrEdit = 1;
      this.formData = Object.assign({}, row);
      this.id = row.id;
    },
    handleDelete(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        type: "warning"
      })
        .then(() => {
          let automobileInfs = this.automobileInfs;
          for (let index in automobileInfs) {
            if (automobileInfs[index].id == row.id) {
              automobileInfs.splice(index, 1);
              break;
            }
          }
          this.filterAutomobile();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(() => {
          // this.$message.error("删除失败");
        });
    },
    addSubmit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            cancelButtonClass: "btn-custom-cancel"
          })
            .then(() => {
              this.formData.id = this.getGuid();
              let newData = Object.assign({}, this.formData);
              this.automobileInfs.push(newData);
              this.filterAutomobile();
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$refs["formData"].resetFields();
              this.formVisible = false;
            })
            .catch(() => {
              // this.$message.error("添加失败");
            });
        }
      });
    },
    editSubmit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            cancelButtonClass: "btn-custom-cancel"
          })
            .then(() => {
              let automobileInfs = this.automobileInfs;
              let newData = Object.assign({}, this.formData);
              for (let index in automobileInfs) {
                if (automobileInfs[index].id == this.id) {
                  automobileInfs.splice(index, 1, newData);
                  break;
                }
              }
              this.filterAutomobile();
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$refs["formData"].resetFields();
              this.id = "";
              this.formVisible = false;
            })
            .catch(() => {
              // this.$message.error("修改失败");
            });
        }
      });
    },
    closeDialog() {
      this.id = "";
      this.$refs["formData"].resetFields();
    },
    handleClose() {
      this.id = "";
      this.formVisible = false;
      this.$refs["formData"].resetFields();
    },
    getGuid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    },
    // selsChange(sels) {
    //   this.sels = sels;
    // },
    formatName(row) {
      return row.name.trim();
    },
    formatBrand(row) {
      return row.brand.length == 0
        ? "未知"
        : row.brand.trim().length == 0
        ? "未知"
        : row.brand.trim();
    },
    formatCategory(row) {
      let categoryName;
      switch (row.category) {
        case "car":
          categoryName = "轿车";
          break;
        case "suv":
          categoryName = "SUV";
          break;
        case "mpv":
          categoryName = "MPV";
          break;
        case "sportscar":
          categoryName = "跑车";
          break;
        case "pickup":
          categoryName = "皮卡";
          break;
        case "minivan":
          categoryName = "微面";
          break;
        case "minitruck":
          categoryName = "微卡";
          break;
        case "lightbus":
          categoryName = "轻客";
          break;
        default:
          categoryName = "未知";
          break;
      }
      return categoryName;
    },
    formatEngine(row) {
      return row.engine.length == 0
        ? "未知"
        : row.engine.trim().length == 0
        ? "未知"
        : row.engine.trim();
    },
    formatGearbox(row) {
      return row.gearbox.length == 0
        ? "未知"
        : row.gearbox.trim().length == 0
        ? "未知"
        : row.gearbox.trim();
    },
    formatDrivingMode(row) {
      return row.drivingMode === 0
        ? "两驱"
        : row.drivingMode == 1
        ? "四驱"
        : "未知";
    },
    formatEnergy(row) {
      return row.energy === 0
        ? "汽油"
        : row.energy == 1
        ? "柴油"
        : row.energy == 2
        ? "纯电动"
        : row.energy == 3
        ? "油电混合"
        : "未知";
    },
    formatSeatNumber(row) {
      return row.seatNumber.toString() + "座";
    },
    formatYearStyle(row) {
      return row.yearStyle.length == 0
        ? "未知"
        : row.yearStyle.trim().length == 0
        ? "未知"
        : row.yearStyle.trim();
    },
    formatPrice(row) {
      return row.price == null ? "未知" : row.price.toString() + "万";
    }
  }
};
</script>

<style scoped>
.small-input {
  width: 60px;
}
.middle-input {
  width: 100px;
}
.normal-input {
  width: 180px;
}
.small-select {
  width: 80px;
}
.middle-select {
  width: 120px;
}
.normal-select {
  width: 200px;
}
.col-position {
  position: relative;
  right: 5px;
}
.dialog-minwidth {
  min-width: 560px;
}
</style>
