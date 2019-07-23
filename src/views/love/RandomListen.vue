<template>
  <div class="container">
    <mt-header title="节目列表"></mt-header>
    <ul class="bg-bubbles">
      <li v-for="(item, index) in bubbles" :key="index"></li>
    </ul>

    <img
      class="box"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563353255&di=248f32d695ba24f3de828890a7e114c6&imgtype=jpg&er=1&src=http%3A%2F%2Fpic65.nipic.com%2Ffile%2F20150429%2F2531170_102841204000_2.jpg"
      alt
    />
    <audio :src="showURL" ref="audio"></audio>
    <mt-progress :value="20" :bar-height="5"></mt-progress>
    <img src="../../assets/1.png" alt class="img1" />

    <img src="../../assets/2.png" alt v-show="playFlag" class="img2" @click="play" />
    <img src="../../assets/1.png" alt v-show="!playFlag" class="img2" @click="play" />

    <img src="../../assets/1.png" alt class="img3" @click="next"/>
    <img
      src="../../assets/3.png"
      alt
      class="img4"
      @click="likeclick"
      v-show="false|$store.getters.isLike"
    />
    <img
      src="../../assets/4.png"
      alt
      class="img4"
      @click="likeclick"
      v-show="!$store.getters.isLike"
    />
  
    
    <p class="descShow">{{desc}}</p>
  </div>
</template>
<script>
import { skipShowsList } from "@/request.js";
//不需要引入，直接拿来用
//import {setCurrentIndex} from "@store.js"
export default {
  data() {
    return {
      bubbles: [],
      showID: this.$route.params.id,
      fatherID: this.$route.params.fatherID,
      show: [],
      showURL: "",
      playFlag: false,
      likeFlag: "",
      desc: "",
      currentIndex:this.$store.state.currentIndex,
      audioList:this.$store.state.audioList
    };
  },
  computed:{
   // currentIndex
  },
  created() {
    this.bubbles.length = 10;
    console.log(this.currentIndex)
  },
  mounted() {
    
    
  },
  methods: {
   next(){
     if(this.playFlag){
       let index=currentIndex+1;
       index===this.audioList.length?
        this.$store.commit('setCurrentIndex',0)
        :this.$store.commit('setCurrentIndex',index)
     }
   },
    play() {
      this.playFlag = !this.playFlag;
      var audio = this.$refs.audio;
      //var click=this.$refs.click;
      //click.bind("click")
      if (audio != null) {
        if (this.playFlag) {
          audio.play();
        } else {
          audio.pause();
        }
      }
      //console.log("ccc",this.$store.state.likeShows);
    },
    likeclick() {
      if (this.likeFlag == false) {
        this.likeFlag = true;
      } else {
        this.likeFlag = false;
        var obj = {
          likeFlag: false,
          showID: this.fatherID,
          skipShowID: this.showID
        };
        //console.log(obj)
        this.$store.commit("addToLikeShows", obj);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.descShow {
  text-indent: 35px;
  font-size: 20px;
  line-height: 28px;
}
.container {
  position: relative;
}
.img1,
.img2,
.img3,
.img4 {
  width: 35px;
  height: 35px;
  position: absolute;
}
.img1 {
  transform: rotateZ(180deg);
  left: 90px;
  top: 600px;
}
.img2 {
  left: 50%;
  margin-left: -17.5px;
  top: 600px;
}
.img3 {
  right: 90px;
  top: 600px;
}
.img4 {
  right: 30px;
  top: 600px;
}

.box {
  width: 100%;
  height: 250px;
}
.mint-header {
  background: red;
  font-size: 20px;
}
.mt-progress {
  position: absolute;
  width: 60%;
  left: 80px;
  top: 550px;
}

.mt-progress-progress {
  height: 8px !important;
  background-color: red !important;
}
.bg-bubbles {
  position: absolute;
  // 使气泡背景充满整个屏幕
  top: 0;
  left: 0;
  width: 91%;
  height: 91%;
  li {
    position: absolute;
    // bottom 的设置是为了营造出气泡从页面底部冒出的效果；
    bottom: -300px;
    // 默认的气泡大小；
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(236, 16, 27, 0.829);
    list-style: none;
    // 使用自定义动画使气泡渐现、上升和翻滚；
    animation: circle 15s infinite;
    transition-timing-function: linear;
    // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
    &:nth-child(1) {
      left: 10%;
    }
    &:nth-child(2) {
      left: 20%;
      width: 45px;
      height: 45px;
      animation-delay: 2s;
      animation-duration: 7s;
      background-color: rgba(245, 127, 215, 0.3);
    }
    &:nth-child(3) {
      left: 25%;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 50px;
      height: 50px;
      animation-duration: 8s;
      background-color: rgba(78, 21, 235, 0.3);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 40px;
      height: 40px;

      animation-delay: 3s;
      background-color: rgba(128, 235, 226, 0.2);
    }
    &:nth-child(7) {
      left: 32%;
      width: 60px;
      height: 60px;
      animation-delay: 2s;
      background-color: rgba(240, 136, 75, 0.3);
    }
    &:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
      animation-duration: 15s;
    }
    &:nth-child(9) {
      left: 25%;
      width: 10px;
      height: 10px;
      animation-delay: 2s;
      animation-duration: 12s;
      background-color: rgba(139, 238, 139, 0.3);
    }
    &:nth-child(10) {
      left: 85%;
      width: 50px;
      height: 50px;
      animation-delay: 5s;
      background-color: rgba(217, 228, 74, 0.3);
    }
  }
  // 自定义 square 动画；
  @keyframes circle {
    0% {
      opacity: 0.5;
      transform: translateY(0px) rotate(45deg);
    }
    25% {
      opacity: 0.75;
      transform: translateY(-400px) rotate(90deg);
    }
    50% {
      opacity: 1;
      transform: translateY(-600px) rotate(135deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-1000px) rotate(180deg);
    }
  }
}
</style>

