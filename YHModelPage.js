// libs/ModelPage/YHModelPage.js

const config = require("../config.js");

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
                touchMove: {},
                touchStartPoint: {},
                mainInfoViewWidth: "",
                mainInfoViewHeight: "",
                mainInfoViewContainerWidth: "",
                mainInfoViewContainerHeight: "",
                mainInfoViewContainerLeftFlag: 0,
                scrollDistance: 0,
                scrollXDistance: 0,
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
                                                                var items = newVal.responseList;

                                                                items.forEach(function(item, index) {
                                                                        if (index) {
                                                                                item.show = false;
                                                                        } else {
                                                                                item.show = true;
                                                                        }
                                                                })
                                                        };
                                                        break;
                                                case ("CONTENT"):
                                                        {

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
                },
                imageClickFunc:{
                        type: Function,
                        value: function () { }
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
                        // scale 1.8 iphone6 height/width
                        var wH = wW * 1.5;
                        var YHModelViewTypeFlag = that.data.YHModelViewTypeFlag;
                        if (YHModelViewTypeFlag == "VIEW") {
                                that.setData({
                                        mainInfoViewWidth: wW,
                                        mainInfoViewHeight: wH,
                                        mainHeight: "100%",
                                        YHOpacity: 1,
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
                                        YHOpacity: 1,
                                });
                        }

                        // // console.log("that1 = " + JSON.stringify(this));

                },
                closeYHModelPage: function() {
                        // reset property showPage
                        // console.log("closeYHModelPage");
                        this.properties.toShowPage = false;
                        this.setData({
                                mainHeight: "0px",
                                YHOpacity: 0
                        });
                        this.properties.closeFunc();
                },
                loadImageError: function(res) {
                        const logger = wx.getLogManager();
                        const logStr = JSON.stringify(res);
                        logger.warn('NET ERROR :  ' + {
                                res: logStr
                        });

                },
                confrimYHModelPage: function(e) {
                        // reset property showPage
                        // console.log("e  = " + JSON.stringify(e));

                        var item = e.target.dataset.item || false,src ;
                        if (item) {
                                var isClickEnable = item.isClickEnable == "1";

                                if (!isClickEnable) {
                                        return;
                                }

                                src = item.clickUrl;
                        }

                        if (!this.properties.confrimFunc) {
                                console.error("MODEL PAGE COMPNENT HAS NO FUNC - confrimYHModelPage -");
                                return;
                        }
                        this.properties.confrimFunc(src);
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
                        var that = this;
                        var touchMove = that.data.touchMove;
                        touchMove.moveOnOff = true;
                        this.setData({
                                touchMove: touchMove
                        });
                        var YHModelViewTypeFlag = that.data.YHModelViewTypeFlag;
                        if (YHModelViewTypeFlag == "IMAGE") {
                                var mainInfoViewContainerLeftFlag = that.data.mainInfoViewContainerLeftFlag;
                                var YHModelViewInfoData = that.data.YHModelViewInfoData;
                                var responseList = YHModelViewInfoData.responseList;
                                var imageNum = responseList.length;

                                var scrollWdith = that.data.mainInfoViewWidth;
                                var animation = that.animation;
                                // console.log("mainInfoViewTouchEnd = " + JSON.stringify(e));
                                let scrollXDistance = false;
                                if (touchMove.moveOnOff && touchMove.firstCall) {
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
                                                if (mainInfoViewContainerLeftFlag == 0) {
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
                                        responseList.forEach(function(item, index) {
                                                if (index == Math.abs(mainInfoViewContainerLeftFlag)) {
                                                        responseList[index].show = true;
                                                } else {
                                                        responseList[index].show = false;
                                                }
                                        });
                                        touchMove.firstCall = false;
                                        that.setData({
                                                YHModelViewInfoData: YHModelViewInfoData,
                                                touchMove: touchMove
                                        });
                                }
                        }

                },
                mainInfoViewTouchStart: function(e) {
                        // console.log("mainInfoViewTouchStart = " + JSON.stringify(e));
                        if (e && e.changedTouches && e.changedTouches.length > 0) {
                                this.setData({
                                        touchStartPoint: e.changedTouches[0],
                                        touchMove: {
                                                moveOnOff: false,
                                                firstCall: true
                                        }
                                });
                        }


                },
                mainInfoViewTouchEnd: function(e) {
                        // var that = this;
                        // var touchStartPoint = that.data.touchStartPoint;
                        // var touchEndPoint = e.changedTouches[0];
                        // let scrollDistance = that.data.scrollDistance;
                        // let scrollXDistance = touchStartPoint.clientX - touchEndPoint.clientX + scrollDistance;
                        // that.setData({
                        //         scrollDistance: scrollXDistance
                        // });



                        // var that = this;
                        // var YHModelViewTypeFlag = that.data.YHModelViewTypeFlag;
                        // if (YHModelViewTypeFlag == "IMAGE") {
                        //         var mainInfoViewContainerLeftFlag = that.data.mainInfoViewContainerLeftFlag;
                        //         var YHModelViewInfoData = that.data.YHModelViewInfoData;
                        //         var responseList = YHModelViewInfoData.responseList;
                        //         var imageNum = responseList.length;

                        //         var scrollWdith = that.data.mainInfoViewWidth;
                        //         var animation = that.animation;
                        //         // console.log("mainInfoViewTouchEnd = " + JSON.stringify(e));
                        //         var touchMove = that.data.touchMove;
                        //         let scrollXDistance = false;
                        //         if (touchMove) {
                        //                 var touchStartPoint = that.data.touchStartPoint;
                        //                 var touchEndPoint = e.changedTouches[0];
                        //                 scrollXDistance = touchStartPoint.clientX - touchEndPoint.clientX;
                        //         }
                        //         var scrollLeft = false;
                        //         if (scrollXDistance) {
                        //                 scrollLeft = scrollXDistance >= 0;


                        //                 if (scrollLeft) {
                        //                         if (mainInfoViewContainerLeftFlag - 1 == -imageNum) {
                        //                                 return;
                        //                         }


                        //                         mainInfoViewContainerLeftFlag = mainInfoViewContainerLeftFlag - 1;
                        //                         var mainInfoViewContainerLeft = scrollWdith * (mainInfoViewContainerLeftFlag);

                        //                         animation.translateX(mainInfoViewContainerLeft).step();
                        //                         that.setData({
                        //                                 mainInfoViewContainerAnimation: animation.export(),
                        //                                 mainInfoViewContainerLeftFlag: mainInfoViewContainerLeftFlag
                        //                         });
                        //                 } else {
                        //                         if (mainInfoViewContainerLeftFlag  == 0) {
                        //                                 return;
                        //                         }
                        //                         mainInfoViewContainerLeftFlag = mainInfoViewContainerLeftFlag + 1;
                        //                         var mainInfoViewContainerLeft = scrollWdith * (mainInfoViewContainerLeftFlag);

                        //                         animation.translateX(mainInfoViewContainerLeft).step();

                        //                         that.setData({
                        //                                 mainInfoViewContainerAnimation: animation.export(),
                        //                                 mainInfoViewContainerLeftFlag: mainInfoViewContainerLeftFlag
                        //                         });
                        //                 }
                        //                 responseList.forEach(function(item,index){
                        //                         if (index == Math.abs(mainInfoViewContainerLeftFlag)){
                        //                                 responseList[index].show = true;   
                        //                         }else{
                        //                                 responseList[index].show = false; 
                        //                         }
                        //                 });
                        //                 that.setData({
                        //                         YHModelViewInfoData: YHModelViewInfoData
                        //                 });
                        //         }
                        // }


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
                saveImageToAlbum(e) {
                        // console.log(JSON.stringify(e));
                        const item = e.target.dataset.item,
                                that = this;
                        wx.getSetting({
                                success(res) {
                                        if (!res.authSetting['scope.writePhotosAlbum']) {

                                                wx.authorize({
                                                        scope: 'scope.writePhotosAlbum',
                                                        success() {
                                                                that.saveImageToAlbumAction(item);
                                                        },
                                                        fail(failRes) {


                                                                wx.showModal({
                                                                        title: '提示',
                                                                        content: '请手动设置保存相册权限',
                                                                        confirmColor: config.Config.confirmColor,
                                                                        showCancel: true,
                                                                        success(res) {
                                                                                if (res.confirm) {
                                                                                        wx.openSetting({
                                                                                                success(res) {

                                                                                                }
                                                                                        });
                                                                                }

                                                                        }
                                                                })
                                                                // let errMsg = failRes.errMsg;
                                                                // if ('authorize:fail auth deny' == errMsg){

                                                                // }
                                                                // console.log('!res. = ' + JSON.stringify(failRes));
                                                        }
                                                })
                                        } else {
                                                that.saveImageToAlbumAction(item);
                                        }
                                },
                                fail: function() {
                                        wx.showModal({
                                                title: '获取不到您的授权信息',
                                                content: '请检车配置，或者联系客服',
                                                confirmColor: config.Config.confirmColor,
                                                showCancel: false
                                        })
                                }
                        })



                },
                saveImageToAlbumAction(item) {
                        var tempPath;
                        wx.getImageInfo({
                                src: item.imgUrl,
                                success: function(res) {
                                        tempPath = res.path;
                                        // console.log(JSON.stringify(res));


                                        wx.saveImageToPhotosAlbum({
                                                filePath: tempPath,
                                                success: function(res) {
                                                        wx.showModal({
                                                                title: '保存成功',
                                                                content: '使用微信扫描相册内图片，即可分享。',
                                                                confirmColor: config.Config.confirmColor,
                                                                showCancel: false
                                                        })
                                                        //// console.log("saveImageToPhotosAlbum success = " + JSON.stringify(res));
                                                },
                                                fail: function(res) {
                                                        let errmsg = res.errMsg;
                                                        if ('saveImageToPhotosAlbum:fail cancel' == errmsg) {
                                                                wx.showToast({
                                                                        title: '操作已取消',
                                                                        mask: true,
                                                                        duration: 800
                                                                });
                                                        } else if ('authorize:fail auth deny' == errmsg) {
                                                                wx.showModal({
                                                                        title: '保存失败',
                                                                        content: '请检查设置是否有保存相册权限',
                                                                        confirmColor: config.Config.confirmColor,
                                                                        showCancel: true,
                                                                        success(res) {
                                                                                if (res.confirm) {
                                                                                        wx.openSetting({
                                                                                                success(res) {

                                                                                                }
                                                                                        });
                                                                                }

                                                                        }
                                                                })
                                                        }

                                                        console.log("saveImageToPhotosAlbum fail = " + JSON.stringify(res));
                                                },
                                                complete: function(res) {
                                                        //// console.log("saveImageToPhotosAlbum complete = " + JSON.stringify(res));
                                                }
                                        });
                                },
                                fail: function(res) {
                                        wx.showModal({
                                                title: '保存失败',
                                                content: '请检查设置是否有保存相册权限',
                                                confirmColor: config.Config.confirmColor,
                                                showCancel: true,
                                                success(res) {
                                                        if (res.confirm) {
                                                                wx.openSetting({
                                                                        success(res) {

                                                                        }
                                                                });
                                                        }
                                                }
                                        })
                                },
                                complete: function(res) {

                                }
                        });
                }
        }

})