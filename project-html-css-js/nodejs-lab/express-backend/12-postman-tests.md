# Postman test examples

- `GET http://localhost:3000/api/products`
- `POST http://localhost:3000/api/products` with JSON `{ "name": "Pen", "price": 2 }`
- `PUT http://localhost:3000/api/products/1`
- `DELETE http://localhost:3000/api/products/1`
- Add `Authorization: Bearer <token>` for protected API routes.
- Add `x-role: admin` for admin-only routes.