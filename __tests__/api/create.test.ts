import fetch, { AxiosResponse } from "axios";
describe("POST /api/post", () => {
  let res: AxiosResponse<any>;
  beforeAll(async () => {
    res = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      data: {
        content: "Hello",
      },
    });
  });
  it("Returns an ID", async () => {
    expect(res.data.id).toBeDefined();
  });
});
