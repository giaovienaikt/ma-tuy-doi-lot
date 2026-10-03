/* Nội dung bài e-learning "Ma túy đội lốt" — NGUỒN DUY NHẤT cho màn hình, lời đọc (am/loi) và giáo án.
   loi.chinh: đọc khi vào màn · loi.y[i]: đọc khi ý thứ i hiện ra · loi.dap: đọc khi học sinh đã trả lời xong.
   Thẻ cảm xúc [warm] [calm] [curious] [bright] chỉ dành cho giọng đọc, phụ đề tự bỏ. KHÔNG dùng [clear]. */
window.BAI = {
  ten: "MA TÚY ĐỘI LỐT",
  phuDe: "Tỉnh táo nhận diện – Dũng cảm nói KHÔNG",
  chuDe: "Chủ đề giáo dục phòng, chống ma túy (dạy học tích hợp)",
  doiTuong: "Học sinh trung học phổ thông",
  thoiLuong: "45 phút (1 tiết)",
  maSanPham: "……………",
  phan: ["MỞ ĐẦU", "KHỞI ĐỘNG", "KHÁM PHÁ", "LUYỆN TẬP", "VẬN DỤNG", "ĐÁNH GIÁ"],

  man: [
    /* ======================= MỞ ĐẦU ======================= */
    {
      id: "m00", phan: 0, loai: "bia", tieuDe: "Bìa",
      loi: { chinh: "[warm] Chào các em. Một viên kẹo, một ly nước, một món quà nhỏ… tưởng chừng vô hại. Nhưng hôm nay, chúng ta sẽ học cách nhìn kỹ hơn một chút, để không bao giờ trở thành nạn nhân của ma túy đội lốt. Bấm Bắt đầu nhé!" }
    },
    {
      id: "m01", cu: { tu: "cu-chao", noi: "Mình là Cú Tỉnh — cùng học nhé!" }, phan: 0, loai: "danhsach", tieuDe: "Hướng dẫn học",
      bieuTuong: "🧭",
      y: [
        ["🎧", "Đeo tai nghe hoặc bật loa để nghe lời giảng."],
        ["▶", "Nghe hết lời giảng và làm xong nhiệm vụ, nút TIẾP sẽ sáng lên."],
        ["🔊", "Bấm biểu tượng loa để nghe lại; CC để bật/tắt phụ đề."],
        ["☰", "Mục lục ở góc trên: xem em đang ở chặng nào của bài."],
        ["💾", "Bài tự lưu chỗ em đang học — lần sau mở lại sẽ học tiếp."]
      ],
      loi: { chinh: "Bài học gồm năm chặng: khởi động, khám phá, luyện tập, vận dụng và kiểm tra. Ở mỗi màn, các em nghe hết lời giảng, làm xong nhiệm vụ thì nút Tiếp sẽ sáng lên. Có chỗ nào chưa rõ, bấm biểu tượng loa để nghe lại." }
    },
    {
      id: "m02", cu: { tu: "cu-chi", noi: "5 điều em sẽ làm được!" }, phan: 0, loai: "danhsach", tieuDe: "Mục tiêu bài học", dan: "Sau bài học, em sẽ:",
      bieuTuong: "🎯", danhSo: true,
      y: [
        ["🔍", "Nhận diện được các dấu hiệu nguy cơ của ma túy đội lốt trong đồ ăn, đồ uống, vật phẩm."],
        ["🧠", "Giải thích được vì sao ma túy đặc biệt nguy hại với bộ não tuổi vị thành niên."],
        ["⚖️", "Nêu được một số quy định pháp luật hiện hành về phòng, chống ma túy và trách nhiệm pháp lý của người từ đủ 16 tuổi."],
        ["🛡️", "Thực hiện được 4 bước an toàn: DỪNG – TỪ CHỐI – RỜI ĐI – BÁO TIN."],
        ["🤝", "Lập được kế hoạch hành động và “vòng tay tin cậy” của bản thân."]
      ],
      loi: { chinh: "[calm] Đây là năm điều các em sẽ làm được sau bài học. Điều quan trọng nhất không nằm ở việc nhớ bao nhiêu kiến thức, mà là khi gặp tình huống thật, các em biết dừng lại, biết nói không, và biết tìm ai để giúp đỡ." }
    },
    {
      id: "m03", cu: { tu: "cu-suy-nghi", noi: "Cứ trả lời thật lòng nhé!" }, phan: 0, loai: "khaosat", tieuDe: "Em nghĩ sao? — Khảo sát đầu vào",
      dan: "Chọn Đúng hoặc Sai. Không tính điểm — cuối bài em sẽ so sánh lại.",
      cau: [
        { hoi: "Ma túy chỉ có dạng bột trắng hoặc viên nén, nhìn là nhận ra.", dung: false },
        { hoi: "Dùng thử một lần thì không sao cả.", dung: false },
        { hoi: "Người từ đủ 16 tuổi phải chịu trách nhiệm hình sự về mọi tội phạm.", dung: true },
        { hoi: "Thấy bạn có biểu hiện lạ, em nên báo cho cả lớp biết để mọi người cảnh giác.", dung: false },
        { hoi: "Khi được mời đồ ăn, đồ uống lạ, cách an toàn nhất là từ chối, rời đi và báo người tin cậy.", dung: true }
      ],
      tuTin: "Em tự tin đến mức nào nếu phải từ chối lời mời từ một người bạn thân?",
      loi: { chinh: "Trước khi học, hãy thử trả lời sáu câu hỏi nhỏ. Không có điểm, không ai chấm. Cuối bài, các em sẽ gặp lại những câu này và tự thấy mình đã thay đổi thế nào." }
    },

    /* ======================= KHỞI ĐỘNG ======================= */
    {
      id: "c1", phan: 1, loai: "chuong", so: "CHẶNG 1", tieuDe: "Khởi động", phu: "Ma túy đang tìm đến ai?", nen: "nen-khoi-dong.jpg",
      viec: ["🎬 Xem phóng sự: con số đáng lo ngại", "📖 Truyện tranh: Bữa tiệc sinh nhật của Minh", "🤔 Nếu là Minh, em chọn gì?"],
      cu: { tu: "cu-chao", noi: "Chào các em! Mình là Cú Tỉnh — người bạn đồng hành của các em hôm nay!" },
      loi: { chinh: "[warm] Chào các em, mình là Cú Tỉnh, người bạn đồng hành của các em trong bài học hôm nay. Chặng một: khởi động. Chúng ta sẽ xem ma túy đang tìm đến ai, và cùng theo dõi câu chuyện của Minh." }
    },
    {
      id: "v1", phan: 1, loai: "video", phim: "v1", tieuDe: "Video: Ma túy đang nhắm vào học sinh",
      dan: "Bấm ▶ để xem. Video sẽ tự dừng khi có câu hỏi — trả lời xong mới xem tiếp được.",
      cu: { tu: "cu-kinh-lup", noi: "Chú ý con số trong phóng sự nhé!" },
      loi: { chinh: "Bấm nút phát để xem phóng sự. Video sẽ tự dừng khi có câu hỏi, các em trả lời xong là xem tiếp được." }
    },
    {
      id: "m04", cu: { tu: "cu-suy-nghi", noi: "Chú ý từng chi tiết…" }, phan: 1, loai: "truyen", tieuDe: "Bữa tiệc sinh nhật",
      khung: [
        { hinh: "hinh/truyen-1.jpg", bieuTuong: "🎂", chu: "Minh (lớp 11) đến dự sinh nhật một bạn cùng lớp." },
        { hinh: "hinh/truyen-2.jpg", bieuTuong: "🍬", chu: "Một anh lạ mặt mở túi kẹo dẻo không nhãn: “Kẹo nhập khẩu, ăn vào vui cả đêm!”" },
        { hinh: "hinh/truyen-3.jpg", bieuTuong: "🥤", chu: "Anh ta rót nước trái cây từ một chai cũng không có nhãn." },
        { hinh: "hinh/truyen-4.jpg", bieuTuong: "👀", chu: "Cả nhóm nhìn Minh: “Thử đi, có gì đâu!”" }
      ],
      loi: {
        chinh: "[warm] Tối thứ Bảy, Minh đến dự sinh nhật một bạn cùng lớp. Không khí rất vui.",
        y: [
          null,
          "Giữa buổi, một anh lạ mặt, nghe nói là bạn của bạn chủ tiệc, mở ra một túi kẹo dẻo nhiều màu. Túi không có nhãn. Anh ta cười: kẹo nhập khẩu, ăn vào vui cả đêm.",
          "Rồi anh ta rót thêm cho mọi người những ly nước trái cây, từ một cái chai cũng không có nhãn.",
          "[curious] Cả nhóm quay sang nhìn Minh. Thử đi, có gì đâu! Nếu là Minh, em sẽ làm gì?"
        ]
      }
    },
    {
      id: "m05", cu: { tu: "cu-suy-nghi", noi: "Không có điểm — cứ chọn thật lòng!" }, phan: 1, loai: "chonmo", tieuDe: "Nếu là Minh, em chọn gì?",
      dan: "Chọn một cách. Không có điểm — cuối bài chúng ta sẽ quay lại câu chuyện của Minh.",
      chon: [
        "Ăn thử một viên cho vui, chắc không sao.",
        "Cầm về nhà, để lúc khác tính.",
        "Hỏi cho rõ kẹo này là gì rồi mới quyết định.",
        "Từ chối, rời khỏi nhóm đó và nói với người lớn đáng tin."
      ],
      phanHoi: "Em đã chọn phương án {X}. Hãy nhớ lựa chọn này — cuối bài chúng ta sẽ quay lại câu chuyện của Minh."
    },

    /* ======================= KHÁM PHÁ ======================= */
    {
      id: "c2", phan: 2, loai: "chuong", so: "CHẶNG 2", tieuDe: "Khám phá", phu: "Ma túy đội lốt — bộ não — pháp luật", nen: "nen-kham-pha.jpg",
      viec: ["🔍 A. Nhận diện ma túy đội lốt", "🧠 B. Ma túy tấn công bộ não thế nào?", "⚖️ C. Pháp luật nói gì?"],
      cu: { tu: "cu-kinh-lup", noi: "Cầm kính lúp lên nào — ta đi điều tra!" },
      loi: { chinh: "[curious] Chặng hai: khám phá. Cầm kính lúp lên nào! Chúng ta sẽ điều tra xem ma túy đội lốt ra sao, nó tấn công bộ não thế nào, và pháp luật nói gì." }
    },
    {
      id: "v2", phan: 2, chang: "Chặng A · Nhận diện", loai: "video", phim: "v2", tieuDe: "Video: Ma túy đội lốt bánh quy, kẹo dẻo",
      dan: "Video sẽ tự dừng 3 lần. Lần đầu là câu DỰ ĐOÁN — em cứ đoán, rồi xem tiếp để kiểm chứng.",
      cu: { tu: "cu-kinh-lup", noi: "Lần dừng đầu là câu dự đoán — cứ mạnh dạn đoán nhé!" },
      loi: { chinh: "Phóng sự sau đây cho thấy ma túy đang được ngụy trang tinh vi thế nào. Lần dừng đầu tiên là câu dự đoán, các em cứ mạnh dạn đoán nhé." }
    },
    {
      id: "v3", phan: 2, chang: "Chặng A · Nhận diện", loai: "video", phim: "v3", tieuDe: "Video: Cảnh báo ma túy “nước vui”",
      dan: "Một đoạn ngắn — cuối video có 1 câu hỏi.",
      cu: { tu: "cu-kinh-lup", noi: "Nghe kỹ hậu quả nhé!" },
      loi: { chinh: "Thêm một loại ma túy đội lốt nữa: nước vui. Nghe kỹ hậu quả nhé." }
    },
    {
      id: "m06", cu: { tu: "cu-kinh-lup", noi: "Lật hết 6 thẻ nhé!" }, phan: 2, chang: "Chặng A · Nhận diện", loai: "latthe", tieuDe: "Ma túy không còn là “bột trắng”",
      dan: "Bấm vào từng thẻ để lật.",
      the: [
        { bieuTuong: "🍬", ten: "Kẹo dẻo, sô-cô-la", hinh: "the-keo.jpg" },
        { bieuTuong: "🧋", ten: "Gói bột pha nước, trà sữa, nước pha sẵn", hinh: "the-tra-sua.jpg" },
        { bieuTuong: "🎫", ten: "Tem giấy nhỏ in hình hoạt hình", hinh: "the-tem.jpg" },
        { bieuTuong: "💨", ten: "Tinh dầu thuốc lá điện tử", hinh: "the-vape.jpg" },
        { bieuTuong: "🍪", ten: "Bánh ngọt, bánh quy", hinh: "the-banh.jpg" },
        { bieuTuong: "🌿", ten: "Gói “trà”, “thảo mộc” lạ", hinh: "the-thao-moc.jpg" }
      ],
      matSau: "Có thể bị trộn chất ma túy hoặc chất gây nghiện. Người dùng không biết mình đã đưa vào cơ thể chất gì, bao nhiêu.",
      loi: { chinh: "[calm] Nhiều người vẫn nghĩ ma túy là một gói bột trắng, trông là biết ngay. Thực tế bây giờ khác rồi. Các loại ma túy tổng hợp và chất gây nghiện mới thường được trộn vào những thứ quen thuộc nhất: kẹo, bánh, nước uống, tinh dầu thuốc lá điện tử, hay một mẩu tem giấy in hình dễ thương. Vì sao kẻ xấu làm vậy? Vì vỏ bọc càng vô hại, người trẻ càng mất cảnh giác. Và nguy hiểm nhất là: người dùng không hề biết mình vừa đưa vào cơ thể chất gì, với liều lượng bao nhiêu. Hãy lật từng thẻ để xem." }
    },
    {
      id: "m07", cu: { tu: "cu-canh-bao", noi: "1 đèn đỏ = đủ lý do để từ chối!" }, phan: 2, chang: "Chặng A · Nhận diện", loai: "danhsach", kieu: "dendo",
      tieuDe: "Đừng đoán “nó là gì” — hãy nhìn “hoàn cảnh”", dan: "5 ĐÈN ĐỎ CỦA MỘT LỜI MỜI",
      y: [
        ["🔴", "<b>Không rõ nguồn gốc:</b> không nhãn mác, bao bì lạ, đã mở sẵn."],
        ["🔴", "<b>Lời hứa “thần kỳ”:</b> vui cả đêm, phê, tỉnh táo học bài, giảm cân, hết buồn."],
        ["🔴", "<b>Người mời lạ hoặc mới quen;</b> nơi mời là tiệc tùng, quán xá, phòng kín."],
        ["🔴", "<b>Bị thúc ép, khích tướng:</b> “Không dám à?”, “Thử một lần thôi”."],
        ["🔴", "<b>Trả công cao bất thường</b> để cầm hộ, giữ hộ, giao hộ một món đồ."],
        ["💡", "<b>Chỉ cần MỘT đèn đỏ</b> là đủ lý do để từ chối — em không cần biết món đó có ma túy hay không.", "chot"]
      ],
      loi: {
        chinh: "[warm] Đến đây, có thể các em sẽ hỏi: vậy làm sao phân biệt kẹo thường với kẹo có ma túy? Câu trả lời là: đừng cố phân biệt. Bằng mắt thường, không ai làm được, kể cả người lớn. Thay vì đoán món đồ là gì, hãy nhìn vào hoàn cảnh của lời mời.",
        y: [
          "Đèn đỏ thứ nhất: món đồ không rõ nguồn gốc, không nhãn mác, hoặc đã bị mở sẵn.",
          "Thứ hai: lời hứa nghe quá hay, như vui cả đêm, tỉnh táo học bài, giảm cân thần tốc.",
          "Thứ ba: người mời là người lạ, hoặc mới quen, trong một buổi tiệc, một quán xá hay một căn phòng kín.",
          "Thứ tư: em bị thúc ép, bị khích tướng, kiểu như không dám à, thử một lần thôi.",
          "Và thứ năm: ai đó trả công cao bất thường chỉ để em cầm hộ, giữ hộ hay giao hộ một món đồ.",
          "[calm] Hãy nhớ: chỉ cần thấy một đèn đỏ, em đã có đủ lý do để từ chối."
        ]
      }
    },
    {
      id: "m08", cu: { tu: "cu-chi", noi: "Em làm người gác cổng!" }, phan: 2, chang: "Chặng A · Nhận diện", loai: "xepnhom", tieuDe: "Trò chơi: Đèn đỏ hay đèn xanh?",
      dan: "Đưa mỗi tình huống vào đúng cột: 🟢 AN TOÀN hay 🔴 NGUY CƠ.",
      nhom: ["🟢 AN TOÀN", "🔴 NGUY CƠ"],
      the: [
        { chu: "Mẹ mua bánh ở tiệm quen, có hóa đơn.", dung: 0, giai: "Nguồn gốc rõ ràng, người thân mua." },
        { chu: "Bạn quen trên mạng gửi tặng “kẹo giảm căng thẳng” qua shipper.", dung: 1, giai: "Người lạ + không rõ nguồn gốc + lời hứa “thần kỳ”: ba đèn đỏ." },
        { chu: "Ly nước của em để trên bàn lúc em đi vệ sinh, quay lại uống tiếp.", dung: 1, giai: "Đồ uống rời khỏi tầm mắt có thể bị bỏ thêm chất lạ — hãy gọi ly mới." },
        { chu: "Chai nước còn nguyên nắp, em tự mua ở cửa hàng.", dung: 0, giai: "Còn niêm phong, em tự mua." },
        { chu: "Anh khóa trên nhờ giữ hộ một túi đồ, trả 500 nghìn.", dung: 1, giai: "Trả công cao bất thường cho việc giữ hộ — đèn đỏ số 5." },
        { chu: "Thầy cô phát kẹo thưởng trong lớp.", dung: 0, giai: "Người tin cậy, nơi an toàn, kẹo có bao bì." },
        { chu: "Người lạ mời hút thử vape “vị trái cây”.", dung: 1, giai: "Thuốc lá điện tử đã bị cấm; tinh dầu trôi nổi có thể bị trộn ma túy." },
        { chu: "Thuốc do bác sĩ kê đơn, dùng đúng chỉ dẫn.", dung: 0, giai: "Có chỉ định của bác sĩ." }
      ],
      loi: { chinh: "Bây giờ, đến lượt các em làm người gác cổng. Có tám tình huống. Hãy đưa mỗi tình huống vào đúng cột: an toàn, hay nguy cơ. Nhớ dùng năm đèn đỏ vừa học." }
    },
    {
      id: "v4", phan: 2, chang: "Chặng B · Bộ não", loai: "video", phim: "v4", tieuDe: "Video: Bác sĩ nói gì về ma túy tổng hợp?",
      dan: "Video sẽ tự dừng 2 lần để em trả lời.",
      cu: { tu: "cu-kinh-lup", noi: "Bác sĩ sắp giải thích vì sao “thử một lần” cũng nguy hiểm!" },
      loi: { chinh: "Hãy nghe bác sĩ giải thích vì sao ma túy tổng hợp nguy hiểm đến vậy, kể cả khi chỉ dùng một ít." }
    },
    {
      id: "m09", cu: { tu: "cu-suy-nghi", noi: "Bấm vào 3 điểm sáng!" }, phan: 2, chang: "Chặng B · Bộ não", loai: "nao", tieuDe: "Bộ não tuổi teen đang “thi công”",
      dan: "Bấm vào 3 điểm sáng trên bộ não.",
      diem: [
        { x: 34, y: 50, ten: "Vùng “PHANH”", chu: "Vỏ não trước trán: giúp suy nghĩ, cân nhắc, kiềm chế. Hoàn thiện muộn nhất — khoảng 25 tuổi.", mau: "xanh" },
        { x: 55, y: 50, ten: "Vùng “CHÂN GA”", chu: "Hệ thống tưởng thưởng: tạo cảm giác hứng khởi — rất nhạy ở tuổi teen.", mau: "do" },
        { x: 63, y: 66, ten: "Vùng “TRÍ NHỚ”", chu: "Hồi hải mã: ghi nhớ, học tập mỗi ngày.", mau: "vang" }
      ],
      loi: {
        chinh: "[curious] Vì sao người trẻ dễ bị ma túy cuốn vào hơn người lớn? Câu trả lời nằm ngay trong bộ não của các em. Ở tuổi các em, bộ não vẫn đang được xây dựng, giống một công trình đang thi công.",
        y: [
          "Vùng phía trước trán, có thể gọi là cái phanh, giúp mình suy nghĩ trước khi làm. Vùng này hoàn thiện muộn nhất, phải đến khoảng hai mươi lăm tuổi.",
          "Trong khi đó, hệ thống tưởng thưởng, tức là cái chân ga, lại rất nhạy ở tuổi teen. Ga mạnh mà phanh chưa ăn, nên chỉ một lời rủ rê cũng dễ khiến mình làm liều.",
          "Còn vùng trí nhớ là nơi các em học bài, ghi nhớ mỗi ngày."
        ]
      }
    },
    {
      id: "m10", cu: { tu: "cu-canh-bao", noi: "Ma túy “hack” não như thế này…" }, phan: 2, chang: "Chặng B · Bộ não", loai: "danhsach", tieuDe: "Ma túy “hack” bộ não như thế nào?",
      y: [
        ["⚡", "Ép não giải phóng ồ ạt chất tạo hưng phấn → não <b>“chai”</b> với niềm vui bình thường → muốn dùng tiếp → <b>lệ thuộc</b>."],
        ["🌀", "Ma túy tổng hợp có thể gây <b>ảo giác, hoang tưởng, loạn thần</b> — có khi ngay từ lần đầu."],
        ["❤️", "Tim đập nhanh, tăng huyết áp, co giật; chất pha trộn không rõ liều có thể gây <b>ngộ độc, nguy hiểm tính mạng</b>."],
        ["📉", "Trí nhớ, khả năng tập trung giảm; <b>học tập sa sút</b>, các mối quan hệ đổ vỡ."]
      ],
      loi: {
        chinh: "[calm] Ma túy giống như một kẻ hack vào bộ não. Nó ép não tiết ra thật nhiều chất tạo cảm giác hưng phấn, nhiều hơn hẳn mọi niềm vui bình thường.",
        y: [
          "Sau đó, não bị chai đi. Những niềm vui quen thuộc như đi chơi với bạn, được điểm cao, không còn đủ sức làm mình vui nữa. Muốn vui, lại phải dùng tiếp. Đó chính là con đường dẫn đến lệ thuộc.",
          "Với ma túy tổng hợp, nguy hiểm còn đến nhanh hơn: ảo giác, hoang tưởng, loạn thần, có khi ngay từ lần đầu sử dụng.",
          "Cơ thể cũng chịu trận: tim đập nhanh, huyết áp tăng, co giật. Và vì là hàng pha trộn, không ai biết liều lượng bao nhiêu, nên ngộ độc có thể xảy ra bất cứ lúc nào.",
          "Cuối cùng là cái giá cho tương lai: trí nhớ kém đi, học hành sa sút, những người thân yêu dần rời xa."
        ]
      }
    },
    {
      id: "m11", cu: { tu: "cu-suy-nghi", noi: "Ngộ nhận hay sự thật?" }, phan: 2, chang: "Chặng B · Bộ não", loai: "dungsai", tieuDe: "Ngộ nhận hay sự thật?",
      dan: "Mỗi câu nói dưới đây ĐÚNG hay SAI?",
      cau: [
        { hoi: "“Thử một lần thì không sao.”", dung: false, giai: "Một lần đã có thể gây ngộ độc, loạn thần; lần đầu thường là cánh cửa dẫn đến những lần sau." },
        { hoi: "“Ma túy giúp tỉnh táo, học bài tốt hơn.”", dung: false, giai: "Cảm giác tỉnh táo chỉ là tạm thời; sau đó là mệt lả, mất ngủ, giảm trí nhớ và lệ thuộc." },
        { hoi: "“Loại ‘thảo mộc’, ‘tự nhiên’ thì vô hại.”", dung: false, giai: "Nhiều loại gắn mác thảo mộc thực chất được tẩm chất ma túy tổng hợp, còn nguy hiểm hơn." }
      ],
      loi: { dap: "Cả ba câu đều sai. Và đây cũng chính là ba câu kẻ xấu hay dùng nhất để rủ rê. Khi nghe ai đó nói thử một lần thôi, tỉnh táo lắm, hay hàng thảo mộc mà, các em hãy nhận ra: đó là một đèn đỏ." }
    },
    {
      id: "m12", cu: { tu: "cu-chi", noi: "Bấm từng thẻ để mở." }, phan: 2, chang: "Chặng C · Pháp luật", loai: "thephapluat", tieuDe: "Pháp luật nói gì?",
      the: [
        { bieuTuong: "⚖️", ten: "Nghiêm cấm", chu: "Sử dụng, tàng trữ, vận chuyển, mua bán trái phép chất ma túy; lôi kéo, dụ dỗ, xúi giục, cưỡng bức người khác sử dụng.", nguon: "Luật Phòng, chống ma túy số 120/2025/QH15; Bộ luật Hình sự" },
        { bieuTuong: "🎂", ten: "Tuổi chịu trách nhiệm hình sự", chu: "Từ đủ 16 tuổi: chịu trách nhiệm hình sự về <b>mọi tội phạm</b>. Từ đủ 14 đến dưới 16 tuổi: chịu trách nhiệm về tội phạm rất nghiêm trọng, đặc biệt nghiêm trọng, <b>trong đó có các tội về ma túy</b>.", nguon: "Điều 12 Bộ luật Hình sự" },
        { bieuTuong: "🚫", ten: "Sử dụng trái phép", chu: "Bị cảnh cáo hoặc phạt tiền 1–2 triệu đồng, bị quản lý, có thể phải cai nghiện. Từ 01/7/2025, người đang hoặc đã cai nghiện mà tái sử dụng có thể bị <b>phạt tù</b>.", nguon: "Nghị định 282/2025/NĐ-CP; Điều 256a Bộ luật Hình sự" },
        { bieuTuong: "🤝", ten: "Không kỳ thị — được bảo vệ khi báo tin", chu: "Kỳ thị người sử dụng, người cai nghiện, người sau cai nghiện bị xử phạt. Người phát hiện, tố giác hành vi vi phạm được pháp luật bảo vệ, giữ bí mật.", nguon: "Nghị định 282/2025/NĐ-CP; Luật Phòng, chống ma túy" }
      ],
      them: "➕ Thuốc lá điện tử, thuốc lá nung nóng bị cấm từ năm 2025 (Nghị quyết 173/2024/QH15).",
      loi: {
        chinh: "[calm] Pháp luật về ma túy vừa có nhiều thay đổi quan trọng. Luật Phòng, chống ma túy năm 2025 có hiệu lực từ ngày một tháng bảy năm hai nghìn không trăm hai mươi sáu. Hãy cùng xem từng thẻ.",
        y: [
          "Thẻ thứ nhất: pháp luật nghiêm cấm sử dụng, tàng trữ, vận chuyển, mua bán trái phép chất ma túy, và cả việc lôi kéo, dụ dỗ người khác sử dụng. Nghĩa là rủ bạn dùng thử cũng là vi phạm pháp luật.",
          "Thẻ thứ hai rất quan trọng với học sinh trung học phổ thông. Theo Bộ luật Hình sự, người từ đủ mười sáu tuổi phải chịu trách nhiệm hình sự về mọi tội phạm. Đừng nghĩ chưa đủ mười tám tuổi thì không sao. Ngay cả từ mười bốn tuổi, các tội về ma túy đã có thể bị xử lý hình sự.",
          "Thẻ thứ ba: người sử dụng trái phép chất ma túy bị cảnh cáo hoặc phạt tiền, bị quản lý, có thể phải cai nghiện. Và từ năm hai nghìn không trăm hai mươi lăm, người đã cai nghiện mà còn tái sử dụng có thể phải đi tù.",
          "[warm] Thẻ cuối cùng mang một thông điệp nhân văn: pháp luật xử phạt hành vi kỳ thị người đang cai nghiện, và bảo vệ người dũng cảm báo tin. Chúng ta chống ma túy, chứ không chống người lỡ sa vào nó."
        ]
      }
    },
    {
      id: "m13", cu: { tu: "cu-chi", noi: "Mỗi câu 20 giây — nhanh tay!" }, phan: 2, chang: "Chặng C · Pháp luật", loai: "dungsai", tieuDe: "Trò chơi: Thẩm phán nhí", giay: 20,
      dan: "Mỗi nhận định 20 giây. Hãy phán quyết: ĐÚNG hay SAI?",
      cau: [
        { hoi: "Mình mới 16 tuổi, chưa đủ 18 nên không bị xử lý hình sự.", dung: false, giai: "Từ đủ 16 tuổi đã phải chịu trách nhiệm hình sự về mọi tội phạm.", nguon: "Điều 12 BLHS" },
        { hoi: "Chỉ giữ hộ bạn một gói nhỏ thì không phạm luật.", dung: false, giai: "Biết là ma túy mà vẫn cất giữ là tàng trữ trái phép chất ma túy. Nguyên tắc an toàn: không nhận giữ hộ đồ không rõ nguồn gốc.", nguon: "Điều 249 BLHS" },
        { hoi: "Rủ bạn cùng dùng thử là chuyện riêng của mỗi người.", dung: false, giai: "Lôi kéo, dụ dỗ người khác sử dụng trái phép chất ma túy là tội phạm, bị xử nặng hơn khi người bị rủ dưới 18 tuổi.", nguon: "Điều 258 BLHS" },
        { hoi: "Từ 01/7/2025, có trường hợp chỉ sử dụng trái phép chất ma túy cũng bị xử lý hình sự.", dung: true, giai: "Người đang hoặc đã cai nghiện mà tái sử dụng có thể bị phạt tù từ 2 đến 3 năm; tái phạm từ 3 đến 5 năm.", nguon: "Điều 256a BLHS" },
        { hoi: "Chế giễu, xa lánh bạn đang cai nghiện là quyền của mỗi người.", dung: false, giai: "Kỳ thị người cai nghiện bị xử phạt. Hãy động viên để bạn trở lại.", nguon: "Nghị định 282/2025/NĐ-CP" },
        { hoi: "Thuốc lá điện tử bị cấm sử dụng ở Việt Nam từ năm 2025.", dung: true, giai: "Quốc hội cấm sản xuất, kinh doanh, nhập khẩu, tàng trữ, vận chuyển, sử dụng thuốc lá điện tử, thuốc lá nung nóng từ năm 2025.", nguon: "Nghị quyết 173/2024/QH15" }
      ],
      loi: {
        chinh: "Bây giờ các em là thẩm phán. Có sáu nhận định, mỗi câu hai mươi giây. Hãy phán quyết: đúng hay sai?",
        dap: "Câu khiến nhiều bạn nhầm nhất thường là câu số một và số hai. Chưa đủ mười tám tuổi không có nghĩa là được miễn trách nhiệm. Và giữ hộ một món đồ lạ có thể biến em thành người vi phạm pháp luật lúc nào không hay."
      }
    },

    /* ======================= LUYỆN TẬP ======================= */
    {
      id: "c3", phan: 3, loai: "chuong", so: "CHẶNG 3", tieuDe: "Luyện tập", phu: "Kỹ năng an toàn — Em chọn, em chịu", nen: "nen-luyen-tap.jpg",
      viec: ["🛡️ 4 bước: DỪNG – TỪ CHỐI – RỜI ĐI – BÁO TIN", "🗣️ Câu từ chối nào hiệu quả?", "🎬 3 tình huống thật, mỗi lựa chọn một kết cục"],
      cu: { tu: "cu-chi", noi: "Mỗi ngã rẽ là một lựa chọn — chọn khôn ngoan nhé!" },
      loi: { chinh: "[warm] Chặng ba: luyện tập. Mỗi ngã rẽ là một lựa chọn, và mỗi lựa chọn dẫn đến một kết cục. Hãy học bốn bước an toàn rồi thử sức với ba tình huống thật." }
    },
    {
      id: "m14", cu: { tu: "cu-canh-bao", noi: "Nhớ thứ tự 4 bước nhé!" }, phan: 3, loai: "buoc", tieuDe: "4 bước an toàn",
      y: [
        ["✋", "DỪNG", "Nhận ra đèn đỏ. Hít một hơi. Không vội cầm, không vội nếm."],
        ["🗣️", "TỪ CHỐI", "Nói “KHÔNG” rõ ràng, nhìn thẳng, không cần giải thích dài. Bị ép thì nhắc lại — kỹ thuật “đĩa xước”."],
        ["🚶", "RỜI ĐI", "Rời khỏi chỗ đó, đi cùng bạn tin cậy, gọi người nhà đến đón."],
        ["📞", "BÁO TIN", "Kể với cha mẹ, thầy cô chủ nhiệm, phòng tư vấn tâm lý. Khẩn cấp: gọi 113. Kể điều em đã thấy, đã nghe — không phán xét, không đăng lên mạng."]
      ],
      loi: {
        chinh: "[warm] Biết đèn đỏ rồi, giờ là lúc học cách hành động. Chỉ có bốn bước, dễ nhớ như một chiếc cầu thang.",
        y: [
          "Bước một: dừng lại. Khi thấy đèn đỏ, hãy hít một hơi. Đừng vội cầm, đừng vội nếm. Mọi quyết định sai thường đến từ sự vội vàng.",
          "Bước hai: từ chối. Nói không thật rõ ràng, nhìn thẳng vào người đối diện. Em không cần giải thích dài dòng. Nếu bị ép, cứ nhắc lại đúng câu đó, như một chiếc đĩa bị xước.",
          "Bước ba: rời đi. Đừng nán lại để chứng tỏ mình can đảm. Rời khỏi chỗ đó, đi cùng một người bạn tin cậy, hoặc gọi người nhà đến đón.",
          "Bước bốn: báo tin. Hãy kể với cha mẹ, thầy cô chủ nhiệm hoặc phòng tư vấn tâm lý. Nếu khẩn cấp, gọi một một ba. Em chỉ cần kể lại điều mình đã thấy, đã nghe. Không phán xét ai, và đừng đăng lên mạng xã hội."
        ]
      }
    },
    {
      id: "m15", cu: { tu: "cu-suy-nghi", noi: "Vừa từ chối, vừa giữ tình bạn?" }, phan: 3, loai: "chonlai", tieuDe: "Câu từ chối nào hiệu quả nhất?",
      cau: [
        {
          tinhHuong: "Bị khích tướng: “Không dám thử à? Nhát thế!”",
          chon: [
            { chu: "“Ừ thì thử một miếng thôi.”", giai: "Nhượng bộ — đúng như điều kẻ xấu muốn." },
            { chu: "“Không, mình không dùng. Mình về đây.”", dung: true, giai: "Ngắn, rõ, kèm hành động rời đi." },
            { chu: "“Để mình suy nghĩ thêm đã.”", giai: "Chưa an toàn: để ngỏ cơ hội cho người kia tiếp tục ép." }
          ]
        },
        {
          tinhHuong: "Bạn thân rủ: “Tụi mình thân mà, thử với tớ một lần cho biết.”",
          chon: [
            { chu: "“Chính vì thân nên tớ không muốn cậu thử. Đi ăn kem đi!”", dung: true, giai: "Giữ tình bạn, nói không với hành vi, gợi ý việc khác." },
            { chu: "“Cậu mà thử thì tớ nghỉ chơi, tớ kể với cả lớp.”", giai: "Chưa phù hợp: đe dọa, bêu riếu khiến bạn xa lánh và giấu giếm hơn." },
            { chu: "“Thôi được, một lần thôi nhé.”", giai: "Tình bạn thật không đòi em phải liều." }
          ]
        }
      ],
      loi: { dap: "Một câu từ chối tốt có ba phần: chữ không rõ ràng, một lý do ngắn nếu muốn, và một hành động tiếp theo như rời đi hoặc rủ làm việc khác. Với bạn thân, hãy từ chối cái hành vi, chứ không từ chối người bạn." }
    },
    {
      id: "v6", phan: 3, loai: "video", phim: "v6", tieuDe: "Video: Nhận giao hộ — vô tình thành “chân rết”",
      dan: "Video sẽ dừng 1 lần để em dự đoán lời khuyến cáo của công an.",
      cu: { tu: "cu-kinh-lup", noi: "Chuyện có thật — xem rồi đoán xem công an khuyên gì!" },
      loi: { chinh: "Trước tình huống đầu tiên, hãy xem một vụ việc có thật: một người giao hàng vô tình chở ma túy cho kẻ xấu." }
    },
    {
      id: "m16", cu: { tu: "cu-suy-nghi", noi: "Có mấy đèn đỏ ở đây?" }, phan: 3, loai: "tinhhuong", tieuDe: "Em chọn, em chịu · Tình huống 1: Việc nhẹ lương cao",
      hinh: "hinh/th-1.jpg", bieuTuong: "📱",
      boiCanh: "Tin nhắn từ một tài khoản lạ: <i>“Em ơi, giao giúp anh một gói hàng nhỏ, cách 2 cây số, trả 300 nghìn. Không cần hỏi gì, xong việc anh chuyển khoản liền.”</i>",
      chon: [
        { chu: "Nhận lời — việc dễ mà tiền nhiều.", hau: "Em có thể đang vận chuyển trái phép chất ma túy cho kẻ xấu. Khi bị phát hiện, em chính là người cầm hàng (Điều 250 BLHS).", muc: "sai" },
        { chu: "Hỏi xem trong gói có gì rồi mới nhận.", hau: "Kẻ xấu sẽ nói dối. Câu “không cần hỏi gì” và mức trả công cao đã là hai đèn đỏ.", muc: "chua" },
        { chu: "Không nhận, chặn tài khoản, chụp màn hình và kể với cha mẹ, thầy cô.", hau: "An toàn! Em vừa bảo vệ mình, vừa giúp người lớn ngăn chặn kẻ xấu.", muc: "dung" }
      ],
      loi: {
        chinh: "[curious] Một buổi tối, em nhận được tin nhắn từ một tài khoản lạ: giao giúp một gói hàng nhỏ, trả ba trăm nghìn, không cần hỏi gì. Em sẽ làm gì?",
        dap: "Hãy để ý hai đèn đỏ: trả công cao bất thường, và câu không cần hỏi gì. Kẻ buôn bán ma túy rất hay thuê người trẻ làm việc vận chuyển, vì nghĩ các em dễ dụ và ít bị nghi ngờ. Từ chối, chặn, lưu bằng chứng, và báo người lớn. Đó là cách vừa bảo vệ mình, vừa bảo vệ người khác."
      }
    },
    {
      id: "v5", phan: 3, loai: "video", phim: "v5", tieuDe: "Video: Đằng sau những ca ngộ độc thuốc lá điện tử",
      dan: "Video sẽ tự dừng 2 lần để em trả lời.",
      cu: { tu: "cu-kinh-lup", noi: "Ghi nhận thật tại bệnh viện — xem kỹ nhé!" },
      loi: { chinh: "Đây là những hình ảnh ghi nhận tại bệnh viện. Xem kỹ để hiểu vì sao một hơi vape lạ có thể rất nguy hiểm." }
    },
    {
      id: "m17", cu: { tu: "cu-suy-nghi", noi: "Mùi trái cây có an toàn hơn không?" }, phan: 3, loai: "tinhhuong", tieuDe: "Tình huống 2: Chiếc vape chuyền tay",
      hinh: "hinh/th-2.jpg", bieuTuong: "💨",
      boiCanh: "Ở quán cà phê, nhóm bạn chuyền tay một chiếc thuốc lá điện tử “vị dưa hấu”: <i>“Hút thử đi, nhẹ lắm, toàn mùi trái cây.”</i>",
      chon: [
        { chu: "Hút một hơi cho hòa đồng.", hau: "Thuốc lá điện tử đã bị cấm; tinh dầu không rõ nguồn gốc có thể chứa ma túy. Đã có những ca phải cấp cứu sau khi hút.", muc: "sai" },
        { chu: "“Mình không hút đâu.” Đổi chủ đề hoặc ra về; nếu ai đó có biểu hiện bất thường, báo người lớn.", hau: "An toàn! Em giữ được mình mà không cần căng thẳng với nhóm.", muc: "dung" },
        { chu: "Xin ít tinh dầu mang về xem thử.", hau: "Em đang cất giữ một sản phẩm bị cấm, không rõ thành phần — rất nguy hiểm.", muc: "sai" }
      ],
      loi: {
        chinh: "Ở quán cà phê, nhóm bạn chuyền tay nhau một chiếc thuốc lá điện tử vị dưa hấu. Thử đi, nhẹ lắm. Em chọn cách nào?",
        dap: "Mùi trái cây không làm cho nó an toàn hơn. Thuốc lá điện tử đã bị cấm từ năm hai nghìn không trăm hai mươi lăm, và tinh dầu trôi nổi có thể bị trộn chất ma túy mà người hút không hề hay biết."
      }
    },
    {
      id: "m18", cu: { tu: "cu-suy-nghi", noi: "Đừng đoán, đừng gán nhãn!" }, phan: 3, loai: "tinhhuong", tieuDe: "Tình huống 3: Bạn thân dạo này “lạ” lắm",
      hinh: "hinh/th-3.jpg", bieuTuong: "😔",
      boiCanh: "Lan là bạn thân của em. Mấy tuần nay Lan hay mệt, ngủ gật trong lớp, bỏ buổi tập câu lạc bộ, ít nói chuyện.",
      chon: [
        { chu: "Đăng story bóng gió: “Có đứa dính ma túy rồi đấy.”", hau: "Gán nhãn khi chưa biết sự thật, làm tổn thương bạn, có thể vi phạm pháp luật vì xúc phạm, kỳ thị.", muc: "sai" },
        { chu: "Lục cặp, điện thoại của Lan để tìm bằng chứng.", hau: "Xâm phạm riêng tư của bạn. Em không có trách nhiệm điều tra.", muc: "sai" },
        { chu: "Hỏi han riêng, lắng nghe; rủ Lan gặp thầy cô chủ nhiệm hoặc phòng tư vấn tâm lý; kể với người lớn tin cậy những thay đổi em thấy.", hau: "Đúng! Quan tâm, lắng nghe và kết nối bạn với người có chuyên môn.", muc: "dung" },
        { chu: "Rủ cả nhóm tránh xa Lan cho an toàn.", hau: "Cô lập khiến bạn càng cô đơn và dễ gặp nguy hơn.", muc: "sai" }
      ],
      loi: {
        chinh: "[warm] Tình huống cuối cùng khó hơn. Lan, bạn thân của em, mấy tuần nay rất khác: hay mệt, bỏ tập, ít nói. Em lo lắng. Em sẽ làm gì?",
        dap: "Đây là điều rất quan trọng: đừng tự đoán, đừng gán nhãn. Một người bạn mệt mỏi, thu mình có thể vì rất nhiều lý do: áp lực học tập, chuyện gia đình, bệnh tật, hay một nỗi buồn chưa nói ra. Việc của em không phải là điều tra hay kết luận, mà là quan tâm, lắng nghe, và đưa bạn đến với người lớn có chuyên môn. Đó mới là người bạn thật sự."
      }
    },

    /* ======================= VẬN DỤNG ======================= */
    {
      id: "c4", phan: 4, loai: "chuong", so: "CHẶNG 4", tieuDe: "Vận dụng", phu: "Vòng tay tin cậy — kế hoạch của riêng em", nen: "nen-van-dung.jpg",
      viec: ["🤝 Vẽ vòng tay tin cậy của em", "📝 Lập kế hoạch hành động", "💌 Thư gửi cha mẹ"],
      cu: { tu: "cu-vui", noi: "Không ai phải đối mặt một mình!" },
      loi: { chinh: "[warm] Chặng bốn: vận dụng. Không ai phải đối mặt một mình. Các em sẽ vẽ vòng tay tin cậy, lập kế hoạch hành động và gửi một lá thư cho cha mẹ." }
    },
    {
      id: "m19", cu: { tu: "cu-vui", noi: "Em không bao giờ một mình!" }, phan: 4, loai: "vongtay", anh: "vong-tay.jpg", tieuDe: "Vòng tay tin cậy của em",
      dan: "Viết tên hoặc cách liên lạc của những người em có thể tìm đến.",
      o: [
        { bieuTuong: "🏠", nhan: "Người thân trong gia đình" },
        { bieuTuong: "👩‍🏫", nhan: "Thầy cô em tin tưởng" },
        { bieuTuong: "🧑‍🤝‍🧑", nhan: "Người bạn đáng tin" },
        { bieuTuong: "💬", nhan: "Phòng tư vấn tâm lý của trường" },
        { bieuTuong: "🚨", nhan: "Khẩn cấp", coDinh: "113 (Công an) · 111 (Tổng đài quốc gia bảo vệ trẻ em)" }
      ],
      loi: { chinh: "[warm] Không ai phải đối mặt một mình. Hãy viết tên những người em có thể tìm đến bất cứ lúc nào. Đây là vòng tay tin cậy của em. In ra, hoặc chụp lại, và giữ nó bên mình." }
    },
    {
      id: "m20", cu: { tu: "cu-chi", noi: "Chọn ít nhất 3 cam kết." }, phan: 4, loai: "kehoach", tieuDe: "Kế hoạch hành động của em",
      dan: "Chọn ít nhất 3 cam kết em làm được ngay, rồi viết câu từ chối của riêng em.",
      camKet: [
        "Không nhận, không thử đồ ăn, đồ uống, vật phẩm không rõ nguồn gốc.",
        "Không rời mắt khỏi ly nước của mình ở nơi đông người.",
        "Không nhận giữ hộ, giao hộ đồ cho người lạ.",
        "Không dùng thuốc lá điện tử.",
        "Chia sẻ 5 đèn đỏ với gia đình trong tuần này.",
        "Rủ bạn bè tham gia hoạt động thể thao, nghệ thuật lành mạnh."
      ],
      loi: { chinh: "Kiến thức chỉ có ý nghĩa khi biến thành hành động. Hãy chọn ít nhất ba cam kết em làm được ngay, và viết một câu từ chối của riêng mình, theo cách nói của em." }
    },
    {
      id: "m21", cu: { tu: "cu-vui", noi: "Đọc thư cùng cha mẹ nhé!" }, phan: 4, loai: "thu", anh: "gia-dinh.jpg", tieuDe: "Thư gửi cha mẹ",
      dan: "Nhiệm vụ về nhà: đọc thư cùng cha mẹ, nộp lại phiếu xác nhận cho giáo viên.",
      loi: { chinh: "Gia đình là vòng tay gần nhất. Hãy tải lá thư này về, đọc cùng cha mẹ, và mang phiếu xác nhận nộp lại cho thầy cô nhé." }
    },

    /* ======================= ĐÁNH GIÁ ======================= */
    {
      id: "v7", phan: 4, loai: "video", phim: "v7", tieuDe: "Video: Không là không!",
      dan: "Lắng nghe thông điệp từ một người đã chiến thắng ma túy.",
      cu: { tu: "cu-kinh-lup", noi: "Thông điệp này rất đáng nhớ!" },
      loi: { chinh: "Trước khi sang chặng cuối, hãy lắng nghe thông điệp từ một người đã từng sa vào ma túy và chiến thắng nó." }
    },
    {
      id: "c5", phan: 5, loai: "chuong", so: "CHẶNG 5", tieuDe: "Đánh giá", phu: "Em đã sẵn sàng tự bảo vệ mình chưa?", nen: "nen-danh-gia.jpg",
      viec: ["✅ 10 câu kiểm tra", "📈 So sánh trước – sau bài học", "🌟 Cái kết của Minh"],
      cu: { tu: "cu-suy-nghi", noi: "Bình tĩnh — em làm được mà!" },
      loi: { chinh: "[bright] Chặng cuối: đánh giá. Mười câu hỏi, và một bất ngờ nhỏ ở cuối bài. Bình tĩnh nhé, các em làm được mà!" }
    },
    {
      id: "m22", cu: { tu: "cu-suy-nghi", noi: "Bình tĩnh — em làm được!" }, phan: 5, loai: "kiemtra", tieuDe: "Kiểm tra cuối bài", dat: 8,
      dan: "10 câu, mỗi câu 1 điểm. Đạt từ 8 điểm là em đã sẵn sàng tự bảo vệ mình!",
      cau: [
        { kieu: "ds", hoi: "Ma túy chỉ có dạng bột trắng hoặc viên nén, nhìn là nhận ra.", dung: false, giai: "Ma túy có thể đội lốt kẹo, bánh, nước uống, tinh dầu, tem giấy… không nhìn bằng mắt mà nhận ra được." },
        { kieu: "ds", hoi: "Dùng thử một lần thì không sao cả.", dung: false, giai: "Một lần đã có thể gây ngộ độc, loạn thần và mở đường cho lệ thuộc." },
        { kieu: "ds", hoi: "Người từ đủ 16 tuổi phải chịu trách nhiệm hình sự về mọi tội phạm.", dung: true, giai: "Điều 12 Bộ luật Hình sự." },
        { kieu: "ds", hoi: "Thấy bạn có biểu hiện lạ, em nên báo cho cả lớp biết để mọi người cảnh giác.", dung: false, giai: "Không gán nhãn, không loan tin. Hãy quan tâm và kể riêng với người lớn tin cậy." },
        { kieu: "ds", hoi: "Khi được mời đồ ăn, đồ uống lạ, cách an toàn nhất là từ chối, rời đi và báo người tin cậy.", dung: true, giai: "Đó chính là 4 bước DỪNG – TỪ CHỐI – RỜI ĐI – BÁO TIN." },
        { kieu: "tn", hoi: "Dấu hiệu nào sau đây là “đèn đỏ” của một lời mời?", chon: ["Bánh có hóa đơn, mua ở tiệm quen.", "Chai nước còn nguyên nắp.", "Được hứa “ăn vào vui cả đêm”.", "Thuốc do bác sĩ kê đơn."], dap: 2, giai: "Lời hứa “thần kỳ” là đèn đỏ số 2." },
        { kieu: "tn", hoi: "Người lạ thuê em giao một gói hàng, trả công cao, dặn “không cần hỏi gì”. Em nên làm gì?", chon: ["Từ chối, chặn tài khoản, lưu bằng chứng và báo người lớn.", "Nhận, nhưng hỏi kỹ trong gói có gì.", "Nhận, vì không biết thì không có tội.", "Rủ bạn đi cùng cho an toàn."], dap: 0, giai: "Trả công cao + “không cần hỏi gì” là hai đèn đỏ; em có thể bị lợi dụng vận chuyển ma túy." },
        { kieu: "tn", hoi: "Vì sao tuổi vị thành niên dễ bị ma túy cuốn vào hơn?", chon: ["Vì tim yếu hơn người lớn.", "Vì vùng não “phanh” chưa hoàn thiện trong khi hệ “tưởng thưởng” rất nhạy.", "Vì trí nhớ tốt hơn người lớn.", "Vì cơ thể đào thải chất nhanh hơn."], dap: 1, giai: "Ga mạnh mà phanh chưa ăn — vùng vỏ não trước trán hoàn thiện khoảng 25 tuổi." },
        { kieu: "tn", hoi: "Hành vi nào sau đây bị pháp luật xử phạt?", chon: ["Động viên bạn đang cai nghiện.", "Báo tin cho công an khi phát hiện mua bán ma túy.", "Giữ bí mật cho người tố giác.", "Kỳ thị, xa lánh người đang cai nghiện."], dap: 3, giai: "Nghị định 282/2025/NĐ-CP xử phạt hành vi kỳ thị người sử dụng, người cai nghiện ma túy." },
        { kieu: "xep", hoi: "Bấm lần lượt để xếp 4 bước an toàn theo đúng thứ tự.", muc: ["RỜI ĐI", "DỪNG", "BÁO TIN", "TỪ CHỐI"], dungThuTu: ["DỪNG", "TỪ CHỐI", "RỜI ĐI", "BÁO TIN"], giai: "DỪNG → TỪ CHỐI → RỜI ĐI → BÁO TIN." }
      ],
      loi: { chinh: "Chặng cuối rồi! Mười câu hỏi, mỗi câu một điểm. Đạt từ tám điểm trở lên là em đã sẵn sàng tự bảo vệ mình. Cố lên!" }
    },
    {
      id: "m23", cu: { tu: "cu-vui", noi: "Xem em đã tiến bộ thế nào!" }, phan: 5, loai: "ketqua", tieuDe: "Kết quả của em",
      ketMinh: "Minh nói: “Mình không ăn đâu, mình về trước nhé.” Minh nhắn mẹ đến đón, và hôm sau kể lại với cô chủ nhiệm. Chỉ mười giây can đảm, Minh đã giữ được cả tương lai.",
      loi: { dap: "[warm] Và đây là cái kết của Minh. Minh nói: mình không ăn đâu, mình về trước nhé. Minh nhắn mẹ đến đón, và hôm sau kể lại với cô chủ nhiệm. Chỉ mười giây can đảm, Minh đã giữ được cả tương lai." }
    },
    {
      id: "m24", cu: { tu: "cu-vui", noi: "Hẹn gặp lại các em!" }, phan: 5, loai: "tongket", tieuDe: "Ba điều mang theo",
      y: [
        ["🔍", "NHẬN DIỆN", "Đừng đoán món đồ — hãy nhìn 5 đèn đỏ của hoàn cảnh."],
        ["⚖️", "HIỂU LUẬT", "Từ đủ 16 tuổi chịu trách nhiệm hình sự về mọi tội phạm. Không giữ hộ, giao hộ, không rủ rê."],
        ["🛡️", "HÀNH ĐỘNG", "DỪNG – TỪ CHỐI – RỜI ĐI – BÁO TIN, và luôn có vòng tay tin cậy bên cạnh."]
      ],
      loi: { chinh: "[warm] Hôm nay chúng ta mang theo ba điều. Nhận diện bằng năm đèn đỏ. Hiểu luật để không bị lợi dụng. Và hành động bằng bốn bước an toàn. Ma túy có thể đội rất nhiều lốt, nhưng một người tỉnh táo và dũng cảm thì không bao giờ bị lừa. Hẹn gặp lại các em!" }
    },
    {
      id: "m25", phan: 5, loai: "nguon", tieuDe: "Tài liệu tham khảo & nguồn học liệu",
      nhom: [
        ["Văn bản pháp luật", [
          "Luật Phòng, chống ma túy số 120/2025/QH15 (Quốc hội thông qua ngày 10/12/2025, hiệu lực từ 01/7/2026).",
          "Bộ luật Hình sự số 100/2015/QH13, sửa đổi, bổ sung năm 2017 và năm 2025 (Luật số 86/2025/QH15, hiệu lực từ 01/7/2025): Điều 12, 249, 250, 251, 256a, 258.",
          "Nghị định số 282/2025/NĐ-CP của Chính phủ quy định xử phạt vi phạm hành chính trong lĩnh vực an ninh, trật tự, an toàn xã hội; phòng, chống tệ nạn xã hội… (hiệu lực từ 15/12/2025).",
          "Nghị quyết số 173/2024/QH15 của Quốc hội (cấm thuốc lá điện tử, thuốc lá nung nóng từ năm 2025).",
          "Nghị định số 57/2022/NĐ-CP quy định các danh mục chất ma túy và tiền chất; Nghị định số 90/2024/NĐ-CP sửa đổi, bổ sung."
        ]],
        ["Tài liệu khoa học, chuyên môn", [
          "National Institute on Drug Abuse (NIDA). Drugs, Brains, and Behavior: The Science of Addiction.",
          "United Nations Office on Drugs and Crime (UNODC). World Drug Report.",
          "Bộ Giáo dục và Đào tạo. Kế hoạch triển khai Tiểu dự án 03 “Tăng cường công tác tuyên truyền giáo dục pháp luật về phòng, chống ma túy cho học sinh, sinh viên giai đoạn 2025 – 2030”."
        ]],
        ["Học liệu trong bài", [
          "Kịch bản, câu hỏi, tình huống, thiết kế tương tác: do tác giả biên soạn.",
          "Hình minh họa: tự thiết kế (có sử dụng công cụ hỗ trợ tạo ảnh, đã kiểm duyệt nội dung, không chứa chữ, biểu trưng).",
          "Giọng đọc: tổng hợp giọng nói trí tuệ nhân tạo. Âm thanh hiệu ứng: tạo bằng mã lệnh trong bài."
        ]]
      ]
    }
  ]
};
