<template>
  <div>
    <!-- 顶部滑动条区域
               参照MUI案例中的 tab-top-webview-main.html
    -->
    <mt-header title="随心听"></mt-header>
   
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', index == 0 ? 'mui-active' : '']"
            v-for="(item,index) in navList"
            :key="item.channel"
            @tap="getList(item.channel)"
          >{{ item.channel }}</a>
        </div>
      </div>
    </div>
    <!-- show以及id -->
    <transition-group>
      <div
        class="itemStyle"
        v-for="item in listItem"
        :key="item.id"
        @tap="getAlbumLists(item)"
      >{{item.type}}</div>
    </transition-group>
    <br />
    <br />
    <br />
     
    <div class="albums" v-for="item in albumLists" :key="item.album.albumID"  >
     <router-link :to="'/Programs/'+item.album.albumID" >
      <img class="photo" :src="item.album.cover.urls[0].url" alt />
      <span class="name">{{item.album.name}}</span>
      <span class="desc" ref="introduct">{{item.album.desc}}</span>  
       <router-view></router-view> 
       </router-link>  
      
    </div>
  
   
  </div>
</template>
<script>
import dataBase from "./data-base";
import mui from "mui/js/mui.min.js";
import { albumsList} from "@/request.js";
export default {
  data() {
    var idx = 0;
    return {
      navList: dataBase,
      listItem: [],
      albumLists: [], 
      obj: ""
    };
  },
  created() {
    this.getList("情感生活");
    albumsList(39104).then(data => {
      this.albumLists = data.data.albumInfoList;

      //console.log(this.albumLists)
    });
    //updated()
   // showsList("rd003sLLJi3wFOkX").then(data => {
      // console.log(data)
    //});
   // skipShowsList(this.id).then(data => {
      //var id = this.id;
      //console.log(data.data.showList.id)
      //this.obj = data.data.showList;
      //console.log(data.data.showList);
      //console.log(this.obj);
      //console.log(this.id);
      //console.log("3333");
    //});
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素最好在 mounted 里面，因为这里时候的DOM元素是最新的
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

  },
  methods: {
    //获取对应列表下的分类
    getList(channel) {
      // console.log(dataBase)
      this.navList.forEach(item => {
        if (item.channel == channel) {
          this.listItem = item.list;

          return;
        }
      });
    },
    //获取对应的节目列表show
    getAlbumLists(item) {
     // console.log(item)
      albumsList(item.id).then(data => {
        this.albumLists = data.data.albumInfoList;
        //console.log(this.albumLists[0].album.cover.urls[0].url)
       // console.log(this.albumLists);
      });
    },
    // getShow(id){
    //   console.log(id)
    //   showsList(id).then(data=>{
    //     console.log(data)
    //   })
    // }
  }
};
</script>

<style lang="less" scoped>
* {
  touch-action: none;
}
.mint-header {
  background: red;
  opacity: 0.8;
  font-size: 24px;
}
.mui-active {
  color: red !important;
  font-size: 25px;
}
.itemStyle {
  //添加一个transition动画
  display: inline-block;
  width: 124px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
//出入场动画
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

/* v-enter-active 【入场动画的时间段】 */
/* v-leave-active 【离场动画的时间段】 */
.v-enter-active {
  transition: all 1.8s ease;
}
.v-leave-active {
  transition: all 1.2s ease;
}
//卡片式节目列表
.albums {
  width: 100%;
  height: 90px;
  border: 1px solid red;
  border-radius: 8%;
  margin-bottom: 10px;
  position: relative;
}
.photo {
  width: 100px;
  height: 100%;
  border-radius: 18%;
  position: absolute;
  z-index:1 ;

}
.name {
  position: absolute;
  left: 120px;
  top: 12px;
  font-size: 19px;
  color:black;
}

//跑马灯效果
.desc {
  position: absolute;
  left: 110px;
  top: 50px;
   color:black;
  white-space: nowrap;
  width: 300%;
  text-align: center;
  position: absolute;
  overflow: hidden;
  -webkit-animation: marquee 15s linear infinite;
  animation: marquee 15s linear infinite;
}
@keyframes marquee {
  0% {
    transform: translateX(-125px);
  }
  100% {
    transform: translateX(-675px);
  }
}
</style>
