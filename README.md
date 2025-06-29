# 📄 PNPM workspaces project template

Find your true hero from 16 adjectives.

## Documents for developers

### System Requirements

- Node.js: Any of the following versions
  - Jod LTS (`^22.x.x`)
  - Latest (`>=24.x.x`)

### Install the dependencies

Playwright downloads browser binaries during installation. On Linux you must
install several system libraries beforehand. The following command installs
the libraries recommended by the official documentation:

```sh
sudo apt-get update
sudo apt-get install -y libnss3 libatk-1.0-0 libatk-bridge2.0-0 libcups2 \
  libdrm2 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libgtk-3-0 \
  libasound2 libatspi2.0-0 libxshmfence1 libxkbcommon0 libpangocairo-1.0-0
```

```sh
corepack enable
pnpm install
```

#### Configure `BASE_PATH`

Set up an `.env` file before building when deploying `packages/demo`
to a subdirectory such as GitHub Pages.

```sh
cp .env.example .env
# Edit .env and update BASE_PATH if needed
```

The default `.env.example` contains the following setting:

```bash
BASE_PATH=/heroo
```

This value should match the subdirectory where the site is hosted.

### Building

```sh
pnpm run build
pnpm run dev # Build and watch for changes
```

### Linting

```sh
pnpm run lint
pnpm run lint:fix # Lint and auto-fix
```

### Testing

Run `pnpm run build` before executing the test commands.

```sh
pnpm run test  # Run unit tests
pnpm run test:e2e  # Run end-to-end tests
```

### Cleaning

```sh
pnpm run clean
```

## Contributing

Welcome to contribute to this repository! For more details,
please refer to [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## LICENSE

[MIT](./LICENSE)
