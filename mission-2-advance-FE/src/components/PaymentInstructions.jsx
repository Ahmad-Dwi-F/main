import { useState } from "react";
import "./PaymentInstructions.css";

function PaymentInstructions({ groups }) {
  const [openGroups, setOpenGroups] = useState([]);

  const toggleGroup = (groupId) => {
    setOpenGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((g) => g !== groupId)
        : [...prev, groupId],
    );
  };

  return (
    <section className="metode-section">
      <h2 className="metode-section-title">Tata Cara Pembayaran</h2>
      {groups.map((group) => (
        <div className="instruction-group" key={group.id}>
          <button
            type="button"
            className="instruction-title"
            onClick={() => toggleGroup(group.id)}>
            {group.title}
            <span
              className={`instruction-chevron ${openGroups.includes(group.id) ? "open" : ""}`}>
              ⌄
            </span>
          </button>
          <div
            className={`instruction-steps ${openGroups.includes(group.id) ? "open" : ""}`}>
            <ol>
              {group.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </section>
  );
}

export default PaymentInstructions;
