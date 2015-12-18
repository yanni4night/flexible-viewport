/**
 * Copyright (C) 2015 tieba.baidu.com
 * test.js
 *
 * changelog
 * 2015-12-18[11:59:37]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

var W = document.documentElement.clientWidth;

function $$(ele, style) {
    return window.getComputedStyle(ele, null)[style];
}

describe('viewport', function () {
    describe('#("iphone6")', function () {
        it('should show a red div whose width/height is half of device\'s width', function () {
            var $logo = document.querySelector('.logo');
            expect(parseInt($$($logo, 'width')) * 2).to.be(W);
            expect(parseInt($$($logo, 'height')) * 2).to.be(W);
        });
    });
});