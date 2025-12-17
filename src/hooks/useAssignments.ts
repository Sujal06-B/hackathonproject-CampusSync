import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Assignment } from '../types';

const ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    courseId: 'cs301',
    courseName: 'CS301',
    title: 'Data Structures Project',
    description: 'Implement a Red-Black tree with insertion and deletion operations.',
    dueDate: { seconds: Date.now() / 1000 + 18000 }, // 5 hours
    status: 'urgent',
    progress: 65,
    isIndividual: true,
    courseCode: 'CS301',
    dueTimeText: 'Due in 5 hours'
  },
  {
    id: '2',
    courseId: 'mat202',
    courseName: 'MAT202',
    title: 'Calculus Quiz Prep',
    description: 'Review Chapter 4 on Derivatives. Complete practice problems.',
    dueDate: { seconds: Date.now() / 1000 + 172800 }, // 2 days
    status: 'pending',
    progress: 10,
    isIndividual: true,
    courseCode: 'MAT202',
    dueTimeText: 'Due in 2 days'
  },
  {
    id: '3',
    courseId: 'eng105',
    courseName: 'ENG105',
    title: 'Modern Lit Essay',
    description: 'Draft a 2000-word essay comparing themes of isolation.',
    dueDate: { seconds: Date.now() / 1000 + 432000 }, // 5 days
    status: 'not-started',
    progress: 0,
    isIndividual: true,
    courseCode: 'ENG105',
    dueTimeText: 'Due in 5 days'
  }
];

export const useAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (db) {
      const q = query(collection(db, 'assignments'), orderBy('dueDate', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            courseCode: d.courseName,
            dueTimeText: d.dueDate?.seconds ? new Date(d.dueDate.seconds * 1000).toLocaleDateString() : 'No date'
          } as Assignment;
        });
        setAssignments(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      const timer = setTimeout(() => {
        setAssignments(ASSIGNMENTS);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return { assignments, loading };
};