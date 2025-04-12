
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blogPosts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const BlogDetail = () => {
  const { id } = useParams();
  const blogId = parseInt(id || '1');
  
  // Find the blog post with the matching ID
  const blog = blogPosts.find(post => post.id === blogId);
  
  if (!blog) {
    return (
      <div className="min-h-screen bg-minBlack text-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-20">
          <h1 className="text-3xl font-bold">Blog post not found</h1>
          <Link to="/blog">
            <Button className="mt-4">Back to Blogs</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-minBlack text-white">
      <Navbar />
      
      {/* Blog Header */}
      <div className="pt-28 pb-8 bg-gradient-to-b from-minOrange/5 to-transparent">
        <div className="container mx-auto px-4">
          <Link to="/blog">
            <Button variant="ghost" className="mb-4 text-gray-400 hover:text-white">
              <ArrowLeft size={18} className="mr-2" /> Back to Blogs
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs text-minOrange px-2 py-1 rounded-full bg-minOrange/10">
              {blog.category}
            </span>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock size={14} className="mr-1" />
              {blog.readTime}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{blog.title}</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={blog.authorImage} alt={blog.author} />
                <AvatarFallback>{blog.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{blog.author}</p>
                <p className="text-sm text-gray-400">{blog.role || 'Team Member'}</p>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-400">
              <Calendar size={14} className="mr-1" />
              {blog.date}
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {blog.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-lg prose-invert max-w-none">
            {blog.content.map((paragraph, i) => (
              <p key={i} className="mb-6 text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Share Section */}
          <div className="mt-10 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <p className="font-medium">Share this article:</p>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;
