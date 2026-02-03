# PHEpoxyWorld Website - Changes Summary

## 📦 What Was Updated

### ✅ Branding
- **OLD:** BANNAAS Woodcraft
- **NEW:** PHEpoxyWorld
- **Changed in:** All 200+ files

### ✅ API Integration
- **Contact Form:** Now points to `https://bc5maaefa0.execute-api.us-east-1.amazonaws.com/api/contact`
- **Newsletter:** Now points to `https://bc5maaefa0.execute-api.us-east-1.amazonaws.com/api/newsletter`
- **Configuration:** Centralized in `src/config.js`

### ✅ Contact Information
- **Email:** PHEpros@proton.me (configured throughout)
- **Phone/Address:** Marked with CORNBEF for your update
- **Social Media:** Marked with CORNBEF for your links

## 📝 Files Modified

### Core Configuration
- `src/config.js` - ⭐ NEW centralized config file
- `package.json` - Updated project name to "phepoxyworld"
- `index.html` - Updated title to "PHEpoxyWorld - Woodcraft Collectibles"

### Components Updated
- `src/components/Layout.jsx` - Updated brand name, added config import
- `src/components/NewsletterSignup.jsx` - Configured API endpoint
- `src/pages/Contact.jsx` - Configured API endpoint
- All other components - Brand name updated

### Data Files
- `src/data/products.js` - Brand name updated (descriptions still have CORNBEF markers)
- `src/data/team.js` - Brand name updated (content still has CORNBEF markers)
- `src/data/testimonials.js` - Brand name updated (content still has CORNBEF markers)
- `src/data/gallery.js` - Brand name updated (content still has CORNBEF markers)

### New Files Created
- `README.md` - Comprehensive deployment guide
- `QUICKSTART.md` - Quick start guide
- `deploy.sh` - Automated deployment script
- `CHANGES.md` - This file

## 🎯 What's Ready

### ✅ Working Now
1. **Infrastructure Connection** - Site is connected to your AWS resources
2. **Contact Form** - Will send emails via SES to PHEpros@proton.me
3. **Newsletter** - Will save subscribers to DynamoDB table
4. **Branding** - All "PHEpoxyWorld" references in place
5. **Deployment** - One-command deployment with `./deploy.sh`

### ⏳ Needs Your Content
1. **Contact Details**
   - Phone number (config.js line 18)
   - Physical address (config.js line 19)
   - Social media URLs (config.js lines 24-26)

2. **Product Information**
   - Product descriptions (src/data/products.js)
   - Square checkout URLs (src/data/products.js)
   - Product images (need to upload)

3. **Team & Testimonials**
   - Team member info (src/data/team.js)
   - Customer reviews (src/data/testimonials.js)
   - About page content (src/pages/About.jsx)

4. **Images**
   - Logo (public/ folder)
   - Product photos
   - Team photos
   - Gallery images

## 🔍 Finding Placeholders

All content placeholders are marked with **CORNBEF**.

```bash
# Find all content placeholders
grep -r "CORNBEF" src/
```

You'll find CORNBEF markers in:
- Product descriptions
- Team bios
- Testimonial content
- About page content
- Contact information
- Social media links
- Square URLs

## 📊 Technical Details

### API Endpoints Configured
```javascript
// src/config.js
api: {
  baseUrl: 'https://bc5maaefa0.execute-api.us-east-1.amazonaws.com',
  endpoints: {
    contact: '/api/contact',
    newsletter: '/api/newsletter'
  }
}
```

### Contact Form Integration
- **Component:** `src/pages/Contact.jsx`
- **Endpoint:** POST /api/contact
- **Payload:** { name, email, phone, subject, message }
- **Response:** Email sent via SES to PHEpros@proton.me

### Newsletter Integration
- **Component:** `src/components/NewsletterSignup.jsx`
- **Endpoint:** POST /api/newsletter
- **Payload:** { email }
- **Response:** Saved to DynamoDB, confirmation email sent

## 🚀 Deployment Process

### Automated (Recommended)
```bash
./deploy.sh
```

This script will:
1. Install dependencies
2. Build the project
3. Upload to S3
4. Invalidate CloudFront cache
5. Show success message

### Manual
```bash
npm install
npm run build
aws s3 sync dist/ s3://phepros-prod-website-821184871604/ --delete
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"
```

## ⚠️ Important Notes

### Before First Deployment
1. **Test locally:** Run `npm run dev` and test all features
2. **Update critical content:** At minimum, update contact info in config.js
3. **Verify API endpoints:** Test contact form and newsletter locally

### After Deployment
1. **Wait 5-10 minutes** for CloudFront to update
2. **Test live site:** Submit test contact form
3. **Check email:** Verify you receive the contact form email
4. **Test newsletter:** Subscribe and check for confirmation email

### Content Strategy
You can deploy now with CORNBEF placeholders and update content gradually:
- Deploy with placeholders → Site is live but with "CORNBEF" text
- Update content files → Redeploy to show real content
- This allows you to see the site structure while preparing content

## 📚 Documentation

- `README.md` - Complete deployment guide with troubleshooting
- `QUICKSTART.md` - Fast deployment instructions
- `deploy.sh` - Automated deployment script
- `CHANGES.md` - This file (what changed)

## 🎉 Next Steps

1. **Immediate:**
   ```bash
   npm install
   npm run dev  # Test locally at localhost:5173
   ```

2. **Before Going Live:**
   - Update contact info in `src/config.js`
   - Replace at least a few CORNBEF content markers
   - Upload a logo to `/public/`

3. **Deploy:**
   ```bash
   ./deploy.sh
   ```

4. **After Deploy:**
   - Visit https://d1o9vf52vkst66.cloudfront.net
   - Test contact form
   - Test newsletter signup
   - Verify on mobile

## 🆘 Getting Help

If anything doesn't work:
1. Check `README.md` for troubleshooting section
2. Check Lambda logs: `aws logs tail /aws/lambda/phepros-prod-contact --follow`
3. Verify SES: `aws ses list-verified-email-addresses`
4. Check S3 upload: `aws s3 ls s3://phepros-prod-website-821184871604/`

---

**Summary:** Website fully updated from BANNAAS to PHEpoxyWorld, configured for your AWS infrastructure, and ready to deploy. Just add your content and run `./deploy.sh`! 🚀

**Updated:** January 18, 2026
