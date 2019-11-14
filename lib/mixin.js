const myMixin = {
    props: {
        dataBody: {
            type: Array,
            required: true,
            default: function () {
                return []
            }
        },
        dataHeaders: {
            type: Array,
            required: true,
            default: function () {
                return []
            }
        },
        params: {
            type: [String, Object],
            required: false,
        }
    },
    computed: {
        proxy_params() {
            if (JSON.stringify(this.params) !== '{}') {
                return this.params
            } else {
                alert("传入的params为{},请重新传入")
                return false;
            }
        }
    },
    methods: {
        filterValue(val, params, drill = false, isCard = false) {
            let result = val;
            if (typeof val === 'number') {
                switch (params.format) {
                    case 'original':
                        result = this.thousandFixedmixin(params.thousand, val, params.fixed)
                        break;
                    case 'percent':
                        result = this.thousandFixedmixin(params.thousand, (val * 100), params.fixed, '%');
                        break;
                    case 'unit':
                        result = this.thousandFixedmixin(params.thousand, (val / 10000), params.fixed, isCard ? '万' : '');
                        break;
                    case 'billion':
                        result = this.thousandFixedmixin(params.thousand, (val / 100000000), params.fixed, isCard ? '亿' : '');
                        break;
                }
                // 是否添加变色
                if (params.addColor && params.colorNumber !== undefined) {
                    if (val == null) {
                        return '--'
                    } else {
                        if (val == 0) {
                            return 0
                        } else if (val >= params.colorNumber) { //暂时  
                            if (drill) {
                                return `<span>↑${result}</span>`
                            } else {
                                return `<span style="color:#ff3a3a">↑${result}</span>`
                            }

                        } else if (val < params.colorNumber) {
                            if (drill) {
                                return `<span>↓${result}</span>`
                            } else {
                                return `<span style="color:#27aa47">↓${result}</span>`
                            }
                        }
                    }
                } else {
                    return result;
                }
            } else {
                if (val === null) {
                    return "--"
                } else {
                    return val;
                }
            }
        },
        thousandRegEx(val, sign = ",") {
            let res = null;
            res = val.toString().replace(/\d+/, function (n) { // 先提取整数部分
                return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
                    return $1 + sign;
                });
            });
            return res;
        },
        decimal(val, fixed) {
            return val.toFixed(fixed);
        },
        thousandFixedmixin(isThousand, val, fixed, postfix = '') {
            return (isThousand ? this.thousandRegEx(this.decimal(val, fixed)) : this.decimal(val, fixed)) + postfix
        }
    }
}
export default myMixin;