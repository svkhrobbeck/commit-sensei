import dedent from "dedent";

import { getDeadline } from "../sheets";
import { getAllRepoCommitCounts } from "../github";
import { formatDate, notifyDevelopers } from "../../utils";

const afternoonReminder = async () => {
  const todayCommitCounts = await getAllRepoCommitCounts();
  const deadline = await getDeadline();

  const todayDate = formatDate(Date.now(), "DD-MM-YYYY");
  const todayTask = deadline.find(item => item.date === todayDate);

  if (todayTask) {
    if (todayCommitCounts < todayTask.total) {
      const stockCommit = todayTask.total - todayCommitCounts;

      const message = dedent`
      #afternoon_reminder
      
      Bugun ${todayCommitCounts} ta commit yozdingiz, kun oxirigacha yana ${stockCommit} ta commit yozishingiz kerak. Agarda limitni bajarmasangiz jarima yoziladi!!`;

      await notifyDevelopers(message, false);
    } else {
      await notifyDevelopers(
        dedent`
        #afternoon_reminder
        
        Bugun ${todayCommitCounts} ta commit yozdingiz, kunlik limit allaqachon bajarilgan, tabriklaymiz!`,
        false
      );
    }
  }
};
export default afternoonReminder;
