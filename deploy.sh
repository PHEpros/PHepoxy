#!/bin/bash
# PHEpoxyWorld Deployment Script
# Usage: ./deploy.sh

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
S3_BUCKET="phepros-prod-website-821184871604"
CLOUDFRONT_COMMENT="PHEpros website distribution"

echo -e "${BLUE}🚀 PHEpoxyWorld Deployment Script${NC}"
echo "=================================="
echo ""

# Step 1: Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js first.${NC}"
    exit 1
fi
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not found. Please install AWS CLI first.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Prerequisites OK${NC}"
echo ""

# Step 2: Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 3: Build project
echo -e "${BLUE}🔨 Building project...${NC}"
npm run build
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build successful${NC}"
echo ""

# Step 4: Sync to S3
echo -e "${BLUE}☁️  Uploading to S3...${NC}"
aws s3 sync dist/ s3://${S3_BUCKET}/ --delete
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Upload successful${NC}"
else
    echo -e "${RED}❌ Upload failed${NC}"
    exit 1
fi
echo ""

# Step 5: Get CloudFront distribution ID
echo -e "${BLUE}🔍 Finding CloudFront distribution...${NC}"
DIST_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Comment=='${CLOUDFRONT_COMMENT}'].Id" \
    --output text)

if [ -z "$DIST_ID" ]; then
    echo -e "${RED}⚠️  Could not find CloudFront distribution${NC}"
    echo "Please invalidate cache manually:"
    echo "aws cloudfront create-invalidation --distribution-id YOUR_ID --paths \"/*\""
else
    echo -e "${GREEN}✅ Found distribution: ${DIST_ID}${NC}"
    
    # Step 6: Invalidate CloudFront cache
    echo -e "${BLUE}🔄 Invalidating CloudFront cache...${NC}"
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id ${DIST_ID} \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Cache invalidation started (ID: ${INVALIDATION_ID})${NC}"
        echo "   Note: It may take 5-10 minutes for changes to propagate"
    else
        echo -e "${RED}❌ Cache invalidation failed${NC}"
    fi
fi
echo ""

# Final message
echo -e "${GREEN}=================================="
echo "🎉 Deployment Complete!"
echo "==================================${NC}"
echo ""
echo "Your website is live at:"
echo -e "${BLUE}https://d1o9vf52vkst66.cloudfront.net${NC}"
echo ""
echo "Wait 5-10 minutes for CloudFront to update, then refresh your browser."
echo ""
