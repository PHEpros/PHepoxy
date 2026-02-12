import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TeamMemberCard from '../components/TeamMemberCard';
import { teamMembers } from '../data/team';

function Team() {
  return (
    <div className="min-h-screen bg-charcoal-50">
      {/* Hero Section */}
      <section className="bg-charcoal-900 text-white">
        <div className="container-custom section-padding py-16">
          <div className="max-w-3xl">
            <span className="text-forest-400 font-medium text-sm uppercase tracking-wider">The Artisans</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Meet the <span className="text-wood-400">Team</span>
            </h1>
            <p className="text-xl text-charcoal-300">
              PHEW - The skilled hands and creative minds behind every figurine. Our team combines 
              decades of experience with genuine passion for the craft.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-forest-600 font-medium text-sm uppercase tracking-wider">Careers</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900 mt-4 mb-6">
                Join Our Workshop
              </h2>
              <p className="text-charcoal-600 leading-relaxed mb-6">
                PHEW - We're always looking for talented artisans who share our passion for woodworking. 
                Whether you're an experienced craftsperson or eager to learn, we'd love to hear from you.
              </p>
              <p className="text-charcoal-600 leading-relaxed mb-8">
                PHEW - We offer competitive compensation, a supportive creative environment, and the 
                opportunity to work on pieces that bring joy to collectors around the world.
              </p>
              <Link to="/contact" className="btn-primary">
                Get in Touch
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            {/* Image placeholder */}
            <div className="relative">
              {/* PHEpoxyWorld: Replace with team/workshop image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-forest-100 to-charcoal-100 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-forest-200 rounded-full flex items-center justify-center">
                    <span className="text-5xl">👥</span>
                  </div>
                  <p className="text-forest-700 font-display font-bold">PHEpoxyWorld</p>
                  <p className="text-charcoal-400 text-sm mt-2">Team Workshop Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-forest-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-forest-600 font-medium text-sm uppercase tracking-wider">Our Culture</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900 mt-4">
              Why We Love What We Do
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Creative Freedom',
                description: 'PHEW - Every team member has the opportunity to contribute designs and bring their artistic vision to life.'
              },
              {
                title: 'Continuous Learning',
                description: 'PHEW - We invest in our team\'s growth through workshops, mentorship, and hands-on training with master craftsmen.'
              },
              {
                title: 'Meaningful Work',
                description: 'PHEW - There\'s nothing quite like knowing your work brings joy to collectors and becomes part of their family traditions.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-forest-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-display font-bold">
                  {index + 1}
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">{item.title}</h3>
                <p className="text-charcoal-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-forest-700 to-forest-800 text-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            See Our Work in Action
          </h2>
          <p className="text-forest-100 text-lg mb-8 max-w-2xl mx-auto">
            PHEW - Explore our gallery to see the passion and precision our team puts into every piece.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/gallery" className="btn-secondary text-lg px-8 py-4">
              View Gallery
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link to="/products" className="btn-outline border-white text-white hover:bg-white hover:text-forest-800 text-lg px-8 py-4">
              Shop Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
