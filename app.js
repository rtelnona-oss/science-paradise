// ==========================================================================
// منطق تشغيل منصة جنة العلوم - Science Paradise
// ==========================================================================

// 1. تعريف حالة التطبيق
let currentStudent = null;
let currentTerm = "term1";
let curriculumData = null;
let activeLesson = null;
let activeQuizQuestions = [];
let quizCurrentIndex = 0;
let quizScore = 0;

// الإعدادات الافتراضية للمعلم
let adminSettings = {
  activationCode: "SCIENCE2026",
  contactPhone: "01032931035",
  teacherPassword: "science2026"
};

// 2. قواميس الترجمة لتغيير لغة المنصة بالكامل
const translations = {
  arabic: {
    logoText: "جنة العلوم",
    logoSubtext: "Science Paradise",
    term1: "الترم الأول",
    term2: "الترم الثاني",
    subBadgeActivate: "تفعيل الاشتراك 🔑",
    subBadgeActive: "الحساب مفعّل بالكامل 🌟",
    greeting: "مرحباً بك في عالم المعرفة والاستكشاف! 🌟",
    subGreeting: "شاهد الدرس الأول مجاناً، واجتز الاختبار بنجاح لتفتح الدرس التالي!",
    mascotWelcome: "أهلاً بك يا بطل في جنة العلوم الساحرة! دعنا نضبط مختبرنا الشخصي أولاً.. اختر مسارك واسمك!",
    bannerMascotSpeech: "دروسك مرتبة وجاهزة، دعنا نبدأ مغامرتنا اليوم!",
    lessonsTitle: "دروس الفصل الدراسي المتاحة 📚",
    btnStart: "انطلق إلى جنة العلوم!",
    btnOptionNext: "السؤال التالي",
    txtQuizHeader: "الاختبار التفاعلي للدرس 🧪",
    lblActivationCode: "أدخل كود التفعيل السري هنا:",
    btnActivate: "تفعيل الآن",
    errorActivation: "الرمز غير صحيح، يرجى التحقق منه والمحاولة مرة أخرى!",
    lblStudentName: "اكتب اسمك الثنائي يا بطل العلوم:",
    lblStudentGrade: "الصف الدراسي الحالي:",
    placeholderName: "مثال: أحمد محمد",
    gradeOptions: {
      prep1: "الصف الأول الإعدادي",
      prep2: "الصف الثاني الإعدادي",
      prep3: "الصف الثالث الإعدادي",
      sec1: "الصف الأول الثانوي"
    },
    lockedMessage: "أوووه! طاقة المعمل نفذت هنا! 🔬 لفتح جميع الدروس والامتحانات والمختبرات الكاملة وتفعيل حسابك، يرجى الاشتراك وتفعيل الكود السري مع بروفيسور بابلز!",
    subCongrats: "مبروك يا بطل! تم تفعيل اشتراكك بالكامل بنجاح! 🎉 استمتع برحلتك العلمية."
  },
  english: {
    logoText: "Science Paradise",
    logoSubtext: "Science Paradise",
    term1: "1st Term",
    term2: "2nd Term",
    subBadgeActivate: "Activate Membership 🔑",
    subBadgeActive: "Fully Activated Account 🌟",
    greeting: "Welcome to the World of Science and Discovery! 🌟",
    subGreeting: "Watch the first lesson for free, and pass its quiz to unlock the next lessons!",
    mascotWelcome: "Hello champion! Welcome to Science Paradise! Let's setup your laboratory.. choose your track and name!",
    bannerMascotSpeech: "Your lessons are organized and ready, let's start our adventure today!",
    lessonsTitle: "Available Semester Lessons 📚",
    btnStart: "Launch into Science Paradise!",
    btnOptionNext: "Next Question",
    txtQuizHeader: "Lesson Interactive Quiz 🧪",
    lblActivationCode: "Enter your secret activation code here:",
    btnActivate: "Activate Now",
    errorActivation: "Incorrect code! Please verify and try again.",
    lblStudentName: "Write your full name, Science Champion:",
    lblStudentGrade: "Current School Grade:",
    placeholderName: "Example: John Doe",
    gradeOptions: {
      prep1: "1st Prep (Grade 7)",
      prep2: "2nd Prep (Grade 8)",
      prep3: "3rd Prep (Grade 9)",
      sec1: "1st Sec (Grade 10)"
    },
    lockedMessage: "Oh no! The laboratory power is low here! 🔬 To unlock all videos, quizzes, and complete curriculums, please subscribe and activate the secret code with Professor Bubbles!",
    subCongrats: "Congratulations Champ! Your subscription is fully activated! 🎉 Enjoy your scientific adventure."
  }
};

// 3. بدء تشغيل التطبيق والتحميل الأولي
document.addEventListener("DOMContentLoaded", () => {
  initData();
  checkSavedStudent();
  setupEventListeners();
  generateFloatingBubbles();
});

// تهيئة البيانات وتخزين المنهج الافتراضي
function initData() {
  // تحميل إعدادات المعلم
  const savedSettings = localStorage.getItem("science_paradise_settings");
  if (savedSettings) {
    adminSettings = JSON.parse(savedSettings);
  } else {
    localStorage.setItem("science_paradise_settings", JSON.stringify(adminSettings));
  }

  // تحميل المنهج الدراسي
  const savedCurriculum = localStorage.getItem("science_paradise_curriculum");
  if (savedCurriculum) {
    curriculumData = JSON.parse(savedCurriculum);
  } else {
    curriculumData = DEFAULT_CURRICULUM; // من data.js
    localStorage.setItem("science_paradise_curriculum", JSON.stringify(curriculumData));
  }
}

// التحقق مما إذا كان هناك طالب مسجل مسبقاً في المتصفح
function checkSavedStudent() {
  const savedStudent = localStorage.getItem("science_paradise_student");
  if (savedStudent) {
    currentStudent = JSON.parse(savedStudent);
    loginStudent(currentStudent);
  } else {
    // إظهار شاشة التسجيل وتحديث نصوصها
    updateOnboardingTexts("arabic");
  }
}

// تحديث نصوص شاشة التسجيل بناءً على المسار المختار (عربي / إنجليزي)
function updateOnboardingTexts(track) {
  const trans = translations[track];
  document.getElementById("lblStudentName").innerText = trans.lblStudentName;
  document.getElementById("lblStudentGrade").innerText = trans.lblStudentGrade;
  document.getElementById("studentName").placeholder = trans.placeholderName;
  document.getElementById("btnStartJourney").innerHTML = `<i class="fa-solid fa-rocket"></i> ${trans.btnStart}`;
  document.getElementById("onboardingSpeech").innerText = trans.mascotWelcome;

  // تحديث خيارات التحديد
  const select = document.getElementById("studentGrade");
  Array.from(select.options).forEach(opt => {
    opt.text = opt.getAttribute(`data-${track === 'arabic' ? 'ar' : 'en'}`);
  });
}

