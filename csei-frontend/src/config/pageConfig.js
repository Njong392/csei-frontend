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
      action: "logout",
    },
  ],

  rightMenuAccountDetails: [
    {
      icon: "fa-solid fa-link",
      label: "Click to copy referral link",
      class: "text-blue underline",
      data: "http://localhost:5173/prospect?referralId=${memberId}",
    },
    {
      icon: "fa-solid fa-envelope",
      label: "Email",
      dataKey: "email",
      fallback: "Not provided",
    },
    {
      icon: "fa-solid fa-phone",
      label: "Phone number",
      dataKey: "first_telephone_line",
      fallback: "Not provided",
    },
    {
      icon: "fa-solid fa-circle-check",
      label: "Account status",
      data: "Active",
      iconStyle: "text-green-800",
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

  prospectFormFields: [
    {
      label: "Full Name",
      model: "prospectName",
      type: "text",
      placeholder: "Full Name",
      class: "col-span-6 md:col-span-3",
      optional: false,
    },
    {
      label: "Date of Birth",
      model: "dateOfBirth",
      type: "date",
      placeholder: "Date of Birth",
      class: "col-span-6 md:col-span-3",
      optional: false,
    },
    {
      label: "First Address Line",
      model: "firstAddressLine",
      type: "text",
      placeholder: "Address",
      class: "col-span-6 md:col-span-3",
      optional: true,
    },
    {
      label: "Second Address Line",
      model: "secondAddressLine",
      type: "text",
      placeholder: "Address",
      class: "col-span-6 md:col-span-3",
      optional: false,
    },
    {
      label: "Country",
      model: "country",
      type: "text",
      placeholder: "Country",
      class: "col-span-6 md:col-span-3",
      optional: false,
    },
    {
      label: "City",
      model: "city",
      type: "text",
      placeholder: "City",
      class: "col-span-6 md:col-span-3",
      optional: false,
    },

    {
      label: "First Telephone Line",
      model: "firstTelephoneLine",
      type: "tel",
      placeholder: "Phone",
      class: "col-span-6",
      optional: false,
    },
    {
      label: "Second Telephone Line",
      model: "secondTelephoneLine",
      type: "text",
      placeholder: "Address",
      class: "col-span-6 md:col-span-3",
      optional: true,
    },
    {
      label: "Emergency Phone",
      model: "emergencyPhonenumber",
      type: "tel",
      placeholder: "Emergency Phone",
      class: "col-span-6 md:col-span-3",
      optional: false,
    },

    {
      label: "Email",
      model: "email",
      type: "email",
      placeholder: "Email",
      class: "col-span-6 md:col-span-3",
      optional: false,
    },
    {
      label: "Emergency Email",
      model: "emergencyEmail",
      type: "email",
      placeholder: "Emergency Email ",
      class: "col-span-6 md:col-span-3",
      optional: true,
    },
    {
      label: "Emergency Contact",
      model: "emergencyContact",
      type: "text",
      placeholder: "Emergency Contact",
      class: "col-span-6 md:col-span-3",
      optional: false,
    },
    {
      label: "Telegram",
      model: "telegramContact",
      type: "text",
      placeholder: "Telegram",
      class: "col-span-6 md:col-span-3",
      optional: false,
    },
    {
      label: "Monthly Commitment",
      model: "monthlyCommitment",
      type: "select",
      class: "col-span-6",
      optional: false,
      options: [
        { label: "25,000", value: 25000 },
        { label: "50,000", value: 50000 },
        { label: "75,000", value: 75000 },
        { label: "100,000", value: 100000 },
      ],
    },
  ],
};

export default pageConfig