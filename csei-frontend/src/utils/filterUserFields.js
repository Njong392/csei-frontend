const filterUserFields = (user) => {
    const {
        city,
        country,
        email,
        emergency_contact,
        emergency_email,
        first_telephone_line,
        first_address_line,
        member_id,
        member_name,
        role,
        balance
    } = user || {}

    return {
      city,
      country,
      email,
      emergency_contact,
      emergency_email,
      first_telephone_line,
      first_address_line,
      member_id,
      member_name,
      role,
      balance
    }; 
}

export default filterUserFields;