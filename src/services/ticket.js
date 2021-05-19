import { Routes } from "../../constants";
import axios from "axios";

const buyTickets = async (token, content) => {
    return await axios({
        method: "post",
        url: Routes.buy_ticket,
        data: content,
        headers: {
            'Authorization': token,
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
          data:[],
          status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };

  const verifyCoupon  = async (content) => {
    return await axios({
      method: "post",
      url: Routes.verify_coupon,
      data: content,
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
          data:[],
         status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };

  const stopTicketSale = async (token,id) => {
    return await axios({
      method: "put",
      url: Routes.stop_ticket_sale + id,
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
          data:[],
          status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };

  const resumeTicketSale = async (token,id) => {
    return await axios({
      method: "put",
      url: Routes.resume_ticket_sale + id,
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
          data:[],
          status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };

  const getAllAttendees = async (token,id) => {
    return await axios({
      method: "get",
      url: Routes.get_all_attendees_for_an_event + id,
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

  const getAllTicketsBought = async (token,id) => {
    return await axios({
      method: "get",
      url: Routes.get_all_tickets_bought_for_an_event + id,
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

    const checkInCustomer = async (token,eventid,ticketid) => {
    return await axios({
      method: "put",
      url:`${Routes.check_in_customers}${eventid}/${ticketid}`,
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
          data:[],
          status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };

  const reverseCheckInCustomer = async (token,eventid,ticketid) => {
    return await axios({
      method: "put",
      url:`${Routes.reverse_check_in}${eventid}/${ticketid}`,
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
          data:[],
          status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };

  const fetchSingleTicketBought  = async (content) => {
    return await axios({
      method: "post",
      url: Routes.fetch_attendee_ticket_by_reference_num,
      data: content,
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


  export {
    buyTickets,
    verifyCoupon,
    stopTicketSale,
    resumeTicketSale,
    getAllAttendees,
    getAllTicketsBought,
    checkInCustomer,
    reverseCheckInCustomer,
    fetchSingleTicketBought
  }

