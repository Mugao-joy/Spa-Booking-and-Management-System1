import React, { useState, useEffect } from 'react';
import './blogs.css'
import Navbar from './Navbar';

const Blog = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://booking-management-system.onrender.com/api/blogs')
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
      <div className='navbar'>
        <Navbar/>
      </div>
      <div className='container'>
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