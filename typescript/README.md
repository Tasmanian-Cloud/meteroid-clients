# @tasmanian.cloud/meteroid

TypeScript/JavaScript SDK for the [Meteroid](https://meteroid.com) billing API.

## Installation

```bash
npm install @tasmanian.cloud/meteroid
```

## Usage

```typescript
import { Meteroid } from "@tasmanian.cloud/meteroid";

const client = new Meteroid("your-api-key");

const customers = await client.customers.listCustomers();
console.log(`Found ${customers.data.length} customers`);
```

## Configuration

```typescript
import { Meteroid, MeteroidOptions } from "@tasmanian.cloud/meteroid";

const client = new Meteroid("your-api-key", {
  serverUrl: "https://your-meteroid-instance.com",
  timeout: 30_000,
  numRetries: 3,
});
```
