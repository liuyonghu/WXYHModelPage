// libs/ModelPage/YHModelPage.js



Component({
        /**
         * 组件的初始数据
         */
        data: {
                showYHModelPageAnimation: {},
                mainHeight: "0px",
                YHOpacity: 0,
                YHModelViewTypeFlag: "VIEW"
        },
        /**
         * 组件的属性列表
         */
        properties: {
                toShowPage: {
                        type: Boolean,
                        value: false,
                        observer(newVal, oldVal, changedPath) {
                                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                                // 通常 newVal 就是新设置的数据， oldVal 是旧数据
                                if (newVal) {
                                        console.log("   if(newVal){");
                                        this.showYHModelPage();
                                } else {
                                        this.closePage();
                                        console.log("   if(newVal){ }else{");
                                }
                        }
                },
                YHModelViewInfoData: {
                        type: Object,
                        value: {
                                title: "提示",
                                content: "通常 newVal 就是新设置的数据， oldVal 是旧数据",
                                src: "",
                                type: "VIEW"
                        },
                        observer(newVal, oldVal, changedPath) {
                                var that = this;
                                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                                // 通常 newVal 就是新设置的数据， oldVal 是旧数据
                                // console.log("that = " + JSON.stringify(that));
                                if (newVal) {
                                        switch (newVal.type) {
                                                case ("VIEW"):
                                                        {

                                                                console.log("   VIEW");
                                                        };
                                                        break;
                                                case ("IMAGE"):
                                                        {
                                                                console.log("   IMAGE");
                                                        };
                                                        break;
                                                default:
                                                        {};
                                                        break;
                                        };
                                        //        判断赋值是否为空
                                        if (!newVal.type) {
                                                return;
                                        }
                                        that.setData({
                                                YHModelViewTypeFlag: newVal.type
                                        });
                                        console.log("   if(newVal){ = =" + that.data.YHModelViewTypeFlag);

                                } else {

                                        console.log("   if(newVal){ }else{");
                                }
                        }
                },
                confrimFunc: {
                        type: Function,
                        value: function() {},
                        observer(newVal, oldVal, changedPath) {
                                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                                // 通常 newVal 就是新设置的数据， oldVal 是旧数据
                                if (newVal) {
                                        // console.log("   if(newVal){");

                                } else {

                                        // console.log("   if(newVal){ }else{");
                                }
                        }
                },
                closeFunc:{
                        type:Function,
                        value:function(){}
                },
                YHModelViewType: {
                        type: String,
                        value: "VIEW",
                        observer(newVal, oldVal, changedPath) {
                                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                                // 通常 newVal 就是新设置的数据， oldVal 是旧数据

                        }
                }
        },
        ready: function() {
                const animation = wx.createAnimation({
                        duration: 500,
                        timingFunction: "ease"
                })
                this.animation = animation;
        },


        /**
         * 组件的方法列表
         */
        methods: {
                showYHModelPage: function() {
                        var systemInfo = this.systemInfo();
                        var sHeight = systemInfo.windowHeight;
                        var that = this;
                        // console.log("this = " + JSON.stringify(this));
                        that.setData({
                                mainHeight: "100%",
                                YHOpacity: 1
                        });
                        // console.log("that1 = " + JSON.stringify(this));

                },
                closeYHModelPage: function() {
                        // reset property showPage
                        this.properties.toShowPage = false;
                        this.setData({
                                mainHeight: "0px",
                                YHOpacity: 0
                        });
                        this.properties.closeFunc();
                },
                confrimYHModelPage: function() {
                        // reset property showPage
                        this.properties.toShowPage = false;
                        // call func
                        if (!this.properties.confrimFunc) {
                                throw new EvalError("confrimFunc is undefind !");
                                return;
                        }
                        this.properties.confrimFunc();
                        this.setData({
                                mainHeight: "0px",
                                YHOpacity: 0
                        });
                },
                systemInfo() {
                        var systemInfo = this.getLocalData("systemInfo");
                        if (!systemInfo) {
                                systemInfo = wx.getSystemInfoSync();
                                this.saveLocalData({
                                        "systemInfo": systemInfo
                                });
                        }
                        return systemInfo;
                },
                getLocalData(options) {

                        try {
                                return wx.getStorageSync(options);
                        } catch (err) {
                                return false;
                        }
                }
        }


})