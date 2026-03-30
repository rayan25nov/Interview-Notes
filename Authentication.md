# Authentication Concepts Every Developer Should Know

Building secure systems is a core responsibility in full stack development, and distinguishing between authentication methods, token formats, and authorization frameworks is crucial to getting it right. Below is a comprehensive breakdown of the major authentication concepts.

## 1. Authentication vs. Authorization [00:01:30]
* **Authentication** answers **"Who is the user?"** It verifies the identity of the requestor (a user or a third-party service) before granting access to the system. [00:01:39]
* **Authorization** answers **"What can the user do?"** This happens *after* a user's identity is confirmed and determines their specific permissions and resource access. [00:02:25]

## 2. Basic & Digest Authentication [00:03:03]
* **Basic Authentication:** The simplest form where the client sends a Base64 encoded username and password in the `Authorization` header. [00:03:34]
    * *Drawback:* Base64 is easily reversible and highly insecure unless wrapped in HTTPS. It is rarely used in modern production environments outside of internal tools. [00:04:00]
* **Digest Authentication:** A slightly better alternative that uses MD5 hashing instead of plain text or Base64. [00:04:33]
    * *Drawback:* While more secure than Basic Auth, it is still considered outdated and rarely used today. [00:05:14]

## 3. API Key Authentication [00:06:16]
* A unique string (key) is generated for a client and sent with each request, typically via an `X-API-Key` or `Authorization` header. [00:06:31]
* The server looks up the key in a database to verify identity and permissions. [00:07:07]
* *Drawbacks:* API keys are just random strings without embedded information (unlike JWTs). If a key leaks, anyone can use it, and they usually lack built-in expiration mechanisms. [00:07:45]

## 4. Session-Based Authentication [00:08:23]
* The traditional web approach where a user logs in, and the server creates a session stored on the backend (e.g., in memory, Redis, or a database). [00:08:31]
* The server returns a session ID stored as a cookie on the client. Subsequent requests include this cookie, allowing the server to look up the session. [00:09:13]
* *Drawback:* It is **stateful**. The server must actively remember sessions, which is harder to scale for distributed architectures and APIs compared to stateless approaches. [00:09:47]

## 5. Token-Based Authentication (Bearer, JWT, Access/Refresh Tokens) [00:10:02]
* **Bearer Authentication:** A pattern meaning "whoever bears this token gets access." It is not a token format itself. [00:10:36]
* **JSON Web Tokens (JWT):** The most common Bearer token format. It is a signed, stateless JSON object containing claims (like user ID, roles, and expiration time). [00:10:52]
    * Because the server can verify the signature locally, JWTs remove the need for constant database lookups, making them highly scalable. [00:11:15]
* **Access vs. Refresh Tokens:** [00:12:56]
    * **Access Tokens:** Short-lived (e.g., 15 mins to 1 hour) used for API calls. [00:13:10]
    * **Refresh Tokens:** Long-lived (days or weeks) used to silently get a new access token when the current one expires. They should be stored securely, such as in HTTP-only cookies, to prevent XSS attacks. [00:13:48]

## 6. OAuth 2.0 & OpenID Connect (OIDC) [00:14:27]
* **OAuth 2.0:** An **authorization framework**, *not* an authentication method. It delegates access, allowing an application to access resources on behalf of a user (e.g., an app asking to read your Google Drive). It issues an *Access Token* proving permission, but it doesn't strictly verify the user's identity to the client app. [00:14:36]
* **OpenID Connect (OIDC):** Adds an authentication layer on top of OAuth 2.0. [00:16:15]
    * When a user signs in (e.g., "Sign in with Google"), OIDC returns both an Access Token (for authorization) and an **ID Token** (a JWT containing the user's identity). [00:16:47]

## 7. Single Sign-On (SSO) & Identity Protocols [00:17:44]
* **SSO:** A user experience pattern, not a standalone authentication method. It allows a user to log in once to an Identity Provider (IdP) and access multiple independent services (e.g., Gmail, YouTube, Google Drive) without re-authenticating. [00:17:53]
* **Identity Protocols powering SSO:**
    * **SAML (Security Assertion Markup Language):** An older, XML-based protocol common in enterprise and legacy systems (e.g., Salesforce, corporate dashboards). [00:19:21]
    * **OpenID Connect (OIDC):** A modern, JSON/JWT-based approach widely used by modern platforms. [00:20:08]
