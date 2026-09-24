var windowWidth;
var windowHeight;
var showcaseWidth;
var showcaseHeight;
var imageInc = 1;
var minDistEditor = 250;

var searchBoxLeftOffset = 230;
var searchBoxTopOffset = 905;
if (window.innerHeight < 1180) {
    searchBoxLeftOffset = 200;
    searchBoxTopOffset = 345;
}
if (window.innerHeight <= 1020) {
    searchBoxLeftOffset = 300;
    searchBoxTopOffset = 678;
}


var showcaseScreens = 1;


var height;
var full = false;
var row = 0;
var imgY = 5;
var imgX = 0;
var padding = 5;
var zindex = 1;
var minDistActives = 200;
var animateTimer;
var debug = false;
var paused = 0;

var roundX = 243;
var roundY = 310 - 10;

var debug = false;

//var API_ENDPOINT = 'http://10.40.30.41/admin/public/api/halloffame';
// var API_ENDPOINT = 'http://127.0.0.1/PICO/public/api/halloffame';
// var API_ENDPOINT = 'http://10.0.0.13/PICO/public/api/halloffame';
//var API_ENDPOINT = 'http://pico.awcode.info/admin-production/public/api/halloffame';
var API_ENDPOINT = 'http://hallofhistory.mwit.ac.th/admin/public/api/halloffame';
//if(window.location.hostname == 'localhost' || window.location.hostname =='10.0.0.10'){API_ENDPOINT = 'http://10.0.0.10/Pico/admin/public/api/halloffame';   /*API_ENDPOINT = 'http://10.0.0.13/PICO/public/api/halloffame';*/}

