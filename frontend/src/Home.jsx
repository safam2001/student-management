
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
   
    </div>
  );
};

export default Home;