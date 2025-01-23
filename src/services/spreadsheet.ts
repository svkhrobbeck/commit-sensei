/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from "googleapis";

import credentials from "../assets/credentials.json";

import { extractErrorMessage, parseWithType } from "../utils";

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const { spreadsheets } = google.sheets({ version: "v4", auth });

class Spreadsheet {
  public async updateSingleCell(
    spreadsheetId: string,
    sheetName: string,
    rowIndex: number,
    colIndex: number,
    value: any
  ): Promise<void> {
    try {
      const cellRange = `${sheetName}!${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
      await spreadsheets.values.update({
        spreadsheetId,
        range: cellRange,
        valueInputOption: "RAW",
        requestBody: { values: [[value]] },
      });
    } catch (error) {
      this.handleError(error, "updateSingleCell", sheetName);
    }
  }

  public async append(spreadsheetId: string, range: string, values: any[][]): Promise<void> {
    try {
      await spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: { values },
      });
    } catch (error) {
      this.handleError(error, "append", range);
    }
  }

  public async clear(spreadsheetId: string, range: string): Promise<void> {
    try {
      await spreadsheets.values.clear({ spreadsheetId, range });
    } catch (error) {
      this.handleError(error, "clear", range);
    }
  }

  public async get(spreadsheetId: string, range: string, withKey = false, checkIdx?: number): Promise<any[][] | any[]> {
    const hasCheckIndex = typeof checkIdx === "number" && checkIdx >= 0;

    if (withKey) {
      const response = await spreadsheets.values.get({ spreadsheetId, range });
      const values = response.data.values || [];

      // const headers = values[0];
      const keys = values[1];
      const dataTypes = values[2];

      const mappedValues = values.slice(3).map(row => {
        const formattedRow: { [key: string]: any } = {};

        for (let i = 0; i < row.length; i++) {
          const key = keys[i];
          const type = dataTypes[i];

          if (!key) {
            throw new Error("invalid key in reading googlesheet fn");
          }

          const value = row[i];

          formattedRow[key] = parseWithType(type, value);
        }

        return formattedRow;
      });

      return hasCheckIndex ? mappedValues.filter(row => row[keys[checkIdx]]) : mappedValues;
    } else {
      try {
        const response = await spreadsheets.values.get({ spreadsheetId, range });

        const values = response.data.values || [];

        const formattedValues: any[][] = values.map(row =>
          row.map((cell: any) => {
            if (cell === "FALSE") return false;
            if (cell === "TRUE") return true;
            if (cell === "") return null;
            return cell;
          })
        );

        return hasCheckIndex ? formattedValues.filter(row => row[checkIdx]) : formattedValues;
      } catch (error) {
        this.handleError(error, "get", range);
        return [];
      }
    }
  }

  public async set(spreadsheetId: string, range: string, values: any[][]): Promise<void> {
    try {
      const rawValues: any[][] = [];
      const formulaValues: any[][] = [];

      values.forEach((row, rowIndex) => {
        rawValues[rowIndex] = [];
        formulaValues[rowIndex] = [];

        row.forEach((value, colIndex) => {
          if (typeof value === "string" && value.startsWith("#FORMULA#")) {
            formulaValues[rowIndex][colIndex] = value.replace("#FORMULA#", "");
            rawValues[rowIndex][colIndex] = null;
          } else {
            rawValues[rowIndex][colIndex] = value;
            formulaValues[rowIndex][colIndex] = null;
          }
        });
      });

      if (rawValues.some(row => row.some(value => value !== null))) {
        await spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: "RAW",
          requestBody: {
            values: rawValues, // formula mavjud bo'lmaganlarni set qiladi,
          },
        });
      }

      // if (formulaValues.some(row => row.some(value => value !== null))) {
      //   await spreadsheets.values.update({
      //     spreadsheetId,
      //     range,
      //     valueInputOption: "USER_ENTERED",
      //     requestBody: {
      //       values: formulaValues,
      //     },
      //   });
      // }
    } catch (error) {
      this.handleError(error, "set", range);
    }
  }

  public async getSheetId(spreadsheetId: string, sheetName: string): Promise<number | null> {
    try {
      const response = await spreadsheets.get({ spreadsheetId });
      const targetSheet = response.data.sheets?.find(sheet => sheet.properties?.title === sheetName);
      return targetSheet?.properties?.sheetId || null;
    } catch (error) {
      this.handleError(error, "getSheetId");
      return null;
    }
  }

  async insertColumns(spreadsheetId: string, sheetName: string, startColumnIndex: number, numberOfColumns: number = 1) {
    const sheetId = await this.getSheetId(spreadsheetId, sheetName);

    if (!sheetId) throw new Error("Sheet not found");

    const request = {
      spreadsheetId,
      resource: {
        requests: [
          {
            insertDimension: {
              range: {
                sheetId,
                dimension: "COLUMNS",
                startIndex: startColumnIndex,
                endIndex: startColumnIndex + numberOfColumns,
              },
              inheritFromBefore: true,
            },
          },
        ],
      },
      auth,
    };

    try {
      const response = await spreadsheets.batchUpdate(request);
      console.log(`${numberOfColumns} column(s) inserted at index ${startColumnIndex}:`, response.data);
      return true;
    } catch (error) {
      this.handleError(error, "insertColumns");
      return false;
    }
  }

  private handleError(error: any, methodName: string, sheetName = ""): void {
    throw new Error(
      `Xatolik ${methodName} metodida yuz berdi${` (sheet-nomi:${sheetName.split("!").at(0)})`}: ${extractErrorMessage(
        error
      )}`
    );
  }
}

export default new Spreadsheet();
