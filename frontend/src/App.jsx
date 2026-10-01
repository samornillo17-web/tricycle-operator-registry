import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/tricycles";

function App() {
  const [tricycles, setTricycles] = useState([]);

  const [form, setForm] = useState({
    body_number: "",
    driver_name: "",
    plate_number: "",
    route: "",
    status: "Active"
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get all tricycles
  const fetchTricycles = async () => {
    try {
      const response = await axios.get(API_URL);
      setTricycles(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the backend server.");
    }
  };

  // Load records when page opens
  useEffect(() => {
    fetchTricycles();
  }, []);

  // Handle form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  // Clear form
  const clearForm = () => {
    setForm({
      body_number: "",
      driver_name: "",
      plate_number: "",
      route: "",
      status: "Active"
    });

    setEditingId(null);
    setMessage("");
    setError("");
  };

  // Add or update
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !form.body_number ||
      !form.driver_name ||
      !form.plate_number ||
      !form.route ||
      !form.status
    ) {
      setError("Please complete all fields.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/${editingId}`,
          form
        );

        setMessage("Tricycle updated successfully.");
      } else {
        await axios.post(API_URL, form);

        setMessage("Tricycle registered successfully.");
      }

      clearForm();
      fetchTricycles();

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "An error occurred."
      );
    }
  };

  // Edit
  const handleEdit = (tricycle) => {
    setEditingId(tricycle.id);

    setForm({
      body_number: tricycle.body_number,
      driver_name: tricycle.driver_name,
      plate_number: tricycle.plate_number,
      route: tricycle.route,
      status: tricycle.status
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tricycle?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);

      setMessage("Tricycle deleted successfully.");

      fetchTricycles();

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to delete tricycle."
      );
    }
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div>
          <p className="system-label">
            TRANSPORT MANAGEMENT SYSTEM
          </p>

          <h1>
            Tricycle Operator Registry
          </h1>

          <p className="subtitle">
            Manage registered tricycle units and operators
          </p>
        </div>

        <div className="header-badge">
          🛺
          <br />
          TRICYCLE
          <br />
          REGISTRY
        </div>

      </header>


      {/* MAIN */}
      <main className="container">

        {/* REGISTRATION FORM */}
        <section className="card">

          <div className="section-title">

            <h2>
              {editingId
                ? "Edit Tricycle Unit"
                : "Register Tricycle Unit"}
            </h2>

            <p>
              Enter the complete information below.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* BODY NUMBER */}
              <div className="form-group">

                <label>
                  Body Number
                </label>

                <input
                  type="text"
                  name="body_number"
                  placeholder="Example: TN-001"
                  value={form.body_number}
                  onChange={handleChange}
                />

              </div>


              {/* DRIVER NAME */}
              <div className="form-group">

                <label>
                  Driver Name
                </label>

                <input
                  type="text"
                  name="driver_name"
                  placeholder="Example: Juan Dela Cruz"
                  value={form.driver_name}
                  onChange={handleChange}
                />

              </div>


              {/* PLATE NUMBER */}
              <div className="form-group">

                <label>
                  Plate Number
                </label>

                <input
                  type="text"
                  name="plate_number"
                  placeholder="Example: ABC-1234"
                  value={form.plate_number}
                  onChange={handleChange}
                />

              </div>


              {/* ROUTE */}
              <div className="form-group">

                <label>
                  Route
                </label>

                <input
                  type="text"
                  name="route"
                  placeholder="Example: Bayan - Terminal"
                  value={form.route}
                  onChange={handleChange}
                />

              </div>


              {/* STATUS */}
              <div className="form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                  <option value="Suspended">
                    Suspended
                  </option>

                </select>

              </div>

            </div>


            {/* BUTTONS */}
            <div className="form-buttons">

              <button
                type="submit"
                className="primary-button"
              >
                {editingId
                  ? "Update Unit"
                  : "Register Unit"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={clearForm}
              >
                Clear
              </button>

            </div>

          </form>


          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="success-message">
              ✓ {message}
            </div>
          )}


          {/* ERROR MESSAGE */}
          {error && (
            <div className="error-message">
              ⚠ {error}
            </div>
          )}

        </section>


        {/* TABLE */}
        <section className="card">

          <div className="table-header">

            <div>

              <h2>
                Registered Tricycle Units
              </h2>

              <p>
                {tricycles.length} registered unit(s)
              </p>

            </div>

          </div>


          {tricycles.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                🛺
              </div>

              <h3>
                No registered tricycles
              </h3>

              <p>
                Add a tricycle unit using the form above.
              </p>

            </div>

          ) : (

            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>
                    <th>Body Number</th>
                    <th>Driver Name</th>
                    <th>Plate Number</th>
                    <th>Route</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>


                <tbody>

                  {tricycles.map((tricycle) => (

                    <tr key={tricycle.id}>

                      <td>
                        <strong>
                          {tricycle.body_number}
                        </strong>
                      </td>

                      <td>
                        {tricycle.driver_name}
                      </td>

                      <td>
                        {tricycle.plate_number}
                      </td>

                      <td>
                        {tricycle.route}
                      </td>

                      <td>

                        <span
                          className={
                            `status ${
                              tricycle.status
                                .toLowerCase()
                                .replace(" ", "-")
                            }`
                          }
                        >
                          {tricycle.status}
                        </span>

                      </td>

                      <td>

                        <div className="actions">

                          <button
                            className="edit-button"
                            onClick={() =>
                              handleEdit(tricycle)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(tricycle.id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>


      {/* FOOTER */}
      <footer>
        Tricycle Operator Registry
        {" • "}
        CRUD Management System
      </footer>

    </div>
  );
}

export default App;   