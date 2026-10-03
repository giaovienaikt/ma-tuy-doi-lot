/* Bộ máy bài e-learning "Ma túy đội lốt" — không thư viện ngoài, chạy offline (file://) và trong LMS (SCORM 1.2). */
(function () {
  "use strict";
  var B = window.BAI, M = B.man, AM = window.AM || {};
  var $ = function (s, g) { return (g || document).querySelector(s); };
  var KY = ["A", "B", "C", "D", "E"];
  var GV = /[?&]gv=1/.test(location.search);
  var QUAY = /[?&]quay=1/.test(location.search);
  if (QUAY) { GV = true; document.documentElement.classList.add("che-do-quay"); try { localStorage.clear(); } catch (e) {} }

  /* ---------------- trạng thái ---------------- */
  var TT = { i: 0, xong: {}, tl: {} };
  var cu = SCORM.docTrangThai();
  SCORM.mo();
  if (QUAY) cu = null;
  if (cu && typeof cu.i === "number") TT = { i: cu.i, xong: cu.xong || {}, tl: cu.tl || {} };
  function luu() { SCORM.ghiTrangThai(TT, TT.i); }

  /* ---------------- tiện ích ---------------- */
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function sach(s) { return (s || "").replace(/\[(warm|calm|curious|bright)\]\s*/g, ""); }
  function tron(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------------- âm thanh hiệu ứng (WebAudio, không cần tệp) ---------------- */
  var ac = null;
  function tieng(kieu) {
    if (kieu === "dung" || kieu === "xong") cuDoi("cu-vui"); else if (kieu === "sai") cuDoi("cu-canh-bao");
    if (QUAY) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var t = ac.currentTime;
      var not = { dung: [[880, 0], [1320, .12]], sai: [[220, 0], [180, .14]], lat: [[660, 0]], xong: [[523, 0], [659, .1], [784, .2], [1047, .3]], tick: [[1000, 0]] }[kieu] || [[600, 0]];
      not.forEach(function (n) {
        var o = ac.createOscillator(), g = ac.createGain();
        o.type = kieu === "sai" ? "sawtooth" : "sine"; o.frequency.value = n[0];
        g.gain.setValueAtTime(0.0001, t + n[1]);
        g.gain.exponentialRampToValueAtTime(kieu === "tick" ? 0.05 : 0.18, t + n[1] + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + n[1] + (kieu === "sai" ? 0.25 : 0.32));
        o.connect(g); g.connect(ac.destination); o.start(t + n[1]); o.stop(t + n[1] + 0.4);
      });
    } catch (e) {}
  }
  var cuHienTai = null, cuHen = null;
  function datCu(k, c) {
    var w = el("div", "cu-goc" + (c.trai ? " trai" : ""));
    w.innerHTML = (c.noi ? '<div class="bong">' + c.noi + "</div>" : "") + '<img alt="Cú Tỉnh" src="hinh/' + (c.tu || "cu-chi") + '.png">';
    w._goc = c.tu || "cu-chi"; k.appendChild(w); cuHienTai = w;
    w.querySelector("img").onclick = function () { w.classList.toggle("an-bong"); };
  }
  function cuDoi(tu) {
    if (!cuHienTai || !document.body.contains(cuHienTai)) return;
    var im = cuHienTai.querySelector("img"); im.src = "hinh/" + tu + ".png"; cuHienTai.classList.remove("nay"); void cuHienTai.offsetWidth; cuHienTai.classList.add("nay");
    clearTimeout(cuHen); var goc = cuHienTai; cuHen = setTimeout(function () { goc.querySelector("img").src = "hinh/" + goc._goc + ".png"; }, 2600);
  }
  function noHoa(chu, x, y) { var e = el("div", "no-hoa", chu); e.style.left = (x || innerWidth / 2) + "px"; e.style.top = (y || innerHeight / 2) + "px"; document.body.appendChild(e); setTimeout(function () { e.remove(); }, 1300); }

  /* ---------------- giọng đọc + phụ đề ---------------- */
  var loa = $("#loa"), phuDe = $("#phu-de"), ccBat = true, luot = 0, hen = null;
  try { ccBat = localStorage.getItem("matuy-cc") !== "0"; } catch (e) {}
  function dungDoc() { luot++; clearTimeout(hen); try { loa.pause(); } catch (e) {} phuDe.classList.remove("hien"); }
  function hienPhuDe(s) { phuDe.textContent = s; phuDe.classList.toggle("hien", ccBat && !!s); }
  /* doan: [{khoa, chu, lo}] — lo: số ý hiện ra khi đoạn bắt đầu */
  function doc(doan, xongHet, hienY) {
    dungDoc();
    var l = luot, k = 0;
    (function tiep() {
      if (l !== luot) return;
      if (k >= doan.length) { hienPhuDe(""); if (xongHet) xongHet(); return; }
      var d = doan[k++];
      if (d.lo != null && hienY) hienY(d.lo);
      if (!d.chu) { hen = setTimeout(tiep, 700); return; }
      var s = sach(d.chu), cau = s.split(/(?<=[.!?…])\s+/), moc = [], tong = 0;
      cau.forEach(function (c) { tong += c.length; moc.push(tong); });
      function theoTiLe(r) { var x = r * tong, q = 0; while (q < moc.length - 1 && x > moc[q]) q++; if (phuDe._c !== q) { phuDe._c = q; hienPhuDe(cau[q]); } }
      phuDe._c = -1; theoTiLe(0);
      var duPhong = function () {
        var dai = Math.max(2200, s.length * 62), bd = Date.now();
        (function nhip() { if (l !== luot) return; var r = (Date.now() - bd) / dai; if (r >= 1) return tiep(); theoTiLe(r); hen = setTimeout(nhip, 200); })();
      };
      if (AM[d.khoa]) {
        loa.src = "am/" + d.khoa + ".mp3";
        loa.ontimeupdate = function () { if (l === luot && loa.duration) theoTiLe(loa.currentTime / loa.duration); };
        loa.onended = function () { if (l === luot) hen = setTimeout(tiep, 350); };
        loa.onerror = function () { if (l === luot) duPhong(); };
        var p = loa.play(); if (p && p.catch) p.catch(function () { if (l === luot) duPhong(); });
      } else duPhong();
    })();
  }
  function doanCuaMan(m) {
    var a = [], L = m.loi || {};
    if (L.chinh) a.push({ khoa: m.id, chu: L.chinh, lo: (L.y && L.y[0] === null) ? 0 : null });
    (L.y || []).forEach(function (t, j) { if (t !== null) a.push({ khoa: m.id + "-y" + (j + 1), chu: t, lo: j }); });
    return a;
  }
  function docDap(m, sau) { if (m.loi && m.loi.dap) doc([{ khoa: m.id + "-dap", chu: m.loi.dap }], sau); else if (sau) sau(); }

  /* ---------------- khung ---------------- */
  var sanKhau = $("#san-khau"), nutTiep = $("#nut-tiep"), nutLui = $("#nut-lui");
  var hienTai = null;
  function veChang() {
    var c = $("#chang-thanh"); c.innerHTML = "";
    B.phan.forEach(function (ten, p) {
      var ds = M.filter(function (m) { return m.phan === p; });
      var xong = ds.filter(function (m) { return TT.xong[m.id]; }).length;
      var s = el("span", M[TT.i].phan === p ? "dang" : ""); s.title = ten;
      var i = el("i"); i.style.width = Math.round(xong / ds.length * 100) + "%"; s.appendChild(i); c.appendChild(s);
    });
  }
  function capNhatNut() {
    var m = M[TT.i], duoc = GV || TT.xong[m.id];
    nutTiep.disabled = !duoc || TT.i >= M.length - 1;
    nutTiep.classList.toggle("san", !!duoc && TT.i < M.length - 1);
    nutLui.disabled = TT.i === 0;
    $("#so-man").textContent = (TT.i + 1) + " / " + M.length + " · " + B.phan[m.phan];
  }
  function xongMan() {
    var m = M[TT.i];
    if (!TT.xong[m.id]) { TT.xong[m.id] = 1; luu(); veChang(); }
    capNhatNut();
    if (Object.keys(TT.xong).length >= M.length - 1) SCORM.hoanThanh();
  }
  function den(i) {
    if (i < 0 || i >= M.length) return;
    if (hienTai && hienTai.roi) hienTai.roi();
    dungDoc(); TT.i = i;
    if (i > 0 || TT.daBam) luu();
    var m = M[i], ve = VE[m.loai];
    sanKhau.innerHTML = ""; sanKhau.scrollTop = 0;
    var khung = el("section", "man");
    if (m.loai === "chuong") khung.className = "man man-chuong";
    if (m.loai !== "bia" && m.loai !== "chuong") {
      khung.appendChild(el("div", "nhan-phan", '<span class="cham"></span>' + B.phan[m.phan] + (m.chang ? " · " + m.chang : "")));
      khung.appendChild(el("h1", "tieu-de", m.tieuDe));
      if (m.dan) khung.appendChild(el("p", "dan", m.dan));
      if (m.anh) khung.appendChild(el("div", "anh-dau", '<img src="hinh/' + m.anh + '" alt="" onerror="this.parentNode.remove()">'));
    }
    sanKhau.appendChild(khung);
    hienTai = ve(m, khung) || {};
    if (m.cu) datCu(khung, m.cu);
    veChang(); capNhatNut(); veMucLuc();
    var doan = doanCuaMan(m);
    if (!QUAY && (m.loai !== "bia" || TT.daBam)) {
      doc(doan, function () { if (hienTai.docXong) hienTai.docXong(); }, hienTai.hien);
    }
  }
  nutTiep.onclick = function () { den(TT.i + 1); };
  nutLui.onclick = function () { den(TT.i - 1); };
  $("#nut-loa").onclick = function () { var m = M[TT.i]; doc(doanCuaMan(m), function () { if (hienTai.docXong) hienTai.docXong(); }, hienTai.hien); };
  $("#nut-cc").onclick = function () { ccBat = !ccBat; try { localStorage.setItem("matuy-cc", ccBat ? "1" : "0"); } catch (e) {} this.classList.toggle("tat", !ccBat); if (!ccBat) phuDe.classList.remove("hien"); };
  $("#nut-cc").classList.toggle("tat", !ccBat);
  $("#nut-giao-dien").onclick = function () {
    var r = document.documentElement, toi = r.getAttribute("data-theme") === "dark" || (!r.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    r.setAttribute("data-theme", toi ? "light" : "dark");
    try { localStorage.setItem("matuy-theme", toi ? "light" : "dark"); } catch (e) {}
  };
  try { var th = localStorage.getItem("matuy-theme"); if (th) document.documentElement.setAttribute("data-theme", th); } catch (e) {}
  document.addEventListener("keydown", function (e) {
    if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === "ArrowRight" && !nutTiep.disabled) den(TT.i + 1);
    if (e.key === "ArrowLeft" && TT.i > 0) den(TT.i - 1);
  });

  /* mục lục */
  var ml = $("#muc-luc");
  $("#nut-muc-luc").onclick = function () { ml.classList.add("mo"); };
  ml.onclick = function (e) { if (e.target === ml) ml.classList.remove("mo"); };
  function veMucLuc() {
    var n = $("#ngan-muc-luc"); n.innerHTML = "";
    var dong = el("button", "nut-tron dong-ml", "✕"); dong.onclick = function () { ml.classList.remove("mo"); }; n.appendChild(dong);
    n.appendChild(el("h2", "", "Mục lục"));
    B.phan.forEach(function (ten, p) {
      n.appendChild(el("h3", "", ten));
      M.forEach(function (m, i) {
        if (m.phan !== p) return;
        var b = el("button", "muc" + (i === TT.i ? " dang" : ""), '<span class="t">' + (TT.xong[m.id] ? "✔" : "○") + "</span><span>" + m.tieuDe + "</span>");
        b.onclick = function () { ml.classList.remove("mo"); den(i); };
        n.appendChild(b);
      });
    });
    var gv = el("label", "", '<input type="checkbox" ' + (GV ? "checked" : "") + '> Chế độ giáo viên / giám khảo (mở khóa nút Tiếp ở mọi màn)');
    gv.style.cssText = "display:flex;gap:8px;align-items:center;margin-top:18px;font-size:14px;color:var(--mo)";
    gv.querySelector("input").onchange = function () { GV = this.checked; capNhatNut(); };
    n.appendChild(gv);
    var lam = el("button", "nut phu", "↺ Học lại từ đầu"); lam.style.marginTop = "12px";
    lam.onclick = function () { if (confirm("Xóa tiến độ và học lại từ đầu?")) { TT = { i: 0, xong: {}, tl: {} }; luu(); ml.classList.remove("mo"); den(0); } };
    n.appendChild(lam);
  }

  /* ---------------- hiện ý theo lời (dùng chung) ---------------- */
  function boHien(phanTu, khiDu) {
    var da = -1;
    function hien(k) {
      for (var j = 0; j <= k && j < phanTu.length; j++) phanTu[j].classList.add("hien");
      if (k > da) da = k;
      if (da >= phanTu.length - 1 && khiDu) { khiDu(); khiDu = null; }
    }
    return { hien: hien, tiep: function () { hien(da + 1); } };
  }

  /* ================= CÁC KIỂU MÀN ================= */
  var VE = {};

  VE.bia = function (m, k) {
    var bia = el("div", "bia");
    var trai = el("div");
    trai.innerHTML = '<span class="nhan">' + B.chuDe + "</span>" +
      "<h1>MA TÚY<br><em>ĐỘI LỐT</em></h1>" +
      '<div class="phu">' + B.phuDe + "</div>" +
      "<dl><dt>Đối tượng</dt><dd>" + B.doiTuong + "</dd><dt>Thời lượng</dt><dd>" + B.thoiLuong + "</dd><dt>Mã sản phẩm</dt><dd>" + B.maSanPham + "</dd></dl>";
    var nut = el("button", "nut tiep", (TT.i > 0 || Object.keys(TT.xong).length > 1) ? "▶ Bắt đầu" : "▶ Bắt đầu");
    nut.onclick = function () {
      TT.daBam = 1; tieng("xong"); xongMan(); nut.disabled = true;
      doc(doanCuaMan(m), function () { den(1); });
    };
    trai.appendChild(nut);
    if (cu && cu.i > 1) {
      var tiepTuc = el("button", "nut phu", "⟳ Học tiếp (màn " + (cu.i + 1) + ")"); tiepTuc.style.marginLeft = "10px";
      tiepTuc.onclick = function () { TT.daBam = 1; den(cu.i); }; trai.appendChild(tiepTuc);
    }
    var phai = el("div", "hinh-bia", '<span class="vo">🍬🧋🎫</span><img src="hinh/bia.jpg" alt="" onerror="this.remove()"><img class="cu-bia" src="hinh/cu-chao.png" alt="Cú Tỉnh">');
    bia.appendChild(trai); bia.appendChild(phai); k.appendChild(bia);
    return {};
  };

  VE.danhsach = function (m, k) {
    var ds = el("div", "ds" + (m.kieu === "dendo" ? " dendo" : ""));
    var ys = m.y.map(function (y, j) {
      var o = el("div", "y" + (y[2] === "chot" ? " chot" : ""));
      o.innerHTML = (m.danhSo ? '<span class="so">' + (j + 1) + "</span>" : '<span class="bt">' + y[0] + "</span>") + "<div>" + y[1] + "</div>";
      ds.appendChild(o); return o;
    });
    k.appendChild(ds);
    if (m.loi && m.loi.y) k.appendChild(el("p", "bam-de-hien", "👆 Bấm vào khung để hiện ý tiếp theo nếu em muốn đi nhanh hơn."));
    var bh = boHien(ys, xongMan);
    ds.onclick = function () { bh.tiep(); };
    if (!(m.loi && m.loi.y)) setTimeout(function () { bh.hien(ys.length - 1); }, 300);
    return { hien: bh.hien, docXong: function () { bh.hien(ys.length - 1); } };
  };

  VE.khaosat = function (m, k) {
    var tl = TT.tl.ks = TT.tl.ks || [];
    m.cau.forEach(function (c, j) {
      var o = el("div", "ds-cau");
      o.appendChild(el("div", "hoi", '<span class="so">' + (j + 1) + "</span><span>" + c.hoi + "</span>"));
      var cap = el("div", "cap-nut");
      [["ĐÚNG", true], ["SAI", false]].forEach(function (p) {
        var b = el("button", "", p[0]);
        if (tl[j] === p[1]) b.classList.add("chon-trung");
        b.onclick = function () { tl[j] = p[1]; tieng("lat"); Array.prototype.forEach.call(cap.children, function (x) { x.classList.remove("chon-trung"); }); b.classList.add("chon-trung"); kiem(); };
        cap.appendChild(b);
      });
      o.appendChild(cap); k.appendChild(o);
    });
    var o6 = el("div", "ds-cau");
    o6.appendChild(el("div", "hoi", '<span class="so">6</span><span>' + m.tuTin + "</span>"));
    o6.appendChild(thangDiem(TT.tl.tuTin0, function (v) { TT.tl.tuTin0 = v; kiem(); }));
    k.appendChild(o6);
    function kiem() { luu(); if (m.cau.every(function (c, j) { return typeof tl[j] === "boolean"; }) && TT.tl.tuTin0) xongMan(); }
    kiem();
    return {};
  };
  function thangDiem(gt, khiChon) {
    var w = el("div"), t = el("div", "thang");
    for (var v = 1; v <= 5; v++) (function (v) {
      var b = el("button", gt === v ? "chon-roi" : "", String(v));
      b.onclick = function () { Array.prototype.forEach.call(t.children, function (x) { x.classList.remove("chon-roi"); }); b.classList.add("chon-roi"); tieng("lat"); khiChon(v); };
      t.appendChild(b);
    })(v);
    w.appendChild(t); w.appendChild(el("div", "thang-nhan", "<span>1 · Rất khó</span><span>5 · Hoàn toàn tự tin</span>"));
    return w;
  }

  VE.truyen = function (m, k) {
    var tr = el("div", "truyen");
    var ks = m.khung.map(function (f, j) {
      var o = el("div", "khung");
      o.innerHTML = '<div class="anh"><span class="so-khung">' + (j + 1) + "</span>" + f.bieuTuong + '<img src="' + f.hinh + '" alt="" onerror="this.remove()"></div><div class="loi-khung">' + f.chu + "</div>";
      tr.appendChild(o); return o;
    });
    k.appendChild(tr);
    var bh = boHien(ks, xongMan);
    tr.onclick = function () { bh.tiep(); };
    return { hien: bh.hien, docXong: function () { bh.hien(ks.length - 1); } };
  };

  VE.chonmo = function (m, k) {
    var c = el("div", "chon"), ph = el("div", "phan-hoi trung");
    m.chon.forEach(function (t, j) {
      var b = el("button", TT.tl.minh0 === j ? "chon-roi" : "", '<span class="ky">' + KY[j] + "</span><span>" + t + "</span>");
      b.onclick = function () {
        TT.tl.minh0 = j; tieng("lat");
        Array.prototype.forEach.call(c.children, function (x) { x.classList.remove("chon-roi"); }); b.classList.add("chon-roi");
        ph.innerHTML = "💭 " + m.phanHoi.replace("{X}", "<b>" + KY[j] + "</b>"); ph.classList.add("hien"); xongMan(); luu();
      };
      c.appendChild(b);
    });
    k.appendChild(c); k.appendChild(ph);
    if (TT.tl.minh0 != null) { ph.innerHTML = "💭 " + m.phanHoi.replace("{X}", "<b>" + KY[TT.tl.minh0] + "</b>"); ph.classList.add("hien"); xongMan(); }
    return {};
  };

  VE.latthe = function (m, k) {
    var l = el("div", "luoi"), da = 0;
    m.the.forEach(function (t) {
      var o = el("div", "lat");
      o.innerHTML = '<div class="trong"><div class="mat truoc">' + (t.hinh ? '<img class="anh-the" src="hinh/' + t.hinh + '" alt="">' : '<div class="bt">' + t.bieuTuong + '</div>') + '<div class="ten">' + t.ten + '</div></div><div class="mat sau"><div class="canh">⚠️</div><div>' + m.matSau + "</div></div></div>";
      o.onclick = function () { if (!o.classList.contains("mo")) { da++; tieng("lat"); } o.classList.toggle("mo"); if (da >= m.the.length) xongMan(); };
      l.appendChild(o);
    });
    k.appendChild(l);
    return {};
  };

  VE.xepnhom = function (m, k) {
    var kho = el("div", "kho"), xn = el("div", "xn"), cot = [], con = m.the.length;
    m.nhom.forEach(function (t, j) { var c = el("div", "cot c" + j, "<h3>" + t + "</h3>"); cot.push(c); xn.appendChild(c); });
    tron(m.the).forEach(function (t) {
      var o = el("div", "the-xn"); o.innerHTML = "<div>" + t.chu + "</div>"; o.dataset.dung = t.dung;
      var hai = el("div", "hai");
      [0, 1].forEach(function (j) {
        var b = el("button", "b" + j, m.nhom[j]);
        b.onclick = function (e) { dat(o, t, j, e); };
        hai.appendChild(b);
      });
      o.appendChild(hai);
      o.draggable = true;
      o.ondragstart = function (e) { e.dataTransfer.setData("text", ""); xn._keo = { o: o, t: t }; };
      kho.appendChild(o);
    });
    cot.forEach(function (c, j) {
      c.ondragover = function (e) { e.preventDefault(); };
      c.ondrop = function (e) { e.preventDefault(); if (xn._keo) dat(xn._keo.o, xn._keo.t, j, e); xn._keo = null; };
    });
    function dat(o, t, j, e) {
      if (t.dung !== j) { tieng("sai"); o.classList.remove("sai-lan"); void o.offsetWidth; o.classList.add("sai-lan"); noHoa("✗", e && e.clientX, e && e.clientY); return; }
      tieng("dung"); noHoa("✓", e && e.clientX, e && e.clientY);
      o.draggable = false; o.querySelector(".hai").remove(); o.appendChild(el("div", "giai", "💡 " + t.giai));
      cot[j].appendChild(o); con--;
      if (!con) { tieng("xong"); xongMan(); }
    }
    k.appendChild(el("p", "dan", "Kéo thẻ vào cột, hoặc bấm nút ngay dưới thẻ. Đặt sai, thẻ sẽ rung — hãy nghĩ lại!"));
    k.appendChild(kho); k.appendChild(xn);
    return {};
  };

  VE.nao = function (m, k) {
    var w = el("div", "nao"), sd = el("div", "so-do"), ben = el("div");
    sd.innerHTML = '<img class="anh-nao" src="hinh/nao.jpg" alt="Bộ não nhìn từ bên" onerror="this.outerHTML=NAO_SVG_">';
    var the = m.diem.map(function (d, j) {
      var t = el("div", "the-nao", "<h4>" + (j + 1) + ". " + d.ten + "</h4><div>" + d.chu + "</div>");
      ben.appendChild(t);
      var b = el("button", "diem " + d.mau, String(j + 1)); b.style.left = d.x + "%"; b.style.top = d.y + "%"; b.setAttribute("aria-label", d.ten);
      b.onclick = function () { tieng("lat"); b.classList.add("xong"); t.classList.add("hien"); kiem(); };
      sd.appendChild(b); t._b = b;
      return t;
    });
    function kiem() { if (the.every(function (t) { return t.classList.contains("hien"); })) xongMan(); }
    w.appendChild(sd); w.appendChild(ben); k.appendChild(w);
    return { hien: function (j) { if (the[j]) { the[j].classList.add("hien"); the[j]._b.classList.add("xong"); kiem(); } } };
  };
  window.NAO_SVG_ = null; var NAO_SVG = window.NAO_SVG_ = '<svg viewBox="0 0 400 300" role="img" aria-label="Sơ đồ bộ não nhìn từ bên"><defs><linearGradient id="gn" x1="0" x2="1"><stop offset="0" stop-color="#ffc9d1"/><stop offset="1" stop-color="#f7a8b8"/></linearGradient></defs>' +
    '<path d="M70 150 C60 90 110 45 175 42 C235 38 300 55 330 100 C355 135 345 185 310 205 C290 218 270 214 255 222 C245 245 222 262 195 255 C170 268 140 262 125 245 C95 245 72 215 70 185 Z" fill="url(#gn)" stroke="#c25570" stroke-width="4"/>' +
    '<path d="M110 95 C135 110 150 90 175 105 M150 70 C160 95 195 85 205 70 M215 60 C220 90 255 85 270 75 M120 140 C150 150 165 125 195 140 C215 152 240 130 265 140 M285 110 C300 130 290 150 310 165 M140 190 C165 180 180 205 210 190 C230 180 245 200 270 190" fill="none" stroke="#c25570" stroke-width="3" stroke-linecap="round" opacity=".55"/>' +
    '<path d="M255 222 C262 245 270 262 278 285" stroke="#c25570" stroke-width="12" stroke-linecap="round" fill="none"/>' +
    '<ellipse cx="100" cy="128" rx="44" ry="52" fill="#1f9d7a" opacity=".18"/><text x="58" y="30" font-size="16" fill="#5b6b86" font-family="Segoe UI, Arial">Phía trán ←</text></svg>';

  VE.dungsai = function (m, k) {
    if (m.giay) return dungSaiTungCau(m, k);
    var con = m.cau.length;
    m.cau.forEach(function (c, j) {
      var o = el("div", "ds-cau"), ph = el("div", "phan-hoi");
      o.appendChild(el("div", "hoi", '<span class="so">' + (j + 1) + "</span><span>" + c.hoi + "</span>"));
      var cap = el("div", "cap-nut");
      [["ĐÚNG", true, "d"], ["SAI", false, "s"]].forEach(function (p) {
        var b = el("button", p[2], p[0]); if (p[1] === c.dung) b.dataset.dung = 1;
        b.onclick = function (e) {
          var dung = p[1] === c.dung;
          tieng(dung ? "dung" : "sai"); noHoa(dung ? "✓" : "✗", e.clientX, e.clientY);
          Array.prototype.forEach.call(cap.children, function (x) { x.disabled = true; });
          b.classList.add(p[1] ? "chon-d" : "chon-s");
          ph.className = "phan-hoi hien " + (dung ? "dung" : "sai");
          ph.innerHTML = (dung ? "✅ Chính xác! " : "❌ Chưa đúng. ") + "Đáp án: <b>" + (c.dung ? "ĐÚNG" : "SAI") + "</b>. " + c.giai + (c.nguon ? '<span class="nguon">Căn cứ: ' + c.nguon + "</span>" : "");
          if (--con === 0) docDap(m, null), xongMan();
        };
        cap.appendChild(b);
      });
      o.appendChild(cap); o.appendChild(ph); k.appendChild(o);
    });
    return {};
  };
  function dungSaiTungCau(m, k) {
    var tp = el("div", "tp"), j = 0, dem = null, diem = 0;
    k.appendChild(tp);
    function ve() {
      clearInterval(dem);
      if (j >= m.cau.length) {
        tp.innerHTML = '<div class="bua">⚖️</div><div class="hoi">Em đã phán quyết đúng ' + diem + "/" + m.cau.length + " nhận định!</div>";
        tieng("xong"); docDap(m, null); xongMan(); return;
      }
      var c = m.cau[j], con = m.giay;
      tp.innerHTML = '<div class="so-cau">NHẬN ĐỊNH ' + (j + 1) + "/" + m.cau.length + '</div><div class="hoi">“' + c.hoi + '”</div>';
      var dh = el("div", "dong-ho", "⏱ <span>" + con + "</span> giây"); tp.insertBefore(dh, tp.firstChild);
      var cap = el("div", "cap-nut"), ph = el("div", "phan-hoi");
      function tra(chon, e) {
        clearInterval(dem);
        var dung = chon === c.dung;
        if (chon !== null) { tieng(dung ? "dung" : "sai"); noHoa(dung ? "✓" : "✗", e && e.clientX, e && e.clientY); } else tieng("sai");
        if (dung) diem++;
        Array.prototype.forEach.call(cap.children, function (x) { x.disabled = true; });
        ph.className = "phan-hoi hien " + (dung ? "dung" : "sai");
        ph.innerHTML = (chon === null ? "⏰ Hết giờ! " : dung ? "✅ Chính xác! " : "❌ Chưa đúng. ") + "Đáp án: <b>" + (c.dung ? "ĐÚNG" : "SAI") + "</b>. " + c.giai + '<span class="nguon">Căn cứ: ' + c.nguon + "</span>";
        var t = el("button", "nut", j < m.cau.length - 1 ? "Nhận định tiếp ▶" : "Xem kết quả ▶"); t.style.marginTop = "14px";
        t.onclick = function () { j++; ve(); }; tp.appendChild(t);
      }
      [["ĐÚNG", true, "d"], ["SAI", false, "s"]].forEach(function (p) {
        var b = el("button", p[2], p[0]); if (p[1] === c.dung) b.dataset.dung = 1; b.onclick = function (e) { b.classList.add(p[1] ? "chon-d" : "chon-s"); tra(p[1], e); }; cap.appendChild(b);
      });
      tp.appendChild(cap); tp.appendChild(ph);
      if (!QUAY) dem = setInterval(function () { con--; dh.querySelector("span").textContent = con; if (con <= 5 && con > 0) tieng("tick"); if (con <= 0) tra(null); }, 1000);
    }
    var bd = el("button", "nut tiep", "⚖️ Bắt đầu phiên tòa"); bd.onclick = function () { dungDoc(); ve(); };
    tp.appendChild(el("div", "bua", "👩‍⚖️")); tp.appendChild(bd);
    return { roi: function () { clearInterval(dem); } };
  }

  VE.thephapluat = function (m, k) {
    var g = el("div", "pl");
    var ts = m.the.map(function (t) {
      var o = el("div", "the", "<h3>" + t.bieuTuong + " " + t.ten + "</h3><p>" + t.chu + '</p><div class="nguon">' + t.nguon + "</div>");
      g.appendChild(o); return o;
    });
    k.appendChild(g);
    var them = el("div", "ghi-them", m.them); them.style.opacity = ".2"; k.appendChild(them);
    var bh = boHien(ts, function () { them.style.opacity = "1"; xongMan(); });
    ts.forEach(function (o, j) { o.onclick = function () { bh.hien(j); }; });
    k.appendChild(el("p", "bam-de-hien", "👆 Bấm vào từng thẻ để mở."));
    return { hien: bh.hien, docXong: function () { bh.hien(ts.length - 1); } };
  };

  VE.buoc = function (m, k) {
    var w = el("div", "buoc");
    var bs = m.y.map(function (y, j) { var o = el("div", "bac b" + j, '<div class="bt">' + y[0] + "</div><h3>" + (j + 1) + ". " + y[1] + "</h3><p>" + y[2] + "</p>"); w.appendChild(o); return o; });
    k.appendChild(w);
    var bh = boHien(bs, xongMan); w.onclick = function () { bh.tiep(); };
    k.appendChild(el("p", "bam-de-hien", "👆 Bấm để hiện bước tiếp theo."));
    return { hien: bh.hien, docXong: function () { bh.hien(bs.length - 1); } };
  };

  VE.chonlai = function (m, k) {
    var xong = 0;
    m.cau.forEach(function (c, j) {
      var o = el("div", "ds-cau"); o.appendChild(el("div", "hoi", '<span class="so">' + (j + 1) + "</span><span>" + c.tinhHuong + "</span>"));
      var ch = el("div", "chon"), ph = el("div", "phan-hoi");
      c.chon.forEach(function (p, q) {
        var b = el("button", "", '<span class="ky">' + KY[q] + "</span><span>" + p.chu + "</span>"); if (p.dung) b.dataset.dung = 1;
        b.onclick = function (e) {
          if (p.dung) {
            tieng("dung"); noHoa("✓", e.clientX, e.clientY); b.classList.add("dung");
            Array.prototype.forEach.call(ch.children, function (x) { x.disabled = true; });
            ph.className = "phan-hoi hien dung"; ph.innerHTML = "✅ " + p.giai;
            if (++xong === m.cau.length) { docDap(m, null); xongMan(); }
          } else {
            tieng("sai"); b.classList.add("sai"); b.disabled = true;
            ph.className = "phan-hoi hien sai"; ph.innerHTML = "❌ " + p.giai + " Hãy chọn lại!";
          }
        };
        ch.appendChild(b);
      });
      o.appendChild(ch); o.appendChild(ph); k.appendChild(o);
    });
    return {};
  };

  VE.tinhhuong = function (m, k) {
    var w = el("div", "th");
    var canh = el("div", "canh", m.bieuTuong + '<img src="' + m.hinh + '" alt="" onerror="this.remove()">');
    var phai = el("div"); phai.appendChild(el("div", "boi-canh", m.boiCanh));
    var ch = el("div", "chon"), ph = el("div", "phan-hoi");
    m.chon.forEach(function (p, q) {
      var b = el("button", "", '<span class="ky">' + KY[q] + "</span><span>" + p.chu + "</span>"); b.dataset.muc = p.muc;
      b.onclick = function (e) {
        b.classList.add(p.muc === "dung" ? "dung" : p.muc === "chua" ? "chua" : "sai");
        ph.className = "phan-hoi hien " + (p.muc === "dung" ? "dung" : p.muc === "chua" ? "trung" : "sai");
        ph.innerHTML = (p.muc === "dung" ? "✅ " : p.muc === "chua" ? "⚠️ Chưa an toàn. " : "❌ Hậu quả: ") + p.hau + (p.muc === "dung" ? "" : " <b>Hãy chọn lại!</b>");
        if (p.muc === "dung") {
          tieng("dung"); noHoa("✓", e.clientX, e.clientY);
          Array.prototype.forEach.call(ch.children, function (x) { x.disabled = true; });
          docDap(m, null); xongMan();
        } else { tieng("sai"); b.disabled = true; }
      };
      ch.appendChild(b);
    });
    phai.appendChild(ch); phai.appendChild(ph);
    w.appendChild(canh); w.appendChild(phai); k.appendChild(w);
    return {};
  };

  VE.vongtay = function (m, k) {
    var vt = el("div", "vt"), gt = TT.tl.vt = TT.tl.vt || [];
    m.o.forEach(function (o, j) {
      var l = el("label");
      l.appendChild(el("span", "", o.bieuTuong + " " + o.nhan));
      if (o.coDinh) l.appendChild(el("div", "co-dinh", o.coDinh));
      else {
        var i = el("input"); i.placeholder = "Tên, số điện thoại…"; i.value = gt[j] || "";
        i.oninput = function () { gt[j] = i.value; luu(); kiem(); };
        l.appendChild(i);
      }
      vt.appendChild(l);
    });
    k.appendChild(vt);
    var h = el("div", "hang-nut"), inNut = el("button", "nut xanh", "🖨️ In / lưu thẻ PDF");
    inNut.onclick = function () {
      var s = '<div class="the-in"><h2>🛡️ VÒNG TAY TIN CẬY CỦA EM</h2><ul>';
      m.o.forEach(function (o, j) { s += "<li><b>" + o.nhan + ":</b> " + (o.coDinh || gt[j] || "……………………………") + "</li>"; });
      s += "</ul><p><i>DỪNG – TỪ CHỐI – RỜI ĐI – BÁO TIN</i></p></div>";
      inRa(s);
    };
    h.appendChild(inNut); k.appendChild(h);
    k.appendChild(el("p", "bam-de-hien", "Điền ít nhất 2 ô để tiếp tục. Thông tin chỉ lưu trên máy của em."));
    function kiem() { if (gt.filter(function (x) { return x && x.trim(); }).length >= 2) xongMan(); }
    kiem();
    return {};
  };

  VE.kehoach = function (m, k) {
    var w = el("div", "kh"), kh = TT.tl.kh = TT.tl.kh || { ck: [], cau: "" };
    m.camKet.forEach(function (c, j) {
      var l = el("label", "ck"), i = el("input"); i.type = "checkbox"; i.checked = kh.ck.indexOf(j) >= 0;
      i.onchange = function () { if (i.checked) kh.ck.push(j); else kh.ck = kh.ck.filter(function (x) { return x !== j; }); luu(); kiem(); };
      l.appendChild(i); l.appendChild(el("span", "", c)); w.appendChild(l);
    });
    w.appendChild(el("p", "", "<b>✍️ Câu từ chối của riêng em:</b>"));
    var t = el("textarea"); t.rows = 2; t.placeholder = "Ví dụ: “Không, cảm ơn. Mình có hẹn rồi, mình đi trước nhé!”"; t.value = kh.cau;
    t.oninput = function () { kh.cau = t.value; luu(); kiem(); };
    w.appendChild(t); k.appendChild(w);
    var h = el("div", "hang-nut"), inNut = el("button", "nut xanh", "🖨️ In kế hoạch");
    inNut.onclick = function () {
      var s = '<div class="the-in"><h2>KẾ HOẠCH HÀNH ĐỘNG CỦA EM</h2><p>Em cam kết:</p><ul>';
      kh.ck.slice().sort().forEach(function (j) { s += "<li>" + m.camKet[j] + "</li>"; });
      s += "</ul><p><b>Câu từ chối của em:</b> " + (kh.cau || "……………………") + "</p><p>Ngày …… tháng …… năm ……  · Học sinh ký tên: ………………</p></div>";
      inRa(s);
    };
    h.appendChild(inNut); k.appendChild(h);
    function kiem() { if (kh.ck.length >= 3 && kh.cau.trim().length >= 5) xongMan(); }
    kiem();
    return {};
  };

  var THU = '<h3>Thư gửi cha mẹ</h3><p class="chao">Kính gửi cha mẹ thân yêu,</p>' +
    '<p>Hôm nay ở lớp, con được học bài <b>“Ma túy đội lốt – Tỉnh táo nhận diện, dũng cảm nói KHÔNG”</b>. Con biết rằng bây giờ ma túy có thể được trộn vào kẹo, bánh, trà sữa, nước uống, tinh dầu thuốc lá điện tử… và rất khó nhận ra bằng mắt thường.</p>' +
    '<p><b>Con đã học 5 “đèn đỏ” của một lời mời:</b> không rõ nguồn gốc; lời hứa “thần kỳ”; người mời lạ hoặc mới quen; bị thúc ép, khích tướng; được trả công cao bất thường để giữ hộ, giao hộ đồ.</p>' +
    '<p><b>Và 4 bước an toàn:</b> DỪNG – TỪ CHỐI – RỜI ĐI – BÁO TIN.</p>' +
    '<p><b>Con mong cha mẹ giúp con ba điều:</b></p><ol><li>Lắng nghe, trò chuyện với con mỗi ngày, không phán xét.</li><li>Biết bạn bè và những nơi con đến; khi con gọi nhờ đón, cha mẹ đón con trước, hỏi chuyện sau.</li><li>Liên hệ thầy cô chủ nhiệm khi thấy điều bất thường để cùng nhau giúp con.</li></ol>' +
    '<p>Con hứa sẽ luôn tỉnh táo và dũng cảm nói KHÔNG. Con cảm ơn cha mẹ!</p><p class="ky">Con của cha mẹ</p>' +
    '<div class="xac-nhan"><b>PHIẾU XÁC NHẬN CỦA GIA ĐÌNH</b><p>Gia đình đã đọc thư và cùng con thực hiện kế hoạch hành động phòng, chống ma túy.</p><p>Họ tên học sinh: ……………………………… Lớp: ………</p><p>Ngày …… tháng …… năm ……   Phụ huynh ký tên: ………………………</p></div>';
  VE.thu = function (m, k) {
    k.appendChild(el("div", "thu", THU));
    var h = el("div", "hang-nut"), b = el("button", "nut xanh", "🖨️ Tải / in thư");
    b.onclick = function () { inRa('<div class="the-in">' + THU + "</div>"); };
    h.appendChild(b); k.appendChild(h);
    xongMan();
    return {};
  };
  function inRa(html) { $("#in").innerHTML = html; setTimeout(function () { window.print(); }, 50); }

  VE.kiemtra = function (m, k) {
    var j = 0, tl = TT.tl.kt = [], w = el("div");
    k.appendChild(w);
    function ve() {
      w.innerHTML = "";
      if (j >= m.cau.length) return ket();
      var c = m.cau[j], dau = el("div", "kt-dau"), cham = el("div", "kt-cham");
      m.cau.forEach(function (_, q) { cham.appendChild(el("i", q < j ? (tl[q] ? "d" : "s") : q === j ? "n" : "")); });
      dau.appendChild(el("span", "", "CÂU " + (j + 1) + "/" + m.cau.length + (c.kieu === "ds" ? " · ĐÚNG/SAI" : c.kieu === "tn" ? " · TRẮC NGHIỆM" : " · SẮP XẾP")));
      dau.appendChild(cham); w.appendChild(dau);
      w.appendChild(el("div", "kt-hoi", c.hoi));
      var ph = el("div", "phan-hoi");
      function cham1(dung, e) {
        tl[j] = dung; luu();
        tieng(dung ? "dung" : "sai"); noHoa(dung ? "✓" : "✗", e && e.clientX, e && e.clientY);
        ph.className = "phan-hoi hien " + (dung ? "dung" : "sai");
        ph.innerHTML = (dung ? "✅ Chính xác! " : "❌ Chưa đúng. ") + c.giai;
        var t = el("button", "nut", j < m.cau.length - 1 ? "Câu tiếp ▶" : "Xem điểm ▶"); t.style.marginTop = "14px";
        t.onclick = function () { j++; ve(); }; w.appendChild(t);
      }
      if (c.kieu === "ds") {
        var cap = el("div", "cap-nut");
        [["ĐÚNG", true, "d"], ["SAI", false, "s"]].forEach(function (p) {
          var b = el("button", p[2], p[0]);
          if (p[1] === c.dung) b.dataset.dung = 1;
          b.onclick = function (e) { Array.prototype.forEach.call(cap.children, function (x) { x.disabled = true; }); b.classList.add(p[1] ? "chon-d" : "chon-s"); cham1(p[1] === c.dung, e); };
          cap.appendChild(b);
        });
        w.appendChild(cap);
      } else if (c.kieu === "tn") {
        var ch = el("div", "chon");
        c.chon.forEach(function (p, q) {
          var b = el("button", "", '<span class="ky">' + KY[q] + "</span><span>" + p + "</span>"); if (q === c.dap) b.dataset.dung = 1;
          b.onclick = function (e) {
            Array.prototype.forEach.call(ch.children, function (x, r) { x.disabled = true; if (r === c.dap) x.classList.add("dung"); });
            if (q !== c.dap) b.classList.add("sai");
            cham1(q === c.dap, e);
          };
          ch.appendChild(b);
        });
        w.appendChild(ch);
      } else {
        var o = el("div", "xep-o"), kq = el("div", "xep-ket"), seq = [];
        c.muc.forEach(function (t) {
          var b = el("button", "", t);
          b.onclick = function (e) {
            b.disabled = true; seq.push(t); kq.appendChild(el("span", "", seq.length + ". " + t)); tieng("lat");
            if (seq.length === c.muc.length) cham1(seq.join("|") === c.dungThuTu.join("|"), e);
          };
          o.appendChild(b);
        });
        w.appendChild(o); w.appendChild(kq);
      }
      w.appendChild(ph);
    }
    function ket() {
      var d = tl.filter(Boolean).length, dat = d >= m.dat;
      TT.tl.diem = d; luu();
      SCORM.ghiDiem(d, m.cau.length, dat);
      tieng("xong");
      w.innerHTML = '<div class="diem-to"><div class="so">' + d + "/" + m.cau.length + '</div><div class="nx">' + (dat ? "🎉 ĐẠT — em đã sẵn sàng tự bảo vệ mình!" : "Chưa đạt — xem lại các phần em làm sai rồi làm lại nhé.") + "</div></div>";
      var h = el("div", "hang-nut"), lai = el("button", "nut phu", "↺ Làm lại bài kiểm tra");
      lai.onclick = function () { j = 0; tl = TT.tl.kt = []; ve(); };
      h.appendChild(lai); w.appendChild(h);
      xongMan();
    }
    if (TT.tl.diem != null && TT.xong[m.id]) {
      var bd = el("button", "nut", "Làm bài kiểm tra"); bd.onclick = ve;
      w.appendChild(el("p", "", "Em đã làm bài: <b>" + TT.tl.diem + "/" + m.cau.length + "</b> điểm.")); w.appendChild(bd);
    } else ve();
    return {};
  };

  VE.ketqua = function (m, k) {
    var ks = TT.tl.ks || [], kt = TT.tl.kt || [], cauKs = M.filter(function (x) { return x.loai === "khaosat"; })[0].cau;
    var truoc = cauKs.filter(function (c, j) { return ks[j] === c.dung; }).length;
    var sau = kt.slice(0, 5).filter(Boolean).length;
    var d = TT.tl.diem != null ? TT.tl.diem : "–";
    var w = el("div", "kq"), trai = el("div"), phai = el("div");
    trai.innerHTML = '<div class="diem-to"><div class="so">' + d + '/10</div><div class="nx">Điểm kiểm tra cuối bài</div></div>';
    phai.appendChild(el("h3", "", "📈 Em đã thay đổi thế nào?"));
    var cs = el("div", "cot-ss");
    cs.innerHTML = '<div class="h truoc"><b>Đầu bài</b><div class="thanh"><i style="width:0"></i></div><span>' + truoc + '/5</span></div><div class="h sau"><b>Cuối bài</b><div class="thanh"><i style="width:0"></i></div><span>' + sau + "/5</span></div>";
    phai.appendChild(cs);
    setTimeout(function () { cs.querySelector(".truoc i").style.width = truoc * 20 + "%"; cs.querySelector(".sau i").style.width = sau * 20 + "%"; }, 120);
    phai.appendChild(el("p", "", "<b>Bây giờ</b>, em tự tin đến mức nào nếu phải từ chối lời mời từ một người bạn thân? <small>(đầu bài em chọn: " + (TT.tl.tuTin0 || "–") + ")</small>"));
    phai.appendChild(thangDiem(TT.tl.tuTin1, function (v) { TT.tl.tuTin1 = v; luu(); }));
    w.appendChild(trai); w.appendChild(phai); k.appendChild(w);

    var minh = M.filter(function (x) { return x.loai === "chonmo"; })[0];
    var hop = el("div", "ds-cau"); hop.style.marginTop = "18px";
    hop.appendChild(el("div", "hoi", "<span>🎂 Quay lại câu chuyện của Minh. Đầu bài em chọn <b>" + (TT.tl.minh0 != null ? KY[TT.tl.minh0] : "–") + "</b>. Bây giờ, em chọn lại?</span>"));
    var ch = el("div", "chon"), ket = el("div", "ket-minh", '<img src="hinh/ket-minh.jpg" alt="" class="anh-ket">🌟 <b>Cái kết của Minh:</b> ' + m.ketMinh);
    minh.chon.forEach(function (t, q) {
      var b = el("button", "", '<span class="ky">' + KY[q] + "</span><span>" + t + "</span>");
      b.onclick = function () {
        TT.tl.minh1 = q; luu();
        if (q === 3) { tieng("xong"); b.classList.add("dung"); Array.prototype.forEach.call(ch.children, function (x) { x.disabled = true; }); ket.classList.add("hien"); docDap(m, null); xongMan(); }
        else { tieng("sai"); b.classList.add("sai"); b.disabled = true; }
      };
      ch.appendChild(b);
    });
    hop.appendChild(ch); hop.appendChild(ket); k.appendChild(hop);
    return {};
  };

  VE.tongket = function (m, k) {
    var w = el("div", "tk");
    var os = m.y.map(function (y) { var o = el("div", "o", '<div class="bt">' + y[0] + "</div><h3>" + y[1] + "</h3><div>" + y[2] + "</div>"); w.appendChild(o); return o; });
    k.appendChild(w);
    setTimeout(xongMan, 1500);
    return {};
  };

  VE.chuong = function (m, k) {
    var nen = el("div", "chuong-nen"); nen.style.backgroundImage = "url('hinh/" + m.nen + "')";
    k.appendChild(nen);
    var nd = el("div", "chuong-nd");
    nd.innerHTML = '<div class="chuong-so">' + m.so + '</div><h1>' + m.tieuDe + '</h1><p class="chuong-phu">' + m.phu + '</p>' +
      '<ul class="chuong-ds">' + m.viec.map(function (v) { return "<li>" + v + "</li>"; }).join("") + "</ul>";
    var b = el("button", "nut tiep", "Bắt đầu chặng ▶"); b.onclick = function () { den(TT.i + 1); };
    nd.appendChild(b); k.appendChild(nd);
    xongMan();
    return {};
  };

  VE.video = function (m, k) {
    var P = (window.PHIM || {})[m.phim]; if (!P) { k.appendChild(el("p", "", "Thiếu video " + m.phim)); xongMan(); return {}; }
    var hoi = P.hoi.map(function (q) { return Object.assign({ da: false }, q); });
    var w = el("div", "vd-khung");
    w.innerHTML = '<video playsinline preload="auto" controls controlsList="nofullscreen nodownload noplaybackrate" disablePictureInPicture poster="video/' + m.phim + '.jpg">' +
      '<source src="video/' + m.phim + '.mp4" type="video/mp4"><track kind="subtitles" srclang="en" label="English" src="video/' + m.phim + '.en.vtt" default></video>' +
      '<div class="vd-hoi"></div><button class="vd-toan" title="Toàn màn hình">⛶</button>';
    k.appendChild(w);
    var v = w.querySelector("video"), ov = w.querySelector(".vd-hoi"), dangHoi = null;
    var thanh = el("div", "vd-thanh");
    var dem = el("span", "vd-dem"); thanh.appendChild(dem);
    var cc = el("button", "nut phu nho", "CC English: BẬT"); thanh.appendChild(cc);
    thanh.appendChild(el("span", "vd-nguon", "Nguồn: " + P.nguon));
    k.appendChild(thanh);
    function capDem() { dem.innerHTML = "❓ Câu hỏi trên video: <b>" + hoi.filter(function (q) { return q.da; }).length + "/" + hoi.length + "</b>"; }
    capDem();
    cc.onclick = function () { var t = v.textTracks[0]; t.mode = t.mode === "showing" ? "hidden" : "showing"; cc.textContent = "CC English: " + (t.mode === "showing" ? "BẬT" : "TẮT"); };
    w.querySelector(".vd-toan").onclick = function () { if (document.fullscreenElement) document.exitFullscreen(); else if (w.requestFullscreen) w.requestFullscreen(); };
    v.addEventListener("play", function () { dungDoc(); });
    function canChan() { for (var j = 0; j < hoi.length; j++) if (!hoi[j].da) return hoi[j]; return null; }
    v.addEventListener("seeking", function () {
      var q = canChan(); if (q && v.currentTime > q.luc + 0.2) v.currentTime = Math.max(0, q.luc - 0.05);
    });
    v.addEventListener("timeupdate", function () {
      if (dangHoi) return;
      var q = canChan(); if (q && v.currentTime >= q.luc) { v.pause(); hien(q); }
    });
    v.addEventListener("ended", function () { if (!canChan()) { tieng("xong"); xongMan(); } });
    function hien(q) {
      dangHoi = q; ov.innerHTML = ""; ov.classList.add("mo");
      var the = el("div", "vd-the");
      the.appendChild(el("div", "vd-nhan", q.kieu === "doan" ? "🔮 DỰ ĐOÁN" : "⏸ CÂU HỎI"));
      the.appendChild(el("div", "vd-cau", q.hoi));
      var ch = el("div", "chon"), ph = el("div", "phan-hoi");
      q.chon.forEach(function (c, j) {
        var b = el("button", "", '<span class="ky">' + KY[j] + "</span><span>" + c + "</span>");
        b.onclick = function (e) {
          var dung = j === q.dap;
          if (q.kieu === "doan") {
            Array.prototype.forEach.call(ch.children, function (x) { x.disabled = true; });
            b.classList.add(dung ? "dung" : "chua"); tieng(dung ? "dung" : "lat");
            ph.className = "phan-hoi hien " + (dung ? "dung" : "trung"); ph.innerHTML = (dung ? "🎯 Dự đoán chính xác! " : "🤔 Hãy xem tiếp để kiểm chứng! ") + q.giai;
            xong(q, dung);
          } else if (dung) {
            Array.prototype.forEach.call(ch.children, function (x) { x.disabled = true; });
            b.classList.add("dung"); tieng("dung"); noHoa("✓", e.clientX, e.clientY);
            ph.className = "phan-hoi hien dung"; ph.innerHTML = "✅ Chính xác! " + q.giai; xong(q, !q.sai);
          } else { q.sai = 1; b.classList.add("sai"); b.disabled = true; tieng("sai"); ph.className = "phan-hoi hien sai"; ph.innerHTML = "❌ Chưa đúng — chọn lại nhé!"; }
        };
        ch.appendChild(b);
      });
      the.appendChild(ch); the.appendChild(ph); ov.appendChild(the);
    }
    function xong(q, dungNgay) {
      q.da = true; capDem();
      var kq = TT.tl.vd = TT.tl.vd || {}; kq[m.id + q.luc] = dungNgay ? 1 : 0; luu();
      var t = el("button", "nut tiep", "Xem tiếp ▶"); t.style.marginTop = "12px";
      t.onclick = function () { ov.classList.remove("mo"); dangHoi = null; v.play(); };
      ov.querySelector(".vd-the").appendChild(t);
    }
    if (TT.xong[m.id]) hoi.forEach(function (q) { q.da = true; }), capDem();
    return { roi: function () { try { v.pause(); } catch (e) {} } };
  };

  VE.nguon = function (m, k) {
    var w = el("div", "nguon-ds");
    m.nhom.forEach(function (n) { w.appendChild(el("h3", "", n[0])); var ol = el("ol"); n[1].forEach(function (t) { ol.appendChild(el("li", "", t)); }); w.appendChild(ol); });
    k.appendChild(w); xongMan();
    return {};
  };

  /* ---------------- khởi động ---------------- */
  window.ELEARN = { den: den, TT: function () { return TT; } };
  if (QUAY) {
    var thanhQ = el("div", "quay-cap"); document.body.appendChild(thanhQ);
    var demQ = el("div", "quay-dem"); document.body.appendChild(demQ);
    window.QUAY = {
      den: function (id) { var i = M.findIndex(function (m) { return m.id === id; }); den(i); var c = $(".cu-goc .bong"); return i; },
      hien: function (k) { if (hienTai && hienTai.hien) hienTai.hien(k); },
      cap: function (ai, chu) {
        if (!chu) { thanhQ.classList.remove("mo"); return; }
        thanhQ.className = "quay-cap mo " + (ai === "C" ? "cu" : "vien");
        thanhQ.innerHTML = (ai === "C" ? '<img src="hinh/cu-chi.png" alt="">' : '<span class="av-vien">👩‍🏫</span>') + '<b>' + (ai === "C" ? "Cú Tỉnh" : "Cô giáo") + '</b><span class="song"><i></i><i></i><i></i><i></i></span>';
      },
      vua: function () {
        var k = $(".man"); if (!k) return 1; k.style.zoom = 1; sanKhau.scrollTop = 0;
        var cao = sanKhau.clientHeight - 6, z = Math.min(1, cao / k.scrollHeight);
        z = Math.max(0.55, z); k.style.zoom = z; return z;
      },
      dem: function (n, chu) { if (!n) { demQ.classList.remove("mo"); return; } demQ.className = "quay-dem mo"; demQ.innerHTML = '<div class="so">' + n + '</div><div>' + (chu || "Em hãy suy nghĩ…") + "</div>"; },
      cuon: function (sel) { var k = $(".man"); if (k && k.scrollHeight * (parseFloat(k.style.zoom) || 1) <= sanKhau.clientHeight + 4) return; var e = typeof sel === "string" ? $(sel) : sel; if (e) e.scrollIntoView({ block: "center" }); },
      dat: function (o) { Object.keys(o).forEach(function (k) { TT.tl[k] = o[k]; }); },
      cu: function (tu) { cuDoi(tu); },
      $: $
    };
  }
  den(TT.i > 0 && TT.daBam ? TT.i : 0);
})();