// إعداد مستمعي الأحداث للواجهات
function setupEventListeners() {
  // تغيير لغة شاشة التسجيل عند تبديل الراديو
  document.getElementById("trackArabic").addEventListener("change", () => updateOnboardingTexts("arabic"));
  document.getElementById("trackEnglish").addEventListener("change", () => updateOnboardingTexts("english"));

  // معالجة نموذج التسجيل
  document.getElementById("onboardingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("studentName").value.trim();
    const track = document.querySelector('input[name="track"]:checked').value;
    const grade = document.getElementById("studentGrade").value;

    if (!name) return;

    // محاولة البحث عن طالب مسجل مسبقاً بنفس الاسم لتجنب فقدان تقدمه
    let student = getSavedStudentFromList(name, track, grade);
    if (!student) {
      student = {
        name: name,
        track: track,
        grade: grade,
        subscribed: false,
        completedLessons: []
      };
      saveStudentToList(student);
    }

    currentStudent = student;
    localStorage.setItem("science_paradise_student", JSON.stringify(currentStudent));
    loginStudent(currentStudent);
  });
}

// تسجيل دخول الطالب وعرض التطبيق الرئيسي
function loginStudent(student) {
  // إخفاء شاشة التسجيل وعرض التطبيق
  document.getElementById("onboardingScreen").classList.remove("active");
  document.getElementById("mainApp").classList.remove("hidden");

  // تطبيق التنسيقات والاتجاه بناءً على المسار
  const body = document.body;
  if (student.track === "english") {
    body.classList.add("english-track");
    body.setAttribute("dir", "ltr");
  } else {
    body.classList.remove("english-track");
    body.setAttribute("dir", "rtl");
  }

  // ترجمة وتحديث نصوص التطبيق بالكامل
  translateAppUI(student.track);

  // تحديث شارات الطلاب
  document.getElementById("displayStudentName").innerText = student.name;
  
  const gradeText = translations[student.track].gradeOptions[student.grade];
  document.getElementById("displayStudentGrade").innerText = gradeText;

  // تحديث شارة الاشتراك
  updateSubscriptionUI();

  // عرض الدروس المتوفرة
  renderLessons();

  // إظهار المساعد الذكي
  document.getElementById("aiAssistantWidget").classList.remove("hidden");
  initAIAssistant();
}

// ترجمة واجهة المستخدم
function translateAppUI(track) {
  const trans = translations[track];
  
  document.querySelector(".logo-text").innerText = trans.logoText;
  document.querySelector(".logo-subtext").innerText = trans.logoSubtext;
  document.getElementById("btnTerm1").innerText = trans.term1;
  document.getElementById("btnTerm2").innerText = trans.term2;
  document.getElementById("txtGreeting").innerText = trans.greeting;
  document.getElementById("txtSubGreeting").innerText = trans.subGreeting;
  document.getElementById("bannerSpeech").innerText = trans.bannerMascotSpeech;
  document.getElementById("txtLessonsTitle").innerText = trans.lessonsTitle;
  document.getElementById("txtQuizHeader").innerText = trans.txtQuizHeader;
  document.getElementById("lblActivationCode").innerText = trans.lblActivationCode;
  document.querySelector(".btn-activate").innerText = trans.btnActivate;
  document.getElementById("activationError").innerText = trans.errorActivation;
  document.getElementById("subscribeSpeech").innerText = trans.lockedMessage;
  
  // رقم التواصل بالواتساب
  const phoneLinks = document.querySelectorAll(".phone-link");
  phoneLinks.forEach(link => {
    link.innerText = adminSettings.contactPhone;
    link.href = `https://wa.me/2${adminSettings.contactPhone}?text=${encodeURIComponent(
      track === 'arabic' ? 
      `مرحباً معلمتي، أريد تفعيل اشتراك منصة جنة العلوم للطالب: ${currentStudent ? currentStudent.name : ''}` : 
      `Hello teacher, I want to activate Science Paradise subscription for student: ${currentStudent ? currentStudent.name : ''}`
    )}`;
  });
}

