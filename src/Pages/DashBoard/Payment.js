import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import Loading from "../../LoginSignup/Loading/Loading";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51L3CyrDWtkJH8iSZofaV3dJnvEz6q8gLDUpERbTpyahobDSRRX5c7yi3jO45BS8rJNqWJnTu7SE1uzCxjGdGvPap00gwT42Hsc"
);

const Payment = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/mybooking/${id}`;

  const { data: order, isLoading } = useQuery(["booking", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  // console.log(order, "payment");
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <p className="text-success font-bold">Hello, {order?.userName}</p>
          <h2 className="card-title">Please Pay for: {order?.name}</h2>
          <h2 className="card-title">Please Pay for: {order.price}</h2>

          <p>Please pay for this service:</p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm order={order}></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
