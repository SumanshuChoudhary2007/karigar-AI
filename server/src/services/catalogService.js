// Catalog Generation Service (Whisper, IndicTrans2, LLM mock pipeline)

exports.transcribeSpeech = async (audioDataUrl, languageCode = 'pa') => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Realistic sample transcript based on user prompt example:
  // "Eh handmade Phulkari bag hai. Cotton fabric ton baneya hai."
  const sampleTranscripts = {
    pa: 'Eh handmade Phulkari bag hai. Cotton fabric ton baneya hai.',
    hi: 'यह हस्तनिर्मित फुलकारी बैग है। सूती कपड़े से बना है।',
    en: 'This is a handmade Phulkari bag made from cotton fabric.'
  };

  return {
    success: true,
    detectedLanguage: languageCode === 'pa' ? 'Punjabi' : languageCode === 'hi' ? 'Hindi' : 'English',
    languageCode,
    transcript: sampleTranscripts[languageCode] || sampleTranscripts['pa']
  };
};

exports.generateCatalog = async ({ transcript, craftType = 'Phulkari', userInputs = {} }) => {
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Determine key details strictly based on inputs or default craft facts
  const titleEn = userInputs.title || 'Handmade Phulkari Cotton Bag';
  const category = userInputs.category || 'Handicraft / Bags';
  const material = userInputs.material || 'Cotton & Silk Thread';
  const craft = craftType || 'Phulkari';

  const descEn = userInputs.description ||
    'Professional handcrafted cotton tote bag decorated with traditional Punjabi Phulkari floral silk embroidery. Crafted with durable handles and clean interior stitching.';

  const descHi = 'पारंपरिक पंजाबी फुलकारी रेशमी धागे की कढ़ाई से सजाया गया पेशेवर हस्तनिर्मित सूती थैला। टिकाऊ हैंडल और बढ़िया सिलाई के साथ तैयार।';

  const descPa = 'ਪਰੰਪਰਾਗਤ ਪੰਜਾਬੀ ਫੁਲਕਾਰੀ ਰੇਸ਼ਮੀ ਧਾਗੇ ਦੀ ਕਢਾਈ ਨਾਲ ਸਜਾਇਆ ਗਿਆ ਹੱਥ ਨਾਲ ਬਣਿਆ ਕੱਪੜੇ ਦਾ ਬੈਗ। ਮਜ਼ਬੂਤ ਹੈਂਡਲ ਅਤੇ ਸਾਫ਼ ਸਿਲਾਈ ਨਾਲ ਤਿਆਰ ਕੀਤਾ ਗਿਆ।';

  return {
    success: true,
    title: titleEn,
    category,
    material,
    craft,
    description: descEn,
    translations: {
      en: {
        language: 'English',
        title: titleEn,
        description: descEn
      },
      hi: {
        language: 'Hindi (हिंदी)',
        title: userInputs.titleHi || 'हस्तनिर्मित फुलकारी कॉटन बैग',
        description: descHi
      },
      pa: {
        language: 'Punjabi (ਪੰਜਾਬੀ)',
        title: userInputs.titlePa || 'ਹੱਥ ਨਾਲ ਬਣਿਆ ਫੁਲਕਾਰੀ ਕੱਪੜੇ ਦਾ ਬੈਗ',
        description: descPa
      }
    },
    disclaimer: 'AI-generated information. Please verify before publishing.'
  };
};