// تحديث شارة حالة تفعيل الاشتراك
function updateSubscriptionUI() {
  const container = document.getElementById("subscriptionBadgeContainer");
  const btn = document.getElementById("btnSubscribeNow");
  const txt = document.getElementById("txtSubBadge");
  const trans = translations[currentStudent.track];

  if (currentStudent.subscribed) {
    btn.className = "btn-subscribe-badge activated-glow";
    txt.innerText = trans.subBadgeActive;
    btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${trans.subBadgeActive}`;
  } else {
    btn.className = "btn-subscribe-badge premium-glow";
    txt.innerText = trans.subBadgeActivate;
    btn.innerHTML = `<i class="fa-solid fa-key"></i> ${trans.subBadgeActivate}`;
  }
}

// تبديل الترمات
function switchTerm(term) {
  currentTerm = term;
  document.getElementById("btnTerm1").classList.remove("active");
  document.getElementById("btnTerm2").classList.remove("active");

  if (term === "term1") {
    document.getElementById("btnTerm1").classList.add("active");
  } else {
    document.getElementById("btnTerm2").classList.add("active");
  }

  renderLessons();
}

// رندرة الدروس في الشبكة بناءً على المسار والصف والترم المحددين
function renderLessons() {
  const grid = document.getElementById("lessonsGrid");
  grid.innerHTML = "";

  const track = currentStudent.track;
  const grade = currentStudent.grade;
  const term = currentTerm;

  // استخراج قائمة الدروس
  const lessons = (curriculumData[track] && curriculumData[track][grade] && curriculumData[track][grade][term]) || [];

  if (lessons.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-light); font-weight: 700;">
      ${track === 'arabic' ? 'لا توجد دروس مضافة لهذا الفصل الدراسي حالياً!' : 'No lessons added for this term yet!'}
    </div>`;
    return;
  }

  lessons.forEach((lesson, index) => {
    // أول درس في الصف/الترم مجاني دائماً
    const isFree = index === 0;
    const isCompleted = currentStudent.completedLessons.includes(lesson.id);
    
    // الدرس مغلق إذا لم يكن مجانياً ولم يكن الطالب مشتركاً
    const isLocked = !isFree && !currentStudent.subscribed;

    // تحديد حالة الدرس التالي في الترتيب (يجب إكمال الدرس السابق)
    // إذا لم يكن المشترك مفعلاً للاشتراك، فهو لن يصل للدروس التالية أصلاً
    let isProgressLocked = false;
    if (index > 0 && currentStudent.subscribed) {
      const prevLesson = lessons[index - 1];
      const prevCompleted = currentStudent.completedLessons.includes(prevLesson.id);
      if (!prevCompleted) {
        isProgressLocked = true;
      }
    }

    // بناء كارت الدرس
    const card = document.createElement("div");
    card.className = `lesson-card ${isLocked || isProgressLocked ? 'locked' : ''}`;
    
    // بادج الحالة
    let badgeHTML = "";
    if (isCompleted) {
      badgeHTML = `<span class="lesson-status-badge badge-completed"><i class="fa-solid fa-circle-check"></i> ${track === 'arabic' ? 'مكتمل' : 'Completed'}</span>`;
    } else if (isLocked) {
      badgeHTML = `<span class="lesson-status-badge badge-locked"><i class="fa-solid fa-lock"></i> ${track === 'arabic' ? 'اشتراك' : 'Premium'}</span>`;
    } else if (isProgressLocked) {
      badgeHTML = `<span class="lesson-status-badge badge-locked"><i class="fa-solid fa-road-barrier"></i> ${track === 'arabic' ? 'أكمل السابق أولاً' : 'Finish previous first'}</span>`;
    } else {
      badgeHTML = `<span class="lesson-status-badge badge-free"><i class="fa-solid fa-lock-open"></i> ${track === 'arabic' ? 'مجاني' : 'Free'}</span>`;
    }

    card.innerHTML = `
      ${badgeHTML}
      <div class="lesson-info">
        <h3 class="lesson-card-title">${lesson.title}</h3>
        <p class="lesson-card-desc">${lesson.description}</p>
      </div>
      <div class="lesson-footer">
        <button class="btn-primary" onclick="handleLessonClick('${lesson.id}', ${isLocked}, ${isProgressLocked})">
          ${isLocked ? `<i class="fa-solid fa-key"></i> ${track === 'arabic' ? 'تفعيل الدروس' : 'Unlock'}` : 
            isProgressLocked ? `<i class="fa-solid fa-lock"></i> ${track === 'arabic' ? 'مغلق' : 'Locked'}` : 
            `<i class="fa-solid fa-circle-play"></i> ${track === 'arabic' ? 'ابدأ الدرس' : 'Start Lesson'}`}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// معالجة النقر على كارت الدرس
function handleLessonClick(lessonId, isLocked, isProgressLocked) {
  const track = currentStudent.track;
  
  if (isLocked) {
    openSubscribeModal();
    return;
  }

  if (isProgressLocked) {
    alert(track === 'arabic' ? 
      "عذراً يا بطل! يجب عليك مشاهدة الدرس السابق وحل اختباره بنجاح لفتح هذا الدرس." :
      "Sorry champion! You must complete the previous lesson and pass its quiz to unlock this one."
    );
    return;
  }

  // فتح الدرس للمشاهدة والاختبار
  openLessonModal(lessonId);
}

// فتح نافذة الدرس
function openLessonModal(lessonId) {
  const track = currentStudent.track;
  const grade = currentStudent.grade;
  const term = currentTerm;
  
  const lessons = curriculumData[track][grade][term];
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return;

  activeLesson = lesson;
  activeQuizQuestions = lesson.quiz || [];
  quizCurrentIndex = 0;
  quizScore = 0;

  // إعداد محتويات النافذة
  document.getElementById("lessonModalTitle").innerText = lesson.title;
  document.getElementById("lessonModalDesc").innerText = lesson.description;
  
  // معالجة رابط فيديو اليوتيوب ليعمل في الآيفريم
  let videoEmbedUrl = lesson.videoUrl;
  if (videoEmbedUrl.includes("youtube.com/watch?v=")) {
    const videoId = videoEmbedUrl.split("v=")[1].split("&")[0];
    videoEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (videoEmbedUrl.includes("youtu.be/")) {
    const videoId = videoEmbedUrl.split("youtu.be/")[1].split("?")[0];
    videoEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  document.getElementById("lessonVideoIFrame").src = videoEmbedUrl;

  // إخفاء صفحة النتيجة وإظهار منطقة الأسئلة
  document.getElementById("quizResultArea").classList.add("hidden");
  document.getElementById("quizBody").classList.remove("hidden");
  
  // تحميل أول سؤال للاختبار
  loadQuizQuestion();

  // فتح المودال
  document.getElementById("lessonModal").classList.remove("hidden");
}

// إغلاق نافذة الدرس
function closeLessonModal() {
  document.getElementById("lessonModal").classList.add("hidden");
  document.getElementById("lessonVideoIFrame").src = ""; // إيقاف تشغيل الفيديو
  activeLesson = null;
  renderLessons();
}

// تحميل أسئلة الاختبار
function loadQuizQuestion() {
  const body = document.getElementById("quizBody");
  body.innerHTML = "";

  const track = currentStudent.track;

  if (activeQuizQuestions.length === 0) {
    body.innerHTML = `<p style="text-align: center; padding: 20px; font-weight: bold; color: var(--text-light);">
      ${track === 'arabic' ? 'لا يوجد اختبار لهذا الدرس حالياً.' : 'No quiz available for this lesson.'}
    </p>`;
    document.getElementById("quizProgressFill").style.width = "100%";
    return;
  }

  // تحديث شريط التقدم
  const progressPercent = (quizCurrentIndex / activeQuizQuestions.length) * 100;
  document.getElementById("quizProgressFill").style.width = `${progressPercent}%`;

  const qData = activeQuizQuestions[quizCurrentIndex];

  // هيكل السؤال
  const container = document.createElement("div");
  container.className = "quiz-question-container";
  container.innerHTML = `
    <h4 class="quiz-question-title">(${quizCurrentIndex + 1}/${activeQuizQuestions.length}) ${qData.question}</h4>
    <div class="quiz-options-list">
      ${qData.options.map((opt, idx) => `
        <button class="btn-option" onclick="handleAnswerSelection(this, ${idx})">${opt}</button>
      `).join('')}
    </div>
  `;

  body.appendChild(container);
}

// معالجة اختيار إجابة السؤال
function handleAnswerSelection(button, selectedIdx) {
  const qData = activeQuizQuestions[quizCurrentIndex];
  const correctIdx = qData.answerIndex;

  // منع الضغط على أزرار أخرى بعد الاختيار
  const allButtons = button.parentNode.querySelectorAll(".btn-option");
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedIdx === correctIdx) {
    button.classList.add("correct");
    quizScore++;
    
    // الانتقال بعد ثانية
    setTimeout(() => {
      quizCurrentIndex++;
      if (quizCurrentIndex < activeQuizQuestions.length) {
        loadQuizQuestion();
      } else {
        showQuizResults();
      }
    }, 1000);
  } else {
    button.classList.add("wrong");
    
    // إظهار الإجابة الصحيحة تلقائياً بعد الفشل لكي يتعلم الطالب
    setTimeout(() => {
      allButtons[correctIdx].classList.add("correct");
    }, 4000);

    // نمنح الطالب فرصة للمحاولة مجدداً بعد الفشل لضمان التعلم
    setTimeout(() => {
      allButtons.forEach(btn => btn.disabled = false);
      button.classList.remove("wrong");
    }, 1500);
  }
}

// عرض صفحة النتيجة النهائية للاختبار
function showQuizResults() {
  document.getElementById("quizProgressFill").style.width = "100%";
  document.getElementById("quizBody").classList.add("hidden");
  
  const resultArea = document.getElementById("quizResultArea");
  resultArea.classList.remove("hidden");

  const track = currentStudent.track;
  const total = activeQuizQuestions.length;

  document.getElementById("quizScoreText").innerText = track === 'arabic' ? 
    `لقد أجبت على ${quizScore} من أصل ${total} أسئلة بشكل صحيح!` :
    `You answered ${quizScore} out of ${total} questions correctly!`;

  const title = document.getElementById("txtResultTitle");
  const msg = document.getElementById("quizResultMessage");

  // إذا نجح الطالب (أجاب على كل الأسئلة أو أغلبها)
  if (quizScore === total) {
    title.innerText = track === 'arabic' ? "ممتاز ورائع جداً! 🏆" : "Excellent Job! 🏆";
    msg.innerText = track === 'arabic' ? 
      "لقد حصلت على الدرجة النهائية، وتم تسجيل تقدمك وحفظه بنجاح!" : 
      "You got the full mark! Your progress has been successfully saved!";
    
    // إطلاق الاحتفالات الحركية بالقصاصات الملونة
    triggerConfetti();

    // حفظ تقدم الدرس في ملف الطالب
    if (!currentStudent.completedLessons.includes(activeLesson.id)) {
      currentStudent.completedLessons.push(activeLesson.id);
      localStorage.setItem("science_paradise_student", JSON.stringify(currentStudent));
      saveStudentToList(currentStudent); // تحديث القائمة العامة
    }
  } else {
    title.innerText = track === 'arabic' ? "حاول مجدداً يا بطل!" : "Try Again, Champ!";
    msg.innerText = track === 'arabic' ? 
      "أنت على بعد خطوة بسيطة من التميز، أعد تشغيل الفيديو وحاول مجدداً للحصول على وسام التميز!" : 
      "You are so close to success! Rewatch the explanation and try again to unlock the medal!";
  }
}

// الاحتفالات الحركية (Confetti)
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// فتح وإغلاق نافذة الاشتراك
function openSubscribeModal() {
  document.getElementById("subscribeModal").classList.remove("hidden");
  document.getElementById("activationError").classList.add("hidden");
  document.getElementById("activationCodeInput").value = "";
}
function closeSubscribeModal() {
  document.getElementById("subscribeModal").classList.add("hidden");
}

// إرسال كود التفعيل والتحقق منه
function submitActivationCode() {
  const code = document.getElementById("activationCodeInput").value.trim();
  const track = currentStudent.track;

  if (code === adminSettings.activationCode) {
    // تفعيل الحساب
    currentStudent.subscribed = true;
    localStorage.setItem("science_paradise_student", JSON.stringify(currentStudent));
    saveStudentToList(currentStudent);

    // تحديث الواجهات
    updateSubscriptionUI();
    closeSubscribeModal();
    renderLessons();

    // احتفال
    triggerConfetti();
    alert(translations[track].subCongrats);
  } else {
    // كود خاطئ
    document.getElementById("activationError").classList.remove("hidden");
  }
}


// ==========================================================================
// لوحة إدارة وحسابات المعلمة (Teacher Admin Dashboard Panel)
// ==========================================================================

// فتح وإغلاق تسجيل دخول المعلمة
function openTeacherLogin() {
  document.getElementById("teacherPasswordInput").value = "";
  document.getElementById("teacherLoginError").classList.add("hidden");
  document.getElementById("teacherLoginModal").classList.remove("hidden");
}
function closeTeacherLogin() {
  document.getElementById("teacherLoginModal").classList.add("hidden");
}

// تسجيل الدخول بلوحة المعلم
function submitTeacherLogin() {
  const pass = document.getElementById("teacherPasswordInput").value.trim();
  if (pass === adminSettings.teacherPassword) {
    closeTeacherLogin();
    openTeacherDashboard();
  } else {
    document.getElementById("teacherLoginError").classList.remove("hidden");
  }
}

// فتح لوحة التحكم
function openTeacherDashboard() {
  // شحن البيانات الحالية في المدخلات
  document.getElementById("adminActivationCode").value = adminSettings.activationCode;
  document.getElementById("adminContactPhone").value = adminSettings.contactPhone;
  document.getElementById("adminTeacherPassword").value = adminSettings.teacherPassword;

  // شحن جدول الطلاب
  renderAdminStudentsList();

  document.getElementById("teacherDashboardModal").classList.remove("hidden");
}
function closeTeacherDashboard() {
  document.getElementById("teacherDashboardModal").classList.add("hidden");
}

// رندرة قائمة الطلاب في لوحة التحكم
function renderAdminStudentsList() {
  const tbody = document.getElementById("adminStudentsList");
  tbody.innerHTML = "";

  const allStudents = JSON.parse(localStorage.getItem("science_paradise_students_list") || "[]");

  if (allStudents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #888;">لا يوجد طلاب مسجلين على هذا الجهاز حالياً.</td></tr>`;
    return;
  }

  allStudents.forEach(st => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${st.name}</strong></td>
      <td>${st.track === 'arabic' ? 'علوم عربي' : 'Science لغات'}</td>
      <td>${translations.arabic.gradeOptions[st.grade] || st.grade}</td>
      <td>
        <span style="color: ${st.subscribed ? 'green' : 'orange'}; font-weight: bold;">
          ${st.subscribed ? 'مفعّل ✅' : 'مجاني ⏳'}
        </span>
      </td>
      <td>
        <button class="btn-secondary" style="padding: 2px 8px; font-size: 11px;" onclick="toggleStudentSubscription('${st.name}', '${st.track}', '${st.grade}')">
          تغيير الاشتراك
        </button>
        <button class="btn-danger" style="padding: 2px 8px; font-size: 11px; margin-top: 4px;" onclick="deleteStudentProfile('${st.name}', '${st.track}', '${st.grade}')">
          حذف
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// تفعيل أو إلغاء تفعيل اشتراك طالب معين من اللوحة
function toggleStudentSubscription(name, track, grade) {
  const allStudents = JSON.parse(localStorage.getItem("science_paradise_students_list") || "[]");
  const student = allStudents.find(st => st.name === name && st.track === track && st.grade === grade);
  
  if (student) {
    student.subscribed = !student.subscribed;
    localStorage.setItem("science_paradise_students_list", JSON.stringify(allStudents));

    // إذا كان هذا هو الطالب الحالي المسجل دخوله، نحدث حالته أيضاً
    if (currentStudent && currentStudent.name === name && currentStudent.track === track && currentStudent.grade === grade) {
      currentStudent.subscribed = student.subscribed;
      localStorage.setItem("science_paradise_student", JSON.stringify(currentStudent));
      updateSubscriptionUI();
      renderLessons();
    }

    renderAdminStudentsList();
  }
}

// حذف ملف تعريف طالب بالكامل
function deleteStudentProfile(name, track, grade) {
  if (!confirm("هل أنت متأكد من رغبتك في حذف ملف تعريف هذا الطالب بالكامل من المتصفح؟")) return;

  let allStudents = JSON.parse(localStorage.getItem("science_paradise_students_list") || "[]");
  allStudents = allStudents.filter(st => !(st.name === name && st.track === track && st.grade === grade));
  localStorage.setItem("science_paradise_students_list", JSON.stringify(allStudents));

  // إذا كان المحذوف هو الطالب الحالي النشط
  if (currentStudent && currentStudent.name === name && currentStudent.track === track && currentStudent.grade === grade) {
    localStorage.removeItem("science_paradise_student");
    currentStudent = null;
    closeTeacherDashboard();
    document.getElementById("mainApp").classList.add("hidden");
    document.getElementById("onboardingScreen").classList.add("active");
  } else {
    renderAdminStudentsList();
  }
}

// حفظ إعدادات لوحة التحكم
function saveAdminSettings() {
  const code = document.getElementById("adminActivationCode").value.trim();
  const phone = document.getElementById("adminContactPhone").value.trim();
  const pass = document.getElementById("adminTeacherPassword").value.trim();

  if (!code || !phone || !pass) {
    alert("الرجاء ملء جميع الخانات بشكل صحيح!");
    return;
  }

  adminSettings.activationCode = code;
  adminSettings.contactPhone = phone;
  adminSettings.teacherPassword = pass;

  localStorage.setItem("science_paradise_settings", JSON.stringify(adminSettings));
  
  // إعادة ترجمة وتحديث رقم الهاتف في الواجهات الفورية
  if (currentStudent) {
    translateAppUI(currentStudent.track);
  }

  alert("تم حفظ إعدادات المعلم والاشتراك بنجاح!");
}

// إضافة درس جديد باختبار مخصص من لوحة الإدارة
function saveNewLesson(e) {
  e.preventDefault();

  const track = document.getElementById("addLessonTrack").value;
  const grade = document.getElementById("addLessonGrade").value;
  const term = document.getElementById("addLessonTerm").value;
  const title = document.getElementById("addLessonTitle").value.trim();
  const desc = document.getElementById("addLessonDesc").value.trim();
  const video = document.getElementById("addLessonVideo").value.trim();

  if (!title || !desc || !video) return;

  // بناء الأسئلة
  const quizQuestions = [];
  const qItems = document.querySelectorAll(".question-item");
  
  qItems.forEach(item => {
    const qText = item.querySelector(".q-text").value.trim();
    if (qText) {
      const options = [
        item.querySelector(".q-opt-0").value.trim() || "A",
        item.querySelector(".q-opt-1").value.trim() || "B",
        item.querySelector(".q-opt-2").value.trim() || "C",
        item.querySelector(".q-opt-3").value.trim() || "D"
      ];
      const correct = parseInt(item.querySelector(".q-correct").value);
      quizQuestions.push({
        question: qText,
        options: options,
        answerIndex: correct
      });
    }
  });

  // قاعدة معرفة المساعد الذكي
  const studyNotes = document.getElementById("addLessonStudyNotes").value.trim();
  const faq = [];
  const faq1q = document.getElementById("addLessonFaq1Q").value.trim();
  const faq1a = document.getElementById("addLessonFaq1A").value.trim();
  const faq2q = document.getElementById("addLessonFaq2Q").value.trim();
  const faq2a = document.getElementById("addLessonFaq2A").value.trim();
  if (faq1q && faq1a) faq.push({ q: faq1q, a: faq1a });
  if (faq2q && faq2a) faq.push({ q: faq2q, a: faq2a });

  const uniqueId = `${track}-${grade}-${term}-${Date.now()}`;
  const newLesson = {
    id: uniqueId,
    title: title,
    description: desc,
    videoUrl: video,
    studyNotes: studyNotes,
    faq: faq,
    quiz: quizQuestions
  };

  // التأكد من تهيئة المصفوفات
  if (!curriculumData[track]) curriculumData[track] = {};
  if (!curriculumData[track][grade]) curriculumData[track][grade] = {};
  if (!curriculumData[track][grade][term]) curriculumData[track][grade][term] = [];

  // إضافة الدرس للمنهج
  curriculumData[track][grade][term].push(newLesson);
  localStorage.setItem("science_paradise_curriculum", JSON.stringify(curriculumData));

  // تنظيف الاستمارة
  document.getElementById("addLessonForm").reset();
  alert("تمت إضافة الدرس الجديد وبناء اختباره التفاعلي بنجاح ونشره فوراً!");

  // تحديث قائمة الدروس إذا كانت نشطة في الخلفية
  if (currentStudent && currentStudent.track === track && currentStudent.grade === grade && currentTerm === term) {
    renderLessons();
  }
}

// تصدير المنهج كملف JSON لتنزيله على الحاسوب كنسخة احتياطية
function exportCurriculum() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(curriculumData, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `جنة_العلوم_منهج_تصدير_${Date.now()}.json`);
  dlAnchorElem.click();
}

// استيراد منهج دراسي من ملف JSON خارجي
function importCurriculum(event) {
  const input = event.target;
  const reader = new FileReader();
  
  reader.onload = function() {
    try {
      const importedData = JSON.parse(reader.result);
      if (importedData.arabic || importedData.english) {
        curriculumData = importedData;
        localStorage.setItem("science_paradise_curriculum", JSON.stringify(curriculumData));
        alert("تم استيراد المنهج بنجاح وتحديث كافة الصفوف والدروس!");
        location.reload(); // إعادة تحميل لرؤية التغييرات
      } else {
        alert("تنسيق الملف غير صحيح، يرجى استيراد ملف منهج صالح لمنصة جنة العلوم!");
      }
    } catch (e) {
      alert("حدث خطأ أثناء قراءة الملف، يرجى التأكد من أن الملف بصيغة JSON صالحة.");
    }
  };

  if (input.files && input.files[0]) {
    reader.readAsText(input.files[0]);
  }
}

// إعادة ضبط المصنع ومسح كافة البيانات واستعادة المناهج الافتراضية
function resetAllData() {
  if (!confirm("تحذير! سيؤدي هذا الإجراء إلى حذف كافة المناهج المعدلة والدروس المضافة، والطلاب المسجلين، واستعادة المناهج الافتراضية للمنصة. هل أنت متأكد؟")) return;

  localStorage.removeItem("science_paradise_curriculum");
  localStorage.removeItem("science_paradise_settings");
  localStorage.removeItem("science_paradise_student");
  localStorage.removeItem("science_paradise_students_list");
  
  alert("تمت إعادة تهيئة المنصة واستعادة البيانات الافتراضية بنجاح!");
  location.reload();
}


// ==========================================================================
// إدارة قوائم الطلاب الإضافية وتخزين التقدم العام
// ==========================================================================

// البحث عن ملف تعريف طالب مسجل مسبقاً
function getSavedStudentFromList(name, track, grade) {
  const allStudents = JSON.parse(localStorage.getItem("science_paradise_students_list") || "[]");
  return allStudents.find(st => st.name === name && st.track === track && st.grade === grade);
}

// حفظ تقدم الطالب أو تحديث حالته في القائمة العامة
function saveStudentToList(student) {
  let allStudents = JSON.parse(localStorage.getItem("science_paradise_students_list") || "[]");
  const idx = allStudents.findIndex(st => st.name === student.name && st.track === student.track && st.grade === student.grade);
  
  if (idx !== -1) {
    allStudents[idx] = student;
  } else {
    allStudents.push(student);
  }
  localStorage.setItem("science_paradise_students_list", JSON.stringify(allStudents));
}

// العودة لشاشة التسجيل (تغيير الطالب)
function resetOnboarding() {
  if (confirm(currentStudent.track === 'arabic' ? 'هل ترغب في تسجيل الخروج وتغيير الطالب أو المسار؟' : 'Do you want to log out and change the student or track?')) {
    localStorage.removeItem("science_paradise_student");
    currentStudent = null;
    document.getElementById("mainApp").classList.add("hidden");
    document.getElementById("onboardingScreen").classList.add("active");
    
    // تفريغ النموذج
    document.getElementById("studentName").value = "";
    updateOnboardingTexts(document.querySelector('input[name="track"]:checked').value);
  }
}

// توليد فقاعات صاعدة عشوائية في خلفية المنصة
function generateFloatingBubbles() {
  const stream = document.getElementById("bubbleStream");
  if (!stream) return;

  const bubbleCount = 20;
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble-particle";
    const size = Math.random() * 25 + 8;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 8 + 6}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    stream.appendChild(bubble);
  }
}


