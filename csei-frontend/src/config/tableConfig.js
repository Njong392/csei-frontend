const tableConfig = {
  transactionTable: {
    columns: [
      {
        key: "Description",
        label: "Description",
        visibility: true,
      },
      {
        key: "Document No_",
        label: "Document Number",
        visibility: true,
      },
      {
        key: "Open Amount",
        label: "Open Amount",
        visibility: true,
      },
      {
        key: "Posting Date",
        label: "Posting Date",
        visibility: true,
      },
    ],
  },

  memberTable: {
    columns: [
      {
        key: "memberName",
        label: "Member Name",
        visibility: true,
      },
      {
        key: "memberId",
        label: "Member ID",
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

const loanTableConfig = {
  adminLoanApplications: {
    columns: [
      { key: "loan_application_id", label: "Application ID" },
      { key: "applicant_name", label: "Applicant" },
      { key: "amount", label: "Amount" },
      { key: "duration", label: "Duration" },
      { key: "status", label: "Status" },
      { key: "submitted_at", label: "Submitted" },
      { key: "reviewed_at", label: "Reviewed" },
      { key: "actions", label: "Actions" },
    ],

    statusOptions: [
      { value: "all", label: "All Status" },
      { value: "pending", label: "Pending" },
      { value: "under_review", label: "Under Review" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
      { value: "requires_more_info", label: "Requires More Info" },
    ],
  },

  memberLoanApplications: {
    columns: [
      { key: "loan_application_id", label: "Application ID" },
      { key: "amount", label: "Amount" },
      { key: "duration", label: "Duration" },
      { key: "status", label: "Status" },
      { key: "submitted_at", label: "Submitted" },
      { key: "actions", label: "Actions" },
    ],
  },
};

export default tableConfig