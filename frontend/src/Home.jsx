import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import './Home.css';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, filterType]);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get('/api/projects');
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = [...projects];

    // البحث
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فلتر النوع
    if (filterType !== 'all') {
      // يمكن إضافة منطق الفلترة حسب النوع
    }

    setFilteredProjects(filtered);
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // جاري التحميل
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Tiger Real Estate</h1> {/* مرحباً بك في تايغر العقارية */}
          <p className="hero-subtitle">Discover Luxury Living in Dubai's Finest Properties</p> {/* اكتشف الحياة الفاخرة في أفضل العقارات في دبي */}
          <div className="hero-buttons">
            <Link to="#projects" className="btn-primary">Explore Projects</Link> {/* استكشف المشاريع */}
            <Link to="/contact" className="btn-secondary">Contact Us</Link> {/* اتصل بنا */}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="projects-section" id="projects">
        <div className="section-header">
          <h2>Featured Projects</h2> {/* المشاريع المميزة */}
          <p>Discover a curated selection of Dubai's finest real estate developments</p> {/* اكتشف مجموعة مختارة من أفضل مشاريع العقارات في دبي */}
        </div>

        {/* Search and Filter */}
        <div className="search-filter-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a project or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="filters">
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option> {/* جميع الأنواع */}
              <option value="residential">Residential</option> {/* سكني */}
              <option value="commercial">Commercial</option> {/* تجاري */}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="no-results">
            <p>No projects match your search criteria</p> {/* لا توجد مشاريع تطابق معايير البحث */}
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image">
                  {project.image ? (
                    <img src={project.image} alt={project.name} loading="lazy" />
                  ) : (
                    <div className="no-image-placeholder" style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}>
                      <div className="placeholder-overlay">
                        <span>🏢</span>
                        <p>{project.name}</p>
                      </div>
                    </div>
                  )}
                  <div className="project-overlay">
                    <Link to={`/project/${project.id}`} className="overlay-btn">
                      View Details {/* عرض التفاصيل */}
                    </Link>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p className="project-location">📍 {project.location}</p>
                  <p className="project-description">
                    {project.description?.substring(0, 120)}...
                  </p>
                  <div className="project-stats">
                    <span>{project.Units?.length || 0} Units Available</span> {/* وحدات متاحة */}
                  </div>
                  <Link to={`/project/${project.id}`} className="view-btn">
                    View Project {/* عرض المشروع */}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="video-container">
          <h2>Experience Tiger Real Estate</h2> {/* اختبر تجربة تايغر العقارية */}
          <div className="video-wrapper">
            {projects[0]?.videos ? (
              <video 
                controls 
                className="featured-video"
                poster={projects[0]?.image}
              >
                <source src={projects[0].videos} type="video/mp4" />
                Your browser does not support the video tag. {/* متصفحك لا يدعم تشغيل الفيديو */}
              </video>
            ) : (
              <div className="video-placeholder">
                <span className="play-icon">▶</span>
                <p>Video Coming Soon</p> {/* الفيديو قريباً */}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">🏢</div>
            <div className="stat-number">50+</div>
            <div className="stat-label">Completed Projects</div> {/* مشاريع مكتملة */}
          </div>
          <div className="stat-item">
            <div className="stat-icon">👥</div>
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Happy Customers</div> {/* عملاء سعداء */}
          </div>
          <div className="stat-item">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">15+</div>
            <div className="stat-label">Years of Experience</div> {/* سنوات من الخبرة */}
          </div>
          <div className="stat-item">
            <div className="stat-icon">🏆</div>
            <div className="stat-number">100+</div>
            <div className="stat-label">Awards & Recognition</div> {/* جوائز وتقدير */}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview-section">
        <div className="about-preview-container">
          <div className="about-preview-content">
            <h2>About Tiger Real Estate</h2> {/* حول تايغر العقارية */}
            <p>
              Tiger Real Estate is a leading property development company based in Dubai, UAE. 
              With over 15 years of experience, we specialize in creating exceptional residential 
              and commercial properties that redefine luxury living.
            </p> {/* تايغر العقارية هي شركة رائدة في تطوير العقارات مقرها دبي، الإمارات العربية المتحدة. مع أكثر من 15 عاماً من الخبرة، نتخصص في إنشاء عقارات سكنية وتجارية استثنائية تعيد تعريف الحياة الفاخرة */}
            <Link to="/about" className="learn-more-btn">Learn More</Link> {/* اعرف المزيد */}
          </div>
          <div className="about-preview-image">
            <div className="image-placeholder">
              <span>🏗️</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
