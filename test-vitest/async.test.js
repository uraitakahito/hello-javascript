import { describe, expect, test } from "vitest";

// https://qiita.com/mori_goq/items/5b01666cff5134f821bd

// 成功する非同期関数
export const fetchDataResolve = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("tarosuke");
    }, 10);
  });
};

// 失敗する非同期関数
export const fetchDataReject = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("error");
    }, 10);
  });
};

describe("非同期の成功を検証", () => {
  test("検証１", () => {
    return fetchDataResolve().then((data) => {
      expect(data).toBe("tarosuke");
    });
  });

  test("検証２", () => {
    return expect(fetchDataResolve()).resolves.toBe("tarosuke");
  });

  test("検証３", async () => {
    await expect(fetchDataResolve()).resolves.toBe("tarosuke");
  });

  test("検証４", async () => {
    expect(await fetchDataResolve()).toBe("tarosuke");
  });
});

describe("非同期の失敗を検証", () => {
  test("検証１", () => {
    return fetchDataReject().catch((data) => {
      expect(data).toBe("error");
    });
  });

  test("検証２", () => {
    return expect(fetchDataReject()).rejects.toBe("error");
  });

  test("検証３", async () => {
    await expect(fetchDataReject()).rejects.toBe("error");
  });

  test("検証４", async () => {
    /*
    アサーションが１回呼ばれることを確認
    （非同期関数が成功した場合、catch処理が実行されずに検証が成功の扱いになるため、記述することをおすすめする）
    */
    expect.assertions(1);

    try {
      await fetchDataReject();
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});
