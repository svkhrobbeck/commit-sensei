import { generateDeadline } from "@/utils";

import { setDeadline } from ".";

const setNewGeneratedDeadline = async (startCol: string, initialDate: Date = new Date()) => {
  const newDeadline = await generateDeadline(initialDate);
  await setDeadline(startCol, 0, newDeadline);
};

export default setNewGeneratedDeadline;
