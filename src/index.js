/**
 * Copyright (C) 2015 yanni4night.com
 * s.js
 *
 * changelog
 * 2015-12-17[17:02:05]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

(function () {
    var baseRem = 50;
    var baseDeviceWidth = 750;
    /* less
    .px2rem(@name, @px) {
        @{name}: @px / 50 * 1rem;
    }
     */

    var meta = document.querySelector('meta[name="viewport"]');
    
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        document.head.insertBefore(meta, document.head.childNodes[0]);
    }
    // set initial value to get the real clientWidth
    meta.setAttribute('content', 'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
    
    var dpr = window.devicePixelRatio;
    var docEle = document.documentElement;
    var rem = baseRem * (docEle.clientWidth * dpr / baseDeviceWidth);
    var scale = 1 / dpr;

    meta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale +
        ', user-scalable=no');
    document.write('<style>html{font-size:' + rem + 'px!important;}</style>');
})();