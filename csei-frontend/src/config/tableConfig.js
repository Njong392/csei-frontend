const tableConfig = {
  transactionTable: {
    columns: [
      {
        key: "id",
        label: "Id",
        visibility: true,
        type: "text",
      },
      {
        key: "name",
        label: "Name",
        visibility: true,
        type: "text",
      },
      {
        key: "surname",
        label: "Surname",
        visibility: true,
        type: "text",
      },
      {
        key: "email",
        label: "Email",
        visibility: true,
        type: "text",
      },
    ],
  },

  memberTable: {
    columns: [
      {
        key: "id",
        label: "No",
      },
      {
        key: "name",
        label: "Nom",
      },
      {
        key: "telephone",
        label: "No telephone",
      },
      {
        key: "modification",
        label: "Date dern modification",
      },
      {
        key: "solde",
        label: "Solde",
      },
    ],
  },
};

export default tableConfig