import axios from "axios";

// const url = "http://localhost:5000";
const url = "https://civiceyeserver.onrender.com"

export const registration = async (data) => {
  try {
    const response = await axios.post(`${url}/auth/registration`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${url}/auth/login`, formData);
    return response;
  } catch (error) {
    return error;
  }
};

export const viewAllUser = async () => {
  try {
    const response = await axios.get(`${url}/auth/viewAllUser`);

    return response;
  } catch (error) {
    return error;
  }
};

export const viewUser = async (id) => {
  try {
    const response = await axios.get(`${url}/auth/viewUser/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};


export const updateUser = async (id,userData) => {
  try {
    const response = await axios.put(`${url}/auth/updateUser/${id}`, userData);
    return response;
  } catch (error) {
    return error;
  }
};
export const complaintRegister = async (data) => {
  try {
    const response = await axios.post(`${url}/complaint/complaintRegister`,data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const viewAllComplaints = async () => {
  try {
    const response = await axios.get(`${url}/complaint/viewAllComplaints`);

    return response;
  } catch (error) {
    return error;
  }
};

export const viewUserComplaint = async (id) => {
  try {
    const response = await axios.get(`${url}/Complaint/viewUserComplaint/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateComplaintStatus = async (id,status) => {
  try {
    const response = await axios.put(`${url}/Complaint/updateComplaintStatus/${id}`,{ status });
    return response;
  } catch (error) {
    return error;
  }
};

export const viewComplaintsByUser = async (id) => {
  try {
    const response = await axios.get(`${url}/Complaint/viewComplaintsByUser/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const reviewSubmission = async (data) => {
  try {
    const response = await axios.post(`${url}/review/reviewSubmission`, data);
    return response;
  } catch (error) {
    return error;
  }
};



export const viewAllReview = async () => {
  try {
    const response = await axios.get(`${url}/review/viewAllReview`);

    return response;
  } catch (error) {
    return error;
  }
};

export const updateReviewStatus = async (id,status) => {
  try {
    const response = await axios.put(`${url}/review/updateReviewStatus/${id}`,{ status });
    return response;
  } catch (error) {
    return error;
  }
};