# 🚀 EmailJS Setup - Quick Checklist

## What You Need to Do

Your website is **ready for EmailJS integration**. Follow these steps to make it work:

---

## ✅ Checklist

### Step 1: Get Your EmailJS Credentials
- [ ] Go to https://www.emailjs.com/
- [ ] Create account (or login) and verify email
- [ ] Go to **Account** tab → Copy **Public Key**
- [ ] Go to **Email Services** → Create service (Gmail recommended)
- [ ] Copy your **Service ID**

### Step 2: Create Email Templates
- [ ] Go to **Email Templates**
- [ ] Create **Template 1**:
  - Name: `booking_notification`
  - Copy the **Template ID**
- [ ] Create **Template 2**:
  - Name: `consultation_notification`
  - Copy the **Template ID**

### Step 3: Update Your Code
Open **`static/script.js`** and find this section (line 1-9):

```javascript
emailjs.init("YOUR_PUBLIC_KEY_HERE");
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID_HERE";
const EMAILJS_BOOKING_TEMPLATE = "YOUR_BOOKING_TEMPLATE_ID_HERE";
const EMAILJS_CONSULTATION_TEMPLATE = "YOUR_CONSULTATION_TEMPLATE_ID_HERE";
const ADMIN_EMAIL = "your-email@example.com";
```

Replace with YOUR actual values:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");           // Copy from Step 1
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";  // Copy from Step 1
const EMAILJS_BOOKING_TEMPLATE = "booking_notification";  // From Step 2
const EMAILJS_CONSULTATION_TEMPLATE = "consultation_notification";  // From Step 2
const ADMIN_EMAIL = "your.email@gmail.com";  // Your email address
```

### Step 4: Test
- [ ] Open http://localhost:5000
- [ ] Click "Book Now" → Fill form → Submit
- [ ] Check your email for notification
- [ ] Click "Get Free Consultation" → Fill form → Submit
- [ ] Check your email for notification

---

## 📺 Video Steps (if needed)

1. **Create EmailJS Account**: https://www.emailjs.com/
2. **Get Public Key**: Account → Copy Public Key
3. **Add Email Service**: Email Services → Add Service → Gmail
4. **Create Templates**: Email Templates → Create New → Use provided template text

---

## 💡 Important Notes

- **Your Public Key**: Public - safe in code ✅
- **Service ID & Template IDs**: Private - keep in code only ❌
- Both forms send emails to `ADMIN_EMAIL` (your email)
- Emails arrive within **1-5 seconds**

---

## Have Questions?

📖 **Full Guide**: See `EMAILJS_SETUP_GUIDE.md` in the project root

---

**Status**: Waiting for you to provide credentials in `static/script.js`

Once you update those 5 values, your email system will be **LIVE** ✅
