import { Link } from "react-router-dom";
import { FaPlayCircle, FaFolderOpen, FaHistory, FaArrowRight } from "react-icons/fa";

const features = [
  {
    icon: <FaPlayCircle />,
    title: "Play Your Videos",
    text: "Keep your favorite video links together and play them in one simple place.",
    className: "feature-blue"
  },
  {
    icon: <FaFolderOpen />,
    title: "Organize with Categories",
    text: "Create categories to keep your video collection neat and easy to browse.",
    className: "feature-purple"
  },
  {
    icon: <FaHistory />,
    title: "Watch History",
    text: "Find recently watched videos with their captions, links, and viewing times.",
    className: "feature-orange"
  }
];

function LandingPage() {
  return (
    <main  style={{overflow:'hidden',background:'black',color:'white',minHeight:'100vh'}} className="landing-page ">
       <div className="row">
          <div className="col pt-5 text-end ">
            <h3 style={{fontWeight:"bold"}} className="text-center">Welcome to Media Player</h3>
            <p style={{textAlign:'justify',paddingLeft:'20px',fontWeight:"bold"}} >Welcome to your all-in-one media management hub! Effortlessly upload,
               organize, and play your favorite videos in one simple place. Easily categorize your content, customize your playlist
                order with smooth drag-and-drop controls, and keep track of your viewing history anytime. Start building and
                 organizing your media collection today!
.</p>
            <div className='d-flex justify-content-center'>
             <Link  to ='/home'> <button className='btn btn-dark ' >Get Started</button> </Link>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center"><img src="https://i.pinimg.com/originals/33/a4/6f/33a46f727dbe790d436616a1f56fce9c.gif" alt="" /></div> </div>

      <section className="container py-4 pb-5">
        <div className="text-center mb-4 border shadow rounded">
          
          <h2 className="fw-bold mt-2">Features</h2>
          <p className="text-secondary">Three simple tools to make your video collection easier to manage.</p>
        </div>
        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-12 col-md-4" key={feature.title}>
              <article className="feature-card h-100">
                <div className={`feature-icon ${feature.className}`}>{feature.icon}</div>
                <h3 className="h5 fw-bold mt-4">{feature.title}</h3>
                <p className="text-secondary mb-0">{feature.text}</p>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
