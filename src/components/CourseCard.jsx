import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Heart } from 'lucide-react';
import { doc, updateDoc, onSnapshot, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSelector } from 'react-redux';

const CourseCard = ({ course }) => {
  const { user } = useSelector(state => state.auth);
  const [likes, setLikes] = useState(course.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    // Check if user has liked this course
    setIsLiked(course.likes?.includes(user.uid) || false);
    
    // Set up real-time listener for likes
    const unsubscribe = onSnapshot(doc(db, 'courses', course.id), (doc) => {
      if (doc.exists()) {
        const courseData = doc.data();
        setLikes(courseData.likes?.length || 0);
        setIsLiked(courseData.likes?.includes(user.uid) || false);
      }
    });
    
    return () => unsubscribe();
  }, [course.id, user]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    const courseRef = doc(db, 'courses', course.id);
    
    try {
      if (isLiked) {
        await updateDoc(courseRef, {
          likes: arrayRemove(user.uid)
        });
      } else {
        await updateDoc(courseRef, {
          likes: arrayUnion(user.uid)
        });
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/course/${course.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="h-48 overflow-hidden">
          <img 
            src={course.thumbnail || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'} 
            alt={course.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h3>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(course.enrollmentStatus)}`}>
              {course.enrollmentStatus}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">By {course.instructor}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
            <Users className="h-4 w-4 ml-3 mr-1" />
            <span>{course.studentsEnrolled?.length || 0} enrolled</span>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={handleLike}
              className={`flex items-center text-sm ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            
            <span className="text-sm font-medium text-indigo-600">View Details →</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;