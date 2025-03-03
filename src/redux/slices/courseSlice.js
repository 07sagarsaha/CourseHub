import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  query, 
  where,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../../firebase/config';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const coursesRef = collection(db, 'courses');
      const snapshot = await getDocs(coursesRef);
      
      const courses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return courses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (courseId, { rejectWithValue }) => {
    try {
      const courseRef = doc(db, 'courses', courseId);
      const courseSnap = await getDoc(courseRef);
      
      if (courseSnap.exists()) {
        return {
          id: courseSnap.id,
          ...courseSnap.data()
        };
      } else {
        return rejectWithValue('Course not found');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const enrollInCourse = createAsyncThunk(
  'courses/enrollInCourse',
  async ({ courseId, userId }, { rejectWithValue }) => {
    try {
      // Update course document to add user to studentsEnrolled
      const courseRef = doc(db, 'courses', courseId);
      await updateDoc(courseRef, {
        studentsEnrolled: arrayUnion(userId)
      });
      
      // Update user document to add course to enrolledCourses
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        enrolledCourses: arrayUnion({
          courseId,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          completed: false
        })
      });
      
      return { courseId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEnrolledCourses = createAsyncThunk(
  'courses/fetchEnrolledCourses',
  async (userId, { rejectWithValue }) => {
    try {
      // Get user document to get enrolled courses
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        return rejectWithValue('User not found');
      }
      
      const userData = userSnap.data();
      const enrolledCoursesData = userData.enrolledCourses || [];
      
      // Get full course details for each enrolled course
      const enrolledCourses = await Promise.all(
        enrolledCoursesData.map(async (enrollment) => {
          const courseRef = doc(db, 'courses', enrollment.courseId);
          const courseSnap = await getDoc(courseRef);
          
          if (courseSnap.exists()) {
            return {
              ...courseSnap.data(),
              id: courseSnap.id,
              progress: enrollment.progress,
              enrolledAt: enrollment.enrolledAt,
              completed: enrollment.completed
            };
          }
          return null;
        })
      );
      
      return enrolledCourses.filter(course => course !== null);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCourseProgress = createAsyncThunk(
  'courses/updateCourseProgress',
  async ({ userId, courseId, progress, completed = false }, { rejectWithValue }) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        return rejectWithValue('User not found');
      }
      
      const userData = userSnap.data();
      const enrolledCourses = userData.enrolledCourses || [];
      
      // Find and update the specific course
      const updatedEnrolledCourses = enrolledCourses.map(course => {
        if (course.courseId === courseId) {
          return {
            ...course,
            progress,
            completed
          };
        }
        return course;
      });
      
      // Update the user document
      await updateDoc(userRef, {
        enrolledCourses: updatedEnrolledCourses
      });
      
      return { courseId, progress, completed };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  courses: [],
  currentCourse: null,
  enrolledCourses: [],
  isLoading: false,
  error: null
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    updateCourseLikes: (state, action) => {
      const { courseId, likes } = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === courseId);
      
      if (courseIndex !== -1) {
        state.courses[courseIndex].likes = likes;
      }
      
      if (state.currentCourse && state.currentCourse.id === courseId) {
        state.currentCourse.likes = likes;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Enroll in course
      .addCase(enrollInCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch enrolled courses
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrolledCourses = action.payload;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update course progress
      .addCase(updateCourseProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCourseProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        const { courseId, progress, completed } = action.payload;
        
        state.enrolledCourses = state.enrolledCourses.map(course => {
          if (course.id === courseId) {
            return {
              ...course,
              progress,
              completed
            };
          }
          return course;
        });
      })
      .addCase(updateCourseProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentCourse, updateCourseLikes } = courseSlice.actions;
export default courseSlice.reducer;