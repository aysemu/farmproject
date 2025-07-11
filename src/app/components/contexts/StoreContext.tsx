'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import styles from './Store.module.css';
type Flower = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

type StoreContextType = {
  flowers: Flower[];
  increaseStock: (id: string) => void;
  decreaseStock: (id: string) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialFlowers: Flower[] = [
  { id: 'papatya', name: 'Papatya', price: 10, stock: 0 },
  { id: 'cicek', name: 'Çiçek', price: 20, stock: 0 },
];

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [flowers, setFlowers] = useState<Flower[]>(initialFlowers);

  const increaseStock = (id: string) => {
    setFlowers((prev) =>
      prev.map((f) => (f.id === id ? { ...f, stock: f.stock + 1 } : f))
    );
  };

  const decreaseStock = (id: string) => {
    setFlowers((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, stock: Math.max(0, f.stock - 1) } : f
      )
    );
  };

  return (
    <StoreContext.Provider value={{ flowers, increaseStock, decreaseStock }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};


const Store = () => {
  const { flowers, increaseStock, decreaseStock } = useStore();

  return (
    <div className={styles.container}>
      {flowers.map(({ id, name, price, stock }) => (
        <div key={id} className={styles.card}>
          <h3>{name}</h3>
          <p>Fiyat: {price}₺</p>
          <div className={styles.controls}>
            <button onClick={() => decreaseStock(id)}>-</button>
            <span>Adet: {stock}</span>
            <button onClick={() => increaseStock(id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};


const StorePage = () => {
  return (
    <StoreProvider>
      <Store />
    </StoreProvider>
  );
};

export default StorePage;
