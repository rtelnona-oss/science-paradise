// البيانات الافتراضية الأولية لمنصة جنة العلوم - Science Paradise مع قاعدة المعرفة للمساعد الذكي

const DEFAULT_CURRICULUM = {
  // مسار العلوم باللغة العربية
  arabic: {
    prep1: {
      title: "الصف الأول الإعدادي",
      term1: [
        {
          id: "ar-p1-t1-l1",
          title: "الدرس الأول: المادة وخواصها",
          description: "شرح مبسط للمادة والكتلة والحجم، والفرق بين الخواص الفيزيائية والكيميائية للمادة مثل الكثافة ودرجة الانصهار.",
          videoUrl: "https://www.youtube.com/embed/PjHi-D_a0_g",
          studyNotes: "المادة هي كل ما له كتلة وحجم ويشغل حيزاً من الفراغ. الكثافة هي كتلة وحدة الحجوم من المادة (الكثافة = الكتلة ÷ الحجم). كثافة الماء هي 1 جم/سم3. المواد التي كثافتها أقل من الماء مثل الخشب والفلين والزيت تطفو فوق سطحه، بينما المواد التي كثافتها أكبر من الماء مثل الحديد والنحاس تغوص فيه. درجة الانصهار هي درجة الحرارة التي تتحول عندها المادة من الحالة الصلبة إلى الحالة السائلة.",
          faq: [
            { q: "ما هي الكثافة وكيف تُحسب؟", a: "الكثافة هي كتلة وحدة الحجوم (1 سم مكعب) من المادة، وتُحسب بالقانون: الكثافة = الكتلة ÷ الحجم، ووحدتها هي (جم/سم3)." },
            { q: "لماذا يطفو الفلين فوق الماء بينما يغوص الحديد؟", a: "لأن كثافة الفلين أقل من كثافة الماء (أقل من 1 جم/سم3) فيطفو، بينما كثافة الحديد أكبر من كثافة الماء فيغوص." },
            { q: "ما هي تطبيقات الكثافة في حياتنا؟", a: "عدم إطفاء حرائق البترول بالماء لأن البترول يطفو فوق الماء ويظل مشتعلاً، وملء بالونات الاحتفالات بغاز الهيدروجين أو الهيليوم لترتفع لأعلى لأن كثافتهما أقل من كثافة الهواء." }
          ],
          quiz: [
            {
              question: "ما هو مقدار ما يحتويه الجسم من مادة؟",
              options: ["الحجم", "الكتلة", "الكثافة", "الوزن"],
              answerIndex: 1
            },
            {
              question: "تطفو قطعة من الخشب فوق سطح الماء لأن كثافة الخشب...",
              options: ["أكبر من كثافة الماء", "تساوي كثافة الماء", "أقل من كثافة الماء", "لا توجد إجابة صحيحة"],
              answerIndex: 2
            },
            {
              question: "تستخدم الكثافة في الكشف عن غش المواد مثل...",
              options: ["الحديد", "الذهب", "اللبن والعسل", "الخشب"],
              answerIndex: 2
            }
          ]
        },
        {
          id: "ar-p1-t1-l2",
          title: "الدرس الثاني: التركيب الذري للمادة",
          description: "رحلة داخل الذرة للتعرف على البروتونات والنيوترونات والإلكترونات وكيفية توزيع الإلكترونات في مستويات الطاقة.",
          videoUrl: "https://www.youtube.com/embed/5aLhG11V5oA",
          studyNotes: "تتكون المادة من جزيئات والجزيئات تتكون من ذرات. الذرة هي أصغر وحدة بنائية للمادة يمكن أن تشترك في التفاعلات الكيميائية. تتركب الذرة من نواة موجبة الشحنة تقع في المركز، وتدور حولها إلكترونات سالبة الشحنة. تحتوي النواة على بروتونات موجبة ونيوترونات متعادلة الشحنة. الذرة متعادلة كهربياً لأن عدد البروتونات الموجبة داخل النواة يساوي عدد الإلكترونات السالبة التي تدور حولها.",
          faq: [
            { q: "لماذا الذرة متعادلة كهربياً؟", a: "لأن عدد الإلكترونات السالبة التي تدور حول النواة يساوي تماماً عدد البروتونات الموجبة الموجودة داخل النواة." },
            { q: "أين تتركز كتلة الذرة؟", a: "تتركز كتلة الذرة في النواة، لإهمال كتلة الإلكترونات ضئيلة جداً مقارنة بكتلة البروتونات والنيوترونات داخل النوا." },
            { q: "ما هي مستويات الطاقة؟", a: "هي مناطق وهمية حول النواة تدور فيها الإلكترونات حسب طاقتها، وعددها 7 مستويات في أثقل الذرات (K, L, M, N, O, P, Q)." }
          ],
          quiz: [
            {
              question: "تتركز كتلة الذرة في...",
              options: ["الإلكترونات", "مستويات الطاقة", "النواة", "الفراغ المحيط بالذرة"],
              answerIndex: 2
            },
            {
              question: "جسيمات داخل النواة تحمل شحنة موجبة هي...",
              options: ["البروتونات", "النيوترونات", "الإلكترونات", "الفوتونات"],
              answerIndex: 0
            },
            {
              question: "مستوى الطاقة الثالث (M) يتشبع بحد أقصى من الإلكترونات قدره...",
              options: ["2 إلكترون", "8 إلكترونات", "18 إلكترون", "32 إلكترون"],
              answerIndex: 2
            }
          ]
        }
      ],
      term2: [
        {
          id: "ar-p1-t2-l1",
          title: "الدرس الأول: الاتحاد الكيميائي",
          description: "الفرق بين الفلزات واللافلزات والغازات الخاملة، وكيف تتكون الروابط الأيونية والتساهمية.",
          videoUrl: "https://www.youtube.com/embed/7V2YtI9P3Q8",
          studyNotes: "تنقسم العناصر إلى فلزات ولافلزات وغازات خاملة. الفلزات تفقد إلكترونات وتتحول لأيونات موجبة لملء مستوى طاقتها الخارجي. اللافلزات تكتسب إلكترونات وتتحول لأيونات سالبة. الرابطة الأيونية تنشأ نتيجة تجاذب كهربائي بين أيون موجب وأيون سالب مثل ملح الطعام. الرابطة التساهمية تنشأ بمشاركة الإلكترونات بين ذرتين لافلزيتين.",
          faq: [
            { q: "ما الفرق بين الرابطة الأيونية والتساهمية؟", a: "الأيونية تنشأ بالاتحاد بين فلز (يفقد) ولافلز (يكتسب) نتيجة التجاذب الكهربائي، بينما التساهمية تنشأ بمشاركة الإلكترونات بين اللافلزات دون فقد أو اكتساب." },
            { q: "لماذا لا تشترك الغازات الخاملة في التفاعلات؟", a: "لاشتراك الغازات الخاملة في التفاعلات في الظروف العادية غير ممكن لأن مستوى طاقتها الخارجي مكتمل تماماً بالإلكترونات." }
          ],
          quiz: [
            {
              question: "عندما تفقد ذرة الفلز إلكتروناً أو أكثر تتحول إلى...",
              options: ["أيون سالب", "أيون موجب", "ذرة خاملة", "جزيء"],
              answerIndex: 1
            },
            {
              question: "الرابطة في جزيء ملح الطعام (كلوريد الصوديوم) هي رابطة...",
              options: ["تساهمية أحادية", "تساهمية ثنائية", "أيونية", "تساهمية ثلاثية"],
              answerIndex: 2
            }
          ]
        }
      ]
    },
    prep2: {
      title: "الصف الثاني الإعدادي",
      term1: [
        {
          id: "ar-p2-t1-l1",
          title: "الدرس الأول: محاولات تصنيف العناصر",
          description: "التعرف على الجدول الدوري لمندليف وموزلي والجدول الدوري الحديث لتصنيف وفهم خواص العناصر الكيميائية.",
          videoUrl: "https://www.youtube.com/embed/d33k54t7Gec",
          studyNotes: "بدأ العلماء تصنيف العناصر لتسهيل دراستها وإيجاد علاقة بينها. الجدول الدوري لمندليف رتب العناصر حسب الوزن الذري. جدول موزلي رتب العناصر حسب العدد الذري. الجدول الدوري الحديث رتب العناصر حسب العدد الذري وطريقة ملء مستويات الطاقة الفرعية بالإلكترونات، ويتكون من 7 دورات أفقية و18 مجموعة رأسية.",
          faq: [
            { q: "كم عدد عناصر الجدول الدوري الحديث؟", a: "عدد العناصر الإجمالي هو 118 عنصراً، منها 92 عنصراً متوفرة في القشرة الأرضية، والباقي يُحضر صناعياً." },
            { q: "كيف رتب موزلي العناصر في جدوله؟", a: "رتبها تصاعدياً وفقاً لأعدادها الذرية بعد اكتشاف أن دورية خواص العناصر ترتبط بالعدد الذري وليس الوزن الذري." }
          ],
          quiz: [
            {
              question: "رتب مندليف العناصر تصاعدياً حسب...",
              options: ["أعدادها الذرية", "أوزانها الذرية", "حجمها الذري", "سالبية الكهربية"],
              answerIndex: 1
            },
            {
              question: "يتكون الجدول الدوري الحديث من كم دورة أفقية؟",
              options: ["5 دورات", "7 دورات", "18 دورة", "8 دورات"],
              answerIndex: 1
            }
          ]
        }
      ],
      term2: []
    },
    prep3: {
      title: "الصف الثالث الإعدادي",
      term1: [
        {
          id: "ar-p3-t1-l1",
          title: "الدرس الأول: الحركة في اتجاه واحد",
          description: "مفهوم السرعة وقوانينها، والفرق بين السرعة المنتظمة والسرعة غير المنتظمة والسرعة المتوسطة والنسبية.",
          videoUrl: "https://www.youtube.com/embed/Z05gL_J0J18",
          studyNotes: "الحركة هي تغير موضع جسم بمرور الزمن بالنسبة لموضع جسم آخر. أبسط أنواع الحركة هي الحركة في اتجاه واحد في خط مستقيم. السرعة هي المسافة المقطوعة خلال وحدة الزمن (السرعة = المسافة ÷ الزمن) وتقاس بوحدة م/ث أو كم/س. السرعة المنتظمة هي السرعة التي يتحرك بها الجسم عندما يقطع مسافات متساوية في أزمنة متساوية.",
          faq: [
            { q: "ما هي السرعة النسبية؟", a: "هي سرعة جسم متحرك بالنسبة لمراقب ساكن أو متحرك، وتختلف قيمتها حسب اتجاه وسرعة المراقب." },
            { q: "ما هي السرعة المتوسطة؟", a: "هي المسافة الكلية التي يقطعها الجسم المتحرك مقسومة على الزمن الكلي المستغرق لقطع هذه المسافة." }
          ],
          quiz: [
            {
              question: "العاملان اللذان يمكن بهما وصف حركة جسم ما هما...",
              options: ["السرعة والزمن", "المسافة والزمن", "المسافة والمساحة", "الكتلة والسرعة"],
              answerIndex: 1
            },
            {
              question: "السرعة تساوي المسافة مقسومة على...",
              options: ["العجلة", "الزمن", "الكتلة", "القوة"],
              answerIndex: 1
            }
          ]
        }
      ],
      term2: []
    },
    sec1: {
      title: "الصف الأول الثانوي",
      term1: [
        {
          id: "ar-s1-t1-l1",
          title: "الدرس الأول: الكيمياء والقياس",
          description: "أهمية الكيمياء كمركز للعلوم الأخرى ومفهوم القياس العلمي وأدوات المختبر الكيميائي واستخداماتها الصحيحة.",
          videoUrl: "https://www.youtube.com/embed/C28f74PzR-M",
          studyNotes: "علم الكيمياء هو مركز العلوم لأنه أساسي لفهم العلوم الأخرى مثل الأحياء والفيزياء والطب والزراعة. القياس هو مقارنة كمية مجهولة بكمية أخرى معلومة من نفس النوع لمعرفة عدد مرات احتواء الأولى على الثانية. يتطلب القياس: القيمة العددية ووحدة القياس. أدوات المختبر تشمل: الميزان الحساس، السحاحة، الكؤوس الزجاجية، الدوارق، المخبار المدرج، والماصة.",
          faq: [
            { q: "لماذا نستخدم السحاحة في المختبر؟", a: "نستخدم السحاحة لقياس حجوم السوائل بدقة عالية في عمليات المعايرة التي تتطلب إضافة قطرات دقيقة جداً." },
            { q: "ما هو الرقم الهيدروجيني pH؟", a: "هو مقياس يحدد تركيز أيونات الهيدروجين في المحلول لمعرفة ما إذا كان حمضياً (أقل من 7) أو قاعدياً (أكبر من 7) أو متعادلاً (يساوي 7)." }
          ],
          quiz: [
            {
              question: "من الأدوات المستخدمة في قياس حجوم السوائل بدقة عالية...",
              options: ["الدورق المستدير", "المخبار المدرج", "كأس زجاجي", "أنبوبة اختبار"],
              answerIndex: 1
            },
            {
              question: "لقياس درجة حموضة (pH) محلول بدقة نستخدم...",
              options: ["شريط عباد الشمس", "جهاز pH الرقمي", "المخبار المدرج", "الماصة"],
              answerIndex: 1
            }
          ]
        }
      ],
      term2: []
    }
  },

  // English Track: Science
  english: {
    prep1: {
      title: "1st Prep (Grade 7)",
      term1: [
        {
          id: "en-p1-t1-l1",
          title: "Lesson 1: Matter and its Properties",
          description: "A clear explanation of matter, mass, and volume. Exploring physical properties like density, melting point, and chemical properties.",
          videoUrl: "https://www.youtube.com/embed/k3SJu8G3VUY",
          studyNotes: "Matter is anything that has mass and volume, and occupies space. Density is the mass of a unit volume of a substance (Density = Mass / Volume). Water density is 1 g/cm3. Objects with density less than water (like wood, cork, oil) float on its surface, while objects with density more than water (like iron, copper) sink. Melting point is the temperature at which matter changes from solid to liquid.",
          faq: [
            { q: "What is density and how is it calculated?", a: "Density is the mass of 1 cm3 of a substance. It is calculated by dividing mass by volume (g/cm3)." },
            { q: "Why does wood float on water while iron sinks?", a: "Because the density of wood is less than the density of water (less than 1 g/cm3), so it floats. Iron density is greater than water's, so it sinks." },
            { q: "What are the life applications of density?", a: "Water is not used to extinguish petrol fires because petrol density is less than water's, so it floats and continues burning. Balloons are filled with Helium or Hydrogen to rise up." }
          ],
          quiz: [
            {
              question: "What is the amount of matter that an object contains?",
              options: ["Volume", "Mass", "Density", "Weight"],
              answerIndex: 1
            },
            {
              question: "A piece of wood floats on water because its density is...",
              options: ["More than water density", "Equal to water density", "Less than water density", "None of the above"],
              answerIndex: 2
            },
            {
              question: "Which of the following can be used to detect the purity of milk?",
              options: ["Mass", "Volume", "Density", "Color"],
              answerIndex: 2
            }
          ]
        },
        {
          id: "en-p1-t1-l2",
          title: "Lesson 2: Matter Construction and Atoms",
          description: "Unraveling the secrets of molecules, atoms, and subatomic particles (protons, neutrons, and electrons) and active/inactive elements.",
          videoUrl: "https://www.youtube.com/embed/LhV63PPn1sQ",
          studyNotes: "Matter is made of molecules, and molecules consist of atoms. The atom is the smallest building unit of matter that can participate in chemical reactions. An atom consists of a central positive nucleus and negatively charged electrons revolving around it. The nucleus contains positive protons and neutral neutrons. The atom is electrically neutral because the number of positive protons equals negative electrons.",
          faq: [
            { q: "Why is the atom electrically neutral?", a: "Because the number of positive protons inside the nucleus is equal to the number of negative electrons revolving around it." },
            { q: "Where is the mass of the atom concentrated?", a: "It is concentrated in the nucleus, because the mass of electrons is extremely small (negligible) compared to the protons and neutrons." }
          ],
          quiz: [
            {
              question: "The mass of an atom is concentrated in its...",
              options: ["Electrons", "Nucleus", "Energy levels", "Protons only"],
              answerIndex: 1
            },
            {
              question: "Positively charged particles inside the nucleus are called...",
              options: ["Protons", "Neutrons", "Electrons", "Positrons"],
              answerIndex: 0
            },
            {
              question: "The maximum number of electrons that can saturate the third energy level (M) is...",
              options: ["2", "8", "18", "32"],
              answerIndex: 2
            }
          ]
        }
      ],
      term2: []
    },
    prep2: {
      title: "2nd Prep (Grade 8)",
      term1: [
        {
          id: "en-p2-t1-l1",
          title: "Lesson 1: Attempts of Elements Classification",
          description: "Understanding Mendeleev's Periodic Table, Moseley's Periodic Table, and the Modern Periodic Table structure.",
          videoUrl: "https://www.youtube.com/embed/fLSfgNxoQ8k",
          studyNotes: "Scientists classified elements to facilitate their study. Mendeleev arranged elements ascendingly according to atomic weight. Moseley arranged elements according to atomic number. The Modern Periodic Table classifies elements according to atomic number and the way energy levels are filled. It has 7 periods and 18 groups.",
          faq: [
            { q: "How many elements are in the Modern Periodic Table?", a: "There are 118 elements. 92 are natural, and the rest are prepared artificially." },
            { q: "What is a group in the periodic table?", a: "It is a vertical column containing elements with similar chemical properties due to having the same number of outer electrons." }
          ],
          quiz: [
            {
              question: "Mendeleev arranged elements ascendingly according to their...",
              options: ["Atomic numbers", "Atomic weights", "Atomic sizes", "Valency"],
              answerIndex: 1
            },
            {
              question: "The Modern Periodic Table consists of how many horizontal periods?",
              options: ["5", "7", "18", "8"],
              answerIndex: 1
            }
          ]
        }
      ],
      term2: []
    },
    prep3: {
      title: "3rd Prep (Grade 9)",
      term1: [],
      term2: []
    },
    sec1: {
      title: "1st Sec (Grade 10)",
      term1: [],
      term2: []
    }
  }
};
