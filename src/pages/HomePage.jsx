import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../redux/slices/courseSlice";
import CourseList from "../components/CourseList";
import { BookOpen } from "lucide-react";
import seedCourses from "../utils/seedData";

const HomePage = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => state.courses);
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleSeedData = async () => {
    try {
      setSeeding(true);
      await seedCourses();
      setSeedSuccess(true);
      // Refresh courses after seeding
      dispatch(fetchCourses());
    } catch (error) {
      console.error("Error seeding data:", error);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          <span className="block">Discover Your Next Skill</span>
          <span className="block text-indigo-600">Learn with CourseHub</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Browse our collection of high-quality courses taught by industry
          experts.
        </p>
      </div>

      <div className="mb-12 bg-indigo-50 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Why Choose CourseHub?
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span>Expert instructors with real-world experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span>Flexible learning schedule to fit your lifestyle</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span>Comprehensive curriculum with hands-on projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span>Community support and networking opportunities</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <BookOpen className="h-32 w-32 text-indigo-500" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Available Courses
      </h2>
      <CourseList courses={courses} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
