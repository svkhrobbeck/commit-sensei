export const developerChadIds: number[] = String(process.env.CHAT_IDS).split("/").map(Number);

export const weekDays: { [key: number]: string } = {
  0: "Yakshanba",
  1: "Dushanba",
  2: "Seshanba",
  3: "Chorshanba",
  4: "Payshanba",
  5: "Juma",
  6: "Shanba",
};
