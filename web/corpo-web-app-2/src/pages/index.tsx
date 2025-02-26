import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  
  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  
  const pendingRequests = users;

  return (
    <div style={{ backgroundColor: "#000", color: "#0F0", fontFamily: "'Courier New', monospace", padding: "20px" }}>
      <h1 style={{ borderBottom: "1px solid #0F0", paddingBottom: "10px" }}>Pending Requests</h1>
      {pendingRequests.length === 0 ? (
        <p>No pending requests to display.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #0F0", padding: "8px" }}>Employee Name</th>
              <th style={{ border: "1px solid #0F0", padding: "8px" }}>Request Details</th>
              <th style={{ border: "1px solid #0F0", padding: "8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((user, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #0F0", padding: "8px" }}>{user.employee_name}</td>
                <td style={{ border: "1px solid #0F0", padding: "8px" }}>{user.request_detail}</td>
                <td style={{ border: "1px solid #0F0", padding: "8px" }}>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ marginTop: "15px", fontSize: "0.9em", color: "#0F0" }}>
      </p>
    </div>
  );
}
