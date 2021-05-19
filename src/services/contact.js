import { Routes } from "../../constants";
import axios from "axios";

const createMessage = async (content) => {
    return await axios({
        method: "post",
        url: Routes.create_contact_message,
        data: content,
      })
      .then((res) => {
        return {
          isLoading: !res.data,
          status: res.data.status,
          message: res.data.message,
        };
      })
      .catch((err) => {
        return {
          isLoading: !err.response,
          status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };

  const fetchAllContactMessage = async (token) => {
    return await axios({
      method: "get",
      url: Routes.fetch_all_contact_message,
      headers: {
          'Authorization': `Bearer: ${token}`,
        },
    })
      .then((res) => {
        return {
          isLoading: !res.data,
          data: res.data.data,
          status: res.data.status,
          message: res.data.message,
        };
      })
      .catch((err) => {
        return {
          isLoading: !err.response,
         status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };

  const getSingleContactMessage = async (token,id) => {
    return await axios({
      method: "get",
      url: Routes.get_single_contact_message + id,
      headers: {
          'Authorization': `Bearer: ${token}`,
        },
    })
      .then((res) => {
        return {
          isLoading: !res.data,
          data: res.data.data,
          status: res.data.status,
          message: res.data.message,
        };
      })
      .catch((err) => {
        return {
          isLoading: !err.response,
          status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };
  const fetchAllUnreadMessages = async (token) => {
    return await axios({
      method: "get",
      url: Routes.fetch_all_unread_messages,
      headers: {
          'Authorization': `Bearer: ${token}`,
        },
    })
      .then((res) => {
        return {
          isLoading: !res.data,
          data: res.data.data,
          status: res.data.status,
          message: res.data.message,
        };
      })
      .catch((err) => {
        return {
          isLoading: !err.response,
          status: err.response.data.status,
          data:[],
          message: err.response.data.message,
        };
      });
  };


  export {
    createMessage,
    fetchAllContactMessage,
    getSingleContactMessage,
    fetchAllUnreadMessages ,
  }

