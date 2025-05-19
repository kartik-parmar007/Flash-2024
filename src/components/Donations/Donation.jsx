import { useState } from "react";
import jsPDF from "jspdf";
import styles from "../Donations/styles.module.css";

const EcommerceDownload = () => {
  const [formVisible, setFormVisible] = useState(true);
  const [qrVisible, setQrVisible] = useState(false);
  const [upiLink, setUpiLink] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    amount: "",
    transactionId: "",
  });

  const generateQR = () => {
    if (
      !formData.name ||
      !formData.number ||
      !formData.email ||
      !formData.amount
    ) {
      alert("Please fill out all fields.");
      return;
    }

    setFormVisible(false);
    setQrVisible(true);
    const link = `upi://pay?pa=kartikparmar9773@oksbi&pn=${encodeURIComponent(
      formData.name
    )}&am=${formData.amount}&cu=INR&tn=${encodeURIComponent(formData.number)}`;
    const upi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      link
    )}`;
    setUpiLink(upi);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadNow = () => {
    if (!formData.transactionId) {
      alert("Please enter your UTR/REFERENCE/TRANSACTION ID.");
      return;
    }

    const doc = new jsPDF();

    // Calculate the width of the title and position it in the center
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = "Receipt For Donating in NPS";
    const textWidth =
      (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const xPosition = (pageWidth - textWidth) / 2;

    doc.text(title, xPosition, 20); // Title centered

    // Add other receipt details below the title
    doc.text(`Name: ${formData.name}`, 20, 40);
    doc.text(`Whatsapp Number: ${formData.number}`, 20, 50);
    doc.text(`Email: ${formData.email}`, 20, 60);
    doc.text(`Amount Paid: INR ${formData.amount}`, 20, 70);
    doc.text(`Transaction ID: ${formData.transactionId}`, 20, 80);

    // Save the PDF
    doc.save("receipt.pdf");
  };

  return (
    <section className={styles.container}>
      <h1>DONATION SYSTEM</h1>
      {formVisible && (
        <div className={styles.form}>
          <div className={`${styles.flex} ${styles.m20}`}>
            <label>Full Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`${styles.m10}`}
            />
          </div>
          <div className={`${styles.flex} ${styles.m20}`}>
            <label>Whatsapp Number (With ISD)*</label>
            <input
              type="text"
              name="number"
              placeholder="Ex- +919064973840"
              value={formData.number}
              onChange={handleInputChange}
              className={`${styles.m10}`}
            />
          </div>
          <div className={`${styles.flex} ${styles.m20}`}>
            <label>Email*</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.m10}`}
            />
          </div>
          <div className={`${styles.flex} ${styles.m20}`}>
            <label>Amount (INR)*</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleInputChange}
              className={`${styles.m10}`}
            />
          </div>
          <div className={`${styles.flex} ${styles.m20}`}>
            <button onClick={generateQR} className={styles.generate_qr}>
              NEXT
            </button>
          </div>
        </div>
      )}
      {qrVisible && (
        <div className={`${styles.qr_code} ${styles.m20}`}>
          <p>
            Scan the QR Code with any UPI App and pay the amount then download
            the source code.
          </p>
          <center>
            <img
              src={upiLink}
              alt="QR CODE"
              className={`${styles.get_qr} ${styles.m10}`}
            />
          </center>
          <center>
            <img src="/1.png" className={`${styles.im} ${styles.m10}`} />
          </center>
          <div className={`${styles.flex} ${styles.m20}`}>
            <label>TRANSACTION ID**</label>
            <input
              type="text"
              name="transactionId"
              placeholder="TRANSACTION ID**"
              value={formData.transactionId}
              onChange={handleInputChange}
              className={`${styles.m10}`}
            />
          </div>
          <button
            onClick={downloadNow}
            className={`${styles.download_now} ${styles.m20}`}
          >
            Download Now
          </button>
        </div>
      )}
    </section>
  );
};

export default EcommerceDownload;
