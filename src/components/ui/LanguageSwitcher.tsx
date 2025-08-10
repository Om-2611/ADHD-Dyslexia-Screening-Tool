import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguageManager } from '../../hooks/useLanguageManager';

const LanguageSwitcher: React.FC = () => {
  try {
    const { currentLanguage, changeLanguage, languages } = useLanguageManager();

    const handleLanguageChange = (languageCode: string) => {
      changeLanguage(languageCode);
    };

    // Debug: Log to console to verify component is rendering
    console.log('LanguageSwitcher rendering, current language:', currentLanguage);

    return (
      <div className="flex flex-col md:flex-row items-center gap-2" title="Change Language">
        <div className="flex items-center">
          <Globe className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-gray-700 mr-2">Language:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${currentLanguage === language.code 
                ? 'bg-blue-500 text-white font-medium shadow-sm' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              aria-label={`Switch to ${language.name}`}
            >
              <span className="text-lg mr-2">{language.flag}</span>
              <span className="text-base font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('LanguageSwitcher error:', error);
    return (
      <div className="bg-red-500 text-white p-3 rounded-lg border-2 border-red-700">
        LANGUAGE SWITCHER ERROR: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
};

export default LanguageSwitcher;