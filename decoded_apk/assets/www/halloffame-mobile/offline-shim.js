/* ------------------------------------------------------------------
 * offline-shim.js — ทำให้แอปทำงานได้โดยไม่ต้องต่อเซิร์ฟเวอร์
 *
 * ดักคำขอ $.ajax ที่ยิงไป API เดิม แล้วตอบกลับด้วยข้อมูลในเครื่อง
 * โดยเลียนแบบ "หน้าตาคำตอบ" ของเซิร์ฟเวอร์จริงทุกประการ
 * ไม่มีการแก้ตรรกะของแอปเดิมแม้แต่บรรทัดเดียว
 * ------------------------------------------------------------------ */
(function () {
    if (!window.jQuery) { return; }
    var $ = window.jQuery;

    var INDEX = window.OFFLINE_INDEX || [];
    var META = window.OFFLINE_META || {};
    var GROUPS = META.groups || {};       // studentId -> [groupId,...]
    var BATCH = META.batch || {};         // batch_number -> year
    var SHARDS = META.shards || 100;

    var byId = {};
    for (var i = 0; i < INDEX.length; i++) { byId[String(INDEX[i].id)] = INDEX[i]; }

    /* ---------- โหลดไฟล์รายละเอียดแบบแบ่งก้อน ---------- */
    var detailCache = {};     // id -> response
    var shardLoaded = {};     // shard -> true
    var shardWaiting = {};    // shard -> [callback,...]

    window.OFFLINE_DETAIL_SHARD = function (n, obj) {
        for (var k in obj) { if (obj.hasOwnProperty(k)) { detailCache[k] = obj[k]; } }
        shardLoaded[n] = true;
        var q = shardWaiting[n] || [];
        shardWaiting[n] = [];
        for (var i = 0; i < q.length; i++) { try { q[i](); } catch (e) { } }
    };

    function shardOf(id) {
        var n = parseInt(id, 10);
        if (isNaN(n)) { n = 0; }
        return Math.abs(n) % SHARDS;
    }

    function needShard(id, cb) {
        var n = shardOf(id);
        if (shardLoaded[n]) { cb(); return; }
        if (!shardWaiting[n]) {
            shardWaiting[n] = [];
            var s = document.createElement('script');
            s.src = 'offline/detail/' + n + '.js';
            s.onerror = function () { window.OFFLINE_DETAIL_SHARD(n, {}); };
            document.getElementsByTagName('head')[0].appendChild(s);
        }
        shardWaiting[n].push(cb);
    }

    /* ---------- ตัวช่วย ---------- */
    function norm(s) {
        return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, '');
    }

    function envelope(records, total) {
        return {
            result: 'ok',
            records: records,
            recordsTotal: total,
            recordsFiltered: total,
            ex: []
        };
    }

    function paginate(list, params) {
        var limit = parseInt(params.limit, 10);
        if (isNaN(limit) || limit <= 0) { limit = 5; }
        var start = parseInt(params.start, 10);
        if (isNaN(start) || start < 1) { start = 1; }
        return envelope(list.slice(start - 1, start - 1 + limit), list.length);
    }

    function filterByName(q) {
        if (!q) { return INDEX; }
        var k = norm(q);
        var out = [];
        for (var i = 0; i < INDEX.length; i++) {
            if (norm(INDEX[i].title).indexOf(k) !== -1) { out.push(INDEX[i]); }
        }
        return out;
    }

    function filterByYear(q) {
        if (!q) { return INDEX; }
        var k = norm(q);
        var out = [];
        for (var i = 0; i < INDEX.length; i++) {
            var b = String(INDEX[i].batch_number);
            var y = String(BATCH[b] == null ? '' : BATCH[b]);
            if (b.indexOf(k) !== -1 || y.indexOf(k) !== -1 ||
                norm(INDEX[i].title).indexOf(k) !== -1) {
                out.push(INDEX[i]);
            }
        }
        return out;
    }

    function filterByGroup(gid, q) {
        var out = [];
        for (var i = 0; i < INDEX.length; i++) {
            var g = GROUPS[String(INDEX[i].id)];
            if (!g) { continue; }
            var hit = false;
            for (var j = 0; j < g.length; j++) {
                if (String(g[j]) === String(gid)) { hit = true; break; }
            }
            if (!hit) { continue; }
            if (q && norm(INDEX[i].title).indexOf(norm(q)) === -1) { continue; }
            out.push(INDEX[i]);
        }
        return out;
    }

    function priorityList(limit) {
        var featured = [], rest = [];
        for (var i = 0; i < INDEX.length; i++) {
            if (GROUPS[String(INDEX[i].id)]) { featured.push(INDEX[i]); }
            else { rest.push(INDEX[i]); }
        }
        function shuffle(a) {
            a = a.slice();
            for (var i = a.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var t = a[i]; a[i] = a[j]; a[j] = t;
            }
            return a;
        }
        var out = shuffle(featured);
        if (out.length < limit) { out = out.concat(shuffle(rest)); }
        return out.slice(0, limit);
    }

    /* ---------- ตัวจัดเส้นทาง ---------- */
    // คืน data ทันที, หรือ {async:fn} ถ้าต้องรอโหลดไฟล์ก่อน
    function route(path, params) {
        var m;

        if (/\/search-type\/?$/.test(path)) {
            return META.searchtype || { result: 'ok', data: [] };
        }

        m = path.match(/\/search-type\/group-of-student\/(\w+)/);
        if (m) { return paginate(filterByGroup(m[1], params.q), params); }

        if (/\/search-type\/year/.test(path)) {
            return paginate(filterByYear(params.q), params);
        }

        if (/\/search-type\/(all|name)/.test(path)) {
            return paginate(filterByName(params.q), params);
        }

        if (/\/priority\/?$/.test(path)) {
            var lim = parseInt(params.limit, 10);
            if (isNaN(lim) || lim <= 0) { lim = 18; }
            return priorityList(lim);
        }

        if (/\/students\/?$/.test(path)) {
            if (params.id != null && params.id !== '') {
                var sid = String(params.id);
                return {
                    async: function (done) {
                        needShard(sid, function () {
                            var d = detailCache[sid];
                            if (d) { done(d); return; }
                            var r = byId[sid];
                            done(r ? [r] : []);
                        });
                    }
                };
            }
            var n = parseInt(params.limit, 10);
            if (isNaN(n) || n <= 0) { n = 5; }
            return INDEX.slice(0, n);
        }

        return null;
    }

    /* ---------- แปลง options ของ jQuery ให้เป็นคำตอบ ---------- */
    function parseParams(url, data) {
        var p = {};
        var qs = url.indexOf('?') >= 0 ? url.slice(url.indexOf('?') + 1) : '';
        if (qs) {
            var parts = qs.split('&');
            for (var i = 0; i < parts.length; i++) {
                var kv = parts[i].split('=');
                if (kv[0]) {
                    p[decodeURIComponent(kv[0])] =
                        decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
                }
            }
        }
        if (typeof data === 'string') {
            var d2 = data.split('&');
            for (var j = 0; j < d2.length; j++) {
                var kv2 = d2[j].split('=');
                if (kv2[0]) {
                    p[decodeURIComponent(kv2[0])] =
                        decodeURIComponent((kv2[1] || '').replace(/\+/g, ' '));
                }
            }
        } else if (data && typeof data === 'object') {
            for (var k in data) { if (data.hasOwnProperty(k)) { p[k] = data[k]; } }
        }
        return p;
    }

    function deliver(data, options) {
        var d = $.Deferred();
        var jq = d.promise();
        jq.abort = function () { };
        jq.readyState = 4;
        jq.status = 200;
        jq.statusText = 'success';
        jq.responseJSON = data;

        function fire() {
            if (options && typeof options.beforeSend === 'function') {
                try { options.beforeSend(jq); } catch (e) { }
            }
            if (options && typeof options.success === 'function') {
                try { options.success(data, 'success', jq); } catch (e) { }
            }
            d.resolve(data, 'success', jq);
            if (options && typeof options.complete === 'function') {
                try { options.complete(jq, 'success'); } catch (e) { }
            }
        }

        // สำคัญ: โค้ดเดิมบางจุดตั้ง async:false แล้วอ่านผลลัพธ์ทันทีบรรทัดถัดไป
        // (เช่น loadCache -> loadByEffectM) ถ้าตอบช้าไปหน้าจะว่างเปล่า
        if (options && options.async === false) { fire(); }
        else { setTimeout(fire, 0); }
        return jq;
    }

    var IS_API = /(\/api\/halloffame)|(^(\.\.\/)*api\/halloffame)/;

    var realAjax = $.ajax;
    $.ajax = function (url, options) {
        if (typeof url === 'object') { options = url; url = options.url; }
        options = options || {};
        if (!url) { url = options.url || ''; }

        if (!IS_API.test(String(url))) {
            return realAjax.apply($, arguments);
        }

        var path = String(url).split('?')[0];
        var params = parseParams(String(url), options.data);
        var res;
        try { res = route(path, params); } catch (e) { res = null; }

        if (res && res.async) {
            var d = $.Deferred();
            var jq = d.promise();
            jq.abort = function () { };
            jq.readyState = 4; jq.status = 200; jq.statusText = 'success';
            if (typeof options.beforeSend === 'function') {
                try { options.beforeSend(jq); } catch (e) { }
            }
            res.async(function (data) {
                jq.responseJSON = data;
                if (typeof options.success === 'function') {
                    try { options.success(data, 'success', jq); } catch (e) { }
                }
                d.resolve(data, 'success', jq);
                if (typeof options.complete === 'function') {
                    try { options.complete(jq, 'success'); } catch (e) { }
                }
            });
            return jq;
        }

        if (res === null || typeof res === 'undefined') {
            return deliver({ result: 'ok', records: [], recordsTotal: 0,
                             recordsFiltered: 0, ex: [] }, options);
        }
        return deliver(res, options);
    };

    var realGetJSON = $.getJSON;
    $.getJSON = function (url, data, cb) {
        if (typeof data === 'function') { cb = data; data = undefined; }
        if (!IS_API.test(String(url))) {
            return realGetJSON.apply($, arguments);
        }
        return $.ajax({ url: url, data: data, success: cb });
    };

    var realGet = $.get;
    $.get = function (url, data, cb) {
        if (typeof data === 'function') { cb = data; data = undefined; }
        if (!IS_API.test(String(url))) {
            return realGet.apply($, arguments);
        }
        return $.ajax({ url: url, data: data, success: cb });
    };

    window.OFFLINE_MODE = true;
})();
