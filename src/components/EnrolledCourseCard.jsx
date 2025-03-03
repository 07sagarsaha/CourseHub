import React from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateCourseProgress } from "../redux/slices/courseSlice";

const EnrolledCourseCard = ({ course, userId }) => {
  const dispatch = useDispatch();
  const enrolledDate = new Date(course.enrolledAt).toLocaleDateString();

  const handleMarkComplete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      updateCourseProgress({
        userId,
        courseId: course.id,
        progress: 100,
        completed: true,
      })
    );
  };

  const handleUpdateProgress = (e, newProgress) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      updateCourseProgress({
        userId,
        courseId: course.id,
        progress: newProgress,
        completed: newProgress === 100,
      })
    );
  };

  return (
    <Link to={`/course/${course.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="h-40 overflow-hidden">
          <img
            src={
              course.thumbnail ||
              "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            }
            alt={course.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {course.name}
            </h3>
            {course.completed && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                Completed
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-2">By {course.instructor}</p>

          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Clock className="h-4 w-4 mr-1" />
            <span>Enrolled on {enrolledDate}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              Due Date:{" "}
              {new Date(
                new Date(course.enrolledAt).setDate(
                  new Date(course.enrolledAt).getDate() + 90
                )
              ).toLocaleDateString()}
            </span>
          </div>
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {course.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {!course.completed ? (
              <div className="flex space-x-2">
                <button
                  onClick={(e) =>
                    handleUpdateProgress(e, Math.min(course.progress + 25, 100))
                  }
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded hover:bg-indigo-200"
                >
                  Update Progress
                </button>
                <button
                  onClick={handleMarkComplete}
                  className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded hover:bg-green-200 flex items-center"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Mark Complete
                </button>
              </div>
            ) : (
              <span className="text-green-600 text-sm font-medium flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EnrolledCourseCard;
