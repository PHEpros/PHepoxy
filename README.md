# PHEpoxyWorld Website - Deployment Guide

## 🎯 Project Overview

**Brand:** PHEpoxyWorld  
**Business:** Handcrafted wooden figurines & collectibles (3-12 inch pieces)  
**Design:** Amazon-inspired layout with warm, minimal, playful aesthetic  
**Colors:** Black, Green, Yellow

## 📦 Current Infrastructure

### AWS Resources (Deployed)
- **CloudFront CDN:** https://d1o9vf52vkst66.cloudfront.net
- **S3 Bucket:** phepros-prod-website-821184871604
- **API Gateway:** https://bc5maaefa0.execute-api.us-east-1.amazonaws.com
- **DynamoDB:** phepros-prod-newsletter
- **SES Email:** PHEpros@proton.me (verified)

### API Endpoints
- Contact Form: POST /api/contact
- Newsletter: POST /api/newsletter

## 🚀 Quick Deploy

### Prerequisites
```bash
node --version  # v18 or higher
npm --version
aws --version  # AWS CLI configured
```

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

### 3. Deploy to AWS S3
```bash
aws s3 sync dist/ s3://phepros-prod-website-821184871604/ --delete
```

### 4. Invalidate CloudFront Cache
```bash
# First get your distribution ID
aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='PHEpros website distribution'].Id" --output text

# Then invalidate (replace DIST_ID with the ID from above)
aws cloudfront create-invalidation \
  --distribution-id DIST_ID \
  --paths "/*"
```

## 📋 Configuration

### Site Configuration (`src/config.js`)
All site settings are centralized in this file:
- API endpoints (already configured)
- Contact information
- Social media links
- Square storefront URLs

**To update:** Edit `/src/config.js` and rebuild.

## 🎨 Branding Placeholders

### PHEpoxyWorld Markers
- Location of logo/brand assets
- Already set to "PHEpoxyWorld"

### CORNBEF Markers
- Content placeholders for text/copy
- Replace with actual business content

**Find all placeholders:**
```bash
grep -r "CORNBEF" src/
```

## 📝 Content Updates Needed

### Priority 1: Contact Information
Update in `src/config.js`:
- [ ] Phone number (currently placeholder)
- [ ] Physical address (currently placeholder)
- [ ] Social media URLs (currently placeholders)

### Priority 2: Product Catalog
Update in `src/data/products.js`:
- [ ] Product descriptions (currently have CORNBEF markers)
- [ ] Pricing (currently placeholder)
- [ ] Square checkout links (update with real Square URLs)
- [ ] Product images (upload to S3/CloudFront)

### Priority 3: Team & About
- `src/data/team.js` - Team member info
- `src/data/testimonials.js` - Customer reviews  
- `src/pages/About.jsx` - Company story

### Priority 4: Images
Replace placeholders in:
- `/public/` - Logo, favicon, hero images
- Product images (recommended: upload to S3 separately)

## 🧪 Local Development

### Start Dev Server
```bash
npm run dev
```
Opens at http://localhost:5173

### Test Production Build
```bash
npm run build
npm run preview
```

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] All CORNBEF placeholders replaced with real content
- [ ] Product Square links updated
- [ ] Contact form tested locally
- [ ] Newsletter signup tested locally
- [ ] Images uploaded and paths updated
- [ ] Favicon replaced
- [ ] Google Analytics ID added (optional)

### Deployment Steps
- [ ] Run `npm run build` successfully
- [ ] Upload to S3: `aws s3 sync dist/ s3://phepros-prod-website-821184871604/ --delete`
- [ ] Invalidate CloudFront cache
- [ ] Test live site at https://d1o9vf52vkst66.cloudfront.net
- [ ] Submit test contact form
- [ ] Subscribe to newsletter (test email)

### Post-Deployment
- [ ] Verify all pages load
- [ ] Check mobile responsiveness
- [ ] Test product links
- [ ] Verify email deliverability

## 🔧 Troubleshooting

### Issue: Contact form not working
**Check:**
1. API endpoint in `src/config.js` is correct ✅ (already configured)
2. CORS is enabled on API Gateway
3. Lambda function has correct IAM permissions
4. SES email is verified ✅ (PHEpros@proton.me verified)

