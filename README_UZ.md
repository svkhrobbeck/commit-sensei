# Commit Sensei 🤖

[english description](README.md)

**Commit Sensei** --- bu Telegram bot ko'rinishidagi intizom va
motivatsiya loyihasi bo'lib, u sizni **har kuni shaxsiy GitHub
loyihalaringizga muntazam commit yozishga majburlaydi**.

Scroll yo'q. Bahona yo'q. Faqat real progress.

---

## 🎯 Loyihaning asosiy g'oyasi

Commit Sensei quyidagi muammoga aniq yechim beradi:

- Shaxsiy loyihalarni boshlab, tashlab qo'yish
- Kunlab commit yozmasdan yurish
- "Bugun yozaman" degan niyatning ertaga qolishi

Bot **faqat siz egalik qiladigan GitHub repolardagi commitlarni**
hisobga oladi.\
Collaborator bo'lib yozilgan commitlar --- **nol qiymat**.

Bu orqali loyiha: - shaxsiy portfolio rivojiga, - uzoq muddatli odat
shakllanishiga, - real natijaga xizmat qiladi.

---

## ⚙️ Qanday ishlaydi?

1.  Foydalanuvchi botga ulanadi (Telegram)
2.  GitHub accountini bog'laydi
3.  Kunlik commit limiti belgilaydi\
    Masalan:
    - kuniga 7 ta → haftasiga 49 ta
    - kuniga 12 ta → haftasiga 84 ta
4.  Bot har kuni va har hafta faoliyatni qat'iy nazorat qiladi

---

## 🧮 Jarima (Penalty) mexanizmi

Agar user **biror kunda limitni bajarmasa**:

- Yetishmagan commitlar **jarima** sifatida hisoblanadi
- Jarima keyingi haftaga o'tkaziladi
- Jarima 7 kunga teng taqsimlanadi
- Agar bo'linishda qoldiq chiqsa --- haftaning **birinchi kuniga
  qo'shiladi**

### Misol:

- Kunlik limit: 12 ta
- Bugun yozilgan: 5 ta
- Yetishmagan: 7 ta

Keyingi hafta: - 7 / 7 = +1 ta - Yangi limit: **13 ta/kun**

Jarima to'liq yopilmaguncha davom etadi.

---

## ⏰ Reminder tizimi (5 bosqich)

### 1️⃣ Tonggi reminder --- 07:00

- Bugungi majburiy commitlar soni
- Agar jarima bo'lsa --- qo'shib aytiladi

### 2️⃣ Tushdan keyin --- 14:00

- Bugungacha yozilgan commitlar
- Limitga yetish uchun qolgan miqdor

### 3️⃣ Kechki reminder --- 20:00

- Kun tugashiga 4 soat qolganini eslatadi
- Agar limit bajarilgan bo'lsa --- maqtov
- Bajarilmagan bo'lsa --- qolgan commitlar soni

### 4️⃣ Tungi summary --- 23:58

- Kunlik yakuniy hisobot
- Limit bajarildimi yoki yo'qmi
- Jarimalar shu vaqtda hisoblanadi
- Xabar:
  - userga
  - yoki user belgilagan Telegram kanaliga

### 5️⃣ Haftalik yakun --- Yakshanba 23:58

- Haftalik umumiy commitlar
- Olingan jarimalar
- Motivatsion xabar
- Keyingi hafta uchun muhit va DB reset qilinadi

---

## 🔐 Muhim qoidalar

- Faqat **user egalik qiladigan** GitHub repolar hisobga olinadi
- Collab / organization repolar --- **hisoblanmaydi**
- Haftada **7 kun hammasi muhim**
- 1 kun ham o'tkazib yuborilsa --- jarima muqarrar

---

## 🧠 Nega bu loyiha foydali?

- Real intizom
- Real statistika
- Fake commitlar yo'q
- Portfolio real o'sadi
- "Motivation" emas --- **majburiyat**

Bu bot sizni: \> "Kayfiyat bo'lsa yozaman" bosqichidan\
\> "Bugun yozmasam bo'lmaydi" bosqichiga olib chiqadi.

---

## 🛠 Texnologiyalar

- Telegram Bot API
- GitHub GraphQL / REST API
- TypeScript
- Node.js / Bun
- Cron-based scheduler
- Custom penalty engine

---

## 🚀 Kelajak rejalar

- Streak tizimi
- Public leaderboard
- Web dashboard
- Repo-level statistika
- AI-based commit quality insights

---

## 📌 Xulosa

Commit Sensei --- bu soft reminder emas.\
Bu **har kuni hisob-kitob qiladigan shaxsiy nazoratchi**.

Agar sen shaxsiy loyihalaringni jiddiy rivojlantirmoqchi bo'lsang ---\
**Commit Sensei bahona qoldirmaydi.**
