# nguywnben.github.io

Trang chủ và nơi lưu trữ landing page cho các dự án của **nguywnben**. Mỗi dự án có một thư mục, đường dẫn và giao diện riêng; trang chủ đóng vai trò danh mục để khám phá các dự án.

**Website:** [nguywnben.github.io](https://nguywnben.github.io/)

## Dự án

| Dự án | Giới thiệu | Landing page | Mã nguồn |
| --- | --- | --- | --- |
| Polaris | Gateway AI tự triển khai, hỗ trợ định tuyến, chuyển đổi giao thức và dự phòng giữa các nhà cung cấp. Landing page có 15 ngôn ngữ. | [Mở Polaris](https://nguywnben.github.io/polaris/) | [nguywnben/polaris](https://github.com/nguywnben/polaris) |

Repo này chứa website giới thiệu. Mã nguồn ứng dụng của từng dự án được quản lý trong repo riêng.

## Cấu trúc

```text
.
├── index.html              # Trang chủ: danh mục các dự án
├── home.css                # Giao diện riêng của trang chủ
├── home.js                 # Tiếng Anh / tiếng Việt và lựa chọn ngôn ngữ
├── assets/home/            # Tài nguyên của trang chủ
├── README.md
└── polaris/                # Landing page tại /polaris/
    ├── index.html
    ├── styles.css
    ├── app.js
    ├── preferences.js
    ├── assets/
    ├── locales/            # 15 bản dịch
    ├── tests/
    └── README.md
```

Website dùng HTML, CSS và JavaScript tĩnh, không cần framework, cài package hay bước build. Trang chủ có nội dung tiếng Anh ngay trong HTML và vẫn đọc được khi tắt JavaScript. JavaScript bổ sung tiếng Việt và bộ chuyển EN/VI. Tài nguyên và giao diện của mỗi landing page nằm trong thư mục dự án để có thể phát triển độc lập.

## Xem trên máy

Cần Python 3. Từ thư mục gốc của repo, chạy:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

- Trang chủ: <http://127.0.0.1:4173/>
- Polaris tiếng Việt: <http://127.0.0.1:4173/polaris/?lang=vi>

Giữ terminal chạy trong lúc xem. Dùng HTTP thay vì mở trực tiếp file HTML để các landing page có thể tải tài nguyên và bản dịch JSON đúng cách.

## Ngôn ngữ trang chủ

Trang chủ hỗ trợ tiếng Anh và tiếng Việt, với thứ tự ưu tiên: `?lang=en` hoặc `?lang=vi` → lựa chọn đã lưu → ngôn ngữ trình duyệt được hỗ trợ đầu tiên → tiếng Anh. Trình duyệt ưu tiên tiếng Việt sẽ tự mở bản tiếng Việt khi chưa có lựa chọn riêng. Bộ chuyển EN/VI ở header lưu lựa chọn cho lần truy cập sau, cập nhật tiêu đề, mô tả và nhãn hỗ trợ tiếp cận. Liên kết đến Polaris dùng ngôn ngữ đang xem.

Nội dung hai ngôn ngữ được khai báo trong `home.js`; khi thêm nội dung, cập nhật cả hai bản và phần tiếng Anh dự phòng trong `index.html`.

## Thêm landing page mới

1. Tạo thư mục mang tên dự án, ví dụ `ten-du-an/`, với file `index.html` làm trang vào.
2. Đặt CSS, JavaScript, hình ảnh và bản dịch riêng trong thư mục đó. Dùng đường dẫn tương đối như `./assets/logo.svg` để trang chạy được tại `/ten-du-an/`.
3. Thêm một mục dự án vào phần `#projects` của `index.html` ở gốc, cập nhật số lượng dự án và liên kết đến `./ten-du-an/`.
4. Cập nhật bảng dự án trong README này. Viết README riêng nếu dự án cần hướng dẫn bổ sung.
5. Kiểm tra ở local: desktop, mobile, điều hướng bàn phím, liên kết và tài nguyên. Liên kết giữa các trang trong website mở cùng tab; liên kết ngoài dùng `target="_blank" rel="noopener noreferrer"`.
6. Commit và push khi đã sẵn sàng xuất bản.

Sau khi triển khai, trang mới nằm tại `https://nguywnben.github.io/ten-du-an/`.

## Kiểm tra Polaris

```sh
python polaris/tests/check_site.py
node --check polaris/app.js
node --check polaris/preferences.js
```

Node.js chỉ cần cho hai lệnh kiểm tra cú pháp. Xem [README của Polaris](polaris/README.md) để biết thêm về bản dịch, tương tác và nguồn thiết kế.

## Triển khai

GitHub Pages được cấu hình tại **Settings → Pages**:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

Push lên `main` sẽ kích hoạt triển khai. Theo dõi kết quả trong [Actions](https://github.com/nguywnben/nguywnben.github.io/actions). Trang chủ được phục vụ ở `/`; từng thư mục dự án được phục vụ ở đường dẫn tương ứng. Không cần nhánh `gh-pages` riêng.

## Tài nguyên

Trang chủ sử dụng biểu tượng Polaris từ `polaris/assets/logo.png`. Ghi nhận nguồn và giấy phép tài nguyên Polaris nằm trong [polaris/assets/LICENSE](polaris/assets/LICENSE). Các landing page mới cần ghi rõ nguồn và giấy phép của tài nguyên sử dụng.
