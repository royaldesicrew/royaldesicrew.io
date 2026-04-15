# EmailJS Setup Guide for Royal Desi Crew Website

## Overview
Your website has been configured to send email notifications when users submit the "Book Now" and "Get Free Consultation" forms via **EmailJS**. Follow these steps to complete the setup.

---

## Step 1: Create an EmailJS Account (if not already done)

1. Visit **https://www.emailjs.com/**
2. Click **"Sign Up"** (or login if you already have an account)
3. Create your account using your email address
4. Verify your email address

---

## Step 2: Get Your Public Key

1. From your **EmailJS Dashboard**, click **"Account"** in the left menu
2. Copy your **Public Key** (it looks like: `a1b2c3d4e5f6g7h8i`)
3. **Save this value** - you'll need it in Step 5

---

## Step 3: Add Email Service

1. From the Dashboard, click **"Email Services"** in the left menu
2. Click **"Add Service"**
3. Choose your email provider:
   - **Gmail** (easiest for beginners) - Follow Google's OAuth setup
   - **Other Email Provider** - Choose from the dropdown
4. Follow the prompts to authenticate with your email provider
5. After setup, you'll see your **Service ID** (e.g., `service_abc123def`)
6. **Copy and save your Service ID** - you'll need it in Step 5

---

## Step 4: Create Email Templates

You need to create 2 templates: one for "Book Now" and one for "Get Free Consultation". Here's how:

### Template 1: Book Now Form Submission

1. From Dashboard, click **"Email Templates"** → **"Create New Template"**
2. **Template Name:** `booking_notification` 
3. In the **"To Email"** field, enter your admin email: `{{admin_email}}`
4. **Subject:** New Booking Inquiry from {{name}}
5. **Email Body** (customize as needed):

```
Hi {{name}},

Thank you for booking with Royal Desi Crew! We're excited to create your perfect event.

📋 Event Details:
- Event Type: {{event_type}}
- Phone: {{phone}}
- Package: {{package}}
- Message: {{message}}

We will contact you within 24 hours to confirm your booking.

Best regards,
Royal Desi Crew Team
+91 9614028424
```

6. Click **"Test It"** (fill in sample data)
7. Once created, copy your **Template ID** (e.g., `template_abc123`)
8. **Save this Template ID** - you'll need it in Step 5

---

### Template 2: Get Free Consultation Form

1. From Dashboard, click **"Email Templates"** → **"Create New Template"**
2. **Template Name:** `consultation_notification`
3. In the **"To Email"** field, enter your admin email: `{{admin_email}}`
4. **Subject:** New Consultation Request from {{name}}
5. **Email Body**:

```
Hi {{name}},

Thank you for requesting a free consultation with Royal Desi Crew! 

📞 Consultation Details:
- Name: {{name}}
- Email: {{email}}
- Phone: {{phone}}
- Event Type: {{event_type}}
- Message: {{message}}

Our team will reach out within 24 hours to schedule your consultation call.

Looking forward to discussing your vision!

Best regards,
Royal Desi Crew Team
+91 9614028424
```

6. Click **"Test It"** (fill in sample data)
7. Once created, copy another **Template ID** (e.g., `template_xyz789`)
8. **Save this Template ID** - you'll need it in Step 5

---

## Step 5: Update Your Website Code

Now you have all the information needed. Update the file: **`static/script.js`**

### Find this section (around the top of the file):

```javascript
// ===== EmailJS Configuration =====
// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// Your EmailJS credentials (replace these)
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID_HERE";
const EMAILJS_BOOKING_TEMPLATE = "YOUR_BOOKING_TEMPLATE_ID_HERE";
const EMAILJS_CONSULTATION_TEMPLATE = "YOUR_CONSULTATION_TEMPLATE_ID_HERE";
const ADMIN_EMAIL = "your-email@example.com";
// ===== End EmailJS Configuration =====
```

### Replace with your actual values:

```javascript
// ===== EmailJS Configuration =====
// Initialize EmailJS
emailjs.init("a1b2c3d4e5f6g7h8i");  // Your Public Key from Step 2

// Your EmailJS credentials (replace these)
const EMAILJS_SERVICE_ID = "service_abc123def";  // Your Service ID from Step 3
const EMAILJS_BOOKING_TEMPLATE = "template_abc123";  // Template ID from Step 4 Template 1
const EMAILJS_CONSULTATION_TEMPLATE = "template_xyz789";  // Template ID from Step 4 Template 2
const ADMIN_EMAIL = "your-admin-email@gmail.com";  // Your email to receive notifications
// ===== End EmailJS Configuration =====
```

**Example with real values:**
```javascript
emailjs.init("k1j2h3g4f5e6d7c8b9");
const EMAILJS_SERVICE_ID = "service_9abc8def7ghi6jkl5";
const EMAILJS_BOOKING_TEMPLATE = "template_k1j2h3g4f5";
const EMAILJS_CONSULTATION_TEMPLATE = "template_xyz789012";
const ADMIN_EMAIL = "owner@royaldesicrew.com";
```

---

## Step 6: Test the Forms

1. Open your website: **http://localhost:5000**
2. **Test "Book Now" Form:**
   - Click "Book Now" button in navbar
   - Fill in all fields (Name, Email, Phone, Event Type, Package, Message)
   - Click "Book Now" button
   - Check your admin email (should receive the notification within a few seconds)

3. **Test "Get Free Consultation" Form:**
   - Click "Get Free Consultation" button in hero section
   - Fill in all fields (Name, Email, Phone, Event Type, Message)
   - Click "Schedule Consultation" button
   - Check your admin email (should receive the notification)

---

## Troubleshooting

### Issue: Forms submit but no email received

**Check:**
1. Is your Service ID correct? (Compare with EmailJS dashboard)
2. Are your Template IDs correct?
3. Has your email service been authenticated? (Check Email Services in dashboard)
4. Check browser **Developer Console** (F12 or Right-click → Inspect → Console) for error messages

### Issue: "Oops! Something went wrong"

1. Verify all 5 values in `static/script.js` are correct
2. Check EmailJS Service is still active (Email Services → Status)
3. Verify email templates exist and are published

### Issue: Email received but content looks wrong

1. Check your template variables match the form fields:
   - Booking form: `{{name}}`, `{{email}}`, `{{phone}}`, `{{event_type}}`, `{{package}}`, `{{message}}`
   - Consultation form: `{{name}}`, `{{email}}`, `{{phone}}`, `{{event_type}}`, `{{message}}`

---

## Security Note

⚠️ **Your Public Key is safe to display in frontend code** - it only allows sending emails through your template(s), not accessing your account.

**Never share your Service IDs or Template IDs** - these should only be in your code.

---

## Additional Features (Optional)

### Enable User Confirmation Emails

If you want users to receive a confirmation email:

1. Create another template: `booking_user_confirmation`
2. Set "To Email" to: `{{email}}` (user's email)
3. Update the form submission handler to send TWO emails:
   - One to admin
   - One to user

Contact support for help implementing this feature.

---

## Next Steps

Once EmailJS is working:
1. ✅ Complete Google Analytics setup (see ANALYTICS_SETUP.md)
2. ✅ Test all forms end-to-end
3. ✅ Monitor incoming leads in your email and Google Analytics dashboard

---

**Need help?** 
- EmailJS Support: https://www.emailjs.com/docs/
- Contact Royal Desi Crew: +91 9614028424