// ==========================================================================
//  🤖 محرك المساعد الذكي "بروفيسور بابلز" — بحث منهجي بدقة 100%
//  يعمل 100% محلياً بدون أي API خارجي — يبحث في studyNotes و faq
// ==========================================================================

let chatIsOpen = false;
let activeLessonForChat = null; // الدرس الذي يشاهده الطالب حالياً

// تهيئة المساعد الذكي عند دخول الطالب
function initAIAssistant() {
  const track = currentStudent ? currentStudent.track : "arabic";
  const isAr = track === "arabic";

  document.getElementById("txtChatBotTitle").innerText = isAr ? "المساعد بابلز الذكي 🤖" : "Prof. Bubbles AI Assistant 🤖";
  document.getElementById("txtChatBotStatus").innerText = isAr ? "متصل — دقة منهجية 100% ✅" : "Online — 100% curriculum accuracy ✅";
  document.getElementById("txtAiTooltip").innerText = isAr ? "اسأل بروفيسور بابلز! 🧪" : "Ask Professor Bubbles! 🧪";
  document.getElementById("chatInputText").placeholder = isAr ? "اسأل عن أي شيء في الدرس..." : "Ask anything about the lesson...";

  // تهيئة نافذة المحادثة برسالة ترحيب
  const msgs = document.getElementById("chatMessages");
  msgs.innerHTML = "";
  addBotMessage(isAr
    ? "أهلاً يا بطل! أنا بروفيسور بابلز 🧪 مساعدك العلمي الشخصي! اسألني عن أي شيء في الدرس أو المنهج وسأجيبك بدقة 100% من كتاب العلوم! 🚀"
    : "Hey champion! I'm Professor Bubbles 🧪 your personal science assistant! Ask me anything about your lesson or curriculum and I'll answer with 100% accuracy from your science book! 🚀"
  );

  // أسئلة سريعة عامة
  renderSuggestions(isAr
    ? ["ما هي الدروس المتاحة؟", "كيف أفتح الدرس التالي؟", "ما معنى الكثافة؟"]
    : ["What lessons are available?", "How do I unlock the next lesson?", "What is density?"]
  );
}

