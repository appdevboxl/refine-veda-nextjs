export const MEASURING_UNITS = [
  { value: "gram", label: "Gram (g)", group: "weight" },
  { value: "kg", label: "Kilogram (kg)", group: "weight" },

  { value: "ml", label: "Milliliter (ml)", group: "volume" },
  { value: "liter", label: "Liter (L)", group: "volume" },
  { value: "capsules", label: "Capsules", group: "count" },
  { value: "tablets", label: "Tablets", group: "count" },
  { value: "pieces", label: "Pieces", group: "count" },
  { value: "pack", label: "Pack", group: "count" },
] as const;


export type MeasuringUnit = (typeof MEASURING_UNITS)[number];// for unions


export type MeasuringUnitValue = MeasuringUnit["value"]; // unions of values only 

export const MEASURING_UNIT_VALUES = MEASURING_UNITS.map((u) => u.value); // for enums only 
