import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrolledCourses } from '../redux/slices/courseSlice';
import EnrolledCourseCard from '../components/EnrolledCourseCard';
import Loader from '../components/Loader';
import { GraduationCap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { enrolledCourses, isLoading } = useSelector(state => state.courses);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchEnrolledCourses(user.uid));
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <Loader />;
  }

  const completedCourses = enrolledCourses.filter(course => course.completed);
  const inProgressCourses = enrolledCourses.filter(course => !course.completed);
  const averageProgress = inProgressCourses.length > 0
    ? Math.round(inProgressCourses.reduce((sum, course) => sum + course.progress, 0) / inProgressCourses.length)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-semibold text-gray-900">{enrolledCourses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{completedCourses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Average Progress</p>
            <div className="flex items-center">
              <div className="flex-1 mr-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${averageProgress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-900">{averageProgress}%</p>
            </div>
          </div>
        </div>
      </div>
      
      {enrolledCourses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <BookOpen className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h2>
          <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <>
          {inProgressCourses.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">In Progress</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map(course => (
                  <EnrolledCourseCard key={course.id} course={course} userId={user.uid} />
                ))}
              </div>
            </div>
          )}
          
          {completedCourses.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.map(course => (
                  <EnrolledCourseCard key={course.id} course={course} userId={user.uid} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPage;