 Matrice des droits (Lot 1)

 Acteurs

- Organizer : créateur du projet (`project.organizer`)
- Utilisateur authentifié non-organizer

 Règles d’accès

| Endpoint | Auth JWT | Organizer requis | Non-organizer |

 `POST /auth/login` | Non | Non | Autorisé |
 `POST /auth/token` | Non | Non | Autorisé |
 `GET /projects` | Oui | Non | Autorisé |
 `GET /projects/:id` | Oui | Non | Autorisé |
 `PUT /projects/:id` | Oui | Oui | Refusé (403) |
 `DELETE /projects/:id` | Oui | Oui | Refusé (403) |
 `GET /projects/:id/members` | Oui | Non | Autorisé |
 `POST /projects/:id/members` | Oui | Oui | Refusé (403) |
 `PUT /projects/:id/members/:memberId` | Oui | Oui | Refusé (403) |
 `DELETE /projects/:id/members/:memberId` | Oui | Oui | Refusé (403) |

Format standard des erreurs de sécurité

```json
{
  "error": {
    "category": "security",
    "code": "AUTH_INVALID_OR_EXPIRED_TOKEN",
    "message": "Invalid or expired token"
  }
}
```

 Codes gérés

- `AUTH_MISSING_OR_INVALID_HEADER` → 401
- `AUTH_INVALID_PAYLOAD` → 401
- `AUTH_INVALID_OR_EXPIRED_TOKEN` → 401
- `AUTH_INSUFFICIENT_RIGHTS` → 403
