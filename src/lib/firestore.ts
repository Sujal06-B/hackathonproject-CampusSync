import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { User } from "../types";

// User Profile Operations
export const createUserProfile = async (
  uid: string,
  userData: Partial<User>
) => {
  if (!db) {
    console.log("Mock Firestore: Creating user profile", userData);
    return { success: true, mock: true };
  }
  try {
    await setDoc(
      doc(db, "users", uid),
      {
        ...userData,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      },
      { merge: true }
    );
    console.log("User profile created successfully");
    return { success: true };
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (uid: string) => {
  if (!db) {
    // Return mock data for frontend preview
    console.log("Mock Firestore: Returning demo user profile");
    return {
      uid,
      email: "demo@campussync.com",
      role: "student",
      displayName: "Demo Student",
      university: "IIT Bombay",
      department: "Computer Science",
      courses: ["CS301", "CS101"],
      photoURL: "",
      createdAt: new Date(),
      lastLogin: new Date(),
    } as User;
  }
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("User profile retrieved successfully");
      return docSnap.data() as User;
    }
    console.log("User profile not found");
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  uid: string,
  userData: Partial<User>
) => {
  if (!db) {
    console.log("Mock Firestore: Updating user profile", userData);
    return { success: true, mock: true };
  }
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      ...userData,
      lastLogin: serverTimestamp(),
    });
    console.log("User profile updated successfully");
    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Assignment Operations
export const createAssignment = async (assignmentData: any) => {
  if (!db) {
    console.log("Mock Firestore: Creating assignment", assignmentData);
    return { id: "mock-assignment-id", ...assignmentData };
  }
  try {
    const docRef = await addDoc(collection(db, "assignments"), {
      ...assignmentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Assignment created successfully with ID:", docRef.id);
    return { id: docRef.id, ...assignmentData };
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

export const markAssignmentAsComplete = async (
  assignmentId: string,
  userId: string
) => {
  if (!db) {
    console.log("Mock Firestore: Marking assignment complete", {
      assignmentId,
      userId,
    });
    return { success: true, mock: true };
  }
  try {
    const ref = doc(db, "assignments", assignmentId);
    await updateDoc(ref, {
      status: "completed",
      completedBy: userId,
      completedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Assignment marked as complete");
    return { success: true };
  } catch (error) {
    console.error("Error marking assignment complete:", error);
    throw error;
  }
};

export const getAssignmentsByUser = async (userId: string) => {
  if (!db) {
    console.log("Mock Firestore: Returning mock assignments");
    return [
      {
        id: "mock-1",
        title: "Data Structures Project",
        course: "CS301",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "pending",
        description: "Implement a binary search tree",
      },
      {
        id: "mock-2",
        title: "Calculus Problem Set",
        course: "MATH201",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: "pending",
        description: "Complete exercises 1-20",
      },
    ];
  }
  try {
    const q = query(
      collection(db, "assignments"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const assignments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Assignments retrieved:", assignments.length);
    return assignments;
  } catch (error) {
    console.error("Error getting assignments:", error);
    throw error;
  }
};

// Course Operations
export const getCoursesByUser = async (userId: string) => {
  if (!db) {
    console.log("Mock Firestore: Returning mock courses");
    return [
      { id: "CS301", name: "Data Structures", instructor: "Dr. Smith" },
      {
        id: "CS101",
        name: "Introduction to Programming",
        instructor: "Prof. Johnson",
      },
    ];
  }
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const courses = userDoc.data().courses || [];
      console.log("Courses retrieved for user");
      return courses;
    }
    return [];
  } catch (error) {
    console.error("Error getting courses:", error);
    throw error;
  }
};
