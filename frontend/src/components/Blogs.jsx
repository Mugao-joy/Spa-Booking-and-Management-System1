import React, { useState, useEffect } from 'react';
import './Blogs.css'
import Navbar from './Navbar';

const Blog = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/blogs/')
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }
        const data = await response.json()
        setBlogs(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className='container'>
            <h1>EVERYTHING YOU NEED TO KNOW ABOUT FACIALS</h1>
            <ul className='blog-list'>
                {blogs.map(blog => (
                    <li key={blog.id} className='blog-item'>
                        <h2 className='blog-title'>{blog.title}</h2>
                        <p className='blog-content'>{blog.content}</p>
                    </li>
                ))}
            </ul>
      </div>
    </div>
    )
}  
export default Blog