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

;
(function (win) {

    var semantic = {
        'iphone6+': [818, 69],
        'iphone6': [750, 75],
        'iphone5': [640, 64],
        'iphone4': [640, 64]
    };

    var viewport = win.viewport = function (baseDeviceWidth, baseRem) {

        if (1 === arguments.length) {
            var pair = semantic[String(arguments[0]).toLowerCase()];
            if (!pair) {
                throw new Error('Unrecognized "' + arguments[0] + '"');
            }
            baseDeviceWidth = pair[0];
            baseRem = pair[1];
        }

        var $meta = document.querySelector('head meta[name="viewport"]');

        if (!$meta) {
            $meta = document.createElement('meta');
            $meta.setAttribute('name', 'viewport');
            document.head.appendChild($meta);
        }
        
        // set initial value to get the real clientWidth
        $meta.setAttribute('content',
            'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');

        var dpr = window.devicePixelRatio;
        var docEle = document.documentElement;
        var rem = baseRem * (docEle.clientWidth * dpr / baseDeviceWidth);
        var scale = 1 / dpr;

        $meta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' +
            scale +
            ', user-scalable=no');

        var $style = document.createElement('style');
        $style.type = 'text/css';
        $style.innerHTML = 'html{font-size:' + rem + 'px!important;}';
        document.head.appendChild($style);

        viewport.px2rem = function (px) {
            return px / baseRem;
        };
    };
})(window);