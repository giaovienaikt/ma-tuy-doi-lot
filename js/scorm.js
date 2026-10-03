/* Lớp SCORM 1.2 tối giản. Có LMS thì ghi trạng thái, điểm, chỗ đang học;
   mở thẳng index.html (không LMS) thì lưu vào localStorage. */
(function () {
  var api = null, daMo = false, batDau = Date.now();
  var KHOA = "matuy-doi-lot-v1";

  function timApi(w) {
    var n = 0;
    try {
      while (w && !w.API && w.parent && w.parent !== w && n < 10) { n++; w = w.parent; }
      return (w && w.API) || null;
    } catch (e) { return null; }
  }
  function lay() {
    api = timApi(window);
    if (!api) { try { if (window.opener) api = timApi(window.opener); } catch (e) {} }
    return api;
  }
  function thoiGian(ms) {
    var s = Math.round(ms / 1000), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60);
    s = s % 60;
    function p(x, d) { x = String(x); while (x.length < d) x = "0" + x; return x; }
    return p(h, 4) + ":" + p(m, 2) + ":" + p(s, 2);
  }

  window.SCORM = {
    coLms: function () { return !!api; },
    mo: function () {
      lay();
      if (api) {
        try {
          api.LMSInitialize(""); daMo = true;
          var st = api.LMSGetValue("cmi.core.lesson_status");
          if (!st || st === "not attempted") api.LMSSetValue("cmi.core.lesson_status", "incomplete");
          api.LMSCommit("");
        } catch (e) { api = null; }
      }
      window.addEventListener("beforeunload", SCORM.dong);
      window.addEventListener("pagehide", SCORM.dong);
    },
    docTrangThai: function () {
      var s = "";
      if (api) { try { s = api.LMSGetValue("cmi.suspend_data") || ""; } catch (e) {} }
      else { try { s = localStorage.getItem(KHOA) || ""; } catch (e) {} }
      try { return s ? JSON.parse(s) : null; } catch (e) { return null; }
    },
    ghiTrangThai: function (obj, viTri) {
      var s = JSON.stringify(obj);
      if (api) {
        try {
          if (s.length > 4000) s = s.slice(0, 4000);
          api.LMSSetValue("cmi.suspend_data", s);
          if (viTri != null) api.LMSSetValue("cmi.core.lesson_location", String(viTri));
          api.LMSCommit("");
        } catch (e) {}
      } else { try { localStorage.setItem(KHOA, s); } catch (e) {} }
    },
    ghiDiem: function (diem, toiDa, dat) {
      if (!api) return;
      try {
        api.LMSSetValue("cmi.core.score.min", "0");
        api.LMSSetValue("cmi.core.score.max", String(toiDa));
        api.LMSSetValue("cmi.core.score.raw", String(diem));
        api.LMSSetValue("cmi.core.lesson_status", dat ? "passed" : "failed");
        api.LMSCommit("");
      } catch (e) {}
    },
    hoanThanh: function () {
      if (!api) return;
      try {
        var st = api.LMSGetValue("cmi.core.lesson_status");
        if (st !== "passed" && st !== "failed") api.LMSSetValue("cmi.core.lesson_status", "completed");
        api.LMSCommit("");
      } catch (e) {}
    },
    xoa: function () { try { localStorage.removeItem(KHOA); } catch (e) {} },
    dong: function () {
      if (!api || !daMo) return;
      try {
        api.LMSSetValue("cmi.core.session_time", thoiGian(Date.now() - batDau));
        api.LMSCommit(""); api.LMSFinish("");
      } catch (e) {}
      daMo = false;
    }
  };
})();
