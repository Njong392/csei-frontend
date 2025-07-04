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
      },
    ],
  },

  prospectApplications: {
    columns: [
      { key: "prospect_name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "first_telephone_line", label: "Phone" },
      { key: "monthly_commitment", label: "Monthly Commitment" },
      { key: "prospect_status", label: "Status" },
      { key: "created_at", label: "Applied Date" },
      { key: "actions", label: "Actions" },
    ],

    statusOptions: [
      { value: "all", label: "All Status" },
      { value: "pending", label: "Pending" },
      { value: "in-review", label: "In Review" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
    ],
  },
};

export default tableConfig