import { Spreadsheet } from "zutsheet";
import credentials from "../assets/credentials.json";

const spreadsheet = new Spreadsheet(credentials.client_email, credentials.private_key);

export default spreadsheet;
