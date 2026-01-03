import { Spreadsheet } from "zutsheet";

// eslint-disable-next-line
// @ts-ignore
import credentials from "../assets/credentials.local.json";

const spreadsheet = new Spreadsheet(credentials.client_email, credentials.private_key);

export default spreadsheet;
