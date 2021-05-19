import { Routes } from "../../constants";
import axios from "axios";

const eventPhoto = async (token, image) => {
  const formData = new FormData();
  formData.append("event_banner", image);
  return await axios({
      method: "post",
      url: Routes.createEvent,
      data: formData,
      headers: {
        'Authorization': `Bearer: ${token}`,
      },
    })
    .then((res) => {
      return {
        isLoading: !res.data,
        id:res.data.data.id,
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

 const eventServices = async (token, content) => {
  return await axios({
      method: "put",
      url: Routes.createEvent,
      data: content,
      headers: {
        "Content-Type":  "application/json",
        'Authorization': `Bearer: ${token}`,
      },
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


const getAllEventsCategories = async () => {
  return await axios({
    method: "get",
    url: Routes.eventCategories,
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

const getEventByCategoryId = async (id) => {
  return await axios({
    method: "get",
    url: Routes.get_events_by_category_id + id,
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

const getEventByType = async (type) => {
  return await axios({
    method: "get",
    url: Routes.type_of_event + type,
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

const getEventByDate = async (date) => {
  return await axios({
    method: "get",
    url: Routes.sort_event_by_given_date + date,
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

const getEventByTwoDate = async (content) => {
  return await axios({
    method: "post",
    url: Routes.sort_event_by_two_dates ,
    data:content
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

const getEventByLocation = async (content) => {
  return await axios({
    method: "post",
    url: Routes.sort_event_by_location,
    data:content
  })
    .then((res) => {
      console.log('res',content)
      return {
        isLoading: !res.data,
        data: res.data.data,
        status: res.data.status,
        message: res.data.message,
      };
    })
    .catch((err) => {
      console.log('err',content)
      return {
        isLoading: !err.response,
        data:[],
        status: err.response.data.status,
        message: err.response.data.message,
      };
    });
};

const getAllServicesListedByVendor = async (token) => {
  return await axios({
    method: "get",
    url: Routes.get_all_services_listed_by_vendors,
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

const getAllApprovedEvents = async () => {

  return await axios({
    method: "get",
    url: Routes.get_all_approved_events,
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
      console.log('errrrr',err.response)
      return {
        isLoading: !err.response,
        status: err.response.data.status,
        data:[],
        message: err.response.data.message,
      };
    });
};

const getEventDetails = async (id) => {
  return await axios({
    method: "get",
    url: Routes.eventDetails + id,
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

const getMyApprovedEvents = async (token) => {
  return await axios({
    method: "get",
    url: Routes.get_my_approved_events,
    headers : {
      'Authorization' : `Bearer: ${token}`
    }
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

const getMyDisApprovedEvents = async (token) => {
  return await axios({
    method: "get",
    url: Routes.get_my_disapproved_events,
    headers : {
      'Authorization' : `Bearer: ${token}`
    }
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
        data:[]
      };
    });
};

const getMySavedEvents = async (token) => {
  return await axios({
    method: "get",
    url: Routes.get_my_saved_events,
    headers : {
      'Authorization' : `Bearer: ${token}`
    }
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
        data:[]
      };
    });
};

const getPendingEvents = async (token) => {
  return await axios({
    method: "get",
    url: Routes.get_my_events_awaiting_approval,
    headers : {
      'Authorization' : `Bearer: ${token}`
    }
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
        data:[]
      };
    });
};

const updateEvent = async (token, content, id) => {
  return await axios({
    method: "put",
    data: content,
    url: Routes.update_event + id,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
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

const deleteEvent = async (token, id) => {
  return await axios({
    method: "delete",
    url: Routes. delete_event + id,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
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

const createDiscountToken = async (token, createtoken) => {
  return await axios({
    method: "post",
    url: Routes.create_discount_token_event,
    data: createtoken,
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

const ListDiscountToken = async (token) => {
  return await axios({
    method: "get",
    url: Routes.list_discount_token_event_host,
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

const updateToken = async (token, id, body) => {
  return await axios({
    method: "put",
    url: Routes.update_token_event + id,
    data: body,
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

const discountTokenDetails = async (token, id) => {
  return await axios({
    method: "get",
    url: Routes.view_single_token_event + id,
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

const deleteDiscountToken = async (token, id) => {
  return await axios({
    method: "delete",
    url: Routes.delete_token_event + id,
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


export {
  eventPhoto,
  eventServices,
  getAllEventsCategories,
  getEventByCategoryId,
  getEventByType,
  getEventByDate,
  getEventByTwoDate,
  getEventByLocation,
  getAllServicesListedByVendor,
  getAllApprovedEvents,
  getEventDetails,
  getMyApprovedEvents,
  getMyDisApprovedEvents,
  getMySavedEvents,
  getPendingEvents,
  updateEvent,
  deleteEvent,
  createDiscountToken,
  ListDiscountToken,
  updateToken,
  discountTokenDetails,
  deleteDiscountToken 
}
