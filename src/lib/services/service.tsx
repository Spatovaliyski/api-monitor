import { API_ROOT } from "../config/config";
import { httpClient } from "./client";

/**
 * Main service for the application.
 * 
 * @returns {Object} The service object.
 * @since 1.0.0
 * 
 * @example
 * import service from "lib/services/service";
 * 
 * service.getItems();
 */
const service = {
  getItems: function () {
    return httpClient.get(`${API_ROOT}`)
  }
};

export default service;