$(document).ready(function () {
    $.fn.extend({
        animatedCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
            });
        },
        animatedSecondCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animatedSecond ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animatedSecond ' + animationName);
            });
        },
        animatedHalfSecondCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animatedHalfSecond ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animatedHalfSecond ' + animationName);
            });
        },
        magicCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('magictime ' + animationName).one(animationEnd, function () {
                $(this).removeClass('magictime ' + animationName);
            });
        },
        magicSecondCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('magictimeSecond ' + animationName).one(animationEnd, function () {
                $(this).removeClass('magictimeSecond ' + animationName);
            });
        },
        getPath: function () {
            var path, node = this;
            while (node.length) {
                var realNode = node[0], name = realNode.localName;
                if (!name) break;
                name = name.toLowerCase();

                var parent = node.parent();

                var sameTagSiblings = parent.children(name);
                if (sameTagSiblings.length > 1) {
                    allSiblings = parent.children();
                    var index = allSiblings.index(realNode) + 1;
                    if (index > 1) {
                        name += ':nth-child(' + index + ')';
                    }
                }

                path = name + (path ? '>' + path : '');
                node = parent;
            }

            return path;
        },
        keyboardClose: function (runningCallback) {
            var $selector = $(this);
            var getTop = $selector.css('top') || $selector.attr('data-top');
            var getLeft = $selector.css('left') || $selector.attr('data-left');
            $selector.attr('data-top', getTop);
            $selector.attr('data-left', getLeft);
            // $selector.addClass('hidden');
            $selector.fadeOut('fast', runningCallback);
        },
        keyboardOpen: function (runningCallback) {
            var $selector = $(this);
            var setTop = $selector.attr('data-top') || $selector.css('top');
            var setLeft = $selector.attr('data-left') || $selector.css('left');
            $selector.css('top', setTop);
            $selector.css('left', setLeft);
            // $selector.removeClass('hidden');
            $selector.fadeIn('fast', runningCallback);
        }
    });

    // $.getJSON(API_ENDPOINT, {}, function (data, textStatus, jqXHR) {
    //     if (typeof data !== 'undefined' && typeof data.result !== 'undefined' && data.result === 'ok') {
    //         if (typeof data.background_image !== 'undefined') {
    //             $(document.body).css('background-image', "url('" + data.background_image + "') no-repeat");
    //         }
    //     }
    // });

    if (typeof window.preload === 'undefined') {
        window.preload = [];
    }

    if (typeof window.interval === 'undefined') {
        window.interval = [];
    }

    if (typeof window.grid === 'undefined') {
        window.grid = function () {
            var item = 0;
            $('.grid-selector > .imagebox').each(function () {
                item++;
                var $selector = $(this);
                $selector.attr('data-item', item);
                if (!$selector.hasClass('grid-item')) {
                    $selector.addClass('grid-item')
                }
            });

            if (typeof window.GRID_ITEM_CALLBACK === 'undefined') {
                window.GRID_ITEM_CALLBACK = {};
            }

            if (typeof window.IS_DOWN_UP === 'undefined') {
                window.IS_DOWN_UP = {};
            }
        }
    }

    if (typeof window.parameter === 'undefined') {
        window.parameter = {};
    }

    if (typeof window.LAST_SEARCH_QUERIES === 'undefined') {
        window.LAST_SEARCH_QUERIES = [];
    }

    if (typeof window.CACHE === 'undefined') {
        window.CACHE = {};
    }

    if (typeof window.maximumIntroductionRandomEffect === 'undefined') {
        window.maximumIntroductionRandomEffect = [];
    }

    if (typeof window.EFFECT === 'undefined') {
        window.EFFECT = 0;
    }

    if (typeof window.MAXIMUM_EFFECT === 'undefined') {
        window.MAXIMUM_EFFECT = 4;
    }

    if (typeof window.MAXIMUM_GRID_EFFECT === 'undefined') {
        window.MAXIMUM_GRID_EFFECT = 1;
    }

    if (typeof window.STOP_EFFECT === 'undefined') {
        window.STOP_EFFECT = false;
    }

    if (typeof window.SPEED_EFFECT === 'undefined') {
        window.SPEED_EFFECT = 1000 * 10;
    }

    if (typeof window.USER_LAST_ACTIVE === 'undefined') {
        window.USER_LAST_ACTIVE = new Date().getTime();
        window.USER_LAST_ACTIVE_INTERVAL = setInterval(function () {
            if ((new Date().getTime() - window.USER_LAST_ACTIVE) > (1000 * 60)) {
                window.STOP_EFFECT = false;
            }
        }, 1000 * 1);
    }

    if (typeof window.IDLE_TIMEOUT === 'undefined') {
        window.IDLE_TIMEOUT = 1000 * 3600;
    }

    if (typeof window.INTERNAL_SERVER_ERROR === 'undefined') {
        window.INTERNAL_SERVER_ERROR = false;
    }

    if (typeof window.DELAY_INFINITE_SCROLL_INTERVAL === 'undefined') {
        window.DELAY_INFINITE_SCROLL_INTERVAL = [];
    }

    $('body').on('click tap', function () {
        window.USER_LAST_ACTIVE = new Date().getTime();
        window.STOP_EFFECT = true;
    });

    height = 200;

    START_EFFECT();
    BUILD_SEARCH_WINDOWS();
    CYCLE_EFFECT();

    // GRID SELECTOR
    $(function () {
        if (typeof window.DELAY_GRID_INTERVAL === 'undefined') {
            window.DELAY_GRID_INTERVAL = [];
        }

        interact('.grid-selector > .imagebox')
            .on('down', function (ev) {
                var $selector = $(ev.currentTarget);
                window.IS_DOWN_UP[$selector.getPath()] = true;
                selectImage($selector, true);
            })
            .on('up', function (ev) {
                var $selector = $(ev.currentTarget);
                var toScreen = $selector.attr('data-screen');
                if (typeof window.DELAY_GRID_INTERVAL[toScreen] !== 'undefined') {
                    clearInterval(window.DELAY_GRID_INTERVAL[toScreen]);
                    window.DELAY_GRID_INTERVAL[toScreen] = setTimeout(function () {
                        var parameter = {};
                        if (typeof $selector.attr("data-group-student") !== 'undefined') {
                            var groupStudent = $selector.closest('.div[group-student]').attr('groupStudent');
                            parameter.limit = 1;
                            parameter.id = $selector.attr("data-id");
                            parameter.group = $selector.attr("data-group-student");
                            parameter.full = 1
                        } else {
                            parameter.limit = 1;
                            parameter.id = $selector.attr("data-id");
                            parameter.full = 1;
                        }

                        var primaryKey = $.param(parameter);
                        if (typeof window.parameter[primaryKey] !== 'undefined') {
                            selectImage($selector, false);
                        } else {
                            setTimeout(function () {
                                selectImage($selector, false);
                            }, 500);
                        }

                        if (typeof window.IS_DOWN_UP[$selector.getPath()] !== 'undefined') {
                            delete window.IS_DOWN_UP[$selector.getPath()];
                        }

                        window.clearInterval(window.DELAY_GRID_INTERVAL[toScreen]);
                    }, 500);
                } else {
                    window.DELAY_GRID_INTERVAL[toScreen] = setTimeout(function () {
                        var parameter = {};
                        if (typeof $selector.attr("data-group-student") !== 'undefined') {
                            var groupStudent = $selector.closest('.div[group-student]').attr('groupStudent');
                            parameter.limit = 1;
                            parameter.id = $selector.attr("data-id");
                            parameter.group = $selector.attr("data-group-student");
                            parameter.full = 1
                        } else {
                            parameter.limit = 1;
                            parameter.id = $selector.attr("data-id");
                            parameter.full = 1;
                        }

                        var primaryKey = $.param(parameter);
                        if (typeof window.parameter[primaryKey] !== 'undefined') {
                            selectImage($selector, false);
                        } else {
                            setTimeout(function () {
                                selectImage($selector, false);
                            }, 500);
                        }

                        if (typeof window.IS_DOWN_UP[$selector.getPath()] !== 'undefined') {
                            delete window.IS_DOWN_UP[$selector.getPath()];
                        }

                        window.clearInterval(window.DELAY_GRID_INTERVAL[toScreen]);
                    }, 100);
                }
            })
            .on('tap', function (ev) {
                var $selector = $(ev.currentTarget);
                if (window.IS_DOWN_UP[$selector.getPath()] === 'undefined' || window.IS_DOWN_UP[$selector.getPath()] === true) {
                    selectImage($selector, false);
                }
            })
        ;

        interact('.resbox > .imagebox')
            .on('down', function (ev) {
                var $selector = $(ev.currentTarget);
                selectImage($selector, true);
            })
            .on('tap', function (ev) {
                var $selector = $(ev.currentTarget);
                selectImage($selector, false);
            });
    });

    // GRID CLOSING
    $(function () {
        interact('.grid-closing')
            .on('down', function (ev) {
                var $selector = $(ev.currentTarget);
                closeSearch($selector);
            })
            .on('up', function (ev) {
                var $selector = $(ev.currentTarget);
                closeSearch($selector);
            })
            .on('tap', function (ev) {
                var $selector = $(ev.currentTarget);
                closeSearch($selector);
            });
    });

    // SEARCH TYPE DISPLAY
    $(function () {
        if (typeof window.DELAY_SEARCH_TYPE_INTERVAL === 'undefined') {
            window.DELAY_SEARCH_TYPE_INTERVAL = [];
        }

        interact('.search-type-display')
            .on('tap', function (ev) {
                var $selector = $(ev.currentTarget);
                var toScreen = $selector.attr('data-screen');
                if (typeof window.DELAY_SEARCH_TYPE_INTERVAL[toScreen] !== 'undefined') {
                    clearTimeout(window.DELAY_SEARCH_TYPE_INTERVAL[toScreen]);
                }
                window.DELAY_SEARCH_TYPE_INTERVAL[toScreen] = setTimeout(function () {
                    searchType(toScreen);
                    clearTimeout(window.DELAY_SEARCH_TYPE_INTERVAL[toScreen]);
                }, 100);
            });
    });

    // SEARCH TYPE
    $(function () {
        interact('.SEARCH_TYPE')
            .on('tap', function (ev) {
                var $selector = $(ev.currentTarget);
                if (typeof $selector.val() !== 'undefined') {
                    var toScreen = $selector.attr('data-screen');
                    var toLabel = $selector.attr('data-name');
                    var toUrl = $selector.attr('data-url');
                    selectType(toScreen, toLabel, toUrl);
                }
            });
    });

    // ARROW LEFT - RIGHT
    $(function () {
        interact('.arrow-left')
            .on('tap', function (ev) {
                var $selector = $(ev.currentTarget);
                var toScreen = $selector.attr('data-screen');
                if (typeof toScreen !== 'undefined') {
                    scrollLeftMove(toScreen);
                }
            });

        interact('.arrow-right')
            .on('tap', function (ev) {
                var $selector = $(ev.currentTarget);
                var toScreen = $selector.attr('data-screen');
                if (typeof toScreen !== 'undefined') {
                    scrollRightMove(toScreen);
                }
            });
    });
});

