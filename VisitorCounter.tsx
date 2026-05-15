import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';

const VisitorCounter: React.FC = () => {
  const [total, setTotal] = useState<number | null>(null);
  const [daily, setDaily] = useState<number | null>(null);

  const getLocalDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const today = getLocalDate();
    const globalDocRef = doc(db, 'siteStats', 'visitors');
    const dailyDocRef = doc(db, 'siteStats', 'visitors', 'dailyStats', today);

    // Initial check and increment
    const incrementCounts = async () => {
      const isFirstVisitSession = !sessionStorage.getItem('visited');
      
      if (isFirstVisitSession) {
        try {
          const globalSnap = await getDoc(globalDocRef);
          
          if (!globalSnap.exists()) {
            // First time ever - set initial values from request (2300)
            await setDoc(globalDocRef, { total: 2301 });
          } else {
            await updateDoc(globalDocRef, { total: increment(1) });
          }

          const dailySnap = await getDoc(dailyDocRef);
          if (!dailySnap.exists()) {
            await setDoc(dailyDocRef, { count: 1 });
          } else {
            await updateDoc(dailyDocRef, { count: increment(1) });
          }

          sessionStorage.setItem('visited', 'true');
        } catch (error) {
          console.error("Error updating visitor counts:", error);
        }
      }
    };

    incrementCounts();

    // Stats listeners for real-time updates (or just initial load)
    const unsubGlobal = onSnapshot(globalDocRef, (snap) => {
      if (snap.exists()) {
        setTotal(snap.data().total);
      }
    });

    const unsubDaily = onSnapshot(dailyDocRef, (snap) => {
      if (snap.exists()) {
        setDaily(snap.data().count);
      } else {
        setDaily(0);
      }
    });

    return () => {
      unsubGlobal();
      unsubDaily();
    };
  }, []);

  const formatNumber = (num: number | null) => {
    if (num === null) return '...';
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  return (
    <div className="text-[10px] text-slate-500 font-mono flex items-center space-x-1 opacity-70">
      <span>{formatNumber(daily)}회</span>
      <span> / </span>
      <span>{formatNumber(total)}회</span>
    </div>
  );
};

export default VisitorCounter;
