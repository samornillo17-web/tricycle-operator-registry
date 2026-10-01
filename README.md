# Tricycle Operator Registry System

A web-based **Tricycle Operator Registry System** designed to manage and maintain records of registered tricycle units and their corresponding drivers.

The system provides a centralized registry for tricycle information including:

- Body Number
- Driver Name
- Plate Number
- Route
- Status

The application uses a React frontend, an Express/Node.js backend, and MongoDB Atlas as the database.

---

## 1. System Overview

The Tricycle Operator Registry System follows a client-server architecture.

```text
                    TRICYCLE OPERATOR REGISTRY
                              │
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
          React Frontend              Express Backend
             (Vite)                   (Node.js)
                │                           │
                │ Axios                     │
                │ HTTP Requests             │
                └─────────────┬─────────────┘
                              │
                              ▼
                         REST API
                              │
                              ▼
                           Mongoose
                              │
                              ▼
                       MongoDB Atlas
                              │
                              ▼
                  TricycleOperatorRegistry
                              │
                              ▼
                         Tricycle
                         Collection
