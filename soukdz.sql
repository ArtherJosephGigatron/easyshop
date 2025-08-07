-- Tables

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "isAdmin" BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE "Product" (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    stock INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "Order" (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    total DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("productId") REFERENCES "Product"(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    image TEXT,
    category TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT FALSE,
    title TEXT DEFAULT 'none',
    stock TEXT DEFAULT 'none',
    createdby TEXT DEFAULT 'none'
);

CREATE TABLE _prisma_migrations (
    id VARCHAR(36) PRIMARY KEY,
    checksum VARCHAR(64) NOT NULL,
    finished_at TIMESTAMPTZ,
    migration_name VARCHAR(255) NOT NULL,
    logs TEXT,
    rolled_back_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    applied_steps_count INTEGER DEFAULT 0 NOT NULL
);

-- Optional: Insert sample data
INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
VALUES (
    'e6817427-9252-42db-b22a-65c94a5ecacf',
    'a3d3b12f0761031f2a56225786443a6eb0e73a68e964e32710efcf541eabd9fb',
    '2025-08-04 19:44:07.577939+02',
    '20250804174407_init',
    NULL, NULL, '2025-08-04 19:44:07.531033+02', 1
);

INSERT INTO products (id, name, description, price, image, category, status, created_at, is_approved, title, stock, createdby)
VALUES (
    4, 'Hp Probook E18', 'intel i5 6gen 4gb ram , 256GB SSD , no GPU', 400.00,
    NULL, 'إلكترونيات', 'pending', '2025-08-06 15:07:42.647', TRUE, 'PC', '15', '5'
);

INSERT INTO users (id, name, email, password, created_at) VALUES
(1, 'youcef', 'youcefakay@gmail.com', '$2b$10$.qiQQiC2UV/kPwG3jePr9uLcGUOzxnhZYncLBCa4tvVyzOxWPcGGu', '2025-08-05 17:37:41.050472'),
(2, 'Joseph', 'Joseph@gmail.com', '$2b$10$apHLLVJrQTgtpG.82h4G3uYTdg4TZFh6lwQ8Wg5jed/9ixsZklPye', '2025-08-05 20:00:10.632833'),
(3, 'Ayoub', 'Ayoub@gmail.com', '$2b$10$RKLN5LqK4rA3Rc7pXmUNhu2u2XIxKBhz5Ghv/tJRg18ql0DFtdeJO', '2025-08-05 21:00:18.999062');
