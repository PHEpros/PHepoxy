function TeamMemberCard({ member }) {
  return (
    <div className="card overflow-hidden group">
      {/* Image */}
      <div className="aspect-[4/5] bg-charcoal-100 relative overflow-hidden">
        {/* PHEpoxyWorld: Replace with actual team member photo */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest-100 to-charcoal-100">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-forest-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-forest-700 font-display text-3xl font-bold">
                {member.name.split(' ').map(n => n[0]).join('').slice(-2)}
              </span>
            </div>
            <span className="text-xs text-charcoal-400 font-mono">PHEpoxyWorld</span>
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-charcoal-900 group-hover:text-forest-700 transition-colors">
          {member.name}
        </h3>
        <p className="text-forest-600 font-medium text-sm mt-1">
          {member.role}
        </p>
        
        <p className="text-charcoal-600 text-sm mt-4 leading-relaxed">
          {member.bio}
        </p>
        
        {/* Specialties */}
        {member.specialties && (
          <div className="mt-4 pt-4 border-t border-charcoal-100">
            <p className="text-xs text-charcoal-400 uppercase tracking-wide mb-2">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {member.specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-forest-50 text-forest-700 rounded-full text-xs font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamMemberCard;
