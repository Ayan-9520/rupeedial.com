import { autoLoanBlogs } from "./autoLoanBlogs";
import { personalLoanBlogs } from "./personalLoanBlogs";
import { msmeLoanBlogs } from "./msmeLoanBlogs";
import { homeLoanBlogs } from "./homeLoanBlogs";
import { educationLoanBlogs } from "./educationLoanBlogs";
import { machineryLoanBlogs } from "./machineryLoanBlogs";
import { creditCardBlogs } from "./creditCardBlogs";
import { insuranceBlogs } from "./insuranceBlogs";
import { lapLoanBlogs } from "./lapLoanBlogs";

export const blogs = [
  ...autoLoanBlogs,
  ...personalLoanBlogs,
  ...msmeLoanBlogs,
  ...homeLoanBlogs,
  ...educationLoanBlogs,
  ...machineryLoanBlogs,
  ...creditCardBlogs,
  ...insuranceBlogs,
  ...lapLoanBlogs,
];
