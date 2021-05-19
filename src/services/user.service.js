import { Routes } from "../../constants";
import axios from "axios";


const signin = async (authData) => {
  return await axios
  .post(
    Routes.login,
    authData,
    { "Content-Type": "application/json" }
  )
  .then(res => {
    res.data.token = res.headers["authorization"];
    res.data.expiresIn = 3600;
    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000 * 5);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('expirationDate', expirationDate);
    return {
      loading:!res.data,
      data:res.data,
      message:res.message,
      status:res.status
    }
  })
  .catch(err => {
    return {
      loading:!err.response.data,
      data:err.response.data,
      message:err.response.data.message,
      status:err.response.data.status
    }
  })
};
const userSignup = async (email, password,roleId, firstName,middleName, lastName, phone) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("roleId", roleId);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("middleName", middleName);
  formData.append("phone", phone);
  return await axios({
    method: "post",
    url: Routes.register,
    data: formData,
  })
  .then((res) => {
    console.log(res.data)
    return {
      isLoading: !res.data,
      status: res.data.status,
      message: res.data.message,
    };
  })
  .catch((err) => {
    console.log(err.response)
    return {
      isLoading: !err.response,
      status: err.response.data.status,
      message: err.response.data.message,
    };
  });
};

const signup = async (user,uploadImage,uploadDocument,categoryType) => {
  const formData = new FormData();
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("roleId", user.roleId);
  formData.append("title", user.title);
  formData.append("firstName", user.firstName);
  formData.append("lastName", user.lastName);
  formData.append("middleName", user.middleName);
  formData.append("gender", user.gender);
  formData.append("phone", user.phone);
  if (user.name_of_institution) {
    formData.append("business_name", user.name_of_institution);
  }
  if (user.type_of_institution) {
    formData.append("type_of_business", user.type_of_institution);
  }
  // if (user.rc_number) {
  //   formData.append("rc_number", user.rc_number);
  // }
 if (uploadImage) {
  formData.append("profile_picture", uploadImage);
 }
  if (uploadDocument) {
      formData.append("document", uploadDocument);
  }
  if (categoryType) {
    formData.append("categoryType", categoryType);
  }
  return await axios({
    method: "post",
    url: Routes.register,
    data: formData,
  })
  .then((res) => {
    console.log('...pick',res.data)
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

const verifyUserEmail = async (token) => {
  return await axios
    .put(Routes.mailVerification + token, {
      "Content-Type": "application/json",
    })
    .then((res) => {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    })
    .catch((err) => {
      return {
        status: err.response.data.status,
        message: err.response.data.message,
      };
    });
};

const regenerateEmailToken = async (email) => {
  return await axios
    .post(Routes.regenerateEmailToken, { email })
    .then((res) => {
      console.log(res.data)
      return {
        status: res.data.status,
        message: res.data.message,
      };
    })
    .catch((err) => {
      console.log(err.response.data)
      return {
        status: err.response.data.status,
        message: err.response.data.message,
      };
    });
};

const forgotPassword = async (email) => {
  return await axios
    .post(Routes.forgetPassword, { email: email })
    .then((res) => {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    })
    .catch((err) => {
      return {
        status: err.response.data.status,
        message: err.response.data.message,
      };
    });
};

const resetPassword = async (password, token) => {
  return await axios
    .post(Routes.reset_password + token, { password })
    .then((res) => {
      return {
        status: res.data.status,
        message: res.data.message,
      };
    })
    .catch((err) => {
      return {
        status: err.response.data.status,
        message: err.response.data.message,
      };
    });
};

export { 
  signin,
  userSignup,
  signup,
  verifyUserEmail,
  regenerateEmailToken,
 forgotPassword,
 resetPassword
};
