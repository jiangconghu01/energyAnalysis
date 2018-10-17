<template>
    <div :class="$style.genery">
        <div :class="$style.tab">
            <div>
            <div :class="[$style['tab-item'],$style.first,this.currentTab==1?$style.current:'']" @click="toGeneryPage()"><span>总体情况</span></div>
            <div :style="dev && {display:'none'}" :class="[$style['tab-item'],this.currentTab==2?$style.current:'']" @click="toGeneryImpotent()"><span>重点价值TOP</span></div>
            <div :class="[$style['tab-item'],this.currentTab==3?$style.current:'']" @click="toGeneryOffice()"><span>TOP-50办公大楼</span></div>
            <div :class="[$style['tab-item'],this.currentTab==4?$style.current:'']" @click="toGeneryTyi()"><span>TOP-50天翼卖场</span></div>
            <div :class="[$style['tab-item'],$style.last,this.currentTab==5?$style.current:'']" @click="toGeneryCommunication()"><span>TOP-80通信局站</span></div>
            </div>
        </div>
         <router-view></router-view>

    </div>
</template>

<script>
export default {
    data () {
        return {
            home: true,
            czxtData: null,
            currentTab: 1,
            // dev: this.$store.getters.module !== 'dev',
            dev: true,
            test: 'test'
        };
    },
    methods: {
        toGeneryPage() {
            this.$router.push({ name: 'All' });
            this.currentTab = 1;
        },
        toGeneryImpotent() {
            this.$Message.info({
                content: '功能尚未开发，页面为模拟数据',
                duration: 3,
                closable: true
            });
            // this.$router.push({name: 'TopImp'});
            // this.currentTab = 2;
        },
        toGeneryOffice() {
            this.currentTab = 3;
            this.$router.push({ name: 'TopRank', params: { pageType: 'office' } });
        },
        toGeneryTyi() {
            this.currentTab = 4;
            this.$router.push({ name: 'TopRank', params: { pageType: 'tianyi' } });
        },
        toGeneryCommunication() {
            this.currentTab = 5;
            this.$router.push({ name: 'TopRank', params: { pageType: 'communication' } });
        },
        getData() {
            // this.axios({
            //     method: 'get',
            //     url: '/czxt/action/zjcw/SSCBigdata/queryTemplate.do'
            // }).then((res) => {
            //     this.czxtData = res;
            // });
        }
    },
    mounted() {

    },
    watch: {

    },
    beforeRouteEnter (to, from, next) { // 刷新页面时候确定tab标签位置
        let current = getCurrent(to.path);
        next(vm => {
            vm.currentTab = current;
        });
    },
    beforeRouteUpdate (to, from, next) { // 点击上层菜单时候时候确定tab标签位置
        let current = getCurrent(to.path);
        this.currentTab = current;
        next();
    },

};
function getCurrent(path) {
    let current = 1;
    switch (path) {
    case '/genery/all':current = 1;
        break;
    case '/genery/topimp':current = 2;
        break;
    case '/genery/toprank/office':current = 3;
        break;
    case '/genery/toprank/tianyi':current = 4;
        break;
    case '/genery/toprank/communication':current = 5;
    }
    return current;
}
</script>

<style lang="scss" module>
  .genery{
    height: 85%;
    width: 100%;
    // margin-top: 20px;
    position: absolute;
    box-sizing: border-box;
    top:10%;
    .tab{
        width: 100%;
        height: 5%;
        position: relative;
        min-height:25px;
        &>div{
            width:62%;
            height: 100%;
            position: absolute;
            left: 25%;
            font-size: 14px;
            color: #fff;
            font-weight: normal;
            .tab-item{
                display: inline-block;
                text-align: center;
                width:18% ;
                height: 100%;
                border: 0.05rem solid rgba(16,162,249,0.8);
                border-right: none;
                
                margin-left: -1%;
                vertical-align: top;
                position: relative;
                cursor: pointer;
                span{
                    opacity: 0.5;
                    white-space: nowrap;
                    left: 50%;
                    top: 50%;
                    position: absolute;
                    display: inline-block;
                    transform: translateY(-50%) translateX(-50%);
                }
            }
            .first{
                border-top-left-radius: 0.3rem;;
                border-bottom-left-radius: 0.3rem;
            }
            .last{
                border-right: 0.05rem solid rgba(16,162,249,0.5);
                border-top-right-radius: 0.3rem;;
                border-bottom-right-radius: 0.3rem;
            }
            .current{
                background-color: rgba(16,162,249,1);
                span{
                    opacity: 1;
                }
            }
        }
    }
    
  }
</style>
