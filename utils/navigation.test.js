const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require("./navigation");
const { expect } = require("chai");
describe("navigation", function() {
  it("buildFolderUrl правильно формирует url", function() {
    const parentHash = "parentHash";
    const path = "path";
    const result = buildFolderUrl(parentHash, path);
    expect(result).to.deep.equal("/files/parentHash/path");
  });
  it("buildFileUrl правильно формирует url", function() {
    const parentHash = "parentHash";
    const path = "path";
    const result = buildFileUrl(parentHash, path);
    expect(result).to.deep.equal("/content/parentHash/path");
  });

  describe("buildBreadcrumbs", function() {
    it("buildBreadcrumbs последняя вкладка не активна", function() {
      const parentHash = "parentHash";
      const arrayOfResults = [];
      const result1 = buildBreadcrumbs(undefined, undefined);
      expect(result1[result1.length - 1]).to.have.deep.property("href", undefined);

      const result2 = buildBreadcrumbs(parentHash, undefined);
      expect(result2[result2.length - 1]).to.have.deep.property("href", undefined);

      let path = "path1";
      for (i = 2; i < 10; i++) {
        arrayOfResults.push(buildBreadcrumbs(parentHash, path));
        path += `/path${i}`;
      }
      arrayOfResults.forEach(result => {
        expect(result[result.length - 1]).to.not.have.property("href");
      });
    });

    it("buildBreadcrumbs правильно реагирует на изменение количества вложенных путей", function() {
      const parentHash = "parentHash";
      const arrayOfResults = [];
      const result1 = buildBreadcrumbs(undefined, undefined);
      expect(result1).to.have.lengthOf(1);

      const result2 = buildBreadcrumbs(parentHash, undefined);
      expect(result2).to.have.lengthOf(2);

      let path = "path1";
      for (i = 2; i < 10; i++) {
        arrayOfResults.push(buildBreadcrumbs(parentHash, path));
        path += `/path${i}`;
      }
      arrayOfResults.forEach((result, index) => {
        expect(result).to.have.lengthOf( 3 + index );
      });
    });
  });
});
