import { describe } from "mocha";
import Sinon from "sinon";
import GetRandomPokemon from "../src/get-random-pokemon";
import * as FileIO from "../src/file-io";
import { expect } from "chai";

const shortList = ["abc", "abcde", "abcdefg", "zh", "bear", "fair", "tear"];

const mediumList = [
  ...shortList,
  "test",
  "fail",
  "here",
  "there",
  "for",
  "forEach",
  "hello",
];

const longList = [
  ...mediumList,
  "best",
  "fess",
  "beer",
  "dog",
  "cat",
  "another",
  "one",
  "here",
  "we",
  "go",
];

describe("Get Random Pokemon::", () => {
  let sandbox: Sinon.SinonSandbox;
  let stubs: any = {};

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
    sandbox.stub(console, "error").returns();
    stubs.getPokemonStub = sandbox
      .stub(FileIO, "GetPokemon")
      .resolves(Buffer.from(JSON.stringify(shortList), "utf8"));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should execute happy path, short list", async () => {
    await GetRandomPokemon();
    expect(stubs.getPokemonStub.callCount).to.equal(1);
  });
  it("Should execute happy path, medium list", async () => {
    stubs.getPokemonStub.resolves(
      Buffer.from(JSON.stringify(mediumList), "utf8")
    );
    await GetRandomPokemon();
    expect(stubs.getPokemonStub.callCount).to.equal(1);
  });
  it("Should execute happy path, long list", async () => {
    stubs.getPokemonStub.resolves(
      Buffer.from(JSON.stringify(longList), "utf8")
    );
    await GetRandomPokemon();
    expect(stubs.getPokemonStub.callCount).to.equal(1);
  });
});
