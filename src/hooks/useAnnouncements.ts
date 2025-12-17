import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Announcement } from '../types';

const DUMMY_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Mid-Semester Exam Schedule Released',
    content: 'The final schedule for the upcoming mid-semester exams has been published. Please check your dates carefully. Any conflicts must be reported to the academic office by Friday.',
    courseId: 'admin',
    courseName: 'Admin',
    department: 'CS',
    authorId: 'admin',
    authorName: 'Admin',
    role: 'Admin',
    isPinned: true,
    priority: 'urgent',
    createdAt: new Date(),
    time: '2 hours ago',
    tag: 'Admin',
    tagColor: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300',
    isUnread: true
  },
  {
    id: '2',
    title: 'Lecture Notes Updated: Module 4',
    content: 'Professor Smith has uploaded the revised slides for Module 4: Advanced Algorithms. This includes the new examples discussed in class.',
    courseId: 'cs101',
    courseName: 'CS101',
    department: 'CS',
    authorId: 'prof1',
    authorName: 'Prof. Smith',
    role: 'Teacher',
    isPinned: false,
    priority: 'normal',
    createdAt: new Date(),
    time: '4 hours ago',
    tag: 'CS101',
    tagColor: 'bg-blue-900/30 text-blue-300',
    isUnread: true
  },
  {
    id: '3',
    title: 'Guest Lecture on AI Ethics',
    content: 'Join us for a special session with Dr. Aruna Rao from TechInstitute this Friday at 4 PM in the main auditorium.',
    courseId: 'council',
    courseName: 'Council',
    department: 'All',
    authorId: 'council',
    authorName: 'Student Council',
    role: 'Council',
    isPinned: false,
    priority: 'normal',
    createdAt: new Date(),
    time: 'Yesterday',
    tag: 'Council',
    tagColor: 'bg-purple-900/30 text-purple-300',
    isUnread: false
  }
];

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (db) {
      const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            time: d.createdAt?.toDate ? d.createdAt.toDate().toLocaleDateString() : 'Just now',
            tag: d.courseName || d.role,
            tagColor: d.priority === 'urgent' ? 'bg-red-900/30 text-red-300' : 'bg-blue-900/30 text-blue-300'
          } as Announcement;
        });
        setAnnouncements(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Fallback to dummy data
      const timer = setTimeout(() => {
        setAnnouncements(DUMMY_ANNOUNCEMENTS);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return { announcements, loading };
};