# PHEpoxyWorld - Quick Start Guide

## 🎯 What's Done
- ✅ All "BANNAAS" replaced with "PHEpoxyWorld"
- ✅ API endpoints configured for your AWS infrastructure
- ✅ Contact form connected to Lambda function
- ✅ Newsletter signup connected to DynamoDB
- ✅ Site config centralized in `src/config.js`

## 🚀 Deploy in 3 Steps

### 1. Install & Build
```bash
npm install
npm run build
```

### 2. Deploy (Automated)
```bash
./deploy.sh
```

Or manually:
```bash
aws s3 sync dist/ s3://phepros-prod-website-821184871604/ --delete
```

### 3. Test
Visit: https://d1o9vf52vkst66.cloudfront.net

Wait 5-10 minutes for CloudFront cache to clear.

## 📝 Before Going Live

### Update Content (Priority Order)

1. **Contact Info** (`src/config.js`)
   - Replace phone number placeholder
   - Replace address placeholder
   - Update social media links

2. **Product Details** (`src/data/products.js`)
   - Update all product descriptions (search for "CORNBEF")
   - Add real Square checkout URLs
   - Upload product images

3. **About Content**
   - `src/data/team.js` - Team member information
   - `src/data/testimonials.js` - Customer reviews
   - `src/pages/About.jsx` - Company story

4. **Images**
   - Replace logo in `/public/`
   - Upload product images
   - Add team photos

## 🔍 Find All Placeholders

```bash
# Find all content placeholders
grep -r "CORNBEF" src/

# Find all brand asset placeholders (should all be "PHEpoxyWorld" now)
grep -r "PHEpoxyWorld" src/
```

## 🧪 Test Locally First

```bash
npm run dev
```

Opens at http://localhost:5173

Test:
- [ ] All pages load
- [ ] Contact form works
- [ ] Newsletter signup works
- [ ] Product links work
- [ ] Mobile responsive

## 📊 Your Infrastructure

| Resource | Value |
|----------|-------|
| Website | https://d1o9vf52vkst66.cloudfront.net |
| API | https://bc5maaefa0.execute-api.us-east-1.amazonaws.com |
| S3 Bucket | phepros-prod-website-821184871604 |
| Email | PHEpros@proton.me |

## 💡 Tips

- Always test locally before deploying
- Use `./deploy.sh` for easy deployment
- Wait 5-10 minutes after deploy for CloudFront to update
- Check Lambda logs if forms don't work
- Keep CORNBEF markers until you have final content

## 🆘 Quick Troubleshooting

### Site not updating after deploy?
```bash
# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id $(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='PHEpros website distribution'].Id" --output text) \
  --paths "/*"
```

### Contact form not working?
```bash
# Check Lambda logs
aws logs tail /aws/lambda/phepros-prod-contact --follow
```

### Newsletter not working?
```bash
# Check Lambda logs
aws logs tail /aws/lambda/phepros-prod-newsletter --follow
```

## 📚 Full Documentation

See `README.md` for complete documentation including:
- Detailed deployment instructions
- Content update checklist
- Monitoring and troubleshooting
- Custom domain setup (when ready)

---

**Ready to deploy?** Run `./deploy.sh` and you're live in minutes! 🚀
