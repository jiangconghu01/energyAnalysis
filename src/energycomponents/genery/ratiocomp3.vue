<template>
        <div :class="$style.component">
            <div :class="$style.chart" :id="`top-${id}`">
                
            </div>
        </div>
</template>

<script>
import ConfigBar from '../chartconfig/topImBar.js';
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        initdata: {
            type: Object,
            required: true
        },
        valuedata: {
            type: Object,
            required: false
        }

    },
    data () {
        return {
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            chart: {}
        };
    },
    methods: {
        setBar() {
            ConfigBar.title.text = this.initdata.title;
            ConfigBar.title.subtext = this.initdata.subtitle;
            ConfigBar.series[0].name = this.initdata.leg1;
            ConfigBar.series[1].name = this.initdata.leg2;
            ConfigBar.legend.data = [this.initdata.leg1, this.initdata.leg2];
            this.chart.setOption(ConfigBar);
        }
    },
    created() {

    },
    mounted() {
        let bar = this.$echarts.init(document.getElementById('top-' + this.id));
        this.chart = bar;
        this.setBar();
    }
};
</script>
<style lang="scss" module>
    .component{
        height: 100%;
        width:100%;
      .chart{
        height: 100%;
        width:100%;     
      }

    }
  
</style>

