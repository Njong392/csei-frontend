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
        key: "memberId",
        label: "Member ID",
        visibility: true,
      },
      {
        key: "memberName",
        label: "Member Name",
        visibility: true,
      },
      {
        key: "firstTelephoneLine",
        label: "Telephone",
        visibility: true,
      },
      {
        key: "accountBalance",
        label: "Account Balance",
      }
    ],
  },
};

export default tableConfig