import { Routes } from "../../constants";
import axios from "axios";

 const createServices = async (token, category,description,experience_level, photo,price) => {
  const formData = new FormData();
  formData.append("vendorServiceCategoryId", category);
  formData.append("description", description);
  formData.append("experience_level", experience_level);
  formData.append("banner_image", photo);
  formData.append("price", price);
  return await axios({
      method: "post",
      url: Routes.createService,
      data: formData,
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

const getAllServiceCategories = async (token) => {
  return await axios({
    method: "get",
    url: Routes.fetch_all_vendor_service_category,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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

 const getServicesByCurrentVendor = async (token) => {

  return await axios({
    method: "get",
    url: Routes.get_services_by_current_vendor,
    headers : {
      'Authorization' : `Bearer: ${token}`
    }
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
        status: res.data.status
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

const getAllServicesListedByVendors = async (token) => {
  return await axios({
    method: "get",
    url: Routes.get_all_listed_services_by_vendors,
    headers : {
      'Authorization' : `Bearer: ${token}`
    }
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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

 const getAllServicesListedByVendor = async (token) => {
  return await axios({
    method: "get",
    url: Routes.get_all_services_listed_by_vendor,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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

const getSingleServiceDetails = async (token, id) => {
  return await axios({
    method: "get",
    url: Routes.get_single_service_details + id,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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

const updateService = async (token, id, category,description,experience_level, price,photo) => {
  const formData = new FormData();
  formData.append("category", category);
  formData.append("description", description);
  formData.append("experience_level", experience_level);
  formData.append("banner_image", photo);
  formData.append("price", price);
  return await axios({
    method: "put",
    data: formData,
    url: Routes.update_service_vendor + id,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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

const deleteService = async (token, id) => {
  return await axios({
    method: "delete",
    url: Routes.delete_service_vendor + id,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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

const createDiscountToken = async (token) => {
  return await axios({
    method: "post",
    url: Routes.create_discount_token_vendor,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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

const ListDiscountToken = async (token) => {
  return await axios({
    method: "get",
    url: Routes.list_all_tokens_vendor,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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

const updateToken = async (token, id) => {
  return await axios({
    method: "put",
    url: Routes.update_service_vendor + id,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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

const discountTokenDetails = async (token, id) => {
  return await axios({
    method: "get",
    url: Routes.discount_token_details_vendor + id,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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

const deleteDiscountToken = async (token, id) => {
  return await axios({
    method: "delete",
    url: Routes.delete_discount_token_vendor + id,
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
  })
    .then((res) => {
      return {
        isLoading: !res.data,
        data: res.data.data,
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
  createServices,
  getAllServiceCategories,
  getAllServicesListedByVendors,
  getServicesByCurrentVendor,
  getAllServicesListedByVendor,
  getSingleServiceDetails,
  updateService,
  deleteService,
  createDiscountToken,
  ListDiscountToken,
  updateToken,
  discountTokenDetails,
  deleteDiscountToken
}
