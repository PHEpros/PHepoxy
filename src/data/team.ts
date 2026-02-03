// Team member data
// CORNBEF - Replace with actual team information

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
    name: 'CORNBEF - Founder Name',
    role: 'Founder & Master Craftsman',
    bio: 'CORNBEF - With over 10 years of woodworking experience, [Name] founded this workshop with a vision to bring handcrafted wooden art into homes around the world. Each piece reflects a deep passion for the craft and respect for natural materials.',
    image: '/images/team/CORNBEF-founder.jpg',
    social: {
      instagram: '#',
      twitter: '#',
    },
  },
  {
    id: '2',
    name: 'CORNBEF - Designer Name',
    role: 'Lead Designer',
    bio: 'CORNBEF - [Name] brings creative vision to every new piece, blending traditional woodworking aesthetics with contemporary design sensibilities. Their sketches form the blueprint for our most beloved figurines.',
    image: '/images/team/CORNBEF-designer.jpg',
    social: {
      instagram: '#',
    },
  },
  {
    id: '3',
    name: 'CORNBEF - Artisan Name',
    role: 'Senior Artisan',
    bio: 'CORNBEF - A skilled craftsperson with expertise in fine detail work, [Name] specializes in bringing intricate features to life—from delicate feathers to expressive faces.',
    image: '/images/team/CORNBEF-artisan.jpg',
    social: {
      instagram: '#',
      linkedin: '#',
    },
  },
  {
    id: '4',
    name: 'CORNBEF - Operations Name',
    role: 'Operations Manager',
    bio: 'CORNBEF - [Name] ensures that every order is handled with care, from workshop to doorstep. Their attention to detail guarantees that your figurine arrives in perfect condition.',
    image: '/images/team/CORNBEF-operations.jpg',
    social: {
      linkedin: '#',
    },
  },
];
