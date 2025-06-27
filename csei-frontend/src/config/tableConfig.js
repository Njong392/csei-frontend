const tableConfig = {
  transactionTable: {
    columns: [
      {
        key: "description",
        label: "Description",
        visibility: true,
      },
      {
        key: "DocNo",
        label: "Document Number",
        visibility: true,
      },
      {
        key: "externalDocNo",
        label: "External Document Number",
        visibility: true,
      },
      {
        key: "openAmnt",
        label: "Open Amount",
        visibility: true,
      },
      {
        key: "originalAmnt",
        label: "Original Amount",
        visibility: true,
      },
      {
        key: "postingDate",
        label: "Posting Date",
        visibility: true,
      },
      {
        key: "memberName",
        label: "Name",
        visibility: true,
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