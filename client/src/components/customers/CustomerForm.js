import axios from "axios";
import React, { useState } from "react";

export default function CustomerForm() {
  const [customerName, setCustomerName] = useState("");

  async function saveCustomer(e) {
    e.preventDefault();
    try {
      const customerData = { name: customerName };
      await axios.post("http://localhost:4000/customer/", customerData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Add a customer!</h1>
      </div>

      <form
        onSubmit={saveCustomer}
        class="max-w-md mx-auto mt-8 mb-0 space-y-4"
      >
        <div>
          <label for="email" class="sr-only">
            Customer Name
          </label>

          <div class="relative">
            <input
              type="text"
              onChange={(e) => {
                setCustomerName(e.target.value);
              }}
              class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter customer name"
              value={customerName}
            />
          </div>
        </div>

        <div class="flex items-center justify-center">
          <button
            type="submit"
            class="inline-block px-5 py-3 mx-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
