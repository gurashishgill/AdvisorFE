import axios from "axios";
import { async } from "q";

// Create new client
const createClient = async (clientData) => {
  const response = await axios.post(
    "https://localhost:7075/api/Users/addClient",
    clientData
  );
  return response.data;
};

// Get clients of advisors
const getClients = async (advisorID) => {
  const response = await axios.get(
    `https://localhost:7075/api/Users/getclients?advisorID=${advisorID}`
  );

  return response.data;
};

// Delete user goal
const deleteClient = async (clientId) => {
  const response = await axios.delete(
    `https://localhost:7075/api/Users/deleteClient?clientId=${clientId}`
  );

  return response.data;
};

// Get client info
const getClientInfo = async (clientId) => {
  const response = await axios.get(
    `https://localhost:7075/api/Users/getClientInfo?clientId=${clientId}`
  );

  return response.data;
};

const clientsService = {
  createClient,
  getClients,
  deleteClient,
  getClientInfo,
};

export default clientsService;
