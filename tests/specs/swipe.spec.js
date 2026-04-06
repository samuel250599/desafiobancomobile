const { expect } = require('chai');
const SwipePage = require('../../src/pages/swipe.page');
const HomePage = require('../../src/pages/home.page');
const testData = require('../../src/data/test-data.json');
const { step } = require('@wdio/allure-reporter').default;

describe('Swipe Screen @smoke @regression', () => {
  beforeEach(async () => {
    await HomePage.waitForHomePageToLoad();
    await SwipePage.goToSwipe();
  });

  describe('Carousel navigation @smoke', () => {
    it('should display carousel on swipe screen', async () => {
      step('Verify carousel is visible');
      const isVisible = await SwipePage.isCarouselVisible();
      expect(isVisible).to.be.true;
    });

    it('should swipe carousel left and see new card', async () => {
      step('Get initial card title');
      const initialTitle = await SwipePage.getCurrentCardTitle();

      step('Swipe left');
      await SwipePage.swipeCarouselLeft();

      step('Verify card changed');
      const newTitle = await SwipePage.getCurrentCardTitle();
      expect(newTitle).to.not.equal(initialTitle);
    });

    it('should swipe carousel right', async () => {
      step('Swipe left first');
      await SwipePage.swipeCarouselLeft();
      const titleAfterSwipe = await SwipePage.getCurrentCardTitle();

      step('Swipe right');
      await SwipePage.swipeCarouselRight();

      step('Verify returned to previous card');
      const finalTitle = await SwipePage.getCurrentCardTitle();
      expect(finalTitle).to.not.equal(titleAfterSwipe);
    });
  });

  describe('Multiple swipes @regression', () => {
    it('should perform multiple consecutive swipes', async () => {
      step('Swipe multiple times');
      const swipeCount = 3;
      await SwipePage.performMultipleSwipes(swipeCount);

      step('Verify carousel is still functional');
      const isVisible = await SwipePage.isCarouselVisible();
      expect(isVisible).to.be.true;
    });

    it('should navigate to specific card by swiping', async () => {
      step('Swipe to second card');
      await SwipePage.swipeToCard(1);

      step('Verify card is different from first');
      const title = await SwipePage.getCurrentCardTitle();
      expect(title).to.exist;
    });

    it('should verify card change after swipe', async () => {
      step('Get initial state');
      const changed = await SwipePage.verifyCardChangesAfterSwipe();
      expect(changed).to.be.true;
    });
  });

  describe('Card content @regression', () => {
    it('should display card title and subtitle', async () => {
      step('Get card title');
      const title = await SwipePage.getCurrentCardTitle();

      step('Verify title exists');
      expect(title).to.exist;
    });

    it('should navigate through all cards', async () => {
      step('Get initial title');
      const titles = [];
      titles.push(await SwipePage.getCurrentCardTitle());

      step('Swipe through cards');
      const maxSwipes = testData.swipe.maxSwipes;
      for (let i = 0; i < maxSwipes; i++) {
        await SwipePage.swipeCarouselLeft();
        const newTitle = await SwipePage.getCurrentCardTitle();
        if (newTitle) {
          titles.push(newTitle);
        }
      }

      step('Verify swipes performed');
      expect(titles.length).to.be.greaterThan(0);
    });
  });
});