import { describe } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import Catch from "../../src/catch";
import inquirer from "inquirer";
// import Question from "../../src/question-builder";
import * as GetRandomPokemon from "../../src/get-random-pokemon";
import { PokemonInventory } from "../../src/classes/inventory";

describe("Catch::", () => {
  let sandbox: Sinon.SinonSandbox;
  let stubs: any = {};

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
    stubs.DisplayPromptStub = sandbox
      .stub(Catch, <any>"DisplayPrompt")
      .resolves();
    stubs.CatchStub = sandbox.stub(Catch, <any>"Catch").resolves();
    stubs.inquirerPromptStub = sandbox.stub(inquirer, "prompt");
    sandbox.stub(console, "error").returns();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Attempt to Catch", () => {
    it("Should execute happy path, have luck", async () => {
      stubs.CheckLuckStub = sandbox.stub(Catch, <any>"CheckLuck").returns(true);
      await Catch.AttemptToCatch();
      expect(stubs.DisplayPromptStub.callCount).to.equal(1);
    });
    it("Should execute happy path, no luck", async () => {
      stubs.CheckLuckStub = sandbox
        .stub(Catch, <any>"CheckLuck")
        .returns(false);
      await Catch.AttemptToCatch();
      expect(stubs.DisplayPromptStub.callCount).to.equal(0);
    });
    it("Display Prompt thorws", async () => {
      stubs.CheckLuckStub = sandbox.stub(Catch, <any>"CheckLuck").returns(true);
      stubs.DisplayPromptStub.rejects(Error("err"));
      try {
        await Catch.AttemptToCatch();
        expect(true).equal(false);
      } catch (err: any) {
        expect(err.message).equal("err");
        expect(stubs.DisplayPromptStub.callCount).to.equal(1);
      }
    });
  });

  describe("Display Prompt", () => {
    beforeEach(() => {
      stubs.DisplayPromptStub.restore();
    });
    it("Should go through happy path, answer yes", async () => {
      stubs.CheckLuckStub = sandbox.stub(Catch, <any>"CheckLuck").returns(true);
      stubs.inquirerPromptStub.resolves({
        catch: "Yes",
      });
      await Catch.AttemptToCatch();
      expect(stubs.inquirerPromptStub.callCount).to.equal(1);
      expect(stubs.CatchStub.callCount).to.equal(1);
    });
    it("Should go through happy path, answer no", async () => {
      stubs.CheckLuckStub = sandbox.stub(Catch, <any>"CheckLuck").returns(true);
      stubs.inquirerPromptStub.resolves({
        catch: "No",
      });
      await Catch.AttemptToCatch();
      expect(stubs.inquirerPromptStub.callCount).to.equal(1);
      expect(stubs.CatchStub.callCount).to.equal(0);
    });
  });

  describe("Catch", () => {
    beforeEach(() => {
      stubs.DisplayPromptStub.restore();
      stubs.CatchStub.restore();
      stubs.GetRandomPokemonStub = sandbox
        .stub(GetRandomPokemon, "default")
        .resolves("NAME");
      stubs.PokemonInventoryInitStub = sandbox
        .stub(PokemonInventory.prototype, "init")
        .resolves();
      stubs.PokemonInventoryAddStub = sandbox
        .stub(PokemonInventory.prototype, "add")
        .resolves();
    });
    it("Should go through happy path", async () => {
      stubs.CheckLuckStub = sandbox.stub(Catch, <any>"CheckLuck").returns(true);
      stubs.inquirerPromptStub.resolves({
        catch: "Yes",
      });
      await Catch.AttemptToCatch();
      expect(stubs.inquirerPromptStub.callCount).to.equal(1);
      expect(stubs.GetRandomPokemonStub.callCount).to.equal(1);
      expect(stubs.PokemonInventoryInitStub.callCount).to.equal(1);
      expect(stubs.PokemonInventoryAddStub.callCount).to.equal(1);
    });
    it("Get Random Pokemon Throws", async () => {
      stubs.CheckLuckStub = sandbox.stub(Catch, <any>"CheckLuck").returns(true);
      stubs.inquirerPromptStub.resolves({
        catch: "Yes",
      });
      stubs.GetRandomPokemonStub.rejects(Error("err"));
      try {
        await Catch.AttemptToCatch();
        expect(true).equal(false);
      } catch (err: any) {
        expect(stubs.inquirerPromptStub.callCount).to.equal(1);
        expect(stubs.GetRandomPokemonStub.callCount).to.equal(1);
        expect(stubs.PokemonInventoryInitStub.callCount).to.equal(0);
        expect(stubs.PokemonInventoryAddStub.callCount).to.equal(0);
      }
    });
    it("Pokemon Inv Init Throws", async () => {
      stubs.CheckLuckStub = sandbox.stub(Catch, <any>"CheckLuck").returns(true);
      stubs.inquirerPromptStub.resolves({
        catch: "Yes",
      });
      stubs.PokemonInventoryInitStub.rejects(Error("err"));
      try {
        await Catch.AttemptToCatch();
        expect(true).equal(false);
      } catch (err) {
        expect(stubs.inquirerPromptStub.callCount).to.equal(1);
        expect(stubs.GetRandomPokemonStub.callCount).to.equal(1);
        expect(stubs.PokemonInventoryInitStub.callCount).to.equal(1);
        expect(stubs.PokemonInventoryAddStub.callCount).to.equal(0);
      }
    });
    it("Pokemon Add to Inv Throws", async () => {
      stubs.CheckLuckStub = sandbox.stub(Catch, <any>"CheckLuck").returns(true);
      stubs.inquirerPromptStub.resolves({
        catch: "Yes",
      });
      stubs.PokemonInventoryAddStub.rejects(Error("err"));
      try {
        await Catch.AttemptToCatch();
        expect(true).equal(false);
      } catch (err: any) {
        expect(stubs.inquirerPromptStub.callCount).to.equal(1);
        expect(stubs.GetRandomPokemonStub.callCount).to.equal(1);
        expect(stubs.PokemonInventoryInitStub.callCount).to.equal(1);
        expect(stubs.PokemonInventoryAddStub.callCount).to.equal(1);
      }
    });
  });
});
