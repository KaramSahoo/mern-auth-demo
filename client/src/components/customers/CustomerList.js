import React from "react";

export default function CustomerList({ customers }) {
  function renderCustomers() {
    return customers.map((customer, i) => {
      return (
        <li key={i}>
          <div
            class="relative block p-8 border border-gray-100 shadow-xl rounded-xl w-96"
            href=""
          >
            <div class="mt-4 text-gray-500 sm:pr-8">
              <h5 class="mt-4 text-xl font-bold text-gray-900">
                {customer.name}
              </h5>
            </div>
          </div>
        </li>
      );
    });
  }
  return (
    <div>
      <ul class="relative block flex-1">{renderCustomers()}</ul>
    </div>
  );
}
