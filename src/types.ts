export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'student' | 'teacher';
  department?: string;
  university?: string;
  courses?: string[]; // Array of course IDs
  avatar?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  courseId: string;
  courseName: string; // Denormalized for display
  department: string;
  authorId: string;
  authorName: string;
  role: string; // e.g. "Admin", "Prof. Smith"
  isPinned: boolean;
  priority: 'normal' | 'urgent';
  createdAt: any; // Firestore Timestamp
  readBy?: string[];
  
  // UI Helper properties (mapped from data)
  time?: string;
  isUnread?: boolean;
  tag?: string;
  tagColor?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string; // e.g. "CS301"
  dueDate: any; // Firestore Timestamp
  status: 'pending' | 'urgent' | 'completed' | 'not-started';
  progress: number;
  isIndividual?: boolean;
  
  // UI Helpers
  dueTimeText?: string;
  courseCode?: string; // Mapped from courseName
}

export interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'pptx' | 'docx' | 'image' | 'zip';
  size: string;
  downloads: number;
  date?: string; // UI Helper
  url?: string;
}