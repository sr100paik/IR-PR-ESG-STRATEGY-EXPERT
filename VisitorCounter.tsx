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

    const incrementCounts = async () => {
      // Use sessionStorage to prevent multiple increments in the same session
      if (sessionStorage.getItem('visited')) return;

      try {
        // Handle Global Count
        const globalSnap = await getDoc(globalDocRef);
        if (!globalSnap.exists()) {
          // System initialized with 2300 + first current visit
          await setDoc(globalDocRef, { total: 2301 });
        } else {
          await updateDoc(globalDocRef, { total: increment(1) });
        }

        // Handle Daily Count
        const dailySnap = await getDoc(dailyDocRef);
        if (!dailySnap.exists()) {
          await setDoc(dailyDocRef, { count: 1 });
        } else {
          await updateDoc(dailyDocRef, { count: increment(1) });
        }

        sessionStorage.setItem('visited', 'true');
      } catch (error) {
        console.error("VisitorCounter update error:", error);
      }
    };

    incrementCounts();

    // Stats listeners
    const unsubGlobal = onSnapshot(globalDocRef, (snap) => {
      if (snap.exists()) {
        setTotal(snap.data().total);
      }
    });

    const unsubDaily = onSnapshot(dailyDocRef, (snap) => {
      if (snap.exists()) {
        setDaily(snap.data().count);
      } else {
        // If it doesn't exist yet but incrementCounts was called, 
        // it will be created shortly. We'll show 1 temporarily if we know we just visited
        // but for now 0 is technically correct until the doc is created.
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

  // Only show if we have data to avoid jumping "0/0"
  if (total === null) return null;

  return (
    <div className="text-[10px] text-slate-500 font-mono flex items-center space-x-1 opacity-70" title="Today / Total Visitors (since 2026-01-01)">
      <span className="font-medium text-slate-400">{formatNumber(daily)}회</span>
      <span className="text-slate-700">/</span>
      <span>{formatNumber(total)}회</span>
    </div>
  );
};

export default VisitorCounter;
