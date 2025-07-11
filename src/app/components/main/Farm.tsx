"use client";
import { useState, useContext } from "react";
import { BalanceContext } from "../contexts/BalanceContext";
import styles from "./Farm.module.css";

export default function Farm() {
  const [seeds, setSeeds] = useState(Array(16).fill(""));
  const { spendCoins, earnCoins } = useContext(BalanceContext);

  function toggleSeed(index: number) {
    setSeeds((prevSeeds) => {
      const newSeeds = [...prevSeeds];
      const current = newSeeds[index];

      // Boş kutuya tıklanırsa → Tohum ek
      if (current === "") {
        const spent = spendCoins(10);
        if (!spent) return prevSeeds;

        newSeeds[index] = "T";

        setTimeout(() => {
          setSeeds((latestSeeds) => {
            const updated = [...latestSeeds];
            if (updated[index] === "T") {
              updated[index] = "F";
            }
            return updated;
          });
        }, 2000);

        setTimeout(() => {
          setSeeds((latestSeeds) => {
            const updated = [...latestSeeds];
            if (updated[index] === "F") {
              updated[index] = "K";
            }
            return updated;
          });
        }, 4000);
        setTimeout(() => {
          setSeeds((latestSeeds) => {
            const updated = [...latestSeeds];
            if (updated[index] === "K") {
              updated[index] = "Ç";
            }
            return updated;
          });
        }, 6000);
      }
      else if (["F", "K", "Ç"].includes(current)) {
        if (current === "K") {
          earnCoins(20);
        }
        newSeeds[index] = "";
      }

      return newSeeds;
    });
  }

  return (
    <div className={styles.farm}>
      {seeds.map((value, i) => (
        <div
          key={i}
          className={styles.box}
          onClick={() => toggleSeed(i)}
          title={
            value === ""
              ? "Boş"
              : value === "T"
              ? "Tohum"
              : value === "F"
              ? "Fidan"
              : value === "K"
              ? "Ağaç (K)"
              : "Ağaç (Ç)"
          }
        >
          {value && <span className={styles.seedLetter}>{value}</span>}
        </div>
      ))}
    </div>
  );
}
