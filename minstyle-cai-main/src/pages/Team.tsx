'use client';

import type { FC } from 'react';
import { Github, Linkedin, Mail, Instagram, UserRound } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Team data
const teamMembers = [
  {
    id: 1,
    name: 'Harshita Singh',
    role: 'Founder and Tech Lead',

    image: '/team/harshita.jpg',
    social: {
      linkedin: 'https://www.linkedin.com/in/harshita-singh-a37b34197/',
      instagram: 'https://www.instagram.com/harshi0.0?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      email: 'harshita@minstyle.com',
    }
  },
  {
    id: 5,
    name: 'Rudra Pratap Singh',
    role: 'Content Analyst',
    bio: '',
    image: '/team/rudra.jpg',
    social: {
      linkedin: 'https://www.linkedin.com/in/rudracodes/',
      instagram: 'https://www.instagram.com/rudeicious/?utm_source=ig_web_button_share_sheet',
      email: 'rudra@minstyle.com',
    }
  },
  {
    id: 4,
    name: 'Maanya Jajodia',
    role: 'Content Analyst',
    bio: '',
    image: '/team/maanya.jpg',
    social: {
      linkedin: 'https://www.linkedin.com/in/maanya-jajodia-3905a7336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      instagram: 'https://www.instagram.com/maanyaa1411?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      email: 'maanya@minstyle.com',
    }
  },
  {
    id: 2,
    name: 'Shobhit Dutta',
    role: 'Backend Developer',
    bio: '',
    image: '/team/shobhit.jpg',
    social: {
      linkedin: 'www.linkedin.com/in/shobhit-dutta',
      instagram: 'https://www.instagram.com/_slyeet/',
      github: 'https://www.github.com/slyeeet03',
      email: 'shobhit@minstyle.com',
    }
  },
  {
    id: 3,
    name: 'Dhruv Sharda',
    role: 'Business Development and Research Analyst',
    bio: '',
    image: '/team/dhruv.jpg',
    social: {
      github: '#',
      linkedin: 'https://www.linkedin.com/in/dhruv-sharda-8a6231239/',
      email: 'dhruv@minstyle.com',
    }
  },
  {
    id: 6,
    name: 'Saish',
    role: 'Graphic Design',
    bio: '',
    image: '/team/saish.jpg',
    social: {
      github: '#',
      linkedin: '#',
      instagram: '#',
    }
  }
];

const Team: FC = () => {
  return (
    <div className="min-h-screen bg-minBlack text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-28 pb-16 bg-gradient-to-b from-minBlue/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The passionate minds behind minStyle, working together to revolutionize sustainable fashion.
          </p>
        </div>
      </div>
      
      {/* Team Members Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-minOrange/20 to-minBlue/20 p-1">
                <div className="absolute inset-0 transform group-hover:translate-y-0 translate-y-[70%] bg-gradient-to-b from-transparent via-minBlack/80 to-minBlack transition-all duration-500 flex flex-col justify-end p-6">
                  <h3 className="font-bold text-xl">{member.name}</h3>
                  {member.role && (
                    <p className="text-minOrange text-sm mb-2 font-bold uppercase tracking-wider">{member.role}</p>
                  )}
                  <p className="text-sm text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{member.bio}</p>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {member.social.github && (
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700/80">
                        <Github size={16} />
                      </Button>
                    )}
                    {member.social.linkedin && (
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700/80">
                        <Linkedin size={16} />
                      </Button>
                    )}
                    {member.social.instagram && (
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700/80">
                        <Instagram size={16} />
                      </Button>
                    )}
                    {member.social.email && (
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700/80">
                        <Mail size={16} />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="aspect-square w-64 h-64 mx-auto overflow-hidden rounded-full">
                  {member.image ? (
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <UserRound size={80} className="text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-bold text-xl group-hover:opacity-0 transition-opacity duration-300">{member.name}</h3>
                  {member.role && (
                    <p className="text-minOrange text-sm group-hover:opacity-0 transition-opacity duration-300 font-bold uppercase tracking-wider">{member.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Team Values */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-black border border-gray-800 rounded-lg hover:border-minOrange/50 transition-colors">
              <div className="bg-minOrange/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl text-minOrange">♻️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-400">
                We're committed to reducing fashion's environmental impact through mindful practices.
              </p>
            </div>
            
            <div className="p-6 bg-black border border-gray-800 rounded-lg hover:border-minOrange/50 transition-colors">
              <div className="bg-minOrange/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl text-minOrange">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-400">
                Building a community that values ethical fashion and supports positive industry change.
              </p>
            </div>
            
            <div className="p-6 bg-black border border-gray-800 rounded-lg hover:border-minOrange/50 transition-colors">
              <div className="bg-minOrange/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl text-minOrange">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-400">
                Constantly exploring new technologies and approaches to make fashion more sustainable.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Join Our Team */}
      <div className="bg-gradient-to-r from-minOrange/10 to-minBlue/10 py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals who want to make a difference in sustainable fashion.
          </p>
          <Button className="bg-minOrange hover:bg-minOrange/90">View Open Positions</Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Team;
