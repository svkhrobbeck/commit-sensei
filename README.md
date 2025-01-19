# Bot Funksiyalari va Qoidalari

## 1. Kunlik Commit Eslatmasi
- **Vaqt**: Har kuni soat **07:00**.
- **Mazmun**: Foydalanuvchiga **7 ta commit yozish** kerakligi eslatmasi yuboriladi.
- **Qo‘shimcha**: Agar o‘tkazilgan haftadan jarima bo‘lsa, jarima hisobga olinadi va foydalanuvchi **jarimadan qoldirilgan commitlar**ni ham bajarishi kerak.

**Misol**:  
"Bugun kamida 7 ta commit yozishingiz kerak. O‘tkazilgan haftadagi jarima hisobga olinadi."

---

## 2. Jarima Hisoblash
- **Jarima Shartlari**:
  - Agar foydalanuvchi biror kuni 7 ta commit yozmaydi, u holda jarima qo‘shiladi.
  - Jarima — o‘tkazilgan commitlar soniga qarab hisoblanadi.
  
**Misol**:  
- Haftada 10 commit yozilmagan bo‘lsa, jarima sifatida 10 commit qo‘shilishi kerak bo‘ladi.  
- **Jarima** o‘tgan haftaning commitlaridan kelib chiqib **har kuni** hisoblanadi va foydalanuvchiga eslatiladi.

---

## 3. Kunlik Commitlar Va Jarimaga Ko‘ra Hisoblash
- **Kunlik Commitlar Sonini Hisoblash**:
  - Kunlik commitlar soni **7 ta commitdan kam bo‘lsa**, jarima hisobga olinadi.
  - **Jarimadan ortiqcha commit yozilgan bo‘lsa**, ular haftalik limitni **ortiqcha commit deb hisoblanadi**, lekin bu jarimadan minus bo‘lmaydi.
  
**Misol**:  
- Haftaning boshida jarima bo‘lsa (masalan, 5 ta commit), bot eslatma yuboradi va foydalanuvchiga **7 ta commit**ni yozish kerakligini bildiradi, lekin agar ortiqcha commit yozilsa, haftalik limitda minus bo‘lmaydi.

---

## 4. Maqtovlar
- **Commitlar Sonidan Ko‘p Yozilganida**:
  - Agar foydalanuvchi kunlik **7 ta commitdan ko‘p** yozsa, bot uni **maqtab** qo‘yadi.
  
**Misol**:  
- "Ajoyib! Bugun commitlar soni juda yaxshi. Katta ishlarga erishdingiz!"

---

## 5. Xato Commitlar Bilan Ma'lumot
- Agar foydalanuvchi 30-40 commit yozib yuborsa, **bot eslatib qo‘yadi**, bu commitlar umumiy haftalik deadline’dna oshmasligi kerak.
  
**Misol**:  
- "Bugun juda yaxshi ishladingiz! Ammo, 30-40 commit yozish orqali, umumiy haftalik limitni oshirib yubormang. Haftalik deadline bo‘yicha minus bo‘lmasligi uchun commitlar sonini balansda tuting."

---

## 6. Haftalik Commitlar Hisobi va Deadlinelar
- **Haftalik Deadline**: Har hafta foydalanuvchiga jami haftalik commitlar soni beriladi.
- **Jarima Hisobi**: Agar foydalanuvchi haftada **7 ta commitdan kam yozgan bo‘lsa**, jarima qo‘shiladi va bu jarima **haftaning har bir kuni** uchun hisoblanadi.
- **Haftaning Oxirida Hisoblash**: Har hafta oxirida bot foydalanuvchiga o‘sha haftadagi jami commitlar sonini taqdim etadi va haftalik **deadlinelarni** hisoblab chiqaradi.

**Misol**:  
- Haftaning oxirida bot quyidagi tarzda hisobot yuboradi:  
  "Siz bugun jami 45 commit yozdingiz. Haftalik deadline — 50 commit. Sizning haftalik maqsadingizga 5 commit qolmoqda."

---

## 7. Google Sheets Integratsiyasi
- **Commit Ma'lumotlari Saqlash**:  
  - Har bir foydalanuvchining commitlar va jarimasi Google Sheets orqali saqlanadi.
  - Har bir commit, jarima va haftalik statistikalar **Google Sheets**da saqlanadi va har doim bot tomonidan kuzatib boriladi.

---

## 8. Motivatsiya va Bonuslar
- **Motivatsion Xabarlar**: Agar foydalanuvchi belgilangan commitlar sonini bajarib, ortiqcha commit yozsa, bot uni **motivatsion xabar** yuboradi.
- **Bonuslar**: Haftaning oxirida muvaffaqiyatli yakunlangan hafta uchun bonuslar yuboriladi.

**Misol**:  
- "Agar haftada muvaffaqiyatli commit yozilgan bo‘lsa, bonus sifatida 5 ta qo‘shimcha commit yozish imkoniyati taqdim etiladi."

---

## 9. Jarima Hisoblash va Deadlinelar
- **Jarima Hisoblash**: Agar foydalanuvchi haftada bir necha kun commit yozishni unutgan bo‘lsa, kelasi hafta **7 tadan ko‘proq commit yozilishi kerak** va bu commitlar jarima sifatida hisoblanadi.  
- **Deadline**: Har hafta jarima sifatida yozilishi kerak bo‘lgan commitlar, agar bajarilmasa, yana jarima sifatida qo‘shiladi.

---

## 10. Foydalanuvchi Faoliyatini Kuzatish
- **Faoliyat Statistikasi**: Har hafta foydalanuvchining **eng ko‘p ishlagan repo** va kamroq ishlagan kunlarini aniqlash va bot tomonidan statistik ma'lumotlarni taqdim etish.
- **Eng Kam Faol Kunlar**: Haftalik statistikada, qaysi kunlarda kamroq commit yozilganini bot foydalanuvchiga bildiradi.

---

## 11. Haftalik Hisobot
- Haftaning oxirida bot foydalanuvchiga jami commitlar, qo‘shilgan jarimalar va barcha hafta davomida o‘tkazilgan ishlash jarayonlarini taqdim etadi.

---
