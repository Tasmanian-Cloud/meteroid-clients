import { CustomersService, OpenAPI, type Currency } from "./index";
import nock from "nock";

const BASE_URL = "https://api.meteroid.com";

describe("CustomersService", () => {
  beforeEach(() => {
    OpenAPI.BASE = BASE_URL;
    OpenAPI.TOKEN = "test-token";
  });

  afterEach(() => {
    nock.cleanAll();
  });

  function scope() {
    return nock(BASE_URL);
  }

  it("lists customers", async () => {
    scope()
      .get("/api/v1/customers")
      .reply(200, {
        data: [],
        pagination_meta: { page: 0, per_page: 50, total_items: 0, total_pages: 0 },
      });

    const response = await CustomersService.listCustomers();
    expect(response.data).toEqual([]);
  });

  it("creates a customer", async () => {
    scope()
      .post("/api/v1/customers", (body: { name: string }) => body.name === "Acme")
      .reply(200, {
        id: "cus_1",
        name: "Acme",
        currency: "USD",
        invoicing_emails: ["billing@acme.com"],
        invoicing_entity_id: "ie_1",
        custom_taxes: [],
      });

    const response = await CustomersService.createCustomer({
      name: "Acme",
      currency: "USD" as Currency,
      invoicing_emails: ["billing@acme.com"],
      custom_taxes: [],
    });
    expect(response.id).toBe("cus_1");
  });
});
