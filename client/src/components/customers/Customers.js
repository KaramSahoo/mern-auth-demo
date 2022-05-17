import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  async function getData() {
    const customerData = await axios.get("http://localhost:4000/customer");
    setCustomers(customerData.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <CustomerForm />
      <CustomerList customers={customers} />
    </div>
  );
};

export default Customers;
