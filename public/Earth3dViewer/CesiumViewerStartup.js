/*global require*/
require({
    baseUrl : '.',
    paths : {
        domReady : '../lib/Cesium/ThirdParty/requirejs-2.1.20/domReady',
        Cesium : '../lib/Cesium/Source'
    }
}, [
        'CesiumViewer'
    ], function() {
  
});
