function startEffect4() {
    window.interval[3] = setInterval(runEffect4, window.SPEED_EFFECT);
}

function runEffect4() {
    var gridItem = [];
    $('.grid-selector > .grid-item').each(function () {
        var $selector = $(this);
        var value = $selector.attr('data-item');
        if (typeof value !== 'undefined'
            && !$selector.hasClass('0overlaps')) {
            gridItem.push(value);
        }
    });

    if (gridItem.length === 0) {
        if (typeof window.grid !== 'undefined') {
            window.grid();
        }
        return;
    }

    var limit = window.MAXIMUM_GRID_EFFECT;
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

                var RANDOM_ANGLE_EFFECT = Math.ceil(Math.random() * 2);
                if (typeof window.STOP_EFFECT !== 'undefined' && window.STOP_EFFECT === true) {
                    RANDOM_ANGLE_EFFECT = -1;
                }

                switch (RANDOM_ANGLE_EFFECT) {
                    case -1:
                        // SKIP
                        break;
                    default:
                    case 1:
                        $selector.addClass('magictime flipOutX');
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
                                        .removeClass('magictime flipOutX')
                                        .addClass('magictime flipInX');

                                    $selector.remove();
                                }
                            });
                        }, 2000);
                        break;
                    case 2:
                        $selector.addClass('magictime flipOutY');
                        var getScreen = $selector.data('screen');
                        var getTop = $selector.attr('data-real-top');
                        var getLeft = $selector.attr('data-real-left');
                        window.preload.push({
                            screen: getScreen,
                            top: getTop,
                            left: getLeft
                        });

                        setTimeout(function () {
                            $selector.remove();
                            loadByEffectM(1, 'magictime flipInY', -1);
                        }, 2000);
                        break;
                }
            }
        });
    }
}

function endEffect4() {
    if (typeof window.interval !== 'undefined' && typeof window.interval[3] !== 'undefined') {
        clearInterval(window.interval[3]);
    }
}
