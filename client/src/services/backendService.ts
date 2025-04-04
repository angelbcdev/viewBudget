import axios from "axios";
import { config } from "../config/config";

const readData = {
  getAllData: config.serverUrl + "/api/getData",
  saveData: config.serverUrl + "/api/saveData",
};

console.log("readData", config);

export class BackendService {
  private static instance: BackendService;

  private constructor() {}

  public static getInstance() {
    if (!BackendService.instance) {
      BackendService.instance = new BackendService();
    }
    return BackendService.instance;
  }

  async getAllData() {
    const response = await axios.get(readData.getAllData);
    return response.data;
  }

  async saveData(data: any) {
    const response = await axios.post(readData.saveData, data);
    return response.data;
  }
}
