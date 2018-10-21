const { expect } = require("chai");

describe("HistoryPage contains", () => {

    it("history page should contain breadcrumbs", function () {
        return this.browser
            .url("/")
            .assertExists(".breadcrumbs", "not contain breadcrumbs")
            .assertView("plain", ".breadcrumbs");
    });

    it("history page should contain .content", function () {
        return this.browser
            .assertExists(".content", "does not content");
    });

    describe("commits on HistoryPage", () => {

        it("should contain .commit", function () {
            return this.browser
                .assertExists(".commit", "does not contain commits")
        });

        it("commit contain a author", function () {
            return this.browser
                .assertExists(".commit__author", "does not contain commit author")
        });

        it("commit contain a date", function () {
            return this.browser
                .assertExists(".commit__date", "does not contain commit date")
        });

        it("commit contain a msg", function () {
            return this.browser
                .assertExists(".commit__msg", "does not contain commit msg")
        });

        it("commit contain hash link", function () {
            return this.browser
                .assertExists(".commit__link", "does not contain commit link")
        });
    });
});

describe("route to next folder/file", () => {

    describe("go to ROOT folder", () => {
        it("click on last commit", async function () {
            const result = await this.browser
                .url("/")
                .click(".commit:last-child a")
                .getText(".breadcrumbs");
            expect(result).to.be.equal("HISTORY / ROOT");
        });

        it("page should contain .content", function () {
            return this.browser
                .assertExists(".content", "does not content");
        });
    });

    describe("route to next level from ROOT", () => {

        it("checks breadcrumbs", async function () {
            const result = await this.browser
                .click(".content li a:last-child")
                .getText(".breadcrumbs");
            const currentUrl = await this.browser.getUrl();
            const elName = currentUrl.split("/");
            expect(result).to.be.equal(
                `HISTORY / ROOT / ${elName[elName.length - 1]}`
            );
        });

        it("should contain .content", function () {
            return this.browser
                .assertExists(".content", "does not content");
        });
    });

    describe("check breadcrumbs link route", () => {

        describe("route to ROOT", () => {
            it("check breadcrumbs", async function () {
                const result = await this.browser
                    .click(".breadcrumbs a:nth-child(2)")
                    .getText(".breadcrumbs");
                expect(result).to.be.equal("HISTORY / ROOT");
            });
    
            it("should contain .content", function () {
                return this.browser
                    .assertExists(".content", "does not content");
            });
        });

        describe("route to HISTORY", () => {

            it("check breadcrumbs", async function () {
                const result = await this.browser
                    .click(".breadcrumbs a:first-child")
                    .getText(".breadcrumbs");
                expect(result).to.be.equal("HISTORY");
            });
    
            it("hould contain .content", function () {
                return this.browser
                    .assertExists(".content", "does not content");
            });
    
            describe("commits on HistoryPage", () => {
                it("should contain .commit", function () {
                    return this.browser
                        .assertExists(".commit", "does not contain commits")
                });
    
                it("commit contain a author", function () {
                    return this.browser
                        .assertExists(".commit__author", "does not contain commit author")
                });
    
                it("commit contain a date", function () {
                    return this.browser
                        .assertExists(".commit__date", "does not contain commit date")
                });
    
                it("commit contain a msg", function () {
                    return this.browser
                        .assertExists(".commit__msg", "does not contain commit msg")
                });
    
                it("commit contain hash link", function () {
                    return this.browser
                        .assertExists(".commit__link", "does not contain commit link")
                });
            });
        });
    });
});