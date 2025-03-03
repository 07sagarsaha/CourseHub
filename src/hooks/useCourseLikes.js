import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { updateCourseLikes } from '../redux/slices/courseSlice';

// Custom hook to listen for real-time course likes updates
const useCourseLikes = (courseId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!courseId) return;

    // Set up real-time listener for course likes
    const unsubscribe = onSnapshot(doc(db, 'courses', courseId), (doc) => {
      if (doc.exists()) {
        const courseData = doc.data();
        dispatch(updateCourseLikes({
          courseId,
          likes: courseData.likes || []
        }));
      }
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, [courseId, dispatch]);
};

export default useCourseLikes;