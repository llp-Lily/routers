var Home=Vue.component("Home",{
    template:`
        <div class="Home">
            <Nav></Nav>
            <div class="HomeCon">
                <img src="http://p3.pstatp.com/origin/243200028ddbefab3146" alt="" style="width: 100vw;">
            </div>
        </div>
    `
})
var Nav=Vue.component("Nav",{
    template:`
    <div class="Nav">
        <router-link v-for="(item,key) in navData" :to="item.url" :key="key" exact>{{item.title}}</router-link>
        <router-link to="/login" v-if="!islogin">登录</router-link>
       
       <span v-if="islogin" class="info" @click="show">
       {{name}}
            <span  class="logout" v-show="isshow" @click="logout">退出</span>
       </span>
    </div>
    `,
    data(){
        return{
            navData:[
                {title:"首页",url:"/"},
                {title:"简介",url:"info"},
                {title:"文档",url:"doc"}
            ],
            islogin:false,
            name:"",
            isshow:false
        }
    },
    created(){
        this.name=this.get("login","name");
        this.islogin=this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow
        },
        logout(){
            this.del("login");
            router.push("/")
        }
    }
})

var Info=Vue.component("Info",{
    template:`
        <div class="Info">
            <Nav></Nav>
            <transition name="opacity" mode="out-in">
                <router-view style="text-align: center"> 
            
                </router-view>
            </transition>
        </div>
    `
})
var List=Vue.component("List",{
    template:` 
    	  <ul class="mui-table-view" style="padding-top:44px;position: absolute;width:100%">
	      <li class="mui-table-view-cell mui-media">
	      
	       <router-link to="/info/list/1" tag="a" style="position: relative">
	       
	       <img class="mui-media-object mui-pull-right" src="http://upload-images.jianshu.io/upload_images/4382028-dd8bdffcf43bde2f?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240">
	              <div class="mui-media-body">
	                  梦想
	                  <p class="mui-ellipsis">遵从自己的内心，迈出决定未来方向的一步</p>
	              </div>
</router-link>
	          
	      </li>
	      <li class="mui-table-view-cell mui-media">
	         <router-link to="/info/list/2" tag="a">
	       
	       <img class="mui-media-object mui-pull-right" src="http://upload-images.jianshu.io/upload_images/9239039-db30617ea6f9ce1d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240">
	              <div class="mui-media-body">
	                  摄影
	                  <p class="mui-ellipsis">如果你厌倦了城市的喧嚣，就跟我回村爬爬山，看看雪吧</p>
	              </div>
</router-link>
	      </li>
	      <li class="mui-table-view-cell mui-media">
	         <router-link to="/info/list/3" tag="a">
	       
	       <img class="mui-media-object mui-pull-right" src="http://placehold.it/40x30http://upload-images.jianshu.io/upload_images/8003581-348379b6c01e291f.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240">
	              <div class="mui-media-body">
	                  旅行
	                  <p class="mui-ellipsis">旅行情报 | 【江西婺源】因为贪恋多一抹秋色，所以想去看晒秋枫景</p>
	              </div>
</router-link>
	      </li>
	  </ul>
`,
    beforeRouteEnter(to,from,next){
        next();
    },
    beforeRouteLeave(to,from,next){
        next();
    }
})
var Con = Vue.component("Con",{
    template:`
            <div>
                <h2 style='padding-top: 44px;text-align: center'>{{conData[$route.params.id-1].title}}</h2>
                <h3 style='text-align: center'>{{conData[$route.params.id-1].con}}</h3>
            </div>`,
    data(){
        return {
            conData:[
                {title:"111",con:"conconconcon"},
                {title:"222",con:"conconcocncon"},
                {title:"333",con:"conconconcon"},
            ]
        }
    }
})
var Doc=Vue.component('Doc',{
    template:`
    <div>
        <Nav></Nav>
        <div class="Doc"  style="position: absolute;left:0;top:44px;width:100%">
            <router-view class="left" name="left"></router-view>
            <router-view class="right" name="right"></router-view>
        </div>
    </div>
    `,
    beforeRouteEnter(to,from,next){
        next(function (vm) {
            if(!vm.get('login','name')){
                router.push('/login');
            }
        })
    }
})
var left=Vue.component('left',{
    template:`
    <div class='left' style="float: left;width: 20vw;overflow: hidden;border: none;">
        <ul>
            <li>
                <h3>vue</h3>
                <ul>
                    <li><router-link to="#one" tag="li">vue安装</router-link></li>
                    <li><router-link to="#two" tag="li">vue使用</router-link></li>
                </ul>
            </li>
            <li>
                <h3>react</h3>
                <ul>
                    <li><router-link to="#three" tag="li">react安装</router-link></li>
                    <li><router-link to="#four" tag="li">react使用</router-link></li>
                </ul>
            </li>
            <li>
                <h3>node.js</h3>
                <ul>
                    <li><router-link to="#five" tag="li">node.js安装</router-link></li>
                    <li><router-link to="#six" tag="li">node.js使用</router-link></li>
                </ul>
            </li>
        </ul>
    </div>
    `,
    watch:{
        $route(){
            var hash=this.$route.hash.slice(1);
            var vim=this;
            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ tweeningNumber:document.querySelector(".right").scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: (document.querySelector("#"+hash).offsetTop)-44 }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop= this.tweeningNumber.toFixed(0)
                })
                .start()
            animate();
        }
    }
})
var right=Vue.component('right',{
    template:`
        <div class="right" style="float: right;width: 80vw;position: absolute;top: 44px;right: 0;overflow: scroll" >
      
         <div class="floor" id="one">
         
            <h3>vue安装</h3>
            
            npm install vue<br>
            npm install vue<br>
            npm install vue<br>
            npm install vue<br>
            npm install vue<br>
         </div>
         
         <div class="floor" id="two">
         
            <h3>vue使用</h3>
            
            &lt;script src='vue.js' &gt;   &lt;/script&gt; 
            vue使用<br>
            vue使用<br>
            vue使用<br>
            vue使用<br>

         </div>
         
          <div class="floor" id="three">
         
            <h3>react安装</h3>
             <pre>
            React 可以直接下载使用，下载包中也提供了很多学习的实例。
本教程使用了 React 的版本为 15.4.2，你可以在官网 http://facebook.github.io/react/ 下载最新版。
         </pre>
         </div>
         
          <div class="floor" id="four">
            <h3>react使用</h3>
            <pre>
            现在最热门的前端框架，毫无疑问是 React 。
上周，基于 React 的 React Native 发布，结果一天之内，就获得了 5000 颗星，受瞩目程度可见一斑。
React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。

由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。
这个项目本身也越滚越大，从最早的UI引擎变成了一整套前后端通吃的 Web App 解决方案。衍生的 React Native 项目，目标更是宏伟，希望用写 Web App 的方式去写 Native App。如果能够实现，整个互联网行业都会被颠覆，因为同一组人只需要写一次 UI ，就能同时运行在服务器、浏览器和手机。
           </pre>
          
           </div>
           <div class="floor" id="five">
                <h3>node.js安装</h3>
                <pre>
                    node.js安装<br>
                    node.js安装<br>
                    node.js安装<br>
                </pre>    
            </div>
            <div class="floor" id="six">
                <h3>node.js使用</h3>
                <pre>
                    node.js使用<br>
                    node.js使用<br>
                    node.js使用<br>
                </pre>    
            </div>
      </div>
    `
})
var login=Vue.component('login',{
    template:`
        <div>
<header class="mui-bar mui-bar-nav">
     <a class="mui-icon mui-icon-undo" @click="back"></a>
			<h1 class="mui-title">登录</h1>
</header>
<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
		
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
			
			</div>
			<div class="mui-content-padded oauth-area">
			</div>
		</div></div>
    `,
    methods:{
        back(){
            router.push('/');
        },
        submit(){
            var obj={"name":document.querySelector('#name').value};
            this.save('login',obj);
            router.push('/doc');
        }
    }
})