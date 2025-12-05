# 🚀 Hướng Dẫn Setup Module Lòng Biết Ơn

## ✅ Đã hoàn thành:

### 1. **Form nhập thông tin người thi**
- ✅ Component `UserInfoForm` đã được tạo
- ✅ Đã tích hợp vào cả 3 trang test:
  - GQ6_CHILD (4-9 tuổi)
  - AGS12_TEEN (10-18 tuổi)
  - ADULT_DHARMA (18+ tuổi)
- ✅ Validation đầy đủ (họ tên bắt buộc, email/phone optional)
- ✅ Lưu thông tin vào database trước khi làm bài

### 2. **Bảng Vàng Tu Tập**
- ✅ Component `GoldenBoard` hiển thị top 10 người có điểm cao nhất
- ✅ Filter theo từng nhóm tuổi
- ✅ Hiển thị huy chương vàng, bạc, đồng cho top 3
- ✅ Đã thêm vào trang chủ

### 3. **Database Schema**
- ✅ Bảng `gratitude_users` - Lưu thông tin người dùng
- ✅ Bảng `gratitude_test_results` - Lưu kết quả bài thi
- ✅ Bảng `gratitude_scales` - Định nghĩa thang đo
- ✅ Bảng `gratitude_questions` - Câu hỏi
- ✅ Bảng `gratitude_score_levels` - Mức độ điểm

### 4. **API Routes**
- ✅ `/api/gratitude/users` - Tạo user mới
- ✅ `/api/gratitude/scales` - Lấy danh sách thang đo
- ✅ `/api/gratitude/scales/:scaleId/questions` - Lấy câu hỏi
- ✅ `/api/gratitude/scales/:scaleId/submit` - Submit bài test
- ✅ `/api/gratitude/leaderboard` - Lấy bảng xếp hạng
- ✅ `/api/gratitude/results/:resultId` - Xem kết quả

---

## 🔧 SETUP BƯỚC CUỐI (QUAN TRỌNG)

### Bước 1: Tạo file `.env.local`

Tạo file `.env.local` ở thư mục gốc với nội dung:

