import { Routes } from "../../constants";
import axios from "axios";


const AllEvents = async (token) => {
  return await axios({
    method: "get",
    url: Routes.fetch_all_events_admin,
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

const AllServices = async (token) => {
    return await axios({
      method: "get",
      url: Routes.fetch_all_undeleted_services,
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

  const ApproveService = async (token,id) => {
    return await axios({
      method: "put",
      url: Routes.approve_services + id,
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

  const DisApproveService = async (token,id,reason_for_disapproval) => {
    return await axios({
      method: "put",
      data:{reason_for_disapproval},
      url: Routes.disapprove_services + id,
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

  const pendingServices = async (token) => {
    return await axios({
      method: "get",
      url: Routes.fetch_all_services_awaiting_approval,
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
 
  const pendingEvents = async (token) => {
    return await axios({
      method: "get",
      url: Routes.all_pending_events_admin,
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

  const ApproveEvent = async (token,id) => {
    return await axios({
      method: "put",
      url: Routes.approve_event + id,
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

  const DisApproveEvent = async (token,id,reason_for_disapproval) => {
    console.log('reason for dis',reason_for_disapproval)
    return await axios({
      method: "put",
      data:{reason_for_disapproval},
      url: Routes.disapprove_event + id,
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

  const allUsers = async (token) => {
    return await axios({
      method: "get",
      url: Routes.all_users,
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
  
  const fetchRoles = async (token) => {
    return await axios({
      method: "get",
      url: Routes.get_roles,
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
          data: []
        };
      });
  };

  const fetchUserByRole = async (token,role_id) => {
    return await axios({
      method: "get",
      url: Routes.fetch_users_by_role + role_id,
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

  const getUserDetailsAdmin = async (token,id) => {
    return await axios({
      method: "get",
      url: Routes.get_user_details_Admin + id,
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
          data:[]
        };
      });
  };

  const createAdminsAndCso = async (token, user,roleId,image) => {
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("roleId", roleId);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("middleName", user.middleName);
    formData.append("phone", user.phone);
    formData.append("profile_picture", image);
    return await axios({
        method: "post",
        url: Routes.create_admin_and_cso,
        data:formData,
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

  const updateUserRole = async (token, body) => {
    return await axios({
        method: "put",
        url: Routes.update_user_role,
        data: body,
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

  const deleteUser = async (token, id) => {
    return await axios({
      method: "delete",
      url: Routes.delete_user + id,
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

  const resetPassword = async (token, password) => {
    return await axios({
      method: "put",
      url: reset_password_admin + token,
      data:password,
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

  const todaysSignups = async (token) => {
    return await axios({
      method: "get",
      url: Routes.today_signups,
      headers: {
          'Authorization': `Bearer: ${token}`,
        },
    })
      .then((res) => {
        return {
          isLoading: !res.data.status,
          data: res.data.data,
          status: res.data.status,
          message: res.data.message,
        };
      })
      .catch((err) => {
        return {
          isLoading: !err.response.status,
          status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };
  
  const createAccountDiscountCoupon = async (token, createtoken) => {
    return await axios({
      method: "post",
      url: Routes.create_account_discount_coupon,
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
          status: err.response.data.status,
          message: err.response.data.message,
        };
      });
  };

  const fetchAllAccountDiscountCoupons = async (token) => {
    return await axios({
      method: "get",
      url: Routes.fetch_all_account_discount_coupons,
      headers: {
          'Authorization': `Bearer: ${token}`,
        },
    })
      .then((res) => {
        return {
          isLoading: !res.data.status,
          data: res.data.data,
          status: res.data.status,
          message: res.data.message,
        };
      })
      .catch((err) => {
        return {
          isLoading: !err.response.status,
          status: err.response.data.status,
          message: err.response.data.message,
          data:[]
        };
      });
  };


  const fetchSingleAcountDiscountCouponDetails = async (token, id) => {
    return await axios({
      method: "get",
      url: Routes.fetch_single_acount_discount_coupon_details + id,
      headers: {
          'Authorization': `Bearer: ${token}`,
        },
    })
      .then((res) => {
        return {
          isLoading: !res.data.status,
          data: res.data.data,
          status: res.data.status,
          message: res.data.message,
        };
      })
      .catch((err) => {
        return {
          isLoading: !err.response.status,
          status: err.response.data.status,
          data:[],
          message: err.response.data.message,
        };
      });
  };

  const updateAccountDiscountCoupon = async (token, id, content) => {
    return await axios({
      method: "put",
      url: Routes.update_account_discount_coupon + id,
      data:content,
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


  const deleteAccountDiscountCoupon = async (token, id) => {
    return await axios({
      method: "delete",
      url: Routes.delete_account_discount_coupon + id,
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

export {
    AllEvents,
    AllServices,
    ApproveService,
    DisApproveService,
    pendingServices,
    pendingEvents,
    ApproveEvent,
    DisApproveEvent,
    allUsers,
    fetchUserByRole,
    createAdminsAndCso,
    fetchRoles,
    updateUserRole,
    deleteUser,
    resetPassword,
    todaysSignups,
    getUserDetailsAdmin, //for admin to get user details
    createAccountDiscountCoupon,
    fetchAllAccountDiscountCoupons,
    fetchSingleAcountDiscountCouponDetails,
    updateAccountDiscountCoupon,
    deleteAccountDiscountCoupon,
}
