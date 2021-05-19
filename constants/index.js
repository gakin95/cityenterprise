// const host =
//   process.env.NODE_ENV == "development"
//     ? "http://localhost:5000/api/"
//     : "https://cityevents.ga/api/";
//     // https://cityevents.tk/api/
// const baseUrl =
//   process.env.NODE_ENV == "development"
//     ? "http://localhost:5000/api/"
//     : "https://cityevents.ga/api/";

const host = "http://159.89.89.127/api/";
const baseUrl = "http://159.89.89.127/api/";
const recaptchaKey = "6LdM-dYZAAAAAJ8W7mLb8l-AJ4UGWHjUUQbD1he2"; //shouldn't be here
const recaptchaSecret = "6LcZFewUAAAAAEMwQ7Q4eCOm5L2NyFsG-ij2CR3w"; //this too
const site_key = "6LeT9dYZAAAAAEgB0sMkx_-d07xf3NZ4mpvpI50T";
const my_secret_key = "6LdX7tYZAAAAAM2B26nnpTDUUPNsGh6UctMKdCbm";
const Colors = {
  appBackground: "#FFF5F4",
  appRed: "#FC636B",
  appGreen: "#3BE8B0",
  appOrange: "#FFB900",
  appBlue: "#0E2DD6",
  appBlack: "#707070",
  active: "#349EE8",
  navItems: "#3A3A3A",
};

const Routes = {
  // onBoarding Process
  register: host + "users/register",
  mailVerification: host + "users/verifyEmail/", //token must be appended
  regenerateEmailToken: host + "users/regenerateEmailVerificationToken",
  forgetPassword: host + "users/forgotPassword/",
  reset_password: host + "users/resetPassword/", //token must be appended
  login: host + "users/login",
  newsLetter: host + "users/newsletter_subscription",
  user_home: host + "users/home",
  user_profile: host + "users/profile", //requires token in the header
  newsLetter: host + "newsletter",

  //...........................................................................................//
  //...........................................................................................//
  // vendor services
  // if you see token is required, here is a short note on how ho go about it
  //...........................................................................................//
  //  it uses Authorization as the key and `Bearer: ${token}` as the value
  // headers : {
  //   'Authorization' : `Bearer: ${token}`
  // }
  //...........................................................................................//

  createService: host + "services/create",
  fetch_all_vendor_service_category: host + "services/categories",
  get_all_listed_services_by_vendors: host + "services",
  get_services_by_current_vendor: host + "services/myServices", // id token is required.
  get_all_services_listed_by_vendor: host + "services/myServices", // it requires a token,
  get_single_service_details: host + "services/", //  id must be appended. it also requires a token
  update_service_vendor: host + "services/", // id and token are vrequired
  delete_service_vendor: host + "services/delete/", // id and token are required
  create_discount_token_vendor: host + "discountTokens/services/create",
  list_all_tokens_vendor: host + "discountTokens/services/myTokens",
  update_token_vendor: host + "discountTokens/services/", //id and token
  discount_token_details_vendor: host + "discountTokens/services/", //id and token
  delete_discount_token_vendor: host + "discountTokens/services/", //id and token

  //...........................................................................................//
  //...................EVENTS.......................................................
  //...........................................................................................//

  createEvent: host + "events", //post req
  eventCategories: host + "events/categories",
  type_of_event: host + "events/type/", //free or paid
  sort_event_by_given_date: host + 'events/sortByDate/', //date
  sort_event_by_two_dates: host + 'events/sortByDate', //body --- from,to
  sort_event_by_location: host + 'events/sort/location', //body -- country, state
  get_events_by_category_id: host + "events/categories/", //append category id
  get_all_approved_events: host + "events", //get request
  eventDetails: host + "events/", //append id of event
  get_my_approved_events: host + "events/me/approved", //attach a token to the header
  get_my_disapproved_events: host + "events/me/disapproved", //same condiction
  get_my_saved_events: host + "events/me/unlisted", //same condiction
  get_my_events_awaiting_approval: host + "events/me/pending",
  update_event: host + "events/", //id
  delete_event: host + "events/", //id
  create_discount_token_event: host + "discountTokens/events",
  list_discount_token_event_host: host + "discountTokens/events",
  view_single_token_event: host + "discountTokens/events/coupon/", //append id
  delete_token_event: host + "discountTokens/events/", //id
  update_token_event: host + "discountTokens/events/", //id

  //...........................................................................................//
  //...................ADMIN AND CSO.......................................................
  //...........................................................................................//

  fetch_all_events_admin: host + "events/all", //admin and cso
  fetch_all_undeleted_services: host + "services/all", //admin and cso
  approve_services: host + "services/approve/", //admin and cso. //id
  disapprove_services: host + "services/disapprove/", //admin and cso. //id
  fetch_all_services_awaiting_approval: host + "services/awaitingApproval", //admin and cso.
  today_signups: host + "users/registeredToday",
  all_users: host + "users",
  all_pending_events_admin: host + "events/pending",
  approve_event: host + "events/approve/", //id
  disapprove_event: host + "events/disapprove/", //id
  fetch_users_by_role: host + "users/", //id
  create_admin_and_cso: host + "users/admin/createUser", //admin only
  get_roles: host + "users/roles",
  update_user_role: host + "users/admin/updateUserRole",
  delete_user: host + "users/admin/deleteUser/", //id
  reset_password_admin: host + "users/admin/AdminCSOPasswordReset/", //append token
  get_user_details_Admin: host + "users/admin/viewUser/",
  create_account_discount_coupon: host + "discountTokens/accounts", //post request
  fetch_all_account_discount_coupons: host + "discountTokens/accounts",//get request
  fetch_single_acount_discount_coupon_details: host + "discountTokens/accounts/", //id 
  update_account_discount_coupon: host + "discountTokens/accounts/", //id //put request
  delete_account_discount_coupon: host + "discountTokens/accounts/", //id //delete request

  //...........................................................................................//
  //...................Ticketing.......................................................
  //...........................................................................................//

  buy_ticket: host + "attendees/buyTicket", //requires token
  verify_coupon: host + "discountTokens/events/verify",
  stop_ticket_sale: host + "events/stopTicketSales/", //id put
  resume_ticket_sale: host + "events/resumeTicketSales/", //id put
  get_all_attendees_for_an_event: host + "attendees/", //id
  get_all_tickets_bought_for_an_event: host + "attendees/tickets/", //id
  check_in_customers: host + "attendees/checkIn/", // eventid/ticketid put
  reverse_check_in: host + "attendees/checkOut/", // eventid/ticketid put
  fetch_attendee_ticket_by_reference_num: host + "attendees/ticket", //

  //...........................................................................................//
  //...................CONTACT US.......................................................
  //...........................................................................................//

  create_contact_message: host + "contact",
  fetch_all_contact_message: host + "contact", //requires token on the header
  get_single_contact_message: host + "contact/", //append id
  fetch_all_unread_messages: host + "contact/unread",

  //...........................................................................................//
  //...................NEWS......................................................
  //...........................................................................................//

  //news:'http://newsapi.org/v2/top-headlines?country=ng&category=business&apiKey=b5d53080630142ecac1efef30dcdd16d'
  news:'https://gnews.io/api/v4/search?q=business&token=a5e1fcbabb8c5a63b1f7f0b4ea458f65'
};

const Actions = {
  show: "SHOW",
  hide: "HIDE",
  navigate: "NAVIGATE",
  collapse: "COLLAPSE",
  switchTab: "SWITCHTAB",
};

export { Colors, Actions, Routes, baseUrl, recaptchaKey, site_key };
