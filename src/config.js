// PHEpoxyWorld Configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: 'https://bc5maaefa0.execute-api.us-east-1.amazonaws.com/Prod',
    endpoints: {
      contact: '/api/contact',
      newsletter: '/api/newsletter'
    }
  },
  
  // Website Configuration
  site: {
    name: 'PHEpoxyWorld',
    url: 'https://d1o9vf52vkst66.cloudfront.net',
    description: 'Custom 3D printed sculptures, epoxy resin art, and precision-fabricated collectibles. Where modern technology meets artistic vision.',
    email: 'PHEpros@proton.me',
    phone: 'PHEW - (123) 456-7890',
    address: 'PHEW -  Huron St. Jackson, MI'
  },
  
  // Social Media Links
  social: {
    TikTok: 'https://www.tiktok.com/@phepoxyworld',
    instagram: 'https://www.instagram.com/powerhouseepoxypros/',
  },
  
  // Square Integration
  square: {
    storefront: 'https://powerhouseepoxyworld.square.site'
  },
  
  // Google Analytics
  analytics: {
    measurementId: 'PHEW-GA_MEASUREMENT_ID'
  }
};
