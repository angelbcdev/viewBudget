import axios from "axios";
import { config } from "../config/config";

const readData = {
  getAllData: config.serverUrl
    ? config.serverUrl + "/api/getData"
    : window.location.origin + "/api/getData",

  saveData: config.serverUrl
    ? config.serverUrl + "/api/saveData"
    : window.location.origin + "/api/saveData",
};

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
