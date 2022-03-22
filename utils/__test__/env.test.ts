import { env } from "../env";

describe("Name of the group", () => {
  afterEach(() => {
    delete process.env["RANDOM_ENV"];
  });

  test("should return string env", () => {
    const str = env("NODE_ENV", "geji");
    expect(str).toEqual("test");

    const str2 = env("RANDOM_ENV", "default");
    expect(str2).toEqual("default");

    const str3 = env("RANDOM_ENV");
    expect(str3).toBeUndefined();
  });

  test("should return int env", () => {
    const int = env.int("RANDOM_ENV", 3);
    expect(int).toEqual(3);

    const int2 = env.int("RANDOM_ENV");
    expect(int2).toBeUndefined();

    process.env["RANDOM_ENV"] = "1234";
    const int3 = env.int("RANDOM_ENV");
    expect(int3).toEqual(1234);
  });

  test("should return float env", () => {
    const float = env.float("RANDOM_ENV", 3);
    expect(float).toEqual(3);

    const float2 = env.float("RANDOM_ENV");
    expect(float2).toBeUndefined();

    process.env["RANDOM_ENV"] = "1234";
    const float3 = env.float("RANDOM_ENV");
    expect(float3).toEqual(1234);
  });

  test("should return array env", () => {
    const array = env.array("RANDOM_ENV", ["1", "2"]);
    expect(array).toEqual(["1", "2"]);

    const array2 = env.array("RANDOM_ENV");
    expect(array2).toBeUndefined();

    process.env["RANDOM_ENV"] = "1,2,3";
    const array3 = env.array("RANDOM_ENV");
    expect(array3).toEqual(["1", "2", "3"]);
  });
});
