import React from 'react';
import './about.css';

const AboutUs = () => {
  return (
    <div className='about-section'>
        <div className='about-title'>
            <h1>About Us</h1>
            <p>Welcome to our website!</p>
        </div>
        <div className=' row-1'>
            <div className='left-sec'>
            <h2>Our Team</h2>
           <p className='our-team-sec'> 
                Our team is comprised of highly skilled professionals who are experts in their respective fields. We believe in the power of collaboration and leverage each team member's unique strengths to deliver outstanding results
                With a diverse range of backgrounds and experiences, our team brings creativity, expertise, and dedication to every project we undertake. We foster an inclusive and supportive work environment that encourages innovation and continuous learning
                We prioritize open communication and value each team member's ideas and contributions. Through effective teamwork, we tackle challenges and achieve success together
                Our team is driven by a shared passion for excellence and a commitment to exceeding customer expectations. We constantly strive for growth and improvement, keeping up with the latest industry trends and technologies
                At the heart of our team is a strong sense of camaraderie and mutual support. We celebrate achievements, acknowledge individual efforts, and foster a positive and uplifting atmosphere
                Together, we create a collaborative and dynamic work environment that enables us to deliver exceptional products and services, making a real difference for our clients
            </p>
            </div>
            <div className='right-sec'>
                <img src='https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=600' />
            </div>
        </div>
        <div className='row-2'>
            <h1>Our Team Members</h1>
          <div className='team-member-sec'>
            <div className='team-member'>
                <img src='https://images.pexels.com/photos/3501159/pexels-photo-3501159.jpeg?auto=compress&cs=tinysrgb&w=600' />
                <h3>Harry</h3>
            </div>
            <div className='team-member'>
                <img src='https://images.pexels.com/photos/936043/pexels-photo-936043.jpeg?auto=compress&cs=tinysrgb&w=600' />
                <h3>Josep</h3>
            </div>
            <div className='team-member'>
                <img src='https://images.pexels.com/photos/4342400/pexels-photo-4342400.jpeg?auto=compress&cs=tinysrgb&w=600'/>
                <h3>Rahul Kuswaha</h3>
            </div>
            <div className='team-member'>
                <img src='https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=600'/>
                <h3>Raghu Daksh</h3>
            </div>
            <div className='team-member'>
                <img src='https://images.pexels.com/photos/5717546/pexels-photo-5717546.jpeg?auto=compress&cs=tinysrgb&w=600'/>
                <h3>Natasha Garg</h3>
            </div>
        </div>  
        </div>
     
    </div>
  );
};
    
export default AboutUs;