var effect = 0;
var effectCount = 4;

function CYCLE_EFFECT() {
    window.EFFECT += 1;
    if (window.EFFECT > window.MAXIMUM_EFFECT) {
        window.EFFECT = 1;
    }

    if (window.location.hash) {// Use hash values to test single effect
        window.EFFECT = window.location.hash.substr(1);
    }

    switch (window.EFFECT) {
        default:
        case 1:
            endEffect4();
            startEffect1();
            break;
        case 2:
            endEffect1();
            startEffect2();
            break;
        case 3:
            endEffect2();
            startEffect3();
            break;
        case 4:
            endEffect3();
            startEffect4();
            break;

    }

    window.CYCLE_EFFECT_TIMEOUT = setTimeout(CYCLE_EFFECT, 20000);
}

function loadMore(toMaxumum, toScreen) {
    loadByEffectM(toMaxumum, 'magictime vanishIn', toScreen);
}

function selectImage($el, IS_CACHED) {
    if (typeof $el !== 'undefined' && $el.hasClass('active') === false) {
        var screen = getScreen($el.offset().left);
        zindex += 1;
        var posX = $el.offset().left,
            posY = $el.offset().top;

        var point = {top: posY, left: posX, x: posX, y: posY};

        near = $el.nearest('.searchbox', {
            'sort': 'nearest'
        }).first();
        near = $("#searchbox" + screen);

        var parameter = {};
        if (typeof $el.attr("data-group-student") !== 'undefined') {
            var groupStudent = $el.closest('.div[group-student]').attr('groupStudent');
            parameter.limit = 1;
            parameter.id = $el.attr("data-id");
            parameter.group = $el.attr("data-group-student");
            parameter.full = 1
        } else {
            parameter.limit = 1;
            parameter.id = $el.attr("data-id");
            parameter.full = 1;
        }

        if (typeof $el.attr('query') !== 'undefined' && $el.attr('query').length > 0) {
            parameter.q = $el.attr('query');
        }

        if (near.length) {
            var primary = $.param(parameter);
            var runningCallback = function (data, textStatus, jqXHR) {
                if (typeof textStatus !== 'undefined' && typeof jqXHR !== 'undefined') {
                    window.parameter[primary] = JSON.stringify(data);
                    if (typeof IS_CACHED !== 'undefined' && IS_CACHED === true) {
                        return;
                    }
                }

                if (data.length) {
                    near.animatedHalfSecondCss('fadeIn');
                    near.addClass("active");

                    var grid = data.shift();
                    if (typeof grid !== 'undefined') {
                        near.find(".photo").html("<img src='" + grid.src + "'>");
                        near.find(".batchNumber").html(grid.object.batch_number);
                        near.find(".classroomNumber").html(grid.object.classroom_number);
                        near.find(".id").html(grid.object.student_id);
                        var name = grid.object.first_name;
                        if (typeof(grid.object.last_name) != undefined && grid.object.last_name != "") {
                            name = name + " " + grid.object.last_name;
                        }
                        if (typeof(grid.object.nickname) != undefined && grid.object.nickname != "") {
                            name = name + " (" + grid.object.nickname + ")";
                        }
                        near.find(".name").html(name);
                        near.find(".other").empty();
                        near.find(".other").scrollTop(0);
                        near.find(".other").attr('scrollTo', '0');
                        if (typeof grid.other !== 'undefined') {
                            if (typeof grid.other.event_information !== 'undefined') {
                                near.find(".other").append(grid.other.event_information);
                            }
                            if (typeof grid.other.education_information !== 'undefined') {
                                near.find(".other").append(grid.other.education_information);
                            }
                            if (typeof grid.other.work_information !== 'undefined') {
                                near.find(".other").append(grid.other.work_information);
                            }
                            if (typeof grid.other.portfolio_information !== 'undefined') {
                                near.find(".other").append(grid.other.portfolio_information);
                            }
                        }
                        near.find(".award").empty();
                        if (typeof grid.awards_information !== 'undefined') {
                            near.find(".award").html(grid.awards_information);
                        }

                        near.find('.ribbonrow').empty();
                        near.find('.badgerow').empty();
                        if (typeof grid.group !== 'undefined') {
                            var groupOfStudent = grid.group;

                            if (typeof groupOfStudent.id !== 'undefined') {
                                near.attr('data-group-student', groupOfStudent.id);
                            }

                            if (typeof groupOfStudent.ribbon !== 'undefined' && groupOfStudent.ribbon.length > 0) {
                                near.find('.ribbonrow')
                                    .html(
                                        $('<img>', {
                                            'class': 'ribbon',
                                            'src': groupOfStudent.ribbon
                                        })
                                    );
                            }

                            if (typeof groupOfStudent.badge !== 'undefined' && groupOfStudent.badge.length > 0) {
                                near.find('.badgerow')
                                    .html(
                                        $('<img>', {
                                            'class': 'badgebanner',
                                            'src': groupOfStudent.badge
                                        })
                                    );
                            }
                        }

                        otherScroll(screen);
                        detectOverlappingM(screen);
                    }
                }
            };

            if (typeof window.parameter[primary] !== 'undefined') {
                var parseJSON = JSON.parse(window.parameter[primary]);
                if (typeof parseJSON !== 'undefined') {
                    runningCallback(parseJSON);
                } else {
                    delete window.parameter[primary];
                }
            } else {
                $.ajax({
                    url: API_ENDPOINT + '/students',
                    data: parameter,
                    dataType: "json",
                    cache: false,
                    success: runningCallback
                });
            }
        }
    }
}