**Test API directly:**
```bash
curl -X POST https://bc5maaefa0.execute-api.us-east-1.amazonaws.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"general","message":"Test message","phone":""}'
```

### Issue: CloudFront shows old content
**Solution:** Invalidate cache
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

### Issue: Newsletter signup fails
**Check:**
1. DynamoDB table exists ✅
2. Lambda has permissions ✅
3. API endpoint is correct ✅
4. Email validation is working

**Test newsletter API:**
```bash
curl -X POST https://bc5maaefa0.execute-api.us-east-1.amazonaws.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 📊 Monitoring

### Check Logs
```bash
# API Gateway logs
aws logs tail /aws/apigateway/phepros-prod --follow

# Lambda function logs
aws logs tail /aws/lambda/phepros-prod-contact --follow
aws logs tail /aws/lambda/phepros-prod-newsletter --follow
```

### Check SES Status
```bash
aws ses get-account-sending-enabled --region us-east-1
aws ses list-verified-email-addresses --region us-east-1
```

### View CloudFront Distribution
```bash
aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='PHEpros website distribution']"
```

## 🌐 Custom Domain Setup (When Ready)

When `phepoxy.world` domain is approved:

1. **Create Route53 hosted zone** for phepoxy.world
2. **Request ACM certificate** in us-east-1 region for CloudFront
3. **Update CloudFront distribution** with custom domain
4. **Update DNS** records in Route53 to point to CloudFront
5. **Update src/config.js** with new domain URLs
6. **Rebuild and redeploy**

## 📚 Project Structure

```
woodcraft-site/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.jsx       # Main layout with header/footer
│   │   ├── NewsletterSignup.jsx  # Newsletter form
│   │   ├── ProductCard.jsx
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Contact.jsx
│   │   └── ...
│   ├── data/                # Static data
│   │   ├── products.js      # Product catalog
│   │   ├── team.js
│   │   └── testimonials.js
│   ├── config.js            # ⭐ Centralized configuration
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── dist/                    # Build output (gitignored)
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎯 Next Steps

### Immediate (Before First Deploy)
1. Replace CORNBEF placeholders with real content in:
   - `src/data/products.js` - Product descriptions
   - `src/data/team.js` - Team bios
   - `src/data/testimonials.js` - Customer reviews
   - `src/config.js` - Contact info & social links
2. Upload logo to `/public/`
3. Update Square checkout URLs
4. Test locally: `npm run dev`
5. Build and deploy: `npm run build && aws s3 sync dist/ s3://phepros-prod-website-821184871604/`

### Short-term
- Get SES out of sandbox (request production access if needed)
- Set up AWS CloudWatch alarms for errors
- Add Google Analytics tracking ID
- Upload product images

### Long-term
- Add custom domain (phepoxy.world)
- Implement customer accounts
- Add custom order submission with photo/video upload
- Expand product catalog to 100+ items

## 💡 Tips & Best Practices

- **Always test locally first:** Run `npm run dev` before deploying
- **Keep CORNBEF markers** until you have final content ready
- **Invalidate CloudFront cache** after every deployment to see changes
- **Check Lambda logs** if forms aren't working
- **Monitor AWS costs:** Budget alert set at $20/month
- **Use version control:** Commit changes before deploying

## 🚨 Important Notes

- **API endpoints are configured** and pointing to your deployed infrastructure
- **Email is verified** for PHEpros@proton.me
- **Budget monitoring** is active ($20/month threshold)
- **All infrastructure is in us-east-1** region

## 📞 Quick Reference

### Live URLs
- **Website:** https://d1o9vf52vkst66.cloudfront.net
- **API:** https://bc5maaefa0.execute-api.us-east-1.amazonaws.com

### AWS Resources
- **S3 Bucket:** phepros-prod-website-821184871604
- **DynamoDB:** phepros-prod-newsletter
- **SES Email:** PHEpros@proton.me

### Deploy Command (One-liner)
```bash
npm run build && aws s3 sync dist/ s3://phepros-prod-website-821184871604/ --delete && echo "✅ Deployed! Don't forget to invalidate CloudFront cache."
```

---

**Last Updated:** January 18, 2026  
**Status:** ✅ Infrastructure deployed, ready for content and first deploy  
**Contact:** PHEpros@proton.me