// فتح/إغلاق نافذة الشات
function toggleChatWindow() {
  const win = document.getElementById("aiChatWindow");
  chatIsOpen = !chatIsOpen;
  if (chatIsOpen) {
    win.classList.remove("hidden");
    win.classList.add("chat-slide-in");
    document.getElementById("chatInputText").focus();
    // إذا كان الطالب داخل درس، حمّل أسئلته التلقائية
    if (activeLessonForChat) {
      loadLessonFAQSuggestions(activeLessonForChat);
    }
  } else {
    win.classList.add("hidden");
    win.classList.remove("chat-slide-in");
  }
}

// تحميل الأسئلة السريعة الخاصة بدرس معين
function loadLessonFAQSuggestions(lesson) {
  const isAr = currentStudent.track === "arabic";
  const suggestions = [];

  if (lesson.faq && lesson.faq.length > 0) {
    lesson.faq.forEach(f => suggestions.push(f.q));
  }

  // أسئلة إضافية دائمة
  suggestions.push(isAr ? "لخّص لي الدرس بسرعة" : "Give me a quick lesson summary");
  suggestions.push(isAr ? "ما هي النقاط الأهم في الدرس؟" : "What are the key points?");

  renderSuggestions(suggestions);
}

// رندرة أزرار الأسئلة السريعة
function renderSuggestions(questions) {
  const container = document.getElementById("chatSuggestions");
  container.innerHTML = "";
  questions.slice(0, 4).forEach(q => {
    const btn = document.createElement("button");
    btn.className = "chat-suggest-btn";
    btn.innerText = q;
    btn.onclick = () => {
      document.getElementById("chatInputText").value = q;
      handleSendChatMessage({ preventDefault: () => {} });
    };
    container.appendChild(btn);
  });
}

