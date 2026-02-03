import { useState } from 'react';
import { Upload, X, Calendar, DollarSign, Ruler, Package, Palette, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { categories, materials, sizeOptions } from '../data/products';
import { config } from '../config';

function CustomOrder() {
  const [formData, setFormData] = useState({
    // Contact Info
    name: '',
    email: '',
    phone: '',
    
    // Order Details
    category: '',
    fabricationType: '',
    sizeLength: '6',
    sizeUnit: 'inches',
    quantity: '1',
    targetDate: '',
    
    // Preferences
    materialPreference: '',
    colorPreferences: '',
    budgetRange: '',
    
    // Description
    description: '',
    
    // Files
    files: []
  });

  const [uploading, setUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const fabricationTypes = [
    { value: '3d-print', label: '3D Printing Only' },
    { value: 'epoxy', label: 'Epoxy/Resin Only' },
    { value: 'combination', label: 'Combination (3D Print + Epoxy Finish)' },
  ];

  const budgetRanges = [
    { value: '50-100', label: '$50 - $100' },
    { value: '100-250', label: '$100 - $250' },
    { value: '250-500', label: '$250 - $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000+', label: '$1,000+' },
    { value: 'flexible', label: 'Flexible / Need Quote' },
  ];

  const targetDates = [
    { value: '1-2weeks', label: '1-2 Weeks' },
    { value: '2-4weeks', label: '2-4 Weeks' },
    { value: '1-2months', label: '1-2 Months' },
    { value: '2-3months', label: '2-3 Months' },
    { value: '3-6months', label: '3-6 Months' },
    { value: 'flexible', label: 'Flexible / No Rush' },
  ];

  const sizeUnits = [
    { value: 'inches', label: 'Inches' },
    { value: 'feet', label: 'Feet' },
    { value: 'cm', label: 'Centimeters' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = formData.files.length + newFiles.length;
    
    if (totalFiles > 5) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Maximum 5 files allowed. Please remove some files first.' 
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSubmitStatus({ type: '', message: '' });

    // Validate required fields
    if (!formData.name || !formData.email || !formData.category || 
        !formData.fabricationType || !formData.description || !formData.targetDate) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please fill in all required fields marked with *' 
      });
      setUploading(false);
      return;
    }

    try {
      // Prepare form data for submission
      const submitData = {
        ...formData,
        size: `${formData.sizeLength} ${formData.sizeUnit}`,
        fileNames: formData.files.map(f => f.name).join(', '),
        timestamp: new Date().toISOString(),
      };

      // Submit to API
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.contact}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: submitData.name,
          email: submitData.email,
          phone: submitData.phone || 'Not provided',
          subject: `Custom Order Request - ${submitData.category}`,
          message: `
CUSTOM ORDER REQUEST

=== CONTACT INFO ===
Name: ${submitData.name}
Email: ${submitData.email}
Phone: ${submitData.phone || 'Not provided'}

=== ORDER DETAILS ===
Category: ${submitData.category}
Fabrication Type: ${submitData.fabricationType}
Size: ${submitData.size}
Quantity: ${submitData.quantity}
Target Completion: ${submitData.targetDate}

=== PREFERENCES ===
Material Preference: ${submitData.materialPreference || 'No preference'}
Color Preferences: ${submitData.colorPreferences || 'No preference'}
Budget Range: ${submitData.budgetRange || 'Not specified'}

=== DESCRIPTION ===
${submitData.description}

=== ATTACHMENTS ===
${submitData.fileNames || 'No files attached'}
(Note: Files cannot be sent via email - customer should be contacted to arrange file transfer)

---
Submitted: ${new Date(submitData.timestamp).toLocaleString()}
          `.trim(),
        }),
      });

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Custom order request submitted successfully! We\'ll contact you within 24-48 hours.' 
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: '',
          fabricationType: '',
          sizeLength: '6',
          sizeUnit: 'inches',
          quantity: '1',
          targetDate: '',
          materialPreference: '',
          colorPreferences: '',
          budgetRange: '',
          description: '',
          files: []
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting custom order:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to submit request. Please try again or contact us directly at ' + config.site.email 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen">
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
            <span className="text-forest-400 font-medium text-sm uppercase tracking-wider">
              Bring Your Vision to Life
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Custom Order
              <span className="text-wood-400"> Request</span>
            </h1>
            <p className="text-xl text-charcoal-300 leading-relaxed">
              From concept to creation - we'll work with you to design and fabricate 
              your unique piece using cutting-edge 3D printing and hand-crafted epoxy techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-charcoal-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-charcoal-200">
                <Calendar className="text-forest-600 mb-2" size={24} />
                <h3 className="font-semibold text-charcoal-900 mb-1">Timeline</h3>
                <p className="text-sm text-charcoal-600">Custom orders typically take 2-6 weeks depending on complexity</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-charcoal-200">
                <DollarSign className="text-forest-600 mb-2" size={24} />
                <h3 className="font-semibold text-charcoal-900 mb-1">Pricing</h3>
                <p className="text-sm text-charcoal-600">We'll provide a detailed quote within 48 hours of your submission</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-charcoal-200">
                <Package className="text-forest-600 mb-2" size={24} />
                <h3 className="font-semibold text-charcoal-900 mb-1">Process</h3>
                <p className="text-sm text-charcoal-600">Design approval, production updates, and quality inspection included</p>
              </div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6 flex items-center gap-2">
                  <User className="text-forest-600" size={24} />
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Phone Number <span className="text-charcoal-400">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="mb-8 pt-8 border-t border-charcoal-200">
                <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6 flex items-center gap-2">
                  <Package className="text-forest-600" size={24} />
                  Order Details
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a category...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                      <option value="Other">Other (specify in description)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Fabrication Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="fabricationType"
                      value={formData.fabricationType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select fabrication type...</option>
                      {fabricationTypes.map(type => (
                        <option key={type.value} value={type.label}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Size <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="sizeLength"
                        value={formData.sizeLength}
                        onChange={handleInputChange}
                        min="0.5"
                        max="144"
                        step="0.5"
                        required
                        className="flex-1 px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                        placeholder="6"
                      />
                      <select
                        name="sizeUnit"
                        value={formData.sizeUnit}
                        onChange={handleInputChange}
                        className="px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      >
                        {sizeUnits.map(unit => (
                          <option key={unit.value} value={unit.value}>{unit.label}</option>
                        ))}
                      </select>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1">Approximate largest dimension</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      max="100"
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Target Completion Date <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="targetDate"
                      value={formData.targetDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select timeframe...</option>
                      {targetDates.map(date => (
                        <option key={date.value} value={date.label}>{date.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="mb-8 pt-8 border-t border-charcoal-200">
                <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6 flex items-center gap-2">
                  <Palette className="text-forest-600" size={24} />
                  Preferences
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Material Preference <span className="text-charcoal-400">(optional)</span>
                    </label>
                    <select
                      name="materialPreference"
                      value={formData.materialPreference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    >
                      <option value="">No preference</option>
                      {Object.values(materials).flat().map(mat => (
                        <option key={mat.id} value={mat.name}>{mat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Budget Range <span className="text-charcoal-400">(optional)</span>
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select budget range...</option>
                      {budgetRanges.map(range => (
                        <option key={range.value} value={range.label}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Color Preferences <span className="text-charcoal-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="colorPreferences"
                      value={formData.colorPreferences}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                      placeholder="e.g., Metallic blue with silver accents"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 pt-8 border-t border-charcoal-200">
                <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6 flex items-center gap-2">
                  <MessageSquare className="text-forest-600" size={24} />
                  Project Description
                </h2>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Describe Your Vision <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project... What are you looking to create? Any specific details, features, or inspirations? The more detail you provide, the better we can bring your vision to life!"
                  />
                  <p className="text-xs text-charcoal-500 mt-1">
                    Tip: Include details about style, function, any specific features, and what makes this piece special to you
                  </p>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-8 pt-8 border-t border-charcoal-200">
                <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6 flex items-center gap-2">
                  <Upload className="text-forest-600" size={24} />
                  Reference Images
                </h2>
                <div className="border-2 border-dashed border-charcoal-300 rounded-lg p-8 text-center hover:border-forest-500 transition-colors">
                  <Upload className="mx-auto text-charcoal-400 mb-4" size={48} />
                  <p className="text-charcoal-700 mb-2">
                    Upload reference images, sketches, or inspiration photos
                  </p>
                  <p className="text-sm text-charcoal-500 mb-4">
                    Max 5 files • PNG, JPG, or PDF • Up to 10MB each
                  </p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    multiple
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block btn-primary cursor-pointer"
                  >
                    Choose Files
                  </label>
                </div>

                {/* File List */}
                {formData.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.files.map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between bg-charcoal-50 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Upload className="text-forest-600" size={20} />
                          <div>
                            <p className="text-sm font-medium text-charcoal-900">{file.name}</p>
                            <p className="text-xs text-charcoal-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Message */}
              {submitStatus.message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6 border-t border-charcoal-200">
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Submitting...' : 'Submit Custom Order Request'}
                </button>
                <p className="text-sm text-charcoal-500 text-center mt-3">
                  We'll review your request and contact you within 24-48 hours with a detailed quote
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CustomOrder;
