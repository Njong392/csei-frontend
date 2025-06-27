const pageConfig = {
  sidebarLinks: [
    {
      icon: "fa-solid fa-house",
      label: "Dashboard",
      route: "/dashboard",
    },
    {
      icon: "fa-solid fa-user",
      label: "Biography",
      route: "/biography",
    },
    {
      icon: "fa-solid fa-bell",
      label: "Announcements",
      route: "/announcements",
    },
    {
      icon: "fa-solid fa-file",
      label: "Credit",
      route: "/credit",
    },
  ],

  sidebarFooterLinks: [
    {
      icon: "fa-solid fa-gear",
      label: "Settings",
      route: "/settings",
    },
    {
      icon: "fa-solid fa-right-from-bracket",
      label: "Logout",
      route: "/logout",
    },
  ],

  rightMenuAccountDetails: [
    {
      icon: "fa-solid fa-link",
      label: "Click to copy referral link",
      class: "text-blue underline",
      data: "https://csei.com/referral?code=cse001",
    },
    {
      icon: "fa-solid fa-envelope",
      label: "Email",
      dataKey: "email",
      fallback: "Not provided"
    },
    {
      icon: "fa-solid fa-phone",
      label: "Phone number",
      dataKey: "first_telephone_line",
      fallback: "Not provided"
    },
    {
      icon: "fa-solid fa-circle-check",
      label: "Account status",
      data: "Active",
      iconStyle: "text-green-800"
    },
  ],

  rightMenuAccountActions: [
    {
      icon: "fa-solid fa-download",
      label: "Download Account statement",
    },
    {
      icon: "fa-solid fa-download",
      label: "Download loan statement",
    },
  ],

  biographyTableViews: [
    {
      icon: "fa-solid fa-list",
      name: "Table",
    },
    {
      icon: "fa-solid fa-grip",
      name: "Tiles",
    },
    {
      icon: "fa-solid fa-grip-vertical",
      name: "Long tiles",
    },
  ],

  loginRequiredFields: ["memberId", "password"],
};

export default pageConfig