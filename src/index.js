/**
 * Copyright (C) 2015 yanni4night.com
 * index.js
 *
 * changelog
 * 2015-12-17[17:02:05]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

(function (win) {

    const semantic = {
        'iphone6+': [818, 69],
        'iphone6': [750, 75],
        'iphone5': [640, 64],
        'iphone4': [640, 64]
    };

    const viewport = win.viewport = function (baseDeviceWidth, baseRem) {

        var tid;
        var $meta;
        var $style;
        const dpr = window.devicePixelRatio;
        const scale = 1 / dpr;
        const docEle = document.documentElement;

        const calculateRem = () => {
            const rem = baseRem * (docEle.clientWidth / baseDeviceWidth);
            $style.innerHTML = 'html{font-size:' + rem + 'px!important;}';
            docEle.style.fontSize = rem + 'px';
        };

        const calculateRemDelay = () => {
            clearTimeout(tid);
            tid = setTimeout(calculateRem, 300);
        };

        if (1 === arguments.length) {
            let pair = semantic[String(arguments[0]).toLowerCase()];
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

        // set initial value to get the real clientWidth
        $meta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale +
                ', minimum-scale=' + scale + ', user-scalable=no');

        $style = document.createElement('style');
        $style.type = 'text/css';
        document.head.appendChild($style);

        calculateRem();

        win.addEventListener('resize', calculateRemDelay, false);

        win.addEventListener('pageshow', (e) => {
            if (e.persisted) {
                calculateRemDelay();
            }
        }, false);

        if ('complete' === document.readyState) {
            document.body.style.fontSize = 12 * dpr + 'px';
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.style.fontSize = 12 * dpr + 'px';
            }, false);
        }

        viewport.px2rem = (px) => {
            return px / baseRem;
        };
    };
})(window);