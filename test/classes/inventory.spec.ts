import { describe } from "mocha";
import Sinon from "sinon";
import { expect } from "chai";
import * as FileIO from "../../src/file-io";
import fs from "fs";
import path from "path";
import DataFile from "../../src/classes/data-file";
import { PokemonInventory } from "../../src/classes/inventory";

const stringyJson = fs
  .readFileSync(path.join(__dirname, "..", "..", "src", "data", "rs.json"))
  .toString("utf-8");

describe("Inventory::", () => {
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
    const pokieInventory = new PokemonInventory();
    await pokieInventory.init();
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.dataFileUpdateStub.callCount).to.equal(0);
  });
  it("should execute happy path and check if able to add", async () => {
    const pokieInventory = new PokemonInventory();
    await pokieInventory.init();
    const canAdd = pokieInventory.canAddPokemon("test");
    expect(canAdd).to.be.true;
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.dataFileUpdateStub.callCount).to.equal(0);
  });
  it("should execute happy path and check if able to add, can not", async () => {
    const pokieInventory = new PokemonInventory();
    await pokieInventory.init();
    await pokieInventory.add("test");
    const canAdd = pokieInventory.canAddPokemon("test");
    expect(canAdd).to.be.false;
    expect(stubs.getFileContentStub.callCount).to.equal(1);
    expect(stubs.dataFileUpdateStub.callCount).to.equal(1);
  });
});
