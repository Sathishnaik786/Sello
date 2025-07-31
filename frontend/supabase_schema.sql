-- 👇 Run this in Supabase SQL Editor

-- USERS
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  created_at timestamp default now()
);

-- STORES
create table stores (
  id uuid primary key default gen_random_uuid(),
  name text,
  owner_id uuid references users(id),
  address text,
  lat double precision,
  lng double precision
);

-- PRODUCTS
create table products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id),
  name text,
  price numeric,
  stock int
);

-- ORDERS
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  store_id uuid references stores(id),
  status text,
  total numeric,
  created_at timestamp default now()
);

-- ORDER_ITEMS
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  product_id uuid references products(id),
  quantity int,
  price numeric
); 