```env
NEXT_PUBLIC_SUPABASE_URL=https://db.kbovlroqrnflqcfqsaqc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Lấy ANON KEY:**
1. Vào https://app.supabase.com
2. Chọn project của bạn
3. Settings → API
4. Copy "anon public" key
5. Thay thế `your_anon_key_here`

### Bước 2: Setup Database

1. Vào Supabase Dashboard
2. SQL Editor
3. Copy toàn bộ nội dung file `app/api/Database/schema.sql`
4. Paste và Run

**File này sẽ tạo:**
- 5 tables với indexes
- Insert dữ liệu mẫu (3 thang đo, 38 câu hỏi, score levels)
- Setup Row Level Security policies

### Bước 3: Cài đặt Dependencies

```bash
npm install
```

### Bước 4: Chạy Development Server

```bash
npm run dev
```

Truy cập: http://localhost:3000

---

## 📱 Luồng Sử Dụng

### Từ Trang Chủ:

1. **Xem Bảng Vàng Tu Tập**
   - Hiển thị top 10 người có điểm cao nhất
   - Filter theo nhóm tuổi: Tất cả / Trẻ nhỏ / Vị thành niên / Tu học
   - Top 3 có huy chương vàng/bạc/đồng

2. **Nhấn "Bắt đầu làm bài ngay"** hoặc vào menu "Practise"

### Trang Chọn Thang Đo (/Practise):

1. Chọn một trong 3 thang đo:
   - 🧒 Trẻ nhỏ (4-9 tuổi) - 6 câu, giao diện emoji
   - 🎓 Vị thành niên (10-18 tuổi) - 12 câu
   - 🙏 Tu học Phật pháp (18+) - 20 câu

### Làm Bài Test:

1. **Nhập thông tin:**
   - Họ tên (bắt buộc)
   - Số điện thoại (tùy chọn)
   - Email (tùy chọn)
   - Tuổi (tùy chọn)
   - Giới tính (tùy chọn)

2. **Làm bài:**
   - GQ6: Từng câu một với emoji to
   - AGS12 & Adult: Tất cả câu trên một trang

3. **Xem kết quả:**
   - Điểm tổng
   - Mức độ (Thấp/Trung bình/Cao)
   - Diễn giải chi tiết
   - Gợi ý thực hành

4. **Kết quả được lưu vào database** và xuất hiện trên Bảng Vàng nếu đủ điểm cao!

---

## 🎨 Tính Năng Nổi Bật

### 1. Form Thông Tin Người Thi
- ✅ Validation đầy đủ
- ✅ Design theo màu sắc từng nhóm tuổi
- ✅ Lưu vào localStorage để không cần nhập lại
- ✅ Responsive mobile-friendly

### 2. Bảng Vàng Tu Tập
- ✅ Hiển thị top 10 theo từng thang đo
- ✅ Filter động (Tất cả / Trẻ nhỏ / Vị thành niên / Tu học)
- ✅ Top 3 có viền vàng + huy chương
- ✅ Animation hover
- ✅ Hiển thị tên, tuổi, điểm, mức độ
- ✅ CTA "Bắt đầu làm bài ngay"

### 3. Giao Diện Test
- **GQ6 (Trẻ nhỏ):**
  - Từng câu một
  - 5 emoji to, dễ nhấn
  - Progress bar
  - Auto-advance
  
- **AGS12 (Vị thành niên):**
  - Tất cả 12 câu trên một trang
  - Radio buttons với hover
  - Real-time progress
  
- **Adult Dharma:**
  - Intro page với hướng dẫn
  - Moon phases slider (🌑 → 🌕)
  - 20 câu với design Phật pháp

### 4. Kết Quả
- Điểm số lớn, nổi bật
- Badge mức độ
- Diễn giải chi tiết
- Gợi ý thực hành cụ thể
- Thống kê (số câu, %, ngày làm)
- Nút share, print, làm lại

---

## 🗄️ Database Tables

### `gratitude_users`
```sql
- id (UUID, primary key)
- full_name (text, required)
- email (text, optional)
- phone (text, optional)
- age (integer, optional)
- gender (text, optional)
- created_at (timestamp)
```

### `gratitude_test_results`
```sql
- id (UUID, primary key)
- user_id (UUID, foreign key → gratitude_users)
- scale_id (text, foreign key → gratitude_scales)
- answers (integer array)
- total_score (integer)
- level_name (text)
- completed_at (timestamp)
- session_id (text)
```

### `gratitude_scales`
```sql
- id (text, primary key): GQ6_CHILD | AGS12_TEEN | ADULT_DHARMA
- name (text)
- name_vi (text)
- total_questions (integer)
- min_score, max_score (integer)
```

### `gratitude_questions`
```sql
- id (text, primary key)
- scale_id (foreign key)
- order_number (integer)
- question_text_vi (text)
- reverse_scored (boolean)
```

### `gratitude_score_levels`
```sql
- scale_id (foreign key)
- level_name_vi (text)
- min_score, max_score (integer)
- description_vi (text)
- suggestions (text array)
- emoji (text)
```

---

## 🔐 Security

- ✅ Row Level Security (RLS) enabled
- ✅ Public read access cho scales, questions, levels
- ✅ Public insert cho users và results (anonymous allowed)
- ✅ Environment variables cho Supabase keys
- ✅ `.env.local` trong `.gitignore`

---

## 🎯 API Endpoints

### GET `/api/gratitude/scales`
Lấy danh sách tất cả thang đo

### GET `/api/gratitude/scales/:scaleId/questions`
Lấy câu hỏi của một thang đo

### POST `/api/gratitude/scales/:scaleId/submit`
Submit bài test
```json
{
  "scaleId": "GQ6_CHILD",
  "answers": [5, 4, 2, 5, 5, 1],
  "userId": "uuid-here"
}
```

### POST `/api/gratitude/users`
Tạo user mới
```json
{
  "full_name": "Nguyễn Văn A",
  "email": "example@email.com",
  "phone": "0912345678",
  "age": 25,
  "gender": "male"
}
```

### GET `/api/gratitude/leaderboard?scale=GQ6_CHILD&limit=10`
Lấy bảng xếp hạng
- Query params: `scale` (optional), `limit` (default: 10)

### GET `/api/gratitude/results/:resultId`
Xem chi tiết một kết quả

---

## 📊 Scoring Logic

### Reverse Scoring
Một số câu có `reverse_scored: true`:
- GQ6: Câu 3, 6
- AGS12: Câu 3, 7
- Adult: Không có

**Formula:** `finalScore = (max + min) - originalScore`

Ví dụ: Nếu trả lời 1 (rất không đồng ý) cho câu đảo điểm
→ Điểm thực = (5 + 1) - 1 = 5

### Score Ranges

**GQ6 (max 30):**
- 6-14: Rất thấp 😢
- 15-20: Thấp 🙂
- 21-25: Trung bình 😊
- 26-30: Cao 😄

**AGS12 (max 60):**
- 12-27: Thấp 😔
- 28-43: Trung bình 🙂
- 44-60: Cao 😊

**Adult Dharma (max 100):**
- 20-49: Biết ơn còn hạn chế 🌑
- 50-79: Biết ơn đang phát triển 🌘
- 80-100: Biết ơn sâu sắc 🌕

---

## 🐛 Troubleshooting

### Lỗi: "Module not found: @supabase/supabase-js"
```bash
npm install @supabase/supabase-js
```

### Lỗi: "Missing Supabase environment variables"
→ Kiểm tra file `.env.local` đã tạo và có ANON_KEY chưa

### Bảng Vàng không hiển thị dữ liệu
→ Kiểm tra database đã có dữ liệu trong `gratitude_test_results` chưa

### Form không submit được
→ Check console.log, có thể thiếu userId hoặc validation failed

---

## 🚀 Next Steps (Tùy chọn)

- [ ] Thêm authentication (đăng nhập/đăng ký)
- [ ] Export PDF kết quả
- [ ] Share results trên social media
- [ ] Email notification khi vào top 10
- [ ] Admin dashboard để quản lý
- [ ] Analytics & statistics
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

## 📞 Support

Nếu có lỗi, kiểm tra:
1. File `.env.local` đã có ANON_KEY chưa
2. Database schema đã run chưa
3. `npm install` đã chạy chưa
4. Console.log có error gì không

**Chúc bạn thành công! 🙏✨**

