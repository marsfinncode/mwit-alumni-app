function startEffect1() {
    window.interval[0] = setInterval(runEffect1, window.SPEED_EFFECT);
}

function runEffect1() {
    var gridItem = [];
    $('.grid-selector > .grid-item').each(function () {
        var $selector = $(this);
        var value = $selector.attr('data-item');
        if (typeof value !== 'undefined'
            && !$selector.hasClass('overlaps')
        ) {
            gridItem.push(value);
        }
    });

    var limit = window.MAXIMUM_GRID_EFFECT;
    if (gridItem.length < limit) {
        if (typeof window.grid !== 'undefined') {
            window.grid();
        }
        return;
    }

    var shuffle = _.shuffle(gridItem, limit);
    if (typeof shuffle !== 'undefined') {
        shuffle = shuffle.splice(0, limit);
        $('.grid-selector > .grid-item').each(function () {
            var $selector = $(this);
            var unique = $selector.attr('data-item');
            if ($.inArray(unique, shuffle) !== -1) {
                $selector.removeClass('magictime')
                    .removeClass('swashIn')
                    .removeClass('tinUpOut')
                    .removeClass('tinRightOut')
                    .removeClass('tinDownOut')
                    .removeClass('tinLeftOut')
                    .removeClass('tinUpIn')
                    .removeClass('tinRightIn')
                    .removeClass('tinDownIn')
                    .removeClass('tinLeftIn')
                    .removeClass('spaceOutUp')
                    .removeClass('spaceOutRight')
                    .removeClass('spaceOutDown')
                    .removeClass('spaceOutLeft')
                    .removeClass('spaceInUp')
                    .removeClass('spaceInRight')
                    .removeClass('spaceInDown')
                    .removeClass('spaceInLeft')
                    .removeClass('vanishIn')
                    .removeClass('vanishOut')
                    .removeClass('animated')
                    .removeClass('flipOutY')
                    .removeClass('flipInY')
                ;

                var RANDOM_ANGLE_EFFECT = Math.ceil(Math.random() * 4);
                if (typeof window.STOP_EFFECT !== 'undefined' && window.STOP_EFFECT === true) {
                    RANDOM_ANGLE_EFFECT = -1;
                }

                switch (RANDOM_ANGLE_EFFECT) {
                    case -1:
                        // SKIP
                        break;
                    default:
                    case 1:
                        $selector.addClass('magictime tinUpOut');
                        var getScreen = $selector.data('screen');
                        var getTop = $selector.attr('data-real-top');
                        var getLeft = $selector.attr('data-real-left');
                        window.preload.push({
                            screen: getScreen,
                            top: getTop,
                            left: getLeft
                        });

                        setTimeout(function () {
                            loadByEffectM(1, 'hidden', -1, function () {
                                var $el = $('[data-pos-class="pos' + getLeft + 'Y' + getTop + '"]');
                                if (typeof $el.val() !== 'undefined') {
                                    $el.removeClass('hidden')
                                        .removeClass('magictime tinUpOut')
                                        .addClass('magictime tinUpIn');

                                    $selector.remove();
                                }
                            });
                        }, 2000);
                        break;
                    case 2:
                        $selector.addClass('magictime tinRightOut');
                        var getScreen = $selector.data('screen');
                        var getTop = $selector.attr('data-real-top');
                        var getLeft = $selector.attr('data-real-left');
                        window.preload.push({
                            screen: getScreen,
                            top: getTop,
                            left: getLeft
                        });

                        setTimeout(function () {
                            loadByEffectM(1, 'hidden', -1, function () {
                                var $el = $('[data-pos-class="pos' + getLeft + 'Y' + getTop + '"]');
                                if (typeof $el.val() !== 'undefined') {
                                    $el.removeClass('hidden')
                                        .removeClass('magictime tinRightOut')
                                        .addClass('magictime tinRightIn');

                                    $selector.remove();
                                }
                            });
                        }, 2000);
                        break;
                    case 3:
                        $selector.addClass('magictime tinDownOut');
                        var getScreen = $selector.data('screen');
                        var getTop = $selector.attr('data-real-top');
                        var getLeft = $selector.attr('data-real-left');
                        window.preload.push({
                            screen: getScreen,
                            top: getTop,
                            left: getLeft
                        });

                        setTimeout(function () {
                            loadByEffectM(1, 'hidden', -1, function () {
                                var $el = $('[data-pos-class="pos' + getLeft + 'Y' + getTop + '"]');
                                if (typeof $el.val() !== 'undefined') {
                                    $el.removeClass('hidden')
                                        .removeClass('magictime tinDownOut')
                                        .addClass('magictime tinDownIn');

                                    $selector.remove();
                                }
                            });
                        }, 2000);
                        break;
                    case 4:
                        $selector.addClass('magictime tinLeftOut');
                        var getScreen = $selector.data('screen');
                        var getTop = $selector.attr('data-real-top');
                        var getLeft = $selector.attr('data-real-left');
                        window.preload.push({
                            screen: getScreen,
                            top: getTop,
                            left: getLeft
                        });

                        setTimeout(function () {
                            loadByEffectM(1, 'hidden', -1, function () {
                                var $el = $('[data-pos-class="pos' + getLeft + 'Y' + getTop + '"]');
                                if (typeof $el.val() !== 'undefined') {
                                    $el.removeClass('hidden')
                                        .removeClass('magictime tinLeftOut')
                                        .addClass('magictime tinLeftIn');

                                    $selector.remove();
                                }
                            });
                        }, 2000);
                        break;
                }
            }
        });
    }
}

function endEffect1() {
    if (typeof window.interval !== 'undefined' && typeof window.interval[0] !== 'undefined') {
        clearInterval(window.interval[0]);
    }
}
