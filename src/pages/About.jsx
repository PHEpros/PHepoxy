import { Link } from 'react-router-dom';
import { ArrowRight, TreePine, Heart, Award, Users } from 'lucide-react';

function About() {
  const values = [
    {
      icon: TreePine,
      title: 'Sustainable Sourcing',
      description: 'PHEW - We partner with responsible forestry operations to ensure every piece of wood is ethically and sustainably harvested.'
    },
    {
      icon: Heart,
      title: 'Crafted with Passion',
      description: 'PHEW - Each figurine is made by artisans who pour their heart into every detail, creating pieces meant to be treasured.'
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'PHEW - We never compromise on materials or craftsmanship. Every piece undergoes rigorous quality inspection.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'PHEW - We support local artisan communities and provide fair wages and working conditions for all our craftspeople.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-charcoal-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(22, 163, 74, 0.4) 0%, transparent 50%),
                               radial-gradient(circle at 80% 80%, rgba(250, 204, 21, 0.3) 0%, transparent 50%)`
            }}
          />
        </div>
        
        <div className="container-custom section-padding relative">
          <div className="max-w-3xl">
            <span className="text-forest-400 font-medium text-sm uppercase tracking-wider">Our Story</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Where Epoxy Becomes
              <span className="text-wood-400"> Art</span>
            </h1>
            <p className="text-xl text-charcoal-300 leading-relaxed">
              PHEW - For over 10 years, we've been transforming raw timber into cherished collectibles 
              that capture imagination and stand the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              {/* PHEpoxyWorld: Replace with founder/workshop story image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-forest-100 to-charcoal-100 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-forest-200 rounded-full flex items-center justify-center">
                    <span className="text-5xl">👨‍🔧</span>
                  </div>
                  <p className="text-forest-700 font-display font-bold">PHEpoxyWorld</p>
                  <p className="text-charcoal-400 text-sm mt-2">Founder Story Image</p>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-wood-400 rounded-2xl -z-10" />
            </div>

            {/* Content */}
            <div>
              <span className="text-forest-600 font-medium text-sm uppercase tracking-wider">How It All Began</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900 mt-4 mb-6">
                From a Small Workshop to Your Home
              </h2>
              <div className="space-y-4 text-charcoal-600 leading-relaxed">
                <p>
                  PHEW - It started in a modest garage workshop in 1998, with nothing but a few hand tools, 
                  a pile of reclaimed oak, and an unwavering passion for Plastic fabrication. Our founder believed 
                  that mass-produced decor had lost its soul, and set out to create something different.
                </p>
                <p>
                  PHEW - Word spread quickly. What began as gifts for friends and family soon became a 
                  sought-after collection. Today, our team of skilled artisans continues that original vision, 
                  creating each piece with the same care and attention as that very first carving.
                </p>
                <p>
                  PHEW - We've grown, but our values haven't changed. Every figurine that leaves our 
                  workshop carries with it the warmth of human hands and the rich tradition of Plastic fabrication 
                  passed down through generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-forest-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-forest-600 font-medium text-sm uppercase tracking-wider">What We Stand For</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900 mt-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl border border-charcoal-100 hover:shadow-lg hover:border-forest-200 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-forest-100 rounded-xl flex items-center justify-center mb-4">
                  <value.icon size={28} className="text-forest-700" />
                </div>
                <h3 className="font-display text-lg font-bold text-charcoal-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-charcoal-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-forest-600 font-medium text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900 mt-4">
              From Raw Epoxy to Refined Art
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Selection', desc: 'PHEW - We hand-select each piece of wood for grain, character, and quality.' },
              { step: '02', title: 'Design', desc: 'PHEW - Our artists sketch and plan each figurine to maximize the wood\'s natural beauty.' },
              { step: '03', title: 'Carving', desc: 'PHEW - Master craftsmen shape the wood using traditional and modern techniques.' },
              { step: '04', title: 'Finishing', desc: 'PHEW - Each piece is sanded, stained, and sealed to perfection.' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <span className="font-display text-6xl font-bold text-forest-100">{item.step}</span>
                  <h3 className="font-display text-xl font-bold text-charcoal-900 -mt-4 mb-3 relative">
                    {item.title}
                  </h3>
                  <p className="text-charcoal-600 text-sm">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-forest-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-charcoal-900 text-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '25+', label: 'Years of Craft' },
              { number: '10,000+', label: 'Pieces Created' },
              { number: '50+', label: 'Unique Designs' },
              { number: '98%', label: 'Happy Customers' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="font-display text-4xl md:text-5xl font-bold text-wood-400">{stat.number}</p>
                <p className="text-charcoal-300 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-forest-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
              Ready to Own a Piece of Our Story?
            </h2>
            <p className="text-charcoal-600 text-lg mb-8">
              PHEW - Browse our collection and find the perfect handcrafted figurine for your home or someone special.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products" className="btn-primary text-lg px-8 py-4">
                Shop Collection
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link to="/team" className="btn-outline text-lg px-8 py-4">
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