// إرسال رسالة المستخدم ومعالجتها
function handleSendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById("chatInputText");
  const userMsg = input.value.trim();
  if (!userMsg) return;

  // إضافة رسالة المستخدم
  addUserMessage(userMsg);
  input.value = "";

  // إظهار مؤشر التفكير
  showTypingIndicator();

  // تأخير قصير لإحساس طبيعي
  setTimeout(() => {
    hideTypingIndicator();
    const response = generateAIResponse(userMsg);
    addBotMessage(response);
  }, 600);
}

// ===================================================================
//  🧠 محرك البحث والإجابة — يبحث في المنهج الكامل بخوارزمية ذكية
// ===================================================================
function generateAIResponse(query) {
  const track = currentStudent.track;
  const grade = currentStudent.grade;
  const isAr = track === "arabic";
  const q = query.toLowerCase().trim();

  // -------- ردود النظام (أسئلة المنصة نفسها) --------
  const systemAnswers = isAr ? {
    "الدروس المتاحة": buildLessonsListAnswer,
    "كيف أفتح": () => "لفتح الدروس المقفلة يجب تفعيل اشتراكك! اضغط على زر '🔑 تفعيل الاشتراك' في أعلى الصفحة، ثم تواصل مع المعلمة على الواتساب للحصول على كود التفعيل.",
    "اشتراك": () => `للاشتراك وتفعيل حسابك، تواصل مع المعلمة على واتساب: ${adminSettings.contactPhone} وستحصل على كود التفعيل فوراً! 💎`,
    "كود": () => `كود التفعيل يُرسل لك من المعلمة بعد الاشتراك. تواصل على: ${adminSettings.contactPhone}`,
    "رقم": () => `رقم التواصل مع المعلمة هو: 📱 ${adminSettings.contactPhone}`,
    "واتساب": () => `تواصل مع المعلمة مباشرة على واتساب: 📱 ${adminSettings.contactPhone}`,
    "دروس": buildLessonsListAnswer,
    "درس": buildLessonsListAnswer,
    "اختبار": () => "كل درس لديه اختبار تفاعلي في نهايته. شاهد الفيديو جيداً ثم اضغط 'ابدأ الدرس' للبدء في الاختبار! 🎮",
    "فيديو": () => "الفيديوهات التعليمية موجودة بداخل كل بطاقة درس. اضغط 'ابدأ الدرس' لمشاهدة شرح المعلمة! 📹",
  } : {
    "available lessons": buildLessonsListAnswer,
    "unlock": () => "To unlock the locked lessons, you need to activate your subscription! Click '🔑 Activate Membership' button at the top of the page, then contact the teacher on WhatsApp to get your activation code.",
    "subscription": () => `To subscribe, contact the teacher on WhatsApp: ${adminSettings.contactPhone} and you'll get your activation code instantly! 💎`,
    "code": () => `The activation code is sent to you by the teacher after subscribing. Contact: ${adminSettings.contactPhone}`,
    "contact": () => `Teacher's contact number: 📱 ${adminSettings.contactPhone}`,
    "whatsapp": () => `Contact the teacher directly on WhatsApp: 📱 ${adminSettings.contactPhone}`,
    "lessons": buildLessonsListAnswer,
    "quiz": () => "Every lesson has an interactive quiz at the end. Watch the video carefully then click 'Start Lesson' to begin! 🎮",
    "video": () => "Educational videos are inside each lesson card. Click 'Start Lesson' to watch the teacher's explanation! 📹",
  };

  // البحث في ردود النظام أولاً
  for (const [keyword, fn] of Object.entries(systemAnswers)) {
    if (q.includes(keyword)) return fn();
  }

  // -------- البحث في محتوى المنهج (studyNotes و faq) --------
  const allLessons = [];
  const trackData = curriculumData[track];
  if (trackData && trackData[grade]) {
    const gradeData = trackData[grade];
    ["term1", "term2"].forEach(term => {
      if (gradeData[term]) {
        gradeData[term].forEach(lesson => allLessons.push(lesson));
      }
    });
  }

  // أولاً: البحث في الـ FAQ (الأسئلة الشائعة) — أعلى دقة
  for (const lesson of allLessons) {
    if (lesson.faq && lesson.faq.length > 0) {
      for (const item of lesson.faq) {
        const faqQ = item.q.toLowerCase();
        // تطابق دقيق أو جزئي
        if (faqQ.includes(q) || q.includes(faqQ.slice(0, 10)) || similarityScore(q, faqQ) > 0.5) {
          return `📚 **${lesson.title}**\n\n${item.a}`;
        }
      }
    }
  }

  // ثانياً: البحث بالكلمات المفتاحية في studyNotes
  const queryWords = q.split(/\s+/).filter(w => w.length > 2);
  let bestMatch = null;
  let bestScore = 0;

  for (const lesson of allLessons) {
    const notes = (lesson.studyNotes || "").toLowerCase();
    const title = (lesson.title || "").toLowerCase();
    const desc = (lesson.description || "").toLowerCase();
    const fullText = `${title} ${desc} ${notes}`;

    let score = 0;
    queryWords.forEach(word => {
      if (fullText.includes(word)) score += (notes.includes(word) ? 3 : 1);
    });

    // مطابقة عنوان الدرس بالكامل
    if (title.includes(q) || q.includes(title.substring(0, 8))) score += 5;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = lesson;
    }
  }

  // إذا وجدنا تطابقاً جيداً في الملاحظات الدراسية
  if (bestMatch && bestScore >= 2 && bestMatch.studyNotes) {
    const excerpt = extractRelevantSentence(bestMatch.studyNotes, queryWords);
    return `🔬 **${bestMatch.title}**\n\n${excerpt}\n\n${isAr ? "هل تريد مزيداً من التوضيح؟ اسألني بشكل أكثر تفصيلاً!" : "Need more details? Ask me more specifically!"}`;
  }

  // ثالثاً: البحث العام في الدرس الحالي المفتوح (أيضاً من الدروس المتاحة)
  if (activeLessonForChat && activeLessonForChat.studyNotes) {
    const notes = activeLessonForChat.studyNotes.toLowerCase();
    if (queryWords.some(w => notes.includes(w))) {
      const excerpt = extractRelevantSentence(activeLessonForChat.studyNotes, queryWords);
      return `🧪 **${isAr ? "من درسك الحالي" : "From your current lesson"}:**\n\n${excerpt}`;
    }
  }

  // رابعاً: رد عام إذا لم يُجد البحث نتيجة
  const fallbacks = isAr ? [
    `عذراً يا بطل! سؤالك "${query}" ليس في نطاق المنهج الذي أمتلكه الآن. 🤔\n\nحاول سؤالي عن:\n• تعريف مصطلح علمي (مثل: ما هي الكثافة؟)\n• شرح ظاهرة (مثل: لماذا تطفو الأجسام؟)\n• مصطلح من الدرس الحالي\n\nأو راجع ملاحظات الدرس في الفيديو! 📹`,
    `لم أجد إجابة دقيقة لهذا السؤال في المنهج. 🧐\n\nقد تكون المعلمة لم تُضف ملاحظات هذا الموضوع بعد.\nيمكنك التواصل مع المعلمة مباشرة: 📱 ${adminSettings.contactPhone}`
  ] : [
    `Sorry champion! Your question "${query}" is not in my current curriculum scope. 🤔\n\nTry asking me about:\n• A scientific term (e.g: What is density?)\n• A phenomenon (e.g: Why do objects float?)\n• Something from your current lesson notes\n\nOr check the lesson video! 📹`,
    `I couldn't find a precise answer in the curriculum. 🧐\n\nThe teacher might not have added notes for this topic yet.\nYou can contact the teacher directly: 📱 ${adminSettings.contactPhone}`
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// بناء قائمة الدروس المتاحة للطالب الحالي
function buildLessonsListAnswer() {
  const track = currentStudent.track;
  const grade = currentStudent.grade;
  const isAr = track === "arabic";
  const gradeData = curriculumData[track] && curriculumData[track][grade];
  if (!gradeData) return isAr ? "لا توجد دروس مضافة لصفك بعد!" : "No lessons added for your grade yet!";

  let answer = isAr ? `📚 **دروسك في ${translations.arabic.gradeOptions[grade]}:**\n\n` : `📚 **Your lessons in ${translations.english.gradeOptions[grade]}:**\n\n`;

  ["term1", "term2"].forEach((term, ti) => {
    const lessons = gradeData[term] || [];
    if (lessons.length > 0) {
      answer += isAr ? `**الترم ${ti + 1}:**\n` : `**Term ${ti + 1}:**\n`;
      lessons.forEach((l, i) => {
        const done = currentStudent.completedLessons.includes(l.id);
        answer += `${i + 1}. ${l.title} ${done ? "✅" : ""}\n`;
      });
      answer += "\n";
    }
  });

  return answer.trim();
}

// استخراج الجملة الأكثر صلة من النص
function extractRelevantSentence(text, queryWords) {
  const sentences = text.split(/[.،\n!؟?]/).filter(s => s.trim().length > 10);
  let bestSentence = sentences[0] || text.substring(0, 200);
  let bestScore = 0;

  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase();
    let score = queryWords.reduce((acc, word) => acc + (lowerSentence.includes(word) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestSentence = sentence;
    }
  });

  // إذا كانت الجملة المستخرجة قصيرة جداً، أضف الجملة التالية
  const idx = sentences.indexOf(bestSentence);
  const extra = sentences[idx + 1] ? " " + sentences[idx + 1].trim() : "";
  return bestSentence.trim() + (extra.length < 120 ? extra : "") + ".";
}

