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
        role
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
    }; 
}

export default filterUserFields;