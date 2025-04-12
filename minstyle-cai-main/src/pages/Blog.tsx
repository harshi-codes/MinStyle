
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blogPosts';

const Blog = () => {
  return (
    <div className="min-h-screen bg-minBlack text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-28 pb-12 bg-gradient-to-b from-minOrange/5 to-transparent">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">minStyle Blog</h1>
          <p className="text-gray-300 max-w-2xl">
            Insights, stories, and perspectives from our team on sustainable fashion,
            technology, and the future of retail.
          </p>
        </div>
      </div>
      
      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((blog) => (
            <article 
              key={blog.id}
              className="bg-black/50 rounded-lg overflow-hidden border border-gray-800 hover:border-minOrange/50 transition-colors group p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs text-minOrange px-2 py-1 rounded-full bg-minOrange/10">
                  {blog.category}
                </span>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock size={14} className="mr-1" />
                  {blog.readTime}
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-6 group-hover:text-minOrange transition-colors">
                {blog.title}
              </h2>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium">{blog.author}</p>
                  <p className="text-xs text-gray-400">{blog.role || "Team Member"}</p>
                </div>
                
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar size={14} className="mr-1" />
                  {blog.date}
                </div>
              </div>
              
              <Link to={`/blog/${blog.id}`}>
                <Button 
                  variant="ghost" 
                  className="w-full text-minOrange hover:text-white hover:bg-minOrange/20 group"
                >
                  Read More 
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </article>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