var studentCache = [];
var loadingCache = false;

function sleep(ms) {
    var unixtime_ms = new Date().getTime();
    while (new Date().getTime() < unixtime_ms + ms) {
    }
}

var gridPerScreen = 12;
var numToFillCache = (gridPerScreen * showcaseScreens) * 1.5;
var minCacheSize = 5;

debug = true;
function checkCacheSize() {
    if (loadingCache) return;
    if (studentCache.length <= minCacheSize) {
        loadCache();
        if (debug) {
            console.log("cache size" + studentCache.length);
        }
    }
}

if (typeof window.STUDENT_QUEUE === 'undefined') {
    window.STUDENT_QUEUE = [];
}

if (typeof window.STUDENT_CACHE === 'undefined') {
    window.STUDENT_CACHE = [];
}

function PREPARE_STUDENT_QUEUE() {
    if (typeof window.STUDENT_QUEUE !== 'undefined' && _.isArray(window.STUDENT_QUEUE)) {
        var value = window.STUDENT_QUEUE.shift();
        if (typeof value !== 'undefined') {
            var parameter = {};
            if (typeof value.group !== 'undefined') {
                parameter.limit = 1;
                parameter.id = value.id;
                parameter.group = value.group.id;
                parameter.full = 1
            } else {
                parameter.limit = 1;
                parameter.id = value.id;
                parameter.full = 1;
            }

            var primaryKey = $.param(parameter);
            if (typeof window.parameter[primaryKey] === 'undefined') {
                $.ajax({
                    url: API_ENDPOINT + '/students',
                    type: 'GET',
                    data: parameter,
                    beforeSend: function (xhr) {
                        //
                    }
                }).done(function (data, textStatus, jqXHR) {
                    if (typeof data !== 'undefined') {
                        window.USER_LAST_ACTIVE = new Date().getTime();
                        window.parameter[primaryKey] = JSON.stringify(data);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    if (typeof window.parameter[primaryKey] !== 'undefined') {
                        delete window.parameter[primaryKey];
                    }

                    window.STUDENT_QUEUE.push(value);
                }).always(function () {
                    if (window.STUDENT_QUEUE.length > 0) {
                        PREPARE_STUDENT_QUEUE();
                    }
                });
            }
        }
    }
}

function loadCache() {
    loadingCache = true;
    $.ajax({
        url: API_ENDPOINT + '/priority',
        type: 'GET',
        data: {
            limit: numToFillCache,
            order: 'rand'
        },
        async: typeof window.STUDENT_CACHE === 'undefined' ? true : false,
        beforeSend: function (xhr) {
            if (typeof window.STUDENT_CACHE !== 'undefined') {
                studentCache = _.clone(window.STUDENT_CACHE);
                studentCache = _.shuffle(studentCache);
                loadingCache = false;
            }
        }
    }).done(function (data, textStatus, jqXHR) {
        if (typeof data !== 'undefined' && _.isObject(data)) {
            $.extend(studentCache, data);
            loadingCache = false;

            if (typeof window.STUDENT_CACHE !== 'undefined') {
                window.STUDENT_CACHE = _.clone(studentCache);
            }

            if (typeof window.STUDENT_QUEUE !== 'undefined') {
                window.STUDENT_QUEUE = _.clone(studentCache);
                if (window.STUDENT_QUEUE.length > 0) {
                    PREPARE_STUDENT_QUEUE();
                }
            }
        } else {
            if (typeof window.STUDENT_CACHE !== 'undefined') {
                studentCache = _.clone(window.STUDENT_CACHE);
                studentCache = _.shuffle(studentCache);
                loadingCache = false;
            }

            if (typeof window.INTERNAL_SERVER_ERROR !== 'undefind' && window.INTERNAL_SERVER_ERROR === true) {
                if (typeof window.USER_LAST_ACTIVE === 'undefind') {
                    if ((new Date().getTime() - window.USER_LAST_ACTIVE) > window.IDLE_TIMEOUT) {
                        window.location.reload();
                    }
                }
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (typeof window.STUDENT_CACHE !== 'undefined') {
            studentCache = _.clone(window.STUDENT_CACHE);
            studentCache = _.shuffle(studentCache);
            loadingCache = false;
        }
    }).always(function () {
        //
    });
}

function distanceBetween(o1, o2) {
    var dx = o1.left - o2.left;
    var dy = o1.top - o2.top;
    var distance = Math.sqrt(dx * dx + dy * dy);

    return distance;
}

function furthestOffsetLeft(el, dir) {
    var high = "A";

    el.each(function () {
        var pos = $(this).offset();
        //console.log(pos.left);
        if (dir == "l") {
            if (high == "A" || pos.left < high) {
                high = pos.left;
            }
        } else if (dir == "r") {
            if (high == "A" || pos.left > high) {
                high = pos.left;
            }
        }
    });
    return high;
}

function relativeToAbsolute(els) {
    els.each(function (index, el) {
        var top = $(this).position().top;
        var left = $(this).position().left;
        $(this).attr("data-tmp-top", top).attr("data-tmp-left", left);
    });

    els.each(function (index, el) {
        var top = $(this).position().top;
        var left = $(this).position().left;
        $(this).css("top", $(this).attr("data-tmp-top") + "px").css("left", $(this).attr("data-tmp-left") + "px").css("position", "absolute");
    });

}

function getScreen(left) {
    //var allscreens = showcaseScreens+1; //With princess
    var allscreens = showcaseScreens;
    var winWidth = $(window).width();
    var screen = Math.floor(left / winWidth * allscreens);
    screen += 1; //asjust without princess
    return screen;
}

function innerPhotoContent(svgContainer, gridObject) {
    var divContainer = svgContainer.append('div');

    var thumbnailContainer = divContainer.append('div')
        .attr("id", "image-" + imageInc)
        .attr("class", "image byrand");

    var ratio = gridObject.w / gridObject.h;
    var width = Math.floor(ratio * height);

    thumbnailContainer.append("img")
        .attr('src', gridObject.src)
        .attr('width', width).attr('height', height)
        .attr('style', 'width: 187px; height: 248px;');

    imageInc += 1;
    thumbnailContainer.attr('width', 187).attr('height', 248)
        .attr('style', 'width: 187px; height: 248px;');

    divContainer.append('span')
        .attr("class", "student-name")
        .html(gridObject.title);
    divContainer.append('span')
        .attr("class", "student-id")
        .html(gridObject.student_id);
    divContainer.append('span')
        .attr("class", "student-year")
        .html(gridObject.batch_number);
    divContainer.append('span')
        .attr("class", "skew");

    if (typeof gridObject.group !== 'undefined') {
        var groupOfStudent = gridObject.group;

        if (typeof groupOfStudent.id !== 'undefined') {
            svgContainer.attr('data-group-student', groupOfStudent.id);
        }

        if (typeof groupOfStudent.ribbon !== 'undefined') {
            svgContainer.append('img')
                .attr("class", "ribbon")
                .attr("src", groupOfStudent.ribbon);
        }

        if (typeof groupOfStudent.badge !== 'undefined') {
            svgContainer.append('img')
                .attr("class", "badgebanner")
                .attr("src", groupOfStudent.badge);
        }
    }
}

function pauseA() {
    $(".imagebox").css('webkitAnimationPlayState', 'paused');
    paused = 1;
}
function startA() {
    $(".imagebox").css('webkitAnimationPlayState', 'running');
    paused = 0;
}
