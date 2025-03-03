import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById, enrollInCourse, clearCurrentCourse } from '../redux/slices/courseSlice';
import { Clock, Users, Calendar, MapPin, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import Loader from '../components/Loader';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentCourse, isLoading, error } = useSelector(state => state.courses);
  const { user } = useSelector(state => state.auth);
  const [expandedWeeks, setExpandedWeeks] = useState({});

  useEffect(() => {
    dispatch(fetchCourseById(courseId));
    
    return () => {
      dispatch(clearCurrentCourse());
    };
  }, [dispatch, courseId]);

  const toggleWeek = (weekNum) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNum]: !prev[weekNum]
    }));
  };

  const handleEnroll = () => {
    if (!user) {
      navigate('/login', { state: { from: `/course/${courseId}` } });
      return;
    }
    
    dispatch(enrollInCourse({ courseId, userId: user.uid }))
      .unwrap()
      .then(() => {
        navigate('/dashboard');
      });
  };

  const isEnrolled = currentCourse?.studentsEnrolled?.includes(user?.uid);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading course: {error}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  if (!currentCourse) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          {currentCourse.thumbnail && (
            <img 
              src={currentCourse.thumbnail} 
              alt={currentCourse.name} 
              className="w-full h-full object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center px-4">
              {currentCourse.name}
            </h1>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start mb-6">
            <div>
              <p className="text-xl text-gray-600 mb-2">Instructor: <span className="font-semibold">{currentCourse.instructor}</span></p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{currentCourse.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{currentCourse.schedule}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{currentCourse.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{currentCourse.studentsEnrolled?.length || 0} students enrolled</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${currentCourse.enrollmentStatus === 'Open' ? 'bg-green-100 text-green-800' : 
                  currentCourse.enrollmentStatus === 'Closed' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}
              >
                {currentCourse.enrollmentStatus}
              </span>
              
              {currentCourse.enrollmentStatus === 'Open' && !isEnrolled && (
                <button
                  onClick={handleEnroll}
                  className="mt-3 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enroll Now
                </button>
              )}
              
              {isEnrolled && (
                <div className="mt-3 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-green-50 text-green-700">
                  Already Enrolled
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
            <p className="text-gray-700 mb-6">{currentCourse.description}</p>
            
            {currentCourse.prerequisites && currentCourse.prerequisites.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Prerequisites</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {currentCourse.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="mb-1">{prerequisite}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {currentCourse.syllabus && currentCourse.syllabus.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Course Syllabus</h3>
                <div className="border rounded-lg overflow-hidden">
                  {currentCourse.syllabus.map((week, index) => (
                    <div key={index} className="border-b last:border-b-0">
                      <button
                        onClick={() => toggleWeek(week.week)}
                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                      >
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
                          <span className="font-medium">Week {week.week}: {week.topic}</span>
                        </div>
                        {expandedWeeks[week.week] ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      
                      {expandedWeeks[week.week] && (
                        <div className="px-4 py-3 bg-gray-50 border-t">
                          <p className="text-gray-700">{week.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;