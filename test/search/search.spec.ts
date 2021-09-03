import { describe } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import SearchHistory from "../../src/classes/search-history";
import Catch from "../../src/catch";
import Search from "../../src/search";

describe("Search::", () => {
  let sandbox: Sinon.SinonSandbox;
  let stubs: any = {};

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
    stubs.SearchHistoryInitStub = sandbox
      .stub(SearchHistory.prototype, "init")
      .resolves();
    stubs.ReviewSearchHistoryStub = sandbox.stub(
      SearchHistory.prototype,
      "ReviewSearchHistory"
    );
    stubs.AddSearchEntryStub = sandbox
      .stub(SearchHistory.prototype, "AddSearchEntry")
      .resolves();
    stubs.AttemptToCatchStub = sandbox.stub(Catch, "AttemptToCatch").resolves();
    sandbox.stub(console, "error").returns();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should go through happy path, can search", async () => {
    stubs.ReviewSearchHistoryStub.returns(true);
    await Search();
    expect(stubs.SearchHistoryInitStub.callCount).to.equal(1);
    expect(stubs.ReviewSearchHistoryStub.callCount).to.equal(1);
    expect(stubs.AttemptToCatchStub.callCount).to.equal(1);
    expect(stubs.AddSearchEntryStub.callCount).to.equal(1);
  });
  it("should go through happy path, can NOT search", async () => {
    stubs.ReviewSearchHistoryStub.returns(false);
    await Search();
    expect(stubs.SearchHistoryInitStub.callCount).to.equal(1);
    expect(stubs.ReviewSearchHistoryStub.callCount).to.equal(1);
    expect(stubs.AttemptToCatchStub.callCount).to.equal(0);
    expect(stubs.AddSearchEntryStub.callCount).to.equal(0);
  });
  it("search history init throws", async () => {
    stubs.SearchHistoryInitStub.throws(Error("err"));
    await Search();
    expect(stubs.SearchHistoryInitStub.callCount).to.equal(1);
    expect(stubs.SearchHistoryInitStub.threw()).to.be.true;
    expect(stubs.ReviewSearchHistoryStub.callCount).to.equal(0);
    expect(stubs.AttemptToCatchStub.callCount).to.equal(0);
    expect(stubs.AddSearchEntryStub.callCount).to.equal(0);
  });
  it("attempt to catch throws", async () => {
    stubs.ReviewSearchHistoryStub.returns(true);
    stubs.AttemptToCatchStub.throws(Error("err"));
    await Search();
    expect(stubs.SearchHistoryInitStub.callCount).to.equal(1);
    expect(stubs.ReviewSearchHistoryStub.callCount).to.equal(1);
    expect(stubs.AttemptToCatchStub.callCount).to.equal(1);
    expect(stubs.AttemptToCatchStub.threw()).to.be.true;
    expect(stubs.AddSearchEntryStub.callCount).to.equal(0);
  });
  it("add search entry throws", async () => {
    stubs.ReviewSearchHistoryStub.returns(true);
    stubs.AddSearchEntryStub.throws(Error("err"));
    await Search();
    expect(stubs.SearchHistoryInitStub.callCount).to.equal(1);
    expect(stubs.ReviewSearchHistoryStub.callCount).to.equal(1);
    expect(stubs.AttemptToCatchStub.callCount).to.equal(1);
    expect(stubs.AddSearchEntryStub.callCount).to.equal(1);
    expect(stubs.AddSearchEntryStub.threw()).to.be.true;
  });
});