// خوارزمية التشابه البسيطة بين نصين (Jaccard)
function similarityScore(a, b) {
  const setA = new Set(a.split(/\s+/));
  const setB = new Set(b.split(/\s+/));
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

// إضافة رسالة من المساعد
function addBotMessage(text) {
  const msgs = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = "chat-msg bot-msg";

  // تحويل **نص عريض** إلى HTML
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");

  div.innerHTML = `
    <div class="bot-avatar">🧪</div>
    <div class="msg-bubble bot-bubble">${formattedText}</div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

// إضافة رسالة من الطالب
function addUserMessage(text) {
  const msgs = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = "chat-msg user-msg";
  div.innerHTML = `<div class="msg-bubble user-bubble">${text}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

// مؤشر "جاري الكتابة..."
function showTypingIndicator() {
  const msgs = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = "chat-msg bot-msg typing-indicator-wrapper";
  div.id = "typingIndicator";
  div.innerHTML = `
    <div class="bot-avatar">🧪</div>
    <div class="msg-bubble bot-bubble typing-bubble">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function hideTypingIndicator() {
  const el = document.getElementById("typingIndicator");
  if (el) el.remove();
}

// ربط المساعد بالدرس الحالي عند فتحه (لتحميل أسئلة مخصصة)
const _origOpenLessonModal = openLessonModal;
openLessonModal = function(lessonId) {
  _origOpenLessonModal(lessonId);
  // تحديد الدرس الحالي للمساعد الذكي
  const track = currentStudent.track;
  const grade = currentStudent.grade;
  const lessons = curriculumData[track][grade][currentTerm] || [];
  activeLessonForChat = lessons.find(l => l.id === lessonId) || null;
  if (activeLessonForChat && chatIsOpen) {
    loadLessonFAQSuggestions(activeLessonForChat);
    addBotMessage(
      currentStudent.track === "arabic"
        ? `🔬 فتحت درس **${activeLessonForChat.title}** — اسألني عنه وسأجيبك بدقة!`
        : `🔬 You opened **${activeLessonForChat.title}** — Ask me anything about it!`
    );
  }
};

// إعادة تعيين الدرس النشط عند الإغلاق
const _origCloseLessonModal = closeLessonModal;
closeLessonModal = function() {
  _origCloseLessonModal();
  activeLessonForChat = null;
  const isAr = currentStudent.track === "arabic";
  renderSuggestions(isAr
    ? ["ما هي الدروس المتاحة؟", "كيف أفتح الدرس التالي؟", "ما هو موضوع الدرس؟"]
    : ["What lessons are available?", "How do I unlock the next lesson?", "Summarize the topic"]
  );
};

