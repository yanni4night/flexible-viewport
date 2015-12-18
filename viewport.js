'use strict';

(function (win) {

    var semantic = {
        'iphone6+': [818, 69],
        'iphone6': [750, 75],
        'iphone5': [640, 64],
        'iphone4': [640, 64]
    };

    var viewport = win.viewport = function (baseDeviceWidth, baseRem) {

        var tid;
        var $meta;
        var $style;
        var dpr = window.devicePixelRatio;
        var scale = 1 / dpr;
        var docEle = document.documentElement;

        var calculateRem = function calculateRem() {

            var rem = baseRem * (docEle.clientWidth / baseDeviceWidth);
            $style.innerHTML = 'html{font-size:' + rem + 'px!important;}';
            docEle.style.fontSize = rem + 'px';
        };

        var calculateRemDelay = function calculateRemDelay() {
            clearTimeout(tid);
            tid = setTimeout(calculateRem, 300);
        };

        if (1 === arguments.length) {
            var pair = semantic[String(arguments[0]).toLowerCase()];
            if (!pair) {
                throw new Error('Unrecognized "' + arguments[0] + '"');
            }
            baseDeviceWidth = pair[0];
            baseRem = pair[1];
        }

        docEle.setAttribute('data-dpr', dpr);

        $meta = document.querySelector('head meta[name="viewport"]');

        if (!$meta) {
            $meta = document.createElement('meta');
            $meta.setAttribute('name', 'viewport');
            document.head.appendChild($meta);
        }

        $meta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

        $style = document.createElement('style');
        $style.type = 'text/css';
        document.head.appendChild($style);

        calculateRem();

        win.addEventListener('resize', calculateRemDelay, false);

        win.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                calculateRemDelay();
            }
        }, false);

        if ('complete' === document.readyState) {
            document.body.style.fontSize = 12 * dpr + 'px';
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                document.body.style.fontSize = 12 * dpr + 'px';
            }, false);
        }

        viewport.px2rem = function (px) {
            return px / baseRem;
        };
    };
})(window);
