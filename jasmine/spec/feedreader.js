/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         allFeeds.forEach(function(feed){
             it('url is defined', function() {
                 expect(feed.url).toBeDefined();
                 expect(feed.url.length).not.toBe(0);
             });
         });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         allFeeds.forEach(function(feed){
             it('name is defined', function() {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             });
         });
    });//describe RSS Feeds


    /* Test suite named "The menu" */
        describe('The menu', function() {
            /* This test ensures the menu element is
             * hidden by default. You'll have to analyze the HTML and
             * the CSS to determine how we're performing the
             * hiding/showing of the menu element.
             */
             it('menu element is hidden by default', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
             });
             /* This test ensures the menu changes
              * visibility when the menu icon is clicked. This test
              * should have two expectations: does the menu display when
              * clicked and does it hide when clicked again.
              */
              it('menu element is trigger on clic event', function() {
                  menuIcon = $('.menu-icon-link');
                  menuIcon.click();
                  expect($('body').hasClass('menu-hidden')).toBe(false);
                  menuIcon.click();
                  expect($('body').hasClass('menu-hidden')).toBe(true);
              });

        });//describe The menu


    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /*This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done) {
             loadFeed(0, function() {
                 done();
             });
         });//beforeEach
         it("loadFeed function load at least one .entry element", function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
             // expect($('.entry').length).not.toBe(0);
         });//it
        });//describe Initial Entries


    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var content1;
         var content2;

        beforeEach(function(done) {
             loadFeed(0, function() {
                 content1 = $('.feed').html();
                 // content1 = document.getElementsByClassName("feed")[0].innerHTML;- the other option
                     loadFeed(1, function() {
                          content2 = $('.feed').html();
                         // content2 = document.getElementsByClassName("feed")[0].innerHTML;
                         done();
                     });//loadFeed 1
              });//loadFeed 0
        });//beforeEach

         it("feed changed after each LoadFeed function work", function(done) {
            expect(content1!==content2).toBe(true);
            done();
         });//it
        });//describe New Feed Selection

}());
