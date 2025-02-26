import { useState, useEffect } from "react";

export default function FilterPage() {
  const departments = ["All", "Finance", "IT", "Legal", "Engineering", "Operations", "Compliance", "HR", "Executive"];
  const [activeTab, setActiveTab] = useState("All");
  const [searchName, setSearchName] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function handleFilter() {
    const filter = activeTab === "All" ? "" : activeTab;
    const body = searchName
      ? { name: searchName }
      : { filter };
    
    const res = await fetch("/api/list-v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    setResults(await res.json());
  }

  useEffect(() => {
    handleFilter();
  }, [activeTab, searchName]);
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Pending Tasks List</h1>
        <p className="text-red-500 font-mono text-sm my-2">
              Notice: The v2 is currently being tested and is not yet ready for production use. Please report any issues to the development team.
        </p>
        {/* Tabs for department */}
        <div className="flex space-x-4 mb-4">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveTab(dept)}
              className={`px-4 py-2 font-mono text-sm rounded ${activeTab === dept ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              {dept}
            </button>
          ))}
        </div>
        {/* Search input for employee name */}
        <div className="mb-6">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search employee name"
            className="w-full font-mono text-sm border-2 border-gray-300 p-3 rounded bg-white text-gray-900"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Details</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((user, i) => (
                <tr key={i}>
                  <td className="px-2 py-2 text-sm text-gray-700">{user.employee_name}</td>
                  <td className="px-2 py-2 text-sm text-gray-700">{user.request_detail}</td>
                  <td className="px-2 py-2 text-sm text-gray-700">{user.status}</td>
                  <td className="px-2 py-2 text-sm text-gray-700">{user.department}</td>
                  <td className="px-2 py-2 text-sm text-gray-700">{user.role}</td>
                  <td className="px-2 py-2 text-sm text-gray-700">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {results.length === 0 && (
            <p className="mt-4 text-center text-gray-500">No results to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}
