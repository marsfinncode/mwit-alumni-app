/* ------------------------------------------------------------------
 * offline-browse.js — หน้ารายชื่อนักเรียน
 *
 * เพิ่มปุ่มเปิด "รายชื่อนักเรียน" ที่มี dropdown เลือกรุ่น
 * ช่องกรองชื่อ และรายการนักเรียนพร้อมรูป แตะเพื่อดูประวัติ
 * ทำงานแยกจากโค้ดเดิมทั้งหมด ไม่แตะตรรกะของแอปเดิม
 * ------------------------------------------------------------------ */
(function () {
    if (!window.jQuery) { return; }
    var $ = window.jQuery;
    var API = 'http://hallofhistory.mwit.ac.th/admin/public/api/halloffame';
    var CHUNK = 60;

    var INDEX = window.OFFLINE_INDEX || [];
    var META = window.OFFLINE_META || {};
    var BATCH = META.batch || {};

    var shown = 0;
    var current = [];

    /* ---------------- style ---------------- */
    var CSS = [
        '#ofb-btn{position:fixed;right:14px;bottom:14px;z-index:99998;',
        'background:#1b6ec2;color:#fff;border:0;border-radius:24px;',
        'padding:12px 20px;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,.5)}',
        '#ofb-wrap{position:fixed;left:0;top:0;right:0;bottom:0;z-index:99999;',
        'background:#12161c;color:#eee;display:none;',
        'font-family:inherit;-webkit-overflow-scrolling:touch}',
        '#ofb-head{padding:10px 12px;background:#1a2029;border-bottom:1px solid #2c3542}',
        '#ofb-head h3{margin:0 0 8px;font-size:18px;color:#fff;font-weight:normal}',
        '#ofb-ctl{display:block}',
        '#ofb-ctl select,#ofb-ctl input{width:100%;box-sizing:border-box;margin-bottom:6px;',
        'padding:9px;font-size:15px;background:#232b36;color:#fff;',
        'border:1px solid #38424f;border-radius:5px}',
        '#ofb-count{font-size:13px;color:#9fb0c4;padding:2px 0 0}',
        '#ofb-close{position:absolute;right:10px;top:10px;background:none;border:0;',
        'color:#9fb0c4;font-size:26px;line-height:1}',
        '#ofb-list{position:absolute;left:0;right:0;bottom:0;overflow-y:auto;padding:6px}',
        '.ofb-row{display:table;width:100%;padding:7px 6px;border-bottom:1px solid #222a34}',
        '.ofb-row>div{display:table-cell;vertical-align:middle}',
        '.ofb-pic{width:52px}',
        '.ofb-pic img{width:46px;height:60px;object-fit:cover;background:#2a323d;border-radius:3px}',
        '.ofb-nm{font-size:16px;color:#fff}',
        '.ofb-sub{font-size:12px;color:#8fa0b4;padding-top:2px}',
        '#ofb-more{display:block;width:100%;margin:10px 0 30px;padding:12px;',
        'background:#232b36;color:#cfe0f4;border:1px solid #38424f;border-radius:6px;font-size:15px}',
        '#ofb-dt{position:fixed;left:0;top:0;right:0;bottom:0;z-index:100000;',
        'background:#12161c;color:#eee;display:none;overflow-y:auto;padding:14px}',
        '#ofb-dt img.big{width:190px;max-width:60%;border-radius:5px;display:block;margin:0 auto 12px}',
        '#ofb-dt h2{font-size:21px;color:#fff;text-align:center;margin:0 0 4px;font-weight:normal}',
        '#ofb-dt .meta{text-align:center;color:#8fa0b4;font-size:13px;margin-bottom:14px}',
        '#ofb-dt .sec{border-top:1px solid #262f3a;padding:10px 2px}',
        '#ofb-dt .sec h4{margin:0 0 6px;font-size:14px;color:#7fb3e8;font-weight:normal}',
        '#ofb-dt .sec div{font-size:14px;line-height:1.6;color:#dde5ee}',
        '#ofb-dt img{max-width:100%;height:auto}',
        '#ofb-dtback{width:100%;padding:12px;margin-bottom:12px;background:#232b36;',
        'color:#cfe0f4;border:1px solid #38424f;border-radius:6px;font-size:15px}'
    ].join('');

    function injectCss() {
        var st = document.createElement('style');
        st.type = 'text/css';
        st.appendChild(document.createTextNode(CSS));
        document.getElementsByTagName('head')[0].appendChild(st);
    }

    /* ---------------- helpers ---------------- */
    function batchLabel(b) {
        var y = BATCH[String(b)];
        return y ? ('รุ่น ' + b + '  (ปี ' + y + ')') : ('รุ่น ' + b);
    }

    function batchList() {
        var seen = {}, out = [];
        for (var i = 0; i < INDEX.length; i++) {
            var b = String(INDEX[i].batch_number);
            if (b && !seen[b]) { seen[b] = 1; out.push(b); }
        }
        out.sort(function (a, c) { return (parseInt(a, 10) || 0) - (parseInt(c, 10) || 0); });
        return out;
    }

    function norm(s) {
        return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, '');
    }

    function filtered() {
        var b = $('#ofb-batch').val();
        var g = $('#ofb-group').val();
        var q = norm($('#ofb-q').val());
        var out = [];
        for (var i = 0; i < INDEX.length; i++) {
            var r = INDEX[i];
            if (b !== '*' && String(r.batch_number) !== b) { continue; }
            if (g !== '*' && g !== undefined) {
                var sg = META.groups && META.groups[String(r.id)] ? META.groups[String(r.id)] : [];
                var hasG = false;
                for (var j = 0; j < sg.length; j++) {
                    if (String(sg[j]) === String(g)) { hasG = true; break; }
                }
                if (!hasG) { continue; }
            }
            if (q && norm(r.title).indexOf(q) === -1 &&
                norm(r.student_id).indexOf(q) === -1) { continue; }
            out.push(r);
        }
        return out;
    }

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /* ---------------- render ---------------- */
    function renderChunk() {
        var $l = $('#ofb-list');
        $('#ofb-more').remove();
        var end = Math.min(shown + CHUNK, current.length);
        var html = [];
        for (var i = shown; i < end; i++) {
            var r = current[i];
            html.push(
                '<div class="ofb-row" data-id="' + esc(r.id) + '">' +
                '<div class="ofb-pic"><img src="' + esc(r.src || '') + '" alt=""></div>' +
                '<div><div class="ofb-nm">' + esc(r.title) + '</div>' +
                '<div class="ofb-sub">รุ่น ' + esc(r.batch_number) +
                ' &nbsp;·&nbsp; ห้อง ' + esc(r.classroom_number) +
                ' &nbsp;·&nbsp; ' + esc(r.student_id) + '</div></div></div>');
        }
        $l.append(html.join(''));
        shown = end;
        if (shown < current.length) {
            $l.append('<button id="ofb-more">โหลดเพิ่ม (' +
                      (current.length - shown) + ' คน)</button>');
        }
    }

    function refresh() {
        current = filtered();
        shown = 0;
        $('#ofb-list').empty().scrollTop(0);
        $('#ofb-count').text('พบ ' + current.length + ' คน');
        renderChunk();
    }

    function sizeList() {
        var h = $('#ofb-head').outerHeight() || 120;
        $('#ofb-list').css('top', h + 'px');
    }

    /* ---------------- detail ---------------- */
    function openDetail(id) {
        var $d = $('#ofb-dt');
        $d.html('<button id="ofb-dtback">&#8592; กลับ</button>' +
                '<div style="text-align:center;color:#8fa0b4;padding:30px">กำลังโหลด...</div>')
          .show();
        $.ajax({
            url: API + '/students', type: 'GET',
            data: { limit: 1, id: id, full: 1 }
        }).done(function (data) {
            var r = null;
            if (Array.isArray(data)) { r = data[0]; }
            else if (data && data.records) { r = data.records[0]; }
            else if (data && data.data) {
                r = Array.isArray(data.data) ? data.data[0] : data.data;
            }
            if (!r) {
                $d.find('div').first().text('ไม่พบข้อมูล');
                return;
            }
            var o = r.object || {};
            var ot = r.other || o.other || {};
            var parts = ['<button id="ofb-dtback">&#8592; กลับ</button>'];
            if (r.src) { parts.push('<img class="big" src="' + esc(r.src) + '" alt="">'); }
            parts.push('<h2>' + esc(r.title || (o.first_name + ' ' + o.last_name)) + '</h2>');
            var meta = [];
            if (r.batch_number) { meta.push(batchLabel(r.batch_number)); }
            if (r.classroom_number) { meta.push('ห้อง ' + r.classroom_number); }
            if (r.student_id) { meta.push('เลขประจำตัว ' + r.student_id); }
            if (o.nickname) { meta.push('ชื่อเล่น ' + o.nickname); }
            parts.push('<div class="meta">' + esc(meta.join('  ·  ')) + '</div>');

            function sec(title, html) {
                if (!html || !String(html).replace(/<[^>]*>/g, '').trim()) { return; }
                parts.push('<div class="sec"><h4>' + title + '</h4><div>' + html + '</div></div>');
            }
            sec('การศึกษา', ot.education_information || o.education_information);
            sec('การทำงาน', ot.work_information || o.work_information);
            sec('ผลงาน', ot.portfolio_information || o.portfolio_information);
            sec('รางวัลและเกียรติประวัติ', r.awards_information || o.awards_information);
            var g = r.group;
            if (g && g.name) { sec('กลุ่ม', esc(g.name)); }
            $d.html(parts.join(''));
        });
    }

    /* ---------------- build ---------------- */
    function build() {
        injectCss();

        var opts = ['<option value="*">ทุกรุ่น (' + INDEX.length + ' คน)</option>'];
        var bl = batchList();
        for (var i = 0; i < bl.length; i++) {
            opts.push('<option value="' + esc(bl[i]) + '">' + esc(batchLabel(bl[i])) + '</option>');
        }
        
        var groupOpts = ['<option value="*">ทุกตำแหน่งหน้าที่</option>'];
        var sd = META.searchtype && META.searchtype.data ? META.searchtype.data : [];
        for (var i = 0; i < sd.length; i++) {
            if (sd[i].id !== 'name' && sd[i].id !== 'year') {
                groupOpts.push('<option value="' + esc(sd[i].id) + '">' + esc(sd[i].name) + '</option>');
            }
        }

        $('body').append(
            '<button id="ofb-btn">รายชื่อนักเรียน</button>' +
            '<div id="ofb-wrap">' +
              '<div id="ofb-head">' +
                '<h3>รายชื่อนักเรียน</h3>' +
                '<button id="ofb-close">&times;</button>' +
                '<div id="ofb-ctl">' +
                  '<select id="ofb-group">' + groupOpts.join('') + '</select>' +
                  '<select id="ofb-batch">' + opts.join('') + '</select>' +
                  '<input id="ofb-q" type="text" placeholder="พิมพ์ชื่อ หรือเลขประจำตัว">' +
                  '<div id="ofb-count"></div>' +
                '</div>' +
              '</div>' +
              '<div id="ofb-list"></div>' +
            '</div>' +
            '<div id="ofb-dt"></div>');

        $('#ofb-btn').on('click', function () {
            $('#ofb-wrap').show();
            sizeList();
            if (!current.length) { refresh(); }
        });
        $('#ofb-close').on('click', function () { $('#ofb-wrap').hide(); });
        $('#ofb-batch, #ofb-group, #ofb-q').on('change keyup', function () {
            clearTimeout(window.OFB_T);
            window.OFB_T = setTimeout(function () { refresh(); sizeList(); }, 200);
        });
        $(document).on('click', '#ofb-more', function () { renderChunk(); });
        $(document).on('click', '.ofb-row', function () {
            openDetail($(this).attr('data-id'));
        });
        $(document).on('click', '#ofb-dtback', function () { $('#ofb-dt').hide(); });
        $(window).on('resize orientationchange', sizeList);

        // ถ้ากริดหน้าแรกยังว่างหลังผ่านไป 3 วินาที ให้เปิดรายชื่อให้เลย
        setTimeout(function () {
            if ($('.grid-selector .imagebox').length === 0 &&
                $('#ofb-wrap').is(':hidden')) {
                $('#ofb-btn').trigger('click');
            }
        }, 3000);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(build, 0);
    } else {
        $(build);
    }

    window.OFFLINE_BROWSE = { refresh: refresh, open: function () { $('#ofb-btn').click(); } };
})();
