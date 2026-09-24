var overLapArray = new Array();
overLapArray[1] = new Array();
overLapArray[2] = new Array();
overLapArray[3] = new Array();
overLapArray[4] = new Array();
overLapArray[5] = new Array();

var overScreen = 300;

var allArea = new Array();

var attempt;

function START_EFFECT() {
    window.USER_LAST_ACTIVE = new Date().getTime();

    $('.grid-selector > .imagebox').remove();

    getArea();

    if ($('.grid-selector > .grid-item').length === 0 && typeof window.grid !== 'undefined') {
        window.grid();
    }
}

function getArea(parameter) {
    var widthCount = Math.ceil((window.innerWidth - 100) / roundX);
    var heightCount = Math.ceil((window.innerHeight - 300) / roundY);
    if (true) {
        var SUSPENDED = 300;
        var GRID_HEIGHT = roundY;
        var SEARCH_HEIGHT = 100;
        var ALL_GRID_HEIGHT = window.innerHeight - (Math.ceil((window.innerHeight - SUSPENDED) / GRID_HEIGHT) * GRID_HEIGHT);
        var ALLOCATED_GRID_HEIGHT = ALL_GRID_HEIGHT - SEARCH_HEIGHT;
        roundY += ALLOCATED_GRID_HEIGHT / widthCount;
    }
    var imageCount = Math.floor(widthCount * heightCount);
    // if (window.innerHeight >= 1145 && window.innerHeight <= 1366) {
    //     heightCount = 4;
    //     imageCount = 12;
    // } else if (window.innerHeight >= 803 && window.innerHeight <= 1024) {
    //     heightCount = 3;
    //     imageCount = 9;
    // } else if (window.innerHeight >= 1091 && window.innerHeight <= 1024) {
    //     heightCount = 3;
    //     imageCount = 9;
    // }
    if (window.innerHeight >= 1024 && window.innerHeight >= 1024) {
        //
    } else if (window.innerHeight >= 1024 && window.innerHeight >= 1024) {
        //
    }
    var o = 1;
    for (var i = 0; i < heightCount; i++) {
        for (var m = 0; m < widthCount; m++) {
            allArea[o] = ((roundX * m) + 50) + ',' + ((roundY * i) + 30);
            if (o == imageCount) {
                if (typeof parameter !== 'undefined' && typeof parameter.animatedCss !== 'undefined') {
                    loadByEffectM(imageCount, 'animated', 0);
                } else if (typeof parameter !== 'undefined' && typeof parameter.magicCss !== 'undefined') {
                    loadByEffectM(imageCount, 'magictime', 0);
                } else {
                    loadByEffectM(imageCount, '', 0);
                }
            }
            o++;
        }
    }
}

function loadByEffectM(toCount, toClassed, toScreen, runningCallback) {
    checkCacheSize();
    for (var index = 1; index <= toCount; index += 1) {
        if (studentCache.length <= 0) return;

        var img = studentCache[0];
        if (typeof $('.imagebox[data-id="' + img.id + '"]').val() !== 'undefined') {
            img = null;
        }

        if (img == null) {
            studentCache.splice(0, 1);
            index -= 1;
        } else {

            var zoom = " zoom" + Math.ceil(Math.random() * 5);
            var left, top, attempt, found, posclass;
            attempt = 0;
            found = false;
            while (attempt < 50 && found == false) {

                if (toScreen == -1) {
                    var shift = preload.shift();
                    if (typeof shift !== 'undefined') {
                        top = shift.top;
                        left = shift.left;
                    }
                } else if (toScreen > 0) {
                    var overLabText = overLapArray[toScreen][index - 1];
                    if (typeof overLabText !== 'undefined') {
                        var splitLab = overLabText.split(',');

                        top = splitLab[0];
                        left = splitLab[1];
                    } else {
                        console.log(overLapArray[toScreen][index - 1]);
                    }
                } else {
                    position = allArea[index];
                    pos_split = position.split(',');
                    left = pos_split[0];
                    top = pos_split[1];
                }

                posclass = "pos" + left + "Y" + top;

                if ($('.' + posclass).length == 0) {
                    found = true;
                } else {
                    attempt += 1;
                }
            }

            if ($("div[data-pos-class='" + posclass + "']").length > 0) {
                $("div[data-pos-class='" + posclass + "']").remove();
            }

            if (found) {
                if (toClassed == '') var effectClass = 'magictime swashIn';

                var screen = getScreen(left);
                var svgContainer = d3.select('#showcase')
                    .append('div')
                    .attr("data-id", img.id)
                    .attr("class", "imagebox imageMain " + toClassed)
                    .attr("id", "imagebox-" + imageInc)
                    .attr("data-real-left", left)
                    .attr("data-real-top", top)
                    .attr("data-pos-class", posclass)
                    .attr('data-screen', screen)
                    .attr("style", "position:absolute; top:" + top + "px; left:" + left + "px;");

                innerPhotoContent(svgContainer, img);

                if (typeof runningCallback !== 'undefined') {
                    runningCallback();
                }

                studentCache.splice(0, 1);
                checkCacheSize();
                //sleep(50);
            }
        }
    }
}

function detectOverlappingM(screen) {
    var count = $(".imagebox.overlaps").length;

    var m = 1;
    if (paused < 1) {
        $(".imagebox.overlaps.overlaps").each(function () {
            if (typeof overLapArray[screen] === 'undefined') {
                overLapArray[screen] = [];
            }

            var getTop = $(this).attr('data-real-top');
            var getLeft = $(this).attr('data-real-left');
            overLapArray[screen][m] = getTop + ',' + getLeft;
            $('#searchbox' + $(this).attr("data-screen")).addClass($(this).attr("data-pos-class"));
            $(this).hide();
            m++;
        });
    }
}
