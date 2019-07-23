<template>
  <div id="main">
    <div class="photo" :style="'background:url(' +photoUrl+')'"></div>
    <img :src="photoUrl" alt class="photo2" />
    <div class="apper p1">{{program}}</div>
    <div class="apper p2">主播 {{name}}</div>
    <div class="apper p3">{{nextPrograme}}</div>
    <div class="p4">{{introduct}}</div>
    <br />
    <br />
    <div class="list-content" id="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="加载中...">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          
        >
          <div class="list-item">
            <van-cell v-for="(item) in showLists" :key="item.id">
              <router-link
                :to="'/RandomListen/'+(item.album && item.album.albumID)+'/'+(item.show && item.show.showID)"
              >
                <img class="image" src="../../assets/1.png" alt />
                <p class="name">{{item.show && item.show.name}}</p>
                <p
                  class="time"
                >时间：{{item.show &&item.show.duration|formatTime(item.show &&item.show.duration)}}</p>
              </router-link>
            </van-cell>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
import { showsList, skipShowsList } from "@/request.js";

export default {
  data() {
    return {
      id: this.$route.params.id,
      showLists: [],
      photoUrl: "",
      program: "",
      nextPrograme: "",
      name: "",
      introduct: "",
      loading: false, //是否处于加载状态
      finished: false, //是否已加载完所有数据
      isLoading: false, //是否处于下拉刷新状态
      start: 0,
      isLoading: false,
      isLike:false
    };
  },
  created() {
    //this.showListsMethod();
    //console.log(this.start)
   
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight; //视口大小
    document.getElementById("list-content").style.height =
       winHeight - 46 + "px"; //调整上拉加载框高度
  },
  methods: {
    showListsMethod() {
      showsList(this.id).then(data => {
        //console.log(data);
        var length = 10;
        var end = this.start + length;
        var str = data.slice(this.start, end);
        var newStr = str.join(",");
        //console.log(this.start, end, newStr);
        skipShowsList(this.id, newStr).then(data => {
          //console.log(data);
          if (data) {
            //学会用下面的解决异步请求不到showList的数据与(item.album && item.album.albumID)一个道理
            if (data.data && data.data.showList) {
              for (let i in data.data.showList) {
                this.showLists.push(data.data.showList[i]);
              }
            } else {
              this.finished = true;
              console.log("没有更多数据了");
              return;
            }
          } else {
            this.showLists = [];
          }
          this.photoUrl = this.showLists[0].album.cover.urls[0].url;
          this.program = this.showLists[0].album.name;
          this.name = this.showLists[0].album.owner.nickname;
          this.nextPrograme = this.showLists[0].album.displayText;
          this.introduct = this.showLists[0].album.desc;
          this.start = end;
        });
      });
    },
    onLoad() {
  
      //上拉加载
      setTimeout(() => {
        this.showListsMethod();
        this.loading = false;
      }, 500);
    },
    onRefresh() {
      //下拉刷新
      setTimeout(() => {
        this.finished = false;
        this.isLoading = false;
        this.showLists = [];
        this.onLoad();
      }, 500);
    }
  },
  filters: {
    formatTime(seconds) {
      var minutes = parseInt(seconds / 60);
      var seconds = parseInt(seconds - minutes * 60);
      if (minutes < 10 && seconds < 10) {
        return "0" + minutes + ":0" + seconds;
      } else if (minutes < 10) {
        return "0" + minutes + ":" + seconds;
      } else {
        return minutes + ":" + seconds;
      }
    }
  }
};
</script>

<style scoped >
.photo {
  width: 100%;
  height: 180px;
  opacity: 0.4;
}
.photo2 {
  position: absolute;
  left: 20px;
  top: 90px;
  width: 100px;
  height: 100px;
}
.apper {
  position: absolute;
}
.p1 {
  left: 165px;
  top: 55px;
  font-size: 21px;
  color: black;
}
.p2 {
  left: 145px;
  top: 95px;
  font-size: 18px;
  color: black;
}
.p3 {
  left: 145px;
  top: 130px;
  font-size: 18px;
  color: black;
}
.p4 {
  text-indent: 33px;
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.photo2 {
  -webkit-animation-name: fadeIn;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-duration: 3s;
  -webkit-animation-direction: alternate;
}
.shows {
  width: 100%;
  height: 80px;
  border: 1px solid red;
  margin-bottom: 10px;
  position: relative;
}
.name {
  position: absolute;
  top: 15px;
  left: 70px;
  color: black;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  width: 300px;
}
.image {
  width: 28px;
  height: 28px;
  position: absolute;
  left: 15px;
  top: 25px;
}
.time {
  position: absolute;
  left: 70px;
  top: 44px;
  color: black;
}

.van-cell {
  height: 80px;
  position: relative;
  width: 100%;
}

</style>


