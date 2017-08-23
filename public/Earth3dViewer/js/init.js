/*global define*/
define([
    'Cesium/Cesium',
    'Cesium/Core/Cartesian3',
    'Cesium/Core/defined',
    'Cesium/Core/formatError',
    'Cesium/Core/Math',
    'Cesium/Core/objectToQuery',
    'Cesium/Core/queryToObject',
    'Cesium/DataSources/CzmlDataSource',
    'Cesium/DataSources/GeoJsonDataSource',
    'Cesium/DataSources/KmlDataSource',
    'Cesium/Scene/createTileMapServiceImageryProvider',
    'Cesium/Widgets/Viewer/Viewer',
    'Cesium/Widgets/Viewer/viewerCesiumInspectorMixin',
    'Cesium/Widgets/Viewer/viewerDragDropMixin',
    'domReady!'
], function(
    Cesium,
    Cartesian3,
    defined,
    formatError,
    CesiumMath,
    objectToQuery,
    queryToObject,
    CzmlDataSource,
    GeoJsonDataSource,
    KmlDataSource,
    createTileMapServiceImageryProvider,
    Viewer,
    viewerCesiumInspectorMixin,
    viewerDragDropMixin) {
'use strict';

    var test=function(Viewer)
    {
        createModel(Viewer,'http://www.faruxue1688.com/test/earth3d/Apps/earth3dviewer/model/house/house.gltf', 0.0);
    };


    var test2=function(Viewer,chsname,lon,lat)
    {
        if(Viewer!=null)
        {
            var citizensBankPark = Viewer.entities.add( {  
                name : chsname,  
                position : Cesium.Cartesian3.fromDegrees(lon, lat),  
                point : { //点  
                    pixelSize : 5,  
                    color : Cesium.Color.RED,  
                    outlineColor : Cesium.Color.WHITE,  
                    outlineWidth : 2  
                } , 
                label : { //文字标签  
                    text : chsname,  
                    font : '14pt monospace',  
                    style : Cesium.LabelStyle.FILL_AND_OUTLINE,  
                    outlineWidth : 2,  
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
                    pixelOffset : new Cesium.Cartesian2( 0, -9 )   //偏移量  
                }  , 
                billboard : { //图标  
                    image : 'http://localhost:81/images/2015/02-02/Philadelphia_Phillies.png',  
                    width : 64,  
                    height : 64  
                },  
            } );  
            Viewer.trackedEntity = citizensBankPark;
            Viewer.zoomTo(citizensBankPark);
        } 
    };

    function createModel( Viewer,url, height) {
        Viewer.entities.removeAll();

        var position = Cesium.Cartesian3.fromDegrees(114.10,30.10, height);
        var heading = Cesium.Math.toRadians(135);
        var pitch = 0;
        var roll = 0;
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

        var wyoming = Viewer.entities.add({  //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象  
        name : 'Wyoming',  
        polygon : {  
            hierarchy : Cesium.Cartesian3.fromDegreesArray([//一组地理坐标  
                                    -109.080842,45.002073,  
                                    -105.91517,45.002073,  
                                    -104.058488,44.996596,  
                                    -104.053011,43.002989,  
                                    -104.053011,41.003906,  
                                    -105.728954,40.998429,  
                                    -107.919731,41.003906,  
                                    -109.04798,40.998429,  
                                    -111.047063,40.998429,  
                                    -111.047063,42.000709,  
                                    -111.047063,44.476286,  
                                    -111.05254,45.002073]),  
            material : Cesium.Color.RED.withAlpha(0.5), //材质  
            outline : true, //是否显示轮廓  
            outlineColor : Cesium.Color.BLACK //轮廓的颜色  
        }  
        });  

        var blueBox = Viewer.entities.add({//蓝色盒子
        name : 'Blue box',
        position: Cesium.Cartesian3.fromDegrees(114.0, 30.0, 0.0),//三维笛卡尔点（x，y，z）
        box : {
            dimensions : new Cesium.Cartesian3(4000.0, 3000.0, 5000.0),//dimensions 尺寸
            material : Cesium.Color.BLUE//材质蓝色
                }
        });

        var entity = Viewer.entities.add({
            name : url,
            position : position,
            orientation : orientation,
            model : {
                uri : url,
                minimumPixelSize : 128,
                maximumScale : 20000
            }
        });
        Viewer.trackedEntity = entity;
        Viewer.zoomTo(entity);

        var canvas = Viewer.canvas;
        var pick= new Cesium.Cartesian2(window.innerWidth,window.innerHeight);

        var handler = new Cesium.ScreenSpaceEventHandler(canvas);
        handler.setInputAction(function(click){
            var pnt=click.position;
            var clickX=click.position.x;
            var clickY=click.position.y;
            var pick1= Viewer.scene.globe.pick(Viewer.camera.getPickRay(pnt), Viewer.scene);
            var geoPt1= Viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
            var lon=geoPt1.longitude / Math.PI * 180;
            var lat=geoPt1.latitude / Math.PI * 180;
            alert("平面坐标 x:"+pick1.x+"y:"+pick1.y+"\n地理坐标 lon:"+lon+"lat:"+lat);
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);

        Viewer.camera.flyTo({  destination : Cesium.Cartesian3.fromDegrees(114.10, 30.10, 10000.0)  
        });  
    };

    function fun()
    {
        return obja;
    }

    return{
        test:test,
        test2:test2
    };
});
