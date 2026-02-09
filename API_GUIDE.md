# Frontend API Integration Guide

This document outlines how the frontend application connects to the backend API, including configuration, authentication, and troubleshooting strategies.

## 1. Architecture Overview

The frontend communicates with the backend via RESTful APIs. There are two distinct service layers:
- **Site API**: Handles public-facing data (e.g., fetching content for the main website).
- **Admin API**: Handles protected administrative operations (e.g., dashboard data, updates).

## 2. Configuration

### Environment Variables
The connection to the backend is controlled by the `NEXT_PUBLIC_API_URL` environment variable.

- **Local Development**: Typically `http://localhost:5000` (or your local backend port).
- **Production**: The URL of the deployed backend (e.g., `https://gafbackend.vercel.app`).

**Important**: This variable must be prefixed with `NEXT_PUBLIC_` to be exposed to the browser.

### API Services
API logic is centralized in two service classes:
- `src/app/services/site-api.js`: Public endpoints.
- `src/app/admin/services/admin-api.js`: Admin endpoints with authentication.

Both services automatically log their configuration to the browser console on initialization to help with debugging.

## 3. Authentication

### Public Endpoints (`SiteApiService`)
- No authentication headers are required.
- Requests are made directly to the configured `API_BASE_URL`.

### Admin Endpoints (`AdminApiService`)
- Require a **Bearer Token** for authentication.
- The token is retrieved from `localStorage` (key: `adminToken`).
- **Header**: `Authorization: Bearer <token>`
- If the token is missing, the service may fail or return an unauthorized error.

## 4. Connectivity & CORS

### Cross-Origin Resource Sharing (CORS)
Since the frontend and backend are hosted on different domains (or ports), the backend **MUST** be configured to allow requests from the frontend origin.

- **Common Error**: `Failed to fetch` often indicates a CORS issue.
- **Fix**: Ensure the backend's allowed origins include the frontend's domain (e.g., `https://your-frontend.vercel.app`).

### Vercel Rewrites (Proxying)
The `vercel.json` file contains a rewrite configuration to proxy requests matching `/api/:path*` to the backend. This can help bypass CORS issues in some configurations, but direct usage of `NEXT_PUBLIC_API_URL` is preferred for clarity and performance if CORS is correctly set up.

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://gafbackend.vercel.app/api/:path*"
    }
  ]
}
```

## 5. Error Handling & Debugging

### Standardized Error Responses
Both API services normalize errors into a consistent format:
```javascript
{
  success: false,
  message: "User-friendly error message",
  error: "Technical error details (optional)",
  status: 404 // HTTP status code
}
```

### Debugging Tools
1. **Browser Console**:
   - Check for `[SiteApi]` or `[AdminApi]` logs.
   - Look for "Config" logs to verify `API_BASE_URL` is correct.
   - Warnings like `CORS Hint` provide immediate troubleshooting advice.

2. **Debug Page**:
   - Navigate to `/debug` (e.g., `https://your-site.com/debug`) to test connectivity in the live environment.
   - This page shows the loaded environment variables and allows testing a connection to the backend.

### Troubleshooting Checklist
- [ ] Is `NEXT_PUBLIC_API_URL` set correctly in Vercel/Environment?
- [ ] Does the backend allow the frontend domain in CORS settings?
- [ ] Is the backend running and healthy? (Test via `/debug` page)
- [ ] (Admin) Is the `adminToken` present in LocalStorage?
