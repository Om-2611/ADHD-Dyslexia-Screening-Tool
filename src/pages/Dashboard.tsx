import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Shield, Users, BarChart3, Award, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: t('features.adhd.title'),
      description: t('features.adhd.description')
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: t('features.dyslexia.title'),
      description: t('features.dyslexia.description')
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: t('features.reports.title'),
      description: t('features.reports.description')
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: t('features.standards.title'),
      description: t('features.standards.description')
    }
  ];

  const benefits = t('benefits.items', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
             {/* Navigation */}
       <nav className="bg-white shadow-sm border-b">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16 space-y-4 sm:space-y-0">
             <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
               <Brain className="h-8 w-8 text-blue-600 mr-2" />
               <span className="text-xl font-bold text-gray-900">{t('navigation.brand')}</span>
             </div>
             <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
               <div className="w-full sm:w-auto flex justify-center">
                 <LanguageSwitcher />
               </div>
               <div className="flex space-x-3 w-full sm:w-auto justify-center">
                 <Link to="/login" className="w-24 sm:w-auto">
                   <Button variant="outline" className="px-4 py-2 w-full">
                     {t('common.login')}
                   </Button>
                 </Link>
                 <Link to="/signup" className="w-24 sm:w-auto">
                   <Button className="px-4 py-2 w-full">
                     {t('common.signup')}
                   </Button>
                 </Link>
               </div>
             </div>
           </div>
         </div>
       </nav>

             {/* Hero Section */}
       <div className="relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
           <div className="text-center">
             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
               <span className="text-blue-600">{t('hero.title')}</span>
               <br />
               {t('hero.subtitle')}
             </h1>
             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
               {t('hero.description')}
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/signup">
                 <Button size="lg" className="px-8 py-3 text-lg">
                   {t('common.getStarted')}
                 </Button>
               </Link>
               <Link to="/login">
                 <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                   {t('common.signIn')}
                 </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>

             {/* Features Section */}
       <div className="py-16 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900 mb-4">
               {t('features.title')}
             </h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               {t('features.subtitle')}
             </p>
           </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
                         <div>
               <h2 className="text-3xl font-bold text-gray-900 mb-6">
                 {t('benefits.title')}
               </h2>
               <div className="space-y-4">
                 {benefits.map((benefit, index) => (
                   <div key={index} className="flex items-center">
                     <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                     <span className="text-gray-700">{benefit}</span>
                   </div>
                 ))}
               </div>
               <div className="mt-8">
                 <Link to="/signup">
                   <Button size="lg" className="px-6 py-3">
                     {t('common.startAssessment')}
                   </Button>
                 </Link>
               </div>
             </div>
                         <div className="bg-white p-8 rounded-lg shadow-lg">
               <div className="text-center">
                 <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
                   {t('security.title')}
                 </h3>
                 <p className="text-gray-600 mb-4">
                   {t('security.description')}
                 </p>
                 <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                   <div className="flex items-center">
                     <Clock className="h-4 w-4 mr-1" />
                     <span>{t('security.duration')}</span>
                   </div>
                   <div className="flex items-center">
                     <Users className="h-4 w-4 mr-1" />
                     <span>{t('security.professional')}</span>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

             {/* CTA Section */}
       <div className="py-16 bg-blue-600">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-bold text-white mb-4">
             {t('cta.title')}
           </h2>
           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
             {t('cta.description')}
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/signup">
               <Button variant="secondary" size="lg" className="px-8 py-3 text-lg">
                 {t('common.createAccount')}
               </Button>
             </Link>
             <Link to="/login">
               <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                 {t('common.signIn')}
               </Button>
             </Link>
           </div>
         </div>
       </div>

             {/* Footer */}
       <footer className="bg-gray-900 text-white py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-4 gap-8">
             <div>
               <div className="flex items-center mb-4">
                 <Brain className="h-8 w-8 text-blue-400 mr-2" />
                 <span className="text-xl font-bold">{t('navigation.brand')}</span>
               </div>
               <p className="text-gray-400">
                 {t('footer.description')}
               </p>
             </div>
             <div>
               <h3 className="text-lg font-semibold mb-4">{t('footer.platform')}</h3>
               <ul className="space-y-2 text-gray-400">
                 <li><Link to="/login" className="hover:text-white">{t('common.login')}</Link></li>
                 <li><Link to="/signup" className="hover:text-white">{t('common.signup')}</Link></li>
                 <li><a href="#" className="hover:text-white">{t('footer.links.about')}</a></li>
                 <li><a href="#" className="hover:text-white">{t('footer.links.contact')}</a></li>
               </ul>
             </div>
             <div>
               <h3 className="text-lg font-semibold mb-4">{t('footer.assessments')}</h3>
               <ul className="space-y-2 text-gray-400">
                 <li><a href="#" className="hover:text-white">{t('footer.links.adhdScreening')}</a></li>
                 <li><a href="#" className="hover:text-white">{t('footer.links.dyslexiaAssessment')}</a></li>
                 <li><a href="#" className="hover:text-white">{t('footer.links.testResults')}</a></li>
                 <li><a href="#" className="hover:text-white">{t('footer.links.progressTracking')}</a></li>
               </ul>
             </div>
             <div>
               <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
               <ul className="space-y-2 text-gray-400">
                 <li><a href="#" className="hover:text-white">{t('footer.links.helpCenter')}</a></li>
                 <li><a href="#" className="hover:text-white">{t('footer.links.privacyPolicy')}</a></li>
                 <li><a href="#" className="hover:text-white">{t('footer.links.termsOfService')}</a></li>
                 <li><a href="#" className="hover:text-white">{t('footer.links.contactSupport')}</a></li>
               </ul>
             </div>
           </div>
           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
             <p>{t('footer.copyright')}</p>
           </div>
         </div>
       </footer>
    </div>
  );
};

export default Dashboard; 