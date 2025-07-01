const formatAmount = (amount) => {
    if (typeof amount !== "number" && typeof amount !== "string") return amount;
    return Number(amount).toLocaleString();
}

export default formatAmount;