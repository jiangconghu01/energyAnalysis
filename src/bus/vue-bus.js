const install = function(Vue) {
    const Bus = new Vue({
        methods: {
            emit(event, ...rest) {
                this.$emit(event, ...rest);
            },
            on(event, callback) {
                this.$on(event, callback);
            },
            off(event, callback) {
                this.$off(event, callback);
            }
        }
    });
    Vue.prototype.$bus = Bus;
};
export default install;
