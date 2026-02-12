// Team member data
// PHEW - Replace with actual team information

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'PHEW - Founder Jerry Brown Jr',
    role: 'Founder & Master Craftsman',
    bio: 'PHEW - With over 10 years of Resin & Epoxy experience,Jerry Brown Jr founded this workshop with a vision to bring precision crafted art into homes around the world. Each piece reflects a deep passion for the craft and need to perfect it into something grand amd worthy of use in your home.',
    image: '/images/team/PHEW-founder.jpg',
    social: {
      instagram: '#',
      twitter: '#',
    },
  },
  {
    id: '2',
    name: 'PHEW - Designer *It could be you!* ',
    role: 'Lead Designer',
    bio: 'PHEW - *** OPEN brings creative vision to every new piece, blending traditional woodworking aesthetics with contemporary design sensibilities. Their sketches form the blueprint for our most beloved figurines.',
    image: '/images/team/PHEW-designer.jpg',
    social: {
      instagram: '#',
    },
  },
  {
    id: '3',
    name: 'PHEW - Artisan Name',
    role: 'Senior Artisan',
    bio: 'PHEW - A skilled craftsperson with expertise in fine detail work, [Name] specializes in bringing intricate features to life—from delicate feathers to expressive faces.',
    image: '/images/team/PHEW-artisan.jpg',
    social: {
      instagram: '#',
      linkedin: '#',
    },
  },
  {
    id: '4',
    name: 'PHEW - Operations Name',
    role: 'Operations Manager',
    bio: 'PHEW - Auslin Taylor ensures that every order is handled with care, from workshop to doorstep. His attention to detail guarantees that your figurine arrives in perfect condition.',
    image: '/images/team/PHEW-operations.jpg',
    social: {
      linkedin: '#',
    },
  },
];
