import React, { useState } from "react";
import { PaystackButton } from 'react-paystack'
import styles from "./payment.module.css";

const Payment = ({}) => {
  const publicKey = "pk_test_c3e2cb5a767ae87838804c0f318d5908caf9f224";
  const amount = 500000; // Remember, set in kobo!
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (res) =>
      console.log("res",res),
    onClose: () => alert("Wait! Don't leave :("),
  }
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.overlayEffect}></div>
          <img
            className={styles.itemImage}
            src="https://cdn.bcdtravel.com/move-uk/wp-content/uploads/sites/210/credit-card-debit-card.jpg"
            alt="product"
          />
          <div className={styles.itemDetails}>
            <p className={styles.itemDetailsTitle}>Service Charge</p>
            <p className={styles.itemDetailsAmount}>NGN{amount / 100}</p>
          </div>
        </div>
        <div className={styles.checkout}>
          <div className={styles.checkoutForm}>
            <div className={styles.checkoutField}>
              <label className={styles.checkoutFieldLabel}>Name</label>
              <input
              className={styles.checkoutFieldInput}
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.checkoutField}>
              <label className={styles.checkoutFieldLabel}>Email</label>
              <input
              className={styles.checkoutFieldInput}
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.checkoutField}>
              <label className={styles.checkoutFieldLabel}>Phone</label>
              <input
              className={styles.checkoutFieldInput}
                type="text"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <PaystackButton className={styles.paystackButton} {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
