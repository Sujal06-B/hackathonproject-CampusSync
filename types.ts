export interface User {
  name: string;
  role: 'student' | 'teacher';
  department: string;
  avatar: string;
}

export interface Announcement {
  id: string;
  title: string;
  author: string;
  role: string;
  time: string;
  content: string;
  isPinned?: boolean;
  isUnread?: boolean;
  tag?: string;
  tagColor?: string;
}

export interface Assignment {
  id: string;
  courseCode: string;
  title: string;
  description: string;
  dueDate: string;
  dueTimeText: string;
  progress: number;
  status: 'pending' | 'urgent' | 'completed' | 'not-started';
  isIndividual?: boolean;
}

export interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'pptx' | 'docx' | 'image' | 'zip';
  date: string;
  size: string;
  downloads: number;
}
