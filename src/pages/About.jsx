import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const teamMembers = [
  { id: 1, name: 'سالم أحمد', role: 'مصور محترف', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  { id: 2, name: 'محمد علي', role: 'مصور بورتريه', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
  { id: 3, name: 'إبراهيم حسن', role: 'مصور طبيعة', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
  { id: 4, name: 'داود خالد', role: 'مدرب تصوير', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face' },
  { id: 5, name: 'ليث محمود', role: 'فنان بصري', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
  { id: 6, name: 'جمال عبدالله', role: 'مراجع تقني', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face' },
  { id: 7, name: 'خالد الفيصل', role: 'مصور فلكي', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face' },
  { id: 8, name: 'نادر سعيد', role: 'مصور شوارع', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop&crop=face' },
  { id: 9, name: 'هاني الشمري', role: 'مصور طعام', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&crop=face' },
  { id: 10, name: 'عمر الراشد', role: 'مصور حياة برية', image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face' },
  { id: 11, name: 'فارس العلي', role: 'فنان فوتوغرافي', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face' },
  { id: 12, name: 'سامي الحربي', role: 'خبير تعديل صور', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face' },
  { id: 13, name: 'رامي الخطيب', role: 'مصور ماكرو', image: 'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=100&h=100&fit=crop&crop=face' },
  { id: 14, name: 'باسم المصري', role: 'مصور فني', image: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=100&h=100&fit=crop&crop=face' },
  { id: 15, name: 'منصور الزهراني', role: 'مصور زفاف', image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=100&h=100&fit=crop&crop=face' },
  { id: 16, name: 'فيصل الدوسري', role: 'مصور جوي', image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=100&h=100&fit=crop&crop=face' },
  { id: 17, name: 'لؤي الصالح', role: 'مصور تجاري', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face' },
  { id: 18, name: 'طارق النعيمي', role: 'مصور معماري', image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&h=100&fit=crop&crop=face' },
  { id: 19, name: 'أحمد الشهري', role: 'مصور رياضي', image: 'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?w=100&h=100&fit=crop&crop=face' },
  { id: 20, name: 'ماجد القحطاني', role: 'مصور استوديو', image: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=100&h=100&fit=crop&crop=face' },
  { id: 21, name: 'ياسر العتيبي', role: 'مصور رحالة', image: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=100&h=100&fit=crop&crop=face' },
  { id: 22, name: 'راشد الجاسر', role: 'فنان بصري', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="grid-overlay"></div>
        <div className="container">
          <div className="about-hero-content">
            <span className="badge">
              <span className="dots-container">
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
              من نحن
            </span>
            <h1>مهمتنا هي <span>الإعلام والإلهام</span></h1>
            <p className="hero-subtitle">
              مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين ونصائح عملية لتطوير مهاراتكم. نحن شغوفون بمشاركة المعرفة ومساعدة المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة.
            </p>

            <div className="stats" style={{maxWidth: '100%', marginTop: '50px'}}>
              <div className="stat-item">
                <i className="fa-solid fa-users"></i>
                <h3>+2 مليون</h3>
                <p>قارئ شهرياً</p>
              </div>
              <div className="stat-item">
                <i className="fa-regular fa-newspaper"></i>
                <h3>+500</h3>
                <p>مقالة منشورة</p>
              </div>
              <div className="stat-item">
                <i className="fa-solid fa-pen-nib"></i>
                <h3>+50</h3>
                <p>كاتب خبير</p>
              </div>
              <div className="stat-item">
                <i className="fa-solid fa-book-open"></i>
                <h3>+15</h3>
                <p>تصنيف</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <div className="section-header-center">
            <h2><span className="golden-pipe">|</span> قيمنا <span className="golden-pipe">|</span></h2>
            <p className="subtitle">المبادئ التي توجه كل ما نقوم بإنشائه</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <i className="fa-solid fa-bullseye"></i>
              <h3>الجودة أولاً</h3>
              <p>محتوى مدروس ومكتوب بخبرة</p>
            </div>
            <div className="value-card">
              <i className="fa-solid fa-bolt"></i>
              <h3>تركيز عملي</h3>
              <p>أمثلة واقعية يمكنك تطبيقها اليوم</p>
            </div>
            <div className="value-card">
              <i className="fa-solid fa-handshake"></i>
              <h3>المجتمع</h3>
              <p>تعلم مع آلاف المصورين</p>
            </div>
            <div className="value-card">
              <i className="fa-solid fa-arrows-rotate"></i>
              <h3>دائماً محدث</h3>
              <p>أحدث الاتجاهات وأفضل الممارسات</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="container">
          <div className="section-header-center">
            <span className="badge">
              <span className="dots-container">
                <span className="dot"></span>
              </span>
              فريقنا
            </span>
            <h2 className="team-title-main">تعرف على <span>كتابنا</span></h2>
            <p className="subtitle">نخبة من أفضل المصورين والخبراء يشاركون خبراتهم معك</p>
          </div>

          <div className="team-grid">
            {teamMembers.map(member => (
              <div className="team-card" key={member.id}>
                <div className="team-avatar-wrapper">
                  <img src={member.image} alt={member.name} className="team-avatar" />
                  <span className="verified-badge"><i className="fa-solid fa-check"></i></span>
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="team-social">
                  <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href="#"><i className="fa-brands fa-github"></i></a>
                  <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>لديك أسئلة؟ <span>دعنا نتحدث!</span></h2>
            <p>نحن دائماً مستعدون للإجابة على استفساراتك ومساعدتك في مسيرتك في عالم التصوير.</p>
            <div className="cta-buttons">
              <a href="mailto:hello@adasah.com" className="btn-cta-outline">تواصل معنا</a>
              <Link to="/blog" className="btn-cta-solid">تصفح المقالات</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
