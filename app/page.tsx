import Image from "next/image";
import { 
  Shield, 
  Heart,
  TrendingUp,
  Star,
  Users,
  Award,
  CheckCircle
} from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { MobileMenu } from './components/MobileMenu';
import { ConsultationForm } from './components/ConsultationForm';

const services = [
  {
    icon: Heart,
    title: "Term Life Insurance",
    description: "Affordable protection for your family's financial security and peace of mind.",
    features: ["Flexible terms", "Competitive rates", "No medical exam options"]
  },
  {
    icon: TrendingUp,
    title: "Annuities",
    description: "Secure retirement income and guaranteed growth for your golden years.",
    features: ["Guaranteed income", "Tax advantages", "Flexible payment options"]
  },
  {
    icon: Shield,
    title: "IUL (Indexed Universal Life)",
    description: "Life insurance with investment potential and tax-advantaged growth.",
    features: ["Market upside potential", "Downside protection", "Tax-free loans"]
  },
];

const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "2,500+", label: "Families Protected" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "$50M+", label: "Coverage Provided" },
];

const testimonials = [
  {
    name: "Sarah & Michael Johnson",
    role: "Young Family",
    review: "Wanderi helped us understand our insurance needs as new parents. Their guidance was invaluable in choosing the right term life policy.",
    rating: 5,
  },
  {
    name: "Robert Chen",
    role: "Pre-Retiree",
    review: "The annuity consultation was exactly what I needed. Now I have confidence in my retirement income strategy.",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    role: "Business Owner",
    review: "The IUL policy provides both protection for my family and growth potential. Best financial decision I've made.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Wanderi</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-8 text-sm font-medium">
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Reviews</a>
                <a href="#consultation" className="text-muted-foreground hover:text-primary transition-colors">Consultation</a>
              </nav>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <a href="#consultation" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                  Book Now
                </a>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground leading-tight">
              Protecting Families,
              <br />
              <span className="text-primary">Securing Futures</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
              Expert guidance on life insurance, annuities, and retirement planning. Let's build a financial safety net that grows with your family.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#consultation" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-base font-semibold transition-colors">
                Get Free Consultation
              </a>
              <a href="#services" className="text-base font-semibold leading-6 text-foreground hover:text-primary">
                Learn More <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Insurance Services</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Comprehensive financial protection tailored to your family's unique needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why Choose Wanderi Insurance?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We understand that every family is unique. That's why we take the time to understand your specific needs, goals, and concerns before recommending any financial products.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Family-First Approach</h4>
                    <p className="text-muted-foreground">Your family's security is our top priority. We design strategies that protect what matters most.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Expert Guidance</h4>
                    <p className="text-muted-foreground">15+ years of experience helping families navigate complex financial decisions with confidence.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Trusted Advisor</h4>
                    <p className="text-muted-foreground">We build lasting relationships based on trust, transparency, and your family's long-term success.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary/10 rounded-2xl p-8">
                <div className="bg-background rounded-lg p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Free Consultation Includes:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                      Complete family financial assessment
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                      Personalized insurance recommendations
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                      Market comparison and quotes
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary mr-3" />
                      No obligation or pressure
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">What Our Families Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Real stories from real families we've helped protect and grow their wealth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.review}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation" className="py-20 sm:py-32 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Ready to Protect Your Family?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Schedule your free consultation today. No pressure, just personalized guidance for your family's financial future.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">Wanderi</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Protecting families and securing futures through expert insurance guidance and personalized financial planning.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Services</h4>
              <ul className="space-y-3">
                <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Term Life Insurance</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Annuities</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">IUL Insurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</a></li>
                <li><a href="#consultation" className="text-muted-foreground hover:text-primary transition-colors">Free Consultation</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Wanderi Insurance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
