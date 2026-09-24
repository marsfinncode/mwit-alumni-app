var loading = false;

function BUILD_SEARCH_WINDOWS() {
    var left;
    var SearchWidth;
    var SearchHeight;
    var id;
    var screenWidth = $("#showcase").width() / showcaseScreens;

    SearchWidth = Math.round(screenWidth * 1);
    SearchHeight = Math.round(SearchWidth * 0.55);

    for (var i = 1; i <= showcaseScreens; i++) {
        left = Math.round((screenWidth * (i - 1)) + searchBoxLeftOffset);
        var leftSearch = Math.round((screenWidth * (i - 1)) + (screenWidth * 0.1));
        leftSearch = 30;
        var searchContainer = d3.select('#showcase')
            .append('div')
            .attr({
                style: 'bottom: 20px; width: ' + 794 + 'px;  left: ' + leftSearch + 'px;  position: absolute;'
            }).attr({
                id: 'search-bar' + i + ''
            });
        searchContainer.append('div')
            .attr('id', 'bottom-search-type-name' + i)
            .attr('class', 'search-type-btn')
            .append('div')
            .attr('class', 'search-type-display')
            .attr('data-screen', i)
            .append('span')
            .text('ชื่อนักเรียน');
        // searchContainer.append('div')
        //     .attr('id', 'bottom-search-type-name' + i)
        //     .attr('class', 'search-type-btn')
        //     .append('span')
        //     .text('ชื่อนักเรียน');

        d3.select('#bottom-search-type-name' + i)
            .append('input')
            .attr({
                id: "keyboard" + i,
                type: 'text',
                class: 'form-control',
                style: 'width: 87%; float:right;',
                "data-screen": i
            });

        buildSearchWindow(left, searchBoxTopOffset, SearchWidth, SearchHeight, i, id);

        if (typeof window.DELAY_KEYBOARD_CHANGE === 'undefined') {
            window.DELAY_KEYBOARD_CHANGE = [];
        }

        $('#keyboard' + i).on('keypress', function (ev) {
            var $selector = $(this);
            var toScreen = $selector.attr('data-screen');

            if (ev.keyCode == 13) {
                doSearch($selector.val(), toScreen);
            } else {
                if (typeof window.DELAY_KEYBOARD_CHANGE[toScreen] !== 'undefined') {
                    clearTimeout(window.DELAY_KEYBOARD_CHANGE[toScreen]);
                }

                window.DELAY_KEYBOARD_CHANGE[toScreen] = setTimeout(function () {
                    window.STOP_SEARCH[toScreen] = false;
                    doSearch($selector.val(), toScreen);
                }, 300);
            }
        });
    }

    $('#keyboard1').attr("placeholder", "ค้นหา");
}

if (typeof window.AJAX === 'undefined') {
    window.AJAX = {};
}

