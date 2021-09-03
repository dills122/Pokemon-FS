import { describe } from "mocha";
import Sinon from "sinon";
import { expect } from "chai";
import * as FileIO from "../../src/file-io";
import fs from "fs";
import path from "path";
import DataFile from "../../src/classes/data-file";

const stringyJson = fs
  .readFileSync(path.join(__dirname, "..", "..", "src", "data", "rs.json"))
  .toString("utf-8");

describe("Data File::", () => {
  let sandbox: Sinon.SinonSandbox;
  let stubs: any = {};

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
    sandbox.stub(console, "error").returns();
    stubs.getFileContentStub = sandbox
      .stub(FileIO, "GetFileContent")
      .resolves(Buffer.from(stringyJson));
    stubs.writeToDataStorageFileStub = sandbox
      .stub(FileIO, "WriteToDataStorageFile")
      .resolves();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should execute happy path and init data file", async () => {
    const dataFile = new DataFile();
    await dataFile.init();
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.writeToDataStorageFileStub.callCount).to.equal(0);
  });
  it("should throw if init throws", async () => {
    stubs.getFileContentStub.rejects(Error("err"));
    try {
      const dataFile = new DataFile();
      await dataFile.init();
    } catch (err) {
      expect(err.message).to.equal("err");
      expect(stubs.getFileContentStub.callCount).to.equal(1);
      expect(stubs.writeToDataStorageFileStub.callCount).to.equal(0);
    }
  });
  it("should execute happy path, get search history", async () => {
    const dataFile = new DataFile();
    await dataFile.init();
    const searchHistory = dataFile.getSearchHistory();
    expect(searchHistory).to.be.an("array").and.length(0);
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.writeToDataStorageFileStub.callCount).to.equal(0);
  });
  it("should execute happy path, get inventory", async () => {
    const dataFile = new DataFile();
    await dataFile.init();
    const inventory = dataFile.getInventory();
    expect(inventory).to.be.an("array").and.length(0);
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.writeToDataStorageFileStub.callCount).to.equal(0);
  });
  it("should throw if no data file is loaded, get inventory", () => {
    try {
      const dataFile = new DataFile();
      const inventory = dataFile.getInventory();
      expect(inventory).to.be.an("array").and.length(0);
    } catch (err) {
      expect(err.message).to.equal("No data file loaded yet");
      expect(stubs.getFileContentStub.callCount).to.equal(0);
      expect(stubs.writeToDataStorageFileStub.callCount).to.equal(0);
    }
  });
  it("should throw if no data file is loaded, get search history", () => {
    try {
      const dataFile = new DataFile();
      const searchHistory = dataFile.getSearchHistory();
      expect(searchHistory).to.be.an("array").and.length(0);
    } catch (err) {
      expect(err.message).to.equal("No data file loaded yet");
      expect(stubs.getFileContentStub.callCount).to.equal(0);
      expect(stubs.writeToDataStorageFileStub.callCount).to.equal(0);
    }
  });
  it("should be able to update the file, search history", async () => {
    const dataFile = new DataFile();
    await dataFile.init();
    const searchHistory = dataFile.getSearchHistory();
    searchHistory.push("historyItem");
    await dataFile.updateFile({
      searchHistoryUpdates: searchHistory,
    });
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.writeToDataStorageFileStub.callCount).to.equal(1);
  });
  it("should be able to update the file, inventory", async () => {
    const dataFile = new DataFile();
    await dataFile.init();
    const inventory = dataFile.getInventory();
    inventory.push({
      name: "name",
      caught: new Date().toISOString(),
    });
    await dataFile.updateFile({
      inventoryUpdates: inventory,
    });
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.writeToDataStorageFileStub.callCount).to.equal(1);
  });
  it("should be able to update the file, inventory", async () => {
    stubs.writeToDataStorageFileStub.rejects(Error("err"));
    try {
      const dataFile = new DataFile();
      await dataFile.init();
      const inventory = dataFile.getInventory();
      inventory.push({
        name: "name",
        caught: new Date().toISOString(),
      });
      await dataFile.updateFile({
        inventoryUpdates: inventory,
      });
    } catch (err) {
      expect(err.message).to.equal("err");
      expect(stubs.getFileContentStub.callCount).to.equal(1);
      expect(stubs.writeToDataStorageFileStub.callCount).to.equal(1);
    }
  });
});
