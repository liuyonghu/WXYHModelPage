// libs/ModelPage/YHModelPage.js



Component({
        /**
         * 组件的初始数据
         */
        data: {
                showYHModelPageAnimation: {},
                mainHeight: "0px",
                YHOpacity: 0,
                YHModelViewTypeFlag: "VIEW",
                showClose: true,
                YHModelViewInfoData: {},
                mainInfoViewContainerAnimation: {},
                touchMove: false,
                touchStartPoint: {},
                mainInfoViewWidth: "",
                mainInfoViewHeight: "",
                mainInfoViewContainerWidth: "",
                mainInfoViewContainerHeight: "",
                mainInfoViewContainerLeftFlag: 0
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
                                        this.showYHModelPage();
                                } else {
                                        this.closePage();
                                }
                        }
                },
                YHModelViewInfoData: {
                        type: Object,
                        value: {
                                title: "提示",
                                content: "通常 newVal 就是新设置的数据， oldVal 是旧数据",
                                src: "",
                                showClose: true,
                                type: "VIEW",
                                responseList: []
                        },
                        observer(newVal, oldVal, changedPath) {
                                var that = this;
                                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                                // 通常 newVal 就是新设置的数据， oldVal 是旧数据
                                // // console.log("that = " + JSON.stringify(that));
                                if (newVal) {
                                        switch (newVal.type) {
                                                case ("VIEW"):
                                                        {

                                                                // // console.log("   VIEW");
                                                        };
                                                        break;
                                                case ("IMAGE"):
                                                        {
                                                                // // console.log("   IMAGE");
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
                                                YHModelViewTypeFlag: newVal.type,
                                                showClose: newVal.showClose || false,
                                                YHModelViewInfoData: newVal
                                        });
                                        //     // console.log("   if(newVal){ = =" + JSON.stringify(newVal));

                                } else {

                                        // // console.log("   if(newVal){ }else{");
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
                                        // // console.log("   if(newVal){");

                                } else {

                                        // // console.log("   if(newVal){ }else{");
                                }
                        }
                },
                closeFunc: {
                        type: Function,
                        value: function() {}
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
                        // // console.log("this = " + JSON.stringify(this));
                        var systemInfo = that.systemInfo();
                        var wW = systemInfo.windowWidth * 0.8;
                        var wH = systemInfo.windowHeight * 0.7;

                        const animation = wx.createAnimation({
                                duration: 100,
                                timingFunction: 'ease',
                        });
                        that.animation = animation;

                        var YHModelViewTypeFlag = that.data.YHModelViewTypeFlag;
                        if (YHModelViewTypeFlag == "VIEW") {
                                that.setData({
                                        mainInfoViewWidth: wW,
                                        mainInfoViewHeight: wH,
                                        mainHeight: "100%",
                                        YHOpacity: 1
                                });
                        } else {
                                let imageNum = that.data.YHModelViewInfoData.responseList.length;
                                let cw = wW * imageNum;
                                that.setData({
                                        mainInfoViewWidth: wW,
                                        mainInfoViewHeight: wH,
                                        mainInfoViewContainerWidth: cw,
                                        mainInfoViewContainerHeight: wH,
                                        mainHeight: "100%",
                                        YHOpacity: 1
                                });
                        }

                        // // console.log("that1 = " + JSON.stringify(this));

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
                confrimYHModelPage: function(e) {
                        // reset property showPage
                        // // console.log("e  = " + JSON.stringify(e));

                        var item = e.target.dataset.item || false;
                        if (item) {
                                var isClickEnable = item.isClickEnable == "1";

                                if (!isClickEnable) {
                                        return;
                                }

                                var src = item.clickUrl;
                                // console.log("src = " + src);
                        }

                        this.properties.toShowPage = false;
                        // call func
                        if (!this.properties.confrimFunc) {
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
                },
                mainInfoViewTouchMove: function(e) {
                        // console.log("mainInfoViewTouchMove = " + JSON.stringify(e.touches));
                        this.setData({
                                touchMove: true
                        });
                },
                mainInfoViewTouchStart: function(e) {
                        // console.log("mainInfoViewTouchStart = " + JSON.stringify(e));
                        this.setData({
                                touchStartPoint: e.changedTouches[0],
                                touchMove: false
                        });
                },
                mainInfoViewTouchEnd: function(e) {
                        var that = this;
                        var YHModelViewTypeFlag = that.data.YHModelViewTypeFlag;
                        if (YHModelViewTypeFlag == "IMAGE") {
                                var mainInfoViewContainerLeftFlag = that.data.mainInfoViewContainerLeftFlag;
                                var imageNum = that.data.YHModelViewInfoData.responseList.length;
                                var scrollWdith = that.data.mainInfoViewWidth;
                                var animation = that.animation;
                                // console.log("mainInfoViewTouchEnd = " + JSON.stringify(e));
                                var touchMove = that.data.touchMove;
                                let scrollXDistance = false;
                                if (touchMove) {
                                        var touchStartPoint = that.data.touchStartPoint;
                                        var touchEndPoint = e.changedTouches[0];
                                        scrollXDistance = touchStartPoint.clientX - touchEndPoint.clientX;
                                }
                                var scrollLeft = false;
                                if (scrollXDistance) {
                                        scrollLeft = scrollXDistance >= 0;


                                        if (scrollLeft) {
                                                if (mainInfoViewContainerLeftFlag - 1 == -imageNum) {
                                                        return;
                                                }


                                                mainInfoViewContainerLeftFlag = mainInfoViewContainerLeftFlag - 1;
                                                var mainInfoViewContainerLeft = scrollWdith * (mainInfoViewContainerLeftFlag);

                                                animation.translateX(mainInfoViewContainerLeft).step();
                                                that.setData({
                                                        mainInfoViewContainerAnimation: animation.export(),
                                                        mainInfoViewContainerLeftFlag: mainInfoViewContainerLeftFlag
                                                });
                                        } else {
                                                if (mainInfoViewContainerLeftFlag  == 0) {
                                                        return;
                                                }
                                                mainInfoViewContainerLeftFlag = mainInfoViewContainerLeftFlag + 1;
                                                var mainInfoViewContainerLeft = scrollWdith * (mainInfoViewContainerLeftFlag);

                                                animation.translateX(mainInfoViewContainerLeft).step();

                                                that.setData({
                                                        mainInfoViewContainerAnimation: animation.export(),
                                                        mainInfoViewContainerLeftFlag: mainInfoViewContainerLeftFlag
                                                });
                                        }

                                }
                        }


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
                }
        }


})