function buildSearchWindow(left, top, SearchWidth, SearchHeight, i, id) {
    var $el = $("<div/>")
        .css("top", "300px")
        .css("left", "45px")
        .css("width", "678px")
        .css("height", "310px")
        .attr("class", "searchbox")
        .attr("data-search-id", i).attr("id", "searchbox" + i)
        .append($("#search_template").html());
    $("#showcase").append($el);
    $("#search-bar" + i + " .search-type-btn").attr("id", "search-type-name" + i);
    $("#search-bar" + i + " .search-type-url").attr("id", "search-type-url" + i);
    $("#search-bar" + i).append('<div class="search-type-box"></div>');

    $.ajax({
        url: API_ENDPOINT + '/search-type',
        type: 'GET',
        beforeSend: function (xhr) {
            $("#search-bar" + i + " .search-type-box").attr("id", "search-type" + i);
        }
    }).done(function (data, textStatus, jqXHR) {
        if (_.isEqual(data.result, 'ok')) {
            var bundle = [];
            _.each(data.data, function (value) {
                var ICON_BADGE;
                if (typeof value.badge !== 'undefined') {
                    ICON_BADGE = '<img src="' + value.badge + '" alt="" class="position-left" style="width: 1em; padding-right: 5px;">';
                } else if (typeof value.icon !== 'undefined') {
                    ICON_BADGE = '<i class="' + value.icon + '" style="font-size: .75em; width: 35px; padding-right: 5px;"></i>';
                }

                bundle.push('<li\
                id="' + ('SEARCH_TYPE-' + i + '_' + value.id) + '"\
                data-screen="' + i + '"\
                data-id="' + value.id + '"\
                data-name="' + value.name + '"\
                data-url="' + value.url + '"\
                class="SEARCH_TYPE">\
    ' + ICON_BADGE + '\
    ' + '<span>' + value.name + '</span>' + '\
</li>');
            });

            if (bundle.length > 0) {
                $("#search-type" + i).html('<ul>' + bundle.join('\n') + '</ul>');
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        //
    }).always(function () {
        //
    });

    $el = $("<div/>")
        .attr("class", "searchresults")
        .attr("id", "searchres" + i)
        .css('left', '50px')
        .css('width', '673px')
        .css('height', '310px')
        .css('bottom', '70px');
    $("body").append($el);
    $("#searchres" + i).append('<img data-screen="' + i + '" class="arrow-left arrow-search-' + i + '" src="img/arrow-left.png"><span class="searchrestitle">ผลการค้นหา<span class="hidden">.</span><span class="hidden">.</span><span class="hidden">.</span></span><img data-screen="' + i + '" class="arrow-right arrow-search-' + i + '" src="img/arrow-right.png">');
    $("#searchres" + i).append('<div class="resbox" data-id="' + i + '"></div>');

    searchResultsScroll(i);
}

function closeSearch(el) {
    el.parent().attr('class', 'searchbox');
    var toScreen = el.parent().attr('data-search-id');

    var posX = el.offset().left,
        posY = el.offset().top;
    var point = {top: posY, left: posX, x: posX, y: posY};

    if (typeof toScreen !== 'undefined') {
        var $el = $('#keyboard' + toScreen + '_keyboard');
        if (typeof $el.val() !== 'undefined') {
            // $el.getkeyboard().close();
        }
    }

    if (typeof overLapArray[toScreen] === 'undefined') {
        overLapArray[toScreen] = [];
    }
    var loadMoreCount = overLapArray[toScreen].length;
    el.parent().fadeOut();
    loadMore(loadMoreCount, toScreen);
}

if (typeof window.STOP_SEARCH === 'undefined') {
    window.STOP_SEARCH = [];
}

function doSearch(getQuery, toScreen, offSet) {
    var SEARCH_TYPE_API_ENDPOINT;
    var $SEARCH_TYPE_URL = $("#search-type-url" + toScreen);
    if (typeof $SEARCH_TYPE_URL.val() !== 'undefined' && $SEARCH_TYPE_URL.val().trim()) {
        SEARCH_TYPE_API_ENDPOINT = $("#search-type-url" + toScreen).val();
    } else {
        SEARCH_TYPE_API_ENDPOINT = API_ENDPOINT + '/search-type/name';
    }

    var SEARCH_TYPE_PARAMETER = {};
    var $el = $("#searchres" + toScreen + " .resbox");
    if (getQuery === null) {
        if (typeof offSet === 'undefined') {
            $el.empty()
                .attr('scrollTo', '0');

            SEARCH_TYPE_PARAMETER = {
                'limit': 5,
                'start': 1
            };
        } else {
            SEARCH_TYPE_PARAMETER = {
                'limit': 3,
                'start': offSet
            };
        }
    } else {
        if (window.LAST_SEARCH_QUERIES[toScreen] == getQuery) {
            if (typeof offSet === 'undefined') {
                $el.empty()
                    .attr('scrollTo', '0');

                SEARCH_TYPE_PARAMETER = {
                    'q': getQuery,
                    'limit': 5,
                    'start': 1
                };
            } else {
                SEARCH_TYPE_PARAMETER = {
                    'q': getQuery,
                    'limit': 3,
                    'start': offSet
                };
            }
        } else {
            if (typeof offSet === 'undefined') {
                $el.empty()
                    .attr('scrollTo', '0');

                SEARCH_TYPE_PARAMETER = {
                    'q': getQuery,
                    'limit': 5,
                    'start': 1
                };
            } else {
                SEARCH_TYPE_PARAMETER = {
                    'q': getQuery,
                    'limit': 3,
                    'start': offSet
                };
            }

            if (getQuery.length > 0) {
                window.LAST_SEARCH_QUERIES[toScreen] = getQuery;
            }
        }
    }

    if (typeof window.STOP_SEARCH[toScreen] === 'undefined') {
        window.STOP_SEARCH[toScreen] = false;
    }

    if (typeof window.STOP_SEARCH[toScreen] !== 'undefined' && window.STOP_SEARCH[toScreen] !== true) {
        $.ajax({
            url: SEARCH_TYPE_API_ENDPOINT,
            type: 'GET',
            data: SEARCH_TYPE_PARAMETER,
            cache: false,
            beforeSend: function (xhr) {
                //
            }
        }).done(function (data, textStatus, jqXHR) {
            if (typeof data !== 'undefined' && typeof data.result !== 'undefined' && data.result === 'ok') {
                $('#searchres' + toScreen).show();
                $('.arrow-search-' + toScreen).show();

                if (typeof data.records !== 'undefined') {
                    _.each(data.records, function (value) {
                        if (typeof $el.find('.imagebox[data-id="' + value.id + '"]').val() === 'undefined') {
                            var $noSearchResult = $el.find('.no-search-result');
                            if (typeof $noSearchResult.val() !== 'undefined') {
                                $noSearchResult.remove();
                            }

                            var svgContainer = d3.select("#searchres" + toScreen + " .resbox")
                                .append('div')
                                .attr("data-id", value.id)
                                .attr("class", "imagebox byrand")
                                .attr("id", "searchimagebox-" + imageInc);

                            if (getQuery !== null && getQuery.trim()) {
                                svgContainer.attr('query', getQuery);
                            }

                            if (typeof value.group_id !== 'undefined') {
                                svgContainer.attr('data-group-student', value.group_id);
                            }

                            innerPhotoContent(svgContainer, value);
                        }
                    });
                }

                if (typeof window.DELAY_NO_SEARCH_RESULT_INTERVAL === 'undefined') {
                    window.DELAY_NO_SEARCH_RESULT_INTERVAL = [];
                }

                if (typeof window.DELAY_NO_SEARCH_RESULT_INTERVAL[toScreen] !== 'undefined') {
                    clearTimeout(window.DELAY_NO_SEARCH_RESULT_INTERVAL[toScreen]);
                }

                window.DELAY_NO_SEARCH_RESULT_INTERVAL[toScreen] = setTimeout(function () {
                    if ($el.find('.imagebox').length == 0) {
                        if (typeof getQuery === 'string' && getQuery.length > 0) {
                            $("#searchres" + toScreen + " .resbox").html('<h1 class="no-search-result">ไม่พบผลการค้นหาสำหรับ <strong>' + getQuery + '</strong></h1>');
                        } else {
                            $("#searchres" + toScreen + " .resbox").html('<h1 class="no-search-result">กรุณากรอกคำค้น</h1>');
                        }
                    }
                }, 500);

                if (typeof data.recordsFiltered !== 'undefined') {
                    if ($el.find('.imagebox').length >= data.recordsFiltered) {
                        window.STOP_SEARCH[toScreen] = true;
                    } else {
                        window.STOP_SEARCH[toScreen] = false;
                    }
                }

                $('#searchres' + toScreen + ' .searchrestitle').removeClass('text-loading');
                $('#searchres' + toScreen + ' .searchrestitle').find('span').addClass('hidden');
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //
        }).always(function () {
            //
        });
    }
}

function scrollLeftMove(id) {
    // var scrollLeft = $("#searchres" + 6 + " .resbox").width();
    // if (isNaN(scrollLeft)) {
    //     scrollLeft = 0;
    // }
    // scrollLeft += 208;
    // $("#searchres" + id + " .resbox").animate({
    //     scrollLeft: "-=" + scrollLeft
    // }, 400, function () {
    //     checkScrollPos(id);
    // });
    var scrollLeft = $("#searchres" + id + " .resbox").width();
    if (isNaN(scrollLeft)) {
        scrollLeft = 0;
    }
    // scrollLeft += 208;
    $("#searchres" + id + " .resbox").animate({
        scrollLeft: "-=" + scrollLeft
    }, 400, function () {
        checkScrollPos(id);
    });
}

function scrollRightMove(id) {
    if (typeof window.STOP_SEARCH[id] === 'undefined' && window.STOP_SEARCH[id] !== true) {
        $('#searchres' + id + ' .searchrestitle').addClass('text-loading');
        $('#searchres' + id + ' .searchrestitle').find('span').removeClass('hidden');
    }

    if (typeof window.DELAY_INFINITE_SCROLL_INTERVAL === 'undefined') {
        window.DELAY_INFINITE_SCROLL_INTERVAL = [];
    }

    if (typeof window.DELAY_INFINITE_SCROLL_INTERVAL[id] !== 'undefined') {
        clearTimeout(window.DELAY_INFINITE_SCROLL_INTERVAL[id]);
    }

    var $selector = $("#searchres" + id + " .resbox");
    window.DELAY_INFINITE_SCROLL_INTERVAL[id] = setTimeout(function () {
        doSearch($("#keyboard" + id).val(), $("#keyboard" + id).attr('data-screen'), $selector.find('.imagebox').length);
        var floatScrollTo = $selector.scrollLeft();
        $selector.attr('scrollTo', floatScrollTo);
    }, 300);

    var scrollLeft = $("#searchres" + id + " .resbox").width();
    if (isNaN(scrollLeft)) {
        scrollLeft = 0;
    }
    // scrollLeft += 208;
    $("#searchres" + id + " .resbox").animate({
        scrollLeft: "+=" + scrollLeft
    }, 400, function () {
        checkScrollPos(id);
    });
}

function checkScrollPos(id) {
    var pos = $("#searchres" + id + " .resbox").scrollLeft();
    var max = $("#searchres" + id + " .resbox").outerWidth() - 210;
    if (pos == 0) {
        $("#searchres" + id + " .arrow-right").css('visibility', 'visible');
        $("#searchres" + id + " .arrow-left").css('visibility', 'hidden');
    } else if (pos < max) {
        $("#searchres" + id + " .arrow-right").css('visibility', 'visible');
        $("#searchres" + id + " .arrow-left").css('visibility', 'visible');
    } else {
        // $("#searchres" + id + " .arrow-right").css('visibility', 'hidden');
        $("#searchres" + id + " .arrow-right").css('visibility', 'visible');
        $("#searchres" + id + " .arrow-left").css('visibility', 'visible');
    }
}

function searchType(id) {
    switch ($("#keyboard" + id).attr('fade')) {
        default:
        case 'in':
            $("#search-type" + id).fadeIn('fast');
            $("#searchres" + id + "").hide();
            $("#searchres" + id + " .resbox").empty();
            $("#keyboard" + id).attr('fade', 'out');
            break;
        case 'out':
            $("#search-type" + id).fadeOut('fast');
            if ($("#searchres" + id + " .resbox").find('.imagebox').length > 0) {
                $("#searchres" + id + "").show();
            }
            $("#keyboard" + id).attr('fade', 'in');
            break;
    }
    // $("#search-type" + id).fadeToggle('slow');
    // $("#searchres" + id + "").hide();
}

function selectType(id, name, url) {
    $("#searchres" + id + " .resbox").empty();
    $("#search-type" + id).fadeToggle('fast', function () {
        $("#searchres" + id + "").show(400);
    });

    $("#search-type-name" + id + " span").html(name);
    $("#search-type-url" + id).val(url);

    var $selector = $("#keyboard" + id);
    var toScreen = $selector.attr('data-screen');
    if (typeof $selector.val() !== 'undefined' && url.indexOf('group-of-student') !== -1 && typeof toScreen !== 'undefined') {
        window.STOP_SEARCH[toScreen] = false;
        doSearch(null, toScreen);
        $selector.val(null);
    }
}

function otherScroll(toScreen) {
    if (typeof toScreen !== 'undefined') {
        var $selector = $('#searchbox' + toScreen).find('.other');
        if (typeof $selector.val() !== 'undefined') {
            var mc = new Hammer($selector[0]);
            mc.get('pan').set({direction: Hammer.DIRECTION_ALL});
            mc.on('panup pandown', function (ev) {
                var floatScrollTo = parseFloat($selector.attr('scrollTo'));
                if (isNaN(floatScrollTo)) {
                    floatScrollTo = 0;
                    $selector.attr('scrollTo', floatScrollTo);
                }

                var floatScrollTop = 1;
                switch (ev.type) {
                    case 'panup':
                        if ($selector[0].scrollHeight < floatScrollTo) {
                            var floatScrollHeight = parseFloat($selector[0].scrollHeight);
                            $selector.scrollTop(floatScrollHeight);
                            $selector.attr('scrollTo', floatScrollHeight);
                        } else {
                            var floatScrollHeight = parseFloat(floatScrollTo + floatScrollTop);
                            $selector.scrollTop(floatScrollHeight);
                            $selector.attr('scrollTo', floatScrollHeight);
                        }
                        break;
                    case 'pandown':
                        if (floatScrollTo <= 0) {
                            var floatScrollHeight = 0;
                            $selector.scrollTop(floatScrollHeight);
                            $selector.attr('scrollTo', floatScrollHeight);
                        } else {
                            var floatScrollHeight = parseFloat(floatScrollTo - floatScrollTop);
                            $selector.scrollTop(floatScrollHeight);
                            $selector.attr('scrollTo', floatScrollHeight);
                        }
                        break;
                }
            });
        }
    }
}

function searchResultsScroll(toScreen) {
    if (typeof toScreen !== 'undefined') {
        var $selector = $('#searchres' + toScreen).find('.resbox');
        if (typeof $selector.val() !== 'undefined') {
            var mc = new Hammer($selector[0]);
            mc.get('pan').set({direction: Hammer.DIRECTION_ALL});
            mc.on('panleft panright', function (ev) {
                var floatScrollWidthInnerWidth = $selector[0].scrollWidth - $selector.innerWidth();
                var floatScrollLeftInnerWidth = $selector[0].scrollWidth - ($selector.scrollLeft() + $selector.innerWidth());

                var floatScrollTo = parseFloat($selector.attr('scrollTo'));
                if (isNaN(floatScrollTo)) {
                    floatScrollTo = 0;
                    $selector.attr('scrollTo', floatScrollTo);
                }

                var floatScrollLeft = 13;
                switch (ev.type) {
                    case 'panleft':

                        if (floatScrollLeftInnerWidth <= 200) {
                            $('#searchres' + toScreen + ' .searchrestitle').addClass('text-loading');
                            $('#searchres' + toScreen + ' .searchrestitle').find('span').removeClass('hidden');
                            doSearch($("#keyboard1").val(), $("#keyboard" + toScreen).attr('data-screen'), $selector.find('.imagebox').length);
                            // $('#searchres' + toScreen + ' > .searchrestitle').removeClass('text-loading');
                            // $('#searchres' + toScreen + ' .searchrestitle').find('span').addClass('hidden');
                        }

                        if ($selector[0].scrollWidth < floatScrollTo) {
                            var floatScrollLeft = parseFloat($selector[0].scrollWidth);
                            $selector.scrollLeft(floatScrollLeft);
                            $selector.attr('scrollTo', floatScrollLeft);
                        } else {
                            var floatScrollLeft = parseFloat(floatScrollTo + floatScrollLeft);
                            $selector.scrollLeft(floatScrollLeft);
                            $selector.attr('scrollTo', floatScrollLeft);
                        }
                        break;
                    case 'panright':
                        if (floatScrollTo <= 0) {
                            var floatScrollLeft = 0;
                            $selector.scrollLeft(floatScrollLeft);
                            $selector.attr('scrollTo', floatScrollLeft);
                        } else {
                            var floatScrollLeft = parseFloat(floatScrollTo - floatScrollLeft);
                            $selector.scrollLeft(floatScrollLeft);
                            $selector.attr('scrollTo', floatScrollLeft);
                        }
                        break;
                }
            });
        }
    }
}
