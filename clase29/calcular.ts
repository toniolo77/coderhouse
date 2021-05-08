import express from "express";
import { exit } from "process";

const calcular = (cant) => {
  const MIN = 1;
  const MAX = 100;
  const result = [];
  for (let i = 0; i < cant; i++) {
    const random_num = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
    if (result[random_num]) {
      result[random_num] = result[random_num] + 1;
    } else {
      result[random_num] = 1;
    }
  }
  const mapValues = [];
  result.forEach((value, index) => {
    if (value) return mapValues.push({ numero: index, repeticiones: value });
  });

  return mapValues;
};

process.on("message", (cant) => {
  const numbers = calcular(cant);
  process.send(numbers);
  exit(1);
});
