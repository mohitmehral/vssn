// Expandable "About Us" content for Vishwa Sanatan Sansthanam:
//   1. परिचय (Introduction)
//   2. कार्ययोजना एवं उद्देश्य (Plan & Objectives) — 31 points
// Hindi is the authoritative text supplied by the trust. English is a faithful
// translation for the English locale; other locales fall back to English.

export interface AboutSection {
  id: string;
  heading: Record<string, string>;
  /** Intro paragraph(s). */
  body?: Record<string, string>;
  /** Ordered list items (objectives). */
  points?: Record<string, string[]>;
}

export const aboutSections: AboutSection[] = [
  {
    id: 'parichay',
    heading: { en: 'Introduction', hi: 'परिचय' },
    body: {
      hi: 'विश्व सनातन संस्थानम न्यास का गठन अंग्रेजी कैलेंडर के अनुसार 29 जनवरी सन् 2026 (माघ मास शुक्ल पक्ष गुप्त नवरात्रि प्रतिपदा दिन सोमवार) को भारतीय न्यास अधिनियम 1882 के अंतर्गत निष्पादित किया गया। यह एक धार्मिक और सांस्कृतिक संगठन है। इस संगठन का गठन सनातन धर्म को पुनर्स्थापित करने वाले शंकराचार्य परंपरा के जनक साक्षात् शिव स्वरूप आदिगुरु शंकराचार्य को अपना आदर्श एवं सनातन धर्म की पताका विश्व में फहराने वाले और "गर्व से कहो हम हिंदू हैं" इस उक्ति को चरितार्थ करने वाले स्वामी विवेकानंद जी को मार्गदर्शक मानकर किया गया है। इस संगठन के विस्तार के लिए "विश्व सनातन संस्थानम" नाम की संगठनात्मक इकाई बनाई गई है जिसका उद्देश्य विश्व भर के "ॐ" में आस्था रखने वाले समस्त देशों में इसका सुचारु रूप से गठन करना है। इस संगठन का मुख्य आधारसूत्र "यतो धर्मस्ततो जयः" है। यह संगठन मानव समाज में व्याप्त ऊँच-नीच व छुआछूत का भेदभाव मिटाकर आपस में प्रेम, सौहार्द और सनातन धर्म के प्रचार-प्रसार की ओर कार्यरत है।',
      en: 'The Vishwa Sanatan Sansthanam Trust was established on 29 January 2026 (Magha month, Shukla Paksha, Gupt Navratri Pratipada, Monday) under the Indian Trusts Act, 1882. It is a religious and cultural organisation. It was founded taking as its ideal Adi Guru Shankaracharya — the very embodiment of Shiva and founder of the Shankaracharya tradition who re-established Sanatan Dharma — and taking as its guide Swami Vivekananda, who raised the banner of Sanatan Dharma across the world and gave life to the call, "Say with pride, we are Hindus." An organisational unit named "Vishwa Sanatan Sansthanam" has been created to extend this work, with the aim of establishing it smoothly in every country where people hold faith in "ॐ". The organisation\'s guiding maxim is "Yato Dharmastato Jayah" (where there is Dharma, there is victory). It works to erase distinctions of high and low and untouchability in human society, and toward mutual love, harmony and the spread of Sanatan Dharma.',
    },
  },
  {
    id: 'objectives',
    heading: { en: 'Plan & Objectives', hi: 'कार्ययोजना एवं उद्देश्य' },
    points: {
      hi: [
        '(क) इस संस्थान का मुख्य उद्देश्य सनातन धर्म के दूतावास की स्थापना एवं सनातन धर्म बोर्ड की स्थापना करना है। (ख) भारत के विभिन्न प्रान्तों एवं क्षेत्रों में आश्रम बनाकर योग, ध्यान एवं सात्विक साधनाओं का प्रशिक्षण कराना।',
        'आध्यात्मिक शिक्षा और साधना: भारत में सनातन धर्म व ओम (ॐ) में आस्था रखने वालों को दीक्षा देकर समाज में जागरूकता प्रदान करना तथा धर्मगुरुओं द्वारा शिष्यों को आध्यात्मिक ज्ञान देना, ध्यान साधना कराना, और वेद जैसे शास्त्रों का अध्ययन व व्याख्या कराना।',
        'अन्य देशों के सनातन धर्म को मानने वाले लोगों को भारत भ्रमण पर आने पर उनके रहने व खाने-पीने की सुविधा उपलब्ध कराना।',
        'धर्म और परंपरा का संरक्षण: किसी विशेष संप्रदाय या परंपरा के सिद्धांतों और प्रथाओं का पालन करते हुए, उन्हें संरक्षित और विकसित करना।',
        'सामुदायिक केंद्र: भिक्षुओं और साधकों के रहने और कार्य करने का स्थान, जहाँ वे साथ रहकर आध्यात्मिक जीवन जीते हैं; साथ ही आगंतुकों के लिए एक शांत आश्रय स्थल का निर्माण कराना।',
        'बालक/बालिकाओं के शैक्षणिक विकास के लिए नर्सरी, प्राइमरी, जूनियर हाईस्कूल, इंटरमीडिएट विद्यालय, स्नातक/स्नातकोत्तर महाविद्यालय, बी०एड०, बी०टी०सी०, डी०एल०एड०, एल०एल०बी०, बी०ए०एल०एल०बी० विधि महाविद्यालय की स्थापना व संचालन करना; तथा कंप्यूटर हार्डवेयर/सॉफ्टवेयर, औद्योगिक, प्रौद्योगिक, तकनीकी शिक्षा, नैतिक शिक्षा व योग की जानकारी देकर स्वरोजगार हेतु तैयार करना।',
        'साहित्य, संस्कृति, कला, विज्ञान आदि की समुन्नति के लिए प्रतिबद्ध संस्था।',
        'सांस्कृतिक, साहित्यिक कार्यक्रमों का आयोजन करके कवियों, समाजसेवियों, चिकित्सकों, विद्वानों आदि को उनके विशिष्ट कार्यों के लिए विविध उपाधियों से सम्मानित करना।',
        'हिन्दी की दुर्लभ पांडुलिपियों की खोज तथा प्राप्त दुर्लभ ग्रन्थों का अनुशीलन करके उनके नये संदर्भों को प्रतिपादित करना।',
        'नवीन शिक्षा प्रणाली के अनुसार सभी विषयों एवं भाषाओं का ज्ञान कराना।',
        'समाज कल्याण विभाग तथा केन्द्रीय एवं राज्य समाज कल्याण सलाहकार बोर्ड, सिफ्सा, कपार्ट, नाबार्ड, जिला ग्राम्य विभाग, नेडा, डूडा, सूडा, मिड डे मील, मानव संसाधन विकास मंत्रालय द्वारा संचालित बाल एवं महिला कल्याण कार्यक्रमों में भागीदारी करना।',
        'विभिन्न सरकारी योजनाओं के अन्तर्गत विकलांगों के लिए पुनर्वास केन्द्रों की स्थापना करना एवं विकलांगों के लिए शिक्षा की व्यवस्था करना।',
        'समय-समय पर सांस्कृतिक कार्यक्रमों का आयोजन करना एवं संगीत विद्यालय की स्थापना करते हुए दीवारों पर वॉल पेंटिंग के जरिये प्रचार-प्रसार करना।',
        'पर्यावरण प्रदूषण के प्रति जागरूकता एवं प्रदूषण से होने वाले नुकसान पर प्रदर्शनी/शिविर का आयोजन एवं वृक्षारोपण कराना; जल संरक्षण के विकास हेतु स्वच्छ जल उपलब्ध कराते हुए पोखर/पोखरी/जलकुंडों/तालाबों की सफाई कराना; तथा स्वच्छता अभियान चलाना।',
        'कृषि पैदावार बढ़ाने हेतु विभिन्न प्रकार के शिविर, प्रदर्शनी, प्रशिक्षण कार्यशाला का आयोजन तथा उच्च कोटि के बीजों का प्रदर्शन करना।',
        'कुष्ठ रोगों का निवारण एवं रोगियों हेतु आश्रम की स्थापना कर उन्हें आत्मनिर्भर बनाना एवं एम्बुलेंस सुविधा उपलब्ध कराना; वरिष्ठ डॉक्टरों की देखरेख में चिकित्सा शिविर का आयोजन करना।',
        'आंगनबाड़ी, बालवाड़ी, प्रौढ़ शिक्षा, अनौपचारिक शिक्षा के अन्तर्गत कार्यक्रमों का संचालन करना।',
        'समस्त समाज सेवा, देश सेवा, राष्ट्र सेवा एवं ग्राम्य सेवा का कार्य करना।',
        'सर्वसमाज हेतु सरकार द्वारा चलाये जा रहे कार्यक्रमों के अनुसार सहायता करना एवं मार्गदर्शन देना; तथा समाज में व्याप्त जाति व्यवस्था को समाप्त करने हेतु लोगों को जागरूक करना।',
        'गरीब, असहाय, आदिवासी, वनवासी क्षेत्रों के बच्चों को शिक्षा, सदाचार एवं आध्यात्मिक विकास हेतु सुव्यवस्थित पुस्तकालय, वाचनालय एवं क्रीड़ा स्थल की व्यवस्था करना।',
        'चिकित्सा के क्षेत्र में सुविधा प्रदान करना; कैंसर, तपेदिक, मलेरिया, मोतियाबिंद, एड्स, पल्स पोलियो, टीकाकरण व हेपेटाइटिस जैसी भयंकर बीमारियों के बारे में जानकारी देना; नर्सिंग, मेडिकल अस्पताल, आयुर्वेद, होम्योपैथिक, यूनानी, वेटनरी कॉलेज आदि क्षेत्रों में प्रशिक्षण हेतु विद्यालय की स्थापना व संचालन करना।',
        'महिलाओं के विकास के लिए सिलाई, कढ़ाई, कटाई, पेंटिंग, ब्यूटी पार्लर, काष्ठ कला आदि तथा हस्तशिल्प के शिक्षण/प्रशिक्षण की व्यवस्था करना।',
        'बाल श्रम के प्रति जागरूकता उत्पन्न करके बालकों को शिक्षित करना तथा उन्हें स्वरोजगार हेतु प्रेरित करना।',
        'दैवीय आपदाओं के समय जनता की हर सम्भव मदद करना।',
        'कन्याओं की भ्रूण हत्या रोकने की दिशा में जागरूकता अभियान चलाना।',
        'सामाजिक कुरीतियों का उन्मूलन — नशा, दहेज प्रथा, धूम्रपान, जुआ, नशीली दवाओं का प्रयोग तथा समाज में फैले अंधविश्वास, छुआछूत आदि रीति-रिवाजों को दूर करना।',
        'विधवा/वृद्धा आश्रम का संचालन व उनके पुनर्वास केन्द्रों की स्थापना करना तथा केन्द्रीय व राज्य योजनाओं को प्राप्त कर उनके हित में प्रयोग करना।',
        'केन्द्रीय व राज्य सरकार की योजनाओं के माध्यम से पशुपालन, डेयरी व उनकी वृद्धि हेतु कार्य करना; स्वच्छता हेतु शौचालय व गरीबों के आवास का निर्माण कर उपलब्ध कराना।',
        'केन्द्र व राज्य सरकार द्वारा चलायी जाने वाली समस्त परियोजनाओं को जनहित में संचालित करना एवं गरीबी रेखा के नीचे जीवन-यापन करने वाले पीड़ित लोगों का उन्नयन एवं लाभान्वित करना।',
        'ट्रस्ट अपने उद्देश्यों/लक्ष्यों की पूर्ति हेतु सरकारी/गैर-सरकारी बैंकों से लेन-देन (ऋण) आदि प्राप्त कर सकती है।',
        'आयकर अधिनियम 1961 की धारा 13(1) व 11(5) एवं सम्बन्धित नियमों के अनुरूप न्यास का धन विभिन्न योजनाओं में लगाना; तथा ट्रस्ट को आगे बढ़ाने हेतु 12ए, 80जी, 10/23 व 35 एक्ट के अन्तर्गत मिलने वाली सुविधाओं को प्राप्त करना।',
      ],
      en: [
        '(a) The main objective is to establish an embassy of Sanatan Dharma and a Sanatan Dharma Board. (b) To set up ashrams across various states and regions of India to train people in yoga, meditation and sattvic practices.',
        'Spiritual education and practice: giving diksha (initiation) to those with faith in Sanatan Dharma and Om (ॐ), spreading awareness in society, and having teachers impart spiritual knowledge, guide meditation, and teach and interpret scriptures such as the Vedas.',
        'Providing lodging and food to followers of Sanatan Dharma from other countries when they visit India.',
        'Protection of religion and tradition: following, preserving and developing the principles and practices of a particular sect or tradition.',
        'Community centre: a place for monks and seekers to live and work together in spiritual life, and to build a peaceful refuge for visitors.',
        'Establishing and running schools and colleges for children — nursery, primary, junior high, intermediate, degree/postgraduate colleges, B.Ed., BTC, D.El.Ed., LL.B., BA-LL.B. law colleges — and providing computer hardware/software, industrial, technical, moral and yoga education to prepare them for self-employment.',
        'An institution committed to the advancement of literature, culture, art and science.',
        'Organising cultural and literary programmes and honouring poets, social workers, doctors, scholars and others with various titles for their distinguished work.',
        'Searching for rare Hindi manuscripts and studying rare texts to bring out their new references.',
        'Imparting knowledge of all subjects and languages according to modern education systems.',
        'Participating in child and women welfare programmes run by the Social Welfare Department and central/state advisory boards — SIFPSA, CAPART, NABARD, District Rural Development, NEDA, DUDA, SUDA, Mid-Day Meal, and the Ministry of Human Resource Development.',
        'Establishing rehabilitation centres for the disabled under various government schemes and arranging education for the disabled.',
        'Organising cultural programmes from time to time, establishing a music school, and spreading awareness through wall paintings.',
        'Raising awareness of environmental pollution and its harms through exhibitions and camps; tree planting; cleaning ponds, tanks and water bodies and providing clean water for water conservation; and running cleanliness drives.',
        'Organising camps, exhibitions and training workshops to increase agricultural yield, and demonstrating high-quality seeds.',
        'Preventing leprosy, establishing ashrams for patients to make them self-reliant, providing ambulance services, and organising medical camps under senior doctors.',
        'Running programmes under Anganwadi, Balwadi, adult education and non-formal education.',
        'Undertaking all work of social service, service to the country, the nation and villages.',
        'Assisting and guiding all of society according to government programmes, and making people aware in order to end the caste system prevalent in society.',
        'Arranging well-organised libraries, reading rooms and playgrounds for the education, good conduct and spiritual development of children in poor, helpless, tribal and forest-dwelling areas.',
        'Providing medical facilities; spreading awareness about serious diseases such as cancer, tuberculosis, malaria, cataract, AIDS, pulse polio, immunisation and hepatitis; and establishing and running schools for training in nursing, medical hospitals, Ayurveda, Homeopathy, Unani and veterinary colleges.',
        'Arranging teaching/training for women in tailoring, embroidery, cutting, painting, beauty parlour, woodcraft and other handicrafts.',
        'Educating children by raising awareness against child labour and motivating them toward self-employment.',
        'Providing every possible help to the public during natural disasters.',
        'Running awareness campaigns to prevent female foeticide.',
        'Eradicating social evils — intoxication, the dowry system, smoking, gambling, drug use — along with superstition, untouchability and other harmful customs.',
        'Running widow/old-age homes and rehabilitation centres, and obtaining central and state schemes for their benefit.',
        'Working on animal husbandry and dairy and their growth through central and state schemes; building toilets for sanitation and homes for the poor.',
        'Running all central and state government projects in the public interest and uplifting and benefiting those living below the poverty line.',
        'The Trust may obtain transactions (loans) etc. from government/non-government banks to fulfil its objectives.',
        "Investing the trust's funds in various schemes in accordance with Sections 13(1) and 11(5) of the Income Tax Act 1961 and related rules; and obtaining the benefits available under Sections 12A, 80G, 10/23 and 35 to advance the Trust.",
      ],
    },
  },
];

export function aField<T>(field: Record<string, T>, locale: string): T {
  return field[locale] ?? field.en;
}
