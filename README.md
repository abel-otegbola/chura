# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Chura - Produce Tracking & Spoilage Prediction

Chura helps middlemen and traders track their produce, predict when it will spoil, and receive automatic recommendations on when to sell—even offline.

### Features

- **Produce Tracking**: Add, edit, and manage produce inventory with quantities, harvest dates, and notes
- **Offline Support**: All changes are saved locally and automatically synced when you're back online
- **Spoilage Prediction**: Get insights on storage conditions and time-to-spoilage
- **Traditional Preservatives**: Recommendations for natural preservation methods

---

## Appwrite Backend Setup

This project uses [Appwrite](https://appwrite.io) for backend services including authentication and database.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_PRODUCE_COLLECTION_ID=your_produce_collection_id
```

### Appwrite Collection Schema

Create a collection in your Appwrite database with the following attributes:

**Collection Name**: `produces` (or your preferred name)

**Attributes**:
- `name` (String, required) - Name of the produce
- `quantity` (String, required) - Quantity/amount
- `harvestDate` (String, optional) - Harvest date
- `notes` (String, optional) - Additional notes
- `updatedAt` (String, optional) - Last update timestamp
- `createdAt` (String, optional) - Creation timestamp

**Permissions**:
- Set appropriate read/write permissions for authenticated users
- For development, you can use: `role:all` for both read and write

### Offline Sync

The app automatically handles offline scenarios:
1. When offline, all changes are saved to `localStorage`
2. When back online, click the "Sync Now" button or it will sync automatically
3. Conflicts are resolved using a last-write-wins strategy

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
