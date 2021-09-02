import { describe } from "mocha";
import Sinon from "sinon";
import { expect } from "chai";
import * as FileIO from "../../src/file-io";
import fs from "fs";
import path from "path";
import DataFile from "../../src/classes/data-file";
import SearchHistory from "../../src/classes/search-history";

const stringyJson = fs
  .readFileSync(path.join(__dirname, "..", "..", "src", "data", "rs.json"))
  .toString("utf-8");

describe("Search History::", () => {
  let sandbox: Sinon.SinonSandbox;
  let stubs: any = {};

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
    sandbox.stub(console, "error").returns();
    stubs.getFileContentStub = sandbox
      .stub(FileIO, "GetFileContent")
      .resolves(Buffer.from(stringyJson));
    stubs.dataFileUpdateStub = sandbox
      .stub(DataFile.prototype, "updateFile")
      .resolves();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should execute happy path and init", async () => {
    const searchHistory = new SearchHistory();
    await searchHistory.init();
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.dataFileUpdateStub.callCount).to.equal(0);
  });
  it("should execute happy path and check history", async () => {
    const searchHistory = new SearchHistory();
    await searchHistory.init();
    await searchHistory.AddSearchEntry();
    const canSearch = searchHistory.ReviewSearchHistory();
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.dataFileUpdateStub.callCount).to.equal(1);
    expect(canSearch).to.be.false;
  });
  it("should execute happy path and check history", async () => {
    const searchHistory = new SearchHistory();
    await searchHistory.init();
    const canSearch = searchHistory.ReviewSearchHistory();
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.dataFileUpdateStub.callCount).to.equal(0);
    expect(canSearch).to.be.true;
  